
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Users, 
  Heart, 
  MessageSquare, 
  Share2,
  BarChart3,
  RefreshCw
} from 'lucide-react';

interface SocialMetrics {
  platform: string;
  followers: number;
  engagement: number;
  likes: number;
  comments: number;
  shares: number;
  growth: string;
  color: string;
}

const SocialAnalytics = () => {
  const [metrics, setMetrics] = useState<SocialMetrics[]>([
    {
      platform: 'LinkedIn',
      followers: 1247,
      engagement: 8.2,
      likes: 156,
      comments: 23,
      shares: 12,
      growth: '+5.2%',
      color: 'text-blue-600'
    },
    {
      platform: 'Twitter',
      followers: 892,
      engagement: 6.7,
      likes: 234,
      comments: 45,
      shares: 67,
      growth: '+3.1%',
      color: 'text-blue-400'
    },
    {
      platform: 'Instagram',
      followers: 2156,
      engagement: 9.4,
      likes: 543,
      comments: 89,
      shares: 23,
      growth: '+7.8%',
      color: 'text-pink-500'
    },
    {
      platform: 'GitHub',
      followers: 324,
      engagement: 4.2,
      likes: 78,
      comments: 12,
      shares: 5,
      growth: '+2.3%',
      color: 'text-gray-700'
    }
  ]);
  
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update with slight variations to simulate real data
    setMetrics(prev => prev.map(metric => ({
      ...metric,
      followers: metric.followers + Math.floor(Math.random() * 10),
      engagement: parseFloat((metric.engagement + (Math.random() - 0.5)).toFixed(1)),
      likes: metric.likes + Math.floor(Math.random() * 20),
      comments: metric.comments + Math.floor(Math.random() * 5),
      shares: metric.shares + Math.floor(Math.random() * 3)
    })));
    
    setIsRefreshing(false);
  };

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>Social Media Analytics</span>
          </CardTitle>
          <Button 
            onClick={handleRefresh} 
            variant="outline" 
            size="sm"
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Updating...' : 'Refresh'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <div className="flex items-center justify-between">
                <h3 className={`font-semibold ${metric.color}`}>
                  {metric.platform}
                </h3>
                <Badge variant="secondary" className="text-green-600 bg-green-50 dark:bg-green-900/20">
                  {metric.growth}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-300">
                    <Users className="w-3 h-3" />
                    <span className="text-xs">Followers</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {metric.followers.toLocaleString()}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-300">
                    <TrendingUp className="w-3 h-3" />
                    <span className="text-xs">Engagement</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {metric.engagement}%
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-gray-500">
                    <Heart className="w-3 h-3" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {metric.likes}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-gray-500">
                    <MessageSquare className="w-3 h-3" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {metric.comments}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-gray-500">
                    <Share2 className="w-3 h-3" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {metric.shares}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialAnalytics;
