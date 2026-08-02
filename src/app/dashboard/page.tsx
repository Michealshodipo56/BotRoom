'use client';

import { useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';

// Sample room data matching the reference image
const sampleRooms = [
  {
    id: '1',
    title: 'Claude vs GPT-4',
    description: 'A comparative discussion on AI alignment and ethical frameworks.',
    participants: ['Claude 3 Opus', 'GPT-4o'],
    status: 'active',
    lastActive: '2 hours ago',
    messageCount: 14,
    icon: '💬'
  },
  {
    id: '2',
    title: 'Data Analysis Workspace', 
    description: 'Processing Q3 financial reports and generating visual summaries.',
    participants: ['Data Analyst Bot', 'GPT-4o'],
    status: 'active',
    lastActive: 'Yesterday',
    messageCount: 42,
    icon: '📊'
  }
];

// Sidebar navigation items
const sidebarItems = [
  { id: 'rooms', label: 'Your Rooms', icon: 'rooms' },
  { id: 'api', label: 'API Keys', icon: 'key' },
  { id: 'settings', label: 'Settings', icon: 'settings' }
];

// Icon components
const RoomsIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const KeyIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const getIcon = (iconType: string) => {
  switch (iconType) {
    case 'rooms':
      return <RoomsIcon />;
    case 'key':
      return <KeyIcon />;
    case 'settings':
      return <SettingsIcon />;
    default:
      return null;
  }
};

export default function Dashboard() {
  const [rooms, setRooms] = useState(sampleRooms);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      {/* Top Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BR</span>
              </div>
              <span className="text-xl font-semibold text-black dark:text-white">BotRoom</span>
            </div>
            
            {/* Navigation Tabs */}
            <div className="flex space-x-8">
              <button className="text-purple-600 border-b-2 border-purple-600 pb-2 font-medium">
                Dashboard
              </button>
              <a href="/" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white pb-2">
                Home
              </a>
              <a href="/settings" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white pb-2">
                Settings
              </a>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </nav>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 min-h-screen">
          <div className="p-4">
            {/* Create New Room Button */}
            <button className="w-full mb-6 px-4 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg flex items-center justify-center space-x-2 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Create New Room</span>
            </button>

            {/* Navigation Items */}
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    item.id === 'rooms'
                      ? 'bg-brand-primary text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {getIcon(item.icon)}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Upgrade Section */}
            <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-black dark:text-white mb-2">Upgrade to Pro</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Unlock unlimited rooms, priority models, and more.
              </p>
              <button className="w-full px-4 py-2 bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-purple-700 hover:to-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center space-x-1">
                <span>Upgrade Now</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 bg-white dark:bg-black">
          <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-black dark:text-white mb-2">Your Rooms</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage your active AI collaboration spaces.</p>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative">
                  <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search rooms..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-64 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-black dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>
                
                {/* Filter */}
                <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                  </svg>
                  <span>Recent</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
            {/* Rooms List */}
            <div className="space-y-4">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md dark:hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      {/* Room Icon */}
                      <div className="w-12 h-12 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center text-white">
                        {room.id === '1' && (
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        )}
                        {room.id === '2' && (
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        )}
                      </div>
                      
                      {/* Room Details */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-black dark:text-white">{room.title}</h3>
                          <span className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-green-600 dark:text-green-400 font-medium">Active</span>
                          </span>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                          {room.description}
                        </p>
                        
                        {/* Participants */}
                        <div className="flex items-center space-x-2 mb-3">
                          {room.participants.map((participant, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-md"
                            >
                              {participant}
                            </span>
                          ))}
                        </div>
                        
                        {/* Meta Info */}
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Last active: {room.lastActive}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span>{room.messageCount} messages</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex items-center space-x-3">
                      <button className="p-2 text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                      
                      <a 
                        href={`/chat/${room.id}`}
                        className="px-6 py-2 bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg transition-colors flex items-center space-x-2"
                      >
                        <span>Enter Room</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {rooms.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">More rooms will appear here</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Create a new room to get started</p>
                <button className="px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg transition-colors">
                  Create Your First Room
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}