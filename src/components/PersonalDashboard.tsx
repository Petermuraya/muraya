
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { DashboardWidget } from './dashboard/types';
import DashboardHeader from './dashboard/DashboardHeader';
import DashboardGrid from './dashboard/DashboardGrid';
import ContentScheduler from './ContentScheduler';

const PersonalDashboard = () => {
  const { toast } = useToast();
  const [widgets, setWidgets] = useState<DashboardWidget[]>([]);
  const [isCustomizing, setIsCustomizing] = useState(false);

  useEffect(() => {
    loadDashboardLayout();
  }, []);

  const loadDashboardLayout = () => {
    const savedLayout = localStorage.getItem('personal_dashboard_layout');
    if (savedLayout) {
      setWidgets(JSON.parse(savedLayout));
    } else {
      // Default layout
      setWidgets([
        { id: 'events', title: 'Event Scheduler', component: 'EventScheduler', position: { x: 0, y: 0 }, size: { width: 2, height: 2 }, visible: true },
        { id: 'timetable', title: 'Personal Timetable', component: 'PersonalTimeTable', position: { x: 2, y: 0 }, size: { width: 2, height: 2 }, visible: true },
        { id: 'blog', title: 'Blog Automation', component: 'BlogAutomation', position: { x: 0, y: 2 }, size: { width: 2, height: 1 }, visible: true },
        { id: 'social', title: 'Social Media', component: 'SocialMediaManager', position: { x: 2, y: 2 }, size: { width: 2, height: 1 }, visible: true },
        { id: 'quickaccess', title: 'Quick Access', component: 'QuickAccessWidget', position: { x: 0, y: 3 }, size: { width: 1, height: 1 }, visible: true },
        { id: 'ai', title: 'AI Assistant', component: 'AIPersonalAssistant', position: { x: 1, y: 3 }, size: { width: 3, height: 1 }, visible: true }
      ]);
    }
  };

  const saveDashboardLayout = (newWidgets: DashboardWidget[]) => {
    setWidgets(newWidgets);
    localStorage.setItem('personal_dashboard_layout', JSON.stringify(newWidgets));
  };

  const toggleWidget = (widgetId: string) => {
    const newWidgets = widgets.map(widget => 
      widget.id === widgetId ? { ...widget, visible: !widget.visible } : widget
    );
    saveDashboardLayout(newWidgets);
  };

  const addCustomWidget = () => {
    const newWidget: DashboardWidget = {
      id: `custom-${Date.now()}`,
      title: 'Custom Widget',
      component: 'QuickAccessWidget',
      position: { x: 0, y: 0 },
      size: { width: 1, height: 1 },
      visible: true
    };
    saveDashboardLayout([...widgets, newWidget]);
    toast({
      title: "Widget Added",
      description: "New custom widget added to your dashboard",
    });
  };

  return (
    <div className="p-6 min-h-screen bg-[#0d1117]">
      <DashboardHeader 
        isCustomizing={isCustomizing}
        onToggleCustomizing={() => setIsCustomizing(!isCustomizing)}
        onAddWidget={addCustomWidget}
      />

      <DashboardGrid 
        widgets={widgets}
        isCustomizing={isCustomizing}
        onToggleWidget={toggleWidget}
      />

      <ContentScheduler />
    </div>
  );
};

export default PersonalDashboard;
