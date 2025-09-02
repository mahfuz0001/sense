'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Play, RotateCcw, Lightbulb, CheckCircle, Clock, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeEditor } from './CodeEditor'
import { TestRunner } from './TestRunner'
import { HintSystem } from './HintSystem'
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer'
import type { Challenge } from '@/types'

interface ChallengeInterfaceProps {
  challenge: Challenge
  onBack: () => void
  onComplete: (solution: string) => void
}

export function ChallengeInterface({ challenge, onBack, onComplete }: ChallengeInterfaceProps) {
  const [code, setCode] = useState(challenge.starting_code)
  const [testResults, setTestResults] = useState<Array<{ id: string; description: string; expected_output: string; passed?: boolean; output?: string }>>([])
  const [isRunning, setIsRunning] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [startTime] = useState(Date.now())
  const [isCompleted, setIsCompleted] = useState(false)

  const runTests = async () => {
    setIsRunning(true)
    
    // Simulate test execution with realistic timing
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))
    
    // Simple test simulation based on code content
    const results = challenge.test_cases.map(testCase => {
      // Basic pattern matching for different challenge types
      let passed = false
      
      if (challenge.category === 'CSS & Layout') {
        // Check for CSS Grid properties
        passed = code.includes('display: grid') && 
                 code.includes('grid-template-columns') &&
                 code.includes('gap')
      } else if (challenge.category === 'TypeScript & Forms') {
        // Check for form validation patterns
        passed = code.includes('validation') || 
                 code.includes('required') ||
                 code.includes('validate')
      } else if (challenge.category === 'React Components') {
        // Check for React patterns
        passed = code.includes('useState') || 
                 code.includes('useEffect') ||
                 code.includes('component')
      } else {
        // Default: check if code has been modified from starting code
        passed = code.trim() !== challenge.starting_code.trim() && code.length > challenge.starting_code.length
      }
      
      return {
        id: testCase.id,
        description: testCase.description,
        expected_output: testCase.expected_output,
        passed,
        output: passed ? testCase.expected_output : 'Test failed - check your implementation'
      }
    })
    
    setTestResults(results)
    setIsRunning(false)
    
    // Check if all tests passed
    const allPassed = results.every(result => result.passed)
    if (allPassed && !isCompleted) {
      setIsCompleted(true)
      onComplete(code)
    }
  }

  const resetCode = () => {
    setCode(challenge.starting_code)
    setTestResults([])
    setIsCompleted(false)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{challenge.title}</h1>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className={getDifficultyColor(challenge.difficulty)}>
                    {challenge.difficulty}
                  </Badge>
                  <Badge variant="outline">{challenge.category}</Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{Math.floor((Date.now() - startTime) / 60000)}m</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Lightbulb className="w-4 h-4" />
                <span>{hintsUsed} hints</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Challenge Description */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Challenge Description</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MarkdownRenderer content={challenge.description} />
              </CardContent>
            </Card>

            <HintSystem 
              challenge={challenge}
              onHintUsed={() => setHintsUsed(prev => prev + 1)}
            />

            <TestRunner 
              testResults={testResults}
              isRunning={isRunning}
              onRunTests={runTests}
            />
          </div>

          {/* Code Editor */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Code Editor</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={resetCode}>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                    <Button onClick={runTests} disabled={isRunning}>
                      <Play className="w-4 h-4 mr-2" />
                      {isRunning ? 'Running...' : 'Run Tests'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <CodeEditor 
                  value={code}
                  onChange={setCode}
                  language={challenge.category.includes('CSS') ? 'css' : 'typescript'}
                />
              </CardContent>
            </Card>

            {/* Success Message */}
            <AnimatePresence>
              {isCompleted && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card className="border-green-200 bg-green-50">
                    <CardContent className="pt-6">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                        <div>
                          <h3 className="text-lg font-semibold text-green-900">
                            Challenge Completed! 🎉
                          </h3>
                          <p className="text-green-700">
                            Great job! You&apos;ve successfully solved this challenge. 
                            Your solution demonstrates strong problem-solving skills.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}