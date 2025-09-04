import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { addReview } from "../store/slices/reviewsSlice";
import { StarIcon } from "./StarIcon";

const ReviewSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: reviews = [] } = useSelector((state: RootState) => state.reviews);

  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const handleSubmit = () => {
    if (!rating) return alert("Please select a rating");
    dispatch(
      addReview({
        userId: Date.now().toString(),
        targetId: "course-123",
        type: "Course",
        rating,
        comment
      })
    );
    setRating(0);
    setComment("");
  };

  const average =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2>Course Reviews</h2>

      {/* Average Rating */}
      <div>
        <strong>Average Rating: {average.toFixed(1)} / 5</strong>
        <div>
          {[1, 2, 3, 4, 5].map((s) => (
            <StarIcon key={s} filled={s <= average} size={20} />
          ))}
        </div>
      </div>

      {/* Add Review */}
      <h3>Leave a Review</h3>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {[1, 2, 3, 4, 5].map((s) => (
          <StarIcon
            key={s}
            filled={s <= rating}
            onClick={() => setRating(s)}
            size={28}
            ariaLabel={`Rate ${s}`}
          />
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment..."
        style={{ width: "100%", marginTop: "10px" }}
      />
      <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
        Submit
      </button>

      {/* Reviews List */}
      <h3>All Reviews</h3>
      <ul>
        {reviews.map((r) => (
          <li key={r.userId} style={{ marginBottom: "10px" }}>
            <strong>{r.userName}</strong> - {r.rating}⭐
            <p>{r.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewSection;
