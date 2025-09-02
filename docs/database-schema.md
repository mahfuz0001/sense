# Complete Database Schema Documentation

This document provides a comprehensive overview of the database schema for the Anti-Tutorial Hell learning platform.

## Overview

The database is designed to support a comprehensive learning platform with the following core features:
- User authentication and profiles
- Learning paths and challenges
- Progress tracking
- Hint system
- Interactive tutorials and lessons

## Database Technology

- **Database**: PostgreSQL with Supabase
- **Extensions**: uuid-ossp for UUID generation
- **Security**: Row Level Security (RLS) enabled on all tables
- **Authentication**: Supabase Auth integration

## Tables

### 1. `challenges`
Stores all coding challenges with their requirements and solutions.

**Columns:**
- `id` (UUID, Primary Key) - Unique identifier for each challenge
- `title` (TEXT, NOT NULL) - Challenge title
- `description` (TEXT, NOT NULL) - Detailed challenge description
- `difficulty` (TEXT) - Challenge difficulty: 'beginner', 'intermediate', 'advanced'
- `category` (TEXT, NOT NULL) - Challenge category (e.g., 'CSS & Layout', 'JavaScript')
- `starting_code` (TEXT, NOT NULL) - Initial code provided to users
- `solution_code` (TEXT, NOT NULL) - Expected solution code
- `test_cases` (JSONB, NOT NULL) - Test cases for validation
- `hints` (TEXT[], NOT NULL) - Array of hints for the challenge
- `created_at` (TIMESTAMPTZ) - Creation timestamp
- `updated_at` (TIMESTAMPTZ) - Last update timestamp

**Constraints:**
- Difficulty must be one of: 'beginner', 'intermediate', 'advanced'

**Security:**
- Read access for all authenticated users
- No write access for regular users (admin only)

**Example Record:**
```sql
{
  "id": "responsive-grid-layout",
  "title": "Responsive Three-Column Grid",
  "description": "Create a responsive three-column grid layout...",
  "difficulty": "beginner",
  "category": "CSS & Layout",
  "starting_code": "/* Create your responsive grid layout here */",
  "solution_code": ".grid-container { display: grid; grid-template-columns: repeat(3, 1fr); }",
  "test_cases": [
    {"id": "test-1", "description": "Uses CSS Grid display property", "expected_output": "Grid layout implemented"}
  ],
  "hints": ["CSS Grid is different from Flexbox", "Use grid-template-columns property"]
}
```

### 2. `user_progress`
Tracks individual user progress on each challenge.

**Columns:**
- `id` (UUID, Primary Key) - Unique identifier
- `user_id` (UUID, Foreign Key) - References auth.users(id)
- `challenge_id` (UUID, Foreign Key) - References challenges(id)
- `status` (TEXT) - Progress status: 'not_started', 'in_progress', 'completed'
- `current_code` (TEXT) - User's current code for the challenge
- `attempts` (INTEGER) - Number of attempts made
- `completed_at` (TIMESTAMPTZ) - Completion timestamp
- `created_at` (TIMESTAMPTZ) - Creation timestamp
- `updated_at` (TIMESTAMPTZ) - Last update timestamp

**Constraints:**
- Unique constraint on (user_id, challenge_id)
- Status must be one of: 'not_started', 'in_progress', 'completed'
- Foreign key cascade delete on user and challenge deletion

**Security:**
- Users can only access their own progress records
- Full CRUD operations for own records

### 3. `learning_paths`
Defines structured learning paths containing multiple challenges.

**Columns:**
- `id` (UUID, Primary Key) - Unique identifier
- `title` (TEXT, NOT NULL) - Learning path title
- `description` (TEXT, NOT NULL) - Detailed description
- `order_index` (INTEGER, NOT NULL) - Display order
- `created_at` (TIMESTAMPTZ) - Creation timestamp
- `updated_at` (TIMESTAMPTZ) - Last update timestamp

**Security:**
- Read access for all authenticated users
- No write access for regular users (admin only)

**Example Records:**
```sql
INSERT INTO learning_paths (title, description, order_index) VALUES
  ('Frontend Fundamentals', 'Master the core skills of frontend development through hands-on challenges', 1),
  ('TypeScript Mastery', 'Build type-safe applications and learn advanced TypeScript patterns', 2),
  ('React Expertise', 'Master React component design, state management, and advanced patterns', 3),
  ('Full-Stack Integration', 'Learn to integrate frontend and backend systems, handle APIs, and build complete applications', 4);
```

### 4. `learning_path_challenges`
Junction table linking challenges to learning paths with ordering.

**Columns:**
- `id` (UUID, Primary Key) - Unique identifier
- `learning_path_id` (UUID, Foreign Key) - References learning_paths(id)
- `challenge_id` (UUID, Foreign Key) - References challenges(id)
- `order_index` (INTEGER, NOT NULL) - Order within the learning path
- `created_at` (TIMESTAMPTZ) - Creation timestamp

**Constraints:**
- Unique constraint on (learning_path_id, challenge_id)
- Foreign key cascade delete

**Security:**
- Read access for all authenticated users
- No write access for regular users (admin only)

### 5. `user_learning_path_progress`
Tracks user progress through learning paths.

**Columns:**
- `id` (UUID, Primary Key) - Unique identifier
- `user_id` (UUID, Foreign Key) - References auth.users(id)
- `learning_path_id` (UUID, Foreign Key) - References learning_paths(id)
- `started_at` (TIMESTAMPTZ) - Start timestamp
- `completed_at` (TIMESTAMPTZ) - Completion timestamp (NULL if not completed)
- `created_at` (TIMESTAMPTZ) - Creation timestamp
- `updated_at` (TIMESTAMPTZ) - Last update timestamp

**Constraints:**
- Unique constraint on (user_id, learning_path_id)
- Foreign key cascade delete

**Security:**
- Users can only access their own learning path progress
- Full CRUD operations for own records

### 6. `user_profiles`
Additional user data and onboarding tracking.

**Columns:**
- `id` (UUID, Primary Key) - Unique identifier
- `user_id` (UUID, Foreign Key, Unique) - References auth.users(id)
- `display_name` (TEXT) - User's display name
- `bio` (TEXT) - User biography
- `experience_level` (TEXT) - Experience level: 'beginner', 'intermediate', 'advanced'
- `preferred_categories` (TEXT[]) - Array of preferred learning categories
- `onboarding_completed` (BOOLEAN) - Whether onboarding is complete
- `onboarding_step` (INTEGER) - Current onboarding step
- `created_at` (TIMESTAMPTZ) - Creation timestamp
- `updated_at` (TIMESTAMPTZ) - Last update timestamp

**Constraints:**
- Experience level must be one of: 'beginner', 'intermediate', 'advanced'
- One profile per user (unique user_id)

**Security:**
- Users can only access and modify their own profile
- Full CRUD operations for own profile

### 7. `hint_usage`
Logs when users request hints for analytics and rate limiting.

**Columns:**
- `id` (UUID, Primary Key) - Unique identifier
- `user_id` (UUID, Foreign Key) - References auth.users(id)
- `challenge_id` (UUID, Foreign Key) - References challenges(id)
- `hint_level` (INTEGER, NOT NULL) - Which hint was requested (1, 2, 3, etc.)
- `requested_at` (TIMESTAMPTZ) - When the hint was requested

**Security:**
- Users can only access their own hint usage records
- Insert access for own records
- Read access for own records

## Functions and Triggers

### 1. `update_updated_at_column()`
A PostgreSQL function that automatically updates the `updated_at` column when a record is modified.

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';
```

### 2. Update Triggers
Triggers are created for each table with an `updated_at` column:
- `update_challenges_updated_at`
- `update_user_progress_updated_at`
- `update_learning_paths_updated_at`
- `update_user_learning_path_progress_updated_at`
- `update_user_profiles_updated_at`

## Row Level Security (RLS) Policies

All tables have RLS enabled with the following policy patterns:

### Read Policies
- **Public content** (challenges, learning_paths, learning_path_challenges): Readable by all authenticated users
- **User-specific content** (user_progress, user_profiles, hint_usage): Users can only read their own records

### Write Policies
- **Public content**: No write access for regular users (admin only)
- **User-specific content**: Users can insert, update, and delete their own records

### Example Policy
```sql
-- Users can view their own progress
CREATE POLICY "Users can view their own progress" ON user_progress
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Users can insert their own progress
CREATE POLICY "Users can insert their own progress" ON user_progress
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
```

## Indexes

The following indexes should be created for optimal performance:

```sql
-- User progress lookups
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_challenge_id ON user_progress(challenge_id);
CREATE INDEX idx_user_progress_status ON user_progress(status);

-- Learning path challenges
CREATE INDEX idx_learning_path_challenges_path_id ON learning_path_challenges(learning_path_id);
CREATE INDEX idx_learning_path_challenges_order ON learning_path_challenges(learning_path_id, order_index);

-- User learning path progress
CREATE INDEX idx_user_learning_path_progress_user_id ON user_learning_path_progress(user_id);
CREATE INDEX idx_user_learning_path_progress_path_id ON user_learning_path_progress(learning_path_id);

-- Hint usage analytics
CREATE INDEX idx_hint_usage_user_id ON hint_usage(user_id);
CREATE INDEX idx_hint_usage_challenge_id ON hint_usage(challenge_id);
CREATE INDEX idx_hint_usage_requested_at ON hint_usage(requested_at);

-- Challenges
CREATE INDEX idx_challenges_category ON challenges(category);
CREATE INDEX idx_challenges_difficulty ON challenges(difficulty);
```

## Sample Data

The schema includes sample data for:
- 4 learning paths (Frontend Fundamentals, TypeScript Mastery, React Expertise, Full-Stack Integration)
- 1 sample challenge (Responsive Three-Column Grid)
- Proper linking between learning paths and challenges

## Usage Patterns

### Common Queries

1. **Get user's progress in a learning path:**
```sql
SELECT c.title, up.status, up.completed_at
FROM learning_path_challenges lpc
JOIN challenges c ON lpc.challenge_id = c.id
LEFT JOIN user_progress up ON c.id = up.challenge_id AND up.user_id = $1
WHERE lpc.learning_path_id = $2
ORDER BY lpc.order_index;
```

2. **Get user's overall statistics:**
```sql
SELECT 
  COUNT(*) as total_challenges,
  COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_challenges,
  COUNT(CASE WHEN status = 'in_progress' THEN 1 END) as in_progress_challenges
FROM user_progress 
WHERE user_id = $1;
```

3. **Get learning path progress:**
```sql
SELECT 
  lp.title,
  ulpp.started_at,
  ulpp.completed_at,
  COUNT(lpc.challenge_id) as total_challenges,
  COUNT(up.id) FILTER (WHERE up.status = 'completed') as completed_challenges
FROM learning_paths lp
LEFT JOIN user_learning_path_progress ulpp ON lp.id = ulpp.learning_path_id AND ulpp.user_id = $1
LEFT JOIN learning_path_challenges lpc ON lp.id = lpc.learning_path_id
LEFT JOIN user_progress up ON lpc.challenge_id = up.challenge_id AND up.user_id = $1
GROUP BY lp.id, lp.title, ulpp.started_at, ulpp.completed_at
ORDER BY lp.order_index;
```

## Scaling Considerations

1. **Partitioning**: Consider partitioning `hint_usage` by date for large datasets
2. **Archiving**: Implement archiving strategy for completed user progress older than X months
3. **Caching**: Use Redis for frequently accessed challenge data
4. **Read Replicas**: Consider read replicas for analytics queries
5. **Connection Pooling**: Use connection pooling (pgBouncer) for high concurrency

## Backup and Recovery

1. **Automated Backups**: Supabase provides automated daily backups
2. **Point-in-Time Recovery**: Available with Supabase Pro plan
3. **Export Strategy**: Regular exports of user progress and profile data
4. **Disaster Recovery**: Cross-region backup strategy for critical data

## Security Best Practices

1. **RLS Enforcement**: All user data access controlled by RLS policies
2. **Input Validation**: All user inputs validated at application layer
3. **Audit Logging**: Consider adding audit trails for sensitive operations
4. **Regular Security Reviews**: Periodic review of RLS policies and access patterns
5. **API Rate Limiting**: Implement rate limiting for API endpoints

This schema provides a robust foundation for a comprehensive learning platform with proper security, scalability, and maintainability considerations.