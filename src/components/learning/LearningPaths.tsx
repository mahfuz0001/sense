import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Star, Target, Trophy, BookOpen, Users, CheckCircle, PlayCircle, Brain, Code, Lightbulb } from 'lucide-react';
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
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200 dark:border-red-800';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 border-gray-200 dark:border-gray-800';
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

  const getProgressStatus = (progress: number) => {
    if (progress === 0) return { status: 'Start Journey', icon: PlayCircle, color: 'text-blue-600' };
    if (progress < 100) return { status: 'In Progress', icon: Target, color: 'text-orange-600' };
    return { status: 'Completed', icon: Trophy, color: 'text-green-600' };
  };

  return (
    <section className="py-8">
      {/* Header Section - Scrimba Style */}
      <div className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Master Real-World Development
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Choose your adventure. Each path is designed to build genuine problem-solving skills through hands-on challenges that mirror actual development work.
          </p>
          
          {/* Methodology Callout - Inspired by Scrimba */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Think First</span>
              </div>
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Research & Build</span>
              </div>
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Discover Solutions</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Build Confidence</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Learning Paths Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paths.map((path, index) => {
          const progress = userProgress[path.id] || 0;
          const progressInfo = getProgressStatus(progress);
          
          return (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] border-l-4 border-l-transparent hover:border-l-blue-500">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <Badge className={`${getDifficultyColor(path.difficulty)} border`}>
                      <div className="flex items-center gap-1">
                        {path.difficulty}
                        <div className="flex space-x-0.5 ml-1">
                          {getDifficultyStars(path.difficulty)}
                        </div>
                      </div>
                    </Badge>
                    <div className="flex items-center gap-1">
                      <progressInfo.icon className={`w-4 h-4 ${progressInfo.color}`} />
                      <span className={`text-xs font-medium ${progressInfo.color}`}>
                        {progressInfo.status}
                      </span>
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {path.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {path.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Path Statistics */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>{path.estimated_hours}h total</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <Target className="w-4 h-4 text-green-500" />
                      <span>{path.challenges.length} challenges</span>
                    </div>
                  </div>

                  {/* Progress Section */}
                  {progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Your Progress</span>
                        <span className="font-semibold text-blue-600">{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2.5" />
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {Math.round((progress / 100) * path.challenges.length)} of {path.challenges.length} challenges completed
                      </div>
                    </div>
                  )}

                  {/* Learning Objectives Preview */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-purple-500" />
                      What You'll Master
                    </h4>
                    <div className="space-y-1">
                      {path.learning_objectives.slice(0, 2).map((objective, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                          <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="leading-relaxed">{objective}</span>
                        </div>
                      ))}
                      {path.learning_objectives.length > 2 && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 ml-5">
                          +{path.learning_objectives.length - 2} more skills
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Prerequisites */}
                  {path.prerequisites.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <Users className="w-4 h-4 text-orange-500" />
                        Prerequisites
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {path.prerequisites.map((prereq, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs px-2 py-1">
                            {prereq}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <Button 
                    onClick={() => onSelectPath?.(path.id)}
                    className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300"
                    variant={progress > 0 ? "default" : "outline"}
                  >
                    {progress === 0 ? (
                      <>
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Start Learning
                      </>
                    ) : progress < 100 ? (
                      <>
                        <Target className="w-4 h-4 mr-2" />
                        Continue Path
                      </>
                    ) : (
                      <>
                        <Trophy className="w-4 h-4 mr-2" />
                        Review & Expand
                      </>
                    )}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Enhanced Methodology Section - Scrimba Style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-16"
      >
        <Card className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/30 border-2 border-blue-100 dark:border-blue-800">
          <CardContent className="p-10">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                The Anti-Tutorial Hell Methodology
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Inspired by Scrimba's interactive approach, our paths eliminate passive learning. 
                You'll struggle productively, research independently, and build genuine problem-solving confidence.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                  <Brain className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Think First</h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  No step-by-step instructions. Start with the problem and figure out your approach. 
                  Real developers don't have tutorials for every challenge.
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto">
                  <Code className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Research & Build</h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Use documentation, experiment with different approaches, learn through trial and error. 
                  This mirrors actual development work.
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                  <Trophy className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Build Confidence</h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Each solved challenge builds genuine confidence. You know you can tackle 
                  real problems because you've done it before.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-blue-200 dark:border-blue-700">
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                  "Just as Scrimba revolutionized coding education with interactive learning, 
                  we're eliminating tutorial dependency through challenge-based skill building."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}