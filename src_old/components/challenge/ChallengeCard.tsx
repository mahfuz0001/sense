import { motion } from 'framer-motion';
import { Clock, CheckCircle, PlayCircle } from 'lucide-react';
import type { Challenge, UserProgress } from '../../types';
import { DifficultyBadge } from '../common/DifficultyBadge';
import { CategoryBadge } from '../common/CategoryBadge';

interface ChallengeCardProps {
  challenge: Challenge;
  progress?: UserProgress;
  onClick: () => void;
}

export function ChallengeCard({ challenge, progress, onClick }: ChallengeCardProps) {
  const getStatusIcon = () => {
    if (!progress || progress.status === 'not_started') {
      return <PlayCircle className="w-5 h-5 text-gray-400" />;
    }
    if (progress.status === 'in_progress') {
      return <Clock className="w-5 h-5 text-warning-500" />;
    }
    return <CheckCircle className="w-5 h-5 text-success-500" />;
  };

  const getStatusText = () => {
    if (!progress || progress.status === 'not_started') return 'Not Started';
    if (progress.status === 'in_progress') return 'In Progress';
    return 'Completed';
  };

  const getStatusColor = () => {
    if (!progress || progress.status === 'not_started') return 'text-gray-600';
    if (progress.status === 'in_progress') return 'text-warning-600';
    return 'text-success-600';
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="challenge-card group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors duration-200 mb-2">
            {challenge.title}
          </h3>
          <div className="flex items-center space-x-2 mb-3">
            <DifficultyBadge difficulty={challenge.difficulty} size="sm" />
            <CategoryBadge category={challenge.category} size="sm" />
          </div>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          {getStatusIcon()}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {challenge.description.split('\n')[0]} {/* Show only the first line */}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <span className={`text-sm font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </span>
          {progress?.attempts && progress.attempts > 0 && (
            <span className="text-xs text-gray-500">
              • {progress.attempts} attempt{progress.attempts !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        
        <div className="text-xs text-gray-500">
          {challenge.test_cases.length} test{challenge.test_cases.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Completion indicator */}
      {progress?.status === 'completed' && (
        <div className="absolute top-4 right-4">
          <div className="w-3 h-3 bg-success rounded-full border-2 border-white shadow-sm" />
        </div>
      )}
    </motion.div>
  );
}