import React, { useState } from "react";
//import { useDispatch } from "react-redux";
import { FaStar } from "react-icons/fa";
//import type { AppDispatch } from "../store/index";
//import { patchMentorRating } from '../store/slices/mentorSlice';
import type { Mentor } from "../Types/Mentor";
import styles from "../Styles/MentorReviews.module.css";

interface Props {
  mentor: Mentor;
  onReviewAdded: () => void;
}

const MentorReviews: React.FC<Props> = ({ mentor, onReviewAdded }) => {
  //  const dispatch = useDispatch<AppDispatch>();
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleRatingSubmit = async () => {
    if (rating === 0) return;

    //  await dispatch(patchMentorRating({ mentorId: mentor.id, rating }));
    console.log(newReview);
    onReviewAdded();
    setNewReview("");
    setRating(0);
  };

  const calculateAverageRating = () => {
    if (mentor.reviews?.length === 0 || !mentor.reviews) return 0;
    const total = mentor.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return (total / mentor.reviews.length).toFixed(1);
  };

  return (
    <div className={styles.reviewsContainer}>
      <h2>Mentor Reviews</h2>
      <div className={styles.averageRating}>
        <span className={styles.ratingText}>Average Rating:</span>
        <span className={styles.ratingValue}>
          {calculateAverageRating()} <FaStar />
        </span>
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
        <button onClick={handleRatingSubmit}>Submit Review</button>
      </div>

      {/* Existing Reviews */}
      {mentor.reviews?.map((review) => (
        <div key={review.id} className={styles.reviewCard}>
          <p className={styles.reviewComment}>{review.text}</p>
          <div className={styles.reviewFooter}>
            <span className={styles.reviewAuthor}>User {review.id}</span>
            <span className={styles.reviewRating}>{review.rating} ⭐</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MentorReviews;
