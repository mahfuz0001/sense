import { NextRequest, NextResponse } from 'next/server'
import { securityLogger } from '@/lib/logger'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export async function POST(request: NextRequest) {
  try {
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                    request.headers.get('x-real-ip') || 
                    'unknown'
    
    const body = await request.json()
    
    // Validate input
    const result = authSchema.safeParse(body)
    if (!result.success) {
      securityLogger.authAttempt(clientIP, false, { 
        reason: 'invalid_input',
        errors: result.error.issues 
      })
      
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.issues },
        { status: 400 }
      )
    }
    
    const { email, password } = result.data
    
    // Simulate authentication (in real app, check against database)
    const validEmail = 'admin@antitutorialhell.com'
    const validPasswordHash = await bcrypt.hash('securepassword123', 10)
    
    const isEmailValid = email === validEmail
    const isPasswordValid = await bcrypt.compare(password, validPasswordHash)
    
    if (!isEmailValid || !isPasswordValid) {
      securityLogger.authAttempt(clientIP, false, { 
        email,
        reason: 'invalid_credentials'
      })
      
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }
    
    securityLogger.authAttempt(clientIP, true, { email })
    
    return NextResponse.json({
      success: true,
      message: 'Authentication successful',
      user: { email, role: 'admin' }
    })
    
  } catch (error) {
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
    securityLogger.systemError(error as Error, { 
      endpoint: '/api/auth',
      ip: clientIP 
    })
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}