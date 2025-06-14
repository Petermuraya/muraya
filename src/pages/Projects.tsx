
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LikeButton from '@/components/LikeButton';
import CommentsSection from '@/components/CommentsSection';
import SEO from '@/components/SEO';
import { Github, Link as LinkIcon, MessageCircle, Search, Filter, Star, Calendar, Tag } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'featured'>('newest');
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
  
  const categories = ['All', 'Web Development', 'Mobile', 'AI/ML', 'DevOps', 'IoT'];
  
  const filteredAndSortedProjects = projects
    .filter(project => {
      const matchesCategory = activeFilter === 'All' || project.category === activeFilter;
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.tech?.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'featured':
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'newest':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

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

        {/* Enhanced Gradient Orbs */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
          <div className="absolute top-1/6 right-1/6 w-64 h-64 bg-cyan-500/8 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10">
          <Navigation />
          
          <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {/* Enhanced Header */}
              <div className="text-center mb-16 scroll-animate opacity-0">
                <div className="inline-flex items-center gap-2 bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full px-6 py-2 mb-6">
                  <Star className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-300">Portfolio Showcase</span>
                </div>
                <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-gray-300 bg-clip-text text-transparent mb-6">
                  My Projects
                </h1>
                <p className="text-xl text-[#7d8590] max-w-3xl mx-auto leading-relaxed">
                  A curated collection of projects showcasing expertise in web development, 
                  mobile applications, AI/ML solutions, and modern DevOps practices
                </p>
                <div className="flex items-center justify-center gap-6 mt-8 text-sm text-[#8b949e]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>{projects.length} Projects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span>{projects.filter(p => p.featured).length} Featured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <span>{categories.length - 1} Categories</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Search and Filter Section */}
              <div className="mb-12 scroll-animate opacity-0">
                <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
                  {/* Search Bar */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7d8590] w-4 h-4" />
                    <Input
                      placeholder="Search projects, technologies..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-[#161b22]/80 backdrop-blur-md border-[#30363d] text-white placeholder-[#7d8590] focus:border-blue-500/50 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Sort Options */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-sm text-[#c9d1d9]">
                      <Filter className="w-4 h-4" />
                      <span>Sort by:</span>
                    </div>
                    <div className="flex gap-2">
                      {[
                        { key: 'newest', label: 'Newest', icon: Calendar },
                        { key: 'featured', label: 'Featured', icon: Star },
                        { key: 'oldest', label: 'Oldest', icon: Calendar }
                      ].map(({ key, label, icon: Icon }) => (
                        <Button
                          key={key}
                          variant={sortBy === key ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSortBy(key as typeof sortBy)}
                          className={`transition-all duration-300 ${
                            sortBy === key 
                              ? "bg-gradient-to-r from-blue-500 to-blue-600 border-0 shadow-lg" 
                              : "border-[#30363d] bg-[#161b22]/50 backdrop-blur-md hover:bg-[#30363d]/50 hover:border-blue-500/30 text-[#c9d1d9]"
                          }`}
                        >
                          <Icon className="w-3 h-3 mr-1" />
                          {label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Enhanced Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-3">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={activeFilter === category ? "default" : "outline"}
                      onClick={() => setActiveFilter(category)}
                      className={`px-6 py-3 transition-all duration-300 ${
                        activeFilter === category 
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 border-0 shadow-lg hover:shadow-blue-500/20 scale-105" 
                          : "border-[#30363d] bg-[#161b22]/50 backdrop-blur-md hover:bg-[#30363d]/50 hover:border-blue-500/30 text-[#c9d1d9] hover:scale-105"
                      }`}
                    >
                      <Tag className="w-4 h-4 mr-2" />
                      {category}
                      {category !== 'All' && (
                        <Badge variant="secondary" className="ml-2 bg-[#21262d] text-[#c9d1d9] text-xs">
                          {projects.filter(p => p.category === category).length}
                        </Badge>
                      )}
                    </Button>
                  ))}
                </div>

                {/* Results Counter */}
                {(searchQuery || activeFilter !== 'All') && (
                  <div className="text-center mt-4">
                    <p className="text-sm text-[#7d8590]">
                      Showing <span className="text-blue-400 font-semibold">{filteredAndSortedProjects.length}</span> 
                      {searchQuery && ` results for "${searchQuery}"`}
                      {activeFilter !== 'All' && ` in ${activeFilter}`}
                    </p>
                  </div>
                )}
              </div>

              {/* Enhanced Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 scroll-animate opacity-0">
                {filteredAndSortedProjects.map((project, index) => (
                  <Card key={project.id} className="group overflow-hidden glass-effect border-[#30363d] hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-500/20 relative">
                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4 z-10">
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 border-0 shadow-lg animate-pulse">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}
                    
                    <div className="relative overflow-hidden">
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 filter grayscale group-hover:grayscale-0"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-[#21262d] to-[#30363d] flex items-center justify-center">
                          <div className="text-[#7d8590] text-center">
                            <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-[#30363d] flex items-center justify-center">
                              <LinkIcon className="w-8 h-8" />
                            </div>
                            <p className="text-sm">Project Preview</p>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Project Stats Overlay */}
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        <div className="flex items-center justify-between text-white text-sm">
                          <span className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                            {new Date(project.created_at).getFullYear()}
                          </span>
                          <div className="flex gap-2">
                            {project.github && (
                              <div className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                                <Github className="w-4 h-4" />
                              </div>
                            )}
                            {project.demo && (
                              <div className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                                <LinkIcon className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-semibold text-[#c9d1d9] group-hover:text-blue-400 transition-colors duration-300 line-clamp-1">
                          {project.title}
                        </h3>
                        <Badge variant="outline" className="border-[#30363d] text-[#7d8590] text-xs shrink-0 ml-2">
                          {project.category}
                        </Badge>
                      </div>
                      
                      <p className="text-[#8b949e] mb-4 text-sm leading-relaxed group-hover:text-[#c9d1d9] transition-colors duration-300 line-clamp-3">
                        {project.description}
                      </p>
                      
                      {/* Tech Stack */}
                      {project.tech && project.tech.length > 0 && (
                        <div className="mb-6">
                          <div className="flex flex-wrap gap-2">
                            {project.tech.slice(0, 4).map((tech) => (
                              <span key={tech} className="bg-[#161b22] text-[#c9d1d9] px-3 py-1 rounded-full text-xs font-medium border border-[#30363d] hover:border-blue-500/30 transition-colors duration-300">
                                {tech}
                              </span>
                            ))}
                            {project.tech.length > 4 && (
                              <span className="bg-[#161b22] text-[#7d8590] px-3 py-1 rounded-full text-xs font-medium border border-[#30363d]">
                                +{project.tech.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Action Buttons */}
                      <div className="flex gap-3 mb-4">
                        {project.github && (
                          <Button size="sm" variant="outline" className="flex-1 border-[#30363d] bg-[#161b22]/50 backdrop-blur-md hover:bg-[#30363d]/50 hover:border-blue-500/30 text-[#c9d1d9] transition-all duration-300 hover:scale-105" asChild>
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4 mr-2" />
                              Code
                            </a>
                          </Button>
                        )}
                        {project.demo && (
                          <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 border-0 shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105" asChild>
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
                          className="flex items-center gap-2 text-[#c9d1d9] hover:text-blue-400 hover:bg-[#30363d]/50 transition-all duration-300"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Comments
                        </Button>
                      </div>

                      {/* Comments Section */}
                      {expandedProject === index && (
                        <div className="mt-4 pt-4 border-t border-[#30363d] animate-fade-in">
                          <CommentsSection itemId={project.id} itemType="project" />
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>

              {/* Enhanced Empty State */}
              {filteredAndSortedProjects.length === 0 && !isLoading && (
                <div className="text-center py-20">
                  <div className="max-w-md mx-auto">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#161b22] border border-[#30363d] flex items-center justify-center">
                      <Search className="w-12 h-12 text-[#7d8590]" />
                    </div>
                    <h3 className="text-2xl font-semibold text-[#c9d1d9] mb-4">No projects found</h3>
                    <p className="text-[#7d8590] mb-6 leading-relaxed">
                      {searchQuery 
                        ? `No projects match your search for "${searchQuery}". Try different keywords or browse all categories.`
                        : `No projects found in the ${activeFilter} category. Try selecting a different category or check back later for new projects.`
                      }
                    </p>
                    <div className="flex gap-3 justify-center">
                      {searchQuery && (
                        <Button onClick={() => setSearchQuery('')} variant="outline" className="border-[#30363d] bg-[#161b22]/50 text-[#c9d1d9]">
                          Clear Search
                        </Button>
                      )}
                      {activeFilter !== 'All' && (
                        <Button onClick={() => setActiveFilter('All')} className="bg-gradient-to-r from-blue-500 to-blue-600">
                          Show All Projects
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Back to Top Button */}
              {filteredAndSortedProjects.length > 6 && (
                <div className="text-center mt-16">
                  <Button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    variant="outline" 
                    className="border-[#30363d] bg-[#161b22]/50 backdrop-blur-md hover:bg-[#30363d]/50 hover:border-blue-500/30 text-[#c9d1d9] transition-all duration-300 hover:-translate-y-1"
                  >
                    Back to Top
                  </Button>
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
