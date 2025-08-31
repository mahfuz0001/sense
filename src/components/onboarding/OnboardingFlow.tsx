'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useUserProfile } from '@/hooks/useUserProfile';
import { OnboardingData } from '@/types';
import { CheckCircle, ArrowRight, ArrowLeft, User, BookOpen, Target } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const CATEGORIES = [
  'React',
  'TypeScript',
  'CSS & Layout',
  'JavaScript Basics',
  'API Integration',
  'Performance',
  'Testing',
  'Node.js',
  'Database',
  'DevOps'
];

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const { updateProfile } = useUserProfile();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<OnboardingData>({
    display_name: '',
    experience_level: 'beginner',
    preferred_categories: [],
  });

  const steps = [
    {
      id: 'welcome',
      title: 'Welcome to Anti-Tutorial Hell!',
      description: 'Let\'s get you set up for success',
      icon: <CheckCircle className="w-8 h-8 text-green-500" />,
    },
    {
      id: 'profile',
      title: 'Tell us about yourself',
      description: 'This helps us personalize your experience',
      icon: <User className="w-8 h-8 text-blue-500" />,
    },
    {
      id: 'experience',
      title: 'What\'s your experience level?',
      description: 'We\'ll recommend the right challenges for you',
      icon: <Target className="w-8 h-8 text-purple-500" />,
    },
    {
      id: 'interests',
      title: 'What are you interested in?',
      description: 'Choose the technologies you want to master',
      icon: <BookOpen className="w-8 h-8 text-orange-500" />,
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    try {
      await updateProfile({
        display_name: formData.display_name,
        experience_level: formData.experience_level,
        preferred_categories: formData.preferred_categories,
        onboarding_completed: true,
        onboarding_step: steps.length,
      });
      onComplete();
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
    }
  };

  const toggleCategory = (category: string) => {
    setFormData(prev => ({
      ...prev,
      preferred_categories: prev.preferred_categories.includes(category)
        ? prev.preferred_categories.filter(c => c !== category)
        : [...prev.preferred_categories, category]
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return true; // Welcome step
      case 1: return formData.display_name.trim().length > 0;
      case 2: return true; // Experience level has default
      case 3: return formData.preferred_categories.length > 0;
      default: return false;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl"
      >
        <Card className="border-2">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {steps[currentStep].icon}
            </div>
            <CardTitle className="text-2xl">{steps[currentStep].title}</CardTitle>
            <CardDescription className="text-lg">
              {steps[currentStep].description}
            </CardDescription>
            
            {/* Progress indicator */}
            <div className="flex justify-center mt-6">
              <div className="flex space-x-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {currentStep === 0 && (
                  <div className="text-center space-y-4">
                    <p className="text-gray-600 dark:text-gray-300">
                      You're about to embark on a journey to escape tutorial hell and build real skills through hands-on challenges.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      No more following along - just real problems that will make you think and grow as a developer.
                    </p>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="display_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        What should we call you?
                      </label>
                      <Input
                        id="display_name"
                        value={formData.display_name}
                        onChange={(e) => setFormData(prev => ({ ...prev, display_name: e.target.value }))}
                        placeholder="Enter your display name"
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      This helps us recommend challenges at the right difficulty level for you.
                    </p>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { value: 'beginner', label: 'Beginner', description: 'New to programming or web development' },
                        { value: 'intermediate', label: 'Intermediate', description: 'Comfortable with basics, ready for real challenges' },
                        { value: 'advanced', label: 'Advanced', description: 'Experienced developer looking to master new skills' }
                      ].map((level) => (
                        <button
                          key={level.value}
                          onClick={() => setFormData(prev => ({ 
                            ...prev, 
                            experience_level: level.value as 'beginner' | 'intermediate' | 'advanced' 
                          }))}
                          className={`p-4 rounded-lg border-2 text-left transition-colors ${
                            formData.experience_level === level.value
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="font-medium">{level.label}</div>
                          <div className="text-sm text-gray-500">{level.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-4">
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Select the technologies you're most interested in learning. You can always change this later.
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {CATEGORIES.map((category) => (
                        <button
                          key={category}
                          onClick={() => toggleCategory(category)}
                          className="text-left"
                        >
                          <Badge
                            variant={formData.preferred_categories.includes(category) ? "default" : "outline"}
                            className="w-full justify-center py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            {category}
                          </Badge>
                        </button>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Selected: {formData.preferred_categories.length} categories
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {currentStep === steps.length - 1 ? 'Complete Setup' : 'Next'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}