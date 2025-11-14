import React, { useState, useEffect } from 'react';
import { useAI } from '../hooks/useAI';
import { api } from '../utils/api';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [siteData, setSiteData] = useState({});
  const { loading, chatWithAI } = useAI();

  useEffect(() => {
    fetchSiteData();
  }, []);

  const fetchSiteData = async () => {
    try {
      const [works, siteVisits, equipment, labourLogs, finances] = await Promise.all([
        api.getWorks(),
        fetch('http://localhost:3001/siteVisits').then(r => r.json()),
        api.getEquipment(),
        fetch('http://localhost:3001/labourLogs').then(r => r.json()),
        api.getFinances()
      ]);
      setSiteData({ works, siteVisits, equipment, labourLogs, finances });
    } catch (error) {
      console.error('Failed to fetch site data:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    const aiResponse = await chatWithAI(input, siteData);
    const aiMessage = { type: 'ai', content: aiResponse };
    setMessages(prev => [...prev, aiMessage]);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 z-50"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-white rounded-lg shadow-xl border z-50">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold">SiteSupervisor AI</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 p-4 h-64 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="text-gray-500 text-sm">
                Ask me about your construction projects, costs, equipment, or any site concerns.
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className={`mb-3 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-2 rounded-lg max-w-xs ${
                    msg.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div className="text-left">
                <div className="inline-block p-2 rounded-lg bg-gray-100 text-gray-800">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about your site..."
                className="flex-1 px-3 py-2 border rounded-lg text-sm"
                disabled={loading}
              />
              <button
                onClick={handleSendMessage}
                disabled={loading || !input.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;