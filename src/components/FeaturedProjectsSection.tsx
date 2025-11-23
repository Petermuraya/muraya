import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  tech: string[];
  github: string;
  demo: string;
  featured: boolean;
  created_at: string;
}
interface FeaturedSectionConfig {
  title: string;
  subtitle: string;
  enabled: boolean;
}
const FeaturedProjectsSection = () => {
  const {
    t
  } = useLanguage();
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [sectionConfig, setSectionConfig] = useState<FeaturedSectionConfig>({
    title: 'Featured Projects',
    subtitle: 'Innovative solutions in AI, IoT, and cloud technologies for social impact',
    enabled: true
  });
  const [isLoading, setIsLoading] = useState(true);
  const {
    toast
  } = useToast();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      // Fetch both featured projects and section configuration
      const [projectsResult, configResult] = await Promise.all([supabase.from('admin_projects').select('*').eq('featured', true).order('created_at', {
        ascending: false
      }).limit(3),
      // Direct table access for the configuration
      (supabase as any).from('featured_section_config').select('*').eq('section', 'projects').single()]);
      if (projectsResult.error) {
        console.error('Error fetching featured projects:', projectsResult.error);
        setFeaturedProjects(getDefaultProjects());
      } else if (projectsResult.data && projectsResult.data.length > 0) {
        // Transform database fields to match interface
        const transformedProjects = projectsResult.data.map((p: any) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          category: p.category || 'General',
          image: p.image_url || '',
          tech: p.technologies || [],
          github: p.github_url || '',
          demo: p.demo_url || '',
          featured: p.featured,
          created_at: p.created_at
        }));
        setFeaturedProjects(transformedProjects);
      } else {
        setFeaturedProjects(getDefaultProjects());
      }

      // Handle config result
      if (configResult.error) {
        console.log('No existing config found, using defaults');
      } else if (configResult.data) {
        setSectionConfig({
          title: configResult.data.title || 'Featured Projects',
          subtitle: configResult.data.subtitle || 'Innovative solutions in AI, IoT, and cloud technologies for social impact',
          enabled: configResult.data.enabled !== false
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setFeaturedProjects(getDefaultProjects());
    } finally {
      setIsLoading(false);
    }
  };
  const getDefaultProjects = (): Project[] => [{
    id: 'thoraxiq',
    title: t('thoraxiqTitle'),
    description: t('thoraxiqDesc'),
    category: 'AI/ML',
    tech: ["Python", "AI/ML", "TensorFlow", "FastAPI"],
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
    github: '',
    demo: '',
    featured: true,
    created_at: new Date().toISOString()
  }, {
    id: 'smart-agriculture',
    title: t('smartAgricultureTitle'),
    description: t('smartAgricultureDesc'),
    category: 'IoT',
    tech: ["Python", "Azure IoT", "React", "MongoDB"],
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop",
    github: '',
    demo: '',
    featured: true,
    created_at: new Date().toISOString()
  }, {
    id: 'health-tech',
    title: t('healthTechTitle'),
    description: t('healthTechDesc'),
    category: 'Health Tech',
    tech: ["React Native", "Node.js", "PostgreSQL", "AWS"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
    github: '',
    demo: '',
    featured: true,
    created_at: new Date().toISOString()
  }];
  const getGradientClass = (index: number) => {
    const gradients = ["from-blue-500 to-cyan-500", "from-green-500 to-emerald-500", "from-purple-500 to-pink-500"];
    return gradients[index % gradients.length];
  };

  // Don't render the section if it's disabled
  if (!sectionConfig.enabled) {
    return null;
  }
  if (isLoading) {
    return <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">{sectionConfig.title}</h2>
            <p className="text-xl text-[#7d8590] max-w-2xl mx-auto">
              {sectionConfig.subtitle}
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>;
  }
  return;
};
export default FeaturedProjectsSection;