
import React, { useState } from 'react';
import AdminLogin from './AdminLogin';
import SignupForm from './SignupForm';

const AdminAuth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4">
      {isLoginMode ? (
        <div className="space-y-4">
          <AdminLogin />
          <div className="text-center">
            <button
              onClick={() => setIsLoginMode(false)}
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              Need admin access? Register here
            </button>
          </div>
        </div>
      ) : (
        <SignupForm onSwitchToLogin={() => setIsLoginMode(true)} />
      )}
    </div>
  );
};

export default AdminAuth;
