import React from 'react';
import './ReviewCard.css';
import type { Review } from '../../store/slices/reviewsSlice';

interface ReviewCardProps {
  review: Review;
  className?: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, className = "" }) => {
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
    <div className={`review-card2 ${className}`}>
      {/* Rating Section */}
      <div className="rating-container">
        <div className="stars-wrapper">
          {renderStars(review.rating)}
        </div>
        <span className="rating-number">{review.rating}</span>
      </div>

      {/* Comment Section */}
      <div className="review-content">
        <p className="review-text">{review.comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
