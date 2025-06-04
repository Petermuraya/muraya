
import { Card } from '@/components/ui/card';
import { Sparkles, Zap, Target, Brain, Shield, Globe, Cpu, Database, Cloud } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

const FeaturesSection = () => {
  const { t } = useLanguage();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const features = [
    {
      icon: Cpu,
      title: "IoT Architecture Expert",
      description: "5+ years designing scalable IoT ecosystems with edge computing, real-time data processing, and seamless device integration across industries.",
      color: "from-blue-500 to-cyan-500",
      gradient: "from-blue-500/10 to-cyan-500/10",
      stats: "50+ IoT Projects",
      highlight: "Edge Computing"
    },
    {
      icon: Brain,
      title: "AI-Powered Solutions",
      description: "Integrating machine learning and AI into IoT systems for predictive analytics, smart automation, and intelligent decision-making.",
      color: "from-purple-500 to-pink-500",
      gradient: "from-purple-500/10 to-pink-500/10",
      stats: "AI/ML Integration",
      highlight: "Smart Analytics"
    },
    {
      icon: Globe,
      title: "Global Impact Delivery",
      description: "Proven track record in healthcare, agriculture, and smart cities - creating technology solutions that scale globally and drive real change.",
      color: "from-green-500 to-teal-500",
      gradient: "from-green-500/10 to-teal-500/10",
      stats: "3 Continents",
      highlight: "Real Impact"
    }
  ];

  const techStack = [
    { name: "React/TypeScript", icon: Database },
    { name: "Python/Django", icon: Cpu },
    { name: "Azure IoT", icon: Cloud },
    { name: "Firebase", icon: Zap },
    { name: "MongoDB", icon: Database },
    { name: "FastAPI", icon: Sparkles }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#161b22]/50 to-transparent"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/3 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/25 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              <Cpu className="w-8 h-8 text-white relative z-10" />
            </div>
            <div className="text-left">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                Why Choose Me
              </h2>
              <p className="text-blue-400 text-lg font-medium">IoT Solutions Architect</p>
            </div>
          </div>
          
          <p className="text-xl text-[#7d8590] max-w-3xl mx-auto leading-relaxed">
            Transforming industries through cutting-edge IoT innovations, AI integration, and scalable cloud architectures that drive measurable business impact.
          </p>
          
          {/* Animated divider with tech elements */}
          <div className="mt-10 flex justify-center items-center space-x-4">
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
            </div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
        
        {/* Main Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const isHovered = hoveredCard === index;
            
            return (
              <Card 
                key={index} 
                className="group relative p-8 text-center border border-[#30363d] bg-[#0d1117]/90 backdrop-blur-md hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden cursor-pointer"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Dynamic gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Animated border effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                
                {/* Floating elements */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping delay-75"></div>
                  </div>
                </div>
                
                <div className="relative z-10">
                  {/* Icon with enhanced effects */}
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-all duration-300 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                    <IconComponent className="w-10 h-10 text-white relative z-10" />
                    
                    {/* Pulse effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 group-hover:opacity-30 group-hover:scale-150 transition-all duration-700`}></div>
                  </div>
                  
                  {/* Stats badge */}
                  <div className="inline-flex items-center px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-full mb-4 border border-blue-500/30">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {feature.stats}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-[#8b949e] leading-relaxed group-hover:text-[#c9d1d9] transition-colors duration-300 mb-4">
                    {feature.description}
                  </p>
                  
                  {/* Highlight badge */}
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-300 text-sm font-medium rounded-lg border border-blue-500/20 group-hover:border-blue-400/40 transition-all duration-300">
                    <Shield className="w-4 h-4 mr-2" />
                    {feature.highlight}
                  </div>
                </div>
                
                {/* Hover overlay pattern */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" 
                     style={{
                       backgroundImage: `radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), 
                                       radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)`
                     }}
                />
              </Card>
            );
          })}
        </div>
        
        {/* Tech Stack Showcase */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
              Cutting-Edge Tech Stack
            </h3>
            <p className="text-[#7d8590] text-lg">
              Modern tools and frameworks powering next-generation IoT solutions
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {techStack.map((tech, index) => {
              const IconComponent = tech.icon;
              return (
                <div 
                  key={tech.name}
                  className="group relative bg-[#161b22]/50 border border-[#30363d] rounded-xl p-6 text-center hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 text-blue-400" />
                  </div>
                  <span className="text-sm font-medium text-[#c9d1d9] group-hover:text-white transition-colors duration-300">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center space-x-4 p-8 bg-gradient-to-r from-[#161b22]/80 to-[#0d1117]/80 backdrop-blur-md rounded-2xl border border-[#30363d] hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h4 className="text-2xl font-bold text-white mb-2">Ready to Transform Your Ideas?</h4>
              <p className="text-[#8b949e] text-lg">Let's build the next generation of IoT solutions together</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
