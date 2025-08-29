import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'Anti-Tutorial Hell - Learn by Doing, Not Following',
  description: 'Stop following step-by-step tutorials. Start solving real problems. Build the confidence to tackle any coding challenge independently.',
  keywords: 'coding, programming, challenges, learning, tutorial hell, education',
  authors: [{ name: 'Anti-Tutorial Hell Team' }],
  openGraph: {
    title: 'Anti-Tutorial Hell - Learn by Doing, Not Following',
    description: 'Stop following step-by-step tutorials. Start solving real problems.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}