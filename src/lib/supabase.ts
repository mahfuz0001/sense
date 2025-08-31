import { createClient, Session, SupabaseClient } from '@supabase/supabase-js';
import { config, dbConfig, isProduction } from './config';
import { logger } from './logger';

// Enhanced Supabase client with production configurations
const createSupabaseClient = (): SupabaseClient => {
  const client = createClient(
    config.NEXT_PUBLIC_SUPABASE_URL,
    config.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      },
      db: {
        schema: 'public',
      },
      global: {
        headers: {
          'X-Client-Info': `anti-tutorial-hell@${process.env.npm_package_version || '1.0.0'}`,
        },
      },
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    }
  );

  // Add error logging for database operations
  if (isProduction()) {
    const originalFrom = client.from.bind(client);
    client.from = (relation: string) => {
      const table = originalFrom(relation);
      
      // Wrap query methods with error logging
      const wrapMethod = (method: string, fn: (...args: unknown[]) => unknown) => {
        return (...args: unknown[]) => {
          const start = Date.now();
          const result = fn.apply(table, args);
          
          if (result?.then) {
            return result
              .then((data: unknown) => {
                const duration = Date.now() - start;
                logger.debug('Database query completed', {
                  table: relation,
                  method,
                  duration,
                  success: !data.error,
                });
                return data;
              })
              .catch((error: Error) => {
                const duration = Date.now() - start;
                logger.error('Database query failed', {
                  table: relation,
                  method,
                  duration,
                  error: error.message,
                });
                throw error;
              });
          }
          
          return result;
        };
      };

      ['select', 'insert', 'update', 'delete', 'upsert'].forEach(method => {
        if (table[method]) {
          table[method] = wrapMethod(method, table[method]);
        }
      });

      return table;
    };
  }

  return client;
};

export const supabase = createSupabaseClient();

// Enhanced Auth helpers with better error handling and logging
export const auth = {
  signUp: async (email: string, password: string, metadata?: Record<string, unknown>) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });
      
      if (error) {
        logger.warn('User signup failed', { email, error: error.message });
      } else {
        logger.info('User signed up successfully', { email, userId: data.user?.id });
      }
      
      return { data, error };
    } catch (err) {
      logger.error('Signup error', { email, error: err });
      return { data: null, error: { message: 'Signup failed' } };
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        logger.warn('User signin failed', { email, error: error.message });
      } else {
        logger.info('User signed in successfully', { email, userId: data.user?.id });
      }
      
      return { data, error };
    } catch (err) {
      logger.error('Signin error', { email, error: err });
      return { data: null, error: { message: 'Signin failed' } };
    }
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        logger.warn('User signout failed', { error: error.message });
      } else {
        logger.info('User signed out successfully');
      }
      
      return { error };
    } catch (err) {
      logger.error('Signout error', { error: err });
      return { error: { message: 'Signout failed' } };
    }
  },

  getCurrentUser: async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      return { user, error };
    } catch (err) {
      logger.error('Get current user error', { error: err });
      return { user: null, error: { message: 'Failed to get current user' } };
    }
  },

  getUser: async (accessToken: string) => {
    try {
      const { data, error } = await supabase.auth.getUser(accessToken);
      return { data, error };
    } catch (err) {
      logger.error('Get user with token error', { error: err });
      return { data: null, error: { message: 'Failed to get user with token' } };
    }
  },

  getSession: async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      return { data, error };
    } catch (err) {
      logger.error('Get session error', { error: err });
      return { data: null, error: { message: 'Failed to get session' } };
    }
  },

  refreshSession: async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      return { data, error };
    } catch (err) {
      logger.error('Refresh session error', { error: err });
      return { data: null, error: { message: 'Failed to refresh session' } };
    }
  },

  resetPassword: async (email: string) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${config.NEXTAUTH_URL || 'http://localhost:3000'}/auth/reset-password`,
      });
      
      if (!error) {
        logger.info('Password reset requested', { email });
      }
      
      return { data, error };
    } catch (err) {
      logger.error('Password reset error', { email, error: err });
      return { data: null, error: { message: 'Password reset failed' } };
    }
  },

  updatePassword: async (password: string) => {
    try {
      const { data, error } = await supabase.auth.updateUser({ password });
      
      if (!error) {
        logger.info('Password updated successfully');
      }
      
      return { data, error };
    } catch (err) {
      logger.error('Password update error', { error: err });
      return { data: null, error: { message: 'Password update failed' } };
    }
  },

  onAuthStateChange: (callback: (event: string, session: Session | null) => void) => {
    return supabase.auth.onAuthStateChange((event, session) => {
      logger.debug('Auth state changed', { event, userId: session?.user?.id });
      callback(event, session);
    });
  }
};

// Enhanced Database helpers with retry logic, caching, and better error handling
const withRetry = async <T>(
  operation: () => Promise<T>,
  retries: number = dbConfig.retryAttempts,
  delay: number = dbConfig.retryDelay
): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    if (retries > 0) {
      logger.warn(`Database operation failed, retrying in ${delay}ms`, { 
        retriesLeft: retries - 1,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      await new Promise(resolve => setTimeout(resolve, delay));
      return withRetry(operation, retries - 1, delay * 2);
    }
    throw error;
  }
};

export const db = {
  // User progress with enhanced error handling
  getUserProgress: async (userId: string) => {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId);
      
      if (error) {
        logger.error('Failed to get user progress', { userId, error: error.message });
      }
      
      return { data, error };
    });
  },

  updateChallengeProgress: async (
    userId: string, 
    challengeId: string, 
    status: 'not_started' | 'in_progress' | 'completed', 
    code?: string, 
    hints_used?: number
  ) => {
    return withRetry(async () => {
      const updateData: Record<string, unknown> = {
        user_id: userId,
        challenge_id: challengeId,
        status,
        updated_at: new Date().toISOString(),
      };

      if (code !== undefined) updateData.current_code = code;
      if (hints_used !== undefined) updateData.hints_used = hints_used;
      if (status === 'completed') updateData.completed_at = new Date().toISOString();

      const { data, error } = await supabase
        .from('user_progress')
        .upsert(updateData, { 
          onConflict: 'user_id,challenge_id',
          ignoreDuplicates: false 
        })
        .select();
      
      if (error) {
        logger.error('Failed to update challenge progress', { 
          userId, 
          challengeId, 
          status, 
          error: error.message 
        });
      } else {
        logger.info('Challenge progress updated', { userId, challengeId, status });
      }
      
      return { data, error };
    });
  },

  // Enhanced challenge retrieval with caching headers
  getChallenges: async (category?: string, difficulty?: string) => {
    return withRetry(async () => {
      let query = supabase
        .from('challenges')
        .select('*')
        .order('created_at', { ascending: false });

      if (category) query = query.eq('category', category);
      if (difficulty) query = query.eq('difficulty', difficulty);

      const { data, error } = await query;
      
      if (error) {
        logger.error('Failed to get challenges', { category, difficulty, error: error.message });
      }
      
      return { data, error };
    });
  },

  getChallenge: async (challengeId: string) => {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .eq('id', challengeId)
        .single();
      
      if (error) {
        logger.error('Failed to get challenge', { challengeId, error: error.message });
      }
      
      return { data, error };
    });
  },

  // Learning paths
  getLearningPaths: async () => {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('learning_paths')
        .select(`
          *,
          learning_path_challenges(
            order_index,
            challenges(id, title, difficulty, category)
          )
        `)
        .order('order_index', { ascending: true });
      
      if (error) {
        logger.error('Failed to get learning paths', { error: error.message });
      }
      
      return { data, error };
    });
  },

  getUserLearningPathProgress: async (userId: string) => {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('user_learning_path_progress')
        .select('*')
        .eq('user_id', userId);
      
      if (error) {
        logger.error('Failed to get user learning path progress', { userId, error: error.message });
      }
      
      return { data, error };
    });
  },

  updateLearningPathProgress: async (
    userId: string,
    learningPathId: string,
    status: 'not_started' | 'in_progress' | 'completed'
  ) => {
    return withRetry(async () => {
      const updateData: Record<string, unknown> = {
        user_id: userId,
        learning_path_id: learningPathId,
        status,
        updated_at: new Date().toISOString(),
      };

      if (status === 'in_progress' && !updateData.started_at) {
        updateData.started_at = new Date().toISOString();
      }
      
      if (status === 'completed') {
        updateData.completed_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('user_learning_path_progress')
        .upsert(updateData, { 
          onConflict: 'user_id,learning_path_id',
          ignoreDuplicates: false 
        })
        .select();
      
      if (error) {
        logger.error('Failed to update learning path progress', { 
          userId, 
          learningPathId, 
          status, 
          error: error.message 
        });
      }
      
      return { data, error };
    });
  },

  // Hint usage tracking
  logHintUsage: async (userId: string, challengeId: string, hintLevel: number) => {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('hint_usage')
        .insert({
          user_id: userId,
          challenge_id: challengeId,
          hint_level: hintLevel,
          requested_at: new Date().toISOString(),
        })
        .select();
      
      if (error) {
        logger.error('Failed to log hint usage', { 
          userId, 
          challengeId, 
          hintLevel, 
          error: error.message 
        });
      }
      
      return { data, error };
    });
  },

  // User profiles management
  getUserProfile: async (userId: string) => {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (error && error.code !== 'PGRST116') { // Not found is ok
        logger.error('Failed to get user profile', { userId, error: error.message });
      }
      
      return { data, error };
    });
  },

  createUserProfile: async (profileData: {
    user_id: string;
    display_name?: string;
    bio?: string;
    experience_level?: 'beginner' | 'intermediate' | 'advanced';
    preferred_categories?: string[];
    onboarding_completed?: boolean;
    onboarding_step?: number;
  }) => {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('user_profiles')
        .insert(profileData)
        .select()
        .single();
      
      if (error) {
        logger.error('Failed to create user profile', { 
          userId: profileData.user_id, 
          error: error.message 
        });
      } else {
        logger.info('User profile created', { userId: profileData.user_id });
      }
      
      return { data, error };
    });
  },

  updateUserProfile: async (userId: string, updates: {
    display_name?: string;
    bio?: string;
    experience_level?: 'beginner' | 'intermediate' | 'advanced';
    preferred_categories?: string[];
    onboarding_completed?: boolean;
    onboarding_step?: number;
  }) => {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId)
        .select()
        .single();
      
      if (error) {
        logger.error('Failed to update user profile', { 
          userId, 
          error: error.message 
        });
      } else {
        logger.info('User profile updated', { userId });
      }
      
      return { data, error };
    });
  },

  // Analytics and metrics
  getUserStats: async (userId: string) => {
    return withRetry(async () => {
      const { data: progress, error: progressError } = await supabase
        .from('user_progress')
        .select('status')
        .eq('user_id', userId);

      const { data: hints, error: hintsError } = await supabase
        .from('hint_usage')
        .select('hint_level')
        .eq('user_id', userId);

      if (progressError || hintsError) {
        logger.error('Failed to get user stats', { 
          userId, 
          progressError: progressError?.message,
          hintsError: hintsError?.message
        });
      }

      const stats = {
        totalChallenges: progress?.length || 0,
        completedChallenges: progress?.filter(p => p.status === 'completed').length || 0,
        inProgressChallenges: progress?.filter(p => p.status === 'in_progress').length || 0,
        totalHintsUsed: hints?.length || 0,
      };

      return { 
        data: stats, 
        error: progressError || hintsError 
      };
    });
  },

  // Health check for database connectivity
  healthCheck: async () => {
    try {
      const { error } = await supabase
        .from('challenges')
        .select('count(*)')
        .limit(1);
      
      return { 
        healthy: !error, 
        error: error?.message,
        timestamp: new Date().toISOString()
      };
    } catch (err) {
      return { 
        healthy: false, 
        error: err instanceof Error ? err.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  },

  // Challenge attempt analytics with better data structure
  logChallengeAttempt: async (
    userId: string, 
    challengeId: string, 
    success: boolean, 
    timeSpent: number, 
    hintsUsed: number,
    code?: string,
    errorMessage?: string
  ) => {
    return withRetry(async () => {
      const attemptData: Record<string, unknown> = {
        user_id: userId,
        challenge_id: challengeId,
        success,
        time_spent: timeSpent,
        hints_used: hintsUsed,
        attempted_at: new Date().toISOString(),
      };

      if (code) attemptData.submitted_code = code;
      if (errorMessage) attemptData.error_message = errorMessage;

      const { data, error } = await supabase
        .from('challenge_attempts')
        .insert(attemptData)
        .select();
      
      if (error) {
        logger.error('Failed to log challenge attempt', { 
          userId, 
          challengeId, 
          success, 
          error: error.message 
        });
      }
      
      return { data, error };
    });
  },

  // Batch operations for better performance
  batchUpdateProgress: async (progressUpdates: Array<{
    userId: string;
    challengeId: string;
    status: 'not_started' | 'in_progress' | 'completed';
    code?: string;
    hints_used?: number;
  }>) => {
    return withRetry(async () => {
      const updates = progressUpdates.map(update => ({
        user_id: update.userId,
        challenge_id: update.challengeId,
        status: update.status,
        current_code: update.code,
        hints_used: update.hints_used,
        updated_at: new Date().toISOString(),
        ...(update.status === 'completed' && { completed_at: new Date().toISOString() }),
      }));

      const { data, error } = await supabase
        .from('user_progress')
        .upsert(updates, { 
          onConflict: 'user_id,challenge_id',
          ignoreDuplicates: false 
        })
        .select();
      
      if (error) {
        logger.error('Failed to batch update progress', { 
          updateCount: progressUpdates.length,
          error: error.message 
        });
      }
      
      return { data, error };
    });
  }
};

export default supabase;