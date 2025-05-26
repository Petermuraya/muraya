
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import FeaturedProjectsSection from '@/components/FeaturedProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import SEO from '@/components/SEO';
import { useEffect } from 'react';

const Index = () => {
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "John Doe Portfolio",
    "url": "https://yourportfolio.com",
    "author": {
      "@type": "Person",
      "name": "John Doe",
      "jobTitle": "Full-Stack Developer",
      "url": "https://yourportfolio.com"
    },
    "description": "Professional portfolio showcasing full-stack development projects and skills",
    "inLanguage": "en-US"
  };

  return (
    <>
      <SEO 
        title="John Doe - Full-Stack Developer | React, TypeScript, Node.js Expert"
        description="Experienced full-stack developer specializing in React, TypeScript, Node.js, and modern web technologies. Building scalable applications with clean code and exceptional user experiences."
        keywords="full-stack developer, React developer, TypeScript, Node.js, web development, JavaScript, frontend, backend, portfolio, software engineer"
        url="https://yourportfolio.com"
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
          <div className="scroll-animate opacity-0">
            <HeroSection />
          </div>
          <div className="scroll-animate opacity-0">
            <FeaturesSection />
          </div>
          <div className="scroll-animate opacity-0">
            <FeaturedProjectsSection />
          </div>
          <div className="scroll-animate opacity-0">
            <SkillsSection />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Index;
