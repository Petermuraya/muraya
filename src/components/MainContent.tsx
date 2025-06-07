
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import FeaturedProjectsSection from '@/components/FeaturedProjectsSection';
import SkillsSection from '@/components/SkillsSection';

const MainContent = () => {
  return (
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
  );
};

export default MainContent;
