import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { fetchMentors, patchMentorRating } from "../../store/slices/mentorSlice";
import { FaStar } from "react-icons/fa";
import styles from "./CardsStyle/MentorCard.module.css";

const MentorCard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // ✅ Defensive destructuring
  const { data: mentors = [], loading, error } = useSelector(
    (state: RootState) => state.mentors || {}
  );

  useEffect(() => {
    if (!mentors.length) dispatch(fetchMentors());
  }, [dispatch, mentors.length]);

  const handleRating = (id: string, rating: number) => {
    dispatch(patchMentorRating({ id, rating }));
  };

  if (loading) return <p>Loading mentors...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mentor-grid">
      {mentors.map(
        ({
          id,
          name,
          role,
          image,
          rating = 0,
          students = 0,
        }) => {
          const safeRating = Math.max(0, Math.min(5, rating));

          return (
            <article key={id} className={styles.card} role="article">
              <div className={styles.imageContainer}>
                <img
                  src={image || "/placeholder-avatar.jpg"}
                  alt={`Profile picture of ${name}`}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-avatar.jpg";
                  }}
                />
              </div>

              <div className={styles.content}>
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.role}>{role}</p>

                <div
                  className={styles.rating}
                  role="img"
                  aria-label={`Rating: ${safeRating} out of 5 stars`}
                >
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        color={i < safeRating ? "#FFC107" : "#ccc"}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleRating(id, i + 1)}
                      />
                    ))}
                  </div>
                  <span className={styles.students}>
                    {students.toLocaleString()} Students
                  </span>
                </div>
              </div>
            </article>
          );
        }
      )}
    </div>
  );
};

export default MentorCard;
