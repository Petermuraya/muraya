
export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  project?: string;
  tags: string[];
}

export type TaskFilter = 'all' | 'pending' | 'in-progress' | 'completed';
