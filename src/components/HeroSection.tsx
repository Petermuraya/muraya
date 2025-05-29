
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useRef, useState } from 'react';
import useTypingEffect from '@/hooks/useTypingEffect';

const HeroSection = () => {
  const { t } = useLanguage();
  const typingTextRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const typingText = "Passionate about leveraging technology for global development, inclusion, and digital innovation. Specializing in smart agriculture, health tech, and AI-powered solutions.";
  
  const { displayText, isComplete } = useTypingEffect({
    text: typingText,
    speed: 30,
    delay: 2000
  });

  // IoT background images
  const iotImages = [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', // circuit board
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', // programming monitor
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', // laptop computer
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', // abstract tech
    'https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80' // server room
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  useEffect(() => {
    // Auto-rotate background images
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % iotImages.length);
    }, 8000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, [iotImages.length]);

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
    <section ref={sectionRef} className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Multiple IoT Background Images with Transitions */}
      <div className="absolute inset-0 z-0">
        {iotImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-[3000ms] ease-in-out ${
              index === currentImageIndex ? 'opacity-45' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url('${image}')`,
              transform: `translate3d(${(mousePosition.x - 0.5) * 20}px, ${(mousePosition.y - 0.5) * 20}px, 0) scale(1.1)`,
              transition: 'opacity 3s ease-in-out, transform 0.3s ease-out'
            }}
          ></div>
        ))}
        
        {/* Enhanced gradient overlay for better text readability */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#0d1117]/85 via-[#161b22]/80 to-[#21262d]/85"
          style={{
            transform: `translate3d(${(mousePosition.x - 0.5) * -10}px, ${(mousePosition.y - 0.5) * -10}px, 0)`,
            transition: 'transform 0.5s ease-out'
          }}
        ></div>
      </div>

      {/* Enhanced Circuit pattern overlay with cursor movement */}
      <div 
        className="absolute inset-0 z-1 opacity-25"
        style={{
          transform: `translate3d(${(mousePosition.x - 0.5) * 15}px, ${(mousePosition.y - 0.5) * 15}px, 0)`,
          transition: 'transform 0.4s ease-out'
        }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;100&quot; height=&quot;100&quot; viewBox=&quot;0 0 100 100&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%2300D4FF&quot; fill-opacity=&quot;0.5&quot;%3E%3Cpath d=&quot;M20,20 L80,20 M20,20 L20,80 M20,80 L80,80 M80,20 L80,80 M40,40 L60,40 M40,40 L40,60 M40,60 L60,60 M60,40 L60,60&quot; stroke=&quot;%2300D4FF&quot; stroke-width=&quot;0.5&quot;/%3E%3Ccircle cx=&quot;20&quot; cy=&quot;20&quot; r=&quot;2&quot;/%3E%3Ccircle cx=&quot;80&quot; cy=&quot;20&quot; r=&quot;2&quot;/%3E%3Ccircle cx=&quot;20&quot; cy=&quot;80&quot; r=&quot;2&quot;/%3E%3Ccircle cx=&quot;80&quot; cy=&quot;80&quot; r=&quot;2&quot;/%3E%3Ccircle cx=&quot;50&quot; cy=&quot;50&quot; r=&quot;3&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 z-1">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              transform: `translate3d(${(mousePosition.x - 0.5) * 30}px, ${(mousePosition.y - 0.5) * 30}px, 0)`,
              transition: 'transform 0.6s ease-out'
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          <div className="mb-8 animate-fade-in">
            <div className="relative inline-block">
              <img 
                src="https://i.postimg.cc/902NmQLh/IMG-20240709-105245-53.jpg" 
                alt="Peter Muraya Ndung'u" 
                className="w-40 h-40 rounded-full mx-auto mb-6 shadow-2xl border-4 border-[#30363d] ring-4 ring-blue-500/20 hover:ring-blue-500/40 transition-all duration-300 hover:scale-105 object-cover"
                style={{
                  transform: `translate3d(${(mousePosition.x - 0.5) * 5}px, ${(mousePosition.y - 0.5) * 5}px, 0)`,
                  transition: 'transform 0.3s ease-out'
                }}
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
