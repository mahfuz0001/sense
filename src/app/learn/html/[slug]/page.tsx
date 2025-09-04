'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Code2, ArrowLeft, ArrowRight, BookOpen, Clock, CheckCircle, ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  getLessonById, 
  getNextLesson, 
  getPrevLesson, 
  htmlCategories,
  getLessonsByCategory 
} from '@/data/htmlTutorial'
import { useState } from 'react'
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer'
import { SyntaxGuide } from '@/components/ui/SyntaxGuide'
import { PracticeMode } from '@/components/ui/PracticeMode'

export default function HTMLLessonPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const lesson = getLessonById(slug)
  const nextLesson = getNextLesson(slug)
  const prevLesson = getPrevLesson(slug)
  
  const [showExercises, setShowExercises] = useState(false)
  
  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Lesson Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            The lesson you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/learn/html">
            <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white">
              Back to HTML Tutorial
            </Button>
          </Link>
        </div>
      </div>
    )
  }
  
  const currentCategory = htmlCategories.find(cat => cat.id === lesson.category)
  const categoryLessons = currentCategory ? getLessonsByCategory(lesson.category) : []
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg shadow-lg">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  HTML Tutorial
                </span>
              </Link>
              
              {/* Breadcrumb */}
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <ChevronRight className="w-4 h-4" />
                <Link href="/learn" className="hover:text-orange-600 dark:hover:text-orange-400">
                  Learning Portal
                </Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/learn/html" className="hover:text-orange-600 dark:hover:text-orange-400">
                  HTML
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 dark:text-white">{lesson.title}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/learn/html">
                <Button variant="ghost" size="sm">
                  <Home className="w-4 h-4 mr-2" />
                  HTML Home
                </Button>
              </Link>
              <Link href="/learn">
                <Button variant="ghost" size="sm">Learning Portal</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Table of Contents */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">
                  {currentCategory?.title || 'Lessons'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  {categoryLessons.map((categoryLesson, index) => (
                    <Link 
                      key={categoryLesson.id}
                      href={`/learn/html/${categoryLesson.id}`}
                      className={`block px-4 py-3 border-b border-gray-100 dark:border-gray-700 transition-colors ${
                        categoryLesson.id === lesson.id 
                          ? 'bg-orange-50 dark:bg-orange-900/20 border-l-4 border-l-orange-600 text-orange-600 dark:text-orange-400' 
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            {categoryLesson.id === lesson.id ? (
                              <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">{index + 1}</span>
                              </div>
                            ) : (
                              <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                <span className="text-gray-600 dark:text-gray-400 text-xs">{index + 1}</span>
                              </div>
                            )}
                          </div>
                          <span className="text-sm font-medium truncate">
                            {categoryLesson.title}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Syntax Guide */}
            <div className="mt-6">
              <SyntaxGuide />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Lesson Header */}
              <div className="mb-8">
                <div className="flex items-center space-x-4 mb-4">
                  <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200">
                    {currentCategory?.title}
                  </Badge>
                  <Badge variant="outline">
                    <Clock className="w-3 h-3 mr-1" />
                    {lesson.duration}
                  </Badge>
                  <Badge variant="outline">{lesson.difficulty}</Badge>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {lesson.title}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                  {lesson.description}
                </p>
              </div>

              {/* Lesson Content */}
              <Card className="mb-8">
                <CardContent className="p-8">
                  <MarkdownRenderer content={lesson.content} />
                  
                  {/* Interactive Practice */}
                  {lesson.codeExample && (
                    <div className="mt-6">
                      <PracticeMode
                        initialCode={lesson.codeExample}
                        language="html"
                        showPreview={true}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Key Points */}
              {lesson.keyPoints.length > 0 && (
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                      Key Points
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {lesson.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3"></div>
                          <span className="text-gray-700 dark:text-gray-300">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Exercises */}
              {lesson.exercises && lesson.exercises.length > 0 && (
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                        Practice Exercises
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowExercises(!showExercises)}
                      >
                        {showExercises ? 'Hide' : 'Show'} Exercises
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  {showExercises && (
                    <CardContent>
                      <div className="space-y-6">
                        {lesson.exercises.map((exercise, index) => (
                          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                              Question {index + 1}:
                            </h4>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                              {exercise.question}
                            </p>
                            <details className="group">
                              <summary className="cursor-pointer text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300">
                                Show Answer
                              </summary>
                              <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-700">
                                <p className="text-green-800 dark:text-green-200 font-medium">
                                  {exercise.answer}
                                </p>
                                {exercise.hint && (
                                  <p className="text-green-600 dark:text-green-300 text-sm mt-2">
                                    Hint: {exercise.hint}
                                  </p>
                                )}
                              </div>
                            </details>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between">
                {prevLesson ? (
                  <Link href={`/learn/html/${prevLesson.id}`}>
                    <Button variant="outline" className="flex items-center">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous: {prevLesson.title}
                    </Button>
                  </Link>
                ) : (
                  <div></div>
                )}
                
                {nextLesson ? (
                  <Link href={`/learn/html/${nextLesson.id}`}>
                    <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white flex items-center">
                      Next: {nextLesson.title}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                ) : (
                  <Link href="/learn/html">
                    <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white flex items-center">
                      Back to HTML Tutorial
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}