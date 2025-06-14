
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import TasksDashboard from '@/components/tasks/TasksDashboard';

const Tasks = () => {
  return (
    <>
      <Helmet>
        <title>Task Manager | Personal AI Dashboard</title>
        <meta
          name="description"
          content="Manage your tasks, track activities, and organize projects with AI-powered productivity insights."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-white dark:from-gray-900 dark:via-green-900/20 dark:to-gray-800">
        <Navigation />

        <main className="pt-20 pb-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Task Manager
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Organize your tasks, track activities, and manage projects with AI-powered insights.
              </p>
            </div>

            <TasksDashboard />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Tasks;
