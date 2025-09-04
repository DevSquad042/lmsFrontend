import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaStar } from 'react-icons/fa';
import type { AppDispatch, RootState } from '../store/index';
import { fetchReviews, fetchAverage, addReview } from '../store/slices/reviewsSlice';
import type { Mentor } from '../Types/Mentor';
import styles from '../Styles/MentorReviews.module.css';

interface Props {
  mentor: Mentor;
  onReviewAdded: () => void;
}

const MentorReviews: React.FC<Props> = ({ mentor, onReviewAdded }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: reviewsData, average: averageRating, loading } = useSelector((state: any) => state.reviews);

  // Transform API data to component format - handle both response structures
  let reviewsArray = [];
  if (Array.isArray(reviewsData)) {
    // Direct array response (for course/instructor reviews)
    reviewsArray = reviewsData;
  } else if (reviewsData && typeof reviewsData === 'object') {
    // Handle different response structures
    if (reviewsData.data && reviewsData.data.reviews && Array.isArray(reviewsData.data.reviews)) {
      // User reviews structure: { data: { reviews: [...] } }
      reviewsArray = reviewsData.data.reviews;
    } else if (reviewsData.data && Array.isArray(reviewsData.data)) {
      // Alternative structure
      reviewsArray = reviewsData.data;
    } else if (reviewsData.reviews && Array.isArray(reviewsData.reviews)) {
      reviewsArray = reviewsData.reviews;
    } else if (reviewsData.items && Array.isArray(reviewsData.items)) {
      reviewsArray = reviewsData.items;
    }
  }

  const reviews = reviewsArray;
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Fetch reviews for this mentor
    dispatch(fetchReviews({ targetId: mentor.id, type: 'instructor' }));
    dispatch(fetchAverage({ targetId: mentor.id, type: 'instructor' }));
  }, [dispatch, mentor.id]);

  const handleRatingSubmit = async () => {
    if (rating === 0 || submitting) return;

    setSubmitting(true);
    try {
      await dispatch(addReview({
        userId: 'current-user-id', // This should come from auth state
        targetId: mentor.id,
        type: 'instructor',
        rating,
        comment: newReview
      }));

      onReviewAdded();
      setNewReview('');
      setRating(0);
    } catch (error) {
      console.error('Failed to submit review:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const displayAverageRating = () => {
    return averageRating ? averageRating.toFixed(1) : '0.0';
  };

  return (
    <div className={styles.reviewsContainer}>
      <h2>Mentor Reviews</h2>
      <div className={styles.averageRating}>
        <span className={styles.ratingText}>Average Rating:</span>
        <span className={styles.ratingValue}>{displayAverageRating()} <FaStar/></span>
      </div>
      
      {/* Review Submission Form (simplified) */}
      <div className={styles.reviewForm}>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          placeholder="Your rating (1-5)"
        />
        <button onClick={handleRatingSubmit} disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </div>

      {/* Existing Reviews */}
      {loading ? (
        <div className={styles.loading}>Loading reviews...</div>
      ) : (
        reviews.map((review: any) => (
          <div key={review._id || review.id} className={styles.reviewCard}>
            <p className={styles.reviewComment}>{review.comment}</p>
            <div className={styles.reviewFooter}>
              <span className={styles.reviewAuthor}>
                {review.userId?.userName || review.userId?.email || review.userId || 'Anonymous'}
              </span>
              <span className={styles.reviewRating}>
                {review.rating} ⭐
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MentorReviews;