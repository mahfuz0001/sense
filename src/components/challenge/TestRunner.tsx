'use client'

import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Play, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface TestResult {
  id: string
  description: string
  expected_output: string
  passed?: boolean
  output?: string
}

interface TestRunnerProps {
  testResults: TestResult[]
  isRunning: boolean
  onRunTests: () => void
}

export function TestRunner({ testResults, isRunning, onRunTests }: TestRunnerProps) {
  const passedTests = testResults.filter(test => test.passed).length
  const totalTests = testResults.length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Play className="w-5 h-5" />
            <span>Test Results</span>
            {testResults.length > 0 && (
              <span className="text-sm font-normal text-gray-600">
                ({passedTests}/{totalTests} passing)
              </span>
            )}
          </CardTitle>
          <Button 
            onClick={onRunTests} 
            disabled={isRunning}
            size="sm"
          >
            {isRunning ? (
              <>
                <Clock className="w-4 h-4 mr-2 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Run Tests
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {testResults.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Play className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Run tests to see results</p>
          </div>
        ) : (
          <div className="space-y-3">
            {testResults.map((test, index) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border-2 ${
                  test.passed 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  {test.passed ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-medium ${
                      test.passed ? 'text-green-900' : 'text-red-900'
                    }`}>
                      {test.description}
                    </h4>
                    <p className={`text-sm mt-1 ${
                      test.passed ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {test.output || test.expected_output}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}