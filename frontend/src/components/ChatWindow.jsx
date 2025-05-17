import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useChatContext } from '../context/ChatContext';
import { MessageItem } from './MessageItem';

export const ChatWindow = () => {
  const [input, setInput] = useState('');
  const { messages, sendMessage, loading } = useChatContext();
  const messagesEndRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !loading) {
      sendMessage(input);
      setInput('');
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-gray-800 border-r border-gray-700 overflow-hidden min-w-[600px]">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">Chat</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4 custom-scroll">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <div className="bg-blue-900 p-4 rounded-full mb-4">
              <Send className="h-8 w-8 text-blue-300" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Ask anything about your data</h3>
            <p className="text-gray-400 max-w-md">
              Upload a CSV file and start asking questions like "What's the average salary?" or "Show me the top 5 products by revenue"
            </p>
          </div>
        ) : (
          messages.map((message, index) => (
            <MessageItem key={index} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your CSV data..."
            className="flex-1 px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className={`p-2 rounded-md ${
              !input.trim() || loading
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            } transition-colors duration-200`}
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};
