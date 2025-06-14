
import React from 'react';
import { Button } from '@/components/ui/button';

interface VoiceChatSuggestionsProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

const VoiceChatSuggestions: React.FC<VoiceChatSuggestionsProps> = ({
  suggestions,
  onSuggestionClick
}) => {
  return (
    <div className="p-3 border-t border-[#30363d]">
      <p className="text-xs text-gray-400 mb-2">Try these voice commands:</p>
      <div className="space-y-1">
        {suggestions.slice(0, 3).map((command, index) => (
          <Button
            key={index}
            onClick={() => onSuggestionClick(command)}
            variant="ghost"
            size="sm"
            className="w-full justify-start text-xs text-gray-300 hover:bg-[#21262d]"
          >
            "{command}"
          </Button>
        ))}
      </div>
    </div>
  );
};

export default VoiceChatSuggestions;
