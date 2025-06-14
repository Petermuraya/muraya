
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  Activity, 
  TrendingUp,
  Eye,
  MessageSquare,
  Heart,
  Users
} from 'lucide-react';

const ProfileStats = () => {
  const stats = [
    {
      label: 'Profile Views',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: <Eye className="w-4 h-4" />
    },
    {
      label: 'Social Engagement',
      value: '1,293',
      change: '+8%',
      trend: 'up',
      icon: <Heart className="w-4 h-4" />
    },
    {
      label: 'Network Connections',
      value: '567',
      change: '+15%',
      trend: 'up',
      icon: <Users className="w-4 h-4" />
    },
    {
      label: 'Content Interactions',
      value: '89',
      change: '+3%',
      trend: 'up',
      icon: <MessageSquare className="w-4 h-4" />
    }
  ];

  const activities = [
    {
      action: 'Updated LinkedIn profile',
      time: '2 hours ago',
      type: 'profile'
    },
    {
      action: 'Posted on Twitter',
      time: '4 hours ago',
      type: 'social'
    },
    {
      action: 'Connected with new developer',
      time: '1 day ago',
      type: 'network'
    },
    {
      action: 'Shared project update',
      time: '2 days ago',
      type: 'content'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Stats Card */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Profile Analytics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                  {stat.icon}
                  <span className="text-sm">{stat.label}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </span>
                  <Badge 
                    variant="secondary" 
                    className="text-green-600 bg-green-50 dark:bg-green-900/20"
                  >
                    {stat.change}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Feed */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.action}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileStats;
