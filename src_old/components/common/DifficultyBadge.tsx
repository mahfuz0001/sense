import type { DifficultyBadgeProps } from '../../types';

const difficultyConfig = {
  beginner: {
    label: 'Beginner',
    className: 'bg-success/10 text-success-700 border-success/20',
  },
  intermediate: {
    label: 'Intermediate',
    className: 'bg-warning/10 text-warning-700 border-warning/20',
  },
  advanced: {
    label: 'Advanced',
    className: 'bg-error/10 text-error-700 border-error/20',
  },
};

const sizeConfig = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-2 text-base',
};

export function DifficultyBadge({ difficulty, size = 'md' }: DifficultyBadgeProps) {
  const config = difficultyConfig[difficulty];
  const sizeClass = sizeConfig[size];

  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${config.className} ${sizeClass}`}>
      {config.label}
    </span>
  );
}