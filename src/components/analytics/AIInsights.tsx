
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb,
  RefreshCw,
  Sparkles
} from 'lucide-react';

interface Insight {
  id: string;
  type: 'success' | 'warning' | 'info' | 'tip';
  title: string;
  description: string;
  action?: string;
}

const AIInsights = () => {
  const [insights, setInsights] = useState<Insight[]>([
    {
      id: '1',
      type: 'success',
      title: 'Peak Productivity Hours',
      description: 'Your productivity peaks between 9-11 AM. Schedule important tasks during this window.',
      action: 'Optimize Schedule'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Social Engagement Drop',
      description: 'LinkedIn engagement decreased 15% this week. Consider posting more consistently.',
      action: 'Create Content Plan'
    },
    {
      id: '3',
      type: 'tip',
      title: 'Goal Achievement Tip',
      description: 'You complete 23% more tasks when you break them into smaller subtasks.',
      action: 'Apply Strategy'
    },
    {
      id: '4',
      type: 'info',
      title: 'Focus Pattern',
      description: 'Your focus sessions are most effective when lasting 45-60 minutes with 15-minute breaks.'
    }
  ]);
  
  const [isGenerating, setIsGenerating] = useState(false);

  const generateNewInsights = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newInsights = [
      {
        id: Date.now().toString(),
        type: 'info' as const,
        title: 'Weekly Pattern Analysis',
        description: 'Tuesdays and Fridays show highest productivity rates. Plan challenging tasks accordingly.',
        action: 'Adjust Planning'
      },
      {
        id: (Date.now() + 1).toString(),
        type: 'tip' as const,
        title: 'Content Strategy',
        description: 'Tech-focused posts get 2.3x more engagement than general content.',
        action: 'Focus Content'
      }
    ];
    
    setInsights(prev => [...newInsights, ...prev.slice(0, 3)]);
    setIsGenerating(false);
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'success': return TrendingUp;
      case 'warning': return AlertTriangle;
      case 'tip': return Lightbulb;
      default: return Brain;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'warning': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      case 'tip': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      default: return 'text-purple-600 bg-purple-50 dark:bg-purple-900/20';
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5" />
            <span>AI Insights</span>
          </CardTitle>
          <Button 
            onClick={generateNewInsights} 
            variant="outline" 
            size="sm"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 mr-2" />
            )}
            {isGenerating ? 'Analyzing...' : 'Generate'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => {
            const Icon = getInsightIcon(insight.type);
            
            return (
              <div key={insight.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 space-y-3">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${getInsightColor(insight.type)}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {insight.title}
                      </h3>
                      <Badge variant="secondary" className={getInsightColor(insight.type)}>
                        {insight.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {insight.description}
                    </p>
                    {insight.action && (
                      <Button variant="outline" size="sm" className="mt-2">
                        {insight.action}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInsights;
