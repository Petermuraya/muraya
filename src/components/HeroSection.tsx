
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useRef } from 'react';
import useTypingEffect from '@/hooks/useTypingEffect';

const HeroSection = () => {
  const { t } = useLanguage();
  const typingTextRef = useRef<HTMLParagraphElement>(null);
  
  const typingText = "Passionate about leveraging technology for global development, inclusion, and digital innovation. Specializing in smart agriculture, health tech, and AI-powered solutions.";
  
  const { displayText, isComplete } = useTypingEffect({
    text: typingText,
    speed: 30,
    delay: 2000
  });

  useEffect(() => {
    const handleScroll = () => {
      if (!typingTextRef.current) return;
      
      const rect = typingTextRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      
      // Calculate scroll progress (0 to 1)
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - elementTop) / windowHeight));
      
      // Apply transform based on scroll progress during typing
      if (!isComplete) {
        const translateY = (1 - scrollProgress) * 30;
        const opacity = scrollProgress;
        
        typingTextRef.current.style.transform = `translateY(${translateY}px)`;
        typingTextRef.current.style.opacity = `${opacity}`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isComplete]);

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="mb-8 animate-fade-in">
            <div className="relative inline-block">
              <img 
                src="https://i.postimg.cc/902NmQLh/IMG-20240709-105245-53.jpg" 
                alt="Peter Muraya Ndung'u" 
                className="w-40 h-40 rounded-full mx-auto mb-6 shadow-2xl border-4 border-[#30363d] ring-4 ring-blue-500/20 hover:ring-blue-500/40 transition-all duration-300 hover:scale-105 object-cover"
              />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-[#0d1117] animate-pulse"></div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent mb-6 animate-fade-in-up text-balance leading-tight">
            {t('heroTitle')}
          </h1>
          
          <div className="animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
            <p className="text-xl md:text-2xl text-[#7d8590] mb-4 max-w-3xl mx-auto leading-relaxed font-medium">
              {t('heroSubtitle')}
            </p>
            <p className="text-lg md:text-xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-8 max-w-2xl mx-auto font-medium">
              {t('heroTagline')}
            </p>
          </div>
          
          <p 
            ref={typingTextRef}
            className="text-lg text-[#8b949e] mb-12 max-w-2xl mx-auto leading-relaxed min-h-[3.5rem] transition-all duration-300"
          >
            {displayText}
            {!isComplete && (
              <span className="inline-block w-0.5 h-6 bg-blue-400 ml-1 animate-pulse"></span>
            )}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up [animation-delay:600ms] opacity-0 [animation-fill-mode:forwards]">
            <Button asChild size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border border-blue-500/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-sm">
              <Link to="/projects">{t('viewMyWork')}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 border-2 border-[#30363d] bg-[#21262d]/50 backdrop-blur-sm hover:bg-[#30363d]/50 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-lg text-white">
              <Link to="/contact">{t('getInTouch')}</Link>
            </Button>
          </div>
          
          <div className="flex justify-center space-x-6 mb-16 animate-fade-in-up [animation-delay:800ms] opacity-0 [animation-fill-mode:forwards]">
            <a href="https://github.com" className="text-[#7d8590] hover:text-blue-400 transition-all duration-300 hover:scale-110 hover:-translate-y-1 p-2 rounded-lg hover:bg-[#21262d]/50 backdrop-blur-sm">
              <Github className="w-8 h-8" />
            </a>
            <a href="https://linkedin.com" className="text-[#7d8590] hover:text-blue-400 transition-all duration-300 hover:scale-110 hover:-translate-y-1 p-2 rounded-lg hover:bg-[#21262d]/50 backdrop-blur-sm">
              <Linkedin className="w-8 h-8" />
            </a>
            <a href="mailto:peter.muraya@example.com" className="text-[#7d8590] hover:text-blue-400 transition-all duration-300 hover:scale-110 hover:-translate-y-1 p-2 rounded-lg hover:bg-[#21262d]/50 backdrop-blur-sm">
              <Mail className="w-8 h-8" />
            </a>
          </div>
          
          <div className="animate-bounce [animation-delay:1s]">
            <ArrowDown className="w-6 h-6 mx-auto text-[#7d8590]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
