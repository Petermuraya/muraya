

import { useLanguage } from '@/contexts/LanguageContext';

const HeroContent = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <h1 className="h1 mb-6 animate-fade-in-up text-balance text-foreground">
        {t('heroTitle')}
      </h1>
      
      <div className="animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
        <p className="text-lg md:text-xl text-secondary mb-4 max-w-3xl mx-auto leading-relaxed">
          {t('heroSubtitle')}
        </p>
        <p className="text-lg md:text-lg text-accent mb-8 max-w-2xl mx-auto font-semibold">
          {t('heroTagline')}
        </p>
      </div>
    </>
  );
};

export default HeroContent;