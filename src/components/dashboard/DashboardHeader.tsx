
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings, Plus, Zap } from 'lucide-react';

interface DashboardHeaderProps {
  isCustomizing: boolean;
  onToggleCustomizing: () => void;
  onAddWidget: () => void;
}

const DashboardHeader = ({ 
  isCustomizing, 
  onToggleCustomizing, 
  onAddWidget 
}: DashboardHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center">
          <Zap className="w-8 h-8 mr-3 text-blue-500" />
          Personal Business Hub
        </h1>
        <p className="text-[#7d8590] mt-1">Manage your personal business with AI automation</p>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={onToggleCustomizing}
          variant={isCustomizing ? "default" : "outline"}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Settings className="w-4 h-4 mr-2" />
          {isCustomizing ? 'Done' : 'Customize'}
        </Button>
        <Button onClick={onAddWidget} variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Add Widget
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
