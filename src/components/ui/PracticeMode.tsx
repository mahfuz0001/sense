'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, RotateCcw, Eye, Code2, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeEditor } from '@/components/challenge/CodeEditor'

interface PracticeModeProps {
  initialCode?: string
  language?: string
  showPreview?: boolean
  hints?: string[]
  className?: string
}

const defaultHtmlCode = `<!DOCTYPE html>
<html>
<head>
    <title>My Practice Page</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            margin: 20px;
            background: #f5f5f5;
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to My Practice Page</h1>
        <p>Try editing this code to see what happens!</p>
        <button onclick="alert('Hello World!')">Click me!</button>
    </div>
</body>
</html>`

const defaultCssCode = `.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    color: white;
    text-align: center;
}

.title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
}`

const defaultJsCode = `// Try out JavaScript here!
function greetUser() {
    const name = prompt("What's your name?");
    if (name) {
        document.getElementById('output').innerHTML = 
            \`<h2>Hello, \${name}! 👋</h2>
             <p>Welcome to JavaScript practice!</p>\`;
    }
}

// Add event listener
document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript is working! 🎉');
    
    // You can try different things here:
    // - Change colors: document.body.style.backgroundColor = 'lightblue';
    // - Add text: document.getElementById('output').innerHTML = 'New content!';
    // - Create animations, calculations, etc.
});

greetUser();`

const practiceTemplates = {
  html: defaultHtmlCode,
  css: defaultCssCode,
  javascript: defaultJsCode
}

const practiceHints = {
  html: [
    "Try changing the text inside the <h1> tags",
    "Add new HTML elements like <p>, <div>, or <img>",
    "Modify the CSS styles in the <style> section",
    "Add more buttons with different onclick events"
  ],
  css: [
    "Change the gradient colors in the background",
    "Try different font sizes and text effects",
    "Add hover effects with :hover selector",
    "Experiment with borders, shadows, and animations"
  ],
  javascript: [
    "Try console.log() to see output in browser dev tools",
    "Create variables and do math operations",
    "Use if/else statements for logic",
    "Try loops like for() or while() to repeat actions"
  ]
}

export function PracticeMode({ 
  initialCode, 
  language = 'html', 
  showPreview = true,
  hints,
  className = "" 
}: PracticeModeProps) {
  const [code, setCode] = useState(initialCode || practiceTemplates[language as keyof typeof practiceTemplates] || practiceTemplates.html)
  const [showHints, setShowHints] = useState(false)
  const [preview, setPreview] = useState('')

  const resetCode = () => {
    setCode(practiceTemplates[language as keyof typeof practiceTemplates] || practiceTemplates.html)
    setPreview('')
  }

  const runCode = () => {
    if (language === 'html') {
      setPreview(code)
    } else if (language === 'css') {
      setPreview(`
        <html>
          <head>
            <style>${code}</style>
          </head>
          <body>
            <div class="container">
              <h1 class="title">CSS Preview</h1>
              <p class="subtitle">Your styles are applied here!</p>
            </div>
          </body>
        </html>
      `)
    } else if (language === 'javascript') {
      setPreview(`
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5; }
              #output { background: white; padding: 20px; border-radius: 8px; margin-top: 20px; }
            </style>
          </head>
          <body>
            <h2>JavaScript Practice</h2>
            <p>Check the browser console (F12) for console.log output!</p>
            <div id="output">Output will appear here...</div>
            <script>${code}</script>
          </body>
        </html>
      `)
    }
  }

  const currentHints = hints || practiceHints[language as keyof typeof practiceHints] || []

  return (
    <div className={`space-y-4 ${className}`}>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Code2 className="w-5 h-5 text-green-600" />
              <span>Practice Mode</span>
              <Badge variant="outline" className="text-xs">
                {language.toUpperCase()}
              </Badge>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowHints(!showHints)}
                className="text-xs"
              >
                <Lightbulb className="w-4 h-4 mr-1" />
                Tips
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetCode}
                className="text-xs"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Reset
              </Button>
              {showPreview && (
                <Button
                  size="sm"
                  onClick={runCode}
                  className="text-xs"
                >
                  <Play className="w-4 h-4 mr-1" />
                  Run
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {showHints && currentHints.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3"
            >
              <div className="flex items-start space-x-2">
                <Lightbulb className="w-4 h-4 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-sm text-yellow-800 dark:text-yellow-200 mb-2">
                    Try these ideas:
                  </h4>
                  <ul className="space-y-1">
                    {currentHints.map((hint, index) => (
                      <li key={index} className="text-xs text-yellow-700 dark:text-yellow-300">
                        • {hint}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <h3 className="font-medium text-sm">Code Editor</h3>
                <Badge variant="secondary" className="text-xs">
                  {language}
                </Badge>
              </div>
              <CodeEditor
                value={code}
                onChange={setCode}
                language={language}
                height="300px"
              />
            </div>

            {showPreview && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium text-sm">Preview</h3>
                  <Eye className="w-4 h-4 text-gray-500" />
                </div>
                <div className="border rounded-lg overflow-hidden bg-white">
                  {preview ? (
                    <iframe
                      srcDoc={preview}
                      className="w-full h-[300px] border-none"
                      title="Code Preview"
                      sandbox="allow-scripts"
                    />
                  ) : (
                    <div className="h-[300px] flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                      <div className="text-center">
                        <Play className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Click "Run" to see your code in action</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}