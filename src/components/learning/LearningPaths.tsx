import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Star, Target, Trophy, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import type { LearningPath } from '@/types';

interface LearningPathsProps {
  paths: LearningPath[];
  onSelectPath?: (pathId: string) => void;
  userProgress?: Record<string, number>; // pathId -> progress percentage
}

export function LearningPaths({ paths, onSelectPath, userProgress = {} }: LearningPathsProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getDifficultyStars = (difficulty: string) => {
    const count = difficulty === 'beginner' ? 1 : difficulty === 'intermediate' ? 2 : 3;
    return Array.from({ length: 3 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < count ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Learning Paths
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Structured journeys to master real-world development skills through challenges, not tutorials.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paths.map((path, index) => {
          const progress = userProgress[path.id] || 0;
          
          return (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getDifficultyColor(path.difficulty)}>
                      {path.difficulty}
                    </Badge>
                    <div className="flex space-x-1">
                      {getDifficultyStars(path.difficulty)}
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl mb-2">{path.title}</CardTitle>
                  <CardDescription className="text-sm line-clamp-3">
                    {path.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{path.estimated_hours}h</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="w-4 h-4" />
                      <span>{path.challenges.length} challenges</span>
                    </div>
                  </div>

                  {progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="font-medium">{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )}

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm mb-2 flex items-center">
                        <Trophy className="w-4 h-4 mr-1" />
                        You&apos;ll Master
                      </h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        {path.learning_objectives.slice(0, 3).map((objective, objIndex) => (
                          <li key={objIndex} className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span className="line-clamp-2">{objective}</span>
                          </li>
                        ))}
                        {path.learning_objectives.length > 3 && (
                          <li className="text-xs text-gray-500">
                            +{path.learning_objectives.length - 3} more skills
                          </li>
                        )}
                      </ul>
                    </div>

                    {path.prerequisites && path.prerequisites.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-sm mb-2 flex items-center">
                          <BookOpen className="w-4 h-4 mr-1" />
                          Prerequisites
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {path.prerequisites.slice(0, 2).map((prereq, prereqIndex) => (
                            <Badge key={prereqIndex} variant="outline" className="text-xs">
                              {prereq}
                            </Badge>
                          ))}
                          {path.prerequisites.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{path.prerequisites.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => onSelectPath?.(path.id)}
                    variant={progress > 0 ? "default" : "outline"}
                  >
                    {progress > 0 ? 'Continue Learning' : 'Start Path'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-12 text-center"
      >
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">
              The Anti-Tutorial Hell Methodology
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Our learning paths are designed to build genuine problem-solving skills. You&apos;ll struggle, research, experiment, and ultimately solve real challenges that mirror actual development work.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-2xl">🧠</div>
                <h4 className="font-semibold">Think First</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  No step-by-step instructions. Figure it out yourself.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl">🔬</div>
                <h4 className="font-semibold">Research & Experiment</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Use documentation, try different approaches, learn by doing.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl">💪</div>
                <h4 className="font-semibold">Build Confidence</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Solve problems independently, gain real developer skills.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}