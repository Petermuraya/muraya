
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import FeaturedProjectsSection from '@/components/FeaturedProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import AdvancedSEO from '@/components/AdvancedSEO';
import EnhancedSEOBot from '@/components/EnhancedSEOBot';
import FuturisticSEODashboard from '@/components/FuturisticSEODashboard';
import VoiceChatbot from '@/components/VoiceChatbot';
import SkipLink from '@/components/SkipLink';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { BarChart3 } from 'lucide-react';

const Index = () => {
  const [showSEODashboard, setShowSEODashboard] = useState(false);

  useEffect(() => {
    // Enhanced scroll behavior with performance optimization
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Optimized parallax and scroll effects
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const parallaxElements = document.querySelectorAll('.parallax-bg');
          
          parallaxElements.forEach((element) => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            (element as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    // Enhanced Intersection Observer with better performance
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          entry.target.classList.remove('opacity-0');
          // Unobserve after animation to improve performance
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all sections with better performance
    const sections = document.querySelectorAll('.scroll-animate');
    sections.forEach((section) => observer.observe(section));

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Enhanced structured data with Kenya tech ecosystem focus
  const enhancedStructuredData = {
    "@context": "https://schema.org",
    "@type": ["Person", "ProfessionalService", "TechArticle"],
    "name": "Peter Muraya Ndung'u",
    "alternateName": ["sammie1604", "murayandungu"],
    "jobTitle": "IoT & AI Solutions Developer",
    "description": "Leading IoT & AI specialist building transformative technologies for African markets. Expert in React, TypeScript, Node.js, Python, and cloud-native systems. Kenya youth tech leader and innovation advocate.",
    "url": "https://petermuraya.github.io/muraya",
    "image": {
      "@type": "ImageObject",
      "url": "https://i.postimg.cc/902NmQLh/IMG-20240709-105245-53.jpg",
      "width": 1200,
      "height": 630,
      "caption": "Peter Muraya Ndung'u - Leading IoT & AI Developer in Kenya"
    },
    "email": "sammypeter1944@gmail.com",
    "telephone": "+254700471113",
    "sameAs": [
      "https://github.com/petermuraya",
      "https://www.linkedin.com/in/peter-muraya-ndungu/",
      "https://x.com/sammie1604",
      "https://www.instagram.com/murayandungu/",
      "https://www.facebook.com/sammy.wailer.319"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Kenya Tech Innovation Hub",
      "description": "Freelance Developer & Tech Consultant specializing in IoT solutions for Africa"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Nairobi",
      "addressRegion": "Nairobi County",
      "addressCountry": "Kenya",
      "postalCode": "00100"
    },
    "nationality": {
      "@type": "Country",
      "name": "Kenya"
    },
    "knowsAbout": [
      "Internet of Things (IoT) Development",
      "Artificial Intelligence for Africa",
      "React.js & Modern Web Development",
      "TypeScript & JavaScript",
      "Node.js Backend Development",
      "Python for AI & Data Science",
      "Cloud Computing & AWS",
      "Smart Agriculture Technology",
      "Healthcare Technology Innovation",
      "Kenya Youth Tech Leadership",
      "African Digital Transformation",
      "Tech for Development",
      "Open Source Contribution",
      "Tech Community Building Kenya"
    ],
    "expertise": [
      "IoT Systems Architecture",
      "AI/ML Implementation for Africa",
      "Full-Stack Web Development",
      "Cloud Solutions Design",
      "Mobile App Development",
      "Tech Mentorship & Education",
      "Innovation Consulting",
      "Digital Transformation Strategy"
    ],
    "award": [
      "Kenya IoT Innovation Award 2023",
      "Top Developer GitHub Kenya",
      "Tech Innovation Excellence Award",
      "Youth Tech Leader Kenya 2023",
      "Open Source Contributor of the Year"
    ],
    "memberOf": [
      {
        "@type": "Organization",
        "name": "Kenya Developer Community",
        "url": "https://developers.co.ke"
      },
      {
        "@type": "Organization",
        "name": "Africa Tech Leaders Network"
      },
      {
        "@type": "Organization",
        "name": "IoT Kenya Community"
      }
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Karatina University",
      "url": "https://www.karu.ac.ke",
      "department": "Computer Science"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "IoT Solutions Development",
        "description": "Custom IoT development for agriculture, healthcare, and smart cities in Africa",
        "areaServed": ["Kenya", "East Africa", "Africa", "Worldwide"],
        "category": "Technology Services"
      },
      {
        "@type": "Offer", 
        "name": "AI Implementation Consulting",
        "description": "AI/ML solutions for African businesses and startups",
        "areaServed": ["Kenya", "East Africa", "Africa"]
      },
      {
        "@type": "Offer",
        "name": "Tech Mentorship & Training",
        "description": "Mentoring young developers and tech entrepreneurs in Kenya",
        "areaServed": "Kenya"
      }
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+254700471113",
        "email": "sammypeter1944@gmail.com",
        "contactType": "Professional Inquiries",
        "areaServed": "Worldwide",
        "availableLanguage": ["English", "Swahili"]
      }
    ],
    "potentialAction": [
      {
        "@type": "FollowAction",
        "name": "Follow on GitHub",
        "target": "https://github.com/petermuraya"
      },
      {
        "@type": "FollowAction", 
        "name": "Connect on LinkedIn",
        "target": "https://www.linkedin.com/in/peter-muraya-ndungu/"
      },
      {
        "@type": "ContactAction",
        "name": "Send Email",
        "target": "mailto:sammypeter1944@gmail.com"
      }
    ],
    "keywords": "Peter Muraya Ndungu, Kenya IoT developer, AI specialist Africa, React expert Kenya, TypeScript developer, Node.js Kenya, Python AI developer, youth tech leader Kenya, sammie1604, murayandungu, Karatina University developer, Nairobi tech community, African innovation, smart agriculture Kenya, health tech Africa, sammypeter1944@gmail.com"
  };

  return (
    <>
      <SkipLink />
      <AdvancedSEO 
        title="Peter Muraya Ndung'u (@sammie1604) | Leading IoT & AI Developer Kenya | React TypeScript Expert | Youth Tech Leader"
        description="Award-winning IoT & AI specialist Peter Muraya from Kenya building cutting-edge solutions for healthcare, agriculture, and smart cities. Leading youth tech innovation in Africa. Expert in React, TypeScript, Node.js, Python, and cloud architecture. Connect @sammie1604 LinkedIn, GitHub @petermuraya, Instagram @murayandungu. Email: sammypeter1944@gmail.com | +254 700 471113"
        keywords="Peter Muraya Ndungu, Kenya IoT developer, AI specialist Africa, React expert Kenya, TypeScript developer Nairobi, Node.js developer Kenya, Python AI developer, youth tech leader Kenya, African innovation, smart agriculture Kenya, health tech Africa, sammie1604, murayandungu, Karatina University developer, Nairobi tech community, Kenya developer community, Africa tech leaders, IoT Kenya, AI Africa, sammypeter1944@gmail.com, GitHub petermuraya, LinkedIn peter-muraya-ndungu"
        image="https://i.postimg.cc/902NmQLh/IMG-20240709-105245-53.jpg"
        customStructuredData={enhancedStructuredData}
      />
      
      <div className="min-h-screen bg-[#0d1117] text-white overflow-x-hidden">
        {/* Enhanced Background Effects with better performance */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="parallax-bg absolute inset-0 bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#21262d] will-change-transform"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23f0f6fc&quot; fill-opacity=&quot;0.02&quot;%3E%3Ccircle cx=&quot;7&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        </div>

        {/* Optimized Gradient Orbs */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse will-change-transform"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse will-change-transform" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse will-change-transform" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10">
          <Navigation />
          <main id="main-content" role="main">
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
          </main>
          <Footer />
        </div>
        
        {/* SEO Dashboard Overlay */}
        {showSEODashboard && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="relative">
              <Button
                onClick={() => setShowSEODashboard(false)}
                className="absolute -top-4 -right-4 z-10 rounded-full bg-red-600 hover:bg-red-700"
                size="sm"
              >
                ×
              </Button>
              <FuturisticSEODashboard />
            </div>
          </div>
        )}

        {/* Floating SEO Dashboard Button */}
        <Button
          onClick={() => setShowSEODashboard(true)}
          className="fixed bottom-48 right-8 z-40 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full p-4"
          size="icon"
          title="Open SEO Dashboard"
        >
          <BarChart3 className="w-6 h-6" />
        </Button>
        
        {/* Enhanced SEO Features */}
        <EnhancedSEOBot />
        <VoiceChatbot />
      </div>
    </>
  );
};

export default Index;
