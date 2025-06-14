
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Pause, 
  Square, 
  Clock,
  BarChart3,
  Timer
} from 'lucide-react';

interface Activity {
  id: string;
  name: string;
  duration: number;
  isActive: boolean;
  category: string;
}

const ActivityTracker = () => {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      name: 'Deep Work',
      duration: 125,
      isActive: false,
      category: 'Focus'
    },
    {
      id: '2',
      name: 'Meetings',
      duration: 90,
      isActive: false,
      category: 'Communication'
    },
    {
      id: '3',
      name: 'Learning',
      duration: 45,
      isActive: true,
      category: 'Development'
    },
    {
      id: '4',
      name: 'Break',
      duration: 30,
      isActive: false,
      category: 'Rest'
    }
  ]);

  const [currentTimer, setCurrentTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    setCurrentTimer(0);
  };

  const startActivity = (activityId: string) => {
    setActivities(prev => prev.map(activity => ({
      ...activity,
      isActive: activity.id === activityId
    })));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Focus': return 'bg-blue-50 text-blue-600 dark:bg-blue-900/20';
      case 'Communication': return 'bg-green-50 text-green-600 dark:bg-green-900/20';
      case 'Development': return 'bg-purple-50 text-purple-600 dark:bg-purple-900/20';
      case 'Rest': return 'bg-gray-50 text-gray-600 dark:bg-gray-900/20';
      default: return 'bg-gray-50 text-gray-600 dark:bg-gray-900/20';
    }
  };

  const totalTime = activities.reduce((sum, activity) => sum + activity.duration, 0);

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Timer className="w-5 h-5" />
            <span>Focus Timer</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold text-gray-900 dark:text-white">
              {formatTime(currentTimer)}
            </div>
            
            <div className="flex justify-center space-x-2">
              <Button
                onClick={toggleTimer}
                variant={isTimerRunning ? "destructive" : "default"}
              >
                {isTimerRunning ? (
                  <Pause className="w-4 h-4 mr-2" />
                ) : (
                  <Play className="w-4 h-4 mr-2" />
                )}
                {isTimerRunning ? 'Pause' : 'Start'}
              </Button>
              
              <Button onClick={stopTimer} variant="outline">
                <Square className="w-4 h-4 mr-2" />
                Stop
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>Today's Activities</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatTime(totalTime)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Total Time Today
              </div>
            </div>

            {activities.map((activity) => {
              const percentage = totalTime > 0 ? (activity.duration / totalTime) * 100 : 0;
              
              return (
                <div key={activity.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          activity.isActive ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {activity.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className={getCategoryColor(activity.category)}>
                        {activity.category}
                      </Badge>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {formatTime(activity.duration)}
                      </span>
                    </div>
                  </div>
                  
                  <Progress value={percentage} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {percentage.toFixed(0)}% of total time
                    </span>
                    <Button
                      onClick={() => startActivity(activity.id)}
                      variant="outline"
                      size="sm"
                    >
                      {activity.isActive ? 'Active' : 'Start'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityTracker;
