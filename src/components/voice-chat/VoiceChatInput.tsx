
import React from 'react';
import { Send, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface VoiceChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  isListening: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  recognitionAvailable: boolean;
}

const VoiceChatInput: React.FC<VoiceChatInputProps> = ({
  inputValue,
  setInputValue,
  onSubmit,
  isLoading,
  isListening,
  onStartListening,
  onStopListening,
  recognitionAvailable
}) => {
  return (
    <form onSubmit={onSubmit} className="p-4 border-t border-[#30363d]">
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask me anything or use voice..."
          className="flex-1 bg-[#161b22] border-[#30363d] text-white placeholder-gray-400"
          disabled={isLoading}
          aria-label="Chat input"
        />
        <Button
          type="button"
          onClick={isListening ? onStopListening : onStartListening}
          size="sm"
          variant="outline"
          className={cn(
            "border-[#30363d]",
            isListening ? "bg-red-600 text-white" : "bg-[#21262d] text-gray-300"
          )}
          disabled={!recognitionAvailable}
          aria-label={isListening ? 'Stop listening' : 'Start voice input'}
        >
          {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </Button>
        <Button 
          type="submit" 
          size="sm" 
          disabled={isLoading || !inputValue.trim()}
          className="bg-blue-600 hover:bg-blue-700"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default VoiceChatInput;
