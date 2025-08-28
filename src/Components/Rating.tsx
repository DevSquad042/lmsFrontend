import React, { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import type { Course } from "../Types/Course";
import type {Review} from "../Types/rating"
import { FaStar } from "react-icons/fa";
import { addReview } from "../store/slices/reviewsSlice";
import styles from "./ComponentStyles/Rating.module.css";

// This component now accepts a course and onReviewAdded callback as props
const Reviews: React.FC<{
  course: Course;
  onReviewAdded: (courseId: string) => void;
}> = ({ course, onReviewAdded }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const reviews = course.reviews || [];
  const averageRating = course.rating || 0;

  const handleSubmit = async () => {
    if (!rating) return;
    setSubmitting(true);
    try {
      // Hardcoded userId for example. You would get this from your auth state.
      const userId = "john_doe";
      await dispatch(
        addReview({ courseId: course.id, userId, rating, comment })
      ).unwrap();
      setRating(0);
      setComment("");
      onReviewAdded(course.id);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.reviewsSection}>
      <h2>Student Reviews</h2>
      {/* Average */}
      <div className={styles.averageBox}>
        <h3>{averageRating ? `${averageRating.toFixed(1)} / 5` : "No rating yet"}</h3>
        <div className={styles.stars}>
          {[1, 2, 3, 4, 5].map((s) => (
            <FaStar
              key={s}
              color={s <= Math.round(averageRating) ? "#FFC107" : "#ccc"}
            />
          ))}
        </div>
        <p>{reviews.length} reviews</p>
      </div>

      {/* Review Form */}
      <div className={styles.reviewForm}>
        <h4>Leave a Review</h4>
        <div className={styles.stars}>
          {[1, 2, 3, 4, 5].map((s) => (
            <FaStar
              key={s}
              color={s <= rating ? "#FFC107" : "#ccc"}
              style={{ cursor: "pointer" }}
              onClick={() => !submitting && setRating(s)}
            />
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts..."
          disabled={submitting}
        />
        <button onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </div>

      {/* Reviews List */}
      <div className={styles.reviewsList}>
        {reviews.length === 0 ? (
          <p>Be the first to leave a review!</p>
        ) : (
          reviews.map((r) => (
            <div key={r.id} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <img
                  src={r.avatar || "/default-avatar.png"}
                  alt={`Avatar for ${r.userId}`}
                  className={styles.avatar}
                />
                <div className={styles.reviewerInfo}>
                  <strong>{r.userId}</strong>
                  <div className={styles.stars}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <FaStar key={s} color={s <= r.rating ? "#FFC107" : "#ccc"} />
                    ))}
                  </div>
                  <small>{r.date || "Just now"}</small>
                </div>
              </div>
              <p>{r.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reviews;