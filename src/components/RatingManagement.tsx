
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Star, Eye, EyeOff, Trash2, MessageSquare } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface BlogRating {
  id: string;
  blog_id: number;
  user_email: string;
  rating: number;
  comment: string | null;
  visible: boolean;
  created_at: string;
}

interface Blog {
  id: number;
  title: string;
}

const RatingManagement = () => {
  const [ratings, setRatings] = useState<BlogRating[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchRatings();
    fetchBlogs();
  }, []);

  const fetchRatings = async () => {
    const { data, error } = await supabase
      .from('blog_ratings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch ratings",
        variant: "destructive",
      });
    } else {
      setRatings(data || []);
    }
  };

  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from('blogs')
      .select('id, title');

    if (error) {
      console.error('Error fetching blogs:', error);
    } else {
      setBlogs(data || []);
    }
  };

  const toggleVisibility = async (id: string, currentVisibility: boolean) => {
    const { error } = await supabase
      .from('blog_ratings')
      .update({ visible: !currentVisibility })
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update visibility",
        variant: "destructive",
      });
    } else {
      fetchRatings();
      toast({
        title: "Success",
        description: `Rating ${!currentVisibility ? 'shown' : 'hidden'}`,
      });
    }
  };

  const deleteRating = async (id: string) => {
    const { error } = await supabase
      .from('blog_ratings')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete rating",
        variant: "destructive",
      });
    } else {
      fetchRatings();
      toast({
        title: "Success",
        description: "Rating deleted",
      });
    }
  };

  const getBlogTitle = (blogId: number) => {
    const blog = blogs.find(b => b.id === blogId);
    return blog ? blog.title : `Blog ${blogId}`;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const averageRating = ratings.length > 0 
    ? ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length 
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Star className="w-6 h-6" />
          Blog Ratings & Reviews
        </h2>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#161b22] border-[#30363d]">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-400">{ratings.length}</p>
              <p className="text-[#7d8590] text-sm">Total Ratings</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#161b22] border-[#30363d]">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">{averageRating.toFixed(1)}</p>
              <p className="text-[#7d8590] text-sm">Average Rating</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#161b22] border-[#30363d]">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">
                {ratings.filter(r => r.comment).length}
              </p>
              <p className="text-[#7d8590] text-sm">With Comments</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#161b22] border-[#30363d]">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-400">
                {ratings.filter(r => r.visible).length}
              </p>
              <p className="text-[#7d8590] text-sm">Visible</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ratings Table */}
      <Card className="bg-[#161b22] border-[#30363d]">
        <CardHeader>
          <CardTitle className="text-white">All Ratings</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-[#30363d]">
                <TableHead className="text-[#c9d1d9]">Blog</TableHead>
                <TableHead className="text-[#c9d1d9]">User</TableHead>
                <TableHead className="text-[#c9d1d9]">Rating</TableHead>
                <TableHead className="text-[#c9d1d9]">Comment</TableHead>
                <TableHead className="text-[#c9d1d9]">Status</TableHead>
                <TableHead className="text-[#c9d1d9]">Date</TableHead>
                <TableHead className="text-[#c9d1d9]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ratings.map((rating) => (
                <TableRow key={rating.id} className="border-[#30363d]">
                  <TableCell className="text-[#c9d1d9]">
                    <div className="max-w-[200px] truncate">
                      {getBlogTitle(rating.blog_id)}
                    </div>
                  </TableCell>
                  <TableCell className="text-[#c9d1d9]">
                    {rating.user_email.split('@')[0]}***
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {renderStars(rating.rating)}
                      </div>
                      <span className="text-[#c9d1d9]">{rating.rating}/5</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-[#c9d1d9]">
                    {rating.comment ? (
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-blue-400" />
                        <span className="max-w-[200px] truncate">{rating.comment}</span>
                      </div>
                    ) : (
                      <span className="text-[#7d8590]">No comment</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {rating.visible ? (
                      <Badge variant="default">Visible</Badge>
                    ) : (
                      <Badge variant="secondary">Hidden</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-[#7d8590]">
                    {new Date(rating.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => toggleVisibility(rating.id, rating.visible)}
                        variant="outline"
                        size="sm"
                      >
                        {rating.visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button
                        onClick={() => deleteRating(rating.id)}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RatingManagement;
