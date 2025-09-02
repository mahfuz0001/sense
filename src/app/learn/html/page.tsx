'use client'

import { motion } from 'framer-motion'
import { Code2, BookOpen, ArrowRight, CheckCircle, Play, Star, Users } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { htmlCategories } from '@/data/htmlTutorial'

export default function HTMLTutorialPage() {
  const totalLessons = htmlCategories.reduce((acc, category) => acc + category.lessons.length, 0)
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg shadow-lg">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                HTML Tutorial
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link href="/learn">
                <Button variant="ghost">Learning Portal</Button>
              </Link>
              <Link href="/app">
                <Button variant="ghost">Dashboard</Button>
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
            <div className="text-6xl mb-6">🌐</div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              HTML Tutorial
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Learn HTML from scratch with our comprehensive tutorial. Master the foundation of web development 
              with practical examples, exercises, and real-world projects.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{totalLessons}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">8h</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Duration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">Free</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Cost</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">4.9★</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Rating</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/learn/html/html-home">
                <Button size="lg" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 text-lg">
                  <Play className="mr-2 w-5 h-5" />
                  Start Learning
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
                <BookOpen className="mr-2 w-5 h-5" />
                View Curriculum
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="py-16 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Your Learning Progress
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Track your progress through the complete HTML curriculum
            </p>
          </motion.div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">Overall Progress</span>
              <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">0%</span>
            </div>
            <Progress value={0} className="h-3 mb-4" />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">0</div>
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
              Complete HTML Curriculum
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our structured approach takes you from absolute beginner to HTML expert. 
              Each section builds upon the previous one with practical examples and exercises.
            </p>
          </motion.div>

          <div className="space-y-8">
            {htmlCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl mb-2 flex items-center">
                          <span className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                            {category.order}
                          </span>
                          {category.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {category.description}
                        </CardDescription>
                      </div>
                      <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200">
                        {category.lessons.length} lessons
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.lessons.slice(0, 6).map((lessonId, lessonIndex) => (
                        <Link 
                          key={lessonId}
                          href={`/learn/html/${lessonId}`}
                          className="group"
                        >
                          <div className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors">
                            <div className="flex-shrink-0 w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3">
                              <CheckCircle className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 truncate">
                                {lessonId.replace('html-', '').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
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
                      <Link href={`/learn/html/${category.lessons[0]}`}>
                        <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white">
                          Start {category.title}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
              Why Our HTML Tutorial?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: 'Comprehensive Content',
                description: 'Complete coverage from basics to advanced HTML5 features with practical examples.'
              },
              {
                icon: Users,
                title: 'Beginner Friendly',
                description: 'Designed for absolute beginners with step-by-step explanations and no prior knowledge required.'
              },
              {
                icon: Star,
                title: 'Hands-on Learning',
                description: 'Practice with real code examples, exercises, and build actual web pages as you learn.'
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
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-full mb-6">
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