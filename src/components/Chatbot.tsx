
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';

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

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your AI assistant. I can help you navigate the website, answer questions about Peter's work, projects, and skills. How can I assist you today?",
      role: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getContextualInfo = () => {
    return `
    You are an AI assistant for Peter Muraya Ndung'u's portfolio website. Here's what you need to know:

    ABOUT PETER:
    - IoT & Cloud Solutions Developer
    - Specializes in React, TypeScript, Node.js, and modern web technologies
    - Passionate about technology for global development and digital innovation
    - Focus areas: Smart Agriculture, Health Technology, Global Development

    WEBSITE NAVIGATION:
    - Home (/) - Main landing page with hero section, features, projects, and skills
    - About (/about) - Detailed information about Peter's background, skills, certifications, experience
    - Projects (/projects) - Portfolio of completed projects
    - Blog (/blog) - Technical articles and insights
    - Contact (/contact) - Contact information and form
    - Admin (/admin) - Admin dashboard (private)

    COMMON QUESTIONS TO HELP WITH:
    - What does Peter specialize in?
    - What projects has he worked on?
    - How to contact Peter?
    - Navigation help around the website
    - Technical skills and expertise
    - Experience and background
    - Available for hire/freelance work

    CAPABILITIES:
    - Answer questions about Peter's work and expertise
    - Help navigate to different sections of the website
    - Provide information about projects and skills
    - Assist with contact information
    - Explain technical concepts Peter works with

    Always be helpful, professional, and provide actionable responses. If a user wants to navigate somewhere, suggest it and offer to help them get there.
    `;
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

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer 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`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mixtral-8x7b-32768',
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

      // Detect navigation requests and add action buttons
      const actions = detectActions(aiResponse, content);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date(),
        actions,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const detectActions = (response: string, userInput: string): ChatAction[] => {
    const actions: ChatAction[] = [];
    const lowerResponse = response.toLowerCase();
    const lowerInput = userInput.toLowerCase();

    // Navigation detection
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
    if (lowerResponse.includes('home') || lowerInput.includes('home')) {
      actions.push({
        type: 'navigate',
        label: 'Go to Home',
        data: '/'
      });
    }

    return actions;
  };

  const handleAction = (action: ChatAction) => {
    if (action.type === 'navigate') {
      navigate(action.data);
      setIsOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const quickQuestions = [
    "What does Peter specialize in?",
    "How can I contact Peter?",
    "What projects has Peter worked on?",
    "Tell me about Peter's experience"
  ];

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-[#0d1117] border border-[#30363d] rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <div>
                <h3 className="font-semibold">AI Assistant</h3>
                <p className="text-xs opacity-90">Here to help you navigate</p>
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
              <div className="flex gap-3">
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

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="p-3 border-t border-[#30363d]">
              <p className="text-xs text-gray-400 mb-2">Quick questions:</p>
              <div className="space-y-1">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-xs text-gray-300 hover:bg-[#21262d]"
                  >
                    {question}
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
                placeholder="Ask me anything..."
                className="flex-1 bg-[#161b22] border-[#30363d] text-white placeholder-gray-400"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                size="sm" 
                disabled={isLoading || !inputValue.trim()}
                className="bg-blue-600 hover:bg-blue-700"
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

export default Chatbot;
