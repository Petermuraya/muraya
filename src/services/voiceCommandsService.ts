
import { NavigateFunction } from 'react-router-dom';

export interface VoiceCommandsOptions {
  navigate: NavigateFunction;
  announceToScreenReader: (message: string) => void;
}

export class VoiceCommandsService {
  private options: VoiceCommandsOptions;

  constructor(options: VoiceCommandsOptions) {
    this.options = options;
  }

  public processCommand(content: string): string | null {
    const lowerContent = content.toLowerCase();
    
    // Navigation commands
    if (lowerContent.includes('navigate to') || lowerContent.includes('go to')) {
      if (lowerContent.includes('project')) {
        this.options.navigate('/projects');
        this.options.announceToScreenReader('Navigating to projects page');
        return `I'm taking you to the projects page where you can see Peter's portfolio of work.`;
      }
      if (lowerContent.includes('about')) {
        this.options.navigate('/about');
        this.options.announceToScreenReader('Navigating to about page');
        return `I'm taking you to the about page with detailed information about Peter's background and skills.`;
      }
      if (lowerContent.includes('contact')) {
        this.options.navigate('/contact');
        this.options.announceToScreenReader('Navigating to contact page');
        return `I'm taking you to the contact page where you can reach out to Peter.`;
      }
      if (lowerContent.includes('blog')) {
        this.options.navigate('/blog');
        this.options.announceToScreenReader('Navigating to blog page');
        return `I'm taking you to Peter's blog with technical articles and insights.`;
      }
      if (lowerContent.includes('home')) {
        this.options.navigate('/');
        this.options.announceToScreenReader('Navigating to home page');
        return `I'm taking you back to the homepage.`;
      }
    }

    return null;
  }
}
