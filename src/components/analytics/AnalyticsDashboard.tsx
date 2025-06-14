
import React from 'react';
import MetricsOverview from './MetricsOverview';
import PerformanceCharts from './PerformanceCharts';
import GoalTracker from './GoalTracker';
import AIInsights from './AIInsights';

const AnalyticsDashboard = () => {
  return (
    <div className="space-y-6">
      <MetricsOverview />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PerformanceCharts />
        </div>
        <div>
          <AIInsights />
        </div>
      </div>
      
      <GoalTracker />
    </div>
  );
};

export default AnalyticsDashboard;
