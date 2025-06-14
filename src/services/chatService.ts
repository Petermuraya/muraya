
import { Message } from '@/components/voice-chat/types';

export interface ChatServiceOptions {
  onMessage?: (message: Message) => void;
  onError?: (error: string) => void;
}

export class ChatService {
  private options: ChatServiceOptions;

  constructor(options: ChatServiceOptions = {}) {
    this.options = options;
  }

  private getContextualInfo(): string {
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
  }

  public async sendMessage(content: string, messages: Message[]): Promise<string> {
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
              content: this.getContextualInfo()
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
      return data.choices[0]?.message?.content || "I'm sorry, I couldn't process that request.";

    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error("I'm sorry, I'm having trouble connecting right now. Please try again later.");
    }
  }
}
