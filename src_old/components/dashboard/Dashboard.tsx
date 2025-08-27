import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Target, TrendingUp, Award } from 'lucide-react';
import type { Challenge, UserProgress, LearningPath } from '../../types';
import { ProgressIndicator } from '../common/ProgressIndicator';
import { ChallengeCard } from '../challenge/ChallengeCard';
import { mockChallenges, mockLearningPaths } from '../../data/mockData';
import { useAuth } from '../../hooks/useAuth';

interface DashboardProps {
  onChallengeSelect: (challenge: Challenge) => void;
}

export function Dashboard({ onChallengeSelect }: DashboardProps) {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [selectedPath, setSelectedPath] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    // Load challenges and learning paths
    // In a real app, this would fetch from Supabase
    setChallenges(mockChallenges);
    setLearningPaths(mockLearningPaths);
    
    // Mock user progress
    if (user) {
      const mockProgress: UserProgress[] = [
        {
          id: '1',
          user_id: user.id,
          challenge_id: 'responsive-grid-layout',
          status: 'completed',
          current_code: '',
          attempts: 3,
          completed_at: '2024-01-01T10:00:00Z',
          created_at: '2024-01-01T09:00:00Z',
        },
        {
          id: '2',
          user_id: user.id,
          challenge_id: 'typescript-form-validation',
          status: 'in_progress',
          current_code: 'interface FormData {\n  // In progress...\n}',
          attempts: 2,
          completed_at: null,
          created_at: '2024-01-02T09:00:00Z',
        },
      ];
      setUserProgress(mockProgress);
    }
    
    setLoading(false);
  }, [user]);

  const getFilteredChallenges = () => {
    if (selectedPath === 'all') return challenges;
    const path = learningPaths.find(p => p.id === selectedPath);
    return path ? path.challenges : [];
  };

  const getChallengeProgress = (challengeId: string) => {
    return userProgress.find(p => p.challenge_id === challengeId);
  };

  const getOverallProgress = () => {
    const completedChallenges = userProgress.filter(p => p.status === 'completed').length;
    return {
      completed: completedChallenges,
      total: challenges.length,
      inProgress: userProgress.filter(p => p.status === 'in_progress').length,
    };
  };

  const progress = getOverallProgress();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-3 text-gray-600">Loading your challenges...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 mb-2"
        >
          Anti-Tutorial Hell Dashboard
        </motion.h1>
        <p className="text-gray-600 text-lg">
          Learn by doing. No tutorials, just real challenges that build genuine skills.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6"
        >
          <div className="flex items-center">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{progress.completed}</p>
              <p className="text-gray-600 text-sm">Completed</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6"
        >
          <div className="flex items-center">
            <div className="p-3 bg-warning/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-warning" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{progress.inProgress}</p>
              <p className="text-gray-600 text-sm">In Progress</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <div className="flex items-center">
            <div className="p-3 bg-success/10 rounded-lg">
              <BookOpen className="w-6 h-6 text-success" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{challenges.length}</p>
              <p className="text-gray-600 text-sm">Total Challenges</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6"
        >
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{learningPaths.length}</p>
              <p className="text-gray-600 text-sm">Learning Paths</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card p-6 mb-8"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Progress</h2>
        <ProgressIndicator 
          current={progress.completed} 
          total={progress.total} 
          size="lg" 
        />
        <div className="mt-4 text-sm text-gray-600">
          Keep pushing forward! Each challenge builds real-world skills that make you a stronger developer.
        </div>
      </motion.div>

      {/* Learning Path Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedPath('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedPath === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Challenges
          </button>
          {learningPaths.map((path) => (
            <button
              key={path.id}
              onClick={() => setSelectedPath(path.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedPath === path.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {path.title}
            </button>
          ))}
        </div>
      </div>

      {/* Challenges Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {getFilteredChallenges().map((challenge, index) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
          >
            <ChallengeCard
              challenge={challenge}
              progress={getChallengeProgress(challenge.id)}
              onClick={() => onChallengeSelect(challenge)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Anti-Tutorial Philosophy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="mt-12 card p-6 bg-gradient-to-r from-primary/5 to-purple-50 border-primary/20"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          💪 The Anti-Tutorial Hell Approach
        </h3>
        <div className="text-gray-700 space-y-2">
          <p>
            <strong>No hand-holding.</strong> Each challenge presents real problems without step-by-step solutions.
          </p>
          <p>
            <strong>Learn by struggle.</strong> The difficulty is intentional - it builds problem-solving skills.
          </p>
          <p>
            <strong>Research is key.</strong> You'll need to read documentation, experiment, and think critically.
          </p>
          <p className="text-primary font-medium">
            This is how you become a confident developer who can tackle any problem.
          </p>
        </div>
      </motion.div>
    </div>
  );
}