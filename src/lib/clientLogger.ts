// Client-safe logger for browser environments
const createClientLogger = () => {
  const log = (level: string, message: string, data?: any) => {
    const timestamp = new Date().toISOString()
    const logEntry = {
      timestamp,
      level,
      message,
      ...(data && { data })
    }
    
    // In development, log to console
    if (process.env.NODE_ENV === 'development') {
      console[level as keyof Console] || console.log(
        `[${timestamp}] ${level.toUpperCase()}: ${message}`,
        data || ''
      )
    }
    
    // In production, you could send logs to a service like LogRocket, Sentry, etc.
    if (process.env.NODE_ENV === 'production') {
      // Send to logging service
      // Example: window.gtag && window.gtag('event', 'log', logEntry)
    }
  }

  return {
    info: (message: string, data?: any) => log('info', message, data),
    warn: (message: string, data?: any) => log('warn', message, data),
    error: (message: string, data?: any) => log('error', message, data),
    debug: (message: string, data?: any) => log('debug', message, data),
  }
}

// Client-side security logger
export const clientSecurityLogger = {
  authAttempt: (success: boolean, details?: any) => {
    const logger = createClientLogger()
    logger.info('Authentication attempt', {
      type: 'auth_attempt',
      success,
      timestamp: new Date().toISOString(),
      ...details
    })
  },
  
  suspiciousActivity: (activity: string, details?: any) => {
    const logger = createClientLogger()
    logger.warn('Suspicious activity detected', {
      type: 'suspicious_activity',
      activity,
      timestamp: new Date().toISOString(),
      ...details
    })
  },
  
  systemError: (error: Error, context?: any) => {
    const logger = createClientLogger()
    logger.error('System error', {
      type: 'system_error',
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      ...context
    })
  }
}

export default createClientLogger