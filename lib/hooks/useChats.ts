// Hook for managing chat state and operations
'use client';

import { useState, useEffect } from 'react';
import { ChatsState, Message } from '../types';

export function useChats() {
  // Load chats from localStorage on mount
  const [chats, setChats] = useState<ChatsState>(() => {
    if (typeof window === 'undefined') return {};
    try {
      return JSON.parse(localStorage.getItem('ontop-ai-chats') || '{}');
    } catch {
      return {};
    }
  });

  // Currently active chat ID
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  // Loading state for API calls
  const [isLoading, setIsLoading] = useState(false);

  // Save chats to localStorage whenever they change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('ontop-ai-chats', JSON.stringify(chats));
    } catch (error) {
      console.error('Error saving chats:', error);
    }
  }, [chats]);

  // Get messages for current chat
  const messages = chats[currentChatId || '']?.messages || [];

  // Get all conversations (filtered and sorted)
  const conversations = Object.entries(chats)
    .map(([id, data]) => ({ id, ...data }))
    .filter((c) => !c.archived)
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || b.id.localeCompare(a.id));

  // Start a new chat
  const startNewChat = () => setCurrentChatId(null);

  // Send a message in current or new chat
  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Create user message
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content,
      timestamp: new Date(),
    };

    let chatId = currentChatId;

    // Create new chat if needed
    if (!chatId) {
      chatId = `chat_${Date.now()}`;
      setCurrentChatId(chatId);
      setChats((prev) => ({
        ...prev,
        [chatId as string]: {
          title: content.substring(0, 30) + (content.length > 30 ? '...' : ''),
          messages: [userMessage],
          pinned: false,
          archived: false,
        },
      }));
    } else {
      // Add message to existing chat
      setChats((prev) => ({
        ...prev,
        [chatId as string]: {
          ...prev[chatId as string],
          messages: [...prev[chatId as string].messages, userMessage],
        },
      }));
    }

    setIsLoading(true);

    try {
      // Simulate API call with realistic responses
      const simulatedResponses = [
        'I understand your query. Based on the available data, I can provide the following insights...',
        'Analyzing the most recent reports, I\'ve identified these key points...',
        'According to our database, here are the results for your request...',
        'Processing your request... I found relevant information that might help...',
        'Based on corporate data, here\'s the analysis you requested...',
      ];

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000));

      const randomResponse = simulatedResponses[Math.floor(Math.random() * simulatedResponses.length)];
      const assistantMessage: Message = {
        id: Date.now(),
        type: 'assistant',
        content: randomResponse,
        timestamp: new Date(),
      };

      // Add assistant response
      setChats((prev) => ({
        ...prev,
        [chatId as string]: {
          ...prev[chatId as string],
          messages: [...prev[chatId as string].messages, assistantMessage],
        },
      }));
    } catch (error) {
      console.error('Failed to get response:', error);
      const errorMessage: Message = {
        id: Date.now(),
        type: 'assistant',
        content: 'Sorry, I couldn\'t get a response. Please try again.',
        timestamp: new Date(),
      };
      setChats((prev) => ({
        ...prev,
        [chatId as string]: {
          ...prev[chatId as string],
          messages: [...prev[chatId as string].messages, errorMessage],
        },
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Rename a chat
  const renameChat = (chatId: string, newTitle: string) => {
    if (newTitle.trim()) {
      setChats((prev) => ({
        ...prev,
        [chatId]: { ...prev[chatId], title: newTitle },
      }));
    }
  };

  // Toggle pin status of a chat
  const togglePin = (chatId: string) => {
    setChats((prev) => ({
      ...prev,
      [chatId]: { ...prev[chatId], pinned: !prev[chatId].pinned },
    }));
  };

  // Delete a chat
  const deleteChat = (chatId: string) => {
    const { [chatId]: _, ...remainingChats } = chats;
    setChats(remainingChats);
    if (currentChatId === chatId) {
      setCurrentChatId(null);
    }
  };

  // Archive a chat
  const archiveChat = (chatId: string) => {
    if (!chatId) return;
    setChats((prev) => ({
      ...prev,
      [chatId]: { ...prev[chatId], archived: true },
    }));
    if (currentChatId === chatId) setCurrentChatId(null);
  };

  // Share chat content (copy to clipboard)
  const shareChat = (chatId: string) => {
    if (!chatId || !chats[chatId]) return false;

    const chatText = chats[chatId].messages
      .map((m) => `${m.type === 'user' ? 'You' : 'OnTop AI'}: ${m.content}`)
      .join('\n');

    try {
      const textArea = document.createElement('textarea');
      textArea.value = chatText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      console.error('Failed to copy text:', err);
      return false;
    }
  };

  return {
    chats,
    currentChatId,
    setCurrentChatId,
    messages,
    conversations,
    isLoading,
    startNewChat,
    sendMessage,
    renameChat,
    togglePin,
    deleteChat,
    archiveChat,
    shareChat,
  };
}
