
import { useRef, useEffect } from 'react';
import useTypingEffect from '@/hooks/useTypingEffect';

interface HeroTypingTextProps {
  isComplete: boolean;
  onComplete: (complete: boolean) => void;
}

const HeroTypingText = ({ isComplete, onComplete }: HeroTypingTextProps) => {
  const typingTextRef = useRef<HTMLParagraphElement>(null);
  
  // Enhanced typing text with code-like structure
  const typingText = "Passionate about leveraging <span class='text-blue-400'>technology</span> for global <span class='text-green-400'>development</span>, <span class='text-purple-400'>inclusion</span>, and digital <span class='text-cyan-400'>innovation</span>. Specializing in smart <span class='text-yellow-400'>agriculture</span>, <span class='text-red-400'>health tech</span>, and <span class='text-pink-400'>AI-powered</span> solutions.";
  
  const { displayText, isComplete: typingComplete } = useTypingEffect({
    text: typingText,
    speed: 30,
    delay: 2000
  });

  useEffect(() => {
    onComplete(typingComplete);
  }, [typingComplete, onComplete]);

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
    <>
      {/* Enhanced Typing Text with Larger Font and Better Visibility */}
      <div className="relative mb-12">
        {/* Extra background blur for text area */}
        <div className="absolute inset-0 bg-[#0d1117]/95 backdrop-blur-md rounded-2xl"></div>
        <p 
          ref={typingTextRef}
          className="relative text-xl md:text-2xl lg:text-3xl text-white mb-0 max-w-4xl mx-auto leading-relaxed min-h-[4rem] md:min-h-[5rem] transition-all duration-300 font-mono border border-[#30363d]/30 rounded-2xl p-8 md:p-10 shadow-2xl"
          dangerouslySetInnerHTML={{ __html: displayText }}
        />
      </div>
      {!isComplete && (
        <div className="flex justify-center mb-12">
          <span className="inline-block w-1 h-8 bg-green-400 animate-pulse"></span>
        </div>
      )}
    </>
  );
};

export default HeroTypingText;
