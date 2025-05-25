
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
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#161b22]/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">{t('skillsExpertise')}</h2>
          <p className="text-xl text-[#7d8590]">{t('technologiesIWork')}</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {skills.map((skill, index) => (
            <div key={skill} className="group bg-[#161b22]/50 backdrop-blur-md p-6 rounded-2xl border border-[#30363d] text-center hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-blue-500/20 shadow-lg">
                <Code className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-[#c9d1d9] group-hover:text-blue-400 transition-colors duration-300">{skill}</span>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline" className="text-lg px-8 py-4 border-2 border-[#30363d] bg-[#21262d]/50 backdrop-blur-sm hover:bg-[#30363d]/50 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-lg text-white">
            <Link to="/about">{t('learnMoreAboutMe')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
