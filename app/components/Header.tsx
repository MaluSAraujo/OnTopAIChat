// Top header bar with controls and menus
'use client';

import { useState, useRef, useEffect } from 'react';
import Icon from './Icon';
import { Language, LanguageOption, Project } from '@/lib/types';

interface HeaderProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  selectedLanguage: Language;
  setSelectedLanguage: (lang: Language) => void;
  languages: LanguageOption[];
  currentTexts: any;
  projects: Project[];
  onAddProject: () => void;
  onShareChat: () => void;
  onArchiveChat: () => void;
  onReportChat: () => void;
  onDeleteChat: () => void;
}

export default function Header({
  sidebarOpen,
  toggleSidebar,
  selectedLanguage,
  setSelectedLanguage,
  languages,
  currentTexts,
  projects,
  onAddProject,
  onShareChat,
  onArchiveChat,
  onReportChat,
  onDeleteChat,
}: HeaderProps) {
  const [isMoreMenuOpen, setMoreMenuOpen] = useState(false);
  const [isAddToProjectOpen, setAddToProjectOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setMoreMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="glass-effect border-b border-slate-200 p-4 flex items-center justify-between">
      {/* Left section: Menu button and title */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-600"
        >
          <Icon name="Menu" size={20} />
        </button>
        <h2 className="text-base font-semibold text-purple-600">My Chats</h2>
      </div>

      {/* Right section: Language selector and action buttons */}
      <div className="flex items-center space-x-2">
        {/* Language dropdown */}
        <div className="relative">
          <select
            onChange={(e) => setSelectedLanguage(e.target.value as Language)}
            value={selectedLanguage}
            className="text-sm appearance-none bg-slate-100 border border-slate-200 rounded-md py-1.5 pl-3 pr-8 text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400 select-arrow"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Share button (hidden on mobile) */}
        <button
          onClick={onShareChat}
          className="p-2 hidden md:flex items-center gap-2 hover:bg-slate-100 rounded-lg text-slate-600 text-sm hover-lift"
        >
          <Icon name="Share2" size={16} /> {currentTexts.share}
        </button>

        {/* More options menu */}
        <div className="relative" ref={moreMenuRef}>
          <button
            onClick={() => setMoreMenuOpen(!isMoreMenuOpen)}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-600"
          >
            <Icon name="MoreHorizontal" size={20} />
          </button>

          {/* Dropdown menu */}
          {isMoreMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-20 border border-slate-200">
              {/* Add to project submenu */}
              <div
                onMouseEnter={() => setAddToProjectOpen(true)}
                onMouseLeave={() => setAddToProjectOpen(false)}
                className="relative"
              >
                <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Icon name="FolderPlus" size={16} />
                    {currentTexts.addToProject}
                  </div>
                  <Icon name="ChevronRight" size={16} />
                </button>

                {/* Project list submenu */}
                {isAddToProjectOpen && (
                  <div className="absolute left-full -top-2 w-56 bg-white rounded-lg shadow-xl z-30 border border-slate-200">
                    <button
                      onClick={onAddProject}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center gap-3"
                    >
                      <Icon name="FolderPlus" size={16} />
                      {currentTexts.newProject}
                    </button>
                    <div className="border-t border-slate-200 my-1" />
                    {projects.map((project, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center gap-3"
                      >
                        <Icon name="Folder" size={16} />
                        {project}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Archive button */}
              <button
                onClick={() => {
                  onArchiveChat();
                  setMoreMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center gap-3"
              >
                <Icon name="Archive" size={16} />
                {currentTexts.archive}
              </button>

              {/* Report button */}
              <button
                onClick={() => {
                  onReportChat();
                  setMoreMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center gap-3"
              >
                <Icon name="Flag" size={16} />
                {currentTexts.report}
              </button>

              {/* Delete button */}
              <button
                onClick={() => {
                  onDeleteChat();
                  setMoreMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3"
              >
                <Icon name="Trash2" size={16} />
                {currentTexts.delete}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
