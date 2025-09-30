// Chat input component at the bottom of the interface
'use client';

import { useState } from 'react';
import Icon from './Icon';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  placeholder: string;
}

export default function ChatInput({ onSendMessage, isLoading, placeholder }: ChatInputProps) {
  const [inputValue, setInputValue] = useState('');

  // Handle send message action
  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue(''); // Clear input after sending
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSend();
    }
  };

  return (
    <div className="glass-effect border-t border-slate-200 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative flex items-center">
          {/* Text input field */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="w-full pl-4 pr-12 py-3 border border-slate-300 rounded-xl input-focus transition-shadow shadow-sm"
            disabled={isLoading}
          />
          
          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={isLoading || !inputValue.trim()}
            className="absolute right-2.5 p-2 bg-gradient-button text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all shadow-md btn-hover disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon name="Send" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
