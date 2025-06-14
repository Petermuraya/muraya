
interface SpeechServiceOptions {
  onListeningStart?: () => void;
  onListeningEnd?: () => void;
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
  onTranscript?: (transcript: string) => void;
  onError?: (error: string) => void;
  announceToScreenReader?: (message: string) => void;
}

export class SpeechService {
  private recognition: any = null;
  private synthesis: SpeechSynthesis | null = null;
  private options: SpeechServiceOptions;
  private isListening = false;
  private isSpeaking = false;

  constructor(options: SpeechServiceOptions = {}) {
    this.options = options;
    this.initializeSpeechServices();
  }

  private initializeSpeechServices() {
    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      this.synthesis = window.speechSynthesis;
    }

    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';
      this.recognition.maxAlternatives = 1;

      this.recognition.onstart = () => {
        this.isListening = true;
        this.options.onListeningStart?.();
        this.options.announceToScreenReader?.('Voice recognition started. Speak now.');
      };

      this.recognition.onresult = (event: any) => {
        if (event.results && event.results[0]) {
          const transcript = event.results[0][0].transcript;
          this.options.onTranscript?.(transcript);
          this.options.announceToScreenReader?.(`Voice input received: ${transcript}`);
        }
      };

      this.recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        this.isListening = false;
        let errorMessage = 'Voice recognition error occurred';
        
        switch (event.error) {
          case 'no-speech':
            errorMessage = 'No speech detected. Please try again.';
            break;
          case 'audio-capture':
            errorMessage = 'Microphone not accessible. Please check permissions.';
            break;
          case 'not-allowed':
            errorMessage = 'Microphone permission denied. Please allow microphone access.';
            break;
          case 'network':
            errorMessage = 'Network error occurred during voice recognition.';
            break;
          default:
            errorMessage = `Voice recognition error: ${event.error}`;
        }
        
        this.options.onError?.(errorMessage);
        this.options.announceToScreenReader?.(errorMessage);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.options.onListeningEnd?.();
        this.options.announceToScreenReader?.('Voice recognition ended');
      };
    }
  }

  public startListening(): void {
    if (!this.recognition) {
      this.options.onError?.('Voice recognition not available in this browser');
      return;
    }

    if (this.isListening) {
      this.recognition.stop();
      return;
    }

    try {
      if (this.synthesis) {
        this.synthesis.cancel();
      }
      this.isSpeaking = false;
      this.options.onSpeechEnd?.();
      
      this.recognition.start();
      this.options.announceToScreenReader?.('Listening for voice input. Speak now.');
    } catch (error) {
      console.error('Speech recognition start error:', error);
      this.options.onError?.('Unable to start voice recognition');
    }
  }

  public stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
      this.options.announceToScreenReader?.('Voice recognition stopped');
    }
  }

  public speak(text: string, enabled: boolean = true): void {
    if (!enabled || !this.synthesis) {
      return;
    }

    try {
      this.synthesis.cancel();
      this.isSpeaking = false;

      const cleanText = text
        .replace(/[^\w\s.,!?;:-]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      if (!cleanText) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 0.85;
      utterance.pitch = 1;
      utterance.volume = 0.9;
      utterance.lang = 'en-US';

      const selectVoice = () => {
        const voices = this.synthesis?.getVoices() || [];
        const preferredVoice = voices.find(voice => {
          const name = voice.name.toLowerCase();
          const lang = voice.lang.toLowerCase();
          return lang.startsWith('en') && (
            name.includes('google') || 
            name.includes('microsoft') || 
            name.includes('samantha') ||
            name.includes('alex') ||
            voice.default
          );
        }) || voices.find(voice => voice.lang.startsWith('en')) || voices[0];

        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
      };

      utterance.onstart = () => {
        this.isSpeaking = true;
        this.options.onSpeechStart?.();
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        this.options.onSpeechEnd?.();
      };

      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        this.isSpeaking = false;
        this.options.onError?.('Speech synthesis error occurred');
      };

      if (this.synthesis.getVoices().length > 0) {
        selectVoice();
        this.synthesis.speak(utterance);
      } else {
        const handleVoicesChanged = () => {
          selectVoice();
          this.synthesis?.speak(utterance);
          this.synthesis?.removeEventListener('voiceschanged', handleVoicesChanged);
        };
        this.synthesis.addEventListener('voiceschanged', handleVoicesChanged);
      }
    } catch (error) {
      console.error('Speech synthesis error:', error);
      this.isSpeaking = false;
      this.options.onError?.('Unable to speak message');
    }
  }

  public cancelSpeech(): void {
    if (this.synthesis) {
      this.synthesis.cancel();
      this.isSpeaking = false;
      this.options.onSpeechEnd?.();
    }
  }

  public get isRecognitionAvailable(): boolean {
    return !!this.recognition;
  }

  public get isListeningActive(): boolean {
    return this.isListening;
  }

  public get isSpeakingActive(): boolean {
    return this.isSpeaking;
  }

  public get isVoiceSupported(): boolean {
    return 'speechSynthesis' in window;
  }
}
