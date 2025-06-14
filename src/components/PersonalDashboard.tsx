
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Plus, Settings, Zap, Globe, MessageSquare, Video, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import EventScheduler from './EventScheduler';
import BlogAutomation from './BlogAutomation';
import SocialMediaManager from './SocialMediaManager';
import PersonalTimeTable from './PersonalTimeTable';
import QuickAccessWidget from './QuickAccessWidget';
import AIPersonalAssistant from './AIPersonalAssistant';
import ContentScheduler from './ContentScheduler';

interface DashboardWidget {
  id: string;
  title: string;
  component: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  visible: boolean;
  settings?: any;
}

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

  const renderWidget = (widget: DashboardWidget) => {
    if (!widget.visible) return null;

    const componentMap: { [key: string]: React.ComponentType<any> } = {
      EventScheduler,
      PersonalTimeTable,
      BlogAutomation,
      SocialMediaManager,
      QuickAccessWidget,
      AIPersonalAssistant
    };

    const WidgetComponent = componentMap[widget.component] || QuickAccessWidget;

    return (
      <div
        key={widget.id}
        className={`col-span-${widget.size.width} row-span-${widget.size.height}`}
        style={{
          gridColumnStart: widget.position.x + 1,
          gridRowStart: widget.position.y + 1,
        }}
      >
        <Card className="h-full bg-[#161b22] border-[#30363d] hover:border-blue-500/30 transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm flex items-center justify-between">
              {widget.title}
              {isCustomizing && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => toggleWidget(widget.id)}
                  className="text-gray-400 hover:text-white"
                >
                  <Settings className="w-3 h-3" />
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <WidgetComponent widgetId={widget.id} settings={widget.settings} />
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="p-6 min-h-screen bg-[#0d1117]">
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
            onClick={() => setIsCustomizing(!isCustomizing)}
            variant={isCustomizing ? "default" : "outline"}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Settings className="w-4 h-4 mr-2" />
            {isCustomizing ? 'Done' : 'Customize'}
          </Button>
          <Button onClick={addCustomWidget} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Widget
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 grid-rows-4 gap-4 auto-rows-fr min-h-[800px]">
        {widgets.map(renderWidget)}
      </div>

      <ContentScheduler />
    </div>
  );
};

export default PersonalDashboard;
