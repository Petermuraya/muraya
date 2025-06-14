
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FolderOpen, 
  Plus, 
  Calendar, 
  Users,
  CheckSquare,
  Clock
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: 'planning' | 'active' | 'review' | 'completed';
  dueDate: string;
  tasksCompleted: number;
  totalTasks: number;
  team: string[];
}

const ProjectManager = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Website Redesign',
      description: 'Complete overhaul of company website with modern design',
      progress: 75,
      status: 'active',
      dueDate: '2024-12-30',
      tasksCompleted: 12,
      totalTasks: 16,
      team: ['Design', 'Development']
    },
    {
      id: '2',
      name: 'Q4 Marketing Campaign',
      description: 'Launch comprehensive marketing campaign for Q4 products',
      progress: 45,
      status: 'active',
      dueDate: '2024-12-25',
      tasksCompleted: 9,
      totalTasks: 20,
      team: ['Marketing', 'Content']
    },
    {
      id: '3',
      name: 'Performance Optimization',
      description: 'Optimize application performance and reduce load times',
      progress: 90,
      status: 'review',
      dueDate: '2024-12-20',
      tasksCompleted: 18,
      totalTasks: 20,
      team: ['Development', 'QA']
    },
    {
      id: '4',
      name: 'Team Training Program',
      description: 'Implement comprehensive training program for new technologies',
      progress: 30,
      status: 'planning',
      dueDate: '2025-01-15',
      tasksCompleted: 3,
      totalTasks: 10,
      team: ['HR', 'Training']
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-50 text-green-600 dark:bg-green-900/20';
      case 'active': return 'bg-blue-50 text-blue-600 dark:bg-blue-900/20';
      case 'review': return 'bg-purple-50 text-purple-600 dark:bg-purple-900/20';
      case 'planning': return 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20';
      default: return 'bg-gray-50 text-gray-600 dark:bg-gray-900/20';
    }
  };

  const getDaysRemaining = (dueDate: string) => {
    const days = Math.ceil(
      (new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    return days;
  };

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <FolderOpen className="w-5 h-5" />
            <span>Projects</span>
          </CardTitle>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => {
            const daysRemaining = getDaysRemaining(project.dueDate);
            
            return (
              <div key={project.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {project.description}
                    </p>
                  </div>
                  <Badge variant="secondary" className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Progress
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {project.progress}%
                    </span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                    <CheckSquare className="w-3 h-3" />
                    <span>{project.tasksCompleted}/{project.totalTasks} tasks</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {daysRemaining > 0 ? `${daysRemaining} days left` : 'Overdue'}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-3 h-3 text-gray-500" />
                    <div className="flex space-x-1">
                      {project.team.map((member, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {member}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectManager;
