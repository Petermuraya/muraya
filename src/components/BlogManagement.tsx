
import React, { useState, useEffect } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

interface Blog {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  published: boolean;
  tags: string[];
  featured_image: string;
  created_at: string;
}

const BlogManagement = () => {
  const { admin } = useAdmin();
  const { toast } = useToast();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    slug: '',
    published: false,
    tags: '',
    featured_image: ''
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch blogs",
        variant: "destructive",
      });
    } else {
      setBlogs(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const blogData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      author_id: admin?.id
    };

    if (editingBlog) {
      const { error } = await supabase
        .from('blogs')
        .update(blogData)
        .eq('id', editingBlog.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update blog",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Blog updated successfully",
        });
        resetForm();
        fetchBlogs();
      }
    } else {
      const { error } = await supabase
        .from('blogs')
        .insert([blogData]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create blog",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Blog created successfully",
        });
        resetForm();
        fetchBlogs();
      }
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt || '',
      slug: blog.slug,
      published: blog.published,
      tags: blog.tags?.join(', ') || '',
      featured_image: blog.featured_image || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete blog",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Blog deleted successfully",
      });
      fetchBlogs();
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      slug: '',
      published: false,
      tags: '',
      featured_image: ''
    });
    setEditingBlog(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Blog Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2" />
              New Blog
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-[#161b22] border-[#30363d] text-white">
            <DialogHeader>
              <DialogTitle>{editingBlog ? 'Edit Blog' : 'Create New Blog'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Blog Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-[#0d1117] border-[#30363d] text-white"
                required
              />
              <Input
                placeholder="Slug (URL-friendly)"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="bg-[#0d1117] border-[#30363d] text-white"
                required
              />
              <Textarea
                placeholder="Excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="bg-[#0d1117] border-[#30363d] text-white"
                rows={3}
              />
              <Textarea
                placeholder="Content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="bg-[#0d1117] border-[#30363d] text-white"
                rows={10}
                required
              />
              <Input
                placeholder="Featured Image URL"
                value={formData.featured_image}
                onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                className="bg-[#0d1117] border-[#30363d] text-white"
              />
              <Input
                placeholder="Tags (comma-separated)"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="bg-[#0d1117] border-[#30363d] text-white"
              />
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="published" className="text-white">Published</label>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  {editingBlog ? 'Update' : 'Create'} Blog
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {blogs.map((blog) => (
          <Card key={blog.id} className="bg-[#161b22] border-[#30363d]">
            <CardHeader>
              <CardTitle className="text-white flex justify-between items-start">
                <div>
                  <h3 className="text-lg">{blog.title}</h3>
                  <p className="text-sm text-[#7d8590]">
                    {blog.published ? 'Published' : 'Draft'} • {new Date(blog.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(blog)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(blog.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#c9d1d9] mb-2">{blog.excerpt}</p>
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex gap-1 flex-wrap">
                  {blog.tags.map((tag, index) => (
                    <span key={index} className="bg-[#21262d] text-xs px-2 py-1 rounded text-[#c9d1d9]">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogManagement;
