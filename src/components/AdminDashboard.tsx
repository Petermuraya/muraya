
import React, { useState, useEffect } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { supabase } from '@/integrations/supabase/client';
import AdminHeader from './admin/AdminHeader';
import AdminTabs from './admin/AdminTabs';

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
      <AdminHeader 
        adminName={admin?.name || ''} 
        onLogout={handleLogout} 
      />

      <main className="p-6">
        <AdminTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          counts={counts}
        />
      </main>
    </div>
  );
};

export default AdminDashboard;
