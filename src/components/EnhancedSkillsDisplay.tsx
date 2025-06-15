
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Code, Database, Cloud, Brain, Zap, Monitor, Server, Smartphone } from 'lucide-react';

const EnhancedSkillsDisplay = () => {
  const skillCategories = [
    {
      name: 'Programming Languages',
      icon: Code,
      color: 'from-blue-500 to-blue-600',
      skills: [
        { name: 'Python', level: 95 },
        { name: 'JavaScript/TypeScript', level: 90 },
        { name: 'SQL', level: 85 },
        { name: 'Java', level: 80 },
      ]
    },
    {
      name: 'Frontend Development',
      icon: Monitor,
      color: 'from-green-500 to-green-600',
      skills: [
        { name: 'React/Next.js', level: 90 },
        { name: 'TailwindCSS', level: 88 },
        { name: 'Vue.js', level: 75 },
        { name: 'HTML/CSS', level: 92 },
      ]
    },
    {
      name: 'Backend & APIs',
      icon: Server,
      color: 'from-purple-500 to-purple-600',
      skills: [
        { name: 'Django/FastAPI', level: 85 },
        { name: 'Node.js', level: 80 },
        { name: 'REST APIs', level: 88 },
        { name: 'GraphQL', level: 75 },
      ]
    },
    {
      name: 'Cloud & IoT',
      icon: Cloud,
      color: 'from-cyan-500 to-cyan-600',
      skills: [
        { name: 'Azure IoT', level: 85 },
        { name: 'Firebase', level: 80 },
        { name: 'AWS Services', level: 78 },
        { name: 'Docker', level: 82 },
      ]
    },
    {
      name: 'Database & Storage',
      icon: Database,
      color: 'from-orange-500 to-orange-600',
      skills: [
        { name: 'MongoDB', level: 82 },
        { name: 'PostgreSQL', level: 80 },
        { name: 'Redis', level: 75 },
        { name: 'Supabase', level: 85 },
      ]
    },
    {
      name: 'AI & Machine Learning',
      icon: Brain,
      color: 'from-pink-500 to-pink-600',
      skills: [
        { name: 'TensorFlow', level: 78 },
        { name: 'Scikit-learn', level: 82 },
        { name: 'OpenAI APIs', level: 80 },
        { name: 'Computer Vision', level: 75 },
      ]
    },
    {
      name: 'Mobile Development',
      icon: Smartphone,
      color: 'from-indigo-500 to-indigo-600',
      skills: [
        { name: 'React Native', level: 75 },
        { name: 'Flutter', level: 70 },
        { name: 'Progressive Web Apps', level: 85 },
        { name: 'Mobile UI/UX', level: 80 },
      ]
    },
    {
      name: 'DevOps & Tools',
      icon: Zap,
      color: 'from-yellow-500 to-yellow-600',
      skills: [
        { name: 'Git/GitHub', level: 90 },
        { name: 'CI/CD Pipelines', level: 78 },
        { name: 'Linux/Ubuntu', level: 85 },
        { name: 'Monitoring Tools', level: 75 },
      ]
    }
  ];

  return (
    <div className="mb-20 scroll-animate fade-in-up opacity-0 translate-y-8 transition-all duration-700">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4 scroll-text-effect">
          Technical Expertise
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        <p className="text-lg text-[#7d8590] mt-6 max-w-2xl mx-auto">
          Comprehensive skills across the full technology stack
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 stagger-in">
        {skillCategories.map((category, categoryIndex) => {
          const IconComponent = category.icon;
          return (
            <Card 
              key={category.name} 
              className="p-6 glass-effect border-[#30363d] hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 transform hover:-translate-y-2 slide-in-left opacity-0 -translate-x-full"
              style={{ animationDelay: `${categoryIndex * 200}ms` }}
            >
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center shadow-lg mr-4`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#c9d1d9]">{category.name}</h3>
              </div>
              
              <div className="space-y-4 progress-animate">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-[#c9d1d9]">{skill.name}</span>
                      <span className="text-xs text-[#7d8590]">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-[#21262d] rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${category.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ 
                          width: '0%',
                          transitionDelay: `${(categoryIndex * 200) + (skillIndex * 100)}ms`
                        }}
                        data-progress={skill.level}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default EnhancedSkillsDisplay;
