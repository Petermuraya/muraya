
import { useState, useEffect } from 'react';
import { Bot, Zap, MapPin, Users, Rocket, TrendingUp, Globe, Brain } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { advancedSEOConfig } from '@/lib/advanced-seo-config';

interface AdvancedSEORecommendation {
  type: 'critical' | 'warning' | 'info' | 'opportunity';
  category: string;
  message: string;
  action?: string;
  impact: 'high' | 'medium' | 'low';
  region?: string;
  techFocus?: string;
}

const EnhancedSEOBot = () => {
  const [isActive, setIsActive] = useState(false);
  const [recommendations, setRecommendations] = useState<AdvancedSEORecommendation[]>([]);
  const [seoScore, setSeoScore] = useState(0);
  const [kenyaScore, setKenyaScore] = useState(0);
  const [iotScore, setIotScore] = useState(0);
  const { toast } = useToast();

  const analyzeAdvancedSEO = () => {
    const newRecommendations: AdvancedSEORecommendation[] = [];
    let score = 100;
    let kenyaReach = 95;
    let iotVisibility = 92;

    // Kenya Tech Ecosystem Analysis
    const kenyaTechKeywords = document.body.innerText.toLowerCase();
    const kenyaKeywordCount = advancedSEOConfig.kenyaTechEcosystem.hubs
      .filter(hub => kenyaTechKeywords.includes(hub.toLowerCase())).length;

    if (kenyaKeywordCount < 2) {
      newRecommendations.push({
        type: 'opportunity',
        category: 'Kenya Tech Ecosystem',
        message: 'Add more references to Kenya tech hubs like iHub, Nairobi Garage',
        action: 'Include mentions of major Kenya innovation centers',
        impact: 'high',
        region: 'Kenya',
        techFocus: 'Ecosystem'
      });
      kenyaReach -= 10;
    }

    // IoT & Technology Keywords Analysis
    const iotKeywords = ['iot', 'internet of things', 'smart agriculture', 'connected devices'];
    const iotKeywordCount = iotKeywords.filter(keyword => 
      kenyaTechKeywords.includes(keyword)).length;

    if (iotKeywordCount < 3) {
      newRecommendations.push({
        type: 'warning',
        category: 'IoT SEO',
        message: 'Enhance IoT keyword density for better tech visibility',
        action: 'Add more IoT-related terminology and use cases',
        impact: 'high',
        techFocus: 'IoT'
      });
      iotVisibility -= 15;
      score -= 8;
    }

    // Voice Search Optimization
    const voiceKeywords = advancedSEOConfig.voiceSearchKeywords;
    const hasVoiceOptimization = voiceKeywords.some(keyword => 
      kenyaTechKeywords.includes(keyword.toLowerCase()));

    if (!hasVoiceOptimization) {
      newRecommendations.push({
        type: 'info',
        category: 'Voice Search',
        message: 'Optimize for voice search queries about Kenya tech',
        action: 'Add conversational keywords and FAQ content',
        impact: 'medium',
        techFocus: 'Voice Search'
      });
      score -= 5;
    }

    // Youth Tech Engagement
    const youthKeywords = ['youth', 'young', 'students', 'mentorship', 'education'];
    const youthEngagement = youthKeywords.filter(keyword => 
      kenyaTechKeywords.includes(keyword)).length;

    if (youthEngagement < 2) {
      newRecommendations.push({
        type: 'opportunity',
        category: 'Youth Tech',
        message: 'Increase content about youth tech leadership in Kenya',
        action: 'Add stories about mentoring young developers',
        impact: 'medium',
        region: 'Kenya',
        techFocus: 'Youth Engagement'
      });
      score -= 5;
    }

    // Multilingual SEO (Swahili)
    const hasSwahiliContent = kenyaTechKeywords.includes('swahili') || 
                             kenyaTechKeywords.includes('kiswahili');
    
    if (!hasSwahiliContent) {
      newRecommendations.push({
        type: 'info',
        category: 'Multilingual SEO',
        message: 'Consider adding Swahili content for local reach',
        action: 'Add basic Swahili tech terms and descriptions',
        impact: 'medium',
        region: 'Kenya',
        techFocus: 'Localization'
      });
      kenyaReach -= 8;
    }

    // Social Schema for Kenya Tech Community
    const hasLocalSchema = document.querySelector('script[type="application/ld+json"]');
    if (!hasLocalSchema?.textContent?.includes('Kenya')) {
      newRecommendations.push({
        type: 'critical',
        category: 'Local Schema',
        message: 'Missing Kenya-specific structured data',
        action: 'Add location-based schema markup',
        impact: 'high',
        region: 'Kenya'
      });
      score -= 12;
    }

    // Futuristic SEO Opportunities
    newRecommendations.push({
      type: 'opportunity',
      category: 'Future Tech',
      message: 'Prepare for AR/VR portfolio experiences',
      action: 'Consider implementing WebXR for immersive portfolio',
      impact: 'low',
      techFocus: 'Emerging Tech'
    });

    newRecommendations.push({
      type: 'info',
      category: 'AI Integration',
      message: 'Implement AI-powered content personalization',
      action: 'Use AI to customize content based on visitor interests',
      impact: 'medium',
      techFocus: 'AI/ML'
    });

    setRecommendations(newRecommendations);
    setSeoScore(Math.max(0, score));
    setKenyaScore(Math.max(0, kenyaReach));
    setIotScore(Math.max(0, iotVisibility));
  };

  useEffect(() => {
    if (isActive) {
      analyzeAdvancedSEO();
    }
  }, [isActive]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 75) return 'text-yellow-400';
    if (score >= 60) return 'text-orange-400';
    return 'text-red-400';
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'critical': return 'destructive';
      case 'warning': return 'default';
      case 'opportunity': return 'secondary';
      case 'info': return 'outline';
      default: return 'default';
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'high': return <TrendingUp className="w-3 h-3 text-red-400" />;
      case 'medium': return <TrendingUp className="w-3 h-3 text-yellow-400" />;
      case 'low': return <TrendingUp className="w-3 h-3 text-green-400" />;
      default: return null;
    }
  };

  if (!isActive) {
    return (
      <Button
        onClick={() => setIsActive(true)}
        className="fixed bottom-32 right-8 z-40 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 hover:from-blue-700 hover:via-purple-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full p-4"
        size="icon"
        title="Activate Futuristic SEO Bot"
      >
        <Brain className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-36 right-8 z-40 w-96 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md border border-gray-700 shadow-xl text-white">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-semibold text-white">Futuristic SEO Bot</span>
              <p className="text-xs text-gray-400">Kenya Tech AI Analysis</p>
            </div>
          </div>
          <Button
            onClick={() => setIsActive(false)}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            ×
          </Button>
        </div>

        {/* Score Dashboard */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center">
            <div className={`text-lg font-bold ${getScoreColor(seoScore)}`}>
              {seoScore}
            </div>
            <div className="text-xs text-gray-400">Overall</div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-bold ${getScoreColor(kenyaScore)}`}>
              {kenyaScore}
            </div>
            <div className="text-xs text-gray-400">Kenya</div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-bold ${getScoreColor(iotScore)}`}>
              {iotScore}
            </div>
            <div className="text-xs text-gray-400">IoT</div>
          </div>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto">
          {recommendations.map((rec, index) => (
            <div key={index} className="p-3 rounded-lg border border-gray-600 bg-gray-800/30">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Badge variant={getBadgeVariant(rec.type) as any} className="text-xs">
                    {rec.category}
                  </Badge>
                  {getImpactIcon(rec.impact)}
                </div>
                {rec.region && (
                  <Badge variant="outline" className="text-xs border-green-400 text-green-400">
                    <MapPin className="w-2 h-2 mr-1" />
                    {rec.region}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-300 mb-1">{rec.message}</p>
              {rec.action && (
                <p className="text-xs text-blue-400">{rec.action}</p>
              )}
              {rec.techFocus && (
                <Badge variant="secondary" className="text-xs mt-1 bg-purple-400/20 text-purple-400">
                  {rec.techFocus}
                </Badge>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-gray-600 space-y-2">
          <Button
            onClick={analyzeAdvancedSEO}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            size="sm"
          >
            <Rocket className="w-4 h-4 mr-2" />
            AI Re-analysis
          </Button>
          
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
            <div className="flex items-center space-x-1">
              <Globe className="w-3 h-3" />
              <span>Global Reach</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span>Youth Focus</span>
            </div>
            <div className="flex items-center space-x-1">
              <Zap className="w-3 h-3" />
              <span>IoT Ready</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EnhancedSEOBot;
