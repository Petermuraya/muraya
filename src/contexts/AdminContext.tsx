
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminUser {
  id: string;
  email: string;
  name: string;
}

interface AdminContextType {
  admin: AdminUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const adminData = localStorage.getItem('admin_user');
    if (adminData) {
      setAdmin(JSON.parse(adminData));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.rpc('authenticate_admin', {
        email_input: email,
        password_input: password
      });

      if (error || !data || data.length === 0) {
        return false;
      }

      const adminUser = data[0];
      setAdmin(adminUser);
      localStorage.setItem('admin_user', JSON.stringify(adminUser));
      
      // Update last login
      await supabase.rpc('update_admin_last_login', { admin_id: adminUser.id });
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('admin_user');
  };

  return (
    <AdminContext.Provider value={{ admin, isLoading, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};
