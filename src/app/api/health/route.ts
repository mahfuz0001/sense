import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/supabase';
import { config, isProduction } from '@/lib/config';
import { logger, securityLogger } from '@/lib/logger';

interface HealthCheckResult {
  service: string;
  status: 'healthy' | 'unhealthy' | 'degraded';
  responseTime?: number;
  error?: string;
  details?: Record<string, any>;
}

interface SystemHealth {
  status: 'healthy' | 'unhealthy' | 'degraded';
  timestamp: string;
  version: string;
  environment: string;
  uptime: number;
  checks: HealthCheckResult[];
  summary: {
    total: number;
    healthy: number;
    unhealthy: number;
    degraded: number;
  };
}

// Individual health checks
const healthChecks = {
  database: async (): Promise<HealthCheckResult> => {
    const start = Date.now();
    try {
      const result = await db.healthCheck();
      const responseTime = Date.now() - start;
      
      return {
        service: 'database',
        status: result.healthy ? 'healthy' : 'unhealthy',
        responseTime,
        error: result.error,
        details: {
          connectionTime: responseTime,
          url: config.NEXT_PUBLIC_SUPABASE_URL,
        },
      };
    } catch (error) {
      return {
        service: 'database',
        status: 'unhealthy',
        responseTime: Date.now() - start,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  memory: async (): Promise<HealthCheckResult> => {
    try {
      const usage = process.memoryUsage();
      const totalMB = Math.round(usage.heapTotal / 1024 / 1024);
      const usedMB = Math.round(usage.heapUsed / 1024 / 1024);
      const usagePercent = (usedMB / totalMB) * 100;
      
      let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
      if (usagePercent > 90) status = 'unhealthy';
      else if (usagePercent > 80) status = 'degraded';
      
      return {
        service: 'memory',
        status,
        details: {
          totalMB,
          usedMB,
          usagePercent: Math.round(usagePercent),
          external: Math.round(usage.external / 1024 / 1024),
          arrayBuffers: Math.round(usage.arrayBuffers / 1024 / 1024),
        },
      };
    } catch (error) {
      return {
        service: 'memory',
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  environment: async (): Promise<HealthCheckResult> => {
    try {
      const requiredEnvVars = [
        'NEXT_PUBLIC_SUPABASE_URL',
        'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      ];
      
      const missing = requiredEnvVars.filter(envVar => !process.env[envVar]);
      const isHealthy = missing.length === 0;
      
      return {
        service: 'environment',
        status: isHealthy ? 'healthy' : 'unhealthy',
        details: {
          nodeVersion: process.version,
          nodeEnv: process.env.NODE_ENV,
          platform: process.platform,
          arch: process.arch,
          missingEnvVars: missing,
        },
        ...(missing.length > 0 && { error: `Missing environment variables: ${missing.join(', ')}` }),
      };
    } catch (error) {
      return {
        service: 'environment',
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  // Optional external service checks
  externalServices: async (): Promise<HealthCheckResult> => {
    try {
      // Add checks for external services if any (e.g., Redis, email service, etc.)
      const checks = [];
      
      // Example: Redis check (if enabled)
      if (config.REDIS_URL) {
        // Add Redis connectivity check here
        checks.push({ service: 'redis', status: 'healthy' });
      }
      
      return {
        service: 'external_services',
        status: 'healthy',
        details: {
          services: checks,
          redisEnabled: !!config.REDIS_URL,
          analyticsEnabled: config.ENABLE_ANALYTICS,
        },
      };
    } catch (error) {
      return {
        service: 'external_services',
        status: 'degraded',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
};

export async function GET(request: NextRequest) {
  const start = Date.now();
  const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                  request.headers.get('x-real-ip') || 
                  'unknown';
  
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const detailed = searchParams.get('detailed') === 'true';
    const services = searchParams.get('services')?.split(',') || Object.keys(healthChecks);
    
    // Run health checks
    const checkPromises = services
      .filter(service => service in healthChecks)
      .map(async (service) => {
        try {
          return await healthChecks[service as keyof typeof healthChecks]();
        } catch (error) {
          return {
            service,
            status: 'unhealthy' as const,
            error: error instanceof Error ? error.message : 'Unknown error',
          };
        }
      });
    
    const checks = await Promise.all(checkPromises);
    
    // Calculate summary
    const summary = {
      total: checks.length,
      healthy: checks.filter(c => c.status === 'healthy').length,
      unhealthy: checks.filter(c => c.status === 'unhealthy').length,
      degraded: checks.filter(c => c.status === 'degraded').length,
    };
    
    // Determine overall status
    let overallStatus: 'healthy' | 'unhealthy' | 'degraded' = 'healthy';
    if (summary.unhealthy > 0) {
      overallStatus = 'unhealthy';
    } else if (summary.degraded > 0) {
      overallStatus = 'degraded';
    }
    
    const health: SystemHealth = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: config.NODE_ENV,
      uptime: process.uptime(),
      checks: detailed ? checks : checks.map(c => ({ service: c.service, status: c.status })),
      summary,
    };
    
    // Log health check
    securityLogger.authAttempt(clientIP, true, { 
      endpoint: '/api/health',
      status: overallStatus,
      duration: Date.now() - start,
    });
    
    // Return appropriate status code
    const statusCode = overallStatus === 'healthy' ? 200 : overallStatus === 'degraded' ? 200 : 503;
    
    return NextResponse.json(health, { 
      status: statusCode,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
    
  } catch (error) {
    securityLogger.systemError(error as Error, { 
      endpoint: '/api/health',
      ip: clientIP,
      duration: Date.now() - start,
    });
    
    const errorResponse = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Health check failed',
      duration: Date.now() - start,
    };
    
    return NextResponse.json(errorResponse, { status: 503 });
  }
}

// Simple readiness check
export async function HEAD(request: NextRequest) {
  try {
    const dbHealth = await db.healthCheck();
    return new NextResponse(null, { 
      status: dbHealth.healthy ? 200 : 503,
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
  } catch {
    return new NextResponse(null, { status: 503 });
  }
}