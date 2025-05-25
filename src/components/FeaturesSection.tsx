
import { Card } from '@/components/ui/card';
import { Sparkles, Zap, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Sparkles,
      title: t('aiInnovation'),
      description: t('aiInnovationDesc')
    },
    {
      icon: Zap,
      title: t('iotExcellence'),
      description: t('iotExcellenceDesc')
    },
    {
      icon: Target,
      title: t('globalImpact'),
      description: t('globalImpactDesc')
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#161b22]/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">{t('whyChooseInnovation')}</h2>
          <p className="text-xl text-[#7d8590] max-w-2xl mx-auto">
            {t('drivingTechnological')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group p-8 text-center border border-[#30363d] bg-[#161b22]/50 backdrop-blur-md hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:shadow-blue-500/20">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">{feature.title}</h3>
              <p className="text-[#8b949e] leading-relaxed group-hover:text-[#c9d1d9] transition-colors duration-300">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
