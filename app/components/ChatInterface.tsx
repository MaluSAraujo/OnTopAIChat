// Main chat interface component - orchestrates all other components
'use client';

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import Modal from './Modal';
import { useChats } from '@/lib/hooks/useChats';
import { useProjects } from '@/lib/hooks/useProjects';
import { useLanguage } from '@/lib/hooks/useLanguage';
import { ModalConfig } from '@/lib/types';

export default function ChatInterface() {
  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Modal state
  const [modal, setModal] = useState<ModalConfig>({
    isOpen: false,
    message: '',
    onConfirm: null,
    type: 'info',
  });

  // Counter states (for alerts and queries badges)
  const [alertCount] = useState(0);
  const [queryCount] = useState(0);

  // Custom hooks for state management
  const {
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
  } = useChats();

  const { projects, addProject, renameProject, deleteProject } = useProjects();

  const {
    selectedLanguage,
    setSelectedLanguage,
    currentTexts,
    currentQuickQuestions,
    languages,
  } = useLanguage();

  // Auto-adjust sidebar visibility based on screen size
  useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth >= 1024);
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handler functions for header actions
  const handleShareChat = () => {
    const success = shareChat(currentChatId || '');
    setModal({
      isOpen: true,
      message: success ? 'Chat copied to clipboard!' : 'Failed to copy chat',
      type: 'info',
      onConfirm: () => setModal({ isOpen: false, message: '', onConfirm: null, type: 'info' }),
    });
  };

  const handleArchiveChat = () => {
    archiveChat(currentChatId || '');
    setModal({
      isOpen: true,
      message: 'Chat archived!',
      type: 'info',
      onConfirm: () => setModal({ isOpen: false, message: '', onConfirm: null, type: 'info' }),
    });
  };

  const handleReportChat = () => {
    setModal({
      isOpen: true,
      message: 'Reported!',
      type: 'info',
      onConfirm: () => setModal({ isOpen: false, message: '', onConfirm: null, type: 'info' }),
    });
  };

  const handleDeleteCurrentChat = () => {
    if (!currentChatId) return;
    setModal({
      isOpen: true,
      message: 'Delete current chat?',
      type: 'confirm',
      onConfirm: () => {
        deleteChat(currentChatId);
        setModal({ isOpen: false, message: '', onConfirm: null, type: 'info' });
      },
      onCancel: () => setModal({ isOpen: false, message: '', onConfirm: null, type: 'info' }),
    });
  };

  const handleDeleteChat = (chatId: string) => {
    const chatTitle = conversations.find((c) => c.id === chatId)?.title || 'this chat';
    setModal({
      isOpen: true,
      message: `Delete "${chatTitle}"?`,
      type: 'confirm',
      onConfirm: () => {
        deleteChat(chatId);
        setModal({ isOpen: false, message: '', onConfirm: null, type: 'info' });
      },
      onCancel: () => setModal({ isOpen: false, message: '', onConfirm: null, type: 'info' }),
    });
  };

  const handleDeleteProject = (index: number) => {
    const projectName = projects[index];
    setModal({
      isOpen: true,
      message: `Delete "${projectName}"?`,
      type: 'confirm',
      onConfirm: () => {
        deleteProject(index);
        setModal({ isOpen: false, message: '', onConfirm: null, type: 'info' });
      },
      onCancel: () => setModal({ isOpen: false, message: '', onConfirm: null, type: 'info' }),
    });
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 relative overflow-hidden">
      {/* Modal overlay */}
      {modal.isOpen && (
        <Modal
          message={modal.message}
          type={modal.type}
          onConfirm={modal.onConfirm || (() => {})}
          onCancel={modal.onCancel}
        />
      )}

      {/* Sidebar navigation */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        conversations={conversations}
        currentChatId={currentChatId}
        onChatSelect={setCurrentChatId}
        onNewChat={startNewChat}
        projects={projects}
        onAddProject={addProject}
        onRenameProject={renameProject}
        onDeleteProject={handleDeleteProject}
        onRenameChat={renameChat}
        onTogglePin={togglePin}
        onDeleteChat={handleDeleteChat}
        currentTexts={currentTexts}
        alertCount={alertCount}
        queryCount={queryCount}
      />

      {/* Main content area */}
      <main
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
        }`}
      >
        {/* Top header */}
        <Header
          sidebarOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          languages={languages}
          currentTexts={currentTexts}
          projects={projects}
          onAddProject={addProject}
          onShareChat={handleShareChat}
          onArchiveChat={handleArchiveChat}
          onReportChat={handleReportChat}
          onDeleteChat={handleDeleteCurrentChat}
        />

        {/* Message display area */}
        <MessageList
          messages={messages}
          isLoading={isLoading}
          currentChatId={currentChatId}
          typingText={currentTexts.typing}
          quickQuestions={currentQuickQuestions}
          welcomeText={currentTexts.welcome}
          suggestionsText={currentTexts.suggestions}
          onQuestionClick={sendMessage}
        />

        {/* Bottom input area */}
        <ChatInput
          onSendMessage={sendMessage}
          isLoading={isLoading}
          placeholder={currentTexts.placeholder}
        />
      </main>
    </div>
  );
}
