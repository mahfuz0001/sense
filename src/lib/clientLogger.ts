// Client-safe logger for browser environments
const createClientLogger = () => {
  const log = (
    level: string,
    message: string,
    data?: Record<string, unknown>
  ) => {
    const timestamp = new Date().toISOString();

    // In development, log to console
    if (process.env.NODE_ENV === "development") {
      const consoleMethod = (console as unknown as Record<string, unknown>)[
        level
      ] as (...args: unknown[]) => void;
      if (typeof consoleMethod === "function") {
        consoleMethod(
          `[${timestamp}] ${level.toUpperCase()}: ${message}`,
          data || ""
        );
      } else {
        console.log(
          `[${timestamp}] ${level.toUpperCase()}: ${message}`,
          data || ""
        );
      }
    }

    // In production, you could send logs to a service like LogRocket, Sentry, etc.
    if (process.env.NODE_ENV === "production") {
      // Send to logging service
      // Example: window.gtag && window.gtag('event', 'log', { timestamp, level, message, data })
    }
  };

  return {
    info: (message: string, data?: Record<string, unknown>) =>
      log("info", message, data),
    warn: (message: string, data?: Record<string, unknown>) =>
      log("warn", message, data),
    error: (message: string, data?: Record<string, unknown>) =>
      log("error", message, data),
    debug: (message: string, data?: Record<string, unknown>) =>
      log("debug", message, data),
  };
};

// Client-side security logger
export const clientSecurityLogger = {
  authAttempt: (success: boolean, details?: Record<string, unknown>) => {
    const logger = createClientLogger();
    logger.info("Authentication attempt", {
      type: "auth_attempt",
      success,
      timestamp: new Date().toISOString(),
      ...details,
    });
  },

  suspiciousActivity: (activity: string, details?: Record<string, unknown>) => {
    const logger = createClientLogger();
    logger.warn("Suspicious activity detected", {
      type: "suspicious_activity",
      activity,
      timestamp: new Date().toISOString(),
      ...details,
    });
  },

  systemError: (error: Error, context?: Record<string, unknown>) => {
    const logger = createClientLogger();
    logger.error("System error", {
      type: "system_error",
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      ...context,
    });
  },
};

export default createClientLogger;
