
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LikeButton from '@/components/LikeButton';
import CommentsSection from '@/components/CommentsSection';
import { Calendar, Clock, Search, MessageCircle } from 'lucide-react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedPost, setExpandedPost] = useState<number | null>(null);

  const blogPosts = [
    {
      id: 1,
      title: "Building Scalable React Applications with TypeScript",
      excerpt: "Learn best practices for structuring large React applications with TypeScript, focusing on maintainability and developer experience.",
      content: "In this comprehensive guide, we'll explore how to build scalable React applications...",
      author: "Your Name",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "React",
      tags: ["React", "TypeScript", "Architecture"],
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=300&fit=crop",
      comments: 12
    },
    {
      id: 2,
      title: "Modern CSS Techniques for Better Performance",
      excerpt: "Discover advanced CSS techniques that can significantly improve your website's performance and user experience.",
      content: "CSS has evolved tremendously over the years...",
      author: "Your Name",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "CSS",
      tags: ["CSS", "Performance", "Web Design"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop",
      comments: 8
    },
    {
      id: 3,
      title: "Getting Started with Supabase for Full-Stack Development",
      excerpt: "A complete guide to using Supabase as your backend-as-a-service solution for modern web applications.",
      content: "Supabase has become increasingly popular...",
      author: "Your Name",
      date: "2024-01-05",
      readTime: "10 min read",
      category: "Backend",
      tags: ["Supabase", "Backend", "Database"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=300&fit=crop",
      comments: 15
    },
    {
      id: 4,
      title: "The Future of Web Development in 2024",
      excerpt: "Exploring upcoming trends and technologies that will shape web development in 2024 and beyond.",
      content: "As we look ahead to 2024, the web development landscape...",
      author: "Your Name",
      date: "2023-12-28",
      readTime: "12 min read",
      category: "Trends",
      tags: ["Trends", "Web Development", "Future"],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=300&fit=crop",
      comments: 20
    }
  ];

  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const toggleComments = (postIndex: number) => {
    setExpandedPost(expandedPost === postIndex ? null : postIndex);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Blog & Articles</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Sharing insights, tutorials, and thoughts on web development, technology trends, and best practices
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    selectedCategory === category 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'hover:bg-blue-50'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <Card key={post.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <div className="relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-600 hover:bg-blue-700">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Like and Comment Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <LikeButton itemId={post.id} itemType="blog" />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleComments(index)}
                      className="flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Comments
                    </Button>
                  </div>

                  {/* Comments Section */}
                  {expandedPost === index && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <CommentsSection itemId={post.id} itemType="blog" />
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search terms or category filter.</p>
            </div>
          )}

          {/* Newsletter Signup */}
          <div className="mt-20">
            <Card className="p-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-blue-100 mb-6">
                Subscribe to my newsletter for the latest articles and insights on web development.
              </p>
              <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
                <Input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 bg-white text-gray-900"
                />
                <button className="bg-white text-blue-600 px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
                  Subscribe
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Blog;
