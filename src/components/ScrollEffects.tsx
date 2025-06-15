
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const ScrollEffects = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setScrollProgress(scrollPercent);
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800/50 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Scroll Down Indicator */}
      <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-500 ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="flex flex-col items-center animate-bounce">
          <span className="text-white/70 text-sm mb-2">Scroll to explore</span>
          <ChevronDown className="w-6 h-6 text-blue-400" />
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="floating-element absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400/20 rounded-full blur-sm" />
        <div className="floating-element absolute top-1/3 right-1/3 w-6 h-6 bg-purple-400/15 rounded-full blur-sm" />
        <div className="floating-element absolute top-2/3 left-1/5 w-3 h-3 bg-cyan-400/25 rounded-full blur-sm" />
        <div className="floating-element absolute top-3/4 right-1/4 w-5 h-5 bg-green-400/20 rounded-full blur-sm" />
      </div>
    </>
  );
};

export default ScrollEffects;
