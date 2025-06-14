
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

  // Check for screen reader presence
  useEffect(() => {
    const detectScreenReader = () => {
      // Check for common screen reader indicators
      const hasScreenReader = 
        navigator.userAgent.includes('NVDA') ||
        navigator.userAgent.includes('JAWS') ||
        navigator.userAgent.includes('VoiceOver') ||
        window.speechSynthesis ||
        document.querySelector('[aria-live]') !== null;
      
      if (hasScreenReader) {
        setScreenReaderMode(true);
      }
    };

    detectScreenReader();
  }, []);

  // Enhanced screen reader announcements
  const announceToScreenReader = (message: string) => {
    console.log('Screen Reader Announcement:', message);
    
    // Method 1: Create temporary aria-live region
    const createAnnouncementElement = () => {
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'assertive');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.setAttribute('role', 'alert');
      announcement.className = 'sr-only';
      announcement.style.position = 'absolute';
      announcement.style.left = '-10000px';
      announcement.style.width = '1px';
      announcement.style.height = '1px';
      announcement.style.overflow = 'hidden';
      announcement.textContent = message;
      
      document.body.appendChild(announcement);
      
      // Remove after screen reader has processed it
      setTimeout(() => {
        if (document.body.contains(announcement)) {
          document.body.removeChild(announcement);
        }
      }, 2000);
    };

    createAnnouncementElement();
    
    // Method 2: Update persistent aria-live region
    const updatePersistentRegion = () => {
      let liveRegion = document.getElementById('screen-reader-announcements');
      if (liveRegion) {
        // Clear and update with slight delay for screen readers to detect change
        liveRegion.textContent = '';
        setTimeout(() => {
          if (liveRegion) {
            liveRegion.textContent = message;
          }
        }, 50);
      }
    };

    updatePersistentRegion();
    
    // Method 3: Voice synthesis (if enabled and available)
    if (voiceEnabled && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel(); // Cancel any ongoing speech
        
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 0.9;
        utterance.lang = 'en-US';
        
        // Wait for voices to be loaded
        const speakWhenReady = () => {
          const voices = window.speechSynthesis.getVoices();
          if (voices.length > 0) {
            // Prefer a clear, natural voice
            const preferredVoice = voices.find(voice => 
              voice.lang.startsWith('en') && 
              (voice.name.includes('Google') || voice.name.includes('Microsoft') || voice.name.includes('Apple'))
            ) || voices[0];
            
            if (preferredVoice) {
              utterance.voice = preferredVoice;
            }
            
            window.speechSynthesis.speak(utterance);
          }
        };

        if (window.speechSynthesis.getVoices().length > 0) {
          speakWhenReady();
        } else {
          window.speechSynthesis.onvoiceschanged = speakWhenReady;
        }
      } catch (error) {
        console.error('Speech synthesis error:', error);
      }
    }
  };

  // Create persistent aria-live region on mount
  useEffect(() => {
    const createPersistentLiveRegion = () => {
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
        liveRegion.style.clip = 'rect(0, 0, 0, 0)';
        liveRegion.style.whiteSpace = 'nowrap';
        liveRegion.style.border = '0';
        document.body.appendChild(liveRegion);
      }
    };

    createPersistentLiveRegion();

    // Announce when accessibility features are loaded
    const announceReady = () => {
      setTimeout(() => {
        announceToScreenReader('Accessibility features loaded and ready. Use Tab to navigate, Space or Enter to activate elements.');
      }, 1500);
    };

    announceReady();

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
        if (screenReaderMode) {
          // Announce tab navigation for screen readers
          const activeElement = document.activeElement;
          if (activeElement && activeElement.tagName) {
            const elementType = activeElement.tagName.toLowerCase();
            const elementText = activeElement.textContent || activeElement.getAttribute('aria-label') || '';
            if (elementText) {
              announceToScreenReader(`Focused on ${elementType}: ${elementText}`);
            }
          }
        }
      }
    };

    const handleMouseDown = () => {
      setKeyboardNavigation(false);
    };

    // Add focus event listener for better screen reader support
    const handleFocus = (e: FocusEvent) => {
      if (screenReaderMode && keyboardNavigation) {
        const target = e.target as HTMLElement;
        if (target && target.getAttribute('aria-label')) {
          announceToScreenReader(target.getAttribute('aria-label') || '');
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('focus', handleFocus, true);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('focus', handleFocus, true);
    };
  }, [screenReaderMode, keyboardNavigation]);

  // Apply accessibility styles and attributes
  useEffect(() => {
    const root = document.documentElement;
    
    // High contrast mode
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Keyboard navigation
    if (keyboardNavigation) {
      root.classList.add('keyboard-navigation');
    } else {
      root.classList.remove('keyboard-navigation');
    }

    // Screen reader mode
    if (screenReaderMode) {
      root.classList.add('screen-reader-mode');
      root.setAttribute('data-screen-reader', 'true');
    } else {
      root.classList.remove('screen-reader-mode');
      root.removeAttribute('data-screen-reader');
    }

    // Font size
    root.setAttribute('data-font-size', fontSize);
    
    // Set CSS custom properties for better control
    root.style.setProperty('--accessibility-focus-width', screenReaderMode ? '4px' : '2px');
    root.style.setProperty('--accessibility-focus-color', screenReaderMode ? '#0066cc' : '#007acc');
  }, [highContrast, keyboardNavigation, fontSize, screenReaderMode]);

  const toggleScreenReader = () => {
    const newMode = !screenReaderMode;
    setScreenReaderMode(newMode);
    const message = newMode 
      ? 'Screen reader mode enabled. Enhanced accessibility features are now active. Use Tab to navigate and Enter or Space to activate elements.' 
      : 'Screen reader mode disabled. Standard navigation restored.';
    
    // Delay announcement to ensure screen reader picks it up
    setTimeout(() => {
      announceToScreenReader(message);
    }, 100);
  };

  const toggleHighContrast = () => {
    const newContrast = !highContrast;
    setHighContrast(newContrast);
    setTimeout(() => {
      announceToScreenReader(newContrast ? 'High contrast mode enabled for better visibility' : 'High contrast mode disabled. Standard colors restored.');
    }, 100);
  };

  const setFontSize = (size: 'normal' | 'large' | 'extra-large') => {
    setFontSizeState(size);
    setTimeout(() => {
      announceToScreenReader(`Font size changed to ${size.replace('-', ' ')} for better readability`);
    }, 100);
  };

  const toggleVoice = () => {
    const newVoice = !voiceEnabled;
    setVoiceEnabled(newVoice);
    
    // Test voice functionality when enabling
    if (newVoice && 'speechSynthesis' in window) {
      setTimeout(() => {
        announceToScreenReader('Voice assistance enabled. Text will now be spoken aloud.');
      }, 100);
    } else if (!newVoice) {
      // Cancel any ongoing speech when disabling
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setTimeout(() => {
        announceToScreenReader('Voice assistance disabled. Text will no longer be spoken.');
      }, 100);
    } else {
      setTimeout(() => {
        announceToScreenReader('Voice assistance not available in this browser.');
      }, 100);
    }
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
