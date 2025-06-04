
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AboutHeader from '@/components/AboutHeader';
import ProfileSection from '@/components/ProfileSection';
import SkillsDisplay from '@/components/SkillsDisplay';
import CertificationsSection from '@/components/CertificationsSection';
import ExperienceSection from '@/components/ExperienceSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ValuesSection from '@/components/ValuesSection';
import EnhancedSEO from '@/components/EnhancedSEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import SkipLink from '@/components/SkipLink';
import ScrollToTop from '@/components/ScrollToTop';
import ParticleBackground from '@/components/ParticleBackground';
import AboutBackgroundEffects from '@/components/AboutBackgroundEffects';
import useAboutEffects from '@/hooks/useAboutEffects';
import { useState } from 'react';
import Chatbot from '@/components/Chatbot';

const About = () => {
  useAboutEffects();
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const breadcrumbs = [
    { name: 'About', url: '/about' }
  ];

  return (
    <>
      <SkipLink />
      <EnhancedSEO 
        page="about"
        breadcrumbs={breadcrumbs}
      />
      
      <div className="min-h-screen bg-[#0d1117] text-white overflow-x-hidden relative">
        <ParticleBackground />
        <AboutBackgroundEffects 
          mousePosition={mousePosition}
          setMousePosition={setMousePosition}
        />

        <div className="relative z-10">
          <Navigation />
          
          <main id="main-content" className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Breadcrumbs />
              <AboutHeader />
              <ProfileSection />
              <SkillsDisplay />
              <CertificationsSection />
              <ExperienceSection />
              <TestimonialsSection />
              <ValuesSection />
            </div>
          </main>
          
          <Footer />
        </div>
        
        <Chatbot />
        <ScrollToTop />
      </div>
    </>
  );
};

export default About;
