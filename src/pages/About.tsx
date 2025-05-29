
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AboutHeader from '@/components/AboutHeader';
import ProfileSection from '@/components/ProfileSection';
import SkillsDisplay from '@/components/SkillsDisplay';
import CertificationsSection from '@/components/CertificationsSection';
import ExperienceSection from '@/components/ExperienceSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ValuesSection from '@/components/ValuesSection';
import SEO from '@/components/SEO';
import useAboutEffects from '@/hooks/useAboutEffects';
import { useEffect, useRef, useState } from 'react';

const About = () => {
  useAboutEffects();
  
  const pageRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // IoT background images
  const iotImages = [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', // circuit board
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', // programming monitor
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', // laptop computer
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', // abstract tech
    'https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80' // server room
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (pageRef.current) {
        const rect = pageRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    const page = pageRef.current;
    if (page) {
      page.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (page) {
        page.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  useEffect(() => {
    // Auto-rotate background images
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % iotImages.length);
    }, 8000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, [iotImages.length]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Peter Muraya Ndung'u",
    "description": "Learn more about Peter Muraya Ndung'u, an experienced IoT & Cloud Solutions Developer passionate about technology for global development and digital innovation.",
    "url": "https://yourportfolio.com/about",
    "mainEntity": {
      "@type": "Person",
      "name": "Peter Muraya Ndung'u",
      "jobTitle": "IoT & Cloud Solutions Developer",
      "description": "Experienced IoT & Cloud Solutions Developer specializing in React, TypeScript, Node.js, and modern web technologies. Passionate about technology for global development and digital innovation.",
      "url": "https://yourportfolio.com",
      "image": "https://i.postimg.cc/902NmQLh/IMG-20240709-105245-53.jpg",
      "sameAs": [
        "https://github.com/petermuraya",
        "https://linkedin.com/in/petermuraya",
        "https://twitter.com/petermuraya"
      ],
      "knowsAbout": [
        "IoT Development",
        "Cloud Solutions",
        "React",
        "TypeScript",
        "Node.js",
        "JavaScript",
        "Web Development",
        "Smart Agriculture",
        "Health Technology"
      ]
    }
  };

  return (
    <>
      <SEO 
        title="About - Peter Muraya Ndung'u | IoT & Cloud Solutions Developer"
        description="Learn more about Peter Muraya Ndung'u, an experienced IoT & Cloud Solutions Developer passionate about technology for global development and digital innovation."
        keywords="about Peter Muraya, IoT developer background, cloud solutions expert, React developer experience, global development technology"
        url="https://yourportfolio.com/about"
        image="https://i.postimg.cc/902NmQLh/IMG-20240709-105245-53.jpg"
        author="Peter Muraya Ndung'u"
        twitterHandle="@petermuraya"
        structuredData={structuredData}
      />
      
      <div ref={pageRef} className="min-h-screen bg-[#0d1117] text-white overflow-x-hidden relative">
        {/* Multiple IoT Background Images with Transitions */}
        <div className="fixed inset-0 z-0">
          {iotImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-[3000ms] ease-in-out ${
                index === currentImageIndex ? 'opacity-45' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url('${image}')`,
                transform: `translate3d(${(mousePosition.x - 0.5) * 15}px, ${(mousePosition.y - 0.5) * 15}px, 0) scale(1.1)`,
                transition: 'opacity 3s ease-in-out, transform 0.3s ease-out'
              }}
            ></div>
          ))}
          
          {/* Enhanced gradient overlay for better text readability */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-[#0d1117]/85 via-[#161b22]/80 to-[#21262d]/85"
            style={{
              transform: `translate3d(${(mousePosition.x - 0.5) * -8}px, ${(mousePosition.y - 0.5) * -8}px, 0)`,
              transition: 'transform 0.5s ease-out'
            }}
          ></div>
        </div>

        {/* Enhanced Circuit pattern overlay with cursor movement */}
        <div 
          className="fixed inset-0 z-1 opacity-20"
          style={{
            transform: `translate3d(${(mousePosition.x - 0.5) * 12}px, ${(mousePosition.y - 0.5) * 12}px, 0)`,
            transition: 'transform 0.4s ease-out'
          }}
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;100&quot; height=&quot;100&quot; viewBox=&quot;0 0 100 100&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%2300D4FF&quot; fill-opacity=&quot;0.5&quot;%3E%3Cpath d=&quot;M20,20 L80,20 M20,20 L20,80 M20,80 L80,80 M80,20 L80,80 M40,40 L60,40 M40,40 L40,60 M40,60 L60,60 M60,40 L60,60&quot; stroke=&quot;%2300D4FF&quot; stroke-width=&quot;0.5&quot;/%3E%3Ccircle cx=&quot;20&quot; cy=&quot;20&quot; r=&quot;2&quot;/%3E%3Ccircle cx=&quot;80&quot; cy=&quot;20&quot; r=&quot;2&quot;/%3E%3Ccircle cx=&quot;20&quot; cy=&quot;80&quot; r=&quot;2&quot;/%3E%3Ccircle cx=&quot;80&quot; cy=&quot;80&quot; r=&quot;2&quot;/%3E%3Ccircle cx=&quot;50&quot; cy=&quot;50&quot; r=&quot;3&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
        </div>

        {/* Floating particles effect */}
        <div className="fixed inset-0 z-1">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/25 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
                transform: `translate3d(${(mousePosition.x - 0.5) * 25}px, ${(mousePosition.y - 0.5) * 25}px, 0)`,
                transition: 'transform 0.6s ease-out'
              }}
            ></div>
          ))}
        </div>

        {/* Gradient Orbs with cursor movement */}
        <div className="fixed inset-0 pointer-events-none z-1">
          <div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl animate-pulse"
            style={{
              transform: `translate3d(${(mousePosition.x - 0.5) * 30}px, ${(mousePosition.y - 0.5) * 30}px, 0)`,
              transition: 'transform 0.8s ease-out'
            }}
          ></div>
          <div 
            className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl animate-pulse" 
            style={{ 
              animationDelay: '2s',
              transform: `translate3d(${(mousePosition.x - 0.5) * -20}px, ${(mousePosition.y - 0.5) * -20}px, 0)`,
              transition: 'transform 0.8s ease-out'
            }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse" 
            style={{ 
              animationDelay: '4s',
              transform: `translate3d(${(mousePosition.x - 0.5) * 15}px, ${(mousePosition.y - 0.5) * 15}px, 0)`,
              transition: 'transform 0.8s ease-out'
            }}
          ></div>
        </div>

        <div className="relative z-10">
          <Navigation />
          
          <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <AboutHeader />
              <ProfileSection />
              <SkillsDisplay />
              <CertificationsSection />
              <ExperienceSection />
              <TestimonialsSection />
              <ValuesSection />
            </div>
          </div>
          
          <Footer />
        </div>
      </div>
    </>
  );
};

export default About;
