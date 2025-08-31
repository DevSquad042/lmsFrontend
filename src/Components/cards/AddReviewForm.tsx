// src/Components/Reviews/AddReviewForm.tsx

import React, { useState } from 'react';
import styles from './CardsStyle/AddReviewForm.module.css';

interface Props {
  courseId: string;
  onReviewAdded: () => void;
}

const AddReviewForm: React.FC<Props> = ({ courseId, onReviewAdded }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    // In a real application, you would dispatch an action here to add the review.
    // For now, we'll just log the data.
    console.log('New review submitted:', { courseId, rating, comment });
    // After a successful API call, you would call onReviewAdded to refresh the data.
    onReviewAdded();
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h3 className={styles.formTitle}>Add a Review</h3>
      <div className={styles.inputGroup}>
        <label htmlFor="rating">Rating (1-5)</label>
        <input
          type="number"
          id="rating"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit" className={styles.submitButton}>Submit Review</button>
    </form>
  );
};

export default AddReviewForm;