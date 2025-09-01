import { logger } from "./logger";
import { isProduction } from "./config";

// Custom error types for better error handling
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly code?: string;
  public readonly context?: Record<string, unknown>;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    code?: string,
    context?: Record<string, unknown>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.code = code;
    this.context = context;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 400, true, "VALIDATION_ERROR", context);
  }
}

export class AuthenticationError extends AppError {
  constructor(
    message: string = "Authentication required",
    context?: Record<string, unknown>
  ) {
    super(message, 401, true, "AUTHENTICATION_ERROR", context);
  }
}

export class AuthorizationError extends AppError {
  constructor(
    message: string = "Insufficient permissions",
    context?: Record<string, unknown>
  ) {
    super(message, 403, true, "AUTHORIZATION_ERROR", context);
  }
}

export class NotFoundError extends AppError {
  constructor(
    resource: string = "Resource",
    context?: Record<string, unknown>
  ) {
    super(`${resource} not found`, 404, true, "NOT_FOUND_ERROR", context);
  }
}

export class ConflictError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 409, true, "CONFLICT_ERROR", context);
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = "Rate limit exceeded", retryAfter?: number) {
    super(message, 429, true, "RATE_LIMIT_ERROR", { retryAfter });
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 500, true, "DATABASE_ERROR", context);
  }
}

export class ExternalServiceError extends AppError {
  constructor(
    service: string,
    message: string,
    context?: Record<string, unknown>
  ) {
    super(`${service}: ${message}`, 502, true, "EXTERNAL_SERVICE_ERROR", {
      service,
      ...context,
    });
  }
}

// Error handler for API routes
export const handleApiError = (
  error: unknown,
  context?: Record<string, unknown>
): {
  error: {
    message: string;
    code?: string;
    statusCode: number;
    details?: Record<string, unknown>;
  };
  statusCode: number;
} => {
  if (error instanceof AppError) {
    logger.warn("Application error", {
      message: error.message,
      statusCode: error.statusCode,
      code: error.code,
      context: { ...error.context, ...context },
      stack: !isProduction() ? error.stack : undefined,
    });

    return {
      error: {
        message: error.message,
        code: error.code,
        statusCode: error.statusCode,
        ...(error.context && { details: error.context }),
      },
      statusCode: error.statusCode,
    };
  }

  // Handle known error types
  if (error && typeof error === "object" && "message" in error) {
    const err = error as {
      message: string;
      code?: string;
      statusCode?: number;
    };

    // Supabase/PostgreSQL errors
    if (err.code === "23505") {
      return handleApiError(
        new ConflictError("Resource already exists"),
        context
      );
    }

    if (err.code === "23503") {
      return handleApiError(new ValidationError("Invalid reference"), context);
    }

    if (err.code === "PGRST116") {
      return handleApiError(new NotFoundError("Resource"), context);
    }
  }

  // Unknown error
  logger.error("Unhandled error", {
    error: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    context,
  });

  return {
    error: {
      message: isProduction() ? "An unexpected error occurred" : String(error),
      code: "INTERNAL_ERROR",
      statusCode: 500,
    },
    statusCode: 500,
  };
};

// Async error wrapper for API routes
export const asyncHandler = (
  fn: (req: Request, context?: Record<string, unknown>) => Promise<Response>
) => {
  return async (req: Request, context?: Record<string, unknown>) => {
    try {
      return await fn(req, context);
    } catch (error) {
      return handleApiError(error, { url: req?.url, method: req?.method });
    }
  };
};

// Database operation wrapper with proper error handling
export const dbOperation = async <T>(
  operation: () => Promise<{ data: T | null; error: unknown }>,
  errorMessage: string = "Database operation failed"
): Promise<{ data: T | null; error: AppError | null }> => {
  try {
    const result = await operation();

    if (result.error) {
      // Map common Supabase errors to custom errors
      if (
        typeof result.error === "object" &&
        result.error !== null &&
        "code" in result.error
      ) {
        const errorWithCode = result.error as {
          code: string;
          message?: string;
        };
        if (errorWithCode.code === "PGRST116") {
          throw new NotFoundError("Resource");
        }
        if (errorWithCode.code === "23505") {
          throw new ConflictError("Resource already exists");
        }
        if (errorWithCode.code === "23503") {
          throw new ValidationError("Invalid reference");
        }
        throw new DatabaseError(errorWithCode.message || errorMessage);
      }
      throw new DatabaseError(
        typeof result.error === "object" &&
        result.error !== null &&
        "message" in result.error
          ? (result.error as { message?: string }).message || errorMessage
          : errorMessage
      );
    }

    return { data: result.data, error: null };
  } catch (error) {
    if (error instanceof AppError) {
      return { data: null, error };
    }

    logger.error("Database operation failed", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });

    return {
      data: null,
      error: new DatabaseError(errorMessage),
    };
  }
};

// Validation helper
export const validateRequired = (
  data: Record<string, unknown>,
  fields: string[]
) => {
  const missing = fields.filter((field) => !data[field]);

  if (missing.length > 0) {
    throw new ValidationError(
      `Missing required fields: ${missing.join(", ")}`,
      { missing }
    );
  }
};

// Retry helper with exponential backoff
export const retryOperation = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt === maxRetries) {
        break;
      }

      const delay = baseDelay * Math.pow(2, attempt);
      logger.warn("Operation failed, retrying", {
        attempt: attempt + 1,
        maxRetries,
        delay,
        error: lastError.message,
      });

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
};

// Circuit breaker pattern for external services
class CircuitBreaker {
  private failures = 0;
  private lastFailureTime = 0;
  private state: "CLOSED" | "OPEN" | "HALF_OPEN" = "CLOSED";

  constructor(private threshold: number = 5, private timeout: number = 60000) {}

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state === "OPEN") {
      if (Date.now() - this.lastFailureTime < this.timeout) {
        throw new ExternalServiceError(
          "Circuit Breaker",
          "Service unavailable"
        );
      }
      this.state = "HALF_OPEN";
    }

    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess() {
    this.failures = 0;
    this.state = "CLOSED";
  }

  private onFailure() {
    this.failures++;
    this.lastFailureTime = Date.now();

    if (this.failures >= this.threshold) {
      this.state = "OPEN";
    }
  }
}

export const circuitBreaker = new CircuitBreaker();
