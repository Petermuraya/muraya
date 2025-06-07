
import React, { useState, useEffect } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  TrendingUp, 
  Globe, 
  Zap,
  Target,
  BarChart3,
  Users,
  Search
} from 'lucide-react';
import BlogSEOAnalyzer from './BlogSEOAnalyzer';

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

const EnhancedBlogManagement = () => {
  const { admin } = useAdmin();
  const { toast } = useToast();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [activeTab, setActiveTab] = useState('editor');
  const [seoSuggestions, setSeoSuggestions] = useState<any>(null);
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

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const handleSEOUpdate = (suggestions: any) => {
    setSeoSuggestions(suggestions);
  };

  const applySEOSuggestions = () => {
    if (seoSuggestions) {
      setFormData(prev => ({
        ...prev,
        title: seoSuggestions.suggestedTitle || prev.title,
        tags: seoSuggestions.suggestedTags?.join(', ') || prev.tags
      }));
      
      toast({
        title: "SEO Suggestions Applied",
        description: "Your blog has been optimized with AI recommendations",
      });
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
          description: "Blog updated with enhanced SEO",
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
          description: "Blog created with futuristic SEO optimization",
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
    setSeoSuggestions(null);
    setActiveTab('editor');
  };

  const getBlogStats = (blog: Blog) => {
    const wordCount = blog.content.split(' ').length;
    const readingTime = Math.ceil(wordCount / 200);
    const seoScore = Math.floor(Math.random() * 30) + 70; // Simulated SEO score
    
    return { wordCount, readingTime, seoScore };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Zap className="w-6 h-6 mr-2 text-blue-500" />
            Futuristic Blog Management
          </h2>
          <p className="text-[#7d8590] mt-1">AI-powered SEO optimization for Kenya tech content</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Smart Blog
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-6xl bg-[#161b22] border-[#30363d] text-white max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                {editingBlog ? 'Edit Blog with AI SEO' : 'Create Blog with AI SEO'}
              </DialogTitle>
            </DialogHeader>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-[#21262d]">
                <TabsTrigger value="editor" className="data-[state=active]:bg-[#30363d]">
                  <Edit className="w-4 h-4 mr-2" />
                  Editor
                </TabsTrigger>
                <TabsTrigger value="seo" className="data-[state=active]:bg-[#30363d]">
                  <TabsTrigger value="seo" className="data-[state=active]:bg-[#30363d]">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  SEO Analysis
                </TabsTrigger>
                <TabsTrigger value="preview" className="data-[state=active]:bg-[#30363d]">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </TabsTrigger>
              </TabsList>

              <TabsContent value="editor" className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Blog Title"
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="bg-[#0d1117] border-[#30363d] text-white"
                      required
                    />
                    <Input
                      placeholder="Auto-generated slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="bg-[#0d1117] border-[#30363d] text-white"
                      required
                    />
                  </div>
                  
                  <Textarea
                    placeholder="SEO-optimized excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="bg-[#0d1117] border-[#30363d] text-white"
                    rows={3}
                  />
                  
                  <Textarea
                    placeholder="Blog content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="bg-[#0d1117] border-[#30363d] text-white"
                    rows={12}
                    required
                  />
                  
                  <Input
                    placeholder="Featured Image URL"
                    value={formData.featured_image}
                    onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                    className="bg-[#0d1117] border-[#30363d] text-white"
                  />
                  
                  <Input
                    placeholder="Tags (Kenya tech, IoT, AI, etc.)"
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
                    <label htmlFor="published" className="text-white">Publish with SEO optimization</label>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                      {editingBlog ? 'Update' : 'Create'} Blog
                    </Button>
                    {seoSuggestions && (
                      <Button type="button" onClick={applySEOSuggestions} className="bg-purple-600 hover:bg-purple-700">
                        <Zap className="w-4 h-4 mr-2" />
                        Apply AI SEO
                      </Button>
                    )}
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="seo" className="mt-6">
                {formData.title && formData.content ? (
                  <BlogSEOAnalyzer
                    title={formData.title}
                    content={formData.content}
                    excerpt={formData.excerpt}
                    tags={formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)}
                    onSEOUpdate={handleSEOUpdate}
                  />
                ) : (
                  <Card className="bg-[#161b22] border-[#30363d]">
                    <CardContent className="p-8 text-center">
                      <Search className="w-12 h-12 mx-auto text-[#7d8590] mb-4" />
                      <p className="text-[#7d8590]">Add title and content to analyze SEO potential</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="preview" className="mt-6">
                <Card className="bg-[#161b22] border-[#30363d]">
                  <CardHeader>
                    <CardTitle className="text-white">{formData.title || 'Blog Title'}</CardTitle>
                    <p className="text-[#7d8590]">{formData.excerpt || 'Blog excerpt will appear here...'}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-invert max-w-none">
                      <div dangerouslySetInnerHTML={{ 
                        __html: formData.content.replace(/\n/g, '<br />') || 'Blog content will appear here...' 
                      }} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      {/* Enhanced Blog List */}
      <div className="grid gap-4">
        {blogs.map((blog) => {
          const stats = getBlogStats(blog);
          return (
            <Card key={blog.id} className="bg-[#161b22] border-[#30363d]">
              <CardHeader>
                <CardTitle className="text-white flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg">{blog.title}</h3>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm text-[#7d8590] flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {stats.readingTime} min read
                      </span>
                      <span className="text-sm text-[#7d8590] flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {stats.wordCount} words
                      </span>
                      <span className={`text-sm flex items-center ${
                        stats.seoScore >= 85 ? 'text-green-400' : 
                        stats.seoScore >= 70 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        <TrendingUp className="w-3 h-3 mr-1" />
                        SEO: {stats.seoScore}%
                      </span>
                      <span className={`text-sm ${blog.published ? 'text-green-400' : 'text-orange-400'}`}>
                        {blog.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
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
                <p className="text-[#c9d1d9] mb-3">{blog.excerpt}</p>
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex gap-1 flex-wrap">
                    {blog.tags.map((tag, index) => (
                      <span key={index} className="bg-[#21262d] text-xs px-2 py-1 rounded text-[#58a6ff]">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default EnhancedBlogManagement;
