'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle, Clock, Code2, ChevronRight, Book, Target } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  getProgrammingLessonById, 
  getNextProgrammingLesson, 
  getPrevProgrammingLesson,
  programmingLessons 
} from '@/data/programmingFundamentals'

// Simple markdown-like content renderer for programming lessons
function ContentRenderer({ content }: { content: string }) {
  // Convert markdown-like syntax to JSX
  const renderContent = (text: string) => {
    const lines = text.split('\n')
    const elements: JSX.Element[] = []
    let currentCodeBlock = ''
    let inCodeBlock = false
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      
      // Handle code blocks
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          // End code block
          elements.push(
            <div key={i} className="my-6">
              <pre className="bg-gray-900 dark:bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{currentCodeBlock.trim()}</code>
              </pre>
            </div>
          )
          currentCodeBlock = ''
          inCodeBlock = false
        } else {
          // Start code block
          inCodeBlock = true
        }
        continue
      }
      
      if (inCodeBlock) {
        currentCodeBlock += line + '\n'
        continue
      }
      
      // Handle headings
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={i} className="text-3xl font-bold text-gray-900 dark:text-white my-6">
            {line.substring(2)}
          </h1>
        )
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={i} className="text-2xl font-semibold text-gray-900 dark:text-white my-5">
            {line.substring(3)}
          </h2>
        )
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={i} className="text-xl font-semibold text-gray-900 dark:text-white my-4">
            {line.substring(4)}
          </h3>
        )
      } else if (line.startsWith('- ')) {
        // Handle list items
        elements.push(
          <li key={i} className="text-gray-700 dark:text-gray-300 ml-6 my-1">
            {line.substring(2)}
          </li>
        )
      } else if (line.trim() === '') {
        // Empty line
        elements.push(<br key={i} />)
      } else if (line.trim()) {
        // Regular paragraph
        const processedLine = line
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">$1</code>')
        
        elements.push(
          <p key={i} className="text-gray-700 dark:text-gray-300 my-4 leading-relaxed" 
             dangerouslySetInnerHTML={{ __html: processedLine }}>
          </p>
        )
      }
    }
    
    return elements
  }
  
  return <div className="prose prose-lg max-w-none">{renderContent(content)}</div>
}

export default function ProgrammingLessonPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const lesson = getProgrammingLessonById(slug)
  const nextLesson = getNextProgrammingLesson(slug)
  const prevLesson = getPrevProgrammingLesson(slug)
  
  const [showExercises, setShowExercises] = useState(false)
  
  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Lesson Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            The lesson you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/learn/programming">
            <Button>← Back to Programming Fundamentals</Button>
          </Link>
        </div>
      </div>
    )
  }

  const lessonIndex = programmingLessons.findIndex(l => l.id === slug)
  const progress = Math.round(((lessonIndex + 1) / programmingLessons.length) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header Navigation */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Programming Fundamentals
                </span>
              </Link>
              
              {/* Breadcrumb */}
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <ChevronRight className="w-4 h-4" />
                <Link href="/learn" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Learning Portal
                </Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/learn/programming" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Programming Fundamentals
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 dark:text-white">{lesson.title}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/learn/programming">
                <Button variant="ghost">
                  <Book className="mr-2 w-4 h-4" />
                  All Lessons
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Programming Fundamentals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {programmingLessons.slice(0, 10).map((l, index) => (
                      <Link key={l.id} href={`/learn/programming/${l.id}`}>
                        <div className={`flex items-center justify-between p-2 rounded-lg transition-colors cursor-pointer ${
                          l.id === lesson.id 
                            ? 'bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700' 
                            : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}>
                          <div className="flex items-center space-x-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              l.id === lesson.id 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                            }`}>
                              {index + 1}
                            </div>
                            <span className={`text-sm font-medium ${
                              l.id === lesson.id 
                                ? 'text-blue-900 dark:text-blue-100' 
                                : 'text-gray-900 dark:text-white'
                            }`}>
                              {l.title}
                            </span>
                          </div>
                          {l.id === lesson.id && <ChevronRight className="w-4 h-4 text-blue-600" />}
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
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
                  <Badge variant="outline">{lesson.category}</Badge>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span>{lesson.duration}</span>
                  </div>
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
                  <ContentRenderer content={lesson.content} />
                </CardContent>
              </Card>

              {/* Key Points */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="mr-2 w-5 h-5 text-blue-600" />
                    Key Points
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {lesson.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Exercises */}
              {lesson.exercises && lesson.exercises.length > 0 && (
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Check Your Understanding</CardTitle>
                    <p className="text-gray-600 dark:text-gray-300">
                      Test what you&apos;ve learned with these quick questions.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => setShowExercises(!showExercises)}
                      variant="outline"
                      className="mb-4"
                    >
                      {showExercises ? 'Hide' : 'Show'} Exercises
                    </Button>
                    
                    {showExercises && (
                      <div className="space-y-4">
                        {lesson.exercises.map((exercise, index) => (
                          <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                              Question {index + 1}: {exercise.question}
                            </h4>
                            <details>
                              <summary className="cursor-pointer text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                Show Answer
                              </summary>
                              <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded">
                                <p className="text-green-800 dark:text-green-300 font-medium">
                                  {exercise.answer}
                                </p>
                                {exercise.hint && (
                                  <p className="text-green-600 dark:text-green-400 text-sm mt-1">
                                    Hint: {exercise.hint}
                                  </p>
                                )}
                              </div>
                            </details>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <div>
                  {prevLesson && (
                    <Link href={`/learn/programming/${prevLesson.id}`}>
                      <Button variant="outline" className="flex items-center space-x-2">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Previous: {prevLesson.title}</span>
                      </Button>
                    </Link>
                  )}
                </div>
                <div>
                  {nextLesson ? (
                    <Link href={`/learn/programming/${nextLesson.id}`}>
                      <Button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <span>Next: {nextLesson.title}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/learn/html">
                      <Button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <span>Continue to HTML Tutorial</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}