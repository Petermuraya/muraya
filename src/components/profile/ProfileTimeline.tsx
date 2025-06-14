
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  GitCommit, 
  Award, 
  Code, 
  MessageSquare, 
  Share2,
  Star,
  Trophy,
  Target,
  BookOpen
} from 'lucide-react';

interface TimelineItem {
  id: string;
  type: 'achievement' | 'project' | 'social' | 'learning' | 'milestone';
  title: string;
  description: string;
  timestamp: string;
  icon: React.ReactNode;
  color: string;
  badge?: string;
}

const ProfileTimeline = () => {
  const timelineItems: TimelineItem[] = [
    {
      id: '1',
      type: 'achievement',
      title: 'ThoraxIQ Project Launch',
      description: 'Successfully launched AI-powered chest X-ray abnormality detection system with 94% accuracy rate',
      timestamp: '2 days ago',
      icon: <Trophy className="w-4 h-4" />,
      color: 'text-yellow-500',
      badge: 'Major Achievement'
    },
    {
      id: '2',
      type: 'social',
      title: 'LinkedIn Article Published',
      description: 'Published "The Future of AI in Healthcare: Lessons from ThoraxIQ" - 1.2K views, 85 likes',
      timestamp: '5 days ago',
      icon: <Share2 className="w-4 h-4" />,
      color: 'text-blue-500',
      badge: 'Viral Post'
    },
    {
      id: '3',
      type: 'project',
      title: 'GitHub Repository Updated',
      description: 'Pushed 23 commits to smart-agriculture-iot project, implementing new sensor data visualization',
      timestamp: '1 week ago',
      icon: <GitCommit className="w-4 h-4" />,
      color: 'text-green-500'
    },
    {
      id: '4',
      type: 'learning',
      title: 'Azure IoT Certification Progress',
      description: 'Completed advanced modules on IoT Edge computing and device management - 85% course progress',
      timestamp: '1 week ago',
      icon: <BookOpen className="w-4 h-4" />,
      color: 'text-purple-500'
    },
    {
      id: '5',
      type: 'milestone',
      title: 'Karatina Innovation Club Leadership',
      description: 'Elected as Technical Lead, initiated 3 new IoT projects with team of 15 developers',
      timestamp: '2 weeks ago',
      icon: <Award className="w-4 h-4" />,
      color: 'text-orange-500',
      badge: 'Leadership'
    },
    {
      id: '6',
      type: 'project',
      title: 'HealthTech Hackathon Winner',
      description: 'Won first place with "MedAssist" - AI chatbot for medical consultation in rural areas',
      timestamp: '3 weeks ago',
      icon: <Star className="w-4 h-4" />,
      color: 'text-yellow-500',
      badge: '1st Place'
    },
    {
      id: '7',
      type: 'social',
      title: 'Tech Conference Speaker',
      description: 'Keynote speaker at Nairobi DevFest 2024: "IoT Solutions for African Agriculture"',
      timestamp: '1 month ago',
      icon: <MessageSquare className="w-4 h-4" />,
      color: 'text-blue-500',
      badge: 'Speaker'
    },
    {
      id: '8',
      type: 'project',
      title: 'Smart Farm Dashboard Launch',
      description: 'Deployed real-time monitoring system for 50+ farms across Kenya using Azure IoT Hub',
      timestamp: '1 month ago',
      icon: <Code className="w-4 h-4" />,
      color: 'text-green-500'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'achievement': return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800';
      case 'project': return 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800';
      case 'social': return 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800';
      case 'learning': return 'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800';
      case 'milestone': return 'bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800';
      default: return 'bg-gray-50 border-gray-200 dark:bg-gray-700/50 dark:border-gray-600';
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="w-5 h-5" />
          <span>Activity Timeline</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500"></div>
          
          <div className="space-y-6">
            {timelineItems.map((item, index) => (
              <div key={item.id} className="relative flex items-start space-x-4">
                {/* Timeline dot */}
                <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 border-white dark:border-gray-800 ${getTypeColor(item.type)}`}>
                  <span className={item.color}>
                    {item.icon}
                  </span>
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0 pb-8">
                  <div className={`p-4 rounded-lg border ${getTypeColor(item.type)}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {item.title}
                        </h3>
                        {item.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Timeline end */}
          <div className="relative flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Journey continues...
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileTimeline;
