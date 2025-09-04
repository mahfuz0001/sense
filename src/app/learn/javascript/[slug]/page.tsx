'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Clock, Target, Code, Play, Lightbulb, Code2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { PracticeMode } from '@/components/ui/PracticeMode'
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer'
import { getJavaScriptLessonById, getNextJavaScriptLesson, getPrevJavaScriptLesson } from '@/data/javascriptTutorial'

interface JavaScriptLessonPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function JavaScriptLessonPage({ params }: JavaScriptLessonPageProps) {
  const { slug } = await params
  const lesson = getJavaScriptLessonById(slug)
  const nextLesson = getNextJavaScriptLesson(slug)
  const prevLesson = getPrevJavaScriptLesson(slug)

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Lesson Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">The requested JavaScript lesson could not be found.</p>
          <Link href="/learn/javascript">
            <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
              Back to JavaScript Tutorial
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const defaultJavaScriptCode = `// Try JavaScript here!
function greetUser() {
    const name = prompt("What's your name?");
    if (name) {
        document.getElementById('output').innerHTML = 
            \`<h2>Hello, \${name}! 👋</h2>
             <p>Welcome to JavaScript practice!</p>\`;
    }
}

// Add event listener
document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript is working! 🎉');
    
    // You can try different things here:
    // - Change colors: document.body.style.backgroundColor = 'lightblue';
    // - Add text: document.getElementById('output').innerHTML = 'New content!';
    // - Create animations, calculations, etc.
});

greetUser();`

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/learn/javascript" className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg shadow-lg">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-gray-900 dark:text-white">JavaScript Tutorial</span>
                <div className="text-xs text-gray-500 dark:text-gray-400">Lesson {lesson.order}</div>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link href="/learn/javascript">
                <Button variant="ghost">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  All Lessons
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Lesson Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
                      {lesson.category}
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                      {lesson.difficulty}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4 mr-1" />
                      {lesson.duration}
                    </div>
                  </div>
                  <CardTitle className="text-3xl text-gray-900 dark:text-white">
                    {lesson.title}
                  </CardTitle>
                  <CardDescription className="text-lg">
                    {lesson.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            {/* Lesson Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardContent className="p-8">
                  <MarkdownRenderer content={lesson.content} />
                </CardContent>
              </Card>
            </motion.div>

            {/* Code Example */}
            {lesson.codeExample && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl text-gray-900 dark:text-white">
                      <Code className="w-5 h-5 mr-2" />
                      Code Example
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MarkdownRenderer content={`\`\`\`javascript\n${lesson.codeExample}\n\`\`\``} />
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Practice Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl text-gray-900 dark:text-white">
                    <Play className="w-5 h-5 mr-2" />
                    Try It Yourself
                  </CardTitle>
                  <CardDescription>
                    Practice JavaScript in our interactive editor. Run your code and see the results instantly!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PracticeMode 
                    initialCode={lesson.codeExample || defaultJavaScriptCode}
                    language="javascript"
                    showPreview={true}
                    className="border-0"
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-between"
            >
              {prevLesson ? (
                <Link href={`/learn/javascript/${prevLesson.id}`} className="flex-1">
                  <Button variant="outline" className="w-full justify-start">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    <div className="text-left">
                      <div className="text-sm text-gray-500">Previous</div>
                      <div className="font-medium">{prevLesson.title}</div>
                    </div>
                  </Button>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
              
              {nextLesson ? (
                <Link href={`/learn/javascript/${nextLesson.id}`} className="flex-1">
                  <Button className="w-full justify-end bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                    <div className="text-right">
                      <div className="text-sm opacity-90">Next</div>
                      <div className="font-medium">{nextLesson.title}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              ) : (
                <Link href="/learn/javascript" className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                    Complete JavaScript Tutorial!
                    <Target className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Key Points */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg text-gray-900 dark:text-white">
                    <Lightbulb className="w-5 h-5 mr-2" />
                    Key Points
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {lesson.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Lesson Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 dark:text-white">Lesson Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Duration</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{lesson.duration}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Difficulty</span>
                      <Badge variant="outline">{lesson.difficulty}</Badge>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Category</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{lesson.category}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Help */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-700">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Need Help?</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Stuck on something? Our community is here to help you master JavaScript!
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Ask Question
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}