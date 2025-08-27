import { NextRequest, NextResponse } from 'next/server'
import { RateLimiterMemory } from 'rate-limiter-flexible'

// Rate limiters for different endpoints
const rateLimiters = {
  general: new RateLimiterMemory({
    keyPrefix: 'general',
    points: 100, // Number of requests
    duration: 60, // Per 60 seconds
  }),
  auth: new RateLimiterMemory({
    keyPrefix: 'auth',
    points: 5, // Number of auth attempts
    duration: 900, // Per 15 minutes
  }),
  api: new RateLimiterMemory({
    keyPrefix: 'api',
    points: 50, // Number of API requests
    duration: 60, // Per 60 seconds
  }),
  admin: new RateLimiterMemory({
    keyPrefix: 'admin',
    points: 10, // Number of admin requests
    duration: 60, // Per 60 seconds
  }),
}

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
    const rejection = rejRes as { msBeforeNext: number };
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