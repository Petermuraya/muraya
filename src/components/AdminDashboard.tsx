
import React, { useState, useEffect } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, FileText, FolderOpen, Settings, BarChart3, Mail, Users, Star, Brain, Calendar } from 'lucide-react';
import EnhancedBlogManagement from './EnhancedBlogManagement';
import ProjectManagement from './ProjectManagement';
import ContactManagement from './ContactManagement';
import NewsletterManagement from './NewsletterManagement';
import RatingManagement from './RatingManagement';
import PersonalDashboard from './PersonalDashboard';
import { supabase } from '@/integrations/supabase/client';

const AdminDashboard = () => {
  const { admin, logout } = useAdmin();
  const [activeTab, setActiveTab] = useState('personal');
  const [counts, setCounts] = useState({
    blogs: 0,
    projects: 0,
    messages: 0,
    newsletter: 0,
    ratings: 0
  });

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      // Fetch all counts in parallel
      const [blogsResult, projectsResult, messagesResult, newsletterResult, ratingsResult] = await Promise.all([
        supabase.from('blogs').select('id', { count: 'exact', head: true }),
        supabase.from('admin_projects').select('id', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('id', { count: 'exact', head: true }).eq('read', false),
        supabase.from('newsletter_subscriptions').select('id', { count: 'exact', head: true }).eq('subscribed', true),
        supabase.from('blog_ratings').select('id', { count: 'exact', head: true })
      ]);

      setCounts({
        blogs: blogsResult.count || 0,
        projects: projectsResult.count || 0,
        messages: messagesResult.count || 0,
        newsletter: newsletterResult.count || 0,
        ratings: ratingsResult.count || 0
      });
    } catch (error) {
      console.error('Error fetching counts:', error);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <header className="bg-[#161b22] border-b border-[#30363d] px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-[#c9d1d9]">Welcome, {admin?.name}</span>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7 bg-[#161b22] border border-[#30363d]">
            <TabsTrigger value="personal" className="data-[state=active]:bg-[#21262d]">
              <Brain className="w-4 h-4 mr-2" />
              Personal Hub
            </TabsTrigger>
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#21262d]">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="blogs" className="data-[state=active]:bg-[#21262d]">
              <FileText className="w-4 h-4 mr-2" />
              Blogs
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-[#21262d]">
              <FolderOpen className="w-4 h-4 mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-[#21262d]">
              <Mail className="w-4 h-4 mr-2" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="newsletter" className="data-[state=active]:bg-[#21262d]">
              <Users className="w-4 h-4 mr-2" />
              Newsletter
            </TabsTrigger>
            <TabsTrigger value="ratings" className="data-[state=active]:bg-[#21262d]">
              <Star className="w-4 h-4 mr-2" />
              Ratings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="mt-6">
            <PersonalDashboard />
          </TabsContent>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-[#161b22] border-[#30363d]">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Total Blogs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-blue-400">{counts.blogs}</p>
                  <p className="text-[#7d8590] text-sm">Published articles</p>
                </CardContent>
              </Card>

              <Card className="bg-[#161b22] border-[#30363d]">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <FolderOpen className="w-5 h-5" />
                    Total Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-green-400">{counts.projects}</p>
                  <p className="text-[#7d8590] text-sm">Active projects</p>
                </CardContent>
              </Card>

              <Card className="bg-[#161b22]lice border-[#30363d]">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Admin Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-purple-400">Active</p>
                  <p className="text-[#7d8590] text-sm">System operational</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <Card className="bg-[#161b22] border-[#30363d]">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Contact Messages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-orange-400">{counts.messages}</p>
                  <p className="text-[#7d8590] text-sm">Unread messages</p>
                </CardContent>
              </Card>

              <Card className="bg-[#161b22] border-[#30363d]">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Newsletter Subscribers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-cyan-400">{counts.newsletter}</p>
                  <p className="text-[#7d8590] text-sm">Active subscribers</p>
                </CardContent>
              </Card>

              <Card className="bg-[#161b22] border-[#30363d]">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Blog Ratings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-yellow-400">{counts.ratings}</p>
                  <p className="text-[#7d8590] text-sm">Total ratings</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="blogs" className="mt-6">
            <EnhancedBlogManagement />
          </TabsContent>

          <TabsContent value="projects" className="mt-6">
            <ProjectManagement />
          </TabsContent>

          <TabsContent value="messages" className="mt-6">
            <ContactManagement />
          </TabsContent>

          <TabsContent value="newsletter" className="mt-6">
            <NewsletterManagement />
          </TabsContent>

          <TabsContent value="ratings" className="mt-6">
            <RatingManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
