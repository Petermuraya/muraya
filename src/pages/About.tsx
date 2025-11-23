
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AboutHeader from '@/components/AboutHeader';
import ProfileSection from '@/components/ProfileSection';
import EnhancedSkillsDisplay from '@/components/EnhancedSkillsDisplay';
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
import SEOBot from '@/components/SEOBot';
import SocialShare from '@/components/SocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import SocialMediaLinks from '@/components/SocialMediaLinks';
import ResumeDownload from '@/components/ResumeDownload';
import ScrollEffects from '@/components/ScrollEffects';
import useAboutEffects from '@/hooks/useAboutEffects';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import Chatbot from '@/components/Chatbot';

// New component imports
import MissionVisionSection from '@/components/about/MissionVisionSection';
import PersonalPhilosophySection from '@/components/about/PersonalPhilosophySection';
import WhatIDoSection from '@/components/about/WhatIDoSection';
import JourneySection from '@/components/about/JourneySection';
import FunFactsSection from '@/components/about/FunFactsSection';
import AchievementsSection from '@/components/about/AchievementsSection';
import ContactCTASection from '@/components/about/ContactCTASection';

const About = () => {
  const { t } = useLanguage();
  const { scrollToSection } = useAboutEffects();
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const breadcrumbs = [
    { name: t('about'), url: '/about' }
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
        <ScrollEffects />

        <div className="relative z-10">
          <Navigation />
          
          <main id="main-content" className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-20">
              <Breadcrumbs />
              
              <section id="header">
                <AboutHeader />
              </section>
              
              <section id="profile" className="slide-in-right opacity-0 translate-x-full transition-all duration-700 delay-200">
                <ProfileSection />
              </section>

              <MissionVisionSection />
              <PersonalPhilosophySection />
              <WhatIDoSection />
              <JourneySection />
              <FunFactsSection />
              
              <section id="skills">
                <EnhancedSkillsDisplay />
              </section>
              
              {/* Resume Download Section */}
              <section id="resume" className="py-8 scale-in opacity-0 scale-75 transition-all duration-700 delay-800">
                <ResumeDownload />
              </section>
              
              {/* Social Media Links Section */}
              <section id="social" className="py-8 slide-in-left opacity-0 -translate-x-full transition-all duration-700 delay-900">
                <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Connect & Collaborate
                </h2>
                <SocialMediaLinks />
              </section>
              
              {/* Newsletter Signup */}
              <section id="newsletter" className="py-8 fade-in-up opacity-0 translate-y-8 transition-all duration-700 delay-1000">
                <NewsletterSignup />
              </section>
              
              <section id="certifications">
                <CertificationsSection />
              </section>
              
              <section id="experience" className="slide-in-right opacity-0 translate-x-full transition-all duration-700 delay-1100">
                <ExperienceSection />
              </section>
              
              <section id="testimonials">
                <TestimonialsSection />
              </section>
              
              <section id="values" className="fade-in-up opacity-0 translate-y-8 transition-all duration-700 delay-1200">
                <ValuesSection />
              </section>

              <AchievementsSection />
              <ContactCTASection />
            </div>
          </main>
          
          <Footer />
        </div>
        
        {/* SEO & Content Marketing Tools */}
        <SEOBot />
        <SocialShare />
        <Chatbot />
        <ScrollToTop />
      </div>
    </>
  );
};

export default About;
