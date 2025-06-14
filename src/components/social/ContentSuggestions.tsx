
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Lightbulb, 
  Copy, 
  RefreshCw, 
  Sparkles,
  Clock,
  Target
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContentSuggestion {
  id: string;
  platform: string;
  content: string;
  type: 'tip' | 'question' | 'announcement' | 'inspiration';
  engagement_score: number;
  best_time: string;
}

const ContentSuggestions = () => {
  const { toast } = useToast();
  const [suggestions, setSuggestions] = useState<ContentSuggestion[]>([
    {
      id: '1',
      platform: 'LinkedIn',
      content: 'Share your experience building IoT solutions for African markets. What challenges did you overcome?',
      type: 'question',
      engagement_score: 8.5,
      best_time: '9:00 AM'
    },
    {
      id: '2',
      platform: 'Twitter',
      content: '🚀 Just deployed a new AI feature that helps optimize M-Pesa transactions. The future of fintech is here! #AI #Fintech #Innovation',
      type: 'announcement',
      engagement_score: 9.2,
      best_time: '2:00 PM'
    },
    {
      id: '3',
      platform: 'Instagram',
      content: 'Behind the scenes: Working late on cutting-edge AI algorithms. Passion drives innovation! 💻✨ #DeveloperLife #AI #TechPassion',
      type: 'inspiration',
      engagement_score: 7.8,
      best_time: '7:00 PM'
    },
    {
      id: '4',
      platform: 'LinkedIn',
      content: 'Pro tip: When building IoT systems, always prioritize security from day one. Here are 5 essential practices...',
      type: 'tip',
      engagement_score: 8.9,
      best_time: '11:00 AM'
    }
  ]);
  
  const [isGenerating, setIsGenerating] = useState(false);

  const generateNewSuggestions = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newSuggestions = [
      {
        id: Date.now().toString(),
        platform: 'Twitter',
        content: 'The intersection of AI and IoT is revolutionizing how we interact with technology. What\'s your take on this convergence?',
        type: 'question' as const,
        engagement_score: 8.3,
        best_time: '3:00 PM'
      },
      {
        id: (Date.now() + 1).toString(),
        platform: 'LinkedIn',
        content: 'Exciting news! Our team just achieved a breakthrough in real-time data processing for financial applications. 🎉',
        type: 'announcement' as const,
        engagement_score: 9.1,
        best_time: '10:00 AM'
      }
    ];
    
    setSuggestions(prev => [...newSuggestions, ...prev.slice(0, 2)]);
    setIsGenerating(false);
    
    toast({
      title: "New Content Generated",
      description: "Fresh AI-powered content suggestions are ready!",
    });
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to Clipboard",
      description: "Content suggestion copied successfully!",
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'tip': return 'bg-blue-50 text-blue-600 dark:bg-blue-900/20';
      case 'question': return 'bg-purple-50 text-purple-600 dark:bg-purple-900/20';
      case 'announcement': return 'bg-green-50 text-green-600 dark:bg-green-900/20';
      case 'inspiration': return 'bg-orange-50 text-orange-600 dark:bg-orange-900/20';
      default: return 'bg-gray-50 text-gray-600 dark:bg-gray-900/20';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'LinkedIn': return 'text-blue-600';
      case 'Twitter': return 'text-blue-400';
      case 'Instagram': return 'text-pink-500';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5" />
            <span>AI Content Suggestions</span>
          </CardTitle>
          <Button 
            onClick={generateNewSuggestions} 
            variant="outline" 
            size="sm"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 mr-2" />
            )}
            {isGenerating ? 'Generating...' : 'Generate New'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`font-medium ${getPlatformColor(suggestion.platform)}`}>
                    {suggestion.platform}
                  </span>
                  <Badge variant="secondary" className={getTypeColor(suggestion.type)}>
                    {suggestion.type}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Target className="w-3 h-3" />
                    <span>{suggestion.engagement_score}/10</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{suggestion.best_time}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-900 dark:text-white leading-relaxed">
                {suggestion.content}
              </p>
              
              <div className="flex justify-end">
                <Button 
                  onClick={() => copyToClipboard(suggestion.content)}
                  variant="outline" 
                  size="sm"
                >
                  <Copy className="w-3 h-3 mr-2" />
                  Copy
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentSuggestions;
