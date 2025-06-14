import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useLanguage } from '@/contexts/LanguageContext';

import VoiceChatHeader from './voice-chat/VoiceChatHeader';
import VoiceChatMessages from './voice-chat/VoiceChatMessages';
import VoiceChatInput from './voice-chat/VoiceChatInput';
import VoiceChatSuggestions from './voice-chat/VoiceChatSuggestions';
import { Message, ChatAction } from './voice-chat/types';

const VoiceChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { announceToScreenReader, voiceEnabled } = useAccessibility();
  const { t } = useLanguage();

  // Speech recognition setup
  const recognition = useRef<any>(null);
  const synthesis = useRef<SpeechSynthesis | null>(null);

  // Initialize welcome message with translation
  useEffect(() => {
    const welcomeMessage: Message = {
      id: '1',
      content: `Hi! I'm your AI-powered personal assistant. I can help you navigate Peter's website, answer questions about his work, and provide voice assistance. Try saying 'Navigate to projects' or 'Tell me about Peter's skills'. How can I help you today?`,
      role: 'assistant',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, [t]);

  useEffect(() => {
    // Initialize speech synthesis
    synthesis.current = window.speechSynthesis;

    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
        announceToScreenReader(`${t('voiceInputReceived')}: ${transcript}`);
      };

      recognition.current.onerror = () => {
        setIsListening(false);
        announceToScreenReader(t('voiceRecognitionError'));
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [announceToScreenReader, t]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Text to speech function
  const speakMessage = (text: string) => {
    if (!speechEnabled || !synthesis.current || !voiceEnabled) return;

    // Cancel any ongoing speech
    synthesis.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Get available voices and prefer a female voice
    const voices = synthesis.current.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Female') || 
      voice.name.includes('Samantha') || 
      voice.name.includes('Karen')
    ) || voices[0];

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthesis.current.speak(utterance);
  };

  // Voice input function
  const startListening = () => {
    if (!recognition.current) {
      announceToScreenReader(t('voiceRecognitionNotSupported'));
      return;
    }

    setIsListening(true);
    recognition.current.start();
    announceToScreenReader(t('listeningForVoiceInput'));
  };

  const stopListening = () => {
    if (recognition.current) {
      recognition.current.stop();
    }
    setIsListening(false);
  };

  const getContextualInfo = () => {
    return `
    You are Peter Muraya's AI personal assistant for his portfolio website. You help users navigate and learn about Peter's work.

    ABOUT PETER:
    - IoT & Cloud Solutions Developer from Nairobi, Kenya
    - Specializes in React, TypeScript, Node.js, Python, Azure IoT, Firebase
    - Focus on smart agriculture, health tech, and global development
    - Currently pursuing BSc Information Technology (graduating September 2025)
    - Working on ThoraxIQ (AI chest X-ray detection system)
    - Contact: sammypeter1944@gmail.com, +254 700 471113

    NAVIGATION COMMANDS:
    - "Navigate to [page]" or "Go to [page]" - Navigate to specific pages
    - "Show me projects" - Go to projects page
    - "Contact Peter" - Go to contact page
    - "About Peter" - Go to about page
    - "Read blog" - Go to blog page
    - "Go home" - Return to homepage

    WEBSITE FEATURES:
    - Accessibility tools for visually impaired users
    - Voice navigation and commands
    - Interactive chatbot assistance
    - Responsive design with dark theme
    - Social media integration

    RESPONSE STYLE:
    - Be conversational and helpful
    - Provide clear, actionable responses
    - Offer navigation suggestions
    - Announce important actions for screen readers
    - Keep responses concise but informative

    ACCESSIBILITY:
    - Always describe actions you're taking
    - Provide clear navigation instructions
    - Announce page changes and important updates
    - Support voice commands for navigation
    `;
  };

  const processVoiceCommand = (content: string) => {
    const lowerContent = content.toLowerCase();
    
    // Navigation commands
    if (lowerContent.includes('navigate to') || lowerContent.includes('go to')) {
      if (lowerContent.includes('project')) {
        navigate('/projects');
        announceToScreenReader(`${t('navigatingTo')} ${t('projects')}`);
        return `I'm taking you to the projects page where you can see Peter's portfolio of work.`;
      }
      if (lowerContent.includes('about')) {
        navigate('/about');
        announceToScreenReader(`${t('navigatingTo')} ${t('about')}`);
        return `I'm taking you to the about page with detailed information about Peter's background and skills.`;
      }
      if (lowerContent.includes('contact')) {
        navigate('/contact');
        announceToScreenReader(`${t('navigatingTo')} ${t('contact')}`);
        return `I'm taking you to the contact page where you can reach out to Peter.`;
      }
      if (lowerContent.includes('blog')) {
        navigate('/blog');
        announceToScreenReader(`${t('navigatingTo')} ${t('blog')}`);
        return `I'm taking you to Peter's blog with technical articles and insights.`;
      }
      if (lowerContent.includes('home')) {
        navigate('/');
        announceToScreenReader(`${t('navigatingTo')} ${t('home')}`);
        return `I'm taking you back to the homepage.`;
      }
    }

    return null;
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
    const commandResponse = processVoiceCommand(content);
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
        speakMessage(commandResponse);
      }
      return;
    }

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer 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`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            {
              role: 'system',
              content: getContextualInfo()
            },
            ...messages.slice(-5).map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            {
              role: 'user',
              content: content
            }
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || "I'm sorry, I couldn't process that request.";

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

      // Speak the response if voice is enabled
      if (speechEnabled && voiceEnabled) {
        speakMessage(aiResponse);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      announceToScreenReader('Error occurred while processing request');
    } finally {
      setIsLoading(false);
    }
  };

  const detectActions = (response: string, userInput: string): ChatAction[] => {
    const actions: ChatAction[] = [];
    const lowerResponse = response.toLowerCase();
    const lowerInput = userInput.toLowerCase();

    if (lowerResponse.includes('about') || lowerInput.includes('about')) {
      actions.push({
        type: 'navigate',
        label: `Go to ${t('about')} Page`,
        data: '/about'
      });
    }
    if (lowerResponse.includes('project') || lowerInput.includes('project')) {
      actions.push({
        type: 'navigate',
        label: `View ${t('projects')}`,
        data: '/projects'
      });
    }
    if (lowerResponse.includes('contact') || lowerInput.includes('contact')) {
      actions.push({
        type: 'navigate',
        label: `${t('contact')} Peter`,
        data: '/contact'
      });
    }
    if (lowerResponse.includes('blog') || lowerInput.includes('blog')) {
      actions.push({
        type: 'navigate',
        label: `Read ${t('blog')}`,
        data: '/blog'
      });
    }

    return actions;
  };

  const handleAction = (action: ChatAction) => {
    if (action.type === 'navigate') {
      navigate(action.data);
      setIsOpen(false);
      announceToScreenReader(`${t('navigatingTo')} ${action.data}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const toggleSpeech = () => {
    setSpeechEnabled(!speechEnabled);
    if (synthesis.current) {
      synthesis.current.cancel();
    }
    announceToScreenReader(speechEnabled ? t('textToSpeechDisabled') : t('textToSpeechEnabled'));
  };

  const voiceCommands = [
    "Navigate to projects",
    "Tell me about Peter",
    "Contact information",
    "Show me Peter's skills",
    "Go to blog",
    "What technologies does Peter use?"
  ];

  const getStatusText = () => {
    if (isSpeaking) return t('speaking');
    if (isListening) return t('listening');
    return t('readyToHelp');
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105"
          aria-label={isOpen ? `Close ${t('voiceAssistant')}` : `Open ${t('voiceAssistant')}`}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-6 w-80 sm:w-96 h-[600px] bg-[#0d1117] border border-[#30363d] rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden"
          role="dialog"
          aria-label={`${t('voiceAssistant')} Chat`}
        >
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
            recognitionAvailable={!!recognition.current}
          />
        </div>
      )}
    </>
  );
};

export default VoiceChatbot;
