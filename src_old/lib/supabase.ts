import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

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

  getCurrentUser: () => {
    return supabase.auth.getUser();
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  },
};

// Database helpers
export const db = {
  // Challenges
  getChallenges: async () => {
    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .order('created_at', { ascending: true });
    return { data, error };
  },

  getChallenge: async (id: string) => {
    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .eq('id', id)
      .single();
    return { data, error };
  },

  // User Progress
  getUserProgress: async (userId: string) => {
    const { data, error } = await supabase
      .from('user_progress')
      .select(`
        *,
        challenge:challenges(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: true });
    return { data, error };
  },

  updateUserProgress: async (userId: string, challengeId: string, progressData: any) => {
    const { data, error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        challenge_id: challengeId,
        ...progressData,
      })
      .select();
    return { data, error };
  },

  // Learning Paths
  getLearningPaths: async () => {
    const { data, error } = await supabase
      .from('learning_paths')
      .select('*')
      .order('order_index', { ascending: true });
    return { data, error };
  },
};