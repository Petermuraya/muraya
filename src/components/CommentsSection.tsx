
import { useState, useEffect } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface Comment {
  id: string;
  user_name: string;
  user_email: string;
  comment: string;
  created_at: string;
}

interface CommentsSectionProps {
  itemId: string | number;
  itemType: 'project' | 'blog';
  className?: string;
}

const CommentsSection = ({ itemId, itemType, className }: CommentsSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false);
  const { toast } = useToast();

  const tableName = itemType === 'project' ? 'project_comments' : 'blog_comments';
  const idColumn = itemType === 'project' ? 'project_id' : 'blog_id';

  useEffect(() => {
    loadComments();
    // Load user info from localStorage
    setUserName(localStorage.getItem('user_name') || '');
    setUserEmail(localStorage.getItem('user_email') || '');
  }, [itemId, itemType]);

  const loadComments = async () => {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq(idColumn, itemId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    
    if (!userName || !userEmail) {
      toast({
        title: "Info Required",
        description: "Please enter your name and email to comment.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create the insert object with proper typing
      const insertData = itemType === 'project' 
        ? { 
            project_id: String(itemId), 
            user_name: userName, 
            user_email: userEmail, 
            comment: newComment.trim() 
          }
        : { 
            blog_id: Number(itemId), 
            user_name: userName, 
            user_email: userEmail, 
            comment: newComment.trim() 
          };

      const { error } = await supabase
        .from(tableName)
        .insert(insertData);

      if (error) throw error;

      // Save user info to localStorage
      localStorage.setItem('user_name', userName);
      localStorage.setItem('user_email', userEmail);

      setNewComment('');
      setShowCommentForm(false);
      loadComments();
      
      toast({
        title: "Success",
        description: "Your comment has been added!",
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Error",
        description: "Failed to add comment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-700">
            {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowCommentForm(!showCommentForm)}
        >
          Add Comment
        </Button>
      </div>

      {showCommentForm && (
        <Card className="p-4">
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <Input
                type="email"
                placeholder="Your email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />
            </div>
            <Textarea
              placeholder="Write your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
              rows={3}
            />
            <div className="flex gap-2">
              <Button type="submit" size="sm">
                <Send className="w-4 h-4 mr-2" />
                Post Comment
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowCommentForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="space-y-3">
        {comments.map((comment) => (
          <Card key={comment.id} className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium text-gray-900">{comment.user_name}</h4>
                <p className="text-sm text-gray-500">{formatDate(comment.created_at)}</p>
              </div>
            </div>
            <p className="text-gray-700">{comment.comment}</p>
          </Card>
        ))}
        
        {comments.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
