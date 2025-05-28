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

const About = () => {
  useAboutEffects();

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
