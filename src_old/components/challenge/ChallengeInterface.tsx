import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import type { Challenge } from '../../types';
import { CodeEditor } from '../editor/CodeEditor';
import { DifficultyBadge } from '../common/DifficultyBadge';
import { CategoryBadge } from '../common/CategoryBadge';

interface ChallengeInterfaceProps {
  challenge: Challenge;
  onBack: () => void;
}

export function ChallengeInterface({ challenge, onBack }: ChallengeInterfaceProps) {
  const [currentCode, setCurrentCode] = useState(challenge.starting_code);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    // Load saved progress if available
    // In a real app, this would fetch from Supabase
    const savedProgress = localStorage.getItem(`challenge_${challenge.id}_progress`);
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCurrentCode(progress.current_code || challenge.starting_code);
      setAttempts(progress.attempts || 0);
    }
  }, [challenge]);

  const handleCodeChange = (code: string) => {
    setCurrentCode(code);
    
    // Auto-save progress
    const progress = {
      challenge_id: challenge.id,
      current_code: code,
      attempts,
      last_updated: new Date().toISOString(),
    };
    localStorage.setItem(`challenge_${challenge.id}_progress`, JSON.stringify(progress));
  };

  const handleProgressUpdate = () => {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    
    // Update progress with completion
    const progress = {
      challenge_id: challenge.id,
      current_code: currentCode,
      attempts: newAttempts,
      completed: true,
      completed_at: new Date().toISOString(),
    };
    localStorage.setItem(`challenge_${challenge.id}_progress`, JSON.stringify(progress));
  };

  const formatDescription = (description: string) => {
    // Convert markdown-like formatting to JSX
    const lines = description.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <h4 key={index} className="font-semibold text-gray-900 mt-4 mb-2">
            {line.slice(2, -2)}
          </h4>
        );
      }
      if (line.startsWith('- ')) {
        return (
          <li key={index} className="ml-4 text-gray-700">
            {line.slice(2)}
          </li>
        );
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return (
        <p key={index} className="text-gray-700 mb-2">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="btn-outline flex items-center space-x-2"
          >
            <ArrowLeft size={16} />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-semibold text-gray-900">{challenge.title}</h1>
            <DifficultyBadge difficulty={challenge.difficulty} size="sm" />
            <CategoryBadge category={challenge.category} size="sm" />
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          {attempts > 0 && (
            <span>{attempts} attempt{attempts !== 1 ? 's' : ''}</span>
          )}
          <span>{challenge.test_cases.length} tests</span>
        </div>
      </div>

      {/* Main Content - Split Screen */}
      <div className="flex-1 flex">
        {/* Left Panel - Challenge Description */}
        <div className="w-1/2 border-r border-gray-200 flex flex-col">
          <div className="p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="prose max-w-none"
            >
              {/* Challenge Description */}
              <div className="mb-6">
                {formatDescription(challenge.description)}
              </div>

              {/* Test Cases */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Test Cases</h3>
                <div className="space-y-3">
                  {challenge.test_cases.map((testCase, index) => (
                    <div
                      key={testCase.id}
                      className="bg-white p-3 rounded border border-gray-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-sm">
                            Test {index + 1}: {testCase.description}
                          </p>
                          <p className="text-gray-600 text-xs mt-1">
                            Expected: {testCase.expected_output}
                          </p>
                        </div>
                        {testCase.hidden && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            Hidden
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Anti-Tutorial Reminder */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-primary-700 mb-2">
                  🚫 No Tutorial Hell Zone
                </h4>
                <p className="text-primary-600 text-sm">
                  This challenge doesn't provide step-by-step instructions. You'll need to:
                </p>
                <ul className="text-primary-600 text-sm mt-2 ml-4 space-y-1">
                  <li>• Research the technologies and concepts</li>
                  <li>• Read official documentation</li>
                  <li>• Experiment with different approaches</li>
                  <li>• Learn from your mistakes</li>
                </ul>
                <p className="text-primary-700 text-sm mt-3 font-medium">
                  This is how real developers solve problems!
                </p>
              </div>

              {/* Useful Resources */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-700 mb-2 flex items-center">
                  <ExternalLink size={16} className="mr-2" />
                  Useful Resources
                </h4>
                <div className="space-y-2 text-sm">
                  {challenge.category.includes('CSS') && (
                    <>
                      <a 
                        href="https://developer.mozilla.org/en-US/docs/Web/CSS" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-blue-600 hover:text-blue-800"
                      >
                        MDN CSS Documentation
                      </a>
                      <a 
                        href="https://css-tricks.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-blue-600 hover:text-blue-800"
                      >
                        CSS-Tricks
                      </a>
                    </>
                  )}
                  {challenge.category.includes('TypeScript') && (
                    <>
                      <a 
                        href="https://www.typescriptlang.org/docs/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-blue-600 hover:text-blue-800"
                      >
                        TypeScript Documentation
                      </a>
                      <a 
                        href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-blue-600 hover:text-blue-800"
                      >
                        MDN JavaScript Documentation
                      </a>
                    </>
                  )}
                  {challenge.category.includes('React') && (
                    <>
                      <a 
                        href="https://react.dev/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-blue-600 hover:text-blue-800"
                      >
                        React Documentation
                      </a>
                      <a 
                        href="https://react.dev/reference/react" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-blue-600 hover:text-blue-800"
                      >
                        React API Reference
                      </a>
                    </>
                  )}
                  {challenge.category.includes('API') && (
                    <>
                      <a 
                        href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-blue-600 hover:text-blue-800"
                      >
                        Fetch API Documentation
                      </a>
                      <a 
                        href="https://javascript.info/async-await" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-blue-600 hover:text-blue-800"
                      >
                        Async/Await Guide
                      </a>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-1/2 flex flex-col"
        >
          <CodeEditor
            challenge={challenge}
            onCodeChange={handleCodeChange}
            onProgressUpdate={handleProgressUpdate}
          />
        </motion.div>
      </div>
    </div>
  );
}