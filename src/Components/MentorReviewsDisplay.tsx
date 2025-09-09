import React from 'react';
import { FaStar } from 'react-icons/fa';
import styles from './ComponentStyles/MentorReviewsDisplay.module.css';

interface Review {
  _id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

interface MentorReviewsDisplayProps {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}

const MentorReviewsDisplay: React.FC<MentorReviewsDisplayProps> = ({
  reviews,
  loading,
  error
}) => {
  if (loading) {
    return (
      <div className={styles.reviewsSection}>
        <h3>Student Reviews</h3>
        <p>Loading reviews...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.reviewsSection}>
        <h3>Student Reviews</h3>
        <p>Error loading reviews: {error}</p>
      </div>
    );
  }

  return (
    <div className={styles.reviewsSection}>
      <h3>Student Reviews</h3>

      {reviews && reviews.length > 0 ? (
        <div className={styles.reviewsList}>
          {reviews.map((review) => (
            <div key={review._id} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <div className={styles.reviewerInfo}>
                  <strong>{review.userId}</strong>
                  <div className={styles.rating}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`${styles.star} ${
                          star <= review.rating ? styles.active : ''
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <small className={styles.date}>
                    {review.createdAt
                      ? new Date(review.createdAt).toLocaleDateString()
                      : 'Just now'
                    }
                  </small>
                </div>
              </div>
              <p className={styles.comment}>{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.noReviews}>No reviews yet. Be the first to leave a review!</p>
      )}
    </div>
  );
};

export default MentorReviewsDisplay;