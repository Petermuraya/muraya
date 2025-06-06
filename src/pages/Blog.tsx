
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, User, Search, Tag, Heart, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BlogRating from '@/components/BlogRating';
import NewsletterSignup from '@/components/NewsletterSignup';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string | null;
  slug: string;
  published: boolean;
  tags: string[] | null;
  featured_image: string | null;
  created_at: string;
  author_id: string | null;
}

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    filterBlogs();
  }, [blogs, searchTerm, selectedTag]);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setBlogs(data || []);
      
      // Extract all unique tags
      const tags = new Set<string>();
      data?.forEach(blog => {
        blog.tags?.forEach(tag => tags.add(tag));
      });
      setAllTags(Array.from(tags));
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const filterBlogs = () => {
    let filtered = blogs;

    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTag) {
      filtered = filtered.filter(blog =>
        blog.tags?.includes(selectedTag)
      );
    }

    setFilteredBlogs(filtered);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  if (selectedBlog) {
    return (
      <>
        <Helmet>
          <title>{selectedBlog.title} - Blog</title>
          <meta name="description" content={selectedBlog.excerpt || selectedBlog.title} />
        </Helmet>
        
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
          <Navigation />
          
          <main className="pt-20">
            <article className="py-16 px-4">
              <div className="container mx-auto max-w-4xl">
                {/* Back Button */}
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="mb-8 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  ← Back to Blog
                </button>

                {/* Article Header */}
                <header className="mb-8">
                  {selectedBlog.featured_image && (
                    <img
                      src={selectedBlog.featured_image}
                      alt={selectedBlog.title}
                      className="w-full h-64 object-cover rounded-lg mb-6"
                    />
                  )}
                  
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                    {selectedBlog.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-300 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(selectedBlog.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{getReadingTime(selectedBlog.content)} min read</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>Admin</span>
                    </div>
                  </div>

                  {selectedBlog.tags && selectedBlog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedBlog.tags.map(tag => (
                        <Badge key={tag} variant="secondary">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </header>

                {/* Article Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
                  <div dangerouslySetInnerHTML={{ __html: selectedBlog.content.replace(/\n/g, '<br />') }} />
                </div>

                {/* Rating Component */}
                <div className="mb-12">
                  <BlogRating blogId={selectedBlog.id} />
                </div>

                {/* Newsletter Signup */}
                <div className="max-w-2xl mx-auto">
                  <NewsletterSignup />
                </div>
              </div>
            </article>
          </main>
          
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Blog - Tech Insights & Tutorials</title>
        <meta name="description" content="Explore articles about web development, IoT, AI, and modern technology solutions." />
        <meta name="keywords" content="blog, web development, IoT, AI, technology, tutorials, programming" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <Navigation />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-20 px-4">
            <div className="container mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Tech Insights & Stories
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Dive deep into web development, IoT innovations, AI breakthroughs, 
                and the latest in technology trends.
              </p>
            </div>
          </section>

          {/* Search and Filter */}
          <section className="py-8 px-4">
            <div className="container mx-auto max-w-4xl">
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600"
                >
                  <option value="">All Categories</option>
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Blog Posts */}
          <section className="py-8 px-4">
            <div className="container mx-auto">
              {filteredBlogs.length === 0 ? (
                <div className="text-center py-16">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    No articles found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {blogs.length === 0 
                      ? "Check back soon for new content!" 
                      : "Try adjusting your search or filter criteria."}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredBlogs.map((blog) => (
                    <Card 
                      key={blog.id} 
                      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                      onClick={() => setSelectedBlog(blog)}
                    >
                      {blog.featured_image && (
                        <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                          <img
                            src={blog.featured_image}
                            alt={blog.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      
                      <CardHeader>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(blog.created_at)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{getReadingTime(blog.content)} min</span>
                          </div>
                        </div>
                        
                        <CardTitle className="text-xl font-bold leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {blog.title}
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                          {blog.excerpt || blog.content.substring(0, 150) + '...'}
                        </p>
                        
                        {blog.tags && blog.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {blog.tags.slice(0, 3).map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {blog.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{blog.tags.length - 3} more
                              </Badge>
                            )}
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                          <span className="text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
                            Read more →
                          </span>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              <span>0</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>0</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Newsletter Section */}
          <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto max-w-2xl">
              <NewsletterSignup />
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Blog;
