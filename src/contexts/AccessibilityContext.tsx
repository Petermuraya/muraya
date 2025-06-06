
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityContextType {
  screenReaderMode: boolean;
  highContrast: boolean;
  fontSize: 'normal' | 'large' | 'extra-large';
  voiceEnabled: boolean;
  keyboardNavigation: boolean;
  toggleScreenReader: () => void;
  toggleHighContrast: () => void;
  setFontSize: (size: 'normal' | 'large' | 'extra-large') => void;
  toggleVoice: () => void;
  announceToScreenReader: (message: string) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [screenReaderMode, setScreenReaderMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSizeState] = useState<'normal' | 'large' | 'extra-large'>('normal');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [keyboardNavigation, setKeyboardNavigation] = useState(false);

  // Screen reader announcements
  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  };

  // Keyboard navigation detection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setKeyboardNavigation(true);
      }
    };

    const handleMouseDown = () => {
      setKeyboardNavigation(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  // Apply accessibility styles
  useEffect(() => {
    const root = document.documentElement;
    
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    if (keyboardNavigation) {
      root.classList.add('keyboard-navigation');
    } else {
      root.classList.remove('keyboard-navigation');
    }

    root.setAttribute('data-font-size', fontSize);
  }, [highContrast, keyboardNavigation, fontSize]);

  const toggleScreenReader = () => {
    setScreenReaderMode(!screenReaderMode);
    announceToScreenReader(screenReaderMode ? 'Screen reader mode disabled' : 'Screen reader mode enabled');
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    announceToScreenReader(highContrast ? 'High contrast disabled' : 'High contrast enabled');
  };

  const setFontSize = (size: 'normal' | 'large' | 'extra-large') => {
    setFontSizeState(size);
    announceToScreenReader(`Font size changed to ${size}`);
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    announceToScreenReader(voiceEnabled ? 'Voice assistance disabled' : 'Voice assistance enabled');
  };

  return (
    <AccessibilityContext.Provider value={{
      screenReaderMode,
      highContrast,
      fontSize,
      voiceEnabled,
      keyboardNavigation,
      toggleScreenReader,
      toggleHighContrast,
      setFontSize,
      toggleVoice,
      announceToScreenReader
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};
