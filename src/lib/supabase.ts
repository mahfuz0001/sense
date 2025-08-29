import { createClient, Session } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helpers
export const auth = {
  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  onAuthStateChange: (callback: (event: string, session: Session | null) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  }
};

// Database helpers
export const db = {
  // User progress
  getUserProgress: async (userId: string) => {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId);
    return { data, error };
  },

  updateChallengeProgress: async (userId: string, challengeId: string, status: 'not_started' | 'in_progress' | 'completed', code?: string, hints_used?: number) => {
    const { data, error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        challenge_id: challengeId,
        status,
        code,
        hints_used,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,challenge_id'
      });
    return { data, error };
  },

  // Challenges
  getChallenges: async () => {
    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .order('difficulty_level', { ascending: true });
    return { data, error };
  },

  getChallengeById: async (id: string) => {
    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .eq('id', id)
      .single();
    return { data, error };
  },

  // Learning paths
  getLearningPaths: async () => {
    const { data, error } = await supabase
      .from('learning_paths')
      .select(`
        *,
        learning_path_challenges (
          challenge_id,
          order_index,
          challenges (*)
        )
      `)
      .order('created_at', { ascending: true });
    return { data, error };
  },

  // Analytics
  logChallengeAttempt: async (userId: string, challengeId: string, success: boolean, timeSpent: number, hintsUsed: number) => {
    const { data, error } = await supabase
      .from('challenge_attempts')
      .insert({
        user_id: userId,
        challenge_id: challengeId,
        success,
        time_spent: timeSpent,
        hints_used: hintsUsed,
        attempted_at: new Date().toISOString()
      });
    return { data, error };
  }
};

export default supabase;