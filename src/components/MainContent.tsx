
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import FeaturedProjectsSection from '@/components/FeaturedProjectsSection';
import SkillsSection from '@/components/SkillsSection';

const MainContent = () => {
  return (
    <main id="main-content" role="main">
      <section id="home" aria-label="Home" className="scroll-animate opacity-0">
        <HeroSection />
      </section>

      <section id="about" aria-label="About" className="scroll-animate opacity-0">
        <FeaturesSection />
      </section>

      <section id="projects" aria-label="Projects" className="scroll-animate opacity-0">
        <FeaturedProjectsSection />
      </section>

      <section id="skills" aria-label="Skills" className="scroll-animate opacity-0">
        <SkillsSection />
      </section>
    </main>
  );
};

export default MainContent;
