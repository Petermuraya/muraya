
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface TaskFormProps {
  newTaskTitle: string;
  onTaskTitleChange: (title: string) => void;
  onAddTask: () => void;
}

const TaskForm = ({ newTaskTitle, onTaskTitleChange, onAddTask }: TaskFormProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onAddTask();
    }
  };

  return (
    <div className="flex space-x-2 mt-4">
      <Input
        placeholder="Add new task..."
        value={newTaskTitle}
        onChange={(e) => onTaskTitleChange(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-1"
      />
      <Button onClick={onAddTask}>
        <Plus className="w-4 h-4 mr-2" />
        Add
      </Button>
    </div>
  );
};

export default TaskForm;
