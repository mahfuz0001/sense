'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Code2, CheckCircle, Clock, Target, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChallengeInterface } from '@/components/challenge/ChallengeInterface'
import { allEasyChallenges } from '@/data/easyChallenges'
import type { Challenge } from '@/types'

const categories = [
  'All Categories',
  'HTML Basics',
  'HTML Forms',
  'CSS Basics',
  'CSS Layout',
  'CSS Responsive',
  'JavaScript Basics',
  'JavaScript DOM',
  'JavaScript Logic',
]

const difficulties = ['All Levels', 'beginner', 'intermediate', 'advanced']

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner': return 'bg-green-100 text-green-800 border-green-200'
    case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'advanced': return 'bg-red-100 text-red-800 border-red-200'
    default: return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getCategoryIcon = (category: string) => {
  if (category.includes('HTML')) return '🌐'
  if (category.includes('CSS')) return '🎨'
  if (category.includes('JavaScript')) return '⚡'
  return '💻'
}

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [filteredChallenges, setFilteredChallenges] = useState<Challenge[]>([])
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Levels')
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Fetch challenges from API
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        if (selectedCategory !== 'All Categories') {
          params.append('category', selectedCategory)
        }
        if (selectedDifficulty !== 'All Levels') {
          params.append('difficulty', selectedDifficulty)
        }
        if (debouncedSearchQuery) {
          params.append('search', debouncedSearchQuery)
        }

        const url = `/api/challenges?${params.toString()}`
        const response = await fetch(url)
        const data = await response.json()
        
        if (data.challenges) {
          setChallenges(data.challenges)
          setFilteredChallenges(data.challenges)
        } else {
          // Fallback to static data
          setChallenges(allEasyChallenges)
          setFilteredChallenges(allEasyChallenges)
        }
      } catch (error) {
        console.error('Failed to fetch challenges:', error)
        // Fallback to static data
        setChallenges(allEasyChallenges)
        setFilteredChallenges(allEasyChallenges)
      } finally {
        setLoading(false)
      }
    }

    fetchChallenges()
  }, [selectedCategory, selectedDifficulty, debouncedSearchQuery])

  // Filter challenges based on search and filters - now handled by API
  useEffect(() => {
    setFilteredChallenges(challenges)
  }, [challenges])

  const handleChallengeComplete = (challengeId: string, solution: string) => {
    setCompletedChallenges(prev => new Set([...prev, challengeId]))
    
    // Here you would typically save to backend/database
    console.log('Challenge completed:', challengeId, 'Solution:', solution)
    
    // Go back to challenges list
    setSelectedChallenge(null)
  }

  const handleStartChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge)
  }

  const handleBackToChallenges = () => {
    setSelectedChallenge(null)
  }

  if (selectedChallenge) {
    return (
      <ChallengeInterface
        challenge={selectedChallenge}
        onBack={handleBackToChallenges}
        onComplete={(solution) => handleChallengeComplete(selectedChallenge.id, solution)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-gray-900 mb-2"
            >
              Coding Challenges
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 mb-6"
            >
              Test your skills with hands-on coding challenges. Start small, grow big!
            </motion.p>
            
            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center items-center space-x-8 text-sm text-gray-600"
            >
              <div className="flex items-center space-x-2">
                <Code2 className="w-4 h-4" />
                <span>{filteredChallenges.length} Challenges</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>{completedChallenges.size} Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span>{categories.length - 1} Categories</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm border p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search challenges..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-48">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Difficulty Filter */}
            <div className="lg:w-48">
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Challenges Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="w-3/4 h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-2/3 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex space-x-4">
                      <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredChallenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="h-full cursor-pointer hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{getCategoryIcon(challenge.category)}</span>
                          <div>
                            <Badge 
                              variant="outline" 
                              className={getDifficultyColor(challenge.difficulty)}
                            >
                              {challenge.difficulty}
                            </Badge>
                          </div>
                        </div>
                        {completedChallenges.has(challenge.id) && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                      <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                        {challenge.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600">
                        {challenge.category}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                        {challenge.description.split('\n')[0]}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>15-30 min</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Target className="w-3 h-3" />
                            <span>{(challenge as Challenge & { hints?: number }).hints || challenge.test_cases?.length || 0} tests</span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleStartChallenge(challenge)}
                          className="group-hover:bg-blue-600 transition-colors"
                        >
                          Start
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* No results */}
        {filteredChallenges.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <Code2 className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No challenges found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}