
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, Plus, Edit, Trash2, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: 'meeting' | 'personal' | 'work' | 'reminder';
  reminder?: number; // minutes before
}

const EventScheduler = ({ widgetId }: { widgetId?: string }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    type: 'personal',
    reminder: 15
  });
  const { toast } = useToast();

  useEffect(() => {
    loadEvents();
    setupEventReminders();
  }, []);

  const loadEvents = () => {
    const savedEvents = localStorage.getItem('personal_events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  };

  const saveEvents = (updatedEvents: Event[]) => {
    setEvents(updatedEvents);
    localStorage.setItem('personal_events', JSON.stringify(updatedEvents));
  };

  const setupEventReminders = () => {
    // Check for upcoming events every minute
    const interval = setInterval(() => {
      const now = new Date();
      events.forEach(event => {
        const eventDateTime = new Date(`${event.date}T${event.time}`);
        const timeDiff = eventDateTime.getTime() - now.getTime();
        const minutesUntil = Math.floor(timeDiff / (1000 * 60));
        
        if (minutesUntil === (event.reminder || 15)) {
          toast({
            title: "Event Reminder",
            description: `${event.title} is starting in ${event.reminder} minutes`,
          });
          
          // Browser notification if permission granted
          if (Notification.permission === 'granted') {
            new Notification('Event Reminder', {
              body: `${event.title} is starting in ${event.reminder} minutes`,
              icon: '/favicon.ico'
            });
          }
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  };

  const addEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title!,
      description: newEvent.description || '',
      date: newEvent.date!,
      time: newEvent.time!,
      type: newEvent.type as Event['type'],
      reminder: newEvent.reminder
    };

    saveEvents([...events, event]);
    setNewEvent({ type: 'personal', reminder: 15 });
    setIsAddingEvent(false);
    
    toast({
      title: "Event Added",
      description: `${event.title} has been scheduled`,
    });
  };

  const deleteEvent = (eventId: string) => {
    saveEvents(events.filter(e => e.id !== eventId));
    toast({
      title: "Event Deleted",
      description: "Event has been removed from your schedule",
    });
  };

  const getTypeColor = (type: Event['type']) => {
    const colors = {
      meeting: 'bg-blue-500',
      personal: 'bg-green-500',
      work: 'bg-orange-500',
      reminder: 'bg-purple-500'
    };
    return colors[type];
  };

  const getTodayEvents = () => {
    const today = new Date().toISOString().split('T')[0];
    return events
      .filter(event => event.date === today)
      .sort((a, b) => a.time.localeCompare(b.time));
  };

  const getUpcomingEvents = () => {
    const today = new Date().toISOString().split('T')[0];
    return events
      .filter(event => event.date > today)
      .slice(0, 3)
      .sort((a, b) => a.date.localeCompare(b.date));
  };

  if (isAddingEvent) {
    return (
      <div className="space-y-3">
        <Input
          placeholder="Event title"
          value={newEvent.title || ''}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          className="bg-[#21262d] border-[#30363d] text-white"
        />
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="date"
            value={newEvent.date || ''}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            className="bg-[#21262d] border-[#30363d] text-white"
          />
          <Input
            type="time"
            value={newEvent.time || ''}
            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
            className="bg-[#21262d] border-[#30363d] text-white"
          />
        </div>
        <select
          value={newEvent.type}
          onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as Event['type'] })}
          className="w-full p-2 bg-[#21262d] border border-[#30363d] rounded text-white"
        >
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="meeting">Meeting</option>
          <option value="reminder">Reminder</option>
        </select>
        <div className="flex gap-2">
          <Button onClick={addEvent} size="sm" className="bg-blue-600 hover:bg-blue-700">
            Add
          </Button>
          <Button onClick={() => setIsAddingEvent(false)} size="sm" variant="outline">
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-white font-medium flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          Today's Events
        </h3>
        <Button
          onClick={() => setIsAddingEvent(true)}
          size="sm"
          variant="ghost"
          className="text-blue-400 hover:text-blue-300"
        >
          <Plus className="w-3 h-3" />
        </Button>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {getTodayEvents().length === 0 ? (
          <p className="text-[#7d8590] text-sm">No events scheduled for today</p>
        ) : (
          getTodayEvents().map(event => (
            <div key={event.id} className="flex items-center justify-between p-2 bg-[#21262d] rounded">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${getTypeColor(event.type)}`} />
                <div>
                  <p className="text-white text-sm font-medium">{event.title}</p>
                  <p className="text-[#7d8590] text-xs flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {event.time}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => deleteEvent(event.id)}
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

      {getUpcomingEvents().length > 0 && (
        <div>
          <h4 className="text-[#7d8590] text-sm mb-2">Upcoming</h4>
          <div className="space-y-1">
            {getUpcomingEvents().map(event => (
              <div key={event.id} className="flex items-center space-x-2 text-xs">
                <div className={`w-1.5 h-1.5 rounded-full ${getTypeColor(event.type)}`} />
                <span className="text-white">{event.title}</span>
                <span className="text-[#7d8590]">{event.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventScheduler;
