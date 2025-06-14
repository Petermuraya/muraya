
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LikeButton from '@/components/LikeButton';
import CommentsSection from '@/components/CommentsSection';
import SEO from '@/components/SEO';
import { Github, Link as LinkIcon, MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  tech: string[];
  github: string;
  demo: string;
  featured: boolean;
  created_at: string;
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
    
    document.documentElement.style.scrollBehavior = 'smooth';
    
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-bg');
      
      parallaxElements.forEach((element) => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        (element as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
    };

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          entry.target.classList.remove('opacity-0');
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.scroll-animate');
    sections.forEach((section) => observer.observe(section));

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch projects",
          variant: "destructive",
        });
        console.error('Error fetching projects:', error);
        return;
      }

      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error",
        description: "Failed to fetch projects",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const categories = ['All', 'Web Development', 'Mobile', 'AI/ML', 'DevOps'];
  
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const toggleComments = (projectIndex: number) => {
    setExpandedProject(expandedProject === projectIndex ? null : projectIndex);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Projects by Peter Muraya Ndung'u",
    "description": "Portfolio of web development, mobile, AI/ML, and DevOps projects showcasing modern technologies and innovative solutions.",
    "url": "https://yourportfolio.com/projects",
    "author": {
      "@type": "Person",
      "name": "Peter Muraya Ndung'u"
    },
    "hasPart": projects.map(project => ({
      "@type": "CreativeWork",
      "name": project.title,
      "description": project.description,
      "creator": {
        "@type": "Person",
        "name": "Peter Muraya Ndung'u"
      }
    }))
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-[#c9d1d9]">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Projects - Peter Muraya Ndung'u | Web Development & IoT Solutions Portfolio"
        description="Explore my portfolio of web development, mobile apps, AI/ML, and DevOps projects. Showcasing innovative solutions built with React, TypeScript, Node.js, and modern technologies."
        keywords="Peter Muraya projects, web development portfolio, React projects, TypeScript projects, IoT projects, cloud solutions portfolio, mobile app development"
        url="https://yourportfolio.com/projects"
        image="https://i.postimg.cc/902NmQLh/IMG-20240709-105245-53.jpg"
        author="Peter Muraya Ndung'u"
        twitterHandle="@petermuraya"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-[#0d1117] text-white overflow-x-hidden">
        {/* Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="parallax-bg absolute inset-0 bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#21262d]"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23f0f6fc&quot; fill-opacity=&quot;0.02&quot;%3E%3Ccircle cx=&quot;7&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        </div>

        {/* Gradient Orbs */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10">
          <Navigation />
          
          <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="text-center mb-16 scroll-animate opacity-0">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">My Projects</h1>
                <p className="text-xl text-[#7d8590] max-w-3xl mx-auto">
                  A collection of projects showcasing my skills in web development, 
                  mobile applications, AI/ML, and DevOps practices
                </p>
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-4 mb-12 scroll-animate opacity-0">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={activeFilter === category ? "default" : "outline"}
                    onClick={() => setActiveFilter(category)}
                    className={`px-6 py-2 transition-all duration-300 ${
                      activeFilter === category 
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 border-0 shadow-lg hover:shadow-blue-500/20" 
                        : "border-[#30363d] bg-[#161b22]/50 backdrop-blur-md hover:bg-[#30363d]/50 hover:border-blue-500/30 text-[#c9d1d9]"
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 scroll-animate opacity-0">
                {filteredProjects.map((project, index) => (
                  <Card key={project.id} className="group overflow-hidden glass-effect border-[#30363d] hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
                    <div className="relative overflow-hidden">
                      {project.image && (
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                      {project.featured && (
                        <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-blue-600 border-0 shadow-lg">
                          Featured
                        </Badge>
                      )}
                      <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-[#c9d1d9] mb-2 group-hover:text-blue-400 transition-colors duration-300">{project.title}</h3>
                      <p className="text-[#8b949e] mb-4 text-sm leading-relaxed">{project.description}</p>
                      
                      {project.tech && project.tech.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tech.map((tech) => (
                            <span key={tech} className="bg-[#161b22] text-[#c9d1d9] px-2 py-1 rounded-md text-xs font-medium border border-[#30363d]">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex gap-3 mb-4">
                        {project.github && (
                          <Button size="sm" variant="outline" className="flex-1 border-[#30363d] bg-[#161b22]/50 backdrop-blur-md hover:bg-[#30363d]/50 hover:border-blue-500/30 text-[#c9d1d9]" asChild>
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4 mr-2" />
                              Code
                            </a>
                          </Button>
                        )}
                        {project.demo && (
                          <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 border-0 shadow-lg hover:shadow-blue-500/20" asChild>
                            <a href={project.demo} target="_blank" rel="noopener noreferrer">
                              <LinkIcon className="w-4 h-4 mr-2" />
                              Demo
                            </a>
                          </Button>
                        )}
                      </div>

                      {/* Like and Comment Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-[#30363d]">
                        <LikeButton itemId={project.id} itemType="project" />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleComments(index)}
                          className="flex items-center gap-2 text-[#c9d1d9] hover:text-blue-400 hover:bg-[#30363d]/50"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Comments
                        </Button>
                      </div>

                      {/* Comments Section */}
                      {expandedProject === index && (
                        <div className="mt-4 pt-4 border-t border-[#30363d]">
                          <CommentsSection itemId={project.id} itemType="project" />
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>

              {filteredProjects.length === 0 && !isLoading && (
                <div className="text-center py-12">
                  <p className="text-xl text-[#7d8590]">No projects found in this category.</p>
                  <p className="text-sm text-[#7d8590] mt-2">Add projects from the admin dashboard to see them here.</p>
                </div>
              )}
            </div>
          </div>
          
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Projects;
