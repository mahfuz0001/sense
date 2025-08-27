'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lightbulb, ChevronRight, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Challenge } from '@/types'

interface HintSystemProps {
  challenge: Challenge
  onHintUsed: () => void
}

export function HintSystem({ challenge, onHintUsed }: HintSystemProps) {
  const [revealedHints, setRevealedHints] = useState<number[]>([])
  const [showingHint, setShowingHint] = useState<number | null>(null)

  const revealHint = (hintIndex: number) => {
    if (!revealedHints.includes(hintIndex)) {
      setRevealedHints(prev => [...prev, hintIndex])
      onHintUsed()
    }
    setShowingHint(hintIndex)
  }

  const toggleHint = (hintIndex: number) => {
    setShowingHint(showingHint === hintIndex ? null : hintIndex)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Lightbulb className="w-5 h-5" />
          <span>Hint System</span>
          <Badge variant="outline" className="ml-auto">
            {revealedHints.length}/{challenge.hints.length} used
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="text-sm text-gray-600 mb-4">
            <p>💡 <strong>Anti-Tutorial Hell Philosophy:</strong> We provide hints to guide your thinking, not to give away the solution. Use them sparingly and try to solve problems independently first.</p>
          </div>
          
          {challenge.hints.map((hint, index) => (
            <div key={index} className="border rounded-lg">
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">
                      Hint {index + 1}
                    </span>
                    {revealedHints.includes(index) && (
                      <Badge variant="secondary" className="text-xs">
                        Revealed
                      </Badge>
                    )}
                  </div>
                  
                  {revealedHints.includes(index) ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleHint(index)}
                    >
                      {showingHint === index ? (
                        <>
                          <EyeOff className="w-4 h-4 mr-2" />
                          Hide
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 mr-2" />
                          Show
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => revealHint(index)}
                    >
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Reveal Hint
                    </Button>
                  )}
                </div>
                
                <AnimatePresence>
                  {showingHint === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                        <p className="text-sm text-blue-900">{hint}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
          
          {revealedHints.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              <Lightbulb className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm">Try solving the challenge on your own first!</p>
              <p className="text-xs mt-2">Hints are here when you need guidance.</p>
            </div>
          )}
          
          {revealedHints.length > 0 && (
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-xs text-yellow-800">
                <strong>Remember:</strong> Each hint used is tracked in your learning analytics. 
                The goal is to build independent problem-solving skills.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}