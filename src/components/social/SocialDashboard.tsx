
import React from 'react';
import SocialAnalytics from './SocialAnalytics';
import ContentSuggestions from './ContentSuggestions';
import PostScheduler from './PostScheduler';

const SocialDashboard = () => {
  return (
    <div className="space-y-6">
      <SocialAnalytics />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ContentSuggestions />
        <PostScheduler />
      </div>
    </div>
  );
};

export default SocialDashboard;
