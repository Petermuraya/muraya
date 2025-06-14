
import React from 'react';
import { DashboardWidget } from './types';
import WidgetCard from './WidgetCard';

interface DashboardGridProps {
  widgets: DashboardWidget[];
  isCustomizing: boolean;
  onToggleWidget: (widgetId: string) => void;
}

const DashboardGrid = ({ widgets, isCustomizing, onToggleWidget }: DashboardGridProps) => {
  return (
    <div className="grid grid-cols-4 grid-rows-4 gap-4 auto-rows-fr min-h-[800px]">
      {widgets.map(widget => (
        <WidgetCard
          key={widget.id}
          widget={widget}
          isCustomizing={isCustomizing}
          onToggleWidget={onToggleWidget}
        />
      ))}
    </div>
  );
};

export default DashboardGrid;
