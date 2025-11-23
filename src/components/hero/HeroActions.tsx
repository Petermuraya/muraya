
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroActions = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up [animation-delay:600ms] opacity-0 [animation-fill-mode:forwards]">
        <Button asChild size="lg" className="text-lg px-8 py-4 bg-[#3A7BFF] hover:bg-[#2f6fe6] text-white rounded-md shadow-md transition-all duration-300">
          <Link to="/projects">{t('viewMyWork')}</Link>
        </Button>

        <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-transparent text-gray-900 dark:text-white rounded-md transition-all duration-300">
          <Link to="/contact">{t('getInTouch')}</Link>
        </Button>

        {/* Download CV CTA */}
        <Button asChild size="lg" className="text-lg px-8 py-4 bg-[#3A7BFF] hover:bg-[#2f6fe6] text-white rounded-md shadow-md transition-all duration-300">
          <a href="/cv/my-cv.pdf" download aria-label="Download CV">Download CV</a>
        </Button>
      </div>
      
      <div className="flex justify-center space-x-6 mb-16 animate-fade-in-up [animation-delay:800ms] opacity-0 [animation-fill-mode:forwards]">
        <a href="https://github.com" className="text-[#7d8590] hover:text-blue-400 transition-all duration-300 hover:scale-110 hover:-translate-y-1 p-2 rounded-lg hover:bg-[#21262d]/50 backdrop-blur-sm">
          <Github className="w-8 h-8" />
        </a>
        <a href="https://linkedin.com" className="text-[#7d8590] hover:text-blue-400 transition-all duration-300 hover:scale-110 hover:-translate-y-1 p-2 rounded-lg hover:bg-[#21262d]/50 backdrop-blur-sm">
          <Linkedin className="w-8 h-8" />
        </a>
        <a href="mailto:peter.muraya@example.com" className="text-[#7d8590] hover:text-blue-400 transition-all duration-300 hover:scale-110 hover:-translate-y-1 p-2 rounded-lg hover:bg-[#21262d]/50 backdrop-blur-sm">
          <Mail className="w-8 h-8" />
        </a>
      </div>
      
      <div className="animate-bounce [animation-delay:1s]">
        <ArrowDown className="w-6 h-6 mx-auto text-[#7d8590]" />
      </div>
    </>
  );
};

export default HeroActions;
