
import React from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { useLanguage } from '@/contexts/LanguageContext';
import AdminAuth from '@/components/AdminAuth';
import AdminDashboard from '@/components/AdminDashboard';

const Admin = () => {
  const { admin, isLoading } = useAdmin();
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0d1117] flex items-center justify-center">
        <div className="text-gray-900 dark:text-white">{t('loading')}</div>
      </div>
    );
  }

  return admin ? <AdminDashboard /> : <AdminAuth />;
};

export default Admin;
