
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
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('featuredProjects')}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('innovativeSolutions')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <Card key={index} className="group overflow-hidden hover-lift border-0 shadow-xl bg-white dark:bg-gray-800">
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                <div className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full shadow-lg animate-pulse"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span key={tech} className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline" className="text-lg px-8 py-4 border-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-lg">
            <Link to="/projects">{t('viewAllProjects')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
