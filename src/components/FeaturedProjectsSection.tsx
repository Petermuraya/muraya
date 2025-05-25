
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const FeaturedProjectsSection = () => {
  const { t } = useLanguage();

  const featuredProjects = [
    {
      title: t('thoraxiqTitle'),
      description: t('thoraxiqDesc'),
      tech: ["Python", "AI/ML", "TensorFlow", "FastAPI"],
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: t('smartAgricultureTitle'), 
      description: t('smartAgricultureDesc'),
      tech: ["Python", "Azure IoT", "React", "MongoDB"],
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: t('healthTechTitle'),
      description: t('healthTechDesc'),
      tech: ["Django", "React", "PostgreSQL", "Firebase"],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">{t('featuredProjects')}</h2>
          <p className="text-xl text-[#7d8590] max-w-2xl mx-auto">
            {t('innovativeSolutions')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <Card key={index} className="group overflow-hidden border border-[#30363d] bg-[#161b22]/50 backdrop-blur-md hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 filter grayscale group-hover:grayscale-0"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                <div className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full shadow-lg animate-pulse"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">{project.title}</h3>
                <p className="text-[#8b949e] mb-4 leading-relaxed group-hover:text-[#c9d1d9] transition-colors duration-300">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span key={tech} className="bg-[#21262d] border border-[#30363d] text-[#c9d1d9] px-3 py-1 rounded-full text-sm font-medium hover:border-blue-500/30 transition-colors duration-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline" className="text-lg px-8 py-4 border-2 border-[#30363d] bg-[#21262d]/50 backdrop-blur-sm hover:bg-[#30363d]/50 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-lg text-white">
            <Link to="/projects">{t('viewAllProjects')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
