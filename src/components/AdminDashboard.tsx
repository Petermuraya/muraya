
import React, { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, FileText, FolderOpen, Settings, BarChart3 } from 'lucide-react';
import BlogManagement from './BlogManagement';
import ProjectManagement from './ProjectManagement';

const AdminDashboard = () => {
  const { admin, logout } = useAdmin();
  const [activeTab, setActiveTab] = useState('overview');

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
          <TabsList className="grid w-full grid-cols-3 bg-[#161b22] border border-[#30363d]">
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
          </TabsList>

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
                  <p className="text-3xl font-bold text-blue-400">0</p>
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
                  <p className="text-3xl font-bold text-green-400">0</p>
                  <p className="text-[#7d8590] text-sm">Active projects</p>
                </CardContent>
              </Card>

              <Card className="bg-[#161b22] border-[#30363d]">
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
          </TabsContent>

          <TabsContent value="blogs" className="mt-6">
            <BlogManagement />
          </TabsContent>

          <TabsContent value="projects" className="mt-6">
            <ProjectManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
