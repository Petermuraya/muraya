
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Plus, 
  Calendar, 
  Clock, 
  AlertCircle,
  Star,
  Filter
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  project?: string;
  tags: string[];
}

const TaskList = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete project proposal',
      description: 'Draft and review the Q4 project proposal document',
      priority: 'high',
      status: 'in-progress',
      dueDate: '2024-12-20',
      project: 'Q4 Planning',
      tags: ['work', 'deadline']
    },
    {
      id: '2',
      title: 'Update portfolio website',
      description: 'Add new projects and update design',
      priority: 'medium',
      status: 'pending',
      dueDate: '2024-12-25',
      project: 'Personal',
      tags: ['development', 'portfolio']
    },
    {
      id: '3',
      title: 'Review team performance',
      description: 'Quarterly performance reviews for team members',
      priority: 'high',
      status: 'pending',
      dueDate: '2024-12-18',
      project: 'Management',
      tags: ['hr', 'reviews']
    },
    {
      id: '4',
      title: 'Learn React Testing',
      description: 'Study Jest and React Testing Library',
      priority: 'low',
      status: 'in-progress',
      dueDate: '2024-12-30',
      project: 'Learning',
      tags: ['education', 'react']
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const toggleTaskStatus = (taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === 'completed' ? 'pending' : 'completed';
        if (newStatus === 'completed') {
          toast({
            title: "Task Completed! ✅",
            description: `"${task.title}" has been marked as completed.`,
          });
        }
        return { ...task, status: newStatus };
      }
      return task;
    }));
  };

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: '',
      priority: 'medium',
      status: 'pending',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      tags: []
    };
    
    setTasks(prev => [newTask, ...prev]);
    setNewTaskTitle('');
    
    toast({
      title: "Task Added",
      description: `"${newTaskTitle}" has been added to your task list.`,
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-600 dark:bg-red-900/20';
      case 'medium': return 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20';
      case 'low': return 'bg-green-50 text-green-600 dark:bg-green-900/20';
      default: return 'bg-gray-50 text-gray-600 dark:bg-gray-900/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-50 text-green-600 dark:bg-green-900/20';
      case 'in-progress': return 'bg-blue-50 text-blue-600 dark:bg-blue-900/20';
      case 'pending': return 'bg-gray-50 text-gray-600 dark:bg-gray-900/20';
      default: return 'bg-gray-50 text-gray-600 dark:bg-gray-900/20';
    }
  };

  const filteredTasks = tasks.filter(task => filter === 'all' || task.status === filter);

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <CheckSquare className="w-5 h-5" />
            <span>Tasks</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'pending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('pending')}
            >
              Pending
            </Button>
            <Button
              variant={filter === 'in-progress' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('in-progress')}
            >
              Active
            </Button>
          </div>
        </div>
        
        <div className="flex space-x-2 mt-4">
          <Input
            placeholder="Add new task..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            className="flex-1"
          />
          <Button onClick={addTask}>
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 rounded-lg border transition-all ${
                task.status === 'completed'
                  ? 'border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-900/10'
                  : 'border-gray-200 dark:border-gray-700 hover:shadow-md'
              }`}
            >
              <div className="flex items-start space-x-3">
                <Checkbox
                  checked={task.status === 'completed'}
                  onCheckedChange={() => toggleTaskStatus(task.id)}
                  className="mt-1"
                />
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3
                      className={`font-medium ${
                        task.status === 'completed'
                          ? 'line-through text-gray-500'
                          : 'text-gray-900 dark:text-white'
                      }`}
                    >
                      {task.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                      <Badge variant="secondary" className={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                    </div>
                  </div>
                  
                  {task.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {task.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                      {task.project && (
                        <div className="flex items-center space-x-1">
                          <span>•</span>
                          <span>{task.project}</span>
                        </div>
                      )}
                    </div>
                    
                    {task.tags.length > 0 && (
                      <div className="flex space-x-1">
                        {task.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskList;
