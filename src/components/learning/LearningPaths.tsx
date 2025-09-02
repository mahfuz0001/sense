import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, Star, Target, Trophy, BookOpen, Zap, Brain, Rocket, Award, TrendingUp, Users, Eye, Play, Pause, RotateCcw, Filter, Search, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { LearningPath } from '@/types';

interface LearningPathsProps {
  paths: LearningPath[];
  onSelectPath?: (pathId: string) => void;
  userProgress?: Record<string, number>; // pathId -> progress percentage
}

export const LearningPaths = React.memo(({ paths, onSelectPath, userProgress = {} }: LearningPathsProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('recommended')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isAutoPlay, setIsAutoPlay] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Advanced filtering and sorting logic
  const filteredAndSortedPaths = useMemo(() => {
    const filtered = paths.filter(path => {
      const matchesSearch = path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           path.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesDifficulty = selectedDifficulty === 'all' || path.difficulty === selectedDifficulty
      const matchesCategory = selectedCategory === 'all' || path.challenges.some(challenge => 
        challenge.toLowerCase().includes(selectedCategory.toLowerCase())
      )
      return matchesSearch && matchesDifficulty && matchesCategory
    })

    const sortedFiltered = [...filtered];
    // Advanced sorting
    sortedFiltered.sort((a, b) => {
      switch (sortBy) {
        case 'progress':
          return (userProgress[b.id] || 0) - (userProgress[a.id] || 0)
        case 'difficulty':
          const difficultyOrder = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 }
          return difficultyOrder[a.difficulty as keyof typeof difficultyOrder] - difficultyOrder[b.difficulty as keyof typeof difficultyOrder]
        case 'duration':
          return a.estimated_hours - b.estimated_hours
        case 'popular':
          return Math.random() - 0.5 // Simulated popularity
        default: // recommended
          return a.order_index - b.order_index
      }
    })

    return sortedFiltered
  }, [paths, searchQuery, selectedDifficulty, selectedCategory, sortBy, userProgress])
  // Enhanced UI helper functions
  const getDifficultyColor = useCallback((difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 border-emerald-200';
      case 'intermediate': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 border-amber-200';
      case 'advanced': return 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200 border-rose-200';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200 border-slate-200';
    }
  }, []);

  const getDifficultyIcon = useCallback((difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return <BookOpen className="w-4 h-4" />;
      case 'intermediate': return <Target className="w-4 h-4" />;
      case 'advanced': return <Rocket className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  }, []);

  const getDifficultyStars = useCallback((difficulty: string) => {
    const count = difficulty === 'beginner' ? 1 : difficulty === 'intermediate' ? 2 : 3;
    return Array.from({ length: 3 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < count ? 'text-yellow-400 fill-current' : 'text-gray-300'} transition-colors duration-200`}
      />
    ));
  }, []);

  const getProgressColor = useCallback((progress: number) => {
    if (progress >= 80) return 'from-emerald-500 to-emerald-600';
    if (progress >= 50) return 'from-blue-500 to-blue-600';
    if (progress >= 20) return 'from-yellow-500 to-yellow-600';
    return 'from-gray-400 to-gray-500';
  }, []);

  const getEstimatedTimeDisplay = useCallback((hours: number) => {
    if (hours < 1) return `${hours * 60}min`;
    if (hours > 40) return `${Math.ceil(hours / 8)} weeks`;
    return `${hours}h`;
  }, []);

  return (
    <TooltipProvider>
      <section className="py-8">
        {/* Revolutionary Header with AI-powered insights */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              🚀 AI-Powered Learning Paths
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Intelligent, adaptive journeys that evolve with your progress. Master real-world skills through AI-curated challenges.
            </motion.p>
          </div>

          {/* Advanced Control Panel */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800 shadow-xl">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                {/* Smart Search with AI suggestions */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="🔍 AI-powered search: Try 'React hooks' or 'async programming'"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-blue-200 focus:border-blue-400 transition-all duration-300"
                  />
                </div>

                {/* Advanced Filters */}
                <div className="flex gap-2 flex-wrap">
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger className="w-40 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
                      <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">🎯 All Levels</SelectItem>
                      <SelectItem value="beginner">🌱 Beginner</SelectItem>
                      <SelectItem value="intermediate">⚡ Intermediate</SelectItem>
                      <SelectItem value="advanced">🚀 Advanced</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recommended">🤖 AI Recommended</SelectItem>
                      <SelectItem value="progress">📈 Your Progress</SelectItem>
                      <SelectItem value="difficulty">⭐ Difficulty</SelectItem>
                      <SelectItem value="duration">⏱️ Duration</SelectItem>
                      <SelectItem value="popular">🔥 Popular</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View Mode Toggle */}
                  <div className="flex bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="px-3"
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="px-3"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* AI Insights Panel */}
              <motion.div 
                className="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-cyan-50 dark:from-indigo-900/30 dark:to-cyan-900/30 rounded-lg border border-indigo-200 dark:border-indigo-700"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-5 h-5 text-indigo-600" />
                  <span className="font-semibold text-indigo-900 dark:text-indigo-200">AI Learning Insights</span>
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span>Showing {filteredAndSortedPaths.length} personalized paths</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-blue-500" />
                    <span>Optimized for your skill level</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span>Real-time difficulty adjustment</span>
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Revolutionary Learning Path Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={`${viewMode}-${searchQuery}-${selectedDifficulty}-${sortBy}`}
            className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {filteredAndSortedPaths.map((path, index) => {
              const progress = userProgress[path.id] || 0;
              const isCompleted = progress >= 100;
              const isInProgress = progress > 0 && progress < 100;
              
              return (
                <motion.div
                  key={path.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group"
                >
                  <Card className={`h-full transition-all duration-500 hover:shadow-2xl border-2 ${
                    isCompleted 
                      ? 'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30 border-emerald-300 dark:border-emerald-600' 
                      : isInProgress 
                      ? 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-blue-300 dark:border-blue-600'
                      : 'bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                  }`}>
                    <CardHeader className="relative overflow-hidden">
                      {/* Status indicators */}
                      <div className="absolute top-4 right-4 flex gap-2">
                        {isCompleted && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-emerald-500 text-white p-2 rounded-full shadow-lg"
                          >
                            <Trophy className="w-4 h-4" />
                          </motion.div>
                        )}
                        {isInProgress && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-blue-500 text-white p-2 rounded-full shadow-lg"
                          >
                            <Play className="w-4 h-4" />
                          </motion.div>
                        )}
                      </div>

                      {/* Difficulty indicator with icon */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          {getDifficultyIcon(path.difficulty)}
                          <Badge className={`${getDifficultyColor(path.difficulty)} font-semibold px-3 py-1 border`}>
                            {path.difficulty.charAt(0).toUpperCase() + path.difficulty.slice(1)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          {getDifficultyStars(path.difficulty)}
                        </div>
                      </div>

                      <CardTitle className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {path.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300 line-clamp-3">
                        {path.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Enhanced Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-medium">Progress</span>
                          <span className="font-bold">{progress}%</span>
                        </div>
                        <div className="relative">
                          <Progress 
                            value={progress} 
                            className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                          />
                          <motion.div
                            className={`absolute top-0 left-0 h-full bg-gradient-to-r ${getProgressColor(progress)} rounded-full transition-all duration-500`}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                          />
                        </div>
                      </div>

                      {/* Learning objectives with icons */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm flex items-center gap-2">
                          <Target className="w-4 h-4 text-blue-500" />
                          Key Skills You&apos;ll Master
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {path.learning_objectives.slice(0, 3).map((objective, i) => (
                            <Tooltip key={i}>
                              <TooltipTrigger>
                                <Badge variant="secondary" className="text-xs hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors cursor-help">
                                  {objective.length > 20 ? `${objective.slice(0, 20)}...` : objective}
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">{objective}</p>
                              </TooltipContent>
                            </Tooltip>
                          ))}
                          {path.learning_objectives.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{path.learning_objectives.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Enhanced metadata */}
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{getEstimatedTimeDisplay(path.estimated_hours)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            <span>{path.challenges.length} challenges</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span className="text-xs">1.2k learners</span>
                        </div>
                      </div>

                      {/* Enhanced action button */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          onClick={() => onSelectPath?.(path.id)}
                          className={`w-full font-semibold transition-all duration-300 ${
                            isCompleted 
                              ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg' 
                              : isInProgress 
                              ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg'
                              : 'bg-gradient-to-r from-gray-900 to-gray-800 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl'
                          }`}
                        >
                          <div className="flex items-center justify-center gap-2">
                            {isCompleted ? (
                              <>
                                <Trophy className="w-4 h-4" />
                                Review Path
                              </>
                            ) : isInProgress ? (
                              <>
                                <Play className="w-4 h-4" />
                                Continue Learning
                              </>
                            ) : (
                              <>
                                <Rocket className="w-4 h-4" />
                                Start Journey
                              </>
                            )}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

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
    </TooltipProvider>
  )
})

LearningPaths.displayName = 'LearningPaths'