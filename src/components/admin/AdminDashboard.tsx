'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Users, BarChart3, Key, LogOut, AlertTriangle, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [authError, setAuthError] = useState('')

  const handlePasskeyAuth = async () => {
    setIsAuthenticating(true)
    setAuthError('')
    
    try {
      // Simulate passkey authentication
      // In real implementation, this would use WebAuthn API
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // For demo purposes, we'll authenticate successfully
      setIsAuthenticated(true)
    } catch (error: unknown) {
      console.error('Authentication error:', error);
      setAuthError('Authentication failed. Please try again.')
    } finally {
      setIsAuthenticating(false)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <Card className="border-red-200">
            <CardHeader className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Shield className="w-8 h-8 text-red-600" />
              </motion.div>
              <CardTitle className="text-red-800">Admin Access Required</CardTitle>
              <CardDescription>
                This area requires passkey authentication
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {authError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-red-800">{authError}</span>
                  </div>
                </div>
              )}
              
              <Button 
                className="w-full bg-red-600 hover:bg-red-700" 
                size="lg"
                onClick={handlePasskeyAuth}
                disabled={isAuthenticating}
              >
                {isAuthenticating ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Authenticating...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Key className="w-4 h-4" />
                    <span>Authenticate with Passkey</span>
                  </div>
                )}
              </Button>
              
              <div className="text-center">
                <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
                  ← Back to Main App
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navigation */}
      <nav className="bg-red-600 text-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-700 rounded-lg">
                <Shield className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">Admin Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <span className="opacity-75">Secured with</span>
                <span className="ml-1 font-semibold">Passkey Auth</span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="border-red-300 text-red-100 hover:bg-red-700"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Admin Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            System Administration
          </h1>
          <p className="text-gray-600">
            Manage users, challenges, and system security
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">1,234</div>
                  <div className="text-sm text-gray-500">Total Users</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">89</div>
                  <div className="text-sm text-gray-500">Active Challenges</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">76%</div>
                  <div className="text-sm text-gray-500">Completion Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">0</div>
                  <div className="text-sm text-gray-500">Security Alerts</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage user accounts and permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">Active Users</div>
                  <div className="text-sm text-gray-500">Currently online: 45</div>
                </div>
                <Button size="sm">View All</Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">New Registrations</div>
                  <div className="text-sm text-gray-500">Last 24h: 12</div>
                </div>
                <Button size="sm">Review</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Security</CardTitle>
              <CardDescription>
                Monitor security status and threats
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <div>
                    <div className="font-medium">Rate Limiting</div>
                    <div className="text-sm text-gray-500">Active & functional</div>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">ON</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <div>
                    <div className="font-medium">Passkey Auth</div>
                    <div className="text-sm text-gray-500">WebAuthn enabled</div>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">SECURE</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Challenge Management</CardTitle>
              <CardDescription>
                Create and manage coding challenges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                Create New Challenge
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
              <CardDescription>
                View system activity and errors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm font-mono">
                <div className="text-green-600">[INFO] System healthy</div>
                <div className="text-blue-600">[DEBUG] Rate limit check passed</div>
                <div className="text-yellow-600">[WARN] High memory usage detected</div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                View Full Logs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}