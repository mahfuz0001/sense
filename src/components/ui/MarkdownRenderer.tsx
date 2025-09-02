'use client'

import { ReactElement } from 'react'

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const renderContent = (text: string): ReactElement[] => {
    const lines = text.split('\n')
    const elements: ReactElement[] = []
    let currentCodeBlock = ''
    let inCodeBlock = false
    let currentList: ReactElement[] = []
    let inList = false
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      
      // Handle code blocks
      if (line.trim().startsWith('```')) {
        // Close any open list before code block
        if (inList && currentList.length > 0) {
          elements.push(
            <ul key={`list-${i}`} className="list-disc list-inside space-y-1 my-3 ml-4">
              {currentList}
            </ul>
          )
          currentList = []
          inList = false
        }
        
        if (inCodeBlock) {
          // End code block
          const language = line.trim().substring(3).trim() || 'text'
          elements.push(
            <div key={`code-${i}`} className="my-4">
              <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 text-xs text-gray-600 dark:text-gray-400 rounded-t-lg border-b border-gray-200 dark:border-gray-700">
                {language}
              </div>
              <pre className="bg-gray-900 dark:bg-gray-800 text-gray-100 p-3 rounded-b-lg overflow-x-auto">
                <code className="text-sm">{currentCodeBlock.trim()}</code>
              </pre>
            </div>
          )
          currentCodeBlock = ''
          inCodeBlock = false
        } else {
          // Start code block
          inCodeBlock = true
        }
        continue
      }
      
      if (inCodeBlock) {
        currentCodeBlock += line + '\n'
        continue
      }
      
      // Handle list items
      if (line.startsWith('- ') || line.match(/^\d+\. /)) {
        const listContent = line.startsWith('- ') ? line.substring(2) : line.replace(/^\d+\. /, '')
        const processedContent = processInlineMarkdown(listContent)
        
        currentList.push(
          <li key={`list-item-${i}`} className="text-gray-700 dark:text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: processedContent }}>
          </li>
        )
        inList = true
        continue
      }
      
      // Close list if we're not in a list item anymore
      if (inList && !line.startsWith('- ') && !line.match(/^\d+\. /) && line.trim() !== '') {
        elements.push(
          <ul key={`list-${i}`} className="list-disc list-inside space-y-1 my-4 ml-4">
            {currentList}
          </ul>
        )
        currentList = []
        inList = false
      }
      
      // Handle headings
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={`h1-${i}`} className="text-xl font-bold text-gray-900 dark:text-white my-3 leading-tight">
            {line.substring(2)}
          </h1>
        )
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={`h2-${i}`} className="text-lg font-semibold text-gray-900 dark:text-white my-3 leading-tight">
            {line.substring(3)}
          </h2>
        )
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={`h3-${i}`} className="text-base font-semibold text-gray-900 dark:text-white my-2 leading-tight">
            {line.substring(4)}
          </h3>
        )
      } else if (line.startsWith('#### ')) {
        elements.push(
          <h4 key={`h4-${i}`} className="text-sm font-semibold text-gray-900 dark:text-white my-2 leading-tight">
            {line.substring(5)}
          </h4>
        )
      } else if (line.trim() === '') {
        // Empty line - only add if not in a list
        if (!inList) {
          elements.push(<div key={`br-${i}`} className="h-2" />)
        }
      } else if (line.trim()) {
        // Regular paragraph
        const processedLine = processInlineMarkdown(line)
        
        elements.push(
          <p key={`p-${i}`} className="text-gray-700 dark:text-gray-300 my-2 leading-relaxed text-sm" 
             dangerouslySetInnerHTML={{ __html: processedLine }}>
          </p>
        )
      }
    }
    
    // Close any remaining list
    if (inList && currentList.length > 0) {
      elements.push(
        <ul key="list-final" className="list-disc list-inside space-y-1 my-4 ml-4">
          {currentList}
        </ul>
      )
    }
    
    return elements
  }
  
  // Process inline markdown formatting
  const processInlineMarkdown = (text: string): string => {
    return text
      // Bold text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>')
      // Italic text
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      // Inline code - escape HTML entities to display tags as text
      .replace(/`(.*?)`/g, (match, code) => {
        const escapedCode = code
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
        return `<code class="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1.5 py-0.5 rounded text-xs font-mono">${escapedCode}</code>`;
      })
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
  }
  
  return (
    <div className={`prose prose-sm max-w-none ${className}`}>
      {renderContent(content)}
    </div>
  )
}