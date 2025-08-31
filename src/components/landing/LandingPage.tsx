'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Code2, Zap, Target, Users, ArrowRight, CheckCircle, XCircle, Play, Star, Rocket, Moon, Sun, Menu, X, AlertCircle, Lightbulb } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ThemeToggle } from '@/components/theme-toggle'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Skeleton } from '@/components/ui/skeleton'

export function LandingPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    })
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [controls])

  const statsData = [
    { number: "10,000+", label: "Challenges Solved" },
    { number: "5,000+", label: "Active Learners" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "Community Support" }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Frontend Developer",
      company: "Google",
      content: "Anti-Tutorial Hell changed how I learn. Instead of copying code, I now solve real problems and understand the why behind every solution.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5c4?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "Marcus Rodriguez",
      role: "Full Stack Engineer",
      company: "Microsoft",
      content: "The struggle-first approach built my confidence. Now I tackle any coding challenge without fear of getting stuck.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "Priya Patel",
      role: "Software Engineer",
      company: "Meta",
      content: "From tutorial hell to problem-solving master in 3 months. The best investment in my coding journey.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face"
    }
  ]

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-x-hidden">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-3"
              >
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Anti-Tutorial Hell
                </span>
              </motion.div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link 
                      href="/learn" 
                      className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      Learning Portal
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Access comprehensive programming tutorials</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link 
                      href="/app" 
                      className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      Sign In
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Sign in to your account</p>
                  </TooltipContent>
                </Tooltip>
                
                <ThemeToggle />
                
                <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Link href="/app">
                    Get Started
                  </Link>
                </Button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center space-x-2">
                <ThemeToggle />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="flex flex-col space-y-2">
                  <Link 
                    href="/app" 
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Button asChild className="mx-4 bg-gradient-to-r from-blue-600 to-purple-600">
                    <Link href="/app" onClick={() => setIsMobileMenuOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse delay-500"></div>
          </div>
          
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-16">
              {isLoading ? (
                <div className="space-y-6">
                  <Skeleton className="h-12 w-96 mx-auto" />
                  <Skeleton className="h-20 w-full max-w-4xl mx-auto" />
                  <Skeleton className="h-12 w-80 mx-auto" />
                  <div className="flex justify-center space-x-4">
                    <Skeleton className="h-12 w-48" />
                    <Skeleton className="h-12 w-32" />
                  </div>
                </div>
              ) : (
                <>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Badge variant="secondary" className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full text-blue-800 dark:text-blue-200 text-sm font-medium mb-6 shadow-lg">
                      <Rocket className="w-4 h-4 mr-2" />
                      Join 10,000+ developers who escaped tutorial hell
                    </Badge>
                  </motion.div>
                  
                  <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
                  >
                    Escape Tutorial Hell
                    <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                      Build Real Skills
                    </span>
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-10 leading-relaxed"
                  >
                    Stop following step-by-step tutorials. Start solving real problems. 
                    Build the confidence to tackle any coding challenge independently with our 
                    <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> struggle-first learning approach</span>.
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                  >
                    <Button asChild size="lg" className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                      <Link href="/app">
                        Start Building Real Skills
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                    
                    <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="lg" className="group text-lg px-8 py-4 border-2 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300">
                          <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                          Watch Demo
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>See Anti-Tutorial Hell in Action</DialogTitle>
                        </DialogHeader>
                        <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 dark:text-gray-400">Demo video coming soon</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </motion.div>

                  {/* Enhanced Stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
                  >
                    {statsData.map((stat, index) => (
                      <motion.div 
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="text-center p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700"
                      >
                        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                          {stat.number}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 text-sm md:text-base font-medium">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Problem Statement */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-12 items-center mb-24"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Our Philosophy
                </h2>
                <div className="space-y-6">
                  <Card className="border-red-200 dark:border-red-800">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Traditional tutorials create passive learners</h3>
                          <p className="text-gray-600 dark:text-gray-400">You follow steps, copy code, and feel like you understand—until you face a real problem alone.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-green-200 dark:border-green-800">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Our challenges force active learning</h3>
                          <p className="text-gray-600 dark:text-gray-400">You&apos;ll struggle, research, experiment, and eventually solve problems independently.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-700">
                    <CardContent className="p-6">
                      <p className="text-blue-900 dark:text-blue-200 font-medium">
                        This struggle is not a bug—it&apos;s the feature that builds genuine developer confidence.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <Card className="shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Real Problems</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Face challenges that mirror actual development work. No artificial examples.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      "Responsive Three-Column Grid",
                      "TypeScript Form Validation", 
                      "React State Management",
                      "API Integration & Caching"
                    ].map((challenge, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                      >
                        <Target className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{challenge}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Independent Learning Platform
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Research, experiment, and solve problems yourself. Build genuine confidence through struggle-first learning.
              </p>
            </motion.div>

            <Tabs defaultValue="features" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="process">Process</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
              </TabsList>
              
              <TabsContent value="features" className="space-y-8">
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      icon: Zap,
                      title: "No Hand-Holding",
                      description: "Minimal guidance forces you to think critically and develop problem-solving skills.",
                      color: "blue"
                    },
                    {
                      icon: Target,
                      title: "Real Problems",
                      description: "Face challenges that mirror actual development work. No artificial examples.",
                      color: "green"
                    },
                    {
                      icon: Users,
                      title: "Community Driven",
                      description: "Join developers who learn by doing, not by following tutorials.",
                      color: "purple"
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    >
                      <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                        <CardContent className="p-6 text-center">
                          <div className={`w-16 h-16 bg-${feature.color}-100 dark:bg-${feature.color}-900/30 rounded-full flex items-center justify-center mx-auto mb-4`}>
                            <feature.icon className={`w-8 h-8 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="process" className="space-y-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { step: "1", title: "Get Challenge", description: "Receive a real-world coding problem" },
                    { step: "2", title: "Struggle", description: "Research and experiment independently" },
                    { step: "3", title: "Breakthrough", description: "Experience the joy of solving it yourself" },
                    { step: "4", title: "Confidence", description: "Build genuine problem-solving skills" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="text-center h-full">
                        <CardContent className="p-6">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                            {item.step}
                          </div>
                          <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="results" className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <span>Success Metrics</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { metric: "95%", label: "Complete challenges successfully" },
                          { metric: "3x", label: "Faster at solving new problems" },
                          { metric: "87%", label: "Land their dream job within 6 months" }
                        ].map((stat, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <span className="text-gray-600 dark:text-gray-400">{stat.label}</span>
                            <span className="font-bold text-lg text-blue-600">{stat.metric}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Learning Outcomes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          "Independent problem-solving ability",
                          "Confidence in tackling unknown challenges", 
                          "Research and debugging skills",
                          "Real-world development experience"
                        ].map((outcome, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-gray-700 dark:text-gray-300">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Scrimba-Inspired Methodology Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full text-blue-800 dark:text-blue-200 text-sm font-medium mb-6 shadow-lg border-0">
                <Target className="w-4 h-4 mr-2" />
                Inspired by Scrimba&apos;s Educational Excellence
              </Badge>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                How We Built Our Methodology
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Just as Scrimba revolutionized coding education with interactive learning, we&apos;re eliminating tutorial dependency 
                through challenge-based skill building. Here&apos;s the story behind our approach.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
              {/* Left Side - The Problem */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">The Tutorial Hell Problem</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Passive Learning Trap</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Following tutorials creates the illusion of understanding without building real skills</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Dependency Cycle</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Learners become addicted to step-by-step guidance and can&apos;t solve new problems</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">False Confidence</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Tutorial completion feels like progress but doesn&apos;t translate to real-world ability</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Side - Our Solution */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Our Challenge-First Solution</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Active Problem Solving</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Start with real problems, research solutions, build understanding through struggle</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Independence Building</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Learn to research, experiment, and solve problems without hand-holding</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Genuine Confidence</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Each solved challenge builds real confidence because you know you can tackle new problems</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* The Scrimba Connection */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-2 border-blue-200 dark:border-blue-700 shadow-2xl">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">The Scrimba Legacy</h3>
                  </div>
                  
                  <blockquote className="text-lg text-gray-700 dark:text-gray-300 italic mb-6 leading-relaxed">
                    &ldquo;Scrimba taught us that <strong>interactive beats passive</strong>. 
                    We&apos;re taking this further: <strong>challenges beat tutorials</strong>. 
                    Just as Scrimba made traditional coding videos obsolete, 
                    we&apos;re making traditional coding tutorials obsolete.&rdquo;
                  </blockquote>
                  
                  <div className="grid md:grid-cols-3 gap-6 text-sm">
                    <div className="space-y-2">
                      <div className="font-semibold text-blue-600 dark:text-blue-400">What Scrimba Gave Us</div>
                      <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Interactive over passive</li>
                        <li>• Quality over quantity</li>
                        <li>• Community over competition</li>
                        <li>• Skills over certificates</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="font-semibold text-purple-600 dark:text-purple-400">What We're Adding</div>
                      <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Challenges over tutorials</li>
                        <li>• Struggle over comfort</li>
                        <li>• Research over hand-holding</li>
                        <li>• Independence over dependency</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="font-semibold text-green-600 dark:text-green-400">The Result</div>
                      <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Genuine problem-solving skills</li>
                        <li>• Real developer confidence</li>
                        <li>• Independent learning ability</li>
                        <li>• Job-ready competence</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge variant="secondary" className="mb-4">
                Success Stories
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Loved by Developers Worldwide
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                See how developers transformed their careers by escaping tutorial hell
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-6 italic text-lg leading-relaxed">
                        &ldquo;{testimonial.content}&rdquo;
                      </p>
                      <div className="flex items-center">
                        <Avatar className="w-12 h-12 mr-4">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback>
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{testimonial.role} at {testimonial.company}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge variant="secondary" className="mb-4">
                FAQ
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Everything you need to know about Anti-Tutorial Hell
              </p>
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  question: "How is this different from other coding platforms?",
                  answer: "Unlike traditional platforms that provide step-by-step instructions, we give you real problems without hand-holding. You'll research, struggle, and discover solutions independently, building genuine problem-solving skills."
                },
                {
                  question: "Is this suitable for complete beginners?",
                  answer: "Yes! We start with beginner-friendly challenges but expect you to research and learn. This approach builds stronger foundations than following tutorials. Our hint system provides guidance when you're truly stuck."
                },
                {
                  question: "What technologies can I learn?",
                  answer: "We cover HTML/CSS, JavaScript, TypeScript, React, Node.js, databases, and more. Each challenge mirrors real-world development scenarios you'll encounter in your career."
                },
                {
                  question: "How long does it take to see results?",
                  answer: "Most developers notice improved confidence within 2-3 weeks. The struggle-first approach accelerates learning because you're forced to understand concepts deeply rather than memorizing steps."
                },
                {
                  question: "Is there community support?",
                  answer: "Yes! Our community helps each other without giving away solutions. You'll get hints, guidance, and encouragement while maintaining the challenge's learning value."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-left text-lg text-gray-900 dark:text-white">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Escape Tutorial Hell?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of developers who chose struggle-first learning and built unshakeable coding confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  <Link href="/app">
                    Start Your Journey Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                
                <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300">
                      <Play className="mr-2 w-5 h-5" />
                      Watch Success Stories
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </div>
              
              <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                {[
                  { number: "10,000+", label: "Developers Helped" },
                  { number: "95%", label: "Success Rate" },
                  { number: "24/7", label: "Support" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-white"
                  >
                    <div className="text-3xl font-bold mb-2">{stat.number}</div>
                    <div className="text-sm opacity-80">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Anti-Tutorial Hell
                </span>
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                © 2024 Anti-Tutorial Hell. Learn by Doing, Not Following.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  )
}