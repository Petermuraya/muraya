
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  Plus, 
  Calendar, 
  Clock, 
  CheckSquare,
  TrendingUp
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  unit: string;
  category: string;
  deadline: string;
  status: 'active' | 'completed' | 'paused';
}

const GoalTracker = () => {
  const { toast } = useToast();
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Complete React Course',
      description: 'Finish advanced React development course',
      progress: 75,
      target: 100,
      unit: '%',
      category: 'Learning',
      deadline: '2024-12-31',
      status: 'active'
    },
    {
      id: '2',
      title: 'Blog Posts',
      description: 'Write technical blog posts',
      progress: 8,
      target: 12,
      unit: 'posts',
      category: 'Content',
      deadline: '2024-12-31',
      status: 'active'
    },
    {
      id: '3',
      title: 'LinkedIn Connections',
      description: 'Expand professional network',
      progress: 1247,
      target: 1500,
      unit: 'connections',
      category: 'Networking',
      deadline: '2024-12-31',
      status: 'active'
    },
    {
      id: '4',
      title: 'GitHub Contributions',
      description: 'Maintain consistent coding activity',
      progress: 245,
      target: 365,
      unit: 'days',
      category: 'Development',
      deadline: '2024-12-31',
      status: 'active'
    }
  ]);
  
  const [isCreating, setIsCreating] = useState(false);

  const updateProgress = (goalId: string, increment: number) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        const newProgress = Math.min(goal.target, goal.progress + increment);
        const isCompleted = newProgress >= goal.target;
        
        if (isCompleted && goal.status !== 'completed') {
          toast({
            title: "Goal Completed! 🎉",
            description: `Congratulations on completing "${goal.title}"!`,
          });
        }
        
        return {
          ...goal,
          progress: newProgress,
          status: isCompleted ? 'completed' as const : goal.status
        };
      }
      return goal;
    }));
  };

  const getProgressPercentage = (progress: number, target: number) => {
    return Math.min(100, (progress / target) * 100);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Learning': return 'bg-blue-50 text-blue-600 dark:bg-blue-900/20';
      case 'Content': return 'bg-green-50 text-green-600 dark:bg-green-900/20';
      case 'Networking': return 'bg-purple-50 text-purple-600 dark:bg-purple-900/20';
      case 'Development': return 'bg-orange-50 text-orange-600 dark:bg-orange-900/20';
      default: return 'bg-gray-50 text-gray-600 dark:bg-gray-900/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-50 text-green-600 dark:bg-green-900/20';
      case 'paused': return 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20';
      default: return 'bg-blue-50 text-blue-600 dark:bg-blue-900/20';
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>Goal Tracker</span>
          </CardTitle>
          <Button 
            onClick={() => setIsCreating(true)} 
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Goal
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal) => {
            const progressPercentage = getProgressPercentage(goal.progress, goal.target);
            const daysLeft = Math.ceil(
              (new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
            );
            
            return (
              <div key={goal.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {goal.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {goal.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <Badge variant="secondary" className={getCategoryColor(goal.category)}>
                      {goal.category}
                    </Badge>
                    <Badge variant="secondary" className={getStatusColor(goal.status)}>
                      {goal.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Progress: {goal.progress} / {goal.target} {goal.unit}
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {progressPercentage.toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{daysLeft} days left</span>
                    </div>
                  </div>
                  
                  {goal.status === 'active' && (
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => updateProgress(goal.id, 1)}
                        variant="outline"
                        size="sm"
                      >
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +1
                      </Button>
                      {goal.status !== 'completed' && (
                        <Button
                          onClick={() => updateProgress(goal.id, goal.target - goal.progress)}
                          variant="outline"
                          size="sm"
                        >
                          <CheckSquare className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalTracker;
