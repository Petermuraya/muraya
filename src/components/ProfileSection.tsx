import { Button } from '@/components/ui/button';
import { User, Download, Github, Linkedin, Twitter, Instagram, Facebook, Mail, Phone, Globe, Sparkles, Zap, Cpu } from 'lucide-react';
import { useState, useEffect } from 'react';

const ProfileSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/petermuraya',
      icon: <Github className="w-5 h-5" />,
      color: 'hover:bg-gray-800 hover:text-white hover:shadow-lg hover:shadow-gray-500/20'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/peter-muraya-ndungu/',
      icon: <Linkedin className="w-5 h-5" />,
      color: 'hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/20'
    },
    {
      name: 'Twitter',
      url: 'https://x.com/sammie1604',
      icon: <Twitter className="w-5 h-5" />,
      color: 'hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-400/20'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/murayandungu/',
      icon: <Instagram className="w-5 h-5" />,
      color: 'hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white hover:shadow-lg hover:shadow-purple-500/20'
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/sammy.wailer.319',
      icon: <Facebook className="w-5 h-5" />,
      color: 'hover:bg-blue-700 hover:text-white hover:shadow-lg hover:shadow-blue-600/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 scroll-animate opacity-0 relative overflow-hidden">
      {/* Futuristic Background Effects */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`
        }}
      />
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;40&quot; height=&quot;40&quot; viewBox=&quot;0 0 40 40&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;%2300D4FF&quot; fill-opacity=&quot;1&quot; fill-rule=&quot;evenodd&quot;%3E%3Cpath d=&quot;M0 40L40 0H20L0 20M40 40V20L20 40&quot;/%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
      </div>

      {/* Profile Image Section */}
      <div className="relative group">
        <div className="relative">
          {/* Holographic Border Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
          
          {/* Main Image Container */}
          <div className="relative bg-[#0d1117] p-4 rounded-lg border border-[#30363d] backdrop-blur-sm">
            <img 
              src="https://i.postimg.cc/902NmQLh/IMG-20240709-105245-53.jpg" 
              alt="Peter Muraya Ndung'u (@sammie1604) - IoT & AI Developer" 
              className="w-full max-w-md mx-auto rounded-lg shadow-2xl border-2 border-[#30363d] hover:border-blue-500/50 transition-all duration-500 object-cover group-hover:scale-105"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
            
            {/* Status Indicator */}
            <div className="absolute top-6 right-6 flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400 font-medium bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
                Available for Projects
              </span>
            </div>

            {/* Floating Tech Icons */}
            {isHovered && (
              <div className="absolute inset-0 pointer-events-none">
                <Cpu className="absolute top-4 left-4 w-6 h-6 text-blue-400 animate-bounce opacity-70" style={{ animationDelay: '0s' }} />
                <Zap className="absolute bottom-4 right-4 w-5 h-5 text-purple-400 animate-bounce opacity-70" style={{ animationDelay: '0.5s' }} />
                <Sparkles className="absolute top-1/2 left-4 w-4 h-4 text-cyan-400 animate-bounce opacity-70" style={{ animationDelay: '1s' }} />
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="space-y-8 relative z-10">
        {/* Header with Icon */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
              <User className="w-7 h-7 text-white" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-xl blur-md opacity-50 animate-pulse"></div>
          </div>
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Hi, I'm Peter Muraya
            </h2>
            <p className="text-xl text-blue-400 font-semibold mt-1">IoT & Cloud Solutions Developer</p>
            <p className="text-lg text-cyan-400 font-medium">Tech for Global Development</p>
          </div>
        </div>
        
        {/* Enhanced Description */}
        <div className="space-y-6">
          <p className="text-lg text-[#8b949e] leading-relaxed relative p-4 rounded-lg bg-gradient-to-r from-blue-500/5 to-purple-500/5 border border-blue-500/10">
            <span className="absolute top-2 left-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            Passionate about leveraging technology for global development, inclusion, and digital innovation. Specializing in smart agriculture, health tech, and AI-powered solutions.
          </p>
          
          <p className="text-lg text-[#8b949e] leading-relaxed relative p-4 rounded-lg bg-gradient-to-r from-purple-500/5 to-cyan-500/5 border border-purple-500/10">
            <span className="absolute top-2 left-2 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
            My expertise spans Python, JavaScript, TypeScript, SQL, Firebase, Azure IoT, React, Django, FastAPI, and more. Currently pursuing BSc in Information Technology, graduating September 2025.
          </p>
          
          <p className="text-lg text-[#8b949e] leading-relaxed relative p-4 rounded-lg bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border border-cyan-500/10">
            <span className="absolute top-2 left-2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
            Based in Nairobi, Kenya. Active in leadership roles at Karatina Innovation Club and Akiliedge Tech Network. Currently working on ThoraxIQ, an AI-powered chest X-ray abnormality detection system.
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 rounded-lg bg-gradient-to-r from-[#161b22] to-[#21262d] border border-[#30363d]">
          <a 
            href="mailto:sammypeter1944@gmail.com"
            className="flex items-center space-x-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all duration-300 hover:scale-105 group"
          >
            <Mail className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
            <span className="text-sm text-blue-300">sammypeter1944@gmail.com</span>
          </a>
          <a 
            href="tel:+254700471113"
            className="flex items-center space-x-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 transition-all duration-300 hover:scale-105 group"
          >
            <Phone className="w-5 h-5 text-green-400 group-hover:text-green-300" />
            <span className="text-sm text-green-300">+254 700 471113</span>
          </a>
        </div>

        {/* Social Media Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
            <Globe className="w-5 h-5 text-blue-400" />
            <span>Connect With Me</span>
          </h3>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg bg-[#21262d] border border-[#30363d] transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${social.color} group`}
              >
                <span className="group-hover:animate-bounce">{social.icon}</span>
                <span className="text-sm font-medium">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button className="flex-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-lg py-6 group">
            <Globe className="w-5 h-5 mr-2 group-hover:animate-spin" />
            View My Work
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 border-2 border-[#30363d] bg-[#21262d]/80 backdrop-blur-sm hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 text-lg py-6 group"
          >
            <Mail className="w-5 h-5 mr-2 group-hover:animate-bounce" />
            Get In Touch
          </Button>
          <Button 
            variant="outline"
            className="border-2 border-[#30363d] bg-[#21262d]/80 backdrop-blur-sm hover:bg-gradient-to-r hover:from-green-500/10 hover:to-emerald-500/10 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-1 py-6 group"
          >
            <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
            Resume
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
