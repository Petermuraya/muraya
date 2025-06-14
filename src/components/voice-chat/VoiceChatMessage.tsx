
import React from 'react';
import { Bot, User, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Message, ChatAction } from './types';

interface VoiceChatMessageProps {
  message: Message;
  onAction: (action: ChatAction) => void;
}

const VoiceChatMessage: React.FC<VoiceChatMessageProps> = ({ message, onAction }) => {
  return (
    <div className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      {message.role === 'assistant' && (
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
          <Bot className="h-4 w-4 text-white" />
        </div>
      )}
      <div className={`max-w-[80%] ${message.role === 'user' ? 'order-last' : ''}`}>
        <div
          className={`p-3 rounded-lg text-sm ${
            message.role === 'user'
              ? 'bg-blue-600 text-white ml-auto'
              : 'bg-[#161b22] text-gray-100 border border-[#30363d]'
          }`}
          role={message.role === 'assistant' ? 'status' : undefined}
          aria-live={message.role === 'assistant' ? 'polite' : undefined}
        >
          {message.content}
        </div>
        
        {/* Action Buttons */}
        {message.actions && message.actions.length > 0 && (
          <div className="mt-2 space-y-1">
            {message.actions.map((action, index) => (
              <Button
                key={index}
                onClick={() => onAction(action)}
                variant="outline"
                size="sm"
                className="w-full text-xs bg-[#21262d] border-[#30363d] text-gray-300 hover:bg-[#30363d]"
              >
                <Navigation className="h-3 w-3 mr-1" />
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
      {message.role === 'user' && (
        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
          <User className="h-4 w-4 text-white" />
        </div>
      )}
    </div>
  );
};

export default VoiceChatMessage;
