'use client'

import { motion } from 'framer-motion'
import { Code2, BookOpen, ArrowRight, CheckCircle, Play, Star, Lightbulb, Monitor } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { programmingCategories, programmingLessons } from '@/data/programmingFundamentals'

export default function ProgrammingFundamentalsPage() {
  const totalLessons = programmingCategories.reduce((acc, category) => acc + category.lessons.length, 0)
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Programming Fundamentals
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
            <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Lightbulb className="w-4 h-4" />
              <span>Perfect for Complete Beginners</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Programming
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Fundamentals
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Start your coding journey from the very beginning. Learn what programming is, how computers work, 
              and build the foundation you need before diving into HTML and web development.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalLessons}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">1h</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Duration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">Free</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Cost</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">4.9★</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Rating</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/learn/programming/${programmingLessons[0].id}`}>
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4">
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
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Track your progress through the complete programming fundamentals curriculum
            </p>
          </motion.div>

          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Overall Progress</CardTitle>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">0%</span>
              </div>
              <Progress value={0} className="mt-2" />
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
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
              Complete Programming Fundamentals
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Perfect for absolute beginners. Learn the essential concepts every programmer should know 
              before starting any coding language, including HTML.
            </p>
          </motion.div>

          <div className="space-y-8">
            {programmingCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                            {category.order}
                          </span>
                          {category.title}
                        </CardTitle>
                        <CardDescription className="text-lg mt-2">
                          {category.description}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {category.lessons.length} lessons
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid gap-3 mb-6">
                      {category.lessons.slice(0, 6).map((lessonId, lessonIndex) => {
                        const lesson = programmingLessons.find(l => l.id === lessonId)
                        if (!lesson) return null
                        
                        return (
                          <Link key={lesson.id} href={`/learn/programming/${lesson.id}`}>
                            <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                              <div className="flex items-center space-x-3">
                                <CheckCircle className="w-5 h-5 text-gray-400" />
                                <span className="font-medium text-gray-900 dark:text-white">
                                  {lesson.title}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {lesson.duration}
                                </Badge>
                              </div>
                              <ArrowRight className="w-4 h-4 text-gray-400" />
                            </div>
                          </Link>
                        )
                      })}
                      {category.lessons.length > 6 && (
                        <div className="text-center py-2 text-gray-500 dark:text-gray-400">
                          +{category.lessons.length - 6} more lessons...
                        </div>
                      )}
                    </div>
                    <Link href={`/learn/programming/${category.lessons[0]}`}>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        Start {category.title}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Learn Programming Fundamentals Section */}
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
              Why Start with Programming Fundamentals?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Lightbulb,
                title: 'Build Strong Foundations',
                description: 'Understand core concepts that apply to all programming languages, not just HTML.'
              },
              {
                icon: Monitor,
                title: 'Complete Beginner Friendly',
                description: 'Start from absolute zero - no prior knowledge required. Perfect for anyone new to programming.'
              },
              {
                icon: Star,
                title: 'Confidence Building',
                description: 'Feel prepared and confident when you move to HTML and other programming languages.'
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
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Start Your Programming Journey?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of beginners who started with programming fundamentals and successfully built their first websites.
            </p>
            <Link href={`/learn/programming/${programmingLessons[0].id}`}>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4">
                <Play className="mr-2 w-5 h-5" />
                Start Your Journey - It&apos;s Free!
              </Button>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              No account required • Takes about 1 hour • Prepares you for HTML
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}