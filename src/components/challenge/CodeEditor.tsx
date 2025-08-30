'use client'

import { useRef } from 'react'
import * as Monaco from '@monaco-editor/react'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language: string
  height?: string
}

export function CodeEditor({ value, onChange, language, height = "400px" }: CodeEditorProps) {
  const editorRef = useRef<unknown>(null)

  const handleEditorDidMount = (editor: unknown) => {
    editorRef.current = editor
    
    // Configure editor settings - removed specific typing due to complexity
    if (editor && typeof editor === 'object' && 'updateOptions' in editor) {
      const typedEditor = editor as { updateOptions: (options: unknown) => void }
      typedEditor.updateOptions({
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        minimap: { enabled: false },
        wordWrap: 'on',
        lineHeight: 24,
        fontFamily: '"JetBrains Mono", "SF Mono", "Monaco", "Inconsolata", "Fira Code", "Fira Mono", "Droid Sans Mono", "Consolas", monospace',
      })
    }
  }

  const handleEditorChange = (newValue: string | undefined) => {
    if (newValue !== undefined) {
      onChange(newValue)
    }
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Monaco.default
        height={height}
        language={language}
        value={value}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        theme="vs-light"
        options={{
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          minimap: { enabled: false },
          wordWrap: 'on',
          lineHeight: 24,
          fontFamily: '"JetBrains Mono", "SF Mono", "Monaco", "Inconsolata", "Fira Code", "Fira Mono", "Droid Sans Mono", "Consolas", monospace',
          scrollbar: {
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10,
          },
          padding: {
            top: 16,
            bottom: 16,
          },
        }}
      />
    </div>
  )
}