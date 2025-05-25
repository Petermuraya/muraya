
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Code } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const SkillsSection = () => {
  const { t } = useLanguage();

  const skills = [
    'Python', 'JavaScript', 'TypeScript', 'React', 'Django', 'FastAPI',
    'Azure IoT', 'Firebase', 'MongoDB', 'TailwindCSS', 'Next.js', 'SQL'
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('skillsExpertise')}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">{t('technologiesIWork')}</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {skills.map((skill, index) => (
            <div key={skill} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center hover-lift group border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Code className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{skill}</span>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline" className="text-lg px-8 py-4 border-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-lg">
            <Link to="/about">{t('learnMoreAboutMe')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
