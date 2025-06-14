
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { SpeechService } from '@/services/speechService';
import { ChatService } from '@/services/chatService';
import { VoiceCommandsService } from '@/services/voiceCommandsService';
import { Message, ChatAction } from '@/components/voice-chat/types';

export const useVoiceChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [voiceSupported, setVoiceSupported] = useState(false);
  
  const speechService = useRef<SpeechService | null>(null);
  const chatService = useRef<ChatService | null>(null);
  const voiceCommandsService = useRef<VoiceCommandsService | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const navigate = useNavigate();
  const { announceToScreenReader, voiceEnabled } = useAccessibility();

  // Initialize services
  useEffect(() => {
    speechService.current = new SpeechService({
      onListeningStart: () => setIsListening(true),
      onListeningEnd: () => setIsListening(false),
      onSpeechStart: () => setIsSpeaking(true),
      onSpeechEnd: () => setIsSpeaking(false),
      onTranscript: (transcript) => {
        setInputValue(transcript);
        if (transcript.trim().length > 0) {
          setTimeout(() => {
            sendMessage(transcript);
          }, 500);
        }
      },
      onError: (error) => announceToScreenReader(error),
      announceToScreenReader
    });

    chatService.current = new ChatService();
    
    voiceCommandsService.current = new VoiceCommandsService({
      navigate,
      announceToScreenReader
    });

    setVoiceSupported(speechService.current.isVoiceSupported);

    // Initialize welcome message
    const welcomeMessage: Message = {
      id: '1',
      content: `Hello! I'm your AI-powered voice assistant. I can help you navigate Peter's website, answer questions about his work, and provide voice assistance. Try saying 'Navigate to projects' or 'Tell me about Peter's skills'. You can also type your questions. How can I help you today?`,
      role: 'assistant',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);

    return () => {
      speechService.current?.cancelSpeech();
    };
  }, [navigate, announceToScreenReader]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const detectActions = (response: string, userInput: string): ChatAction[] => {
    const actions: ChatAction[] = [];
    const lowerResponse = response.toLowerCase();
    const lowerInput = userInput.toLowerCase();

    if (lowerResponse.includes('about') || lowerInput.includes('about')) {
      actions.push({
        type: 'navigate',
        label: 'Go to About Page',
        data: '/about'
      });
    }
    if (lowerResponse.includes('project') || lowerInput.includes('project')) {
      actions.push({
        type: 'navigate',
        label: 'View Projects',
        data: '/projects'
      });
    }
    if (lowerResponse.includes('contact') || lowerInput.includes('contact')) {
      actions.push({
        type: 'navigate',
        label: 'Contact Peter',
        data: '/contact'
      });
    }
    if (lowerResponse.includes('blog') || lowerInput.includes('blog')) {
      actions.push({
        type: 'navigate',
        label: 'Read Blog',
        data: '/blog'
      });
    }

    return actions;
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Check for voice commands first
    const commandResponse = voiceCommandsService.current?.processCommand(content);
    if (commandResponse) {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: commandResponse,
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
      
      if (speechEnabled && voiceEnabled) {
        speechService.current?.speak(commandResponse, true);
      }
      return;
    }

    try {
      const aiResponse = await chatService.current!.sendMessage(content, messages);
      const actions = detectActions(aiResponse, content);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date(),
        actions,
      };

      setMessages(prev => [...prev, assistantMessage]);
      announceToScreenReader('Assistant response received');

      if (speechEnabled && voiceEnabled) {
        speechService.current?.speak(aiResponse, true);
      }

    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: error instanceof Error ? error.message : "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      announceToScreenReader('Error occurred while processing request');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = (action: ChatAction) => {
    if (action.type === 'navigate') {
      navigate(action.data);
      announceToScreenReader(`Navigating to ${action.data}`);
    }
  };

  const startListening = () => {
    speechService.current?.startListening();
  };

  const stopListening = () => {
    speechService.current?.stopListening();
  };

  const toggleSpeech = () => {
    const newState = !speechEnabled;
    setSpeechEnabled(newState);
    if (!newState) {
      speechService.current?.cancelSpeech();
    }
    announceToScreenReader(newState ? 'Text-to-speech enabled' : 'Text-to-speech disabled');
  };

  const getStatusText = () => {
    if (isSpeaking) return 'Speaking';
    if (isListening) return 'Listening';
    return 'Ready to help';
  };

  return {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    isListening,
    isSpeaking,
    speechEnabled,
    voiceSupported,
    messagesEndRef,
    sendMessage,
    handleAction,
    startListening,
    stopListening,
    toggleSpeech,
    getStatusText,
    recognitionAvailable: speechService.current?.isRecognitionAvailable ?? false
  };
};
