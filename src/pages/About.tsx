
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

              {/* Mission & Vision Section */}
              <section id="mission" className="py-12 fade-in-up opacity-0 translate-y-8 transition-all duration-700 delay-300">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-6">
                    Mission & Vision
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="glass-effect border-[#30363d] rounded-lg p-8 hover:border-blue-500/30 transition-all duration-300">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🎯</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">My Mission</h3>
                    </div>
                    <p className="text-[#8b949e] text-lg leading-relaxed text-center">
                      To leverage cutting-edge technologies like AI, IoT, and cloud computing to create impactful solutions 
                      that address real-world challenges in healthcare, agriculture, and sustainable development across Africa and beyond.
                    </p>
                  </div>
                  
                  <div className="glass-effect border-[#30363d] rounded-lg p-8 hover:border-purple-500/30 transition-all duration-300">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🚀</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">My Vision</h3>
                    </div>
                    <p className="text-[#8b949e] text-lg leading-relaxed text-center">
                      To be a leading innovator in tech-for-good initiatives, building scalable solutions that bridge 
                      the digital divide and empower communities through accessible, intelligent technology platforms.
                    </p>
                  </div>
                </div>
              </section>

              {/* Personal Philosophy Section */}
              <section id="philosophy" className="py-12 slide-in-left opacity-0 -translate-x-full transition-all duration-700 delay-400">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-6">
                    My Philosophy
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
                </div>
                
                <div className="max-w-4xl mx-auto">
                  <div className="glass-effect border-[#30363d] rounded-xl p-8 hover:border-cyan-500/30 transition-all duration-300">
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-3xl">💡</span>
                      </div>
                      <h3 className="text-2xl font-semibold text-white mb-4">"Technology with Purpose"</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="text-center p-4">
                        <div className="text-blue-400 text-lg font-semibold mb-2">Innovation</div>
                        <p className="text-[#8b949e] text-sm">Constantly exploring new technologies to solve complex problems</p>
                      </div>
                      <div className="text-center p-4">
                        <div className="text-green-400 text-lg font-semibold mb-2">Impact</div>
                        <p className="text-[#8b949e] text-sm">Building solutions that create meaningful change in communities</p>
                      </div>
                      <div className="text-center p-4">
                        <div className="text-purple-400 text-lg font-semibold mb-2">Accessibility</div>
                        <p className="text-[#8b949e] text-sm">Ensuring technology is inclusive and available to everyone</p>
                      </div>
                    </div>
                    
                    <p className="text-[#8b949e] text-lg leading-relaxed text-center">
                      I believe that technology should serve humanity, not the other way around. Every line of code I write, 
                      every system I design, and every solution I build is guided by the principle that innovation should 
                      improve lives, especially for those who need it most.
                    </p>
                  </div>
                </div>
              </section>

              {/* What I Do Section */}
              <section id="what-i-do" className="py-12 slide-in-right opacity-0 translate-x-full transition-all duration-700 delay-500">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-6">
                    What I Do
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="glass-effect border-[#30363d] rounded-lg p-6 hover:border-green-500/30 transition-all duration-300 hover:-translate-y-2">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <span className="text-xl">🏥</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3">HealthTech Solutions</h3>
                      <p className="text-[#8b949e]">
                        Developing AI-powered diagnostic tools like ThoraxIQ for chest X-ray analysis, 
                        telemedicine platforms, and accessibility-focused health applications.
                      </p>
                    </div>
                  </div>
                  
                  <div className="glass-effect border-[#30363d] rounded-lg p-6 hover:border-yellow-500/30 transition-all duration-300 hover:-translate-y-2">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <span className="text-xl">🌱</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3">Smart Agriculture</h3>
                      <p className="text-[#8b949e]">
                        Building IoT-enabled farming solutions with real-time monitoring, 
                        predictive analytics, and automated irrigation systems for sustainable agriculture.
                      </p>
                    </div>
                  </div>
                  
                  <div className="glass-effect border-[#30363d] rounded-lg p-6 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-2">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <span className="text-xl">☁️</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3">Cloud & IoT</h3>
                      <p className="text-[#8b949e]">
                        Architecting scalable cloud infrastructure and IoT ecosystems using 
                        Azure, Firebase, and edge computing technologies.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Journey & Background Section */}
              <section id="journey" className="py-12 fade-in-up opacity-0 translate-y-8 transition-all duration-700 delay-600">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-6">
                    My Journey
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
                </div>
                
                <div className="max-w-4xl mx-auto">
                  <div className="space-y-8">
                    {/* Education */}
                    <div className="glass-effect border-[#30363d] rounded-lg p-6 hover:border-blue-500/30 transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-xl">🎓</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">Academic Foundation</h3>
                          <p className="text-blue-400 font-medium mb-2">BSc Information Technology - Karatina University (Expected 2025)</p>
                          <p className="text-[#8b949e] leading-relaxed">
                            Currently pursuing a comprehensive degree in Information Technology, with focus on software development, 
                            systems analysis, and emerging technologies. Maintaining excellent academic performance while actively 
                            participating in innovation clubs and tech communities.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Early Interest */}
                    <div className="glass-effect border-[#30363d] rounded-lg p-6 hover:border-green-500/30 transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-xl">🌟</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">Early Passion for Technology</h3>
                          <p className="text-green-400 font-medium mb-2">From Curiosity to Innovation</p>
                          <p className="text-[#8b949e] leading-relaxed">
                            My journey into technology began with a fascination for how things work. This curiosity evolved into 
                            a passion for creating solutions that solve real problems. I started with basic programming and 
                            gradually expanded into AI, IoT, and cloud technologies, always with a focus on social impact.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Current Focus */}
                    <div className="glass-effect border-[#30363d] rounded-lg p-6 hover:border-purple-500/30 transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-xl">🚀</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">Current Endeavors</h3>
                          <p className="text-purple-400 font-medium mb-2">Building the Future Today</p>
                          <p className="text-[#8b949e] leading-relaxed">
                            Today, I'm actively working on multiple projects that combine AI, IoT, and cloud technologies. 
                            From developing ThoraxIQ for medical diagnostics to creating smart agriculture solutions, 
                            I'm committed to building technology that creates meaningful impact in African communities and beyond.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Fun Facts Section */}
              <section id="fun-facts" className="py-12 scale-in opacity-0 scale-75 transition-all duration-700 delay-700">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-6">
                    Beyond the Code
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="glass-effect border-[#30363d] rounded-lg p-6 text-center hover:border-red-500/30 transition-all duration-300 hover:-translate-y-2">
                    <div className="text-4xl mb-4">☕</div>
                    <h3 className="text-lg font-semibold text-white mb-2">Coffee Enthusiast</h3>
                    <p className="text-[#8b949e] text-sm">Fueled by coffee and powered by curiosity. My best code comes after the perfect cup.</p>
                  </div>
                  
                  <div className="glass-effect border-[#30363d] rounded-lg p-6 text-center hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-2">
                    <div className="text-4xl mb-4">📚</div>
                    <h3 className="text-lg font-semibold text-white mb-2">Continuous Learner</h3>
                    <p className="text-[#8b949e] text-sm">Always exploring new technologies, frameworks, and methodologies to stay ahead of the curve.</p>
                  </div>
                  
                  <div className="glass-effect border-[#30363d] rounded-lg p-6 text-center hover:border-green-500/30 transition-all duration-300 hover:-translate-y-2">
                    <div className="text-4xl mb-4">🌍</div>
                    <h3 className="text-lg font-semibold text-white mb-2">Global Thinker</h3>
                    <p className="text-[#8b949e] text-sm">Passionate about using technology to solve global challenges, especially in developing regions.</p>
                  </div>
                  
                  <div className="glass-effect border-[#30363d] rounded-lg p-6 text-center hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-2">
                    <div className="text-4xl mb-4">🎵</div>
                    <h3 className="text-lg font-semibold text-white mb-2">Music Lover</h3>
                    <p className="text-[#8b949e] text-sm">Coding sessions are always better with the right soundtrack. Music helps me think creatively.</p>
                  </div>
                </div>
              </section>
              
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

              {/* Enhanced Key Achievements */}
              <section id="achievements" className="py-12 slide-in-left opacity-0 -translate-x-full transition-all duration-700 delay-1300">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-6">
                    Impact & Achievements
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
                  <p className="text-[#8b949e] mt-4 text-lg">Measurable results in technology innovation</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="text-center p-6 glass-effect border-[#30363d] rounded-lg hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-2">
                    <div className="text-4xl font-bold text-blue-400 mb-2">20+</div>
                    <p className="text-[#8b949e] font-medium">Projects Delivered</p>
                    <p className="text-xs text-[#7d8590] mt-1">Across multiple domains</p>
                  </div>
                  <div className="text-center p-6 glass-effect border-[#30363d] rounded-lg hover:border-green-500/30 transition-all duration-300 hover:-translate-y-2">
                    <div className="text-4xl font-bold text-green-400 mb-2">3+</div>
                    <p className="text-[#8b949e] font-medium">Years Experience</p>
                    <p className="text-xs text-[#7d8590] mt-1">In cutting-edge tech</p>
                  </div>
                  <div className="text-center p-6 glass-effect border-[#30363d] rounded-lg hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-2">
                    <div className="text-4xl font-bold text-purple-400 mb-2">15+</div>
                    <p className="text-[#8b949e] font-medium">Technologies</p>
                    <p className="text-xs text-[#7d8590] mt-1">Full-stack expertise</p>
                  </div>
                  <div className="text-center p-6 glass-effect border-[#30363d] rounded-lg hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-2">
                    <div className="text-4xl font-bold text-cyan-400 mb-2">5+</div>
                    <p className="text-[#8b949e] font-medium">AI/ML Solutions</p>
                    <p className="text-xs text-[#7d8590] mt-1">Real-world applications</p>
                  </div>
                </div>

                {/* Key Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-effect border-[#30363d] rounded-lg p-6 hover:border-blue-500/30 transition-all duration-300">
                    <h3 className="text-lg font-semibold text-white mb-3">🏆 Notable Projects</h3>
                    <ul className="space-y-2 text-[#8b949e]">
                      <li>• ThoraxIQ: AI chest X-ray diagnostic system</li>
                      <li>• Smart Agriculture IoT platform with Azure integration</li>
                      <li>• Hotel price prediction ML system</li>
                      <li>• Disease spread simulation and analysis tools</li>
                    </ul>
                  </div>
                  
                  <div className="glass-effect border-[#30363d] rounded-lg p-6 hover:border-green-500/30 transition-all duration-300">
                    <h3 className="text-lg font-semibold text-white mb-3">🌟 Leadership & Community</h3>
                    <ul className="space-y-2 text-[#8b949e]">
                      <li>• Active member of Karatina Innovation Club</li>
                      <li>• Contributing member of Akiliedge Tech Network</li>
                      <li>• Mentor for junior developers and students</li>
                      <li>• Tech workshop organizer and speaker</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Enhanced Contact Call-to-Action */}
              <section id="contact-cta" className="py-16 text-center scale-in opacity-0 scale-75 transition-all duration-700 delay-1400">
                <div className="glass-effect border-[#30363d] rounded-xl p-10 max-w-4xl mx-auto relative overflow-hidden">
                  {/* Background gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 rounded-xl" />
                  
                  <div className="relative z-10">
                    <div className="mb-6">
                      <span className="text-6xl mb-4 block">🚀</span>
                      <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
                        Ready to Build the Future Together?
                      </h2>
                    </div>
                    
                    <p className="text-[#8b949e] mb-8 text-xl max-w-3xl mx-auto leading-relaxed">
                      Whether you're looking to revolutionize healthcare with AI, transform agriculture with IoT, 
                      or build scalable cloud solutions, I'm passionate about turning innovative ideas into reality. 
                      Let's create something that makes a difference.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-sm">
                      <div className="flex items-center justify-center space-x-2 text-[#7d8590]">
                        <span>💡</span>
                        <span>Innovation-driven approach</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-[#7d8590]">
                        <span>🤝</span>
                        <span>Collaborative partnership</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-[#7d8590]">
                        <span>🎯</span>
                        <span>Results-focused delivery</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a 
                        href="/contact" 
                        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-1"
                      >
                        Start a Conversation
                      </a>
                      <a 
                        href="/projects" 
                        className="px-8 py-4 border border-[#30363d] hover:border-blue-500/50 rounded-lg text-white font-semibold transition-all duration-300 hover:bg-blue-500/10 hover:-translate-y-1"
                      >
                        Explore My Work
                      </a>
                    </div>
                    
                    <div className="mt-6 text-sm text-[#7d8590]">
                      <p>Based in Kenya 🇰🇪 • Available for global projects • Open to remote collaboration</p>
                    </div>
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
