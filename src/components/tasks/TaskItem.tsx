
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from 'lucide-react';
import { Task } from './types';

interface TaskItemProps {
  task: Task;
  onToggleStatus: (taskId: string) => void;
}

const TaskItem = ({ task, onToggleStatus }: TaskItemProps) => {
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

  return (
    <div
      className={`p-4 rounded-lg border transition-all ${
        task.status === 'completed'
          ? 'border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-900/10'
          : 'border-gray-200 dark:border-gray-700 hover:shadow-md'
      }`}
    >
      <div className="flex items-start space-x-3">
        <Checkbox
          checked={task.status === 'completed'}
          onCheckedChange={() => onToggleStatus(task.id)}
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
  );
};

export default TaskItem;
