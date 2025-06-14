
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  activity: string;
  color: string;
  recurring: boolean;
}

const PersonalTimeTable = ({ widgetId }: { widgetId?: string }) => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newSlot, setNewSlot] = useState<Partial<TimeSlot>>({
    recurring: true,
    color: '#3b82f6'
  });
  const { toast } = useToast();

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316'];

  useEffect(() => {
    loadTimeTable();
  }, []);

  const loadTimeTable = () => {
    const saved = localStorage.getItem('personal_timetable');
    if (saved) {
      setTimeSlots(JSON.parse(saved));
    }
  };

  const saveTimeTable = (slots: TimeSlot[]) => {
    setTimeSlots(slots);
    localStorage.setItem('personal_timetable', JSON.stringify(slots));
  };

  const addTimeSlot = () => {
    if (!newSlot.day || !newSlot.startTime || !newSlot.endTime || !newSlot.activity) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const slot: TimeSlot = {
      id: Date.now().toString(),
      day: newSlot.day!,
      startTime: newSlot.startTime!,
      endTime: newSlot.endTime!,
      activity: newSlot.activity!,
      color: newSlot.color!,
      recurring: newSlot.recurring!
    };

    saveTimeTable([...timeSlots, slot]);
    setNewSlot({ recurring: true, color: '#3b82f6' });
    setIsAdding(false);
    
    toast({
      title: "Time Slot Added",
      description: `${slot.activity} scheduled for ${slot.day}`,
    });
  };

  const deleteTimeSlot = (slotId: string) => {
    saveTimeTable(timeSlots.filter(s => s.id !== slotId));
  };

  const getTodaySlots = () => {
    const today = days[new Date().getDay() - 1] || 'Sunday';
    return timeSlots
      .filter(slot => slot.day === today)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  const getCurrentActivity = () => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);
    const todaySlots = getTodaySlots();
    
    return todaySlots.find(slot => 
      slot.startTime <= currentTime && slot.endTime > currentTime
    );
  };

  if (isAdding) {
    return (
      <div className="space-y-3">
        <select
          value={newSlot.day || ''}
          onChange={(e) => setNewSlot({ ...newSlot, day: e.target.value })}
          className="w-full p-2 bg-[#21262d] border border-[#30363d] rounded text-white"
        >
          <option value="">Select Day</option>
          {days.map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
        
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="time"
            placeholder="Start time"
            value={newSlot.startTime || ''}
            onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
            className="bg-[#21262d] border-[#30363d] text-white"
          />
          <Input
            type="time"
            placeholder="End time"
            value={newSlot.endTime || ''}
            onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
            className="bg-[#21262d] border-[#30363d] text-white"
          />
        </div>
        
        <Input
          placeholder="Activity"
          value={newSlot.activity || ''}
          onChange={(e) => setNewSlot({ ...newSlot, activity: e.target.value })}
          className="bg-[#21262d] border-[#30363d] text-white"
        />
        
        <div className="flex gap-1">
          {colors.map(color => (
            <button
              key={color}
              onClick={() => setNewSlot({ ...newSlot, color })}
              className={`w-6 h-6 rounded-full border-2 ${
                newSlot.color === color ? 'border-white' : 'border-transparent'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        
        <div className="flex gap-2">
          <Button onClick={addTimeSlot} size="sm" className="bg-blue-600 hover:bg-blue-700">
            Add
          </Button>
          <Button onClick={() => setIsAdding(false)} size="sm" variant="outline">
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  const currentActivity = getCurrentActivity();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-white font-medium flex items-center">
          <Clock className="w-4 h-4 mr-2" />
          Today's Schedule
        </h3>
        <Button
          onClick={() => setIsAdding(true)}
          size="sm"
          variant="ghost"
          className="text-blue-400 hover:text-blue-300"
        >
          <Plus className="w-3 h-3" />
        </Button>
      </div>

      {currentActivity && (
        <div className="p-3 rounded-lg border border-green-500/30 bg-green-500/10">
          <p className="text-green-400 text-sm font-medium">Current Activity</p>
          <p className="text-white">{currentActivity.activity}</p>
          <p className="text-[#7d8590] text-xs">
            {currentActivity.startTime} - {currentActivity.endTime}
          </p>
        </div>
      )}

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {getTodaySlots().length === 0 ? (
          <p className="text-[#7d8590] text-sm">No schedule for today</p>
        ) : (
          getTodaySlots().map(slot => (
            <div key={slot.id} className="flex items-center justify-between p-2 bg-[#21262d] rounded">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: slot.color }}
                />
                <div>
                  <p className="text-white text-sm font-medium">{slot.activity}</p>
                  <p className="text-[#7d8590] text-xs">
                    {slot.startTime} - {slot.endTime}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => deleteTimeSlot(slot.id)}
                size="sm"
                variant="ghost"
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PersonalTimeTable;
