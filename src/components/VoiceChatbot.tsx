import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Mic, MicOff, Volume2, VolumeX, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  actions?: ChatAction[];
}

interface ChatAction {
  type: 'navigate' | 'scroll' | 'info';
  label: string;
  data: any;
}

const VoiceChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your AI-powered personal assistant. I can help you navigate Peter's website, answer questions about his work, and provide voice assistance. Try saying 'Navigate to projects' or 'Tell me about Peter's skills'. How can I help you today?",
      role: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { announceToScreenReader, voiceEnabled } = useAccessibility();

  // Speech recognition setup
  const recognition = useRef<any>(null);
  const synthesis = useRef<SpeechSynthesis | null>(null);

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
        announceToScreenReader(`Voice input: ${transcript}`);
      };

      recognition.current.onerror = () => {
        setIsListening(false);
        announceToScreenReader('Voice recognition error');
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [announceToScreenReader]);

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
      announceToScreenReader('Voice recognition not supported in this browser');
      return;
    }

    setIsListening(true);
    recognition.current.start();
    announceToScreenReader('Listening for voice input');
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
        announceToScreenReader('Navigating to projects page');
        return "I'm taking you to the projects page where you can see Peter's portfolio of work.";
      }
      if (lowerContent.includes('about')) {
        navigate('/about');
        announceToScreenReader('Navigating to about page');
        return "I'm taking you to the about page with detailed information about Peter's background and skills.";
      }
      if (lowerContent.includes('contact')) {
        navigate('/contact');
        announceToScreenReader('Navigating to contact page');
        return "I'm taking you to the contact page where you can reach out to Peter.";
      }
      if (lowerContent.includes('blog')) {
        navigate('/blog');
        announceToScreenReader('Navigating to blog page');
        return "I'm taking you to Peter's blog with technical articles and insights.";
      }
      if (lowerContent.includes('home')) {
        navigate('/');
        announceToScreenReader('Navigating to home page');
        return "I'm taking you back to the homepage.";
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
    setSpeechEnabled(!speechEnabled);
    if (synthesis.current) {
      synthesis.current.cancel();
    }
    announceToScreenReader(speechEnabled ? 'Text to speech disabled' : 'Text to speech enabled');
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
          onClick={() => setIsOpen(!isOpen)}
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
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                <div>
                  <h3 className="font-semibold">Voice Assistant</h3>
                  <p className="text-xs opacity-90">
                    {isSpeaking ? 'Speaking...' : isListening ? 'Listening...' : 'Ready to help'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={toggleSpeech}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                  aria-label={speechEnabled ? 'Disable text to speech' : 'Enable text to speech'}
                >
                  {speechEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
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
                          onClick={() => handleAction(action)}
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

          {/* Voice Commands Suggestions */}
          {messages.length === 1 && (
            <div className="p-3 border-t border-[#30363d]">
              <p className="text-xs text-gray-400 mb-2">Try these voice commands:</p>
              <div className="space-y-1">
                {voiceCommands.slice(0, 3).map((command, index) => (
                  <Button
                    key={index}
                    onClick={() => sendMessage(command)}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-xs text-gray-300 hover:bg-[#21262d]"
                  >
                    "{command}"
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-[#30363d]">
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
                onClick={isListening ? stopListening : startListening}
                size="sm"
                variant="outline"
                className={cn(
                  "border-[#30363d]",
                  isListening ? "bg-red-600 text-white" : "bg-[#21262d] text-gray-300"
                )}
                disabled={!recognition.current}
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
        </div>
      )}
    </>
  );
};

export default VoiceChatbot;
