import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaStar } from 'react-icons/fa';
import { addMentorReview } from '../../store/slices/mentorSlice';
import { selectMentorsStatus, selectMentorsError } from '../../store/slices/mentorSlice';
import type { RootState, AppDispatch } from '../../store/index';
import { toast } from 'react-toastify';
import styles from './FormStyles/MentorReviewForm.module.css';

interface MentorReviewFormProps {
  mentorId: string;
  onReviewSubmitted?: () => void;
}

const MentorReviewForm: React.FC<MentorReviewFormProps> = ({ mentorId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const loading = useSelector(selectMentorsStatus) === 'pending';
  const error = useSelector(selectMentorsError);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please login to submit a review');
      return;
    }

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    if (!comment.trim()) {
      toast.error('Please write a comment');
      return;
    }

    setIsSubmitting(true);

    try {
      await dispatch(addMentorReview({
        reviewerId: user!.id,
        mentorId,
        rating,
        comment: comment.trim()
      }));
      toast.success('Review submitted successfully!');
      setRating(0);
      setComment('');
      onReviewSubmitted?.();
    } catch (error: any) {
      toast.error(error || 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const handleStarHover = (value: number) => {
    setHoverRating(value);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  if (!user) {
    return (
      <div className={styles.loginPrompt}>
        <p>Please login to leave a review</p>
      </div>
    );
  }

  return (
    <div className={styles.reviewForm}>
      <h3>Write a Review</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.ratingSection}>
          <label>Rating:</label>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`${styles.star} ${
                  star <= (hoverRating || rating) ? styles.active : ''
                }`}
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => handleStarHover(star)}
                onMouseLeave={handleStarLeave}
              />
            ))}
          </div>
        </div>

        <div className={styles.commentSection}>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this mentor..."
            rows={4}
            required
          />
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting || loading}
        >
          {isSubmitting || loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default MentorReviewForm;