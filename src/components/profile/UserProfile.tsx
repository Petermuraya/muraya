
import React from 'react';
import ProfileStats from './ProfileStats';
import SocialLinksManager from './SocialLinksManager';
import ProfileTimeline from './ProfileTimeline';

const UserProfile = () => {
  return (
    <div className="space-y-8">
      {/* Profile Stats */}
      <ProfileStats />
      
      {/* Activity Timeline */}
      <ProfileTimeline />
      
      {/* Social Links Manager */}
      <SocialLinksManager />
    </div>
  );
};

export default UserProfile;
