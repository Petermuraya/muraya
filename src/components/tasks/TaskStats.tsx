
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckSquare, 
  Clock, 
  Calendar, 
  TrendingUp,
  Target,
  Zap
} from 'lucide-react';

const TaskStats = () => {
  const stats = [
    {
      title: 'Tasks Completed',
      value: '12',
      change: '+3 today',
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      icon: CheckSquare
    },
    {
      title: 'Active Tasks',
      value: '8',
      change: '2 overdue',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      icon: Target
    },
    {
      title: 'Focus Time',
      value: '4.2h',
      change: '+0.5h today',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      icon: Clock
    },
    {
      title: 'Productivity',
      value: '87%',
      change: '+12% this week',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      icon: Zap
    },
    {
      title: 'Projects',
      value: '5',
      change: '2 completing soon',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50 dark:bg-cyan-900/20',
      icon: Calendar
    },
    {
      title: 'Weekly Goal',
      value: '78%',
      change: '22% remaining',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
      icon: TrendingUp
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        
        return (
          <Card key={index} className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <Badge variant="secondary" className="text-gray-600 dark:text-gray-300">
                  {stat.change}
                </Badge>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {stat.title}
                </h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default TaskStats;
