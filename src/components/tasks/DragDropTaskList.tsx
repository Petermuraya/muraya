
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SquareCheck, GripVertical } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Task, TaskFilter } from './types';
import TaskFilters from './TaskFilters';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

const DragDropTaskList = () => {
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

  const [filter, setFilter] = useState<TaskFilter>('all');
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

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(filteredTasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update the full tasks array maintaining the new order for filtered items
    const newTasks = [...tasks];
    const filteredIds = items.map(item => item.id);
    
    // Remove filtered tasks from original array
    const nonFilteredTasks = newTasks.filter(task => 
      filter === 'all' || task.status !== filter
    );
    
    // Reconstruct with new order
    if (filter === 'all') {
      setTasks(items);
    } else {
      const updatedTasks = [...nonFilteredTasks];
      items.forEach((item, index) => {
        const insertIndex = index;
        updatedTasks.splice(insertIndex, 0, item);
      });
      setTasks(updatedTasks);
    }

    toast({
      title: "Tasks Reordered",
      description: "Task order has been updated successfully.",
    });
  };

  const filteredTasks = tasks.filter(task => filter === 'all' || task.status === filter);

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <SquareCheck className="w-5 h-5" />
            <span>Tasks</span>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <GripVertical className="w-4 h-4" />
              <span className="text-xs">Drag to reorder</span>
            </div>
          </CardTitle>
          <TaskFilters filter={filter} onFilterChange={setFilter} />
        </div>
        
        <TaskForm
          newTaskTitle={newTaskTitle}
          onTaskTitleChange={setNewTaskTitle}
          onAddTask={addTask}
        />
      </CardHeader>
      <CardContent>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                {filteredTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`transition-all ${
                          snapshot.isDragging
                            ? 'shadow-lg rotate-1 scale-105 z-50'
                            : 'shadow-sm'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <div
                            {...provided.dragHandleProps}
                            className="p-1 rounded cursor-grab active:cursor-grabbing hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            <GripVertical className="w-4 h-4 text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <TaskItem
                              task={task}
                              onToggleStatus={toggleTaskStatus}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </CardContent>
    </Card>
  );
};

export default DragDropTaskList;
