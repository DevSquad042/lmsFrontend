// ==========================================
// REVIEW CARD COMPONENT
// ==========================================
// Individual review display component
// Handles: User review display, rating, date formatting

import React from 'react';
import './ReviewCard.css';

// ==========================================
// TYPE DEFINITIONS
// ==========================================

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  reviewText: string;
}

interface ReviewCardProps {
  review: Review;
  className?: string;
}

// ==========================================
// REVIEW CARD COMPONENT
// ==========================================

const ReviewCard: React.FC<ReviewCardProps> = ({ review, className = "" }) => {
  
  // Format date to readable format
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    
    // Add ordinal suffix to day
    const day = date.getDate();
    const ordinalSuffix = getOrdinalSuffix(day);
    
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate.replace(day.toString(), `${day}${ordinalSuffix}`);
  };

  // Get ordinal suffix for date (1st, 2nd, 3rd, etc.)
  const getOrdinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  // Render star rating
  const renderStars = (rating: number): React.ReactElement[] => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`star ${index < rating ? 'star-filled' : 'star-empty'}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className={`review-card ${className}`}>
      {/* User Profile Section */}
      <div className="review-header">
        <div className="user-info">
          <div className="user-avatar-container">
            <img
              src={review.userAvatar}
              alt={`${review.userName}'s profile`}
              className="user-avatar"
              loading="lazy"
            />
          </div>
          <div className="user-details">
            <h3 className="user-name">{review.userName}</h3>
          </div>
        </div>
        
        {/* Rating and Date Section */}
        <div className="review-meta">
          <div className="rating-container">
            <div className="stars-wrapper">
              {renderStars(review.rating)}
            </div>
            <span className="rating-number">{review.rating}</span>
          </div>
          <div className="review-date">
            Reviewed on {formatDate(review.date)}
          </div>
        </div>
      </div>

      {/* Review Text Section */}
      <div className="review-content">
        <p className="review-text">{review.reviewText}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
