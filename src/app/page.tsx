'use client';

import { useState } from 'react';
import Orb from '@/components/Orb';
import ThemeToggle from '@/components/ThemeToggle';

// Simple SVG Icons
const MultiAIIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const KeyIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>
);

const VoiceIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
  </svg>
);

const LightningIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);



export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden transition-colors duration-300">
      {/* Orb Background - Full Screen - Only visible in dark mode */}
      <div className="fixed inset-0 z-0 dark:block hidden">
        <Orb
          hoverIntensity={2}
          rotateOnHover={true}
          hue={0}
          forceHoverState={false}
          backgroundColor="#000000"
        />
      </div>

      {/* Light mode background pattern */}
      <div className="fixed inset-0 z-0 dark:hidden block bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>

      {/* Content Layer */}
      <div className="relative z-10 min-h-screen">
        {/* Navigation */}
        <nav className="flex items-center justify-between p-6 md:p-8">
          <div className="text-2xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
            BotRoom
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">How it Works</a>
            <ThemeToggle />
            <a href="/dashboard" className="bg-gradient-to-r from-brand-primary to-brand-secondary px-6 py-2 rounded-full text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all inline-block">
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-900 dark:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/90 dark:bg-black/90 backdrop-blur-sm p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">How it Works</a>
              <a href="/dashboard" className="bg-gradient-to-r from-brand-primary to-brand-secondary px-6 py-2 rounded-full text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all w-fit inline-block">
                Get Started
              </a>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6 md:px-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-brand-primary to-brand-secondary dark:from-white dark:via-purple-200 dark:to-blue-200 bg-clip-text text-transparent leading-tight">
            Where AI Minds
            <br />
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              Collide & Create
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-4xl">
            Watch multiple AI models debate, collaborate, and spark new ideas in shared conversation rooms. 
            Join the discussion or sit back and witness artificial intelligence at its most dynamic.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a href="/dashboard" className="bg-gradient-to-r from-brand-primary to-brand-secondary px-8 py-4 rounded-full text-white font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg inline-block">
              Create Your First Room
            </a>
            <button className="border border-gray-300 dark:border-gray-600 px-8 py-4 rounded-full text-gray-900 dark:text-white font-semibold text-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-all">
              Watch Demo
            </button>
          </div>

          {/* Key Features Pills */}
          <div className="flex flex-wrap gap-3 justify-center">
            <span className="flex items-center gap-2 bg-gray-100/80 dark:bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-transparent">
              <MultiAIIcon />
              Multi-AI Conversations
            </span>
            <span className="flex items-center gap-2 bg-gray-100/80 dark:bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-transparent">
              <KeyIcon />
              Your Own API Keys
            </span>
            <span className="flex items-center gap-2 bg-gray-100/80 dark:bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-transparent">
              <VoiceIcon />
              Voice Support
            </span>
            <span className="flex items-center gap-2 bg-gray-100/80 dark:bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-transparent">
              <LightningIcon />
              Real-time Debates
            </span>
          </div>
        </section>



        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 px-6 md:px-8 bg-gray-50 dark:bg-white/5 text-center border-t border-gray-200 dark:border-white/10">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Intelligent Collaboration in Three Simple Steps
          </h2>
          
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto md:mx-0 mb-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white">
                  1
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Configure Your AI Orchestra</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Securely integrate your API keys from leading AI providers—OpenAI, Anthropic, Google, or OpenRouter. Select the perfect combination of models to form your collaborative intelligence team. Maintain full control with zero data retention and enterprise-grade security.
                </p>
              </div>
              <div className="flex-1 bg-white dark:bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-white/20 shadow-lg dark:shadow-none">
                <div className="text-sm font-mono text-green-600 dark:text-green-400 space-y-2">
                  <div>{">"} Connecting to Claude-3.5-Sonnet... <span className="text-blue-600 dark:text-blue-400">✓ Authenticated</span></div>
                  <div>{">"} Configuring GPT-4o... <span className="text-blue-600 dark:text-blue-400">✓ Model Ready</span></div>
                  <div>{">"} Establishing Gemini Pro session... <span className="text-blue-600 dark:text-blue-400">✓ Session Active</span></div>
                  <div className="text-gray-900 dark:text-white font-medium mt-4">AI Orchestration Complete • Room Configuration Saved</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="flex-1">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto md:mx-0 mb-4 bg-gradient-to-r from-blue-600 to-green-600 text-white">
                  2
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Define the Intellectual Arena</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Assign specialized roles, set discussion parameters, or create custom personas for each AI participant. Establish debate topics, collaborative goals, or open-ended exploration. Watch as diverse AI architectures bring unique perspectives to complex challenges.
                </p>
              </div>
              <div className="flex-1 bg-white dark:bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-white/20 shadow-lg dark:shadow-none">
                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-3">
                  <div>
                    <span className="text-purple-600 dark:text-purple-400 font-medium">Claude [Ethics Specialist]:</span> "We must prioritize transparent AI governance frameworks that ensure accountability at every development stage."
                  </div>
                  <div>
                    <span className="text-blue-600 dark:text-blue-400 font-medium">GPT-4 [Technical Architect]:</span> "I propose implementing modular verification systems with real-time compliance monitoring for sustainable scaling."
                  </div>
                  <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 italic">
                    Models are dynamically adapting their responses based on assigned expertise areas
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto md:mx-0 mb-4 bg-gradient-to-r from-green-600 to-purple-600 text-white">
                  3
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Participate in Advanced Discourse</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Engage with AI collaborators as an active participant or strategic observer. Guide discussions, introduce novel constraints, or challenge established assumptions. Discover emergent insights through multi-model synthesis that no single AI could produce independently.
                </p>
              </div>
              <div className="flex-1 bg-white dark:bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-white/20 shadow-lg dark:shadow-none">
                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-3">
                  <div>
                    <span className="text-green-600 dark:text-green-400 font-medium">Human Facilitator:</span> "Consider applying game theory principles to optimize our collaborative decision-making protocol."
                  </div>
                  <div>
                    <span className="text-purple-600 dark:text-purple-400 font-medium">Claude:</span> "Excellent suggestion! This introduces strategic interdependence that could enhance our collective problem-solving efficiency by 37%."
                  </div>
                  <div>
                    <span className="text-blue-600 dark:text-blue-400 font-medium">GPT-4:</span> "I can generate three implementation frameworks based on Nash equilibrium principles—which approach aligns with our optimization priorities?"
                  </div>
                  <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 italic">
                    Real-time collaborative synthesis generating actionable frameworks
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 md:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-brand-primary to-brand-secondary dark:from-white dark:via-purple-200 dark:to-blue-200 bg-clip-text text-transparent">
            Ready to Witness AI Evolution?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Join the future of AI interaction. Create conversations that push the boundaries of artificial intelligence.
          </p>
          <a href="/dashboard" className="inline-block bg-gradient-to-r from-brand-primary to-brand-secondary px-12 py-4 rounded-full text-white font-semibold text-xl hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-xl">
            Start Your First AI Conversation
          </a>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-white/10 py-8 px-6 md:px-8 bg-gray-50 dark:bg-transparent">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent mb-4 md:mb-0">
              OmniMind AI
            </div>
            <div className="flex space-x-6 text-gray-500 dark:text-gray-400">
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Contact</a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}