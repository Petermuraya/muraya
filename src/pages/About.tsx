
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
import ContentScheduler from '@/components/ContentScheduler';
import SocialMediaLinks from '@/components/SocialMediaLinks';
import ResumeDownload from '@/components/ResumeDownload';
import useAboutEffects from '@/hooks/useAboutEffects';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import Chatbot from '@/components/Chatbot';

const About = () => {
  const { t } = useLanguage();
  useAboutEffects();
  
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

        <div className="relative z-10">
          <Navigation />
          
          <main id="main-content" className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-12">
              <Breadcrumbs />
              <AboutHeader />
              <ProfileSection />
              <EnhancedSkillsDisplay />
              
              {/* Resume Download Section */}
              <section className="py-8">
                <ResumeDownload />
              </section>
              
              {/* Social Media Links Section */}
              <section className="py-8">
                <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Connect & Collaborate
                </h2>
                <SocialMediaLinks />
              </section>
              
              {/* Newsletter Signup */}
              <section className="py-8">
                <NewsletterSignup />
              </section>
              
              <CertificationsSection />
              <ExperienceSection />
              <TestimonialsSection />
              <ValuesSection />
            </div>
          </main>
          
          <Footer />
        </div>
        
        {/* SEO & Content Marketing Tools */}
        <SEOBot />
        <SocialShare />
        <ContentScheduler />
        <Chatbot />
        <ScrollToTop />
      </div>
    </>
  );
};

export default About;
