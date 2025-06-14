
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { DashboardWidget } from './types';
import EventScheduler from '../EventScheduler';
import BlogAutomation from '../BlogAutomation';
import SocialMediaManager from '../SocialMediaManager';
import PersonalTimeTable from '../PersonalTimeTable';
import QuickAccessWidget from '../QuickAccessWidget';
import AIPersonalAssistant from '../AIPersonalAssistant';

interface WidgetCardProps {
  widget: DashboardWidget;
  isCustomizing: boolean;
  onToggleWidget: (widgetId: string) => void;
}

const WidgetCard = ({ widget, isCustomizing, onToggleWidget }: WidgetCardProps) => {
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
                onClick={() => onToggleWidget(widget.id)}
                className="text-gray-400 hover:text-white"
              >
                <Settings className="w-3 h-3" />
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <WidgetComponent widgetId={widget.id} />
        </CardContent>
      </Card>
    </div>
  );
};

export default WidgetCard;
