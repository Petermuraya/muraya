
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import FeaturedProjectsSection from '@/components/FeaturedProjectsSection';
import SkillsSection from '@/components/SkillsSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <FeaturedProjectsSection />
      <SkillsSection />
      <Footer />
    </div>
  );
};

export default Index;
