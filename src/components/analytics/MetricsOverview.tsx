
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  Zap, 
  Calendar,
  Clock,
  Activity
} from 'lucide-react';

interface Metric {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  color: string;
  icon: React.ElementType;
}

const MetricsOverview = () => {
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      title: 'Productivity Score',
      value: '87%',
      change: '+12%',
      trend: 'up',
      color: 'text-green-600',
      icon: Zap
    },
    {
      title: 'Tasks Completed',
      value: '42',
      change: '+5',
      trend: 'up',
      color: 'text-blue-600',
      icon: Target
    },
    {
      title: 'Social Engagement',
      value: '2.3K',
      change: '+18%',
      trend: 'up',
      color: 'text-purple-600',
      icon: Users
    },
    {
      title: 'Focus Time',
      value: '6.2h',
      change: '-0.3h',
      trend: 'down',
      color: 'text-orange-600',
      icon: Clock
    },
    {
      title: 'Weekly Goals',
      value: '8/10',
      change: '+2',
      trend: 'up',
      color: 'text-cyan-600',
      icon: Calendar
    },
    {
      title: 'Activity Score',
      value: '94',
      change: '+7',
      trend: 'up',
      color: 'text-pink-600',
      icon: Activity
    }
  ]);

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return TrendingUp;
    if (trend === 'down') return TrendingDown;
    return Activity;
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'up') return 'text-green-500 bg-green-50 dark:bg-green-900/20';
    if (trend === 'down') return 'text-red-500 bg-red-50 dark:bg-red-900/20';
    return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const TrendIcon = getTrendIcon(metric.trend);
        
        return (
          <Card key={index} className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-gray-50 dark:bg-gray-700`}>
                  <Icon className={`w-5 h-5 ${metric.color}`} />
                </div>
                <Badge variant="secondary" className={getTrendColor(metric.trend)}>
                  <TrendIcon className="w-3 h-3 mr-1" />
                  {metric.change}
                </Badge>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {metric.title}
                </h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metric.value}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MetricsOverview;
