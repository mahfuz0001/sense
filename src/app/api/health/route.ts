import { NextRequest, NextResponse } from 'next/server'
import { securityLogger } from '@/lib/logger'

export async function GET(request: NextRequest) {
  try {
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                    request.headers.get('x-real-ip') || 
                    'unknown'
    
    securityLogger.authAttempt(clientIP, true, { endpoint: '/api/health' })
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      security: {
        rateLimiting: 'active',
        headers: 'secure',
        logging: 'enabled'
      },
      ip: clientIP
    })
  } catch (error) {
    securityLogger.systemError(error as Error, { endpoint: '/api/health' })
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}