import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { fetchMentors, patchMentorRating } from "../../store/slices/mentorSlice";
import { FaStar } from "react-icons/fa";
import styles from "./CardsStyle/MentorCard.module.css";

const MentorCard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const mentorsState = useSelector((state: RootState) => state.mentors);
  if (!mentorsState) return null; // or a loading spinner
  const { data: mentors, loading, error } = mentorsState;

  useEffect(() => {
    dispatch(fetchMentors());
  }, [dispatch]);

  const handleRating = (id: string, rating: number) => {
    dispatch(patchMentorRating({ id, rating }));
  };

  if (loading) return <p>Loading mentors...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mentor-grid">
      {mentors.map((mentor) => {
        const safeRating = Math.max(0, Math.min(5, mentor.rating || 0));

        return (
          <article key={mentor.id} className={styles.card} role="article">
            <div className={styles.imageContainer}>
              <img
                src={mentor.image}
                alt={`Profile picture of ${mentor.name}`}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-avatar.jpg";
                }}
              />
            </div>

            <div className={styles.content}>
              <h3 className={styles.name}>{mentor.name}</h3>
              <p className={styles.role}>{mentor.role}</p>

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
                      onClick={() => handleRating(mentor.id, i + 1)}
                    />
                  ))}
                </div>
                <span className={styles.students}>
                  {mentor.students.toLocaleString()} Students
                </span>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default MentorCard;
