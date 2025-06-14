
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Brain, Mic, Send, Settings, Lightbulb, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AITask {
  id: string;
  type: 'suggestion' | 'reminder' | 'insight' | 'automation';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  createdAt: string;
}

const AIPersonalAssistant = ({ widgetId }: { widgetId?: string }) => {
  const [tasks, setTasks] = useState<AITask[]>([]);
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadAITasks();
    generateDailyInsights();
  }, []);

  const loadAITasks = () => {
    const saved = localStorage.getItem('ai_assistant_tasks');
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  };

  const saveAITasks = (newTasks: AITask[]) => {
    setTasks(newTasks);
    localStorage.setItem('ai_assistant_tasks', JSON.stringify(newTasks));
  };

  const generateDailyInsights = () => {
    const insights: AITask[] = [
      {
        id: '1',
        type: 'insight',
        title: 'Optimal Posting Time',
        description: 'Your social media posts get 40% more engagement when posted at 2 PM',
        priority: 'medium',
        completed: false,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        type: 'suggestion',
        title: 'Blog Topic Suggestion',
        description: 'Consider writing about "AI in Kenyan Agriculture" - trending topic',
        priority: 'high',
        completed: false,
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        type: 'automation',
        title: 'Auto-schedule Weekly Review',
        description: 'Set up automatic weekly business review every Friday at 4 PM',
        priority: 'low',
        completed: false,
        createdAt: new Date().toISOString()
      }
    ];

    const existingTasks = tasks.filter(task => 
      !insights.find(insight => insight.title === task.title)
    );
    
    saveAITasks([...existingTasks, ...insights]);
  };

  const handleVoiceInput = async () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Voice Not Supported",
        description: "Your browser doesn't support voice recognition",
        variant: "destructive",
      });
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      toast({
        title: "Voice Recognition Error",
        description: "Please try again",
        variant: "destructive",
      });
    };

    recognition.start();
  };

  const processAIQuery = async () => {
    if (!query.trim()) return;

    // Simulate AI processing
    const responses = [
      "I've analyzed your schedule and suggest focusing on content creation tomorrow morning.",
      "Based on your recent activity, consider reaching out to 3 networking contacts this week.",
      "Your blog engagement is up 25% - great job! Try posting more tech trend content.",
      "I recommend scheduling your social media posts for maximum engagement during lunch hours.",
      "Your productivity peaks at 10 AM - schedule important tasks during this time."
    ];

    const response = responses[Math.floor(Math.random() * responses.length)];
    
    const newTask: AITask = {
      id: Date.now().toString(),
      type: 'suggestion',
      title: 'AI Recommendation',
      description: response,
      priority: 'medium',
      completed: false,
      createdAt: new Date().toISOString()
    };

    saveAITasks([newTask, ...tasks]);
    setQuery('');
    
    toast({
      title: "AI Assistant",
      description: "New recommendation added to your tasks",
    });
  };

  const completeTask = (taskId: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: true } : task
    );
    saveAITasks(updatedTasks);
  };

  const getTaskIcon = (type: AITask['type']) => {
    const icons = {
      suggestion: Lightbulb,
      reminder: Settings,
      insight: TrendingUp,
      automation: Brain
    };
    return icons[type];
  };

  const getPriorityColor = (priority: AITask['priority']) => {
    const colors = {
      high: 'text-red-400 bg-red-500/10 border-red-500/30',
      medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
      low: 'text-green-400 bg-green-500/10 border-green-500/30'
    };
    return colors[priority];
  };

  const activeTasks = tasks.filter(task => !task.completed).slice(0, 3);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-white font-medium flex items-center">
          <Brain className="w-4 h-4 mr-2" />
          AI Assistant
        </h3>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Ask your AI assistant..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && processAIQuery()}
          className="bg-[#21262d] border-[#30363d] text-white flex-1"
        />
        <Button
          onClick={handleVoiceInput}
          size="sm"
          variant="outline"
          className={isListening ? 'bg-red-500/20 border-red-500/30' : ''}
        >
          <Mic className={`w-3 h-3 ${isListening ? 'text-red-400' : ''}`} />
        </Button>
        <Button onClick={processAIQuery} size="sm">
          <Send className="w-3 h-3" />
        </Button>
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto">
        {activeTasks.length === 0 ? (
          <p className="text-[#7d8590] text-sm text-center py-4">
            Ask your AI assistant for personalized business insights
          </p>
        ) : (
          activeTasks.map(task => {
            const Icon = getTaskIcon(task.type);
            return (
              <div 
                key={task.id} 
                className={`p-2 rounded border ${getPriorityColor(task.priority)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-2 flex-1">
                    <Icon className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white text-sm font-medium">{task.title}</p>
                      <p className="text-[#c9d1d9] text-xs mt-1">{task.description}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => completeTask(task.id)}
                    size="sm"
                    variant="ghost"
                    className="text-green-400 hover:text-green-300 p-1"
                  >
                    ✓
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AIPersonalAssistant;
