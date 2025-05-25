
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface LikeButtonProps {
  itemId: string | number;
  itemType: 'project' | 'blog';
  className?: string;
}

const LikeButton = ({ itemId, itemType, className }: LikeButtonProps) => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const { toast } = useToast();

  const tableName = itemType === 'project' ? 'project_likes' : 'blog_likes';
  const idColumn = itemType === 'project' ? 'project_id' : 'blog_id';

  useEffect(() => {
    loadLikes();
    // For demo purposes, we'll use a simple email input or localStorage
    const email = localStorage.getItem('user_email') || '';
    setUserEmail(email);
  }, [itemId, itemType]);

  const loadLikes = async () => {
    try {
      const { data, error } = await supabase
        .from(tableName as any)
        .select('*')
        .eq(idColumn, itemId);

      if (error) throw error;

      setLikes(data?.length || 0);
      
      const email = localStorage.getItem('user_email') || '';
      const userLike = data?.find((like: any) => like.user_email === email);
      setIsLiked(!!userLike);
    } catch (error) {
      console.error('Error loading likes:', error);
    }
  };

  const handleLike = async () => {
    if (!userEmail) {
      const email = prompt('Please enter your email to like this:');
      if (!email) return;
      localStorage.setItem('user_email', email);
      setUserEmail(email);
    }

    try {
      if (isLiked) {
        // Unlike
        const { error } = await supabase
          .from(tableName as any)
          .delete()
          .eq(idColumn, itemId)
          .eq('user_email', userEmail);

        if (error) throw error;
        setLikes(prev => prev - 1);
        setIsLiked(false);
      } else {
        // Like - create the insert object with proper typing
        const insertData = itemType === 'project' 
          ? { project_id: String(itemId), user_email: userEmail }
          : { blog_id: Number(itemId), user_email: userEmail };

        const { error } = await supabase
          .from(tableName as any)
          .insert(insertData);

        if (error) throw error;
        setLikes(prev => prev + 1);
        setIsLiked(true);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      toast({
        title: "Error",
        description: "Failed to update like. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLike}
      className={`flex items-center gap-2 ${className}`}
    >
      <Heart
        className={`w-4 h-4 transition-colors ${
          isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500'
        }`}
      />
      <span className="text-sm">{likes}</span>
    </Button>
  );
};

export default LikeButton;
