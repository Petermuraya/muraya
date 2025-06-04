
import { Progress } from '@/components/ui/progress';
import { Code, Database, Cloud, Brain, Zap, Monitor } from 'lucide-react';
import { useState, useEffect } from 'react';

const EnhancedSkillsDisplay = () => {
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});

  const skills = [
    { 
      name: 'Python', 
      level: 95, 
      category: 'Programming Languages',
      icon: Code,
      color: 'from-blue-500 to-blue-600',
      description: 'Advanced scripting & automation'
    },
    { 
      name: 'JavaScript/TypeScript', 
      level: 90, 
      category: 'Programming Languages',
      icon: Code,
      color: 'from-yellow-500 to-orange-500',
      description: 'Modern web development'
    },
    { 
      name: 'SQL', 
      level: 85, 
      category: 'Programming Languages',
      icon: Database,
      color: 'from-green-500 to-emerald-600',
      description: 'Database management & queries'
    },
    { 
      name: 'React/Next.js', 
      level: 90, 
      category: 'Frontend',
      icon: Monitor,
      color: 'from-cyan-500 to-blue-600',
      description: 'Interactive user interfaces'
    },
    { 
      name: 'Django', 
      level: 85, 
      category: 'Backend',
      icon: Code,
      color: 'from-green-600 to-teal-600',
      description: 'Robust web frameworks'
    },
    { 
      name: 'FastAPI', 
      level: 80, 
      category: 'Backend',
      icon: Zap,
      color: 'from-purple-500 to-pink-600',
      description: 'High-performance APIs'
    },
    { 
      name: 'Azure IoT', 
      level: 85, 
      category: 'Cloud & IoT',
      icon: Cloud,
      color: 'from-blue-600 to-indigo-600',
      description: 'Connected device solutions'
    },
    { 
      name: 'Firebase', 
      level: 80, 
      category: 'Cloud & IoT',
      icon: Cloud,
      color: 'from-orange-500 to-red-500',
      description: 'Real-time applications'
    },
    { 
      name: 'MongoDB', 
      level: 75, 
      category: 'Database',
      icon: Database,
      color: 'from-green-500 to-lime-600',
      description: 'NoSQL document storage'
    },
    { 
      name: 'AI/ML', 
      level: 80, 
      category: 'Artificial Intelligence',
      icon: Brain,
      color: 'from-purple-600 to-blue-600',
      description: 'Intelligent algorithms'
    },
    { 
      name: 'TensorFlow', 
      level: 75, 
      category: 'Artificial Intelligence',
      icon: Brain,
      color: 'from-orange-600 to-yellow-500',
      description: 'Deep learning models'
    },
    { 
      name: 'Data Analysis', 
      level: 85, 
      category: 'Data Science',
      icon: Zap,
      color: 'from-indigo-500 to-purple-600',
      description: 'Insights from data'
    },
  ];

  const skillCategories = [...new Set(skills.map(skill => skill.category))];

  useEffect(() => {
    // Animate progress bars on mount
    const timer = setTimeout(() => {
      const animated = skills.reduce((acc, skill) => {
        acc[skill.name] = skill.level;
        return acc;
      }, {} as Record<string, number>);
      setAnimatedValues(animated);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mb-20 scroll-animate opacity-0 relative">
      {/* Futuristic background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-cyan-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <div className="inline-flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
            <Code className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
        </div>
        <p className="text-xl text-[#7d8590] max-w-2xl mx-auto">
          Cutting-edge technologies powering next-generation solutions
        </p>
        
        {/* Animated divider */}
        <div className="mt-8 flex justify-center">
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* Skills Grid */}
      <div className="relative z-10">
        {skillCategories.map((category, categoryIndex) => (
          <div key={category} className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
              <h3 className="text-2xl font-bold text-[#c9d1d9] tracking-wide">{category}</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-[#30363d] to-transparent"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills
                .filter(skill => skill.category === category)
                .map((skill, skillIndex) => {
                  const IconComponent = skill.icon;
                  const animatedValue = animatedValues[skill.name] || 0;
                  
                  return (
                    <div 
                      key={skill.name} 
                      className="group relative bg-[#0d1117] border border-[#30363d] rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden"
                      style={{
                        animationDelay: `${(categoryIndex * 300) + (skillIndex * 100)}ms`
                      }}
                    >
                      {/* Gradient background overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>
                      
                      {/* Animated border effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                      
                      <div className="relative z-10">
                        {/* Icon and title */}
                        <div className="flex items-center space-x-4 mb-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${skill.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-[#c9d1d9] group-hover:text-white transition-colors duration-300">
                              {skill.name}
                            </h4>
                            <p className="text-sm text-[#7d8590] group-hover:text-[#8b949e] transition-colors duration-300">
                              {skill.description}
                            </p>
                          </div>
                        </div>
                        
                        {/* Progress section */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-[#8b949e]">Proficiency</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-[#c9d1d9] group-hover:text-white transition-colors duration-300">
                                {animatedValue}%
                              </span>
                              <div className="flex space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <div 
                                    key={i}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                      i < Math.floor(animatedValue / 20) 
                                        ? `bg-gradient-to-r ${skill.color}` 
                                        : 'bg-[#30363d]'
                                    }`}
                                  ></div>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          {/* Custom progress bar */}
                          <div className="relative">
                            <div className="h-2 bg-[#21262d] rounded-full overflow-hidden">
                              <div 
                                className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
                                style={{ width: `${animatedValue}%` }}
                              >
                                {/* Animated shine effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-pulse"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Floating particles effect */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA section */}
      <div className="mt-16 text-center relative z-10">
        <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full">
          <Zap className="w-5 h-5 text-blue-400" />
          <span className="text-[#c9d1d9] font-medium">Constantly evolving with emerging technologies</span>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSkillsDisplay;
