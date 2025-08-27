import type { CategoryBadgeProps } from '../../types';

const categoryColors: Record<string, string> = {
  'CSS & Layout': 'bg-blue-100 text-blue-700 border-blue-200',
  'TypeScript & Forms': 'bg-purple-100 text-purple-700 border-purple-200',
  'React Components': 'bg-cyan-100 text-cyan-700 border-cyan-200',
  'API Integration': 'bg-green-100 text-green-700 border-green-200',
  'JavaScript Basics': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  default: 'bg-gray-100 text-gray-700 border-gray-200',
};

const sizeConfig = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-2 text-base',
};

export function CategoryBadge({ category, size = 'md' }: CategoryBadgeProps) {
  const colorClass = categoryColors[category] || categoryColors.default;
  const sizeClass = sizeConfig[size];

  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${colorClass} ${sizeClass}`}>
      {category}
    </span>
  );
}