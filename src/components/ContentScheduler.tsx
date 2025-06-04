
import { useState } from 'react';
import { Calendar, Clock, Send, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface ScheduledPost {
  id: string;
  content: string;
  platform: string;
  scheduledTime: string;
  status: 'pending' | 'published' | 'failed';
}

const ContentScheduler = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);
  const { toast } = useToast();

  const platforms = [
    { id: 'twitter', name: 'Twitter', color: 'bg-blue-500' },
    { id: 'linkedin', name: 'LinkedIn', color: 'bg-blue-700' },
    { id: 'facebook', name: 'Facebook', color: 'bg-blue-600' },
    { id: 'medium', name: 'Medium', color: 'bg-gray-800' }
  ];

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const schedulePost = () => {
    if (!content.trim() || !scheduledTime || selectedPlatforms.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields and select at least one platform",
        variant: "destructive",
      });
      return;
    }

    const newPosts = selectedPlatforms.map(platform => ({
      id: `${Date.now()}-${platform}`,
      content,
      platform,
      scheduledTime,
      status: 'pending' as const
    }));

    setScheduledPosts(prev => [...prev, ...newPosts]);
    setContent('');
    setScheduledTime('');
    setSelectedPlatforms([]);
    
    toast({
      title: "Content Scheduled",
      description: `Scheduled ${newPosts.length} posts across selected platforms`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'published': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-44 right-8 z-40 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
        size="sm"
        title="Schedule Content"
      >
        <Calendar className="w-4 h-4 mr-2" />
        Schedule
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-48 right-8 z-40 w-96 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-xl max-h-96 overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            <span className="font-semibold text-gray-900 dark:text-white">Content Scheduler</span>
          </div>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content
            </label>
            <Textarea
              placeholder="Write your post content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Schedule Time
            </label>
            <Input
              type="datetime-local"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Platforms
            </label>
            <div className="flex flex-wrap gap-2">
              {platforms.map(platform => (
                <Button
                  key={platform.id}
                  onClick={() => togglePlatform(platform.id)}
                  variant={selectedPlatforms.includes(platform.id) ? "default" : "outline"}
                  size="sm"
                  className={selectedPlatforms.includes(platform.id) ? platform.color : ''}
                >
                  {platform.name}
                </Button>
              ))}
            </div>
          </div>

          <Button
            onClick={schedulePost}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Schedule Posts
          </Button>
        </div>

        {scheduledPosts.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Scheduled Posts</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {scheduledPosts.slice(-3).map(post => (
                <div key={post.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
                      {post.content}
                    </p>
                    <p className="text-xs text-gray-500">
                      {post.platform} • {new Date(post.scheduledTime).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className={getStatusColor(post.status)}>
                    {post.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ContentScheduler;
