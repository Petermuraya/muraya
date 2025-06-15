
import { useEffect, useRef, useState } from 'react';
import HeroBackground from './hero/HeroBackground';
import HeroProfile from './hero/HeroProfile';
import HeroContent from './hero/HeroContent';
import HeroTypingText from './hero/HeroTypingText';
import HeroActions from './hero/HeroActions';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTypingComplete, setIsTypingComplete] = useState(false);

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

  return (
    <section ref={sectionRef} className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <HeroBackground mousePosition={mousePosition} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          <HeroProfile mousePosition={mousePosition} />
          <HeroContent />
          <HeroTypingText 
            isComplete={isTypingComplete} 
            onComplete={setIsTypingComplete} 
          />
          <HeroActions />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
