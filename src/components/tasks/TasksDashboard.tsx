
import React from 'react';
import DragDropTaskList from './DragDropTaskList';
import ActivityTracker from './ActivityTracker';
import ProjectManager from './ProjectManager';
import TaskStats from './TaskStats';

const TasksDashboard = () => {
  return (
    <div className="space-y-6">
      <TaskStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DragDropTaskList />
        </div>
        <div>
          <ActivityTracker />
        </div>
      </div>
      
      <ProjectManager />
    </div>
  );
};

export default TasksDashboard;
