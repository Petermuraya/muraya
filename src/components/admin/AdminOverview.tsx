
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, FolderOpen, Settings, Mail, Users, Star } from 'lucide-react';

interface CountsData {
  blogs: number;
  projects: number;
  messages: number;
  newsletter: number;
  ratings: number;
}

interface AdminOverviewProps {
  counts: CountsData;
}

const AdminOverview = ({ counts }: AdminOverviewProps) => {
  return (
    <div className="space-y-6">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
    </div>
  );
};

export default AdminOverview;
