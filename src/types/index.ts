export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  display_name?: string;
  bio?: string;
  experience_level: "beginner" | "intermediate" | "advanced";
  preferred_categories: string[];
  onboarding_completed: boolean;
  onboarding_step: number;
  created_at: string;
  updated_at: string;
}

export interface OnboardingData {
  display_name: string;
  experience_level: "beginner" | "intermediate" | "advanced";
  preferred_categories: string[];
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  category: string;
  starting_code: string;
  solution_code: string;
  test_cases: TestCase[];
  hints: string[];
  created_at: string;
}

export interface TestCase {
  id: string;
  description: string;
  expected_output: string;
  hidden: boolean;
}

export interface UserProgress {
  id: string;
  user_id: string;
  challenge_id: string;
  status: "not_started" | "in_progress" | "completed";
  current_code: string;
  attempts: number;
  completed_at: string | null;
  created_at: string;
  challenge?: Challenge;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  order_index: number;
  challenges: string[]; // Array of challenge IDs
  estimated_hours: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  prerequisites: string[];
  learning_objectives: string[];
  created_at: string;
  updated_at: string;
}

export interface HintRequest {
  challenge_id: string;
  current_code: string;
  user_id: string;
}

export interface HintResponse {
  hint: string;
  hint_level: number;
  encouragement: string;
}

export interface CodeExecutionResult {
  success: boolean;
  output: string;
  errors: string[];
  test_results: TestResult[];
}

export interface TestResult {
  test_case_id: string;
  passed: boolean;
  expected: string;
  actual: string;
  error?: string;
}

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "signup";
  onModeChange: (mode: "login" | "signup") => void;
}

export interface DifficultyBadgeProps {
  difficulty: Challenge["difficulty"];
  size?: "sm" | "md" | "lg";
}

export interface CategoryBadgeProps {
  category: string;
  size?: "sm" | "md" | "lg";
}

export interface ProgressIndicatorProps {
  current: number;
  total: number;
  size?: "sm" | "md" | "lg";
}
