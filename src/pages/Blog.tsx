
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    // Smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Parallax and scroll effects
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-bg');
      
      parallaxElements.forEach((element) => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        (element as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
    };

    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          entry.target.classList.remove('opacity-0');
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.scroll-animate');
    sections.forEach((section) => observer.observe(section));

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

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
    <div className="min-h-screen bg-[#0d1117] text-white overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="parallax-bg absolute inset-0 bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#21262d]"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23f0f6fc&quot; fill-opacity=&quot;0.02&quot;%3E%3Ccircle cx=&quot;7&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      </div>

      {/* Gradient Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10">
        <Navigation />
        
        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16 scroll-animate opacity-0">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">Blog & Articles</h1>
              <p className="text-xl text-[#7d8590] max-w-2xl mx-auto">
                Sharing insights, tutorials, and thoughts on web development, technology trends, and best practices
              </p>
            </div>

            {/* Search and Filter */}
            <div className="mb-12 scroll-animate opacity-0">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7d8590] w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-[#161b22]/50 backdrop-blur-md border-[#30363d] text-[#c9d1d9] placeholder-[#7d8590] focus:border-blue-500/50"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedCategory === category 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 border-0 shadow-lg hover:shadow-blue-500/20' 
                        : 'border-[#30363d] bg-[#161b22]/50 backdrop-blur-md hover:bg-[#30363d]/50 hover:border-blue-500/30 text-[#c9d1d9]'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 scroll-animate opacity-0">
              {filteredPosts.map((post, index) => (
                <Card key={post.id} className="group overflow-hidden glass-effect border-[#30363d] hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
                  <div className="relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 border-0 shadow-lg">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#c9d1d9] mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-[#8b949e] mb-4 line-clamp-3">{post.excerpt}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-[#30363d] text-[#c9d1d9]">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-[#7d8590] mb-4">
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
                    <div className="flex items-center justify-between pt-4 border-t border-[#30363d]">
                      <LikeButton itemId={post.id} itemType="blog" />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleComments(index)}
                        className="flex items-center gap-2 text-[#c9d1d9] hover:text-blue-400 hover:bg-[#30363d]/50"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Comments
                      </Button>
                    </div>

                    {/* Comments Section */}
                    {expandedPost === index && (
                      <div className="mt-4 pt-4 border-t border-[#30363d]">
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
                <h3 className="text-xl font-semibold text-[#c9d1d9] mb-2">No articles found</h3>
                <p className="text-[#7d8590]">Try adjusting your search terms or category filter.</p>
              </div>
            )}

            {/* Newsletter Signup */}
            <div className="mt-20 scroll-animate opacity-0">
              <Card className="p-8 text-center bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-[#30363d] backdrop-blur-md">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Stay Updated</h3>
                <p className="text-[#8b949e] mb-6">
                  Subscribe to my newsletter for the latest articles and insights on web development.
                </p>
                <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
                  <Input 
                    type="email" 
                    placeholder="Enter your email"
                    className="flex-1 bg-[#161b22]/50 backdrop-blur-md border-[#30363d] text-[#c9d1d9] placeholder-[#7d8590]"
                  />
                  <Button className="bg-gradient-to-r from-blue-500 to-blue-600 border-0 shadow-lg hover:shadow-blue-500/20">
                    Subscribe
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
};

export default Blog;
