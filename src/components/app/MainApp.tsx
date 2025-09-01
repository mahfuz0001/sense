"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  User,
  LogOut,
  Settings,
  Shield,
  Play,
  Clock,
  Target,
  Award,
  BookOpen,
  TrendingUp,
  Calendar,
  Star,
  Trophy,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { useUserProgress } from "@/hooks/useUserProgress";
import { useUserProfile } from "@/hooks/useUserProfile";
import { AuthModal } from "@/components/auth/AuthModal";
import { ChallengeInterface } from "@/components/challenge/ChallengeInterface";
import { PricingSection } from "@/components/pricing/PricingSection";
import { LearningPaths } from "@/components/learning/LearningPaths";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";
import type { Challenge } from "@/types";
import { realChallenges, realLearningPaths } from "@/data/realChallenges";

function AppContent() {
  const { user, loading, signOut } = useAuth();
  const {
    progress,
    loading: progressLoading,
    updateProgress,
  } = useUserProgress();
  const { profile, loading: profileLoading } = useUserProfile();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "challenges" | "paths" | "pricing"
  >("dashboard");
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Check if user needs onboarding
  const needsOnboarding = user && profile && !profile.onboarding_completed;

  const handleStartChallenge = (challenge: Challenge) => {
    setCurrentChallenge(challenge);
  };

  const handleChallengeComplete = async (solution: string) => {
    if (currentChallenge) {
      await updateProgress(currentChallenge.id, "completed", solution);
      setCurrentChallenge(null);
    }
  };

  const handleBackToDashboard = () => {
    setCurrentChallenge(null);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  // Show onboarding if needed
  if (needsOnboarding || showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  if (loading || progressLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Navigation Skeleton */}
        <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <Skeleton className="h-6 w-48" />
              </div>
              <div className="flex items-center space-x-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          </div>
        </nav>

        {/* Content Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-64" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-16 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Navigation */}
        <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Anti-Tutorial Hell
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <Button
                  variant="ghost"
                  onClick={() => {
                    setAuthMode("login");
                    setAuthModalOpen(true);
                  }}
                >
                  Sign In
                </Button>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={() => {
                    setAuthMode("signup");
                    setAuthModalOpen(true);
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Auth Section */}
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full"
          >
            <Card>
              <CardHeader className="text-center">
                <CardTitle>Welcome to Anti-Tutorial Hell</CardTitle>
                <CardDescription>
                  Sign in to start solving real coding challenges
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    setAuthMode("login");
                    setAuthModalOpen(true);
                  }}
                >
                  Sign In with Email
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    setAuthMode("signup");
                    setAuthModalOpen(true);
                  }}
                >
                  Create Account
                </Button>
                <p className="text-center text-sm text-gray-500">
                  By continuing, you agree to escape tutorial hell
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Auth Modal */}
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          mode={authMode}
          onToggleMode={() =>
            setAuthMode(authMode === "login" ? "signup" : "login")
          }
        />
      </div>
    );
  }

  // Use real challenges from the database instead of combining mock + real
  const challenges = realChallenges;

  // Use real user progress data instead of random mock data
  const completedChallenges = progress?.completedCount || 0;
  const totalChallenges = challenges.length;
  const progressPercentage =
    totalChallenges > 0 ? (completedChallenges / totalChallenges) * 100 : 0;
  const streak = progress?.streak || 0;
  const totalPoints = progress?.totalPoints || 0;

  const categories = [
    "all",
    ...Array.from(new Set(challenges.map((c) => c.category))),
  ];
  // Map challenge status from user progress
  const challengeStatusMap: Record<
    string,
    "completed" | "in_progress" | "not_started"
  > = {};
  if (progress?.challenges) {
    for (const c of progress.challenges) {
      challengeStatusMap[c.id] = c.status;
    }
  }

  const filteredChallenges = challenges
    .map((challenge) => ({
      ...challenge,
      status: challengeStatusMap[challenge.id] || "not_started",
    }))
    .filter((challenge) => {
      const matchesCategory =
        selectedCategory === "all" || challenge.category === selectedCategory;
      const matchesSearch =
        challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

  const achievements = [
    {
      name: "First Steps",
      description: "Complete your first challenge",
      earned: completedChallenges > 0,
      icon: "🎯",
    },
    {
      name: "Getting Serious",
      description: "Complete 5 challenges",
      earned: completedChallenges >= 5,
      icon: "🚀",
    },
    {
      name: "Problem Solver",
      description: "Complete 10 challenges",
      earned: completedChallenges >= 10,
      icon: "🧠",
    },
    {
      name: "Week Warrior",
      description: "Maintain a 7-day streak",
      earned: streak >= 7,
      icon: "🔥",
    },
    {
      name: "Code Master",
      description: "Complete all challenges",
      earned: completedChallenges === totalChallenges,
      icon: "👑",
    },
  ];

  return (
    <>
      {currentChallenge ? (
        <ChallengeInterface
          challenge={currentChallenge}
          onBack={handleBackToDashboard}
          onComplete={handleChallengeComplete}
        />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
          {/* Navigation */}
          <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-3"
                >
                  <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg">
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Anti-Tutorial Hell
                  </span>
                </motion.div>

                <div className="flex items-center space-x-4">
                  <Badge
                    variant="secondary"
                    className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 px-3 py-1"
                  >
                    <Trophy className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                      {totalPoints} points
                    </span>
                  </Badge>

                  <Link href="/admin">
                    <Button variant="ghost" size="icon">
                      <Shield className="w-5 h-5" />
                    </Button>
                  </Link>

                  <ThemeToggle />

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Avatar className="w-8 h-8">
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
                          />
                          <AvatarFallback>
                            {user?.email?.substring(0, 2).toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium">Welcome back!</p>
                          <p className="text-xs text-muted-foreground">
                            {user?.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trophy className="mr-2 h-4 w-4" />
                        <span>Achievements</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={signOut}
                        className="text-red-600 dark:text-red-400"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Navigation Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg max-w-md">
                {[
                  { id: "dashboard", label: "Dashboard", icon: Target },
                  { id: "challenges", label: "Challenges", icon: Play },
                  { id: "paths", label: "Learning Paths", icon: BookOpen },
                  { id: "pricing", label: "Upgrade", icon: Star },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() =>
                      setActiveTab(
                        id as "dashboard" | "challenges" | "paths" | "pricing"
                      )
                    }
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      activeTab === id
                        ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Dashboard Tab */}
            {activeTab === "dashboard" && (
              <>
                {/* Welcome Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        Welcome back! 🚀
                      </h1>
                      <p className="text-gray-600 text-lg">
                        Ready to escape tutorial hell,{" "}
                        {user.email?.split("@")[0]}?
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center space-x-2 bg-orange-100 px-4 py-2 rounded-full">
                      <span className="text-2xl">🔥</span>
                      <span className="font-semibold text-orange-800">
                        {streak} day streak!
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Stats Dashboard */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                >
                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold text-blue-900">
                            {completedChallenges}
                          </div>
                          <div className="text-sm text-blue-700">
                            Challenges Solved
                          </div>
                        </div>
                        <div className="p-3 bg-blue-200 rounded-full">
                          <CheckCircle className="w-6 h-6 text-blue-700" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold text-green-900">
                            {Math.floor(progressPercentage)}%
                          </div>
                          <div className="text-sm text-green-700">
                            Overall Progress
                          </div>
                        </div>
                        <div className="p-3 bg-green-200 rounded-full">
                          <TrendingUp className="w-6 h-6 text-green-700" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold text-purple-900">
                            {totalPoints}
                          </div>
                          <div className="text-sm text-purple-700">
                            Total Points
                          </div>
                        </div>
                        <div className="p-3 bg-purple-200 rounded-full">
                          <Star className="w-6 h-6 text-purple-700" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold text-orange-900">
                            {streak}
                          </div>
                          <div className="text-sm text-orange-700">
                            Day Streak
                          </div>
                        </div>
                        <div className="p-3 bg-orange-200 rounded-full">
                          <Calendar className="w-6 h-6 text-orange-700" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Progress and Achievements */}
                <div className="grid lg:grid-cols-3 gap-8 mb-8">
                  {/* Progress Chart */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2"
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Target className="w-5 h-5 text-blue-600" />
                          <span>Your Progress</span>
                        </CardTitle>
                        <CardDescription>
                          Track your learning journey
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              Overall Progress
                            </span>
                            <span className="text-sm text-gray-500">
                              {completedChallenges} of {totalChallenges}{" "}
                              completed
                            </span>
                          </div>
                          <Progress
                            value={progressPercentage}
                            className="h-3"
                          />
                          <div className="grid grid-cols-3 gap-4 text-center text-sm">
                            <div>
                              <div className="font-semibold text-green-600">
                                {progress?.challenges?.filter(
                                  (c) => c.status === "completed"
                                ).length ?? 0}
                              </div>
                              <div className="text-gray-500">Completed</div>
                            </div>
                            <div>
                              <div className="font-semibold text-yellow-600">
                                {progress?.challenges?.filter(
                                  (c) => c.status === "in_progress"
                                ).length ?? 0}
                              </div>
                              <div className="text-gray-500">In Progress</div>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-600">
                                {progress?.challenges?.filter(
                                  (c) => c.status === "not_started"
                                ).length ?? 0}
                              </div>
                              <div className="text-gray-500">Not Started</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Achievements */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Award className="w-5 h-5 text-yellow-600" />
                          <span>Achievements</span>
                        </CardTitle>
                        <CardDescription>
                          Your coding milestones
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {achievements.map((achievement, index) => (
                            <div
                              key={index}
                              className={`flex items-center space-x-3 p-3 rounded-lg ${
                                achievement.earned
                                  ? "bg-yellow-50 border border-yellow-200"
                                  : "bg-gray-50"
                              }`}
                            >
                              <span className="text-2xl">
                                {achievement.icon}
                              </span>
                              <div className="flex-1">
                                <div
                                  className={`font-medium ${
                                    achievement.earned
                                      ? "text-yellow-800"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {achievement.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {achievement.description}
                                </div>
                              </div>
                              {achievement.earned && (
                                <CheckCircle className="w-5 h-5 text-yellow-600" />
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Challenge Browser */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
                      Challenge Library
                    </h2>
                    <div className="flex space-x-4">
                      <input
                        type="text"
                        placeholder="Search challenges..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category === "all" ? "All Categories" : category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                      {filteredChallenges.map((challenge, index) => (
                        <motion.div
                          key={challenge.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ y: -5 }}
                          className="group"
                        >
                          <Card className="hover:shadow-xl transition-all duration-300 h-full border-l-4 border-l-blue-500 cursor-pointer">
                            <CardHeader>
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                                    {challenge.title}
                                  </CardTitle>
                                  <CardDescription className="mt-2 line-clamp-2">
                                    {challenge.description.split(".")[0]}...
                                  </CardDescription>
                                </div>
                                <Badge
                                  variant={
                                    challenge.difficulty === "beginner"
                                      ? "secondary"
                                      : challenge.difficulty === "intermediate"
                                      ? "default"
                                      : "destructive"
                                  }
                                  className="ml-2"
                                >
                                  {challenge.difficulty}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <Badge variant="outline" className="text-xs">
                                    {challenge.category}
                                  </Badge>
                                  <div className="flex items-center space-x-1">
                                    {challenge.status === "completed" && (
                                      <CheckCircle className="w-4 h-4 text-green-500" />
                                    )}
                                    {challenge.status === "in_progress" && (
                                      <Clock className="w-4 h-4 text-yellow-500" />
                                    )}
                                    {challenge.status === "not_started" && (
                                      <Play className="w-4 h-4 text-gray-400" />
                                    )}
                                    <Badge
                                      variant={
                                        challenge.status === "completed"
                                          ? "default"
                                          : challenge.status === "in_progress"
                                          ? "secondary"
                                          : "outline"
                                      }
                                      className="text-xs"
                                    >
                                      {challenge.status === "completed"
                                        ? "Completed"
                                        : challenge.status === "in_progress"
                                        ? "In Progress"
                                        : "Not Started"}
                                    </Badge>
                                  </div>
                                </div>
                                <Button
                                  className="w-full group-hover:bg-blue-600 transition-colors"
                                  onClick={() =>
                                    handleStartChallenge(challenge)
                                  }
                                >
                                  {challenge.status === "completed" ? (
                                    <>
                                      <Trophy className="w-4 h-4 mr-2" />
                                      Review Solution
                                    </>
                                  ) : challenge.status === "in_progress" ? (
                                    <>
                                      <ArrowRight className="w-4 h-4 mr-2" />
                                      Continue Challenge
                                    </>
                                  ) : (
                                    <>
                                      <Play className="w-4 h-4 mr-2" />
                                      Start Challenge
                                    </>
                                  )}
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {filteredChallenges.length === 0 && (
                    <div className="text-center py-12">
                      <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No challenges found
                      </h3>
                      <p className="text-gray-500">
                        Try adjusting your search or filter criteria.
                      </p>
                    </div>
                  )}
                </motion.div>
              </>
            )}

            {/* Challenges Tab */}
            {activeTab === "challenges" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Coding Challenges
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Real-world problems that build actual development skills. No
                    tutorials, just challenges.
                  </p>

                  {/* Search and Filter */}
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Search challenges..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-3 border rounded-lg"
                      />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant={
                            selectedCategory === category
                              ? "default"
                              : "outline"
                          }
                          onClick={() => setSelectedCategory(category)}
                          className="capitalize"
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Challenges Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                      {filteredChallenges.map((challenge, index) => (
                        <motion.div
                          key={challenge.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                            <CardHeader>
                              <div className="flex items-start justify-between mb-2">
                                <Badge
                                  className={`${
                                    challenge.difficulty === "beginner"
                                      ? "bg-green-100 text-green-800"
                                      : challenge.difficulty === "intermediate"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {challenge.difficulty}
                                </Badge>
                                <Badge
                                  variant={
                                    challenge.status === "completed"
                                      ? "default"
                                      : "secondary"
                                  }
                                >
                                  {challenge.status === "completed"
                                    ? "Solved"
                                    : challenge.status === "in_progress"
                                    ? "In Progress"
                                    : "New"}
                                </Badge>
                              </div>
                              <CardTitle className="text-lg">
                                {challenge.title}
                              </CardTitle>
                              <CardDescription className="text-sm line-clamp-3">
                                {challenge.description.split("\n")[0]}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="flex items-center justify-between text-sm text-gray-600">
                                <span>{challenge.category}</span>
                                <span>
                                  {challenge.hints.length} hints available
                                </span>
                              </div>
                              <Button
                                className="w-full"
                                onClick={() => handleStartChallenge(challenge)}
                                variant={
                                  challenge.status === "completed"
                                    ? "outline"
                                    : "default"
                                }
                              >
                                {challenge.status === "completed" ? (
                                  <>
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Review Solution
                                  </>
                                ) : challenge.status === "in_progress" ? (
                                  <>
                                    <Clock className="w-4 h-4 mr-2" />
                                    Continue Challenge
                                  </>
                                ) : (
                                  <>
                                    <Play className="w-4 h-4 mr-2" />
                                    Start Challenge
                                  </>
                                )}
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {filteredChallenges.length === 0 && (
                    <div className="text-center py-12">
                      <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No challenges found
                      </h3>
                      <p className="text-gray-500">
                        Try adjusting your search or filter criteria.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Learning Paths Tab */}
            {activeTab === "paths" && (
              <LearningPaths
                paths={realLearningPaths}
                onSelectPath={(pathId) => {
                  // Find first challenge in path and start it
                  const path = realLearningPaths.find((p) => p.id === pathId);
                  if (path && path.challenges.length > 0) {
                    const firstChallenge = challenges.find(
                      (c) => c.id === path.challenges[0]
                    );
                    if (firstChallenge) {
                      handleStartChallenge(firstChallenge);
                    }
                  }
                }}
                userProgress={{
                  "react-mastery": Math.random() * 60,
                  "production-ready-apis": Math.random() * 40,
                  "performance-engineering": Math.random() * 20,
                }}
              />
            )}

            {/* Pricing Tab */}
            {activeTab === "pricing" && (
              <PricingSection
                onSelectPlan={(planId) => {
                  if (planId === "free") {
                    setActiveTab("challenges");
                  } else {
                    // In a real app, this would integrate with Stripe or similar
                    alert(
                      `Selected ${planId} plan! Payment integration would be implemented here.`
                    );
                  }
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export function MainApp() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
