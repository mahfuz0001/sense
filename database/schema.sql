-- Anti-Tutorial Hell Database Schema for Supabase
-- This file contains the SQL commands to set up the database structure

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Challenges table
CREATE TABLE challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  category TEXT NOT NULL,
  starting_code TEXT NOT NULL,
  solution_code TEXT NOT NULL,
  test_cases JSONB NOT NULL,
  hints TEXT[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Progress table
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('not_started', 'in_progress', 'completed')) DEFAULT 'not_started',
  current_code TEXT,
  attempts INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, challenge_id)
);

-- Learning Paths table
CREATE TABLE learning_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Learning Path Challenges (junction table)
CREATE TABLE learning_path_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  learning_path_id UUID REFERENCES learning_paths(id) ON DELETE CASCADE,
  challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(learning_path_id, challenge_id)
);

-- User Learning Path Progress
CREATE TABLE user_learning_path_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  learning_path_id UUID REFERENCES learning_paths(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, learning_path_id)
);

-- Hints usage tracking
CREATE TABLE hint_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
  hint_level INTEGER NOT NULL,
  requested_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_path_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_learning_path_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE hint_usage ENABLE ROW LEVEL SECURITY;

-- Challenges: Read access for all authenticated users
CREATE POLICY "Challenges are readable by authenticated users" ON challenges
  FOR SELECT TO authenticated USING (true);

-- User Progress: Users can only access their own progress
CREATE POLICY "Users can view their own progress" ON user_progress
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" ON user_progress
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" ON user_progress
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Learning Paths: Read access for all authenticated users
CREATE POLICY "Learning paths are readable by authenticated users" ON learning_paths
  FOR SELECT TO authenticated USING (true);

-- Learning Path Challenges: Read access for all authenticated users
CREATE POLICY "Learning path challenges are readable by authenticated users" ON learning_path_challenges
  FOR SELECT TO authenticated USING (true);

-- User Learning Path Progress: Users can only access their own progress
CREATE POLICY "Users can view their own learning path progress" ON user_learning_path_progress
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own learning path progress" ON user_learning_path_progress
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own learning path progress" ON user_learning_path_progress
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Hint Usage: Users can only access their own hint usage
CREATE POLICY "Users can view their own hint usage" ON hint_usage
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own hint usage" ON hint_usage
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Functions and Triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_challenges_updated_at BEFORE UPDATE ON challenges
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_progress_updated_at BEFORE UPDATE ON user_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_learning_paths_updated_at BEFORE UPDATE ON learning_paths
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_learning_path_progress_updated_at BEFORE UPDATE ON user_learning_path_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Sample data insertion
INSERT INTO learning_paths (title, description, order_index) VALUES
  ('Frontend Fundamentals', 'Master the core skills of frontend development through hands-on challenges. No tutorials, just real problems to solve.', 1),
  ('TypeScript Mastery', 'Build type-safe applications and learn advanced TypeScript patterns through challenging projects.', 2),
  ('React Expertise', 'Master React component design, state management, and advanced patterns through real-world challenges.', 3),
  ('Full-Stack Integration', 'Learn to integrate frontend and backend systems, handle APIs, and build complete applications.', 4);

-- Sample challenges (these would be imported from the mock data)
INSERT INTO challenges (
  id, title, description, difficulty, category, starting_code, solution_code, test_cases, hints
) VALUES
  (
    'responsive-grid-layout',
    'Responsive Three-Column Grid',
    'Create a responsive three-column grid layout that adapts to different screen sizes...',
    'beginner',
    'CSS & Layout',
    '/* Create your responsive grid layout here */' || E'\n' || '.grid-container {' || E'\n' || '  /* Your CSS goes here */' || E'\n' || '}',
    '/* Responsive three-column grid solution */' || E'\n' || '.grid-container {' || E'\n' || '  display: grid;' || E'\n' || '  grid-template-columns: repeat(3, 1fr);' || E'\n' || '  gap: 1.5rem;' || E'\n' || '}',
    '[
      {"id": "test-1", "description": "Uses CSS Grid display property", "expected_output": "Grid layout implemented", "hidden": false},
      {"id": "test-2", "description": "Creates three equal columns", "expected_output": "Three equal columns created", "hidden": false}
    ]'::jsonb,
    ARRAY[
      'CSS Grid is different from Flexbox - it''s designed for two-dimensional layouts.',
      'The ''grid-template-columns'' property defines your column structure. Think about equal fractions.',
      'For responsiveness, you''ll need media queries. What should happen on smaller screens?'
    ]
  );

-- Link challenges to learning paths
INSERT INTO learning_path_challenges (learning_path_id, challenge_id, order_index)
SELECT lp.id, 'responsive-grid-layout', 1
FROM learning_paths lp
WHERE lp.title = 'Frontend Fundamentals';

-- Comments
COMMENT ON TABLE challenges IS 'Stores all coding challenges with their requirements and solutions';
COMMENT ON TABLE user_progress IS 'Tracks individual user progress on each challenge';
COMMENT ON TABLE learning_paths IS 'Defines structured learning paths containing multiple challenges';
COMMENT ON TABLE learning_path_challenges IS 'Links challenges to learning paths with ordering';
COMMENT ON TABLE user_learning_path_progress IS 'Tracks user progress through learning paths';
COMMENT ON TABLE hint_usage IS 'Logs when users request hints for analytics and rate limiting';