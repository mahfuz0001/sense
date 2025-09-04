'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, PlayCircle, BookOpen, Target, Users, Zap } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { SearchAndFilter } from '@/components/common/SearchAndFilter'
import { BookmarkButton } from '@/components/common/BookmarkButton'
import { cssCategories } from '@/data/cssTutorial'

export default function CSSTutorialPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Filter categories based on search and filters
  const filteredCategories = useMemo(() => {
    return cssCategories.filter(category => {
      // Category filter
      if (selectedCategory !== 'all' && category.id !== selectedCategory) {
        return false
      }

      // Search filter (search in title and description)
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return category.title.toLowerCase().includes(query) || 
               category.description.toLowerCase().includes(query)
      }

      return true
    })
  }, [searchQuery, selectedCategory])

  const totalLessons = cssCategories.reduce((acc, category) => acc + category.lessons.length, 0)
  const completedLessons = 0 // This would come from user progress data

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/learn" className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-gray-900 dark:text-white">CSS Tutorial</span>
                <div className="text-xs text-gray-500 dark:text-gray-400">Styling & Design</div>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link href="/learn">
                <Button variant="ghost">← Back to Learning</Button>
              </Link>
              <Link href="/app">
                <Button variant="outline">Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Target className="w-4 h-4" />
              <span>Make Beautiful Websites</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Master <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">CSS</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Transform plain HTML into stunning, professional websites. Learn colors, layouts, animations, 
              and responsive design that works on all devices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/learn/css/css-home">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg">
                  <PlayCircle className="mr-2 w-5 h-5" />
                  Start Learning CSS
                </Button>
              </Link>
              <Link href="/learn/css/css-examples">
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
                  <Zap className="mr-2 w-5 h-5" />
                  Try CSS Editor
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              🎨 Perfect after learning HTML • {totalLessons} comprehensive lessons • Practice as you learn
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Overview */}
      <section className="py-12 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {Math.round((completedLessons / totalLessons) * 100)}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Progress</div>
                <Progress value={(completedLessons / totalLessons) * 100} className="mt-2" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{completedLessons}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Completed</div>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{totalLessons}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Total Lessons</div>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">0h</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Time Spent</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              CSS Learning Path
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Follow our structured curriculum to master CSS from basics to advanced techniques. 
              Each section builds upon the previous one.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <div className="mb-8">
            <SearchAndFilter
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedDifficulty={selectedDifficulty}
              onDifficultyChange={setSelectedDifficulty}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categories={cssCategories.map(cat => ({ id: cat.id, title: cat.title }))}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
            />
          </div>

          {/* Results summary */}
          {(searchQuery || selectedDifficulty !== 'all' || selectedCategory !== 'all') && (
            <div className="mb-6 text-center">
              <p className="text-gray-600 dark:text-gray-300">
                Showing {filteredCategories.length} of {cssCategories.length} categories
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>
          )}

          <div className="space-y-8">
            {filteredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-2xl text-gray-900 dark:text-white">
                          {category.title}
                        </CardTitle>
                        <CardDescription className="text-lg mt-2">
                          {category.description}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <BookmarkButton
                          itemId={category.id}
                          itemType="category"
                          size="md"
                          variant="ghost"
                        />
                        <Badge variant="outline" className="text-sm">
                          {category.lessons.length} lessons
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.lessons.slice(0, 6).map((lessonId) => (
                        <Link 
                          key={lessonId}
                          href={`/learn/css/${lessonId}`}
                          className="group"
                        >
                          <div className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                            <div className="flex-shrink-0 w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3">
                              <CheckCircle className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                                {lessonId.replace('css-', '').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </Link>
                      ))}
                      {category.lessons.length > 6 && (
                        <div className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            +{category.lessons.length - 6} more lessons...
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Link href={`/learn/css/${category.lessons[0]}`}>
                        <Button className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                          Start {category.title}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            
            {/* No Results State */}
            {filteredCategories.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No categories found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {searchQuery 
                      ? `No categories match "${searchQuery}". Try a different search term.`
                      : 'No categories match your current filters. Try adjusting your selection.'
                    }
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedDifficulty('all')
                      setSelectedCategory('all')
                    }}
                  >
                    Clear all filters
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Why Learn CSS With Us?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Visual Learning',
                description: 'See your changes instantly. CSS provides immediate visual feedback that makes learning engaging and fun.'
              },
              {
                icon: Zap,
                title: 'Practice-Focused',
                description: 'Every lesson includes hands-on exercises. Learn by doing, not just reading about CSS concepts.'
              },
              {
                icon: Users,
                title: 'Real-World Skills',
                description: 'Learn modern CSS techniques used by professional web developers and designers in the industry.'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}