import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, User, Code2 } from 'lucide-react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { AuthModal } from './components/auth/AuthModal';
import { Dashboard } from './components/dashboard/Dashboard';
import { ChallengeInterface } from './components/challenge/ChallengeInterface';
import type { Challenge } from './types';

function AppContent() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  
  const { user, loading, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setSelectedChallenge(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Anti-Tutorial Hell...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="p-2 bg-primary rounded-lg">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Anti-Tutorial Hell</h1>
                <p className="text-xs text-gray-600">Learn by Doing, Not Following</p>
              </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">{user.email}</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="btn-outline flex items-center space-x-2"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      setAuthMode('login');
                      setAuthModalOpen(true);
                    }}
                    className="btn-outline"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setAuthMode('signup');
                      setAuthModalOpen(true);
                    }}
                    className="btn-primary"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <AnimatePresence mode="wait">
          {selectedChallenge ? (
            <motion.div
              key="challenge"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ChallengeInterface
                challenge={selectedChallenge}
                onBack={() => setSelectedChallenge(null)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {user ? (
                <Dashboard onChallengeSelect={setSelectedChallenge} />
              ) : (
                <LandingPage onGetStarted={() => {
                  setAuthMode('signup');
                  setAuthModalOpen(true);
                }} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#ffffff',
            color: '#1f2937',
            border: '1px solid #e5e7eb',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.08)',
          },
        }}
      />
    </div>
  );
}

function LandingPage({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Hero */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-gray-900">
            Escape <span className="text-primary">Tutorial Hell</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stop following step-by-step tutorials. Start solving real problems. 
            Build the confidence to tackle any coding challenge independently.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 py-12">
          <div className="card p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Code2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Real Problems</h3>
            <p className="text-gray-600 text-sm">
              Face challenges that mirror actual development work. No artificial examples.
            </p>
          </div>
          
          <div className="card p-6">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <User className="w-6 h-6 text-success" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Independent Learning</h3>
            <p className="text-gray-600 text-sm">
              Research, experiment, and solve problems yourself. Build genuine confidence.
            </p>
          </div>
          
          <div className="card p-6">
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <LogOut className="w-6 h-6 text-warning" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Hand-Holding</h3>
            <p className="text-gray-600 text-sm">
              Minimal guidance forces you to think critically and develop problem-solving skills.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-4">
          <button onClick={onGetStarted} className="btn-primary text-lg px-8 py-4">
            Start Building Real Skills
          </button>
          <p className="text-sm text-gray-500">
            Join developers who learn by doing, not by following tutorials.
          </p>
        </div>

        {/* Philosophy */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Philosophy</h2>
          <div className="text-left space-y-4 max-w-2xl mx-auto">
            <p className="text-gray-700">
              <strong>Traditional tutorials create passive learners.</strong> You follow steps, 
              copy code, and feel like you understand—until you face a real problem alone.
            </p>
            <p className="text-gray-700">
              <strong>Our challenges force active learning.</strong> You'll struggle, research, 
              experiment, and eventually solve problems independently.
            </p>
            <p className="text-primary font-semibold">
              This struggle is not a bug—it's the feature that builds genuine developer confidence.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;