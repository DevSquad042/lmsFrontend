import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/index";
import type { Course, Review } from "../Types/Course";
import { FaStar } from "react-icons/fa";
import { addReview, fetchReviews, fetchAverage } from "../store/slices/reviewsSlice";
import styles from "./ComponentStyles/Rating.module.css";

const Reviews: React.FC<{
  course: Course;
  onReviewAdded: (courseId: string) => void;
}> = ({ course, onReviewAdded }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const userId =
    useSelector((state: RootState) => state.auth.user?.id) ||
    localStorage.getItem("userId");

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

  const reviews: Review[] = reviewsArray.map((review: any) => ({
    id: review._id || review.id,
    userId: review.userId?.userName || review.userId?.email || review.userId || 'Anonymous',
    rating: review.rating,
    comment: review.comment,
    date: review.createdAt || new Date().toISOString(),
    avatar: "/default-avatar.png"
  }));

  useEffect(() => {
    // Fetch reviews for this course
    dispatch(fetchReviews({ targetId: course._id, type: 'Course' }));
    dispatch(fetchAverage({ targetId: course._id, type: 'Course' }));
  }, [dispatch, course._id]);

  // ✅ Use average rating from Redux state, fallback to calculation
  const displayAverageRating = averageRating || (reviews.length > 0
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 0);

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
          targetId: course._id,
          type: "Course",
          rating,
          comment,
        })
      ).unwrap();

      setRating(0);
      setComment("");
      onReviewAdded(course._id);
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
          {displayAverageRating ? `${displayAverageRating.toFixed(1)} / 5` : "No rating yet"}
        </h3>
        <div className={styles.stars}>
          {[1, 2, 3, 4, 5].map((s) => (
            <FaStar
              key={s}
              color={s <= Math.round(displayAverageRating) ? "#FFC107" : "#ccc"}
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
