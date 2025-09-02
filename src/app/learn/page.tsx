'use client'

import { motion } from 'framer-motion'
import { Code2, BookOpen, Clock, Users, Star, ArrowRight, CheckCircle, Zap } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

const languages = [
  {
    id: 'programming',
    name: 'Programming Fundamentals',
    description: 'Start here! Essential concepts every programmer should know before learning any coding language',
    icon: '🧠',
    progress: 0,
    lessons: 7,
    duration: '1 hour',
    difficulty: 'Complete Beginner',
    available: true,
    color: 'from-blue-600 to-purple-600',
    featured: true,
    prerequisite: true
  },
  {
    id: 'html',
    name: 'HTML',
    description: 'Learn the foundation of web development with comprehensive HTML tutorials',
    icon: '🌐',
    progress: 100,
    lessons: 45,
    duration: '8 hours',
    difficulty: 'Beginner',
    available: true,
    color: 'from-orange-500 to-red-500',
    prerequisiteCompleted: false
  },
  {
    id: 'css',
    name: 'CSS',
    description: 'Master styling and layout with modern CSS techniques',
    icon: '🎨',
    progress: 0,
    lessons: 42,
    duration: '10 hours',
    difficulty: 'Beginner',
    available: false,
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    description: 'Build interactive web experiences with JavaScript',
    icon: '⚡',
    progress: 0,
    lessons: 38,
    duration: '15 hours',
    difficulty: 'Intermediate',
    available: false,
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'react',
    name: 'React',
    description: 'Create modern web applications with React framework',
    icon: '⚛️',
    progress: 0,
    lessons: 35,
    duration: '12 hours',
    difficulty: 'Intermediate',
    available: false,
    color: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'python',
    name: 'Python',
    description: 'Learn programming fundamentals with Python',
    icon: '🐍',
    progress: 0,
    lessons: 40,
    duration: '14 hours',
    difficulty: 'Beginner',
    available: false,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'sql',
    name: 'SQL',
    description: 'Master database queries and data management',
    icon: '🗄️',
    progress: 0,
    lessons: 25,
    duration: '8 hours',
    difficulty: 'Beginner',
    available: false,
    color: 'from-purple-500 to-pink-500'
  }
]

const stats = [
  { label: 'Active Learners', value: '12,000+', icon: Users },
  { label: 'Courses Available', value: '6+', icon: BookOpen },
  { label: 'Hours of Content', value: '67+', icon: Clock },
  { label: 'Success Rate', value: '94%', icon: Star }
]

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Anti-Tutorial Hell
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link href="/app">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Home</Button>
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
              <Zap className="w-4 h-4" />
              <span>Complete Beginner Friendly</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Learning Portal
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Start your coding journey from absolute zero. Learn programming fundamentals first, 
              then build websites with HTML. Perfect for complete beginners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/learn/programming">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg">
                  Start with Programming Basics
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
                <BookOpen className="mr-2 w-5 h-5" />
                Browse All Courses
              </Button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              ✨ New to programming? Start with fundamentals • Takes 1 hour • Then move to HTML
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
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
              Choose Your Learning Path
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Start with fundamentals and progress to advanced topics. Each course is designed 
              to build practical skills through real-world projects.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {languages.map((language, index) => (
              <motion.div
                key={language.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={language.featured ? 'lg:col-span-3' : ''}
              >
                <Card className={`h-full transition-all duration-300 hover:shadow-xl ${
                  language.available ? 'hover:-translate-y-1' : 'opacity-75'
                } ${
                  language.featured ? 'border-2 border-blue-200 dark:border-blue-700 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20' : ''
                }`}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{language.icon}</div>
                      <div className="flex gap-2">
                        {language.prerequisite && (
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                            Start Here!
                          </Badge>
                        )}
                        {language.available ? (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                            Available
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            Coming Soon
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardTitle className={`text-2xl mb-2 ${language.featured ? 'text-3xl' : ''}`}>
                      {language.name}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {language.description}
                    </CardDescription>
                    {language.prerequisite && (
                      <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
                        <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
                          👋 Perfect for complete beginners! No programming experience needed.
                        </p>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                        <span>{language.lessons} lessons</span>
                        <span>{language.duration}</span>
                        <Badge variant="outline">{language.difficulty}</Badge>
                      </div>
                      
                      {language.available && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Progress</span>
                            <span>{language.progress}%</span>
                          </div>
                          <Progress value={language.progress} className="h-2" />
                        </div>
                      )}
                      
                      {language.prerequisiteCompleted === false && !language.prerequisite && (
                        <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-700">
                          <p className="text-sm text-amber-800 dark:text-amber-200">
                            💡 Complete Programming Fundamentals first for the best learning experience.
                          </p>
                        </div>
                      )}
                      
                      {language.available ? (
                        <Link href={`/learn/${language.id}`}>
                          <Button className={`w-full ${
                            language.featured 
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-6' 
                              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                          }`}>
                            {language.prerequisite ? 'Start Your Journey' : 'Start Learning'}
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </Link>
                      ) : (
                        <Link href="/learn/coming-soon">
                          <Button variant="outline" className="w-full" disabled>
                            <Clock className="mr-2 w-4 h-4" />
                            Coming Soon
                          </Button>
                        </Link>
                      )}
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
              Why Choose Our Learning Portal?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Learn by Doing',
                description: 'Skip the passive tutorials. Build real projects and solve actual problems from day one.'
              },
              {
                icon: CheckCircle,
                title: 'Structured Learning',
                description: 'Follow proven learning paths designed by experienced developers and educators.'
              },
              {
                icon: Users,
                title: 'Community Support',
                description: 'Join a community of learners. Get help, share progress, and learn together.'
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