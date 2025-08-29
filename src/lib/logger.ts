import winston from 'winston'

// Create logger instance
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'anti-tutorial-hell' },
  transports: [
    // Write to all logs with level `info` and below to `combined.log`
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
})

// If we're not in production, log to the console as well
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }))
}

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