'use client'

import React from 'react'
import { Search, Filter, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'

interface SearchAndFilterProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedDifficulty: string
  onDifficultyChange: (difficulty: string) => void
  selectedCategory?: string
  onCategoryChange?: (category: string) => void
  categories?: Array<{ id: string; title: string }>
  className?: string
}

export function SearchAndFilter({
  searchQuery,
  onSearchChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedCategory,
  onCategoryChange,
  categories,
  className = ""
}: SearchAndFilterProps) {
  const difficulties = [
    { value: 'all', label: 'All Levels' },
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' }
  ]

  const hasActiveFilters = selectedDifficulty !== 'all' || (selectedCategory && selectedCategory !== 'all') || searchQuery.length > 0

  const clearFilters = () => {
    onSearchChange('')
    onDifficultyChange('all')
    if (onCategoryChange) {
      onCategoryChange('all')
    }
  }

  return (
    <div className={`flex flex-col sm:flex-row gap-4 items-start sm:items-center ${className}`}>
      {/* Search Input */}
      <div className="relative flex-1 min-w-0">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search lessons..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-2 items-center">
        {/* Difficulty Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              {selectedDifficulty === 'all' ? 'Difficulty' : selectedDifficulty}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Difficulty Level</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {difficulties.map((difficulty) => (
              <DropdownMenuItem
                key={difficulty.value}
                onClick={() => onDifficultyChange(difficulty.value)}
                className={selectedDifficulty === difficulty.value ? 'bg-accent' : ''}
              >
                {difficulty.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Category Filter (if categories provided) */}
        {categories && onCategoryChange && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" />
                {selectedCategory === 'all' || !selectedCategory ? 'Category' : categories.find(c => c.id === selectedCategory)?.title}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onCategoryChange('all')}
                className={(!selectedCategory || selectedCategory === 'all') ? 'bg-accent' : ''}
              >
                All Categories
              </DropdownMenuItem>
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category.id}
                  onClick={() => onCategoryChange(category.id)}
                  className={selectedCategory === category.id ? 'bg-accent' : ''}
                >
                  {category.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="gap-2 text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4" />
            Clear
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 items-center">
          {searchQuery && (
            <Badge variant="secondary" className="gap-1">
              Search: {searchQuery}
              <button onClick={() => onSearchChange('')} className="ml-1">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {selectedDifficulty !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              {selectedDifficulty}
              <button onClick={() => onDifficultyChange('all')} className="ml-1">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {selectedCategory && selectedCategory !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              {categories?.find(c => c.id === selectedCategory)?.title}
              <button onClick={() => onCategoryChange?.('all')} className="ml-1">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}