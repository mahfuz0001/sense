'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SecureInput from '@/components/ui/secure-input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { useForm } from '@/hooks/useForm'
import { LoadingSpinner } from '@/components/ui/loading'
import { z } from 'zod'

// Form schemas
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'login' | 'signup'
  onToggleMode: () => void
}

export function AuthModal({ isOpen, onClose, mode, onToggleMode }: AuthModalProps) {
  const { signIn, signUp } = useAuth();

  const loginForm = useForm<LoginFormData>({
    schema: loginSchema,
    onSubmit: async (data) => {
      const success = await signIn(data.email, data.password);
      if (success) {
        onClose();
        loginForm.reset();
      }
    },
  });

  const signupForm = useForm<SignupFormData>({
    schema: signupSchema,
    onSubmit: async (data) => {
      const success = await signUp(data.email, data.password);
      if (success) {
        onClose();
        signupForm.reset();
      }
    },
  });

  const form = mode === 'login' ? loginForm : signupForm;

  const handleClose = () => {
    onClose();
    form.reset();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md mx-4"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>
                      {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                    </CardTitle>
                    <CardDescription>
                      {mode === 'login' 
                        ? 'Sign in to continue your coding journey'
                        : 'Join the Sense learning platform'
                      }
                    </CardDescription>
                  </div>
                  <button
                    onClick={handleClose}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </CardHeader>

              <CardContent>
                <form onSubmit={form.handleSubmit} className="space-y-4">
                  {mode === 'signup' && (
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name
                      </label>
                      <SecureInput
                        id="name"
                        type="text"
                        value={(signupForm.values as SignupFormData).name || ''}
                        onChange={(e) => signupForm.setValue('name', e.target.value)}
                        placeholder="Enter your full name"
                        sanitize={true}
                        showValidation={true}
                      />
                      {signupForm.errors.name && (
                        <p className="mt-1 text-sm text-red-600">{signupForm.errors.name}</p>
                      )}
                    </div>
                  )}

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <SecureInput
                      id="email"
                      variant="email"
                      value={form.values.email || ''}
                      onChange={(e) => form.setValue('email', e.target.value)}
                      placeholder="Enter your email"
                      showValidation={true}
                    />
                    {form.errors.email && (
                      <p className="mt-1 text-sm text-red-600">{form.errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Password
                    </label>
                    <SecureInput
                      id="password"
                      variant="password"
                      value={form.values.password || ''}
                      onChange={(e) => form.setValue('password', e.target.value)}
                      placeholder="Enter your password"
                      sanitize={false}
                      showValidation={true}
                    />
                    {form.errors.password && (
                      <p className="mt-1 text-sm text-red-600">{form.errors.password}</p>
                    )}
                  </div>

                  {mode === 'signup' && (
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Confirm Password
                      </label>
                      <SecureInput
                        id="confirmPassword"
                        variant="password"
                        value={(signupForm.values as SignupFormData).confirmPassword || ''}
                        onChange={(e) => signupForm.setValue('confirmPassword', e.target.value)}
                        placeholder="Confirm your password"
                        sanitize={false}
                        showValidation={true}
                      />
                      {signupForm.errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">{signupForm.errors.confirmPassword}</p>
                      )}
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={form.isSubmitting || !form.isValid}
                  >
                    {form.isSubmitting ? (
                      <LoadingSpinner size="sm" text={mode === 'login' ? 'Signing in...' : 'Creating account...'} />
                    ) : (
                      mode === 'login' ? 'Sign In' : 'Create Account'
                    )}
                  </Button>

                  <div className="text-center space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                      <button
                        type="button"
                        onClick={onToggleMode}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {mode === 'login' ? 'Sign up' : 'Sign in'}
                      </button>
                    </p>
                    
                    {mode === 'signup' && (
                      <p className="text-xs text-gray-500 text-center">
                        By creating an account, you agree to escape tutorial hell and build real skills.
                      </p>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}