
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import UserProfile from '@/components/profile/UserProfile';

const Profile = () => {
  return (
    <>
      <Helmet>
        <title>Profile | Personal AI Dashboard</title>
        <meta
          name="description"
          content="Manage your personal profile, social media links, and activity status in your AI-powered dashboard."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-white dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-800">
        <Navigation />

        <main className="pt-20 pb-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                User Profile
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Manage your personal information, activity status, and social media presence.
              </p>
            </div>

            <UserProfile />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Profile;
