

import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroActions = () => {
  const { t } = useLanguage();
  
  return (
    <>
      {/* Primary CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up [animation-delay:600ms] opacity-0 [animation-fill-mode:forwards]">
        <Button 
          asChild 
          size="lg" 
          className="text-lg px-8 py-3 bg-accent hover:opacity-90 text-accent-foreground rounded-md font-semibold transition-smooth"
        >
          <Link to="/projects">{t('viewMyWork')}</Link>
        </Button>

        <Button 
          asChild 
          variant="outline" 
          size="lg" 
          className="text-lg px-8 py-3 border border-border bg-background text-foreground hover:bg-secondary rounded-md font-semibold transition-smooth"
        >
          <Link to="/contact">{t('getInTouch')}</Link>
        </Button>

        {/* Download CV CTA */}
        <Button 
          asChild 
          size="lg" 
          className="text-lg px-8 py-3 bg-accent hover:opacity-90 text-accent-foreground rounded-md font-semibold transition-smooth"
        >
          <a href="/cv/my-cv.pdf" download aria-label="Download CV">Download CV</a>
        </Button>
      </div>
      
      {/* Social Links */}
      <div className="flex justify-center space-x-6 mb-16 animate-fade-in-up [animation-delay:800ms] opacity-0 [animation-fill-mode:forwards]">
        <a 
          href="https://github.com" 
          className="text-text-secondary hover:text-accent transition-smooth hover:scale-110 p-2 rounded-lg hover:bg-secondary"
          aria-label="GitHub"
        >
          <Github className="w-6 h-6" />
        </a>
        <a 
          href="https://linkedin.com" 
          className="text-text-secondary hover:text-accent transition-smooth hover:scale-110 p-2 rounded-lg hover:bg-secondary"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-6 h-6" />
        </a>
        <a 
          href="mailto:peter.muraya@example.com" 
          className="text-text-secondary hover:text-accent transition-smooth hover:scale-110 p-2 rounded-lg hover:bg-secondary"
          aria-label="Email"
        >
          <Mail className="w-6 h-6" />
        </a>
      </div>
      
      {/* Scroll indicator */}
      <div className="animate-float">
        <ArrowDown className="w-6 h-6 mx-auto text-text-muted" />
      </div>
    </>
  );
};

export default HeroActions;