
import { useState, useEffect } from 'react';

interface UseTypingEffectProps {
  text: string;
  speed?: number;
  delay?: number;
}

const useTypingEffect = ({ text, speed = 50, delay = 0 }: UseTypingEffectProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Reset state when text changes
    setDisplayText('');
    setCurrentIndex(0);
    setIsComplete(false);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, currentIndex === 0 ? delay : speed);

      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, text, speed, delay]);

  return { displayText, isComplete };
};

export default useTypingEffect;
