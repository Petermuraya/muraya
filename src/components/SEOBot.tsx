
import { useState, useEffect } from 'react';
import { Bot, Zap, Share2, Mail, Calendar, TrendingUp, Search, Globe } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface SEORecommendation {
  type: 'critical' | 'warning' | 'info';
  category: string;
  message: string;
  action?: string;
}

const SEOBot = () => {
  const [isActive, setIsActive] = useState(false);
  const [recommendations, setRecommendations] = useState<SEORecommendation[]>([]);
  const [seoScore, setSeoScore] = useState(0);
  const { toast } = useToast();

  const analyzePage = () => {
    const newRecommendations: SEORecommendation[] = [];
    let score = 100;

    // Check meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription || metaDescription.getAttribute('content')!.length < 120) {
      newRecommendations.push({
        type: 'warning',
        category: 'Meta Tags',
        message: 'Meta description should be 120-160 characters',
        action: 'Optimize meta description length'
      });
      score -= 10;
    }

    // Check title length
    const title = document.title;
    if (title.length > 60) {
      newRecommendations.push({
        type: 'warning',
        category: 'Title Tag',
        message: 'Title tag is too long (>60 characters)',
        action: 'Shorten title tag'
      });
      score -= 5;
    }

    // Check headings structure
    const h1Count = document.querySelectorAll('h1').length;
    if (h1Count !== 1) {
      newRecommendations.push({
        type: 'critical',
        category: 'Headings',
        message: h1Count === 0 ? 'Missing H1 tag' : 'Multiple H1 tags found',
        action: 'Use exactly one H1 tag per page'
      });
      score -= 15;
    }

    // Check images alt text
    const images = document.querySelectorAll('img');
    const imagesWithoutAlt = Array.from(images).filter(img => !img.alt);
    if (imagesWithoutAlt.length > 0) {
      newRecommendations.push({
        type: 'warning',
        category: 'Accessibility',
        message: `${imagesWithoutAlt.length} images missing alt text`,
        action: 'Add descriptive alt text to all images'
      });
      score -= 5;
    }

    // Check internal links
    const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="#"]');
    if (internalLinks.length < 3) {
      newRecommendations.push({
        type: 'info',
        category: 'Internal Linking',
        message: 'Consider adding more internal links',
        action: 'Add relevant internal links'
      });
      score -= 3;
    }

    // Performance recommendations
    newRecommendations.push({
      type: 'info',
      category: 'Performance',
      message: 'Consider implementing lazy loading for images',
      action: 'Enable lazy loading'
    });

    setRecommendations(newRecommendations);
    setSeoScore(Math.max(0, score));
  };

  useEffect(() => {
    if (isActive) {
      analyzePage();
    }
  }, [isActive]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'critical': return 'destructive';
      case 'warning': return 'default';
      case 'info': return 'secondary';
      default: return 'default';
    }
  };

  if (!isActive) {
    return (
      <Button
        onClick={() => setIsActive(true)}
        className="fixed bottom-20 right-8 z-40 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full p-4"
        size="icon"
        title="Activate SEO Bot"
      >
        <Bot className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-24 right-8 z-40 w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-xl">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Bot className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-gray-900 dark:text-white">SEO Assistant</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`font-bold ${getScoreColor(seoScore)}`}>{seoScore}/100</span>
            <Button
              onClick={() => setIsActive(false)}
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </Button>
          </div>
        </div>

        <div className="space-y-3 max-h-60 overflow-y-auto">
          {recommendations.map((rec, index) => (
            <div key={index} className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between mb-2">
                <Badge variant={getBadgeVariant(rec.type) as "default" | "destructive" | "secondary"}>
                  {rec.category}
                </Badge>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">{rec.message}</p>
              {rec.action && (
                <p className="text-xs text-blue-600 dark:text-blue-400">{rec.action}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
          <Button
            onClick={analyzePage}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            size="sm"
          >
            <Search className="w-4 h-4 mr-2" />
            Re-analyze Page
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SEOBot;
