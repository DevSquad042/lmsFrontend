import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import type { AppDispatch, RootState } from "../store/index";
import type { Course, Review } from "../Types/Course";
import { FaStar } from "react-icons/fa";
import { addReview } from "../store/slices/reviewsSlice";
import styles from "./ComponentStyles/Rating.module.css";

const Reviews: React.FC<{
  course: Course;
  onReviewAdded: (courseId: string) => void;
  reviews?: Review[];
  showAverage?: boolean;
  showList?: boolean;
}> = ({ course, onReviewAdded, reviews: propReviews, showAverage = true, showList = true }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const userId =
    useSelector((state: RootState) => state.auth.user?.id) ||
    localStorage.getItem("userId");

  const reviews: Review[] = propReviews || course.reviews || [];

  // ✅ Calculate average rating from reviews
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

  const handleSubmit = async () => {
    if (!userId) {
      toast.error("You must be logged in to submit a review.");
      return;
    }

    if (!rating) {
      toast.error("Please add a rating!");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please add a comment!");
      return;
    }

    setSubmitting(true);
    try {
      const result = await dispatch(
        addReview({
          userId,
          targetId: course._id,
          type: "Course",
          rating,
          comment,
        })
      ).unwrap();

      // Show success message from API if available, otherwise use default
      const successMessage = result.message || "Review submitted successfully!";
      toast.success(successMessage);

      setRating(0);
      setComment("");
      onReviewAdded(course._id);
    } catch (error: any) {
      // Handle specific API error messages
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Failed to submit review. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.reviewsSection}>
      {showAverage && <h2>Student Reviews</h2>}

      {/* Average */}
      {showAverage && (
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
      )}

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
      {showList && (
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
      )}
    </div>
  );
};

export default Reviews;
