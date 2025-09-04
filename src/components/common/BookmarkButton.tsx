'use client'

import React, { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface BookmarkButtonProps {
  itemId: string
  itemType: 'challenge' | 'lesson' | 'category'
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'ghost' | 'outline'
  className?: string
  onToggle?: (itemId: string, isBookmarked: boolean) => void
}

export function BookmarkButton({
  itemId,
  itemType,
  size = 'md',
  variant = 'ghost',
  className,
  onToggle
}: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Load bookmark status from localStorage on component mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem(`sense_bookmarks_${itemType}`)
    if (savedBookmarks) {
      try {
        const bookmarks = JSON.parse(savedBookmarks)
        setIsBookmarked(bookmarks.includes(itemId))
      } catch (error) {
        console.error('Error loading bookmarks:', error)
      }
    }
  }, [itemId, itemType])

  const toggleBookmark = async () => {
    setIsLoading(true)
    
    try {
      const savedBookmarks = localStorage.getItem(`sense_bookmarks_${itemType}`)
      let bookmarks: string[] = []
      
      if (savedBookmarks) {
        bookmarks = JSON.parse(savedBookmarks)
      }

      const newIsBookmarked = !isBookmarked
      
      if (newIsBookmarked) {
        // Add bookmark
        if (!bookmarks.includes(itemId)) {
          bookmarks.push(itemId)
        }
      } else {
        // Remove bookmark
        bookmarks = bookmarks.filter(id => id !== itemId)
      }

      localStorage.setItem(`sense_bookmarks_${itemType}`, JSON.stringify(bookmarks))
      setIsBookmarked(newIsBookmarked)
      
      // Call optional callback
      onToggle?.(itemId, newIsBookmarked)
      
      // Show feedback (you could replace this with a toast notification)
      if (newIsBookmarked) {
        console.log(`Added ${itemType} to bookmarks`)
      } else {
        console.log(`Removed ${itemType} from bookmarks`)
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const buttonSizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-9 w-9',
    lg: 'h-10 w-10'
  }

  return (
    <Button
      variant={variant}
      size="icon"
      onClick={toggleBookmark}
      disabled={isLoading}
      className={cn(
        buttonSizeClasses[size],
        'transition-all duration-200 hover:scale-105',
        isBookmarked && 'text-red-500 hover:text-red-600',
        className
      )}
      title={isBookmarked ? `Remove ${itemType} from bookmarks` : `Bookmark this ${itemType}`}
    >
      <Heart 
        className={cn(
          sizeClasses[size],
          'transition-all duration-200',
          isBookmarked && 'fill-current'
        )}
      />
    </Button>
  )
}

// Hook to get all bookmarks for a specific type
export function useBookmarks(itemType: 'challenge' | 'lesson' | 'category') {
  const [bookmarks, setBookmarks] = useState<string[]>([])

  useEffect(() => {
    const loadBookmarks = () => {
      const savedBookmarks = localStorage.getItem(`sense_bookmarks_${itemType}`)
      if (savedBookmarks) {
        try {
          setBookmarks(JSON.parse(savedBookmarks))
        } catch (error) {
          console.error('Error loading bookmarks:', error)
          setBookmarks([])
        }
      }
    }

    loadBookmarks()

    // Listen for storage changes (for multi-tab sync)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `sense_bookmarks_${itemType}`) {
        loadBookmarks()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [itemType])

  return bookmarks
}