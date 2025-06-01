
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
import AboutBackgroundEffects from '@/components/AboutBackgroundEffects';
import useAboutEffects from '@/hooks/useAboutEffects';
import { useState } from 'react';

const About = () => {
  useAboutEffects();
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
      
      <div className="min-h-screen bg-[#0d1117] text-white overflow-x-hidden relative">
        <AboutBackgroundEffects 
          mousePosition={mousePosition}
          setMousePosition={setMousePosition}
        />

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
