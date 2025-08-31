import { NextRequest, NextResponse } from 'next/server'

// Edge-compatible rate limiter using Map
interface RateLimitEntry {
  count: number
  resetTime: number
}

// Simple in-memory rate limiter compatible with Edge Runtime
class EdgeRateLimiter {
  private cache = new Map<string, RateLimitEntry>()
  
  constructor(
    public readonly points: number,
    public readonly duration: number, // in seconds
    public readonly keyPrefix: string
  ) {}

  async consume(key: string): Promise<void> {
    const now = Date.now()
    const fullKey = `${this.keyPrefix}:${key}`
    const entry = this.cache.get(fullKey)

    // Clean up expired entries
    if (entry && now > entry.resetTime) {
      this.cache.delete(fullKey)
    }

    const currentEntry = this.cache.get(fullKey)
    
    if (!currentEntry) {
      // First request
      this.cache.set(fullKey, {
        count: 1,
        resetTime: now + (this.duration * 1000)
      })
      return
    }

    if (currentEntry.count >= this.points) {
      throw {
        msBeforeNext: currentEntry.resetTime - now,
        totalHits: currentEntry.count
      }
    }

    // Increment counter
    currentEntry.count++
    this.cache.set(fullKey, currentEntry)
  }

  async get(key: string): Promise<{ totalHits: number } | null> {
    const fullKey = `${this.keyPrefix}:${key}`
    const entry = this.cache.get(fullKey)
    
    if (!entry || Date.now() > entry.resetTime) {
      return null
    }
    
    return { totalHits: entry.count }
  }

  // Cleanup expired entries periodically
  cleanup(): void {
    const now = Date.now()
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.resetTime) {
        this.cache.delete(key)
      }
    }
  }
}

// Rate limiters for different endpoints
const rateLimiters = {
  general: new EdgeRateLimiter(100, 60, 'general'),
  auth: new EdgeRateLimiter(5, 900, 'auth'),
  api: new EdgeRateLimiter(50, 60, 'api'),
  admin: new EdgeRateLimiter(10, 60, 'admin'),
}

// Periodic cleanup (run every 5 minutes)
setInterval(() => {
  Object.values(rateLimiters).forEach(limiter => limiter.cleanup())
}, 5 * 60 * 1000)

// Get client IP address
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  if (realIP) {
    return realIP
  }
  
  return 'unknown'
}

// Get appropriate rate limiter based on path
function getRateLimiter(pathname: string) {
  if (pathname.startsWith('/api/auth')) {
    return rateLimiters.auth
  }
  if (pathname.startsWith('/admin')) {
    return rateLimiters.admin
  }
  if (pathname.startsWith('/api')) {
    return rateLimiters.api
  }
  return rateLimiters.general
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const clientIP = getClientIP(request)
  const rateLimiter = getRateLimiter(pathname)
  
  try {
    await rateLimiter.consume(clientIP)
  } catch (rejRes: unknown) {
    const rejection = rejRes as { msBeforeNext: number; totalHits?: number };
    const secs = Math.round(rejection.msBeforeNext / 1000) || 1;
    
    // Return rate limit exceeded response
    return new NextResponse(
      JSON.stringify({
        error: 'Too Many Requests',
        message: `Rate limit exceeded. Try again in ${secs} seconds.`,
        retryAfter: secs,
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(secs),
          'X-RateLimit-Limit': String(rateLimiter.points),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Date.now() + rejection.msBeforeNext),
        },
      }
    )
  }

  // Add security headers
  const response = NextResponse.next()
  
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  
  // Rate limit headers for successful requests
  const remaining = await rateLimiter.get(clientIP)
  const remainingPoints = remaining ? rateLimiter.points - remaining.totalHits : rateLimiter.points
  
  response.headers.set('X-RateLimit-Limit', String(rateLimiter.points))
  response.headers.set('X-RateLimit-Remaining', String(Math.max(0, remainingPoints)))
  response.headers.set('X-RateLimit-Reset', String(Date.now() + (rateLimiter.duration * 1000)))
  
  return response
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}