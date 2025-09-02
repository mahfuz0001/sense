// Production-ready configuration management
import { z } from "zod";

// Environment validation schema
const envSchema = z.object({
  // Supabase Configuration
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .url()
    .default("https://vorhhmskuyckiaoddfln.supabase.co"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1)
    .default(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvcmhobXNrdXlja2lhb2RkZmxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzMDcyNDYsImV4cCI6MjA3MTg4MzI0Nn0.S68TkCQyykp8xq0ETsmC4kLk6vJ4VJODHiXaQYVuVGc"
    ),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),

  // Database Configuration
  DATABASE_URL: z.string().optional(),

  // Security Configuration
  NEXTAUTH_SECRET: z.string().min(32).optional(),
  NEXTAUTH_URL: z.string().url().optional(),

  // Rate Limiting Configuration
  RATE_LIMIT_WINDOW_MS: z.string().transform(Number).default(60000),
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(Number).default(100),

  // Logging Configuration
  LOG_LEVEL: z.enum(["error", "warn", "info", "debug"]).default("info"),
  LOG_TO_FILE: z
    .string()
    .transform((val) => val === "true")
    .default(false),

  // WebAuthn Configuration
  WEBAUTHN_RP_NAME: z.string().default("Sense"),
  WEBAUTHN_RP_ID: z.string().default("localhost"),
  WEBAUTHN_ORIGIN: z.string().url().default("http://localhost:3000"),

  // Application Configuration
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  // Monitoring & Analytics
  SENTRY_DSN: z.string().optional(),
  GOOGLE_ANALYTICS_ID: z.string().optional(),

  // Redis Configuration (for caching)
  REDIS_URL: z.string().optional(),
  REDIS_PASSWORD: z.string().optional(),

  // Email Configuration
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().transform(Number).optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),

  // Feature Flags
  ENABLE_ANALYTICS: z
    .string()
    .transform((val) => val === "true")
    .default(false),
  ENABLE_CACHING: z
    .string()
    .transform((val) => val === "true")
    .default(false),
  ENABLE_DEBUG_MODE: z
    .string()
    .transform((val) => val === "true")
    .default(false),
});

// Parse and validate environment variables
const parseEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    console.error("❌ Invalid environment variables:", error);
    throw new Error("Environment validation failed");
  }
};

// Export validated configuration
export const config = parseEnv();

// Utility functions
export const isProduction = () => config.NODE_ENV === "production";
export const isDevelopment = () => config.NODE_ENV === "development";
export const isTest = () => config.NODE_ENV === "test";

// Database configuration
export const dbConfig = {
  url: config.NEXT_PUBLIC_SUPABASE_URL,
  anonKey: config.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  serviceRoleKey: config.SUPABASE_SERVICE_ROLE_KEY,
  maxConnections: isProduction() ? 20 : 5,
  connectionTimeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
};

// Rate limiting configuration
export const rateLimitConfig = {
  windowMs: config.RATE_LIMIT_WINDOW_MS,
  maxRequests: config.RATE_LIMIT_MAX_REQUESTS,
  auth: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5,
  },
  api: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 50,
  },
  admin: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10,
  },
};

// Security configuration
export const securityConfig = {
  bcryptRounds: isProduction() ? 12 : 10,
  jwtExpiry: "7d",
  sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours
  maxLoginAttempts: 5,
  lockoutDuration: 15 * 60 * 1000, // 15 minutes
};

// Logging configuration
export const loggingConfig = {
  level: config.LOG_LEVEL,
  toFile: config.LOG_TO_FILE,
  maxFiles: 5,
  maxSize: "10m",
  format: isProduction() ? "json" : "simple",
};
