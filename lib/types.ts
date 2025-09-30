// Type definitions for the entire application

// Supported languages in the app
export type Language = 'EN' | 'PT' | 'ES';

// Message types in chat
export type MessageType = 'user' | 'assistant';

// Individual chat message structure
export interface Message {
  id: number;
  type: MessageType;
  content: string;
  timestamp: Date;
}

// Chat conversation structure
export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  pinned: boolean;
  archived: boolean;
}

// Collection of all chats (keyed by chat ID)
export interface ChatsState {
  [chatId: string]: Omit<Chat, 'id'>;
}

// Project name type
export type Project = string;

// Modal configuration
export interface ModalConfig {
  isOpen: boolean;
  message: string;
  type: 'confirm' | 'info';
  onConfirm: (() => void) | null;
  onCancel?: (() => void) | null;
}

// Language-specific text translations
export interface LanguageTexts {
  typing: string;
  placeholder: string;
  newChat: string;
  chats: string;
  settings: string;
  signOut: string;
  myAccount: string;
  welcome: string;
  suggestions: string;
  online: string;
  share: string;
  addToProject: string;
  archive: string;
  report: string;
  delete: string;
  projects: string;
  newProject: string;
  alerts: string;
  queries: string;
  rename: string;
  pin: string;
  unpin: string;
  addChat: string;
}

// Quick question suggestions by language
export interface QuickQuestions {
  EN: string[];
  PT: string[];
  ES: string[];
}

// Language option in selector
export interface LanguageOption {
  code: Language;
  name: string;
}
