// Universal logger that works in both client and server environments
let logger: any;

// Check if we're in a server environment
const isServer = typeof window === 'undefined';

if (isServer) {
  // Server-side winston logger - only import on server
  logger = {
    error: (message: string, meta?: any) => {
      console.error(`[ERROR] ${message}`, meta);
      // TODO: Add winston logging for production
    },
    warn: (message: string, meta?: any) => {
      console.warn(`[WARN] ${message}`, meta);
    },
    info: (message: string, meta?: any) => {
      console.info(`[INFO] ${message}`, meta);
    },
    debug: (message: string, meta?: any) => {
      if (process.env.NODE_ENV !== 'production') {
        console.debug(`[DEBUG] ${message}`, meta);
      }
    },
  };
} else {
  // Client-side logger (use console)
  logger = {
    error: (message: string, meta?: any) => console.error(`[ERROR] ${message}`, meta),
    warn: (message: string, meta?: any) => console.warn(`[WARN] ${message}`, meta),
    info: (message: string, meta?: any) => console.info(`[INFO] ${message}`, meta),
    debug: (message: string, meta?: any) => console.debug(`[DEBUG] ${message}`, meta),
  };
}

export { logger };

// Security event logger
export const securityLogger = {
  authAttempt: (ip: string, success: boolean, details?: Record<string, unknown>) => {
    logger.info('Authentication attempt', {
      type: 'auth_attempt',
      ip,
      success,
      timestamp: new Date().toISOString(),
      ...details
    })
  },
  
  rateLimitExceeded: (ip: string, endpoint: string, limit: number) => {
    logger.warn('Rate limit exceeded', {
      type: 'rate_limit_exceeded',
      ip,
      endpoint,
      limit,
      timestamp: new Date().toISOString()
    })
  },
  
  suspiciousActivity: (ip: string, activity: string, details?: Record<string, unknown>) => {
    logger.warn('Suspicious activity detected', {
      type: 'suspicious_activity',
      ip,
      activity,
      timestamp: new Date().toISOString(),
      ...details
    })
  },
  
  adminAccess: (ip: string, action: string, success: boolean) => {
    logger.info('Admin access attempt', {
      type: 'admin_access',
      ip,
      action,
      success,
      timestamp: new Date().toISOString()
    })
  },
  
  systemError: (error: Error, context?: Record<string, unknown>) => {
    logger.error('System error', {
      type: 'system_error',
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      ...context
    })
  }
}

export default logger