'use client'

import { motion } from 'framer-motion'
import { Code2, Clock, ArrowRight, Bell, Calendar, Users } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

const upcomingLanguages = [
  {
    name: 'CSS',
    description: 'Master styling, layouts, animations, and modern CSS features',
    icon: '🎨',
    expectedDate: 'March 2025',
    features: ['Flexbox & Grid', 'Animations', 'Responsive Design', 'CSS-in-JS']
  },
  {
    name: 'JavaScript',
    description: 'Build interactive web applications with modern JavaScript',
    icon: '⚡',
    expectedDate: 'April 2025',
    features: ['ES6+ Features', 'DOM Manipulation', 'Async Programming', 'APIs']
  },
  {
    name: 'React',
    description: 'Create dynamic user interfaces with React framework',
    icon: '⚛️',
    expectedDate: 'May 2025',
    features: ['Components', 'Hooks', 'State Management', 'React Router']
  },
  {
    name: 'Python',
    description: 'Learn programming fundamentals and data manipulation',
    icon: '🐍',
    expectedDate: 'June 2025',
    features: ['Syntax & Logic', 'Data Structures', 'OOP', 'Libraries']
  },
  {
    name: 'SQL',
    description: 'Master database queries and data management',
    icon: '🗄️',
    expectedDate: 'July 2025',
    features: ['Basic Queries', 'Joins', 'Advanced Functions', 'Database Design']
  },
  {
    name: 'Java',
    description: 'Build robust applications with Java programming',
    icon: '☕',
    expectedDate: 'August 2025',
    features: ['OOP Concepts', 'Collections', 'Spring Framework', 'Testing']
  },
  {
    name: 'C++',
    description: 'Learn systems programming and performance optimization',
    icon: '⚙️',
    expectedDate: 'September 2025',
    features: ['Memory Management', 'STL', 'Templates', 'Performance']
  },
  {
    name: 'C#',
    description: 'Develop applications with Microsoft\'s C# language',
    icon: '🔷',
    expectedDate: 'October 2025',
    features: ['.NET Framework', 'LINQ', 'Entity Framework', 'Web APIs']
  }
]

export default function ComingSoonPage() {
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
              <Link href="/learn">
                <Button variant="ghost">Learning Portal</Button>
              </Link>
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-8">
              <Clock className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Coming Soon
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              We&apos;re working hard to bring you comprehensive tutorials for all major programming languages. 
              Get notified when they&apos;re ready!
            </p>
            
            {/* Available Now CTA */}
            <div className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-6 mb-8 inline-block">
              <p className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                🌐 HTML Tutorial is Available Now!
              </p>
              <Link href="/learn/html">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  Start Learning HTML
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <Bell className="w-12 h-12 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">
                Be the First to Know
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Get notified when new programming courses are released. 
                Plus, get early access and exclusive content!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="bg-white text-gray-900 border-0 focus:ring-2 focus:ring-white/50"
                />
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  Notify Me
                </Button>
              </div>
              <p className="text-sm mt-4 opacity-75">
                No spam. Unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Courses */}
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
              Upcoming Courses
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Here&apos;s what we&apos;re building for you. Each course will include comprehensive tutorials, 
              hands-on projects, and real-world applications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingLanguages.map((language, index) => (
              <motion.div
                key={language.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{language.icon}</div>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
                        <Calendar className="w-3 h-3 mr-1" />
                        {language.expectedDate}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl mb-2">{language.name}</CardTitle>
                    <CardDescription className="text-base">
                      {language.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          What you&apos;ll learn:
                        </h4>
                        <ul className="grid grid-cols-2 gap-1 text-sm text-gray-600 dark:text-gray-300">
                          {language.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Button variant="outline" className="w-full" disabled>
                        <Clock className="mr-2 w-4 h-4" />
                        Coming {language.expectedDate}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Section */}
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
              Our Development Progress
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'Community Feedback',
                description: 'Incorporating feedback from 12,000+ active learners to create the best learning experience.',
                status: 'Ongoing'
              },
              {
                icon: Code2,
                title: 'Content Creation',
                description: 'Building comprehensive, practical tutorials with real-world projects and examples.',
                status: 'In Progress'
              },
              {
                icon: Clock,
                title: 'Quality Assurance',
                description: 'Testing and refining each course to ensure high-quality, effective learning materials.',
                status: 'Scheduled'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {item.description}
                </p>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                  {item.status}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}