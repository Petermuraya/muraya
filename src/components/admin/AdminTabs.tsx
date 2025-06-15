
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, FolderOpen, BarChart3, Mail, Users, Star, Brain, User, Share2, CheckSquare, Settings, Download } from 'lucide-react';
import PersonalDashboard from '../PersonalDashboard';
import EnhancedBlogManagement from '../EnhancedBlogManagement';
import ProjectManagement from '../ProjectManagement';
import ContactManagement from '../ContactManagement';
import NewsletterManagement from '../NewsletterManagement';
import RatingManagement from '../RatingManagement';
import AdminOverview from './AdminOverview';
import UserProfile from '../profile/UserProfile';
import SocialDashboard from '../social/SocialDashboard';
import AnalyticsDashboard from '../analytics/AnalyticsDashboard';
import TasksDashboard from '../tasks/TasksDashboard';
import FeaturedSectionManager from './FeaturedSectionManager';
import ResumeManagement from './ResumeManagement';

interface CountsData {
  blogs: number;
  projects: number;
  messages: number;
  newsletter: number;
  ratings: number;
}

interface AdminTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  counts: CountsData;
}

const AdminTabs = ({ activeTab, setActiveTab, counts }: AdminTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-12 bg-[#161b22] border border-[#30363d]">
        <TabsTrigger value="personal" className="data-[state=active]:bg-[#21262d]">
          <Brain className="w-4 h-4 mr-2" />
          Personal Hub
        </TabsTrigger>
        <TabsTrigger value="overview" className="data-[state=active]:bg-[#21262d]">
          <BarChart3 className="w-4 h-4 mr-2" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="featured" className="data-[state=active]:bg-[#21262d]">
          <Settings className="w-4 h-4 mr-2" />
          Featured
        </TabsTrigger>
        <TabsTrigger value="resume" className="data-[state=active]:bg-[#21262d]">
          <Download className="w-4 h-4 mr-2" />
          Resume
        </TabsTrigger>
        <TabsTrigger value="profile" className="data-[state=active]:bg-[#21262d]">
          <User className="w-4 h-4 mr-2" />
          Profile
        </TabsTrigger>
        <TabsTrigger value="social" className="data-[state=active]:bg-[#21262d]">
          <Share2 className="w-4 h-4 mr-2" />
          Social
        </TabsTrigger>
        <TabsTrigger value="analytics" className="data-[state=active]:bg-[#21262d]">
          <BarChart3 className="w-4 h-4 mr-2" />
          Analytics
        </TabsTrigger>
        <TabsTrigger value="tasks" className="data-[state=active]:bg-[#21262d]">
          <CheckSquare className="w-4 h-4 mr-2" />
          Tasks
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
      </TabsList>

      <TabsContent value="personal" className="mt-6">
        <PersonalDashboard />
      </TabsContent>

      <TabsContent value="overview" className="mt-6">
        <AdminOverview counts={counts} />
      </TabsContent>

      <TabsContent value="featured" className="mt-6">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Featured Section Management</h2>
          <FeaturedSectionManager />
        </div>
      </TabsContent>

      <TabsContent value="resume" className="mt-6">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Resume Management</h2>
          <ResumeManagement />
        </div>
      </TabsContent>

      <TabsContent value="profile" className="mt-6">
        <UserProfile />
      </TabsContent>

      <TabsContent value="social" className="mt-6">
        <SocialDashboard />
      </TabsContent>

      <TabsContent value="analytics" className="mt-6">
        <AnalyticsDashboard />
      </TabsContent>

      <TabsContent value="tasks" className="mt-6">
        <TasksDashboard />
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
  );
};

export default AdminTabs;
