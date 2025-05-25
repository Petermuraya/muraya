import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowDown, Code, Github, Linkedin, Mail, Sparkles, Zap, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
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

  const features = [
    {
      icon: Sparkles,
      title: t('aiInnovation'),
      description: t('aiInnovationDesc')
    },
    {
      icon: Zap,
      title: t('iotExcellence'),
      description: t('iotExcellenceDesc')
    },
    {
      icon: Target,
      title: t('globalImpact'),
      description: t('globalImpactDesc')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <Navigation />
      
      {/* Hero Section */}
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

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('whyChooseInnovation')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('drivingTechnological')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 text-center hover-lift border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
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

      {/* Skills Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('skillsExpertise')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">{t('technologiesIWork')}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              'Python', 'JavaScript', 'TypeScript', 'React', 'Django', 'FastAPI',
              'Azure IoT', 'Firebase', 'MongoDB', 'TailwindCSS', 'Next.js', 'SQL'
            ].map((skill, index) => (
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

      <Footer />
    </div>
  );
};

export default Index;
