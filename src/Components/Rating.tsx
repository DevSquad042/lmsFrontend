import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/index";
import type { Course } from "../Types/Course";
import { FaStar } from "react-icons/fa";
import { addReview } from "../store/slices/reviewsSlice";
import styles from "./ComponentStyles/Rating.module.css";

const Reviews: React.FC<{
  course: Course;
  onReviewAdded: (courseId: string) => void;
}> = ({ course, onReviewAdded }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // ✅ get logged-in userId from Redux (or localStorage fallback)
  const userId =
    useSelector((state: RootState) => state.auth.user?.id) ||
    localStorage.getItem("userId");

  const reviews = course.reviews || [];
  const averageRating = course.rating || 0;

  const handleSubmit = async () => {
    if (!rating || !userId) {
      alert("You must be logged in and select a rating to submit.");
      return;
    }

    setSubmitting(true);
    try {
      await dispatch(
        addReview({
          userId,
          targetId: course._id || course.id,
          type: "Course", // ✅ must be lowercase
          rating,
          comment,
        })
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
        <h3>
          {averageRating ? `${averageRating.toFixed(1)} / 5` : "No rating yet"}
        </h3>
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
                      <FaStar
                        key={s}
                        color={s <= r.rating ? "#FFC107" : "#ccc"}
                      />
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
