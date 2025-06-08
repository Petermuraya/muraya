
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Type, Volume2, VolumeX, Palette, Keyboard } from 'lucide-react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const AccessibilityToolbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    screenReaderMode,
    highContrast,
    fontSize,
    voiceEnabled,
    toggleScreenReader,
    toggleHighContrast,
    setFontSize,
    toggleVoice,
    announceToScreenReader
  } = useAccessibility();
  const { t } = useLanguage();

  const handleToolbarToggle = () => {
    setIsOpen(!isOpen);
    announceToScreenReader(isOpen ? t('accessibilityToolbarClosed') : t('accessibilityToolbarOpened'));
  };

  return (
    <>
      {/* Accessibility Button */}
      <Button
        onClick={handleToolbarToggle}
        className="fixed top-20 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"
        aria-label={t('openAccessibilityToolbar')}
        title={t('accessibilityOptions')}
      >
        <Eye className="w-5 h-5" />
      </Button>

      {/* Accessibility Toolbar */}
      {isOpen && (
        <div className="fixed top-32 right-4 z-50 bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-xl w-80">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">{t('accessibilityOptions')}</h3>
            <Button
              onClick={handleToolbarToggle}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
              aria-label={t('closeAccessibilityToolbar')}
            >
              ×
            </Button>
          </div>

          <div className="space-y-3">
            {/* Screen Reader Mode */}
            <div className="flex items-center justify-between">
              <label className="text-gray-300 text-sm">{t('screenReaderMode')}</label>
              <Button
                onClick={toggleScreenReader}
                variant="outline"
                size="sm"
                className={cn(
                  "ml-2",
                  screenReaderMode ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
                )}
                aria-label={`${screenReaderMode ? 'Disable' : 'Enable'} ${t('screenReaderMode')}`}
              >
                {screenReaderMode ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </Button>
            </div>

            {/* High Contrast */}
            <div className="flex items-center justify-between">
              <label className="text-gray-300 text-sm">{t('highContrast')}</label>
              <Button
                onClick={toggleHighContrast}
                variant="outline"
                size="sm"
                className={cn(
                  "ml-2",
                  highContrast ? "bg-yellow-600 text-black" : "bg-gray-700 text-gray-300"
                )}
                aria-label={`${highContrast ? 'Disable' : 'Enable'} ${t('highContrast')}`}
              >
                <Palette className="w-4 h-4" />
              </Button>
            </div>

            {/* Font Size */}
            <div className="space-y-2">
              <label className="text-gray-300 text-sm">{t('fontSize')}</label>
              <div className="flex space-x-2">
                {(['normal', 'large', 'extra-large'] as const).map((size) => (
                  <Button
                    key={size}
                    onClick={() => setFontSize(size)}
                    variant="outline"
                    size="sm"
                    className={cn(
                      fontSize === size ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
                    )}
                    aria-label={`Set font size to ${size}`}
                  >
                    <Type className={cn(
                      "w-4 h-4",
                      size === 'large' && "w-5 h-5",
                      size === 'extra-large' && "w-6 h-6"
                    )} />
                  </Button>
                ))}
              </div>
            </div>

            {/* Voice Assistance */}
            <div className="flex items-center justify-between">
              <label className="text-gray-300 text-sm">{t('voiceAssistance')}</label>
              <Button
                onClick={toggleVoice}
                variant="outline"
                size="sm"
                className={cn(
                  "ml-2",
                  voiceEnabled ? "bg-green-600 text-white" : "bg-gray-700 text-gray-300"
                )}
                aria-label={`${voiceEnabled ? 'Disable' : 'Enable'} ${t('voiceAssistance')}`}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
            </div>

            {/* Keyboard Navigation Info */}
            <div className="pt-2 border-t border-gray-700">
              <div className="flex items-center space-x-2 text-gray-400 text-xs">
                <Keyboard className="w-4 h-4" />
                <span>{t('keyboardNavigation')}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccessibilityToolbar;
