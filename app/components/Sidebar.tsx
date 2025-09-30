// Sidebar navigation with chats, projects, and account menu
'use client';

import { useState, useRef, useEffect } from 'react';
import Icon from './Icon';
import { Chat, Project } from '@/lib/types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  conversations: (Chat & { id: string })[];
  currentChatId: string | null;
  onChatSelect: (chatId: string) => void;
  onNewChat: () => void;
  projects: Project[];
  onAddProject: () => void;
  onRenameProject: (index: number, newName: string) => void;
  onDeleteProject: (index: number) => void;
  onRenameChat: (chatId: string, newTitle: string) => void;
  onTogglePin: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
  currentTexts: any;
  alertCount: number;
  queryCount: number;
}

export default function Sidebar({
  isOpen,
  onClose,
  conversations,
  currentChatId,
  onChatSelect,
  onNewChat,
  projects,
  onAddProject,
  onRenameProject,
  onDeleteProject,
  onRenameChat,
  onTogglePin,
  onDeleteChat,
  currentTexts,
  alertCount,
  queryCount,
}: SidebarProps) {
  const [isAccountOpen, setAccountOpen] = useState(false);
  const [renamingChatId, setRenamingChatId] = useState<string | null>(null);
  const [renamingProjectId, setRenamingProjectId] = useState<number | null>(null);
  const [activeChatMenu, setActiveChatMenu] = useState<string | null>(null);
  const [activeProjectMenu, setActiveProjectMenu] = useState<number | null>(null);
  
  const chatMenuRef = useRef<HTMLDivElement>(null);
  const projectMenuRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatMenuRef.current && !chatMenuRef.current.contains(event.target as Node)) {
        setActiveChatMenu(null);
      }
      if (projectMenuRef.current && !projectMenuRef.current.contains(event.target as Node)) {
        setActiveProjectMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`bg-gradient-sidebar text-white transform transition-transform duration-300 ease-in-out fixed inset-y-0 left-0 z-30 w-64 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header with logo and close button */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              OnTop AI
            </h1>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-700 rounded lg:hidden"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 sidebar-scroll">
          {/* New Chat button */}
          <button
            onClick={onNewChat}
            className="w-full flex items-center justify-center gap-2 p-2.5 my-2 bg-gradient-button rounded-lg text-sm font-semibold hover:from-purple-600 hover:to-blue-600 transition-all shadow-md btn-hover"
          >
            <Icon name="Plus" size={16} />
            {currentTexts.newChat}
          </button>

          {/* Navigation sections */}
          <div className="space-y-1 my-4">
            {/* Chats section (active) */}
            <button className="w-full flex items-center justify-between p-2 text-sm rounded-lg bg-purple-500/20 text-white">
              <div className="flex items-center gap-3">
                <Icon name="MessageSquare" size={16} />
                <span>{currentTexts.chats}</span>
              </div>
              <span className="px-2 py-0.5 text-xs font-semibold bg-slate-700 rounded-full">
                {conversations.length}
              </span>
            </button>

            {/* Alerts section */}
            <button className="w-full flex items-center justify-between p-2 text-sm rounded-lg text-gray-300 hover:bg-slate-700/50">
              <div className="flex items-center gap-3">
                <Icon name="Bell" size={16} />
                <span>{currentTexts.alerts}</span>
              </div>
              <span className="px-2 py-0.5 text-xs font-semibold bg-slate-700 rounded-full">
                {alertCount}
              </span>
            </button>

            {/* Queries section */}
            <button className="w-full flex items-center justify-between p-2 text-sm rounded-lg text-gray-300 hover:bg-slate-700/50">
              <div className="flex items-center gap-3">
                <Icon name="Database" size={16} />
                <span>{currentTexts.queries}</span>
              </div>
              <span className="px-2 py-0.5 text-xs font-semibold bg-slate-700 rounded-full">
                {queryCount}
              </span>
            </button>
          </div>

          {/* Projects section */}
          <div className="mb-4">
            <h3 className="px-2 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
              {currentTexts.projects}
            </h3>
            {projects.map((project, index) => (
              <div key={index} className="group relative">
                <button className="w-full flex items-center gap-3 p-2 text-left text-sm text-gray-300 rounded-lg hover:bg-slate-700/50">
                  <Icon name="Folder" size={16} />
                  {renamingProjectId === index ? (
                    <input
                      type="text"
                      defaultValue={project}
                      className="bg-transparent text-white w-full focus:outline-none"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          onRenameProject(index, e.currentTarget.value);
                          setRenamingProjectId(null);
                        }
                        if (e.key === 'Escape') setRenamingProjectId(null);
                      }}
                      onBlur={(e) => {
                        onRenameProject(index, e.currentTarget.value);
                        setRenamingProjectId(null);
                      }}
                    />
                  ) : (
                    <span className="flex-1 truncate">{project}</span>
                  )}
                </button>

                {/* Project action menu */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() =>
                      setActiveProjectMenu(activeProjectMenu === index ? null : index)
                    }
                    className="p-1 rounded-md hover:bg-slate-600"
                  >
                    <Icon name="MoreHorizontal" size={16} />
                  </button>
                  {activeProjectMenu === index && (
                    <div
                      ref={projectMenuRef}
                      className="absolute right-0 bottom-full mb-1 w-36 bg-slate-800 rounded-md shadow-lg z-10 border border-slate-700"
                    >
                      <button
                        onClick={() => {
                          setActiveProjectMenu(null);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-gray-300 hover:bg-slate-700 flex items-center gap-2"
                      >
                        <Icon name="Plus" size={14} />
                        {currentTexts.addChat}
                      </button>
                      <button
                        onClick={() => {
                          setRenamingProjectId(index);
                          setActiveProjectMenu(null);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-gray-300 hover:bg-slate-700 flex items-center gap-2"
                      >
                        <Icon name="Edit" size={14} />
                        {currentTexts.rename}
                      </button>
                      <button
                        onClick={() => {
                          onDeleteProject(index);
                          setActiveProjectMenu(null);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-red-400 hover:bg-slate-700 flex items-center gap-2"
                      >
                        <Icon name="Trash2" size={14} />
                        {currentTexts.delete}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Chat conversations list */}
          <div>
            {conversations.map((conv) => (
              <div key={conv.id} className="group relative">
                <button
                  onClick={() => onChatSelect(conv.id)}
                  className={`w-full flex items-center gap-2 text-left p-2 text-sm truncate transition-all rounded-lg ${
                    currentChatId === conv.id
                      ? 'bg-slate-700'
                      : 'text-gray-300 hover:bg-slate-700/50'
                  }`}
                >
                  {conv.pinned && (
                    <Icon name="Pin" size={14} className="text-purple-400 flex-shrink-0" />
                  )}
                  {renamingChatId === conv.id ? (
                    <input
                      type="text"
                      defaultValue={conv.title}
                      className="bg-transparent text-white w-full focus:outline-none"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          onRenameChat(conv.id, e.currentTarget.value);
                          setRenamingChatId(null);
                        }
                        if (e.key === 'Escape') setRenamingChatId(null);
                      }}
                      onBlur={(e) => {
                        onRenameChat(conv.id, e.currentTarget.value);
                        setRenamingChatId(null);
                      }}
                    />
                  ) : (
                    <span className="flex-1 truncate">{conv.title}</span>
                  )}
                </button>

                {/* Chat action menu */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() =>
                      setActiveChatMenu(activeChatMenu === conv.id ? null : conv.id)
                    }
                    className="p-1 rounded-md hover:bg-slate-600"
                  >
                    <Icon name="MoreHorizontal" size={16} />
                  </button>
                  {activeChatMenu === conv.id && (
                    <div
                      ref={chatMenuRef}
                      className="absolute right-0 bottom-full mb-1 w-36 bg-slate-800 rounded-md shadow-lg z-10 border border-slate-700"
                    >
                      <button
                        onClick={() => {
                          setRenamingChatId(conv.id);
                          setActiveChatMenu(null);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-gray-300 hover:bg-slate-700 flex items-center gap-2"
                      >
                        <Icon name="Edit" size={14} />
                        {currentTexts.rename}
                      </button>
                      <button
                        onClick={() => {
                          onTogglePin(conv.id);
                          setActiveChatMenu(null);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-gray-300 hover:bg-slate-700 flex items-center gap-2"
                      >
                        <Icon name="Pin" size={14} />
                        {conv.pinned ? currentTexts.unpin : currentTexts.pin}
                      </button>
                      <button
                        onClick={() => {
                          onDeleteChat(conv.id);
                          setActiveChatMenu(null);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-red-400 hover:bg-slate-700 flex items-center gap-2"
                      >
                        <Icon name="Trash2" size={14} />
                        {currentTexts.delete}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Account menu at bottom */}
        <div className="p-4 mt-auto border-t border-slate-700/50">
          <button
            onClick={() => setAccountOpen(!isAccountOpen)}
            className="w-full flex items-center justify-between p-2 hover:bg-slate-700/50 rounded-lg text-left text-sm"
          >
            <div className="flex items-center">
              <Icon name="User" size={16} className="mr-3 text-gray-400" />
              {currentTexts.myAccount}
            </div>
            <Icon
              name="ChevronDown"
              size={16}
              className={`transition-transform ${isAccountOpen ? 'rotate-180' : ''}`}
            />
          </button>
          {isAccountOpen && (
            <div className="pl-5 pt-2 space-y-2">
              <button className="w-full flex items-center p-2 hover:bg-slate-700/50 rounded-lg text-left text-sm">
                <Icon name="Settings" size={16} className="mr-3 text-gray-400" />
                {currentTexts.settings}
              </button>
              <button className="w-full flex items-center p-2 hover:bg-red-800/50 rounded-lg text-left text-sm text-red-400">
                <Icon name="LogOut" size={16} className="mr-3" />
                {currentTexts.signOut}
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
