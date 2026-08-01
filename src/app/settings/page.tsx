'use client';

import { useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';

interface APIProvider {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  apiKey?: string;
}

const initialProviders: APIProvider[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    icon: '🤖',
    connected: true,
    apiKey: 'sk-***************************'
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    icon: '🧠',
    connected: false,
    apiKey: ''
  },
  {
    id: 'google',
    name: 'Google Gemini',
    icon: '✨',
    connected: false,
    apiKey: ''
  }
];

export default function Settings() {
  const [providers, setProviders] = useState<APIProvider[]>(initialProviders);
  const [editingProvider, setEditingProvider] = useState<string | null>(null);
  const [tempApiKey, setTempApiKey] = useState('');

  const handleEditProvider = (providerId: string) => {
    const provider = providers.find(p => p.id === providerId);
    setEditingProvider(providerId);
    setTempApiKey(provider?.apiKey || '');
  };

  const handleSaveProvider = (providerId: string) => {
    setProviders(prevProviders =>
      prevProviders.map(provider =>
        provider.id === providerId
          ? { ...provider, apiKey: tempApiKey, connected: tempApiKey.length > 0 }
          : provider
      )
    );
    setEditingProvider(null);
    setTempApiKey('');
  };

  const handleCancelEdit = () => {
    setEditingProvider(null);
    setTempApiKey('');
  };

  const getStatusIndicator = (connected: boolean) => {
    return (
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
        <span className={`text-xs font-medium ${connected ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
          {connected ? 'Connected' : 'Missing'}
        </span>
      </div>
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
              <a href="/dashboard" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                Dashboard
              </a>
              <a href="/settings" className="text-brand-primary font-medium border-b-2 border-brand-primary pb-1">
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
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">API Configuration</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Connect your AI model providers. Your keys are encrypted and stored locally in your browser.
          </p>
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Local Encryption Active</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                We never send your API keys to our servers. They remain securely within your device's local storage, ensuring complete privacy.
              </p>
            </div>
          </div>
        </div>

        {/* API Providers */}
        <div className="space-y-6">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{provider.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {provider.name}
                    </h3>
                    {getStatusIndicator(provider.connected)}
                  </div>
                </div>
              </div>

              {editingProvider === provider.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      API KEY
                    </label>
                    <input
                      type="password"
                      value={tempApiKey}
                      onChange={(e) => setTempApiKey(e.target.value)}
                      placeholder={`Enter your ${provider.name} API Key`}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleSaveProvider(provider.id)}
                      className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all"
                    >
                      Save Configuration
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  {provider.connected ? (
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-mono">••••••••••••••••••••••••••••</span>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      No API key configured
                    </div>
                  )}
                  <button
                    onClick={() => handleEditProvider(provider.id)}
                    className="text-brand-primary hover:text-purple-700 font-medium text-sm transition-colors flex items-center space-x-1"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <span>{provider.connected ? 'Edit' : 'Configure'}</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">API Docs</a>
          </div>
          <div className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">
            © 2024 OmniMind AI Platform. All rights reserved.
          </div>
        </div>
      </main>
    </div>
  );
}