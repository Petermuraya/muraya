
import React, { useState } from 'react';
import AdminLogin from './AdminLogin';
import SignupForm from './SignupForm';
import ForgotPassword from './ForgotPassword';

type AuthMode = 'login' | 'signup' | 'forgot-password';

const AdminAuth = () => {
  const [mode, setMode] = useState<AuthMode>('login');

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4">
      {mode === 'login' && (
        <div className="space-y-4">
          <AdminLogin onForgotPassword={() => setMode('forgot-password')} />
          <div className="text-center">
            <button
              onClick={() => setMode('signup')}
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              Need admin access? Register here
            </button>
          </div>
        </div>
      )}
      {mode === 'signup' && (
        <SignupForm onSwitchToLogin={() => setMode('login')} />
      )}
      {mode === 'forgot-password' && (
        <ForgotPassword onBack={() => setMode('login')} />
      )}
    </div>
  );
};

export default AdminAuth;
