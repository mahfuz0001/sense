'use client';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

interface LoadingPageProps {
  text?: string;
  className?: string;
}

interface LoadingOverlayProps {
  isLoading: boolean;
  text?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Simple loading spinner component
 */
export function LoadingSpinner({ size = 'md', className, text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Loader2 className={cn('animate-spin', sizeClasses[size])} />
      {text && <span className="text-sm text-muted-foreground">{text}</span>}
    </div>
  );
}

/**
 * Full page loading component
 */
export function LoadingPage({ text = 'Loading...', className }: LoadingPageProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center min-h-[400px] space-y-4', className)}>
      <LoadingSpinner size="lg" />
      <p className="text-lg text-muted-foreground">{text}</p>
    </div>
  );
}

/**
 * Loading overlay that shows spinner over content
 */
export function LoadingOverlay({ isLoading, text, children, className }: LoadingOverlayProps) {
  return (
    <div className={cn('relative', className)}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <LoadingSpinner size="lg" text={text} />
        </div>
      )}
    </div>
  );
}

/**
 * Skeleton loader for content placeholders
 */
interface SkeletonProps {
  className?: string;
  lines?: number;
  height?: string;
}

export function ContentSkeleton({ className, lines = 3, height = 'h-4' }: SkeletonProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'animate-pulse bg-muted rounded',
            height,
            i === lines - 1 ? 'w-3/4' : 'w-full'
          )}
        />
      ))}
    </div>
  );
}