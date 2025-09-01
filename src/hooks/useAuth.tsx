"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User, Session } from "@supabase/supabase-js";
import { auth } from "@/lib/supabase";
import toast from "react-hot-toast";
import { clientSecurityLogger } from "@/lib/clientLogger";

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
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data, error } = await auth.getSession();
        if (error) {
          console.error("Error getting session:", error);
        } else if (data && data.session) {
          setSession(data.session);
          setUser(data.session.user);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      // Log auth events for security monitoring
      if (typeof window !== "undefined") {
        clientSecurityLogger.authAttempt(event === "SIGNED_IN", {
          event,
          userId: session?.user?.id,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);

      const { data, error } = await auth.signIn(email, password);

      if (error) {
        console.error("Sign in error:", error);
        toast.error(error.message || "Failed to sign in");
        return false;
      }

      if (data?.user) {
        setUser(data.user);
        setSession(data.session);
        toast.success("Welcome back!");
        return true;
      }

      return false;
    } catch (error: unknown) {
      console.error("Sign in error:", error);
      toast.error("An unexpected error occurred");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);

      const { data, error } = await auth.signUp(email, password);

      if (error) {
        console.error("Sign up error:", error);
        toast.error(error.message || "Failed to create account");
        return false;
      }

      if (data && data.user) {
        if (data.user.email_confirmed_at) {
          setUser(data.user);
          setSession(data.session);
          toast.success("Welcome to Anti-Tutorial Hell!");
        } else {
          toast.success("Please check your email to confirm your account");
        }
        return true;
      }

      return false;
    } catch (error: unknown) {
      console.error("Sign up error:", error);
      toast.error("An unexpected error occurred");
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
        toast.error(error.message || "Failed to sign out");
      } else {
        toast.success("Signed out successfully");
      }
    } catch (error: unknown) {
      toast.error("An unexpected error occurred");
      console.error("Sign out error:", error);
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
