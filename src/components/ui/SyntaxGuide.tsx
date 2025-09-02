'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Book, Lightbulb, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer'

interface SyntaxExample {
  title: string
  code: string
  explanation: string
  language: string
}

interface SyntaxCategory {
  id: string
  title: string
  description: string
  examples: SyntaxExample[]
}

const syntaxGuide: SyntaxCategory[] = [
  {
    id: 'html-basics',
    title: 'HTML Basics',
    description: 'Essential HTML syntax and structure',
    examples: [
      {
        title: 'Basic HTML Structure',
        language: 'html',
        code: `<!DOCTYPE html>
<html>
<head>
    <title>Page Title</title>
</head>
<body>
    <h1>My First Heading</h1>
    <p>My first paragraph.</p>
</body>
</html>`,
        explanation: `This is the basic structure of every HTML document. The **DOCTYPE** tells the browser what version of HTML to expect. The **html** element wraps all content, **head** contains metadata, and **body** contains visible content.`
      },
      {
        title: 'HTML Elements and Attributes',
        language: 'html',
        code: `<a href="https://example.com" target="_blank">Click me</a>
<img src="image.jpg" alt="Description" width="300">
<div class="container" id="main">Content here</div>`,
        explanation: `HTML elements can have **attributes** that provide additional information. The **href** attribute specifies a link destination, **src** specifies an image source, and **class** and **id** are used for styling and JavaScript.`
      }
    ]
  },
  {
    id: 'css-basics',
    title: 'CSS Fundamentals',
    description: 'Core CSS concepts and syntax',
    examples: [
      {
        title: 'CSS Selectors',
        language: 'css',
        code: `/* Element selector */
h1 {
    color: blue;
}

/* Class selector */
.container {
    max-width: 1200px;
    margin: 0 auto;
}

/* ID selector */
#header {
    background-color: #333;
}`,
        explanation: `CSS selectors target HTML elements for styling. **Element selectors** target HTML tags directly, **class selectors** (with .) target elements with specific class attributes, and **ID selectors** (with #) target elements with specific ID attributes.`
      },
      {
        title: 'CSS Box Model',
        language: 'css',
        code: `.box {
    width: 300px;
    height: 200px;
    padding: 20px;
    border: 2px solid black;
    margin: 10px;
}`,
        explanation: `The **CSS box model** describes how element dimensions are calculated. Total width = width + padding + border + margin. Understanding this is crucial for layout control.`
      }
    ]
  },
  {
    id: 'javascript-basics',
    title: 'JavaScript Essentials',
    description: 'JavaScript syntax and programming concepts',
    examples: [
      {
        title: 'Variables and Data Types',
        language: 'javascript',
        code: `// Variables
let name = "John";        // String
const age = 25;          // Number
let isActive = true;     // Boolean
let items = [1, 2, 3];   // Array
let person = {           // Object
    name: "John",
    age: 25
};`,
        explanation: `JavaScript has different **data types**: strings (text), numbers, booleans (true/false), arrays (lists), and objects (key-value pairs). Use **let** for variables that change, **const** for constants.`
      },
      {
        title: 'Functions',
        language: 'javascript',
        code: `// Function declaration
function greet(name) {
    return "Hello, " + name + "!";
}

// Arrow function
const add = (a, b) => a + b;

// Usage
console.log(greet("Alice"));  // "Hello, Alice!"
console.log(add(5, 3));       // 8`,
        explanation: `**Functions** are reusable blocks of code. You can declare them with the **function** keyword or use **arrow function** syntax. Functions can take **parameters** and **return** values.`
      }
    ]
  }
]

interface SyntaxGuideProps {
  className?: string
}

export function SyntaxGuide({ className = "" }: SyntaxGuideProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedExample, setSelectedExample] = useState<number>(0)

  const currentCategory = syntaxGuide.find(cat => cat.id === selectedCategory)

  return (
    <div className={`space-y-4 ${className}`}>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Book className="w-5 h-5 text-blue-600" />
            <span>Syntax Guide</span>
          </CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Learn coding syntax step by step
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {!selectedCategory ? (
            <div className="grid gap-2">
              {syntaxGuide.map((category) => (
                <Button
                  key={category.id}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory(category.id)
                    setSelectedExample(0)
                  }}
                  className="justify-between h-auto p-3"
                >
                  <div className="text-left">
                    <div className="font-medium text-sm">{category.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{category.description}</div>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-sm">{currentCategory?.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{currentCategory?.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCategory(null)}
                  >
                    Back
                  </Button>
                </div>

                {currentCategory && (
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {currentCategory.examples.map((example, index) => (
                        <Button
                          key={index}
                          variant={selectedExample === index ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedExample(index)}
                          className="text-xs h-7"
                        >
                          {example.title}
                        </Button>
                      ))}
                    </div>

                    <motion.div
                      key={selectedExample}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-3"
                    >
                      <div>
                        <Badge variant="secondary" className="text-xs">
                          {currentCategory.examples[selectedExample]?.language}
                        </Badge>
                      </div>
                      
                      <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-3">
                        <pre className="text-gray-100 text-xs overflow-x-auto">
                          <code>{currentCategory.examples[selectedExample]?.code}</code>
                        </pre>
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                        <div className="flex items-start space-x-2">
                          <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div className="text-xs">
                            <MarkdownRenderer 
                              content={currentCategory.examples[selectedExample]?.explanation || ''}
                              className="text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </CardContent>
      </Card>
    </div>
  )
}