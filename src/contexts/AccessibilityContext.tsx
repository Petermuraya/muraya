
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

  // Screen reader announcements with multiple fallback methods
  const announceToScreenReader = (message: string) => {
    console.log('Screen Reader Announcement:', message);
    
    // Method 1: Create aria-live region
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.setAttribute('role', 'status');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
    
    // Method 2: Update existing aria-live region if it exists
    let liveRegion = document.getElementById('screen-reader-announcements');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'screen-reader-announcements';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      document.body.appendChild(liveRegion);
    }
    
    // Clear previous message and set new one
    liveRegion.textContent = '';
    setTimeout(() => {
      liveRegion!.textContent = message;
    }, 100);
    
    // Method 3: If voice is enabled, also speak the message
    if (voiceEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Create persistent aria-live region on mount
  useEffect(() => {
    let liveRegion = document.getElementById('screen-reader-announcements');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'screen-reader-announcements';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.setAttribute('role', 'status');
      liveRegion.className = 'sr-only';
      liveRegion.style.position = 'absolute';
      liveRegion.style.left = '-10000px';
      liveRegion.style.width = '1px';
      liveRegion.style.height = '1px';
      liveRegion.style.overflow = 'hidden';
      document.body.appendChild(liveRegion);
    }

    // Announce when accessibility features are loaded
    setTimeout(() => {
      announceToScreenReader('Accessibility features loaded and ready');
    }, 1000);

    return () => {
      const region = document.getElementById('screen-reader-announcements');
      if (region && document.body.contains(region)) {
        document.body.removeChild(region);
      }
    };
  }, []);

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

    if (screenReaderMode) {
      root.classList.add('screen-reader-mode');
    } else {
      root.classList.remove('screen-reader-mode');
    }

    root.setAttribute('data-font-size', fontSize);
  }, [highContrast, keyboardNavigation, fontSize, screenReaderMode]);

  const toggleScreenReader = () => {
    const newMode = !screenReaderMode;
    setScreenReaderMode(newMode);
    const message = newMode ? 'Screen reader mode enabled. Enhanced accessibility features are now active.' : 'Screen reader mode disabled';
    announceToScreenReader(message);
  };

  const toggleHighContrast = () => {
    const newContrast = !highContrast;
    setHighContrast(newContrast);
    announceToScreenReader(newContrast ? 'High contrast mode enabled for better visibility' : 'High contrast mode disabled');
  };

  const setFontSize = (size: 'normal' | 'large' | 'extra-large') => {
    setFontSizeState(size);
    announceToScreenReader(`Font size changed to ${size} for better readability`);
  };

  const toggleVoice = () => {
    const newVoice = !voiceEnabled;
    setVoiceEnabled(newVoice);
    announceToScreenReader(newVoice ? 'Voice assistance enabled. Text will be spoken aloud.' : 'Voice assistance disabled');
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
