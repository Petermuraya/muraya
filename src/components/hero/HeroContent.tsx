
import { useLanguage } from '@/contexts/LanguageContext';

const HeroContent = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent mb-6 animate-fade-in-up text-balance leading-tight">
        {t('heroTitle')}
      </h1>
      
      <div className="animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
        <p className="text-xl md:text-2xl text-[#7d8590] mb-4 max-w-3xl mx-auto leading-relaxed font-medium">
          {t('heroSubtitle')}
        </p>
        <p className="text-lg md:text-xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-8 max-w-2xl mx-auto font-medium">
          {t('heroTagline')}
        </p>
      </div>
    </>
  );
};

export default HeroContent;
