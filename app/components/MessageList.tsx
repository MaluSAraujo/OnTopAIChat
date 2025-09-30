// Message list display component
'use client';

import { useRef, useEffect } from 'react';
import { Message } from '@/lib/types';
import QuickQuestions from './QuickQuestions';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  currentChatId: string | null;
  typingText: string;
  quickQuestions: string[];
  welcomeText: string;
  suggestionsText: string;
  onQuestionClick: (question: string) => void;
}

export default function MessageList({
  messages,
  isLoading,
  currentChatId,
  typingText,
  quickQuestions,
  welcomeText,
  suggestionsText,
  onQuestionClick,
}: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {/* Show quick questions if no active chat */}
      {!currentChatId ? (
        <QuickQuestions
          questions={quickQuestions}
          onQuestionClick={onQuestionClick}
          welcomeText={welcomeText}
          suggestionsText={suggestionsText}
        />
      ) : (
        // Show messages if chat is active
        <>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {/* Message bubble */}
              <div
                className={`max-w-xl lg:max-w-3xl px-4 py-3 rounded-2xl shadow-md chat-message ${
                  msg.type === 'user'
                    ? 'bg-gradient-button text-white'
                    : 'bg-white border border-slate-200 text-slate-800'
                }`}
              >
                {/* Message content */}
                <p className="break-words">{msg.content}</p>
                
                {/* Timestamp */}
                <span
                  className={`text-xs mt-2 block ${
                    msg.type === 'user' ? 'text-purple-100' : 'text-slate-500'
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-xl lg:max-w-3xl px-4 py-3 rounded-2xl shadow-md bg-white border border-slate-200 text-slate-800">
                <p className="text-slate-500 typing-indicator">{typingText}</p>
              </div>
            </div>
          )}
          
          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
}
