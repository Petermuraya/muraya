
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
import ScrollEffects from '@/components/ScrollEffects';
import useAboutEffects from '@/hooks/useAboutEffects';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import Chatbot from '@/components/Chatbot';

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
              
              <section id="skills">
                <EnhancedSkillsDisplay />
              </section>
              
              {/* Resume Download Section */}
              <section id="resume" className="py-8 scale-in opacity-0 scale-75 transition-all duration-700 delay-400">
                <ResumeDownload />
              </section>
              
              {/* Social Media Links Section */}
              <section id="social" className="py-8 slide-in-left opacity-0 -translate-x-full transition-all duration-700 delay-500">
                <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Connect & Collaborate
                </h2>
                <SocialMediaLinks />
              </section>
              
              {/* Newsletter Signup */}
              <section id="newsletter" className="py-8 fade-in-up opacity-0 translate-y-8 transition-all duration-700 delay-600">
                <NewsletterSignup />
              </section>
              
              <section id="certifications">
                <CertificationsSection />
              </section>
              
              <section id="experience" className="slide-in-right opacity-0 translate-x-full transition-all duration-700 delay-700">
                <ExperienceSection />
              </section>
              
              <section id="testimonials">
                <TestimonialsSection />
              </section>
              
              <section id="values" className="fade-in-up opacity-0 translate-y-8 transition-all duration-700 delay-800">
                <ValuesSection />
              </section>

              {/* Additional Content Sections */}
              <section id="achievements" className="py-12 slide-in-left opacity-0 -translate-x-full transition-all duration-700 delay-900">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-6">
                    Key Achievements
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-6 glass-effect border-[#30363d] rounded-lg hover:border-blue-500/30 transition-all duration-300">
                    <div className="text-3xl font-bold text-blue-400 mb-2">15+</div>
                    <p className="text-[#8b949e]">Projects Completed</p>
                  </div>
                  <div className="text-center p-6 glass-effect border-[#30363d] rounded-lg hover:border-blue-500/30 transition-all duration-300">
                    <div className="text-3xl font-bold text-green-400 mb-2">3+</div>
                    <p className="text-[#8b949e]">Years Experience</p>
                  </div>
                  <div className="text-center p-6 glass-effect border-[#30363d] rounded-lg hover:border-blue-500/30 transition-all duration-300">
                    <div className="text-3xl font-bold text-purple-400 mb-2">10+</div>
                    <p className="text-[#8b949e]">Technologies Mastered</p>
                  </div>
                  <div className="text-center p-6 glass-effect border-[#30363d] rounded-lg hover:border-blue-500/30 transition-all duration-300">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">5+</div>
                    <p className="text-[#8b949e]">AI/ML Projects</p>
                  </div>
                </div>
              </section>

              {/* Contact Call-to-Action */}
              <section id="contact-cta" className="py-12 text-center scale-in opacity-0 scale-75 transition-all duration-700 delay-1000">
                <div className="glass-effect border-[#30363d] rounded-lg p-8 max-w-2xl mx-auto">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
                    Let's Build Something Amazing Together
                  </h2>
                  <p className="text-[#8b949e] mb-6 text-lg">
                    Ready to discuss your next project or explore collaboration opportunities? 
                    I'm always excited to work on innovative solutions that make a difference.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a 
                      href="/contact" 
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                    >
                      Get In Touch
                    </a>
                    <a 
                      href="/projects" 
                      className="px-6 py-3 border border-[#30363d] hover:border-blue-500/50 rounded-lg text-white font-medium transition-all duration-300 hover:bg-blue-500/10"
                    >
                      View My Work
                    </a>
                  </div>
                </div>
              </section>
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
