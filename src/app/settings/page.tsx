'use client';

import { useState, useEffect } from 'react';
import ThemeToggle from '@/components/ThemeToggle';

interface APIProvider {
  id: string;
  name: string;
  baseUrl?: string;
  apiKey: string;
  models: string[];
  connected: boolean;
}

interface AddProviderForm {
  name: string;
  baseUrl: string;
  apiKey: string;
  models: string[];
}

export default function Settings() {
  const [providers, setProviders] = useState<APIProvider[]>([]);
  const [editingProvider, setEditingProvider] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState<AddProviderForm>({
    name: '',
    baseUrl: '',
    apiKey: '',
    models: []
  });
  const [newModel, setNewModel] = useState('');
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before accessing localStorage
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load providers from localStorage on component mount
  useEffect(() => {
    if (mounted) {
      try {
        const savedProviders = localStorage.getItem('botroom-api-providers');
        if (savedProviders) {
          setProviders(JSON.parse(savedProviders));
        }
      } catch (error) {
        console.error('Error loading providers from localStorage:', error);
        setProviders([]);
      }
    }
  }, [mounted]);

  // Save providers to localStorage whenever providers change
  useEffect(() => {
    if (mounted && providers.length > 0) {
      try {
        localStorage.setItem('botroom-api-providers', JSON.stringify(providers));
      } catch (error) {
        console.error('Error saving providers to localStorage:', error);
      }
    }
  }, [providers, mounted]);

  const handleAddProvider = () => {
    if (addForm.name && addForm.apiKey && addForm.models.length > 0) {
      const newProvider: APIProvider = {
        id: Date.now().toString(),
        name: addForm.name,
        baseUrl: addForm.baseUrl || undefined,
        apiKey: addForm.apiKey,
        models: addForm.models,
        connected: true
      };
      
      setProviders(prev => [...prev, newProvider]);
      setAddForm({ name: '', baseUrl: '', apiKey: '', models: [] });
      setShowAddForm(false);
    }
  };

  const handleEditProvider = (providerId: string) => {
    setEditingProvider(providerId);
  };

  const handleUpdateProvider = (providerId: string, updatedProvider: Partial<APIProvider>) => {
    setProviders(prev => 
      prev.map(provider => 
        provider.id === providerId 
          ? { ...provider, ...updatedProvider }
          : provider
      )
    );
    setEditingProvider(null);
  };

  const handleDeleteProvider = (providerId: string) => {
    setProviders(prev => prev.filter(provider => provider.id !== providerId));
  };

  const addModelToForm = () => {
    if (newModel.trim() && !addForm.models.includes(newModel.trim())) {
      setAddForm(prev => ({
        ...prev,
        models: [...prev.models, newModel.trim()]
      }));
      setNewModel('');
    }
  };

  const removeModelFromForm = (model: string) => {
    setAddForm(prev => ({
      ...prev,
      models: prev.models.filter(m => m !== model)
    }));
  };

  // Quick setup for popular providers
  const populateProvider = (providerType: string) => {
    switch (providerType) {
      case 'openai':
        setAddForm({
          name: 'OpenAI',
          baseUrl: 'https://api.openai.com/v1',
          apiKey: '',
          models: ['gpt-4o', 'gpt-4o-mini', 'gpt-3.5-turbo']
        });
        break;
      case 'anthropic':
        setAddForm({
          name: 'Anthropic',
          baseUrl: 'https://api.anthropic.com',
          apiKey: '',
          models: ['claude-3-5-sonnet-20241022', 'claude-3-haiku-20240307']
        });
        break;
      case 'google':
        setAddForm({
          name: 'Google AI',
          baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
          apiKey: '',
          models: ['gemini-1.5-pro', 'gemini-1.5-flash']
        });
        break;
      case 'openrouter':
        setAddForm({
          name: 'OpenRouter',
          baseUrl: 'https://openrouter.ai/api/v1',
          apiKey: '',
          models: ['meta-llama/llama-3.1-70b-instruct', 'mistralai/mixtral-8x7b-instruct']
        });
        break;
    }
    setShowAddForm(true);
  };

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              BotRoom
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
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">API Configuration</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Add API keys from any provider. Configure models that will be available in your chat rooms.
          </p>
        </div>

        {/* Quick Setup */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Setup</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'openai', name: 'OpenAI', logo: '🤖' },
              { id: 'anthropic', name: 'Anthropic', logo: '🔮' },
              { id: 'google', name: 'Google AI', logo: '🔍' },
              { id: 'openrouter', name: 'OpenRouter', logo: '🌐' }
            ].map(provider => (
              <button
                key={provider.id}
                onClick={() => populateProvider(provider.id)}
                className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center"
              >
                <div className="text-2xl mb-1">{provider.logo}</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">{provider.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Add Provider Form */}
        {showAddForm && (
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Provider</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Provider Name *
                </label>
                <input
                  type="text"
                  value={addForm.name}
                  onChange={(e) => setAddForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., OpenAI, Anthropic"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Base URL (Optional)
                </label>
                <input
                  type="text"
                  value={addForm.baseUrl}
                  onChange={(e) => setAddForm(prev => ({ ...prev, baseUrl: e.target.value }))}
                  placeholder="https://api.example.com/v1"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                API Key *
              </label>
              <input
                type="password"
                value={addForm.apiKey}
                onChange={(e) => setAddForm(prev => ({ ...prev, apiKey: e.target.value }))}
                placeholder="Enter your API key"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Available Models *
              </label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={newModel}
                  onChange={(e) => setNewModel(e.target.value)}
                  placeholder="Model name (e.g., gpt-4o, claude-3-5-sonnet)"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  onKeyPress={(e) => e.key === 'Enter' && addModelToForm()}
                />
                <button
                  onClick={addModelToForm}
                  className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Add
                </button>
              </div>
              
              {addForm.models.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {addForm.models.map(model => (
                    <span
                      key={model}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                    >
                      {model}
                      <button
                        onClick={() => removeModelFromForm(model)}
                        className="ml-2 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleAddProvider}
                disabled={!addForm.name || !addForm.apiKey || addForm.models.length === 0}
                className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Add Provider
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Add Provider Button */}
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="mb-8 bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Custom Provider</span>
          </button>
        )}

        {/* Existing Providers */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Configured Providers</h3>
          
          {providers.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No providers configured</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Add your first API provider to start using BotRoom</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all"
              >
                Add Provider
              </button>
            </div>
          ) : (
            providers.map((provider) => (
              <div
                key={provider.id}
                className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{provider.name}</h4>
                      <span className="inline-flex items-center px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-xs font-medium">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
                        Connected
                      </span>
                    </div>
                    
                    {provider.baseUrl && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Base URL: {provider.baseUrl}
                      </p>
                    )}
                    
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <span className="font-medium">API Key:</span> ••••••••••••••••••••••••••••
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Models: </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {provider.models.map(model => (
                          <span
                            key={model}
                            className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs"
                          >
                            {model}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditProvider(provider.id)}
                      className="text-brand-primary hover:text-purple-700 font-medium text-sm transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProvider(provider.id)}
                      className="text-red-600 hover:text-red-700 font-medium text-sm transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}