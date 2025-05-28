
import React from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import AdminLogin from '@/components/AdminLogin';
import AdminDashboard from '@/components/AdminDashboard';

const Admin = () => {
  const { admin, isLoading } = useAdmin();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return admin ? <AdminDashboard /> : <AdminLogin />;
};

export default Admin;
