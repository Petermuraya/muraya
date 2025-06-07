
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, Globe, Search, Zap, Users, MapPin, 
  Smartphone, Monitor, Brain, Target, Award, Rocket 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SEOMetrics {
  overallScore: number;
  coreWebVitals: {
    lcp: number;
    fid: number;
    cls: number;
  };
  kenyaReach: number;
  techKeywordRank: number;
  iotVisibility: number;
  youthEngagement: number;
  mobileScore: number;
  voiceSearchReady: number;
}

const FuturisticSEODashboard = () => {
  const [metrics, setMetrics] = useState<SEOMetrics>({
    overallScore: 94,
    coreWebVitals: { lcp: 2.1, fid: 45, cls: 0.08 },
    kenyaReach: 87,
    techKeywordRank: 92,
    iotVisibility: 89,
    youthEngagement: 85,
    mobileScore: 96,
    voiceSearchReady: 78
  });
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const analyzeAdvancedSEO = async () => {
    setIsAnalyzing(true);
    
    // Simulate advanced SEO analysis
    setTimeout(() => {
      const newMetrics = {
        ...metrics,
        overallScore: Math.min(100, metrics.overallScore + Math.random() * 4 - 2),
        kenyaReach: Math.min(100, metrics.kenyaReach + Math.random() * 6 - 3),
        techKeywordRank: Math.min(100, metrics.techKeywordRank + Math.random() * 5 - 2),
        iotVisibility: Math.min(100, metrics.iotVisibility + Math.random() * 4 - 2),
        youthEngagement: Math.min(100, metrics.youthEngagement + Math.random() * 8 - 4),
        voiceSearchReady: Math.min(100, metrics.voiceSearchReady + Math.random() * 6 - 3)
      };
      
      setMetrics(newMetrics);
      setIsAnalyzing(false);
      
      toast({
        title: "🚀 Advanced SEO Analysis Complete",
        description: "Your Kenya tech SEO performance has been updated with latest insights"
      });
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 75) return "text-yellow-400";
    if (score >= 60) return "text-orange-400";
    return "text-red-400";
  };

  const getScoreGradient = (score: number) => {
    if (score >= 90) return "from-green-400 to-green-600";
    if (score >= 75) return "from-yellow-400 to-yellow-600";
    if (score >= 60) return "from-orange-400 to-orange-600";
    return "from-red-400 to-red-600";
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md border border-gray-700 text-white p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Futuristic SEO Dashboard</h2>
            <p className="text-gray-400 text-sm">Kenya Tech & IoT Optimization</p>
          </div>
        </div>
        <Button 
          onClick={analyzeAdvancedSEO}
          disabled={isAnalyzing}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          {isAnalyzing ? (
            <>
              <Zap className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Brain className="w-4 h-4 mr-2" />
              AI Analysis
            </>
          )}
        </Button>
      </div>

      {/* Overall Score */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-semibold">Overall SEO Score</span>
          <span className={`text-2xl font-bold ${getScoreColor(metrics.overallScore)}`}>
            {metrics.overallScore.toFixed(1)}/100
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div 
            className={`h-3 rounded-full bg-gradient-to-r ${getScoreGradient(metrics.overallScore)} transition-all duration-1000`}
            style={{ width: `${metrics.overallScore}%` }}
          />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gray-800/50 border border-gray-600 p-4">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium">Kenya Reach</span>
          </div>
          <div className="flex items-center justify-between">
            <span className={`text-xl font-bold ${getScoreColor(metrics.kenyaReach)}`}>
              {metrics.kenyaReach.toFixed(0)}%
            </span>
            <Badge variant="secondary" className="bg-green-400/20 text-green-400">
              Strong
            </Badge>
          </div>
        </Card>

        <Card className="bg-gray-800/50 border border-gray-600 p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium">Tech Keywords</span>
          </div>
          <div className="flex items-center justify-between">
            <span className={`text-xl font-bold ${getScoreColor(metrics.techKeywordRank)}`}>
              {metrics.techKeywordRank.toFixed(0)}%
            </span>
            <Badge variant="secondary" className="bg-blue-400/20 text-blue-400">
              Excellent
            </Badge>
          </div>
        </Card>

        <Card className="bg-gray-800/50 border border-gray-600 p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium">IoT Visibility</span>
          </div>
          <div className="flex items-center justify-between">
            <span className={`text-xl font-bold ${getScoreColor(metrics.iotVisibility)}`}>
              {metrics.iotVisibility.toFixed(0)}%
            </span>
            <Badge variant="secondary" className="bg-purple-400/20 text-purple-400">
              High
            </Badge>
          </div>
        </Card>

        <Card className="bg-gray-800/50 border border-gray-600 p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium">Youth Engagement</span>
          </div>
          <div className="flex items-center justify-between">
            <span className={`text-xl font-bold ${getScoreColor(metrics.youthEngagement)}`}>
              {metrics.youthEngagement.toFixed(0)}%
            </span>
            <Badge variant="secondary" className="bg-yellow-400/20 text-yellow-400">
              Growing
            </Badge>
          </div>
        </Card>
      </div>

      {/* Core Web Vitals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800/50 border border-gray-600 p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Monitor className="w-5 h-5 mr-2 text-blue-400" />
            Core Web Vitals
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">LCP (Loading)</span>
              <span className="text-green-400 font-semibold">{metrics.coreWebVitals.lcp}s</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">FID (Interactivity)</span>
              <span className="text-green-400 font-semibold">{metrics.coreWebVitals.fid}ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">CLS (Visual Stability)</span>
              <span className="text-green-400 font-semibold">{metrics.coreWebVitals.cls}</span>
            </div>
          </div>
        </Card>

        <Card className="bg-gray-800/50 border border-gray-600 p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Search className="w-5 h-5 mr-2 text-green-400" />
            Advanced Metrics
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Mobile Score</span>
              <span className="text-green-400 font-semibold">{metrics.mobileScore}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Voice Search Ready</span>
              <span className="text-yellow-400 font-semibold">{metrics.voiceSearchReady}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Kenya Tech Rank</span>
              <span className="text-green-400 font-semibold">#3</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Recommendations */}
      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <h4 className="text-sm font-semibold text-blue-400 mb-2 flex items-center">
          <Award className="w-4 h-4 mr-2" />
          AI-Powered Recommendations
        </h4>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• Optimize for "IoT developer Kenya" - trending +23% this month</li>
          <li>• Add more Swahili keywords for local reach</li>
          <li>• Create content about Kenya tech ecosystem</li>
          <li>• Improve voice search optimization for mobile users</li>
        </ul>
      </div>
    </Card>
  );
};

export default FuturisticSEODashboard;
