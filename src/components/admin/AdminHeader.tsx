
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

interface AdminHeaderProps {
  adminName: string;
  onLogout: () => void;
}

const AdminHeader = ({ adminName, onLogout }: AdminHeaderProps) => {
  return (
    <header className="bg-[#161b22] border-b border-[#30363d] px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-[#c9d1d9]">Welcome, {adminName}</span>
          <Button onClick={onLogout} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
