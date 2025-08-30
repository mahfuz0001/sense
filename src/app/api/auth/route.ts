import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/supabase';
import { securityLogger } from '@/lib/logger';
import { 
  ValidationError, 
  AuthenticationError, 
  handleApiError, 
  validateRequired 
} from '@/lib/errors';
import { z } from 'zod';

// Enhanced validation schemas
const authSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const signUpSchema = authSchema.extend({
  confirmPassword: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
}).refine((data) => {
  if (data.confirmPassword && data.password !== data.confirmPassword) {
    return false;
  }
  return true;
}, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export async function POST(request: NextRequest) {
  const start = Date.now();
  const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                  request.headers.get('x-real-ip') || 
                  'unknown';
  
  try {
    const body = await request.json();
    const { action } = body;
    
    // Route to appropriate authentication action
    switch (action) {
      case 'signin':
        return await handleSignIn(body, clientIP, start);
      case 'signup':
        return await handleSignUp(body, clientIP, start);
      case 'signout':
        return await handleSignOut(clientIP, start);
      case 'refresh':
        return await handleRefreshSession(clientIP, start);
      case 'reset-password':
        return await handleResetPassword(body, clientIP, start);
      case 'update-password':
        return await handleUpdatePassword(body, clientIP, start);
      default:
        throw new ValidationError('Invalid action specified');
    }
    
  } catch (error) {
    const { error: apiError, statusCode } = handleApiError(error, {
      endpoint: '/api/auth',
      ip: clientIP,
      duration: Date.now() - start,
    });
    
    securityLogger.authAttempt(clientIP, false, { 
      endpoint: '/api/auth',
      error: apiError.message,
      duration: Date.now() - start,
    });
    
    return NextResponse.json(apiError, { status: statusCode });
  }
}

interface SignInBody {
  email: string;
  password: string;
}

async function handleSignIn(body: SignInBody, clientIP: string, start: number) {
  const result = authSchema.safeParse(body);
  
  if (!result.success) {
    throw new ValidationError('Invalid input', { 
      errors: result.error.issues 
    });
  }
  
  const { email, password } = result.data;
  
  const { data, error } = await auth.signIn(email, password);
  
  if (error || !data) {
    securityLogger.authAttempt(clientIP, false, { 
      email,
      reason: 'invalid_credentials',
      duration: Date.now() - start,
    });
    
    throw new AuthenticationError('Invalid credentials');
  }
  
  securityLogger.authAttempt(clientIP, true, { 
    email,
    userId: data.user?.id,
    duration: Date.now() - start,
  });
  
  return NextResponse.json({
    success: true,
    message: 'Authentication successful',
    user: {
      id: data.user?.id,
      email: data.user?.email,
      role: data.user?.user_metadata?.role || 'user',
    },
    session: {
      access_token: data.session?.access_token,
      refresh_token: data.session?.refresh_token,
      expires_at: data.session?.expires_at,
    },
  });
}

interface SignUpBody {
  email: string;
  password: string;
  confirmPassword?: string;
  metadata?: Record<string, string>;
}

async function handleSignUp(body: SignUpBody, clientIP: string, start: number) {
  const result = signUpSchema.safeParse(body);
  
  if (!result.success) {
    throw new ValidationError('Invalid input', { 
      errors: result.error.issues 
    });
  }
  
  const { email, password, metadata } = result.data;
  
  const { data, error } = await auth.signUp(email, password, metadata);
  
  if (error || !data) {
    securityLogger.authAttempt(clientIP, false, { 
      email,
      reason: 'signup_failed',
      error: error?.message || 'No data returned',
      duration: Date.now() - start,
    });
    
    // Handle specific signup errors
    if (error?.message.includes('already registered')) {
      throw new ValidationError('Email already registered');
    }
    
    throw new ValidationError(error?.message || 'Signup failed');
  }
  
  securityLogger.authAttempt(clientIP, true, { 
    email,
    userId: data.user?.id,
    action: 'signup',
    duration: Date.now() - start,
  });
  
  return NextResponse.json({
    success: true,
    message: 'Account created successfully. Please check your email for verification.',
    user: {
      id: data.user?.id,
      email: data.user?.email,
      email_confirmed: data.user?.email_confirmed_at !== null,
    },
  }, { status: 201 });
}

async function handleSignOut(clientIP: string, start: number) {
  const { error } = await auth.signOut();
  
  if (error) {
    securityLogger.authAttempt(clientIP, false, { 
      action: 'signout',
      error: error.message,
      duration: Date.now() - start,
    });
    
    throw new AuthenticationError('Signout failed');
  }
  
  securityLogger.authAttempt(clientIP, true, { 
    action: 'signout',
    duration: Date.now() - start,
  });
  
  return NextResponse.json({
    success: true,
    message: 'Signed out successfully',
  });
}

async function handleRefreshSession(clientIP: string, start: number) {
  const { data, error } = await auth.refreshSession();
  
  if (error || !data) {
    securityLogger.authAttempt(clientIP, false, { 
      action: 'refresh',
      error: error?.message || 'No data returned',
      duration: Date.now() - start,
    });
    
    throw new AuthenticationError('Session refresh failed');
  }
  
  securityLogger.authAttempt(clientIP, true, { 
    action: 'refresh',
    userId: data.user?.id,
    duration: Date.now() - start,
  });
  
  return NextResponse.json({
    success: true,
    session: {
      access_token: data.session?.access_token,
      refresh_token: data.session?.refresh_token,
      expires_at: data.session?.expires_at,
    },
  });
}

interface ResetPasswordBody extends Record<string, unknown> {
  email: string;
}

async function handleResetPassword(body: ResetPasswordBody, clientIP: string, start: number) {
  validateRequired(body, ['email']);
  
  const emailSchema = z.object({
    email: z.string().email('Invalid email format'),
  });
  
  const result = emailSchema.safeParse(body);
  
  if (!result.success) {
    throw new ValidationError('Invalid email format');
  }
  
  const { email } = result.data;
  
  const { error } = await auth.resetPassword(email);
  
  if (error) {
    securityLogger.authAttempt(clientIP, false, { 
      email,
      action: 'reset_password',
      error: error.message,
      duration: Date.now() - start,
    });
    
    throw new ValidationError('Password reset failed');
  }
  
  securityLogger.authAttempt(clientIP, true, { 
    email,
    action: 'reset_password',
    duration: Date.now() - start,
  });
  
  return NextResponse.json({
    success: true,
    message: 'Password reset link sent to your email',
  });
}

interface UpdatePasswordBody extends Record<string, unknown> {
  password: string;
}

async function handleUpdatePassword(body: UpdatePasswordBody, clientIP: string, start: number) {
  validateRequired(body, ['password']);
  
  const passwordSchema = z.object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
  });
  
  const result = passwordSchema.safeParse(body);
  
  if (!result.success) {
    throw new ValidationError('Invalid password format');
  }
  
  const { password } = result.data;
  
  const { data, error } = await auth.updatePassword(password);
  
  if (error || !data) {
    securityLogger.authAttempt(clientIP, false, { 
      action: 'update_password',
      error: error?.message || 'No data returned',
      duration: Date.now() - start,
    });
    
    throw new AuthenticationError('Password update failed');
  }
  
  securityLogger.authAttempt(clientIP, true, { 
    action: 'update_password',
    userId: data.user?.id,
    duration: Date.now() - start,
  });
  
  return NextResponse.json({
    success: true,
    message: 'Password updated successfully',
  });
}