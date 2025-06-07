
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import FeaturedProjectsSection from '@/components/FeaturedProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import AdvancedSEO from '@/components/AdvancedSEO';
import SEOBot from '@/components/SEOBot';
import VoiceChatbot from '@/components/VoiceChatbot';
import SkipLink from '@/components/SkipLink';
import { useEffect } from 'react';

const Index = () => {
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

  // Enhanced structured data with more comprehensive information
  const enhancedStructuredData = {
    "@context": "https://schema.org",
    "@type": ["Person", "ProfessionalService"],
    "name": "Peter Muraya Ndung'u",
    "alternateName": ["sammie1604", "murayandungu"],
    "jobTitle": "IoT & AI Solutions Developer",
    "description": "Award-winning IoT & AI specialist building transformative technologies for African markets. Expert in React, TypeScript, Node.js, Python, and cloud-native systems.",
    "url": "https://petermuraya.github.io/muraya",
    "image": {
      "@type": "ImageObject",
      "url": "https://i.postimg.cc/902NmQLh/IMG-20240709-105245-53.jpg",
      "width": 1200,
      "height": 630,
      "caption": "Peter Muraya Ndung'u - IoT & AI Developer"
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
      "name": "Freelance Developer & Tech Consultant",
      "url": "https://petermuraya.github.io/muraya"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Nairobi",
      "addressRegion": "Nairobi",
      "addressCountry": "Kenya"
    },
    "knowsAbout": [
      "Internet of Things (IoT)",
      "Artificial Intelligence",
      "React.js Development",
      "TypeScript Programming",
      "Node.js Development",
      "Python Programming",
      "Cloud Computing",
      "Smart Agriculture",
      "Healthcare Technology",
      "Full-Stack Development",
      "Digital Innovation",
      "Technology for Development"
    ],
    "expertise": [
      "IoT Systems Architecture",
      "AI/ML Implementation",
      "Frontend Development",
      "Backend Development",
      "Cloud Solutions",
      "Mobile App Development"
    ],
    "award": [
      "Kenya IoT Innovation Award 2023",
      "Top Developer GitHub Kenya",
      "Tech Innovation Excellence Award"
    ],
    "memberOf": {
      "@type": "Organization",
      "name": "Kenya Tech Community"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Karatina University",
      "url": "https://www.karu.ac.ke"
    },
    "offers": {
      "@type": "Offer",
      "description": "IoT and AI development services, tech consulting, and educational content",
      "areaServed": "Worldwide",
      "availableChannel": {
        "@type": "ServiceChannel",
        "serviceUrl": "https://petermuraya.github.io/muraya/contact"
      }
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+254700471113",
        "email": "sammypeter1944@gmail.com",
        "contactType": "customer service",
        "areaServed": "Worldwide",
        "availableLanguage": "English"
      }
    ],
    "potentialAction": [
      {
        "@type": "FollowAction",
        "target": [
          "https://github.com/petermuraya",
          "https://www.linkedin.com/in/peter-muraya-ndungu/",
          "https://x.com/sammie1604"
        ]
      },
      {
        "@type": "ContactAction",
        "target": "mailto:sammypeter1944@gmail.com"
      }
    ]
  };

  return (
    <>
      <SkipLink />
      <AdvancedSEO 
        title="Peter Muraya Ndung'u (@sammie1604) | Leading IoT & AI Developer Kenya | React TypeScript Expert"
        description="Award-winning IoT & AI specialist Peter Muraya from Kenya building cutting-edge solutions for healthcare, agriculture, and smart cities. Expert in React, TypeScript, Node.js, Python, and cloud architecture. Connect @sammie1604 | sammypeter1944@gmail.com | +254 700 471113"
        keywords="Peter Muraya Ndungu, sammie1604, murayandungu, IoT developer Kenya, AI developer Nairobi, React developer Kenya, TypeScript expert, Node.js developer, Python developer Kenya, Full-stack developer Nairobi, Software engineer Kenya, Smart agriculture Kenya, Healthcare tech Africa, Cloud solutions Kenya, Tech innovation Africa, sammypeter1944@gmail.com"
        url="https://petermuraya.github.io/muraya"
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
        
        {/* Enhanced SEO and Voice Features */}
        <SEOBot />
        <VoiceChatbot />
      </div>
    </>
  );
};

export default Index;
