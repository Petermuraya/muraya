
import React from 'react';
import { Button } from '@/components/ui/button';
import { TaskFilter } from './types';

interface TaskFiltersProps {
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
}

const TaskFilters = ({ filter, onFilterChange }: TaskFiltersProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={filter === 'all' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onFilterChange('all')}
      >
        All
      </Button>
      <Button
        variant={filter === 'pending' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onFilterChange('pending')}
      >
        Pending
      </Button>
      <Button
        variant={filter === 'in-progress' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onFilterChange('in-progress')}
      >
        Active
      </Button>
    </div>
  );
};

export default TaskFilters;
