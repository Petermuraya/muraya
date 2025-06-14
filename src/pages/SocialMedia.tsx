
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SocialDashboard from '@/components/social/SocialDashboard';

const SocialMedia = () => {
  return (
    <>
      <Helmet>
        <title>Social Media Management | Personal AI Dashboard</title>
        <meta
          name="description"
          content="Manage your social media presence with AI-powered analytics, content suggestions, and post scheduling."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-white dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-800">
        <Navigation />

        <main className="pt-20 pb-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Social Media Management
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Monitor your social presence, get AI-powered content suggestions, and schedule posts across platforms.
              </p>
            </div>

            <SocialDashboard />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SocialMedia;
