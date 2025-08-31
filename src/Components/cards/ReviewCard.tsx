import React from 'react';
import { FaStar } from "react-icons/fa";
import type { AverageRating } from '../../Types/rating';
import styles from './ReviewCard.module.css';

interface Props {
  averageRating: AverageRating | null;
}

const ReviewCard: React.FC<Props> = ({ averageRating }) => {
  if (!averageRating) {
    return <p>No ratings yet.</p>;
  }

  const safeRating: number = Math.max(0, Math.min(5, averageRating.averageRating || 0));

  return (
    <div className={styles.summaryContainer}>
      <h3 className={styles.ratingTitle}>Average Rating</h3>
      <div className={styles.ratingStars}>
        {[...Array(5)].map((_, i: number) => (
          <FaStar
            key={i}
            color={i < Math.round(safeRating) ? "#FFC107" : "#ccc"}
          />
        ))}
      </div>
      <p className={styles.ratingValue}>
        {safeRating.toFixed(1)} <span className={styles.outOf}>/ 5</span>
      </p>
      <p className={styles.reviewCount}>Based on {averageRating.numberOfRatings} ratings</p>
    </div>
  );
};

export default ReviewCard;