
import { useLanguage } from '@/contexts/LanguageContext';

const SkipLink = () => {
  const { t } = useLanguage();
  
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
                 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 
                 transition-all duration-200 hover:bg-blue-700 focus:outline-none 
                 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {t('skipToMainContent')}
    </a>
  );
};

export default SkipLink;
