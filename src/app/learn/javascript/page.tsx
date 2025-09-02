'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Clock, PlayCircle, BookOpen, Target, Users, Zap, Code2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { javascriptCategories } from '@/data/javascriptTutorial'

export default function JavaScriptTutorialPage() {
  const totalLessons = javascriptCategories.reduce((acc, category) => acc + category.lessons.length, 0)
  const completedLessons = 0 // This would come from user progress data

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/learn" className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg shadow-lg">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-gray-900 dark:text-white">JavaScript Tutorial</span>
                <div className="text-xs text-gray-500 dark:text-gray-400">Interactive Programming</div>
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
            <div className="inline-flex items-center space-x-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              <span>Bring Websites to Life</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Master <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">JavaScript</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Learn the programming language that powers the modern web. Create interactive websites, 
              build applications, and bring your ideas to life with JavaScript.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/learn/javascript/js-home">
                <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-4 text-lg">
                  <PlayCircle className="mr-2 w-5 h-5" />
                  Start Learning JavaScript
                </Button>
              </Link>
              <Link href="/learn/javascript/js-examples">
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
                  <Code2 className="mr-2 w-5 h-5" />
                  Try JavaScript Editor
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              ⚡ Perfect after HTML & CSS • {totalLessons} comprehensive lessons • Interactive coding exercises
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
                <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
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
              JavaScript Learning Path
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Master JavaScript from fundamentals to advanced concepts. Each section builds upon the previous one,
              taking you from beginner to proficient JavaScript developer.
            </p>
          </motion.div>

          <div className="space-y-8">
            {javascriptCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl text-gray-900 dark:text-white">
                          {category.title}
                        </CardTitle>
                        <CardDescription className="text-lg mt-2">
                          {category.description}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="text-sm">
                        {category.lessons.length} lessons
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.lessons.slice(0, 6).map((lessonId, lessonIndex) => (
                        <Link 
                          key={lessonId}
                          href={`/learn/javascript/${lessonId}`}
                          className="group"
                        >
                          <div className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors">
                            <div className="flex-shrink-0 w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3">
                              <CheckCircle className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 truncate">
                                {lessonId.replace('js-', '').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
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
                      <Link href={`/learn/javascript/${category.lessons[0]}`}>
                        <Button className="w-full md:w-auto bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
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
              Why Learn JavaScript With Us?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Interactive Learning',
                description: 'Run JavaScript code instantly in your browser. See immediate results and experiment with every concept you learn.'
              },
              {
                icon: Target,
                title: 'Real-World Focus',
                description: 'Learn JavaScript through practical examples and projects. Build actual applications, not just theoretical exercises.'
              },
              {
                icon: Users,
                title: 'Industry Standards',
                description: 'Master modern JavaScript (ES6+) features and best practices used by professional developers worldwide.'
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
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-6">
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