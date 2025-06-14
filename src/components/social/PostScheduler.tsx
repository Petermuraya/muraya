
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  Send, 
  Edit, 
  Trash2,
  Plus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ScheduledPost {
  id: string;
  platform: string;
  content: string;
  scheduled_time: string;
  status: 'scheduled' | 'posted' | 'failed';
}

const PostScheduler = () => {
  const { toast } = useToast();
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([
    {
      id: '1',
      platform: 'LinkedIn',
      content: 'Excited to share our latest AI breakthrough in IoT development...',
      scheduled_time: '2024-12-15T10:00',
      status: 'scheduled'
    },
    {
      id: '2',
      platform: 'Twitter',
      content: 'Just finished debugging a complex algorithm. The satisfaction is real! 🎉 #CodingLife',
      scheduled_time: '2024-12-15T15:30',
      status: 'scheduled'
    }
  ]);
  
  const [isCreating, setIsCreating] = useState(false);
  const [newPost, setNewPost] = useState({
    platform: '',
    content: '',
    scheduled_time: ''
  });

  const handleCreatePost = () => {
    if (!newPost.platform || !newPost.content || !newPost.scheduled_time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to schedule a post.",
        variant: "destructive"
      });
      return;
    }

    const post: ScheduledPost = {
      id: Date.now().toString(),
      platform: newPost.platform,
      content: newPost.content,
      scheduled_time: newPost.scheduled_time,
      status: 'scheduled'
    };

    setScheduledPosts(prev => [post, ...prev]);
    setNewPost({ platform: '', content: '', scheduled_time: '' });
    setIsCreating(false);
    
    toast({
      title: "Post Scheduled",
      description: `Your ${newPost.platform} post has been scheduled successfully!`,
    });
  };

  const handleDeletePost = (id: string) => {
    setScheduledPosts(prev => prev.filter(post => post.id !== id));
    toast({
      title: "Post Deleted",
      description: "Scheduled post has been removed.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-50 text-blue-600 dark:bg-blue-900/20';
      case 'posted': return 'bg-green-50 text-green-600 dark:bg-green-900/20';
      case 'failed': return 'bg-red-50 text-red-600 dark:bg-red-900/20';
      default: return 'bg-gray-50 text-gray-600 dark:bg-gray-900/20';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'LinkedIn': return 'text-blue-600';
      case 'Twitter': return 'text-blue-400';
      case 'Instagram': return 'text-pink-500';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Post Scheduler</span>
          </CardTitle>
          <Button 
            onClick={() => setIsCreating(true)} 
            size="sm"
            disabled={isCreating}
          >
            <Plus className="w-4 h-4 mr-2" />
            Schedule Post
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isCreating && (
          <div className="mb-6 p-4 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
            <h3 className="font-medium text-gray-900 dark:text-white">Schedule New Post</h3>
            
            <Select value={newPost.platform} onValueChange={(value) => setNewPost(prev => ({...prev, platform: value}))}>
              <SelectTrigger>
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                <SelectItem value="Twitter">Twitter</SelectItem>
                <SelectItem value="Instagram">Instagram</SelectItem>
              </SelectContent>
            </Select>

            <Textarea
              placeholder="What would you like to share?"
              value={newPost.content}
              onChange={(e) => setNewPost(prev => ({...prev, content: e.target.value}))}
              rows={3}
            />

            <Input
              type="datetime-local"
              value={newPost.scheduled_time}
              onChange={(e) => setNewPost(prev => ({...prev, scheduled_time: e.target.value}))}
            />

            <div className="flex space-x-2">
              <Button onClick={handleCreatePost} size="sm">
                <Send className="w-4 h-4 mr-2" />
                Schedule
              </Button>
              <Button onClick={() => setIsCreating(false)} variant="outline" size="sm">
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {scheduledPosts.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No scheduled posts yet. Create your first scheduled post!</p>
            </div>
          ) : (
            scheduledPosts.map((post) => (
              <div key={post.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`font-medium ${getPlatformColor(post.platform)}`}>
                      {post.platform}
                    </span>
                    <Badge variant="secondary" className={getStatusColor(post.status)}>
                      {post.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(post.scheduled_time).toLocaleString()}</span>
                    </div>
                    <Button
                      onClick={() => handleDeletePost(post.id)}
                      variant="outline"
                      size="sm"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                
                <p className="text-gray-900 dark:text-white leading-relaxed">
                  {post.content}
                </p>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PostScheduler;
