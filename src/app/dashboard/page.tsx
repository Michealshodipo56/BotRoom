'use client';

import { useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';

// Sample room data (will come from localStorage in real implementation)
const sampleRooms = [
  {
    id: '1',
    title: 'Claude vs GPT-4 on Ethics',
    description: 'A comparative discussion on AI alignment and ethical frameworks.',
    participants: ['Claude 3 Opus', 'GPT-4o'],
    status: 'active',
    lastActive: '2 hours ago',
    messageCount: 14
  },
  {
    id: '2',
    title: 'Data Analysis Workspace', 
    description: 'Processing Q3 financial reports and generating visual summaries.',
    participants: ['Data Analyst Bot', 'GPT-4o'],
    status: 'active',
    lastActive: 'Yesterday',
    messageCount: 42
  },
  {
    id: '3',
    title: 'Creative Writing Brainstorm',
    description: 'Ideation for sci-fi short stories.',
    participants: ['Claude 3 Sonnet'],
    status: 'archived',
    lastActive: 'Oct 12, 2023',
    messageCount: 8
  }
];

export default function Dashboard() {
  const [rooms, setRooms] = useState(sampleRooms);

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
          Active
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100">
        Archived
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              OmniMind AI
            </h1>
            <nav className="flex space-x-6">
              <a href="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                Home
              </a>
              <a href="/dashboard" className="text-brand-primary font-medium border-b-2 border-brand-primary pb-1">
                Dashboard
              </a>
              <a href="/settings" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                Settings
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="w-8 h-8 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">U</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Your Rooms</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your active AI collaboration spaces.</p>
          </div>
          <button className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Create New Room</span>
          </button>
        </div>

        {/* Rooms Grid */}
        <div className="space-y-4">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {room.title}
                    </h3>
                    {getStatusBadge(room.status)}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {room.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      {room.participants.map((participant, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-xs font-medium"
                        >
                          {participant}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Last active: {room.lastActive} • {room.messageCount} messages
                    </div>
                  </div>
                </div>
                <div className="ml-6">
                  <button 
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      room.status === 'active' 
                        ? 'bg-brand-primary text-white hover:bg-purple-700' 
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {room.status === 'active' ? 'Enter Room →' : 'View History'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (if no rooms) */}
        {rooms.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No rooms yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Create your first AI conversation room to get started.</p>
            <button className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all">
              Create Your First Room
            </button>
          </div>
        )}
      </main>
    </div>
  );
}