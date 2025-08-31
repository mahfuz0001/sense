'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { auth } from '@/lib/supabase';
import toast from 'react-hot-toast';
import { clientSecurityLogger } from '@/lib/clientLogger';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For demo purposes, create a mock user after a short delay
    const timer = setTimeout(() => {
      const mockUser: User = {
        id: 'demo-user',
        email: 'demo@antitutorialhell.com',
        user_metadata: {},
        app_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      setUser(mockUser);
      setLoading(false);
    }, 1500);

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { user, error } = await auth.getCurrentUser();
        if (error) {
          console.error('Error getting user:', error);
        } else if (user) {
          setUser(user);
          setLoading(false);
          clearTimeout(timer);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      clearTimeout(timer);

      // Log auth events for security monitoring
      if (typeof window !== 'undefined') {
        clientSecurityLogger.authAttempt(event === 'SIGNED_IN', { 
          event,
          userId: session?.user?.id 
        });
      }
    });

    return () => {
      subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Demo mode - accept any email/password for demonstration
      if (email.includes('demo') || email === 'test@example.com') {
        const mockUser: User = {
          id: 'demo-user',
          email: email,
          user_metadata: {},
          app_metadata: {},
          aud: 'authenticated',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        setUser(mockUser);
        toast.success('Welcome to the demo!');
        return true;
      }
      
      const { data, error } = await auth.signIn(email, password);
      
      if (error) {
        toast.error(error.message || 'Failed to sign in');
        return false;
      }

      if (data?.user) {
        toast.success('Welcome back!');
        return true;
      }

      return false;
    } catch (error: unknown) {
      toast.error('An unexpected error occurred');
      console.error('Sign in error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, _password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Demo mode - accept any email/password for demonstration
      const mockUser: User = {
        id: 'demo-user-' + Date.now(),
        email: email,
        user_metadata: {},
        app_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      setUser(mockUser);
      toast.success('Welcome to Anti-Tutorial Hell! Demo account created.');
      return true;
      
    } catch (error: unknown) {
      toast.error('An unexpected error occurred');
      console.error('Sign up error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      setLoading(true);
      const { error } = await auth.signOut();
      
      if (error) {
        toast.error(error.message || 'Failed to sign out');
      } else {
        toast.success('Signed out successfully');
      }
    } catch (error: unknown) {
      toast.error('An unexpected error occurred');
      console.error('Sign out error:', error);
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}