// ==========================================
// USER PROFILE COMPONENT
// ==========================================
// Static profile display component for top-right positioning
// Handles: User avatar display, social links with external navigation

import React from 'react';
import './Ronald.css';

// ==========================================
// TYPE DEFINITIONS
// ==========================================

interface UserProfileProps {
  user?: {
    name?: string;
    avatar?: string;
    website?: string;
    twitter?: string;
    youtube?: string;
  };
  className?: string;
}

// ==========================================
// USER PROFILE COMPONENT
// ==========================================

const RonaldProfile: React.FC<UserProfileProps> = ({ 
  user = {
    name: "John Doe",
    avatar: "/api/placeholder/150/150",
    website: "https://johndoe.com",
    twitter: "https://twitter.com/johndoe",
    youtube: "https://youtube.com/@johndoe"
  },
  className = ""
}) => {

  // Handle social link clicks
  const handleLinkClick = (url?: string, platform?: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      console.log(`${platform} link clicked but no URL provided`);
    }
  };

  return (
    <div className={`user-profile ${className}`}>
      {/* Profile Avatar Section */}
      <div className="profile-avatar-container">
        <div className="avatar-wrapper">
          <img
            src={user.avatar}
            alt={user.name || "User profile"}
            className="profile-avatar"
          />
          <div className="gradient-overlay"></div>
        </div>
      </div>

      {/* Social Links Section */}
      <div className="social-links-container">
        <button
          className="social-link-btn"
          onClick={() => handleLinkClick(user.website, 'Website')}
          aria-label="Visit website"
        >
          Website
        </button>
        
        <button
          className="social-link-btn"
          onClick={() => handleLinkClick(user.twitter, 'Twitter')}
          aria-label="Visit Twitter profile"
        >
          Twitter
        </button>
        
        <button
          className="social-link-btn"
          onClick={() => handleLinkClick(user.youtube, 'YouTube')}
          aria-label="Visit YouTube channel"
        >
          Youtube
        </button>
      </div>
    </div>
  );
};

export default RonaldProfile;
