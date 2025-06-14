
import React from 'react';
import { Bot } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import VoiceChatMessage from './VoiceChatMessage';
import { Message, ChatAction } from './types';

interface VoiceChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  onAction: (action: ChatAction) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const VoiceChatMessages: React.FC<VoiceChatMessagesProps> = ({
  messages,
  isLoading,
  onAction,
  messagesEndRef
}) => {
  return (
    <ScrollArea className="flex-1 p-4 space-y-4">
      {messages.map((message) => (
        <VoiceChatMessage
          key={message.id}
          message={message}
          onAction={onAction}
        />
      ))}
      
      {isLoading && (
        <div className="flex gap-3" role="status" aria-label="Assistant is thinking">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div className="bg-[#161b22] border border-[#30363d] p-3 rounded-lg">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </ScrollArea>
  );
};

export default VoiceChatMessages;
