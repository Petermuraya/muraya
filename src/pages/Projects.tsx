
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Github, Link as LinkIcon } from 'lucide-react';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const categories = ['All', 'Web Development', 'Mobile', 'AI/ML', 'DevOps'];
  
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-featured e-commerce platform with user authentication, payment processing, and admin dashboard. Built with modern React and Node.js backend.",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
      tech: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind"],
      github: "https://github.com",
      demo: "https://demo.com",
      featured: true
    },
    {
      title: "AI Chat Application",
      description: "Real-time chat application powered by AI with intelligent responses, sentiment analysis, and multi-language support.",
      category: "AI/ML",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
      tech: ["TypeScript", "WebSocket", "OpenAI", "React", "Python"],
      github: "https://github.com",
      demo: "https://demo.com",
      featured: true
    },
    {
      title: "Mobile Analytics Dashboard",
      description: "Comprehensive analytics dashboard with real-time data visualization, custom reports, and mobile-responsive design.",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      tech: ["React", "D3.js", "Python", "FastAPI", "PostgreSQL"],
      github: "https://github.com",
      demo: "https://demo.com",
      featured: false
    },
    {
      title: "Task Management App",
      description: "Cross-platform mobile application for task management with offline sync, team collaboration, and productivity insights.",
      category: "Mobile",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop",
      tech: ["React Native", "Firebase", "Redux", "TypeScript"],
      github: "https://github.com",
      demo: "https://demo.com",
      featured: false
    },
    {
      title: "CI/CD Pipeline Automation",
      description: "Automated deployment pipeline with Docker containerization, testing automation, and monitoring setup.",
      category: "DevOps",
      image: "https://images.unsplash.com/photo-1527576539890-dfa815648363?w=600&h=400&fit=crop",
      tech: ["Docker", "Jenkins", "AWS", "Kubernetes", "Terraform"],
      github: "https://github.com",
      demo: "https://demo.com",
      featured: false
    },
    {
      title: "Machine Learning Model API",
      description: "RESTful API serving machine learning models for image classification with high availability and scalability.",
      category: "AI/ML",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop",
      tech: ["Python", "FastAPI", "TensorFlow", "Docker", "AWS"],
      github: "https://github.com",
      demo: "https://demo.com",
      featured: true
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">My Projects</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A collection of projects showcasing my skills in web development, 
              mobile applications, AI/ML, and DevOps practices
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? "default" : "outline"}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 ${
                  activeFilter === category 
                    ? "bg-blue-600 hover:bg-blue-700" 
                    : "hover:bg-blue-50"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-white border-0 shadow-lg">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {project.featured && (
                    <Badge className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700">
                      Featured
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span key={tech} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <Button size="sm" variant="outline" className="flex-1" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700" asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <LinkIcon className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">No projects found in this category.</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Projects;
