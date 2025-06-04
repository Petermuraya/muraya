
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Code, Database, Cloud, Brain, Zap, Monitor } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const SkillsSection = () => {
  const { t } = useLanguage();

  const skills = [
    { name: 'Python', icon: Code, color: 'from-blue-500 to-blue-600' },
    { name: 'JavaScript', icon: Code, color: 'from-yellow-500 to-orange-500' },
    { name: 'TypeScript', icon: Code, color: 'from-blue-600 to-indigo-600' },
    { name: 'React', icon: Monitor, color: 'from-cyan-500 to-blue-600' },
    { name: 'Django', icon: Code, color: 'from-green-600 to-teal-600' },
    { name: 'FastAPI', icon: Zap, color: 'from-purple-500 to-pink-600' },
    { name: 'Azure IoT', icon: Cloud, color: 'from-blue-600 to-indigo-600' },
    { name: 'Firebase', icon: Cloud, color: 'from-orange-500 to-red-500' },
    { name: 'MongoDB', icon: Database, color: 'from-green-500 to-lime-600' },
    { name: 'TailwindCSS', icon: Monitor, color: 'from-teal-500 to-cyan-600' },
    { name: 'Next.js', icon: Monitor, color: 'from-gray-700 to-gray-900' },
    { name: 'AI/ML', icon: Brain, color: 'from-purple-600 to-blue-600' }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#161b22]/30 to-transparent"></div>
      
      {/* Futuristic background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 right-32 w-40 h-40 bg-purple-500/5 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Code className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              {t('skillsExpertise')}
            </h2>
          </div>
          <p className="text-xl text-[#7d8590] max-w-2xl mx-auto">{t('technologiesIWork')}</p>
          
          {/* Animated divider */}
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {skills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <div 
                key={skill.name} 
                className="group relative bg-[#0d1117] border border-[#30363d] rounded-2xl p-6 text-center hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient background overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>
                
                {/* Animated border effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 bg-gradient-to-br ${skill.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-sm font-medium text-[#c9d1d9] group-hover:text-white transition-colors duration-300 block">
                    {skill.name}
                  </span>
                </div>
                
                {/* Floating particle effect */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-16">
          <Button asChild size="lg" className="text-lg px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 text-white font-semibold">
            <Link to="/about">{t('learnMoreAboutMe')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
