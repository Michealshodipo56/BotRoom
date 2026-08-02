'use client';

import { useState, useRef, useEffect } from 'react';
import ThemeToggle from '@/components/ThemeToggle';

interface Message {
  id: string;
  sender: 'user' | 'claude' | 'gpt4';
  content: string;
  timestamp: Date;
}

interface Agent {
  id: string;
  name: string;
  model: string;
  status: 'active' | 'idle' | 'thinking';
  avatar: string;
  color: string;
  provider: string;
}

interface APIProvider {
  id: string;
  name: string;
  baseUrl?: string;
  apiKey: string;
  models: string[];
  connected: boolean;
}

// Function to get available agents from configured providers
const getAvailableAgents = (): Agent[] => {
  const savedProviders = localStorage.getItem('botroom-api-providers');
  if (!savedProviders) return [];
  
  const providers: APIProvider[] = JSON.parse(savedProviders);
  const agents: Agent[] = [];
  
  providers.forEach(provider => {
    provider.models.forEach((model, index) => {
      const agentId = `${provider.id}-${model}`;
      
      // Generate avatar and color based on provider
      let avatar = '🤖';
      let color = 'from-gray-600 to-gray-700';
      
      if (provider.name.toLowerCase().includes('openai')) {
        avatar = '🌀';
        color = 'from-blue-500 to-blue-600';
      } else if (provider.name.toLowerCase().includes('anthropic') || provider.name.toLowerCase().includes('claude')) {
        avatar = '🤖';
        color = 'from-orange-500 to-orange-600';
      } else if (provider.name.toLowerCase().includes('google') || provider.name.toLowerCase().includes('gemini')) {
        avatar = '💎';
        color = 'from-green-500 to-green-600';
      } else if (provider.name.toLowerCase().includes('meta') || provider.name.toLowerCase().includes('llama')) {
        avatar = '🦙';
        color = 'from-purple-500 to-purple-600';
      } else if (provider.name.toLowerCase().includes('mistral')) {
        avatar = '🎭';
        color = 'from-orange-500 to-red-500';
      } else if (provider.name.toLowerCase().includes('perplexity')) {
        avatar = '🔮';
        color = 'from-teal-500 to-teal-600';
      }
      
      agents.push({
        id: agentId,
        name: model,
        model: model,
        provider: provider.name,
        avatar,
        color,
        status: 'idle'
      });
    });
  });
  
  return agents;
};

const initialMessages: Message[] = [
  {
    id: '1',
    sender: 'user',
    content: 'I need to compare the performance metrics of our Q3 marketing campaign across channels. Can you both analyze the data and provide distinct perspectives?',
    timestamp: new Date('2024-01-15T10:30:00')
  },
  {
    id: '2',
    sender: 'claude',
    content: 'Based on the dataset, the most significant variance occurred in the email marketing sector. We saw a 14% lift in engagement compared to Q2, primarily driven by the segmented A/B testing implementation.\n\nHowever, social acquisition costs rose slightly. I recommend we look into the specific creative sets used in weeks 4-6 to identify any potential ad fatigue.',
    timestamp: new Date('2024-01-15T10:32:00')
  },
  {
    id: '3',
    sender: 'gpt4',
    content: 'Adding to Claude\'s observation on social acquisition, if we cross-reference that with the geographic data, the cost increase is heavily concentrated in the EU region.\n\nWhile email performed well globally, our paid search ROI dropped by 2.3%. It might be strategic to reallocate 10% of the Q4 budget from paid search into the high-performing email segments.',
    timestamp: new Date('2024-01-15T10:34:00')
  }
];

const agents: Agent[] = [
  {
    id: 'claude',
    name: 'Claude',
    model: 'Claude 3.5 Sonnet',
    status: 'active',
    avatar: 'C',
    color: 'from-purple-600 to-purple-700'
  },
  {
    id: 'gpt4',
    name: 'GPT-4o',
    model: 'GPT-4o',
    status: 'active', 
    avatar: 'G',
    color: 'from-blue-600 to-blue-700'
  }
];

const suggestedActions = [
  'Generate summary report',
  'Show visual charts', 
  'Explain ad fatigue'
];

export default function ChatRoom({ params }: { params: { roomId: string } }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [voiceMode, setVoiceMode] = useState(false);
  const [availableAgents, setAvailableAgents] = useState<Agent[]>([]);
  const [activeAgents, setActiveAgents] = useState<Agent[]>(agents);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load available agents from configured providers
  useEffect(() => {
    const agents = getAvailableAgents();
    setAvailableAgents(agents);
  }, []);

  // Filter available agents based on search
  const filteredAvailableAgents = availableAgents.filter(agent =>
    !activeAgents.find(active => active.id === agent.id) &&
    (agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     agent.provider.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const addAgentToRoom = (agent: Agent) => {
    setActiveAgents(prev => [...prev, { ...agent, status: 'active' }]);
  };

  const removeAgentFromRoom = (agentId: string) => {
    setActiveAgents(prev => prev.filter(agent => agent.id !== agentId));
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI responses (in real app, this would call your AI APIs)
    setTimeout(() => {
      const claudeResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'claude',
        content: 'That\'s an interesting perspective! Let me build on that analysis with additional considerations...',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, claudeResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getSenderInfo = (sender: string) => {
    switch (sender) {
      case 'claude':
        return { name: 'Claude', avatar: 'C', color: 'from-purple-600 to-purple-700' };
      case 'gpt4':
        return { name: 'GPT-4o', avatar: 'G', color: 'from-blue-600 to-blue-700' };
      case 'user':
        return { name: 'You', avatar: 'Y', color: 'from-green-600 to-green-700' };
      default:
        return { name: 'Unknown', avatar: '?', color: 'from-gray-600 to-gray-700' };
    }
  };

  return (
    <div className="h-screen flex bg-white dark:bg-black transition-colors duration-300">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Back Button - Mobile */}
              <button className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {/* Room Title */}
              <div>
                <h1 className="text-lg sm:text-xl font-semibold text-black dark:text-white">Claude vs GPT-4 on Ethics</h1>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>2 participants active</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Voice Mode Toggle */}
              <button
                onClick={() => setVoiceMode(!voiceMode)}
                className={`hidden sm:flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
                  voiceMode 
                    ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white border-transparent' 
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                <span className="text-sm font-medium">Voice Mode</span>
              </button>

              {/* Sidebar Toggle */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
            {messages.map((message) => {
              const senderInfo = getSenderInfo(message.sender);
              return (
                <div key={message.id} className="flex space-x-3 sm:space-x-4">
                  {/* Avatar */}
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${senderInfo.color} flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}>
                    {senderInfo.avatar}
                  </div>
                  
                  {/* Message Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-black dark:text-white text-sm sm:text-base">
                        {senderInfo.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    
                    <div className={`p-3 sm:p-4 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                        : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                    }`}>
                      <div className="text-black dark:text-white whitespace-pre-wrap text-sm sm:text-base leading-relaxed">
                        {message.content}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex space-x-3 sm:space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center text-white font-semibold text-sm">
                  C
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-black dark:text-white text-sm sm:text-base">Claude</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 sm:p-4 rounded-lg">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
          {/* Suggested Actions */}
          <div className="px-4 sm:px-6 py-3 border-b border-gray-100 dark:border-gray-800">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap gap-2">
                {suggestedActions.map((action, index) => (
                  <button
                    key={index}
                    className="px-3 py-1.5 text-xs sm:text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
                    onClick={() => setInputMessage(action)}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Message Input */}
          <div className="px-4 sm:px-6 py-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-end space-x-3">
                {/* Attachment Button */}
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                
                {/* Text Input */}
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Message both models..."
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base"
                    rows={1}
                    style={{ minHeight: '44px', maxHeight: '120px' }}
                  />
                </div>

                {/* Voice Button */}
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>

                {/* Send Button */}
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="p-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>

              {/* Footer Text */}
              <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-3">
                BotRoom can make mistakes. Verify important information.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex-shrink-0`}>
        <div className="w-80 h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-black dark:text-white">Room Settings</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
              >
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex space-x-6 mb-6">
              <button className="text-brand-primary font-medium border-b-2 border-brand-primary pb-1">
                Agents
              </button>
              <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                Info
              </button>
            </div>
          </div>

          {/* Add New Agent Section */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h3 className="text-base font-medium text-black dark:text-white mb-4">Add New Agent</h3>
            
            {/* Search Bar */}
            <div className="relative mb-4">
              <svg className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search agents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              />
            </div>

            {/* Available Agents */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredAvailableAgents.length > 0 ? filteredAvailableAgents.map((agent) => (
                <div key={agent.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${agent.color} flex items-center justify-center text-white text-sm`}>
                      {agent.avatar}
                    </div>
                    <div>
                      <div className="font-medium text-black dark:text-white text-sm">{agent.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{agent.provider}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => addAgentToRoom(agent)}
                    className="w-7 h-7 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              )) : (
                <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
                  {availableAgents.length === 0 ? (
                    <div>
                      <p>No AI providers configured</p>
                      <a href="/settings" className="text-brand-primary hover:underline">
                        Add API keys in Settings
                      </a>
                    </div>
                  ) : (
                    <p>No agents found matching "{searchQuery}"</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Active in Room Section */}
          <div className="flex-1 p-6">
            <h3 className="text-base font-medium text-black dark:text-white mb-4">Active in Room ({activeAgents.length})</h3>
            
            <div className="space-y-3">
              {activeAgents.map((agent) => (
                <div key={agent.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${agent.color} flex items-center justify-center text-white`}>
                      {agent.avatar}
                    </div>
                    <div>
                      <div className="font-medium text-black dark:text-white">{agent.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{agent.provider}</div>
                      <div className="flex items-center space-x-1 mt-1">
                        <div className={`w-2 h-2 rounded-full ${
                          agent.status === 'active' ? 'bg-green-500' : 
                          agent.status === 'thinking' ? 'bg-yellow-500' : 'bg-gray-400'
                        }`}></div>
                        <span className={`text-xs ${
                          agent.status === 'active' ? 'text-green-600 dark:text-green-400' :
                          agent.status === 'thinking' ? 'text-yellow-600 dark:text-yellow-400' :
                          'text-gray-500 dark:text-gray-400'
                        } capitalize`}>
                          {agent.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeAgentFromRoom(agent.id)}
                    className="w-7 h-7 bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/40 rounded border border-red-200 dark:border-red-800 flex items-center justify-center transition-colors"
                  >
                    <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
              
              {activeAgents.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                  <p>No agents in this room</p>
                  <p>Add agents from the list above</p>
                </div>
              )}
            </div>
          </div>

          {/* Voice Mode Button */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={() => setVoiceMode(!voiceMode)}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                voiceMode 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-purple-700 hover:to-blue-700 text-white'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              <span>{voiceMode ? 'Stop Voice Mode' : 'Switch to Voice Mode'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}