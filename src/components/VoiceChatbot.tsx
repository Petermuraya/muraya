
import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useVoiceChatbot } from '@/hooks/useVoiceChatbot';

import VoiceChatHeader from './voice-chat/VoiceChatHeader';
import VoiceChatMessages from './voice-chat/VoiceChatMessages';
import VoiceChatInput from './voice-chat/VoiceChatInput';
import VoiceChatSuggestions from './voice-chat/VoiceChatSuggestions';

const VoiceChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { announceToScreenReader } = useAccessibility();
  const { t } = useLanguage();

  const {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    isListening,
    speechEnabled,
    messagesEndRef,
    sendMessage,
    handleAction,
    startListening,
    stopListening,
    toggleSpeech,
    getStatusText,
    recognitionAvailable
  } = useVoiceChatbot();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const voiceCommands = [
    "Navigate to projects",
    "Tell me about Peter",
    "Contact information",
    "Show me Peter's skills",
    "Go to blog",
    "What technologies does Peter use?"
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => {
            const newState = !isOpen;
            setIsOpen(newState);
            announceToScreenReader(newState ? 'Voice assistant opened' : 'Voice assistant closed');
          }}
          size="lg"
          className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105"
          aria-label={isOpen ? 'Close voice assistant' : 'Open voice assistant'}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-6 w-80 sm:w-96 h-[600px] bg-[#0d1117] border border-[#30363d] rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden"
          role="dialog"
          aria-label="Voice Assistant Chat"
          aria-describedby="voice-chat-description"
        >
          <div id="voice-chat-description" className="sr-only">
            Interactive voice assistant for navigating Peter's portfolio website. You can type or speak your questions.
          </div>
          
          <VoiceChatHeader
            speechEnabled={speechEnabled}
            onToggleSpeech={toggleSpeech}
            getStatusText={getStatusText}
          />

          <VoiceChatMessages
            messages={messages}
            isLoading={isLoading}
            onAction={handleAction}
            messagesEndRef={messagesEndRef}
          />

          {/* Voice Commands Suggestions */}
          {messages.length === 1 && (
            <VoiceChatSuggestions
              suggestions={voiceCommands}
              onSuggestionClick={sendMessage}
            />
          )}

          <VoiceChatInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            isListening={isListening}
            onStartListening={startListening}
            onStopListening={stopListening}
            recognitionAvailable={recognitionAvailable}
          />
        </div>
      )}
    </>
  );
};

export default VoiceChatbot;
