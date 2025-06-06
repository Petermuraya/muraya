
import { useState, useEffect } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

interface BlogRatingProps {
  blogId: number;
  className?: string;
}

interface Rating {
  id: string;
  rating: number;
  comment: string | null;
  user_email: string;
  created_at: string;
  visible: boolean;
}

const BlogRating = ({ blogId, className }: BlogRatingProps) => {
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchRatings();
  }, [blogId]);

  const fetchRatings = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_ratings')
        .select('*')
        .eq('blog_id', blogId)
        .eq('visible', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setRatings(data || []);
      
      if (data && data.length > 0) {
        const avg = data.reduce((sum, rating) => sum + rating.rating, 0) / data.length;
        setAverageRating(Math.round(avg * 10) / 10);
      }
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };

  const handleRatingSubmit = async () => {
    if (!userEmail || !userRating) {
      toast({
        title: "Missing Information",
        description: "Please provide your email and rating",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('blog_ratings')
        .upsert([{
          blog_id: blogId,
          user_email: userEmail,
          rating: userRating,
          comment: userComment || null
        }], {
          onConflict: 'blog_id,user_email'
        });

      if (error) throw error;

      toast({
        title: "Rating Submitted!",
        description: "Thank you for your feedback",
      });

      setUserRating(0);
      setUserComment('');
      setUserEmail('');
      setShowCommentForm(false);
      fetchRatings();
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast({
        title: "Failed to Submit",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStars = (rating: number, onStarClick?: (star: number) => void) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          'w-5 h-5 cursor-pointer transition-colors',
          i < rating 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300 hover:text-yellow-400',
          onStarClick && 'hover:scale-110'
        )}
        onClick={() => onStarClick && onStarClick(i + 1)}
      />
    ));
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Average Rating Display */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              {renderStars(Math.round(averageRating))}
              <span className="text-sm text-gray-600 ml-2">
                {averageRating > 0 ? `${averageRating}/5` : 'No ratings yet'}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {ratings.length} {ratings.length === 1 ? 'rating' : 'ratings'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Rating Form */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="text-lg font-semibold">Rate this article</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Your email</label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full mt-1 px-3 py-2 border rounded-md"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Your rating</label>
              <div className="flex gap-1 mt-1">
                {renderStars(userRating, setUserRating)}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => setShowCommentForm(!showCommentForm)}
                variant="outline"
                size="sm"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Add Comment
              </Button>
              
              <Button
                onClick={handleRatingSubmit}
                disabled={isLoading || !userRating || !userEmail}
                size="sm"
              >
                Submit Rating
              </Button>
            </div>

            {showCommentForm && (
              <Textarea
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                placeholder="Share your thoughts about this article..."
                rows={3}
                disabled={isLoading}
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Comments Display */}
      {ratings.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Reader Reviews</h3>
          {ratings.map((rating) => (
            <Card key={rating.id}>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {renderStars(rating.rating)}
                      <span className="text-sm text-gray-500">
                        {new Date(rating.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {rating.comment && (
                      <p className="text-gray-700 dark:text-gray-300">
                        {rating.comment}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      by {rating.user_email.split('@')[0]}***
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogRating;
