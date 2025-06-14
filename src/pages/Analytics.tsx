
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';

const Analytics = () => {
  return (
    <>
      <Helmet>
        <title>Analytics Dashboard | Personal AI Dashboard</title>
        <meta
          name="description"
          content="Track your performance metrics, goals, and get AI-powered insights across all areas of your digital life."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-white dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-800">
        <Navigation />

        <main className="pt-20 pb-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Analytics Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Track your performance, monitor goals, and get AI-powered insights to optimize your productivity.
              </p>
            </div>

            <AnalyticsDashboard />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Analytics;
