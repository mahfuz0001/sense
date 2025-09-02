"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface Feature {
  step: string
  title?: string
  content: string
  image: string
}

interface FeatureStepsProps {
  features: Feature[]
  className?: string
  title?: string
  autoPlayInterval?: number
}

export const FeatureSteps = React.memo(({
  features,
  className,
  title = "How to get Started",
  autoPlayInterval = 3000,
}: FeatureStepsProps) => {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const goToNext = useCallback(() => {
    setCurrentFeature((prev) => (prev + 1) % features.length)
    setProgress(0)
  }, [features.length])

  const goToPrevious = useCallback(() => {
    setCurrentFeature((prev) => (prev - 1 + features.length) % features.length)
    setProgress(0)
  }, [features.length])

  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 100))
      } else {
        goToNext()
      }
    }, 100)

    return () => clearInterval(timer)
  }, [progress, autoPlayInterval, isPaused, goToNext])

  return (
    <div 
      className={cn("p-8 md:p-12", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.h2 
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10">
          <div className="order-2 md:order-1 space-y-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={cn(
                  "flex items-center gap-6 md:gap-8 cursor-pointer rounded-lg p-4 transition-all duration-300",
                  index === currentFeature 
                    ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 shadow-lg" 
                    : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                )}
                initial={{ opacity: 0.3 }}
                animate={{ opacity: index === currentFeature ? 1 : 0.3 }}
                transition={{ duration: 0.5 }}
                onClick={() => {
                  setCurrentFeature(index)
                  setProgress(0)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setCurrentFeature(index)
                    setProgress(0)
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Go to step ${index + 1}: ${feature.title || feature.step}`}
              >
                <motion.div
                  className={cn(
                    "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    index === currentFeature
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 border-blue-500 text-white scale-110 shadow-lg"
                      : index < currentFeature
                      ? "bg-green-500 border-green-500 text-white"
                      : "bg-muted border-muted-foreground hover:border-blue-300",
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {index < currentFeature ? (
                    <motion.span 
                      className="text-lg font-bold"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      ✓
                    </motion.span>
                  ) : (
                    <span className="text-lg font-semibold">{index + 1}</span>
                  )}
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-semibold">
                    {feature.title || feature.step}
                  </h3>
                  <p className="text-sm md:text-lg text-muted-foreground">
                    {feature.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div
            className={cn(
              "order-1 md:order-2 relative h-[200px] md:h-[300px] lg:h-[400px] overflow-hidden rounded-xl shadow-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20"
            )}
          >
            {/* Navigation Controls */}
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <button
                onClick={goToPrevious}
                className="p-2 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-sm hover:bg-white dark:hover:bg-black transition-all shadow-lg"
                aria-label="Previous feature"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="p-2 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-sm hover:bg-white dark:hover:bg-black transition-all shadow-lg"
                aria-label="Next feature"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Progress Bar */}
            <div className="absolute top-4 left-4 right-20 z-10">
              <div className="h-1 bg-white/30 dark:bg-black/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      className="absolute inset-0 rounded-xl overflow-hidden"
                      initial={{ scale: 1.1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                    >
                      <Image
                        src={feature.image}
                        alt={feature.title || feature.step}
                        className="w-full h-full object-cover"
                        width={1000}
                        height={500}
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                      
                      {/* Feature overlay */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <motion.div
                          className="bg-white/95 dark:bg-black/95 backdrop-blur-sm rounded-lg p-4"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                        >
                          <h4 className="font-semibold text-lg mb-2">{feature.title || feature.step}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{feature.content}</p>
                        </motion.div>
                      </div>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
})

FeatureSteps.displayName = 'FeatureSteps'
