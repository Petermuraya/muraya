
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Mail, Github, Linkedin, Send, MapPin, Clock, Phone, CheckCircle } from 'lucide-react';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Peter Muraya",
    "description": "Get in touch with Peter Muraya for IoT development projects, AI solutions, collaborations, or general inquiries",
    "url": "https://petermuraya.dev/contact",
    "mainEntity": {
      "@type": "Person",
      "name": "Peter Muraya",
      "jobTitle": "IoT & AI Solutions Developer",
      "email": "hello@petermuraya.dev",
      "sameAs": [
        "https://github.com/petermuraya",
        "https://linkedin.com/in/petermuraya"
      ]
    }
  };

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-bg');
      
      parallaxElements.forEach((element) => {
        const speed = 0.3;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to send your message.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    console.log('Form submitted:', formData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Message sent successfully!",
      description: "Thank you for reaching out. I'll get back to you within 24 hours.",
    });
    
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Reset success state after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "Drop me a line anytime",
      value: "hello@petermuraya.dev",
      action: "mailto:hello@petermuraya.dev"
    },
    {
      icon: Phone,
      title: "Phone",
      description: "Call for urgent matters",
      value: "+254 XXX XXX XXX",
      action: "tel:+254XXXXXXXXX"
    },
    {
      icon: MapPin,
      title: "Location",
      description: "Based in Nairobi, Kenya",
      value: "Nairobi, Kenya",
      action: "#"
    }
  ];

  return (
    <>
      <SEO 
        title="Contact Peter Muraya | IoT & AI Developer - Get In Touch"
        description="Contact Peter Muraya for IoT development projects, AI solutions, smart agriculture tech, healthcare innovations, and digital transformation consultations."
        keywords="contact IoT developer, hire AI specialist Kenya, Peter Muraya contact, IoT consultant Nairobi, smart agriculture developer"
        url="https://petermuraya.dev/contact"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-[#0d1117] text-white overflow-x-hidden">
        {/* Enhanced Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="parallax-bg absolute inset-0 bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#21262d]"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;80&quot; height=&quot;80&quot; viewBox=&quot;0 0 80 80&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23f0f6fc&quot; fill-opacity=&quot;0.03&quot;%3E%3Ccircle cx=&quot;7&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        </div>

        {/* Floating Gradient Orbs */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/6 w-80 h-80 bg-blue-500/8 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-2/3 right-1/6 w-96 h-96 bg-green-500/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10">
          <Navigation />
          
          <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {/* Hero Section */}
              <div className="text-center mb-20 scroll-animate opacity-0">
                <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-gray-300 bg-clip-text text-transparent mb-8">
                  Let's Build Something Amazing
                </h1>
                <p className="text-xl md:text-2xl text-[#7d8590] max-w-4xl mx-auto leading-relaxed">
                  Ready to transform your ideas into innovative IoT and AI solutions? 
                  I'm here to help you navigate the future of technology.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 scroll-animate opacity-0">
                {contactMethods.map((method, index) => (
                  <Card 
                    key={method.title}
                    className="p-8 glass-effect border-[#30363d] hover:border-blue-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 cursor-pointer group"
                    onClick={() => method.action !== "#" && window.open(method.action)}
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        <method.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-[#c9d1d9] mb-2">{method.title}</h3>
                      <p className="text-sm text-[#8b949e] mb-3">{method.description}</p>
                      <p className="text-[#c9d1d9] font-medium">{method.value}</p>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Contact Form - Takes 2 columns */}
                <div className="lg:col-span-2">
                  <Card className="p-10 glass-effect border-[#30363d] hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 scroll-animate opacity-0">
                    <div className="flex items-center mb-8">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                        <Send className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-semibold text-[#c9d1d9]">Send a Message</h2>
                        <p className="text-[#8b949e]">Let's discuss your next project</p>
                      </div>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-medium text-[#c9d1d9] flex items-center">
                            Name <span className="text-red-400 ml-1">*</span>
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="h-12 bg-[#161b22]/60 backdrop-blur-md border-[#30363d] text-[#c9d1d9] placeholder-[#7d8590] focus:border-blue-500/60 focus:ring-blue-500/20 transition-all duration-300"
                            placeholder="Your full name"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium text-[#c9d1d9] flex items-center">
                            Email <span className="text-red-400 ml-1">*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="h-12 bg-[#161b22]/60 backdrop-blur-md border-[#30363d] text-[#c9d1d9] placeholder-[#7d8590] focus:border-blue-500/60 focus:ring-blue-500/20 transition-all duration-300"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-sm font-medium text-[#c9d1d9] flex items-center">
                          Subject <span className="text-red-400 ml-1">*</span>
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="h-12 bg-[#161b22]/60 backdrop-blur-md border-[#30363d] text-[#c9d1d9] placeholder-[#7d8590] focus:border-blue-500/60 focus:ring-blue-500/20 transition-all duration-300"
                          placeholder="What would you like to discuss?"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-sm font-medium text-[#c9d1d9] flex items-center">
                          Message <span className="text-red-400 ml-1">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleChange}
                          className="min-h-[150px] bg-[#161b22]/60 backdrop-blur-md border-[#30363d] text-[#c9d1d9] placeholder-[#7d8590] focus:border-blue-500/60 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                          rows={6}
                          placeholder="Tell me about your project, ideas, or how I can help you..."
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full h-14 bg-gradient-to-r from-blue-500 to-blue-600 border-0 shadow-lg hover:shadow-blue-500/30 text-lg font-medium py-4 transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                            Sending...
                          </div>
                        ) : isSubmitted ? (
                          <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Message Sent!
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Send className="w-5 h-5 mr-2" />
                            Send Message
                          </div>
                        )}
                      </Button>
                    </form>
                  </Card>
                </div>

                {/* Sidebar Information */}
                <div className="space-y-8">
                  {/* Social Links */}
                  <Card className="p-8 glass-effect border-[#30363d] hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 scroll-animate opacity-0">
                    <h3 className="text-2xl font-semibold text-[#c9d1d9] mb-6 flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                        <Linkedin className="w-4 h-4 text-white" />
                      </div>
                      Connect Online
                    </h3>
                    
                    <div className="space-y-4">
                      <a 
                        href="https://github.com/petermuraya" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center p-4 rounded-xl bg-[#21262d]/50 hover:bg-[#30363d]/50 transition-all duration-300 hover:scale-105 group"
                      >
                        <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center mr-4 group-hover:bg-gray-700 transition-colors">
                          <Github className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-[#c9d1d9]">GitHub</h4>
                          <p className="text-sm text-[#8b949e]">Check out my projects</p>
                        </div>
                      </a>
                      
                      <a 
                        href="https://linkedin.com/in/petermuraya" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center p-4 rounded-xl bg-[#21262d]/50 hover:bg-[#30363d]/50 transition-all duration-300 hover:scale-105 group"
                      >
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-500 transition-colors">
                          <Linkedin className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-[#c9d1d9]">LinkedIn</h4>
                          <p className="text-sm text-[#8b949e]">Professional network</p>
                        </div>
                      </a>
                    </div>
                  </Card>

                  {/* Response Information */}
                  <Card className="p-8 glass-effect border-[#30363d] hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 scroll-animate opacity-0">
                    <h3 className="text-2xl font-semibold text-[#c9d1d9] mb-6 flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      Response Time
                    </h3>
                    
                    <div className="space-y-6">
                      <div className="text-center p-6 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl border border-green-500/20">
                        <div className="text-3xl font-bold text-green-400 mb-2">&lt; 24h</div>
                        <p className="text-sm text-[#8b949e]">Average response time</p>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-[#8b949e]">Availability</span>
                          <span className="font-medium text-[#c9d1d9]">Mon - Fri</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[#8b949e]">Time Zone</span>
                          <span className="font-medium text-[#c9d1d9]">EAT (UTC+3)</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[#8b949e]">Languages</span>
                          <span className="font-medium text-[#c9d1d9]">English, Swahili</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Project Types */}
                  <Card className="p-8 glass-effect border-[#30363d] hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 scroll-animate opacity-0">
                    <h3 className="text-2xl font-semibold text-[#c9d1d9] mb-6">What I Can Help With</h3>
                    
                    <div className="space-y-3">
                      {[
                        "IoT System Development",
                        "AI & Machine Learning Solutions",
                        "Smart Agriculture Tech",
                        "Healthcare Innovation",
                        "Web Application Development",
                        "Cloud Solutions Architecture",
                        "Digital Transformation Consulting"
                      ].map((service, index) => (
                        <div key={index} className="flex items-center text-[#8b949e] hover:text-[#c9d1d9] transition-colors duration-200">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          {service}
                        </div>
                      ))}
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
