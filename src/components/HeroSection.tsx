
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700 -z-10"></div>
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="mb-8 animate-fade-in">
            <div className="relative inline-block">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" 
                alt="Peter Muraya Ndung'u" 
                className="w-40 h-40 rounded-full mx-auto mb-6 shadow-2xl border-4 border-white dark:border-gray-800 ring-4 ring-blue-100 dark:ring-blue-900 hover-lift"
              />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in-up text-balance">
            {t('heroTitle')}
          </h1>
          
          <div className="animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed font-medium">
              {t('heroSubtitle')}
            </p>
            <p className="text-lg md:text-xl text-blue-600 dark:text-blue-400 mb-8 max-w-2xl mx-auto font-medium">
              {t('heroTagline')}
            </p>
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto animate-fade-in-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards] leading-relaxed">
            {t('heroDescription')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up [animation-delay:600ms] opacity-0 [animation-fill-mode:forwards]">
            <Button asChild size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
              <Link to="/projects">{t('viewMyWork')}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 border-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-lg">
              <Link to="/contact">{t('getInTouch')}</Link>
            </Button>
          </div>
          
          <div className="flex justify-center space-x-6 mb-16 animate-fade-in-up [animation-delay:800ms] opacity-0 [animation-fill-mode:forwards]">
            <a href="https://github.com" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110 hover:-translate-y-1">
              <Github className="w-8 h-8" />
            </a>
            <a href="https://linkedin.com" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110 hover:-translate-y-1">
              <Linkedin className="w-8 h-8" />
            </a>
            <a href="mailto:peter.muraya@example.com" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110 hover:-translate-y-1">
              <Mail className="w-8 h-8" />
            </a>
          </div>
          
          <div className="animate-bounce [animation-delay:1s]">
            <ArrowDown className="w-6 h-6 mx-auto text-gray-400" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
