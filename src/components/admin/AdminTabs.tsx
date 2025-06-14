
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, FolderOpen, BarChart3, Mail, Users, Star, Brain } from 'lucide-react';
import PersonalDashboard from '../PersonalDashboard';
import EnhancedBlogManagement from '../EnhancedBlogManagement';
import ProjectManagement from '../ProjectManagement';
import ContactManagement from '../ContactManagement';
import NewsletterManagement from '../NewsletterManagement';
import RatingManagement from '../RatingManagement';
import AdminOverview from './AdminOverview';

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
        <AdminOverview counts={counts} />
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
