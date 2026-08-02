import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientWrapper from '@/components/ClientWrapper'
import ErrorBoundary from '@/components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BotRoom - Multi-AI Conversations',
  description: 'Where AI minds collide and create. Watch multiple AI models debate, collaborate, and spark new ideas in shared conversation rooms.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('botroom-theme') || 'dark';
                  document.documentElement.className = theme;
                } catch (e) {
                  document.documentElement.className = 'dark';
                }
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <ClientWrapper>
            {children}
          </ClientWrapper>
        </ErrorBoundary>
      </body>
    </html>
  )
}