
import React from 'react';
import { Bot, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface VoiceChatHeaderProps {
  speechEnabled: boolean;
  onToggleSpeech: () => void;
  getStatusText: () => string;
}

const VoiceChatHeader: React.FC<VoiceChatHeaderProps> = ({
  speechEnabled,
  onToggleSpeech,
  getStatusText
}) => {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <div>
            <h3 className="font-semibold">{t('voiceAssistant')}</h3>
            <p className="text-xs opacity-90">
              {getStatusText()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={onToggleSpeech}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
            aria-label={speechEnabled ? t('textToSpeechDisabled') : t('textToSpeechEnabled')}
          >
            {speechEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VoiceChatHeader;
