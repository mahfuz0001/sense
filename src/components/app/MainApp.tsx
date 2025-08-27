'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code2, User, LogOut, Settings, Shield } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function MainApp() {
  const [user, setUser] = useState<any>(null)
  const [authModalOpen, setAuthModalOpen] = useState(false)

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Navigation */}
        <nav className="bg-white border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">Anti-Tutorial Hell</span>
              </Link>
              
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline"
                  onClick={() => setAuthModalOpen(true)}
                >
                  Sign In
                </Button>
                <Button onClick={() => setAuthModalOpen(true)}>
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Auth Section */}
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full"
          >
            <Card>
              <CardHeader className="text-center">
                <CardTitle>Welcome to Anti-Tutorial Hell</CardTitle>
                <CardDescription>
                  Sign in to start solving real coding challenges
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" size="lg">
                  Sign In with Email
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  Create Account
                </Button>
                <div className="text-center text-sm text-gray-500">
                  By continuing, you agree to escape tutorial hell
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Anti-Tutorial Hell</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="p-2 text-gray-500 hover:text-gray-700">
                <Shield className="w-5 h-5" />
              </Link>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <User className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your Challenge Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Choose a challenge and start building real skills
          </p>
        </div>

        {/* Challenge Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle>Challenge {i}</CardTitle>
                  <CardDescription>
                    Build a responsive component without tutorials
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      Intermediate
                    </span>
                    <span className="text-sm text-gray-500">
                      Not Started
                    </span>
                  </div>
                  <Button className="w-full mt-4">
                    Start Challenge
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}