
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowDown, Code, Github, Linkedin, Mail } from 'lucide-react';

const Index = () => {
  const featuredProjects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack React application with modern UI and robust backend",
      tech: ["React", "Node.js", "MongoDB"],
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop"
    },
    {
      title: "AI Chat Application", 
      description: "Real-time chat app powered by AI with intelligent responses",
      tech: ["TypeScript", "WebSocket", "AI/ML"],
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop"
    },
    {
      title: "Mobile Analytics Dashboard",
      description: "Data visualization dashboard with interactive charts and insights",
      tech: ["React", "D3.js", "Python"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="mb-8">
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=200&h=200&fit=crop&crop=face" 
                alt="Profile" 
                className="w-32 h-32 rounded-full mx-auto mb-6 shadow-lg border-4 border-white"
              />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-fade-in">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Your Name</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Full-Stack Developer & Problem Solver
            </p>
            
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              I craft digital experiences with clean code and creative solutions. 
              Passionate about turning complex problems into simple, elegant applications.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="text-lg px-8 py-3 bg-blue-600 hover:bg-blue-700">
                <Link to="/projects">View My Work</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
                <Link to="/contact">Get In Touch</Link>
              </Button>
            </div>
            
            <div className="flex justify-center space-x-6 mb-16">
              <a href="https://github.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Github className="w-8 h-8" />
              </a>
              <a href="https://linkedin.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Linkedin className="w-8 h-8" />
              </a>
              <a href="mailto:hello@example.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Mail className="w-8 h-8" />
              </a>
            </div>
            
            <div className="animate-bounce">
              <ArrowDown className="w-6 h-6 mx-auto text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A showcase of my recent work and the technologies I love working with
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span key={tech} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-3">
              <Link to="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Skills & Expertise</h2>
            <p className="text-xl text-gray-600">Technologies I work with</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              'React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'MongoDB',
              'Next.js', 'Express', 'Docker', 'Git', 'Tailwind', 'GraphQL'
            ].map((skill) => (
              <div key={skill} className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                <Code className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">{skill}</span>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-3">
              <Link to="/about">Learn More About Me</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
