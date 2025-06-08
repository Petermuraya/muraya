
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AdvancedSEO from '@/components/AdvancedSEO';
import EnhancedSEOBot from '@/components/EnhancedSEOBot';
import VoiceChatbot from '@/components/VoiceChatbot';
import SkipLink from '@/components/SkipLink';
import BackgroundEffects from '@/components/BackgroundEffects';
import MainContent from '@/components/MainContent';
import SEODashboardOverlay from '@/components/SEODashboardOverlay';
import SEOHead from '@/components/SEOHead';
import { generateEnhancedStructuredData } from '@/lib/structured-data';

const Index = () => {
  // Generate enhanced structured data
  const enhancedStructuredData = generateEnhancedStructuredData();

  return (
    <>
      <SkipLink />
      <SEOHead 
        title="Peter Muraya (@sammie1604) | Leading IoT & AI Developer Kenya | React TypeScript Expert | Youth Tech Leader"
        description="Award-winning IoT & AI specialist Peter Muraya from Kenya building cutting-edge solutions for healthcare, agriculture, and smart cities. Leading youth tech innovation in Africa. Expert in React, TypeScript, Node.js, Python, and cloud architecture. Connect @sammie1604 LinkedIn, GitHub @petermuraya, Instagram @murayandungu. Email: sammypeter1944@gmail.com | +254 700 471113"
        keywords="Peter Muraya Ndungu, Kenya IoT developer, AI specialist Africa, React expert Kenya, TypeScript developer Nairobi, Node.js developer Kenya, Python AI developer, youth tech leader Kenya, African innovation, smart agriculture Kenya, health tech Africa, sammie1604, murayandungu, Karatina University developer, Nairobi tech community, Kenya developer community, Africa tech leaders, IoT Kenya, AI Africa, sammypeter1944@gmail.com, GitHub petermuraya, LinkedIn peter-muraya-ndungu"
        image="https://i.postimg.cc/902NmQLh/IMG-20240709-105245-53.jpg"
        url="https://petermuraya.github.io/muraya/"
      />
      <AdvancedSEO 
        title="Peter Muraya Ndung'u (@sammie1604) | Leading IoT & AI Developer Kenya | React TypeScript Expert | Youth Tech Leader"
        description="Award-winning IoT & AI specialist Peter Muraya from Kenya building cutting-edge solutions for healthcare, agriculture, and smart cities. Leading youth tech innovation in Africa. Expert in React, TypeScript, Node.js, Python, and cloud architecture. Connect @sammie1604 LinkedIn, GitHub @petermuraya, Instagram @murayandungu. Email: sammypeter1944@gmail.com | +254 700 471113"
        keywords="Peter Muraya Ndungu, Kenya IoT developer, AI specialist Africa, React expert Kenya, TypeScript developer Nairobi, Node.js developer Kenya, Python AI developer, youth tech leader Kenya, African innovation, smart agriculture Kenya, health tech Africa, sammie1604, murayandungu, Karatina University developer, Nairobi tech community, Kenya developer community, Africa tech leaders, IoT Kenya, AI Africa, sammypeter1944@gmail.com, GitHub petermuraya, LinkedIn peter-muraya-ndungu"
        image="https://i.postimg.cc/902NmQLh/IMG-20240709-105245-53.jpg"
        customStructuredData={enhancedStructuredData}
      />
      
      <div className="min-h-screen bg-[#0d1117] text-white overflow-x-hidden">
        <BackgroundEffects />

        <div className="relative z-10">
          <Navigation />
          <MainContent />
          <Footer />
        </div>
        
        <SEODashboardOverlay />
        
        {/* Enhanced SEO Features */}
        <EnhancedSEOBot />
        <VoiceChatbot />
      </div>
    </>
  );
};

export default Index;
