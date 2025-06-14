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
  const [voiceSupported, setVoiceSupported] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { announceToScreenReader, voiceEnabled, screenReaderMode } = useAccessibility();
  const { t } = useLanguage();

  // Speech recognition setup
  const recognition = useRef<any>(null);
  const synthesis = useRef<SpeechSynthesis | null>(null);

  // Initialize welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: '1',
      content: `Hello! I'm your AI-powered voice assistant. I can help you navigate Peter's website, answer questions about his work, and provide voice assistance. Try saying 'Navigate to projects' or 'Tell me about Peter's skills'. You can also type your questions. How can I help you today?`,
      role: 'assistant',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  // Initialize speech services
  useEffect(() => {
    // Check for speech synthesis support
    if ('speechSynthesis' in window) {
      synthesis.current = window.speechSynthesis;
      setVoiceSupported(true);
      announceToScreenReader('Voice assistant loaded with text-to-speech support');
    } else {
      announceToScreenReader('Voice assistant loaded without text-to-speech support');
    }

    // Initialize speech recognition
    const initSpeechRecognition = () => {
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        recognition.current = new SpeechRecognition();
        recognition.current.continuous = false;
        recognition.current.interimResults = false;
        recognition.current.lang = 'en-US';
        recognition.current.maxAlternatives = 1;

        recognition.current.onstart = () => {
          setIsListening(true);
          announceToScreenReader('Voice recognition started. Speak now.');
        };

        recognition.current.onresult = (event: any) => {
          if (event.results && event.results[0]) {
            const transcript = event.results[0][0].transcript;
            setInputValue(transcript);
            setIsListening(false);
            announceToScreenReader(`Voice input received: ${transcript}`);
            
            // Auto-send if transcript is clear
            if (transcript.trim().length > 0) {
              setTimeout(() => {
                sendMessage(transcript);
              }, 500);
            }
          }
        };

        recognition.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          let errorMessage = 'Voice recognition error occurred';
          
          switch (event.error) {
            case 'no-speech':
              errorMessage = 'No speech detected. Please try again.';
              break;
            case 'audio-capture':
              errorMessage = 'Microphone not accessible. Please check permissions.';
              break;
            case 'not-allowed':
              errorMessage = 'Microphone permission denied. Please allow microphone access.';
              break;
            case 'network':
              errorMessage = 'Network error occurred during voice recognition.';
              break;
            default:
              errorMessage = `Voice recognition error: ${event.error}`;
          }
          
          announceToScreenReader(errorMessage);
        };

        recognition.current.onend = () => {
          setIsListening(false);
          announceToScreenReader('Voice recognition ended');
        };

        announceToScreenReader('Voice recognition initialized and ready');
      } else {
        announceToScreenReader('Voice recognition not supported in this browser');
      }
    };

    initSpeechRecognition();
  }, [announceToScreenReader]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced text to speech function
  const speakMessage = (text: string) => {
    if (!speechEnabled || !synthesis.current || !voiceEnabled || !voiceSupported) {
      return;
    }

    try {
      // Cancel any ongoing speech
      synthesis.current.cancel();
      setIsSpeaking(false);

      // Clean text for better speech
      const cleanText = text
        .replace(/[^\w\s.,!?;:-]/g, '') // Remove special characters
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();

      if (!cleanText) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 0.85;
      utterance.pitch = 1;
      utterance.volume = 0.9;
      utterance.lang = 'en-US';

      // Enhanced voice selection
      const selectVoice = () => {
        const voices = synthesis.current?.getVoices() || [];
        
        // Prefer high-quality English voices
        const preferredVoice = voices.find(voice => {
          const name = voice.name.toLowerCase();
          const lang = voice.lang.toLowerCase();
          return lang.startsWith('en') && (
            name.includes('google') || 
            name.includes('microsoft') || 
            name.includes('samantha') ||
            name.includes('alex') ||
            voice.default
          );
        }) || voices.find(voice => voice.lang.startsWith('en')) || voices[0];

        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
      };

      utterance.onstart = () => {
        setIsSpeaking(true);
        if (screenReaderMode) {
          announceToScreenReader('Assistant is speaking');
        }
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        if (screenReaderMode) {
          announceToScreenReader('Assistant finished speaking');
        }
      };

      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setIsSpeaking(false);
        announceToScreenReader('Speech synthesis error occurred');
      };

      // Select voice and speak
      if (synthesis.current.getVoices().length > 0) {
        selectVoice();
        synthesis.current.speak(utterance);
      } else {
        // Wait for voices to load
        const handleVoicesChanged = () => {
          selectVoice();
          synthesis.current?.speak(utterance);
          synthesis.current?.removeEventListener('voiceschanged', handleVoicesChanged);
        };
        synthesis.current.addEventListener('voiceschanged', handleVoicesChanged);
      }
    } catch (error) {
      console.error('Speech synthesis error:', error);
      setIsSpeaking(false);
      announceToScreenReader('Unable to speak message');
    }
  };

  // Voice input function
  const startListening = () => {
    if (!recognition.current) {
      announceToScreenReader('Voice recognition not available in this browser');
      return;
    }

    if (isListening) {
      recognition.current.stop();
      return;
    }

    try {
      // Stop any ongoing speech before listening
      if (synthesis.current) {
        synthesis.current.cancel();
      }
      setIsSpeaking(false);
      
      recognition.current.start();
      announceToScreenReader('Listening for voice input. Speak now.');
    } catch (error) {
      console.error('Speech recognition start error:', error);
      announceToScreenReader('Unable to start voice recognition');
    }
  };

  const stopListening = () => {
    if (recognition.current && isListening) {
      recognition.current.stop();
      setIsListening(false);
      announceToScreenReader('Voice recognition stopped');
    }
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
        announceToScreenReader(`Navigating to projects page`);
        return `I'm taking you to the projects page where you can see Peter's portfolio of work.`;
      }
      if (lowerContent.includes('about')) {
        navigate('/about');
        announceToScreenReader(`Navigating to about page`);
        return `I'm taking you to the about page with detailed information about Peter's background and skills.`;
      }
      if (lowerContent.includes('contact')) {
        navigate('/contact');
        announceToScreenReader(`Navigating to contact page`);
        return `I'm taking you to the contact page where you can reach out to Peter.`;
      }
      if (lowerContent.includes('blog')) {
        navigate('/blog');
        announceToScreenReader(`Navigating to blog page`);
        return `I'm taking you to Peter's blog with technical articles and insights.`;
      }
      if (lowerContent.includes('home')) {
        navigate('/');
        announceToScreenReader(`Navigating to home page`);
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

  const handleAction = (action: ChatAction) => {
    if (action.type === 'navigate') {
      navigate(action.data);
      setIsOpen(false);
      announceToScreenReader(`Navigating to ${action.data}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const toggleSpeech = () => {
    const newState = !speechEnabled;
    setSpeechEnabled(newState);
    if (synthesis.current) {
      synthesis.current.cancel();
    }
    setIsSpeaking(false);
    announceToScreenReader(newState ? 'Text-to-speech enabled' : 'Text-to-speech disabled');
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
    if (isSpeaking) return 'Speaking';
    if (isListening) return 'Listening';
    return 'Ready to help';
  };

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
            recognitionAvailable={!!recognition.current}
          />
        </div>
      )}
    </>
  );
};

export default VoiceChatbot;
