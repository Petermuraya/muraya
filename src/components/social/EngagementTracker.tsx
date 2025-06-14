
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Hash,
  Eye,
  Activity,
  RefreshCw,
  Zap
} from 'lucide-react';

interface TrendingHashtag {
  tag: string;
  count: number;
  growth: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}

interface EngagementMetric {
  platform: string;
  metric: string;
  value: string;
  change: string;
  color: string;
}

const EngagementTracker = () => {
  const [trendingHashtags, setTrendingHashtags] = useState<TrendingHashtag[]>([
    { tag: 'AI', count: 15420, growth: '+12%', sentiment: 'positive' },
    { tag: 'TechInnovation', count: 8765, growth: '+8%', sentiment: 'positive' },
    { tag: 'IoT', count: 6543, growth: '+15%', sentiment: 'positive' },
    { tag: 'WebDevelopment', count: 4321, growth: '+5%', sentiment: 'neutral' },
    { tag: 'MachineLearning', count: 3210, growth: '+18%', sentiment: 'positive' }
  ]);

  const [liveMetrics, setLiveMetrics] = useState<EngagementMetric[]>([
    { platform: 'LinkedIn', metric: 'Profile Views', value: '234', change: '+5', color: 'text-blue-600' },
    { platform: 'Twitter', metric: 'Impressions', value: '1.2K', change: '+87', color: 'text-blue-400' },
    { platform: 'Instagram', metric: 'Reach', value: '892', change: '+23', color: 'text-pink-500' },
    { platform: 'GitHub', metric: 'Repository Views', value: '156', change: '+12', color: 'text-gray-700' }
  ]);

  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      // Simulate real-time updates
      setLiveMetrics(prev => prev.map(metric => ({
        ...metric,
        value: updateMetricValue(metric.value),
        change: `+${Math.floor(Math.random() * 10) + 1}`
      })));

      setTrendingHashtags(prev => prev.map(hashtag => ({
        ...hashtag,
        count: hashtag.count + Math.floor(Math.random() * 50),
        growth: `+${Math.floor(Math.random() * 20) + 1}%`
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  const updateMetricValue = (currentValue: string) => {
    const numericValue = parseFloat(currentValue.replace(/[^\d.]/g, ''));
    const increment = Math.random() * 5;
    const newValue = numericValue + increment;
    
    if (currentValue.includes('K')) {
      return `${(newValue).toFixed(1)}K`;
    }
    return Math.floor(newValue).toString();
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-50 text-green-600 dark:bg-green-900/20';
      case 'negative': return 'bg-red-50 text-red-600 dark:bg-red-900/20';
      default: return 'bg-gray-50 text-gray-600 dark:bg-gray-900/20';
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>Live Engagement Tracker</span>
            {isLive && <Zap className="w-4 h-4 text-green-500 animate-pulse" />}
          </CardTitle>
          <Button 
            onClick={() => setIsLive(!isLive)} 
            variant={isLive ? "default" : "outline"} 
            size="sm"
          >
            {isLive ? (
              <>
                <Activity className="w-4 h-4 mr-2" />
                Live
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Paused
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Live Metrics */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>Real-Time Metrics</span>
            </h3>
            <div className="space-y-3">
              {liveMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                  <div>
                    <p className={`font-medium ${metric.color}`}>{metric.platform}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{metric.metric}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{metric.value}</p>
                    <div className="flex items-center space-x-1 text-green-600">
                      <TrendingUp className="w-3 h-3" />
                      <span className="text-sm">{metric.change}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Hashtags */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <Hash className="w-4 h-4" />
              <span>Trending Hashtags</span>
            </h3>
            <div className="space-y-3">
              {trendingHashtags.map((hashtag, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-600">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">#{hashtag.tag}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{hashtag.count.toLocaleString()} mentions</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className={getSentimentColor(hashtag.sentiment)}>
                      {hashtag.sentiment}
                    </Badge>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-green-600">
                        <TrendingUp className="w-3 h-3" />
                        <span className="text-sm font-medium">{hashtag.growth}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EngagementTracker;
