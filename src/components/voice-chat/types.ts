
export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  actions?: ChatAction[];
}

export interface ChatAction {
  type: 'navigate' | 'scroll' | 'info';
  label: string;
  data: any;
}

export interface VoiceChatProps {
  isOpen: boolean;
  onClose: () => void;
}
