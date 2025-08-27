import { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, HelpCircle, Loader2 } from 'lucide-react';
import type { Challenge, CodeExecutionResult, HintResponse } from '../../types';
import { CodeExecutor } from '../../lib/codeExecutor';
import { HintSystem } from '../../lib/hints';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

interface CodeEditorProps {
  challenge: Challenge;
  onCodeChange: (code: string) => void;
  onProgressUpdate: () => void;
}

export function CodeEditor({ challenge, onCodeChange, onProgressUpdate }: CodeEditorProps) {
  const editorRef = useRef<any>(null);
  const [code, setCode] = useState(challenge.starting_code);
  const [isRunning, setIsRunning] = useState(false);
  const [isGettingHint, setIsGettingHint] = useState(false);
  const [executionResult, setExecutionResult] = useState<CodeExecutionResult | null>(null);
  const [currentHint, setCurrentHint] = useState<HintResponse | null>(null);
  
  const { user } = useAuth();

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    
    // Configure Monaco editor theme and options
    monaco.editor.defineTheme('antiTutorial', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#1f2937',
        'editorLineNumber.foreground': '#9ca3af',
        'editorLineNumber.activeForeground': '#374151',
        'editor.selectionBackground': '#dbeafe',
        'editor.inactiveSelectionBackground': '#f3f4f6',
      },
    });
    
    editor.updateOptions({
      theme: 'antiTutorial',
      fontSize: 14,
      lineHeight: 1.6,
      fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace',
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      padding: { top: 16, bottom: 16 },
      lineNumbers: 'on',
      roundedSelection: false,
      automaticLayout: true,
    });
  };

  const handleCodeChange = (value: string | undefined) => {
    const newCode = value || '';
    setCode(newCode);
    onCodeChange(newCode);
    
    // Auto-save logic could go here
    // For now, we'll just update the parent component
  };

  const runCode = async () => {
    if (!code.trim()) {
      toast.error('Please write some code before running!');
      return;
    }

    setIsRunning(true);
    setExecutionResult(null);

    try {
      const result = await CodeExecutor.executeCode(code, challenge);
      setExecutionResult(result);
      
      if (result.success) {
        toast.success('All tests passed! 🎉');
        onProgressUpdate();
      } else if (result.errors.length > 0) {
        toast.error('Code has errors. Check the output panel.');
      } else {
        toast.error('Some tests failed. Keep working!');
      }
    } catch (error) {
      toast.error('Failed to execute code. Please try again.');
      console.error('Code execution error:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    const confirmReset = window.confirm(
      'Are you sure you want to reset your code? This will lose all your current progress.'
    );
    
    if (confirmReset) {
      setCode(challenge.starting_code);
      setExecutionResult(null);
      setCurrentHint(null);
      onCodeChange(challenge.starting_code);
      toast.success('Code reset to starting template');
    }
  };

  const getHint = async () => {
    if (!user) {
      toast.error('Please sign in to get hints');
      return;
    }

    setIsGettingHint(true);
    
    try {
      const hint = await HintSystem.getHint({
        challenge_id: challenge.id,
        current_code: code,
        user_id: user.id,
      });
      
      setCurrentHint(hint);
      toast.success('Hint received! Check below the editor.');
    } catch (error) {
      toast.error('Failed to get hint. Please try again.');
      console.error('Hint error:', error);
    } finally {
      setIsGettingHint(false);
    }
  };

  const getLanguageForChallenge = (category: string): string => {
    if (category.toLowerCase().includes('css')) return 'css';
    if (category.toLowerCase().includes('typescript')) return 'typescript';
    if (category.toLowerCase().includes('react')) return 'typescript';
    return 'javascript';
  };

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-2">
          <button
            onClick={runCode}
            disabled={isRunning}
            className="btn-primary flex items-center space-x-2 disabled:opacity-50"
          >
            {isRunning ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Play size={16} />
            )}
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
          </button>
          
          <button
            onClick={resetCode}
            className="btn-outline flex items-center space-x-2"
          >
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>
          
          <button
            onClick={getHint}
            disabled={isGettingHint}
            className="btn-secondary flex items-center space-x-2 disabled:opacity-50"
          >
            {isGettingHint ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <HelpCircle size={16} />
            )}
            <span>{isGettingHint ? 'Getting Hint...' : 'Get Hint'}</span>
          </button>
        </div>
        
        <div className="text-sm text-gray-600">
          Language: {getLanguageForChallenge(challenge.category)}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          language={getLanguageForChallenge(challenge.category)}
          value={code}
          onChange={handleCodeChange}
          onMount={handleEditorDidMount}
          options={{
            wordWrap: 'on',
            lineNumbers: 'on',
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>

      {/* Output Panel */}
      {(executionResult || currentHint) && (
        <div className="border-t border-gray-200 bg-gray-50">
          {/* Execution Results */}
          {executionResult && (
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Execution Results</h3>
              
              {executionResult.success ? (
                <div className="p-3 bg-success/10 border border-success/20 rounded-lg mb-3">
                  <p className="text-success-700 font-medium">✅ All tests passed!</p>
                  <p className="text-success-600 text-sm mt-1">{executionResult.output}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {executionResult.errors.length > 0 && (
                    <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
                      <p className="text-error-700 font-medium">❌ Errors:</p>
                      {executionResult.errors.map((error, index) => (
                        <p key={index} className="text-error-600 text-sm mt-1 font-mono">
                          {error}
                        </p>
                      ))}
                    </div>
                  )}
                  
                  {executionResult.test_results.length > 0 && (
                    <div className="space-y-2">
                      <p className="font-medium text-gray-700">Test Results:</p>
                      {executionResult.test_results.map((test, index) => (
                        <div
                          key={index}
                          className={`p-2 rounded border text-sm ${
                            test.passed
                              ? 'bg-success/10 border-success/20 text-success-700'
                              : 'bg-error/10 border-error/20 text-error-700'
                          }`}
                        >
                          <p className="font-medium">
                            {test.passed ? '✅' : '❌'} {challenge.test_cases[index]?.description}
                          </p>
                          {!test.passed && test.error && (
                            <p className="text-xs mt-1 opacity-75">{test.error}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Hint Display */}
          {currentHint && (
            <div className="p-4 border-t border-gray-200">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-blue-900">💡 Hint #{currentHint.hint_level}</h4>
                  <button
                    onClick={() => setCurrentHint(null)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Dismiss
                  </button>
                </div>
                <p className="text-blue-800 mb-3">{currentHint.hint}</p>
                <p className="text-blue-600 text-sm italic">{currentHint.encouragement}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}