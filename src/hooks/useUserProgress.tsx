'use client'

import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { UserProgress } from '@/types';
import toast from 'react-hot-toast';

interface UserProgressData {
  challenges: UserProgress[];
  completedCount: number;
  totalPoints: number;
  streak: number;
}

interface UseUserProgressReturn {
  progress: UserProgressData | null;
  loading: boolean;
  error: string | null;
  updateProgress: (challengeId: string, status: 'not_started' | 'in_progress' | 'completed', code?: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useUserProgress(): UseUserProgressReturn {
  const { user, session } = useAuth();
  const [progress, setProgress] = useState<UserProgressData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProgress = async () => {
    if (!user || !session) {
      setProgress(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/user/progress', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProgress(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch progress';
      setError(errorMessage);
      console.error('Error fetching user progress:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (
    challengeId: string, 
    status: 'not_started' | 'in_progress' | 'completed', 
    code?: string
  ) => {
    if (!user || !session) {
      toast.error('Please sign in to save progress');
      return;
    }

    try {
      const response = await fetch('/api/user/progress', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          challenge_id: challengeId,
          status,
          code,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Refetch progress to get updated data
      await fetchProgress();
      
      if (status === 'completed') {
        toast.success('Challenge completed! 🎉');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update progress';
      toast.error(errorMessage);
      console.error('Error updating progress:', err);
    }
  };

  const refetch = fetchProgress;

  useEffect(() => {
    fetchProgress();
  }, [user, session]); // fetchProgress is stable, so this is OK

  return {
    progress,
    loading,
    error,
    updateProgress,
    refetch,
  };
}