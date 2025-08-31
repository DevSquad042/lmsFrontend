import React from 'react';
import type { Review } from '../../Types/rating';
import styles from './RatingSummary.module.css';

interface Props {
  reviews: Review[];
}

const RatingSummary: React.FC<Props> = ({ reviews }) => {
  if (reviews.length === 0) {
    return <p>No reviews available for this course.</p>;
  }

  return (
    <div className={styles.reviewListContainer}>
      {reviews.map((review) => (
        <div key={review.id} className={styles.reviewItem}>
          <div className={styles.reviewHeader}>
            <span className={styles.user}>User: {review.userId}</span>
            <span className={styles.rating}>Rating: {review.rating} / 5</span>
          </div>
          <p className={styles.comment}>{review.comment}</p>
          <span className={styles.date}>
            {new Date(review.createdAt).toLocaleDateString()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default RatingSummary;
