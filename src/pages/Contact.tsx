import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Mail, Github, Linkedin, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SEO from '@/components/SEO';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact John Doe",
    "description": "Get in touch with John Doe for web development projects, collaborations, or general inquiries",
    "url": "https://yourportfolio.com/contact",
    "mainEntity": {
      "@type": "Person",
      "name": "John Doe",
      "jobTitle": "Full-Stack Developer",
      "email": "hello@yourportfolio.com",
      "sameAs": [
        "https://github.com/johndoe",
        "https://linkedin.com/in/johndoe"
      ]
    }
  };

  useEffect(() => {
    // Smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Parallax and scroll effects
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-bg');
      
      parallaxElements.forEach((element) => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        (element as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
    };

    // Intersection Observer for fade-in animations
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

    // Observe all sections
    const sections = document.querySelectorAll('.scroll-animate');
    sections.forEach((section) => observer.observe(section));

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    toast({
      title: "Message sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    });
    
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <SEO 
        title="Contact - John Doe | Get In Touch for Web Development Projects"
        description="Contact John Doe for web development projects, collaborations, or general inquiries. Available for freelance work and exciting opportunities."
        keywords="contact developer, hire full-stack developer, web development services, React developer contact, freelance developer"
        url="https://yourportfolio.com/contact"
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
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16 scroll-animate opacity-0">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">Get In Touch</h1>
                <p className="text-xl text-[#7d8590] max-w-2xl mx-auto">
                  I'm always open to discussing new opportunities, interesting projects, 
                  or just having a chat about technology
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <Card className="p-8 glass-effect border-[#30363d] hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 scroll-animate opacity-0">
                  <h2 className="text-2xl font-semibold text-[#c9d1d9] mb-6">Send a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-sm font-medium text-[#c9d1d9]">
                          Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="mt-1 bg-[#161b22]/50 backdrop-blur-md border-[#30363d] text-[#c9d1d9] placeholder-[#7d8590] focus:border-blue-500/50"
                          placeholder="Your name"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium text-[#c9d1d9]">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="mt-1 bg-[#161b22]/50 backdrop-blur-md border-[#30363d] text-[#c9d1d9] placeholder-[#7d8590] focus:border-blue-500/50"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="subject" className="text-sm font-medium text-[#c9d1d9]">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="mt-1 bg-[#161b22]/50 backdrop-blur-md border-[#30363d] text-[#c9d1d9] placeholder-[#7d8590] focus:border-blue-500/50"
                        placeholder="What's this about?"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message" className="text-sm font-medium text-[#c9d1d9]">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="mt-1 bg-[#161b22]/50 backdrop-blur-md border-[#30363d] text-[#c9d1d9] placeholder-[#7d8590] focus:border-blue-500/50"
                        rows={6}
                        placeholder="Tell me about your project or just say hello..."
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-blue-600 border-0 shadow-lg hover:shadow-blue-500/20 text-lg py-3">
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </Card>

                <div className="space-y-8">
                  <Card className="p-8 glass-effect border-[#30363d] hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 scroll-animate opacity-0">
                    <h2 className="text-2xl font-semibold text-[#c9d1d9] mb-6">Let's Connect</h2>
                    
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                          <Mail className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-[#c9d1d9]">Email</h3>
                          <p className="text-[#8b949e]">hello@yourportfolio.com</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                          <Github className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-[#c9d1d9]">GitHub</h3>
                          <p className="text-[#8b949e]">github.com/yourusername</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                          <Linkedin className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-[#c9d1d9]">LinkedIn</h3>
                          <p className="text-[#8b949e]">linkedin.com/in/yourprofile</p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-8 glass-effect border-[#30363d] hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 scroll-animate opacity-0">
                    <h3 className="text-xl font-semibold text-[#c9d1d9] mb-4">Quick Response</h3>
                    <p className="text-[#8b949e] mb-4">
                      I typically respond to messages within 24 hours. For urgent matters, 
                      feel free to reach out via LinkedIn or email directly.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-[#8b949e]">Response Time</span>
                        <span className="font-medium text-[#c9d1d9]">&lt; 24 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8b949e]">Availability</span>
                        <span className="font-medium text-[#c9d1d9]">Mon - Fri</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8b949e]">Time Zone</span>
                        <span className="font-medium text-[#c9d1d9]">UTC-5 (EST)</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
          
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Contact;
