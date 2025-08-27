import type { ProgressIndicatorProps } from '../../types';

const sizeConfig = {
  sm: { container: 'h-1', text: 'text-xs' },
  md: { container: 'h-2', text: 'text-sm' },
  lg: { container: 'h-3', text: 'text-base' },
};

export function ProgressIndicator({ current, total, size = 'md' }: ProgressIndicatorProps) {
  const percentage = Math.round((current / total) * 100);
  const config = sizeConfig[size];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className={`font-medium text-gray-700 ${config.text}`}>
          Progress
        </span>
        <span className={`font-medium text-gray-900 ${config.text}`}>
          {current}/{total} ({percentage}%)
        </span>
      </div>
      <div className={`w-full bg-gray-200 rounded-full ${config.container}`}>
        <div
          className={`bg-primary rounded-full transition-all duration-300 ease-out ${config.container}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}