import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Mentor } from "../../Types/Mentor";
import styles from "./CardsStyle/MentorCard.module.css";

interface MentorCardProps {
  mentor: Mentor;
  showRating?: boolean;
}

const MentorCard: React.FC<MentorCardProps> = ({ mentor, showRating = false }) => {
  const displayName = `${mentor.firstName} ${mentor.lastName}`;
  const [averageRating, setAverageRating] = useState<string>("4.9");
  const [totalRatings, setTotalRatings] = useState<number>(2400);

  useEffect(() => {
    console.log("averageRating updated to:", averageRating);
  }, [averageRating]);

  useEffect(() => {
    console.log("totalRatings updated to:", totalRatings);
  }, [totalRatings]);
  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName
  )}&size=150&background=ccc&color=fff`;

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const url = `http://localhost:3000/api/review/average/${mentor.id}?type=instructor`;
        const response = await fetch(url);
        const data = await response.json();
        const newAverage = data.average ? data.average.toFixed(1):"";
        const newTotal = data.total || 0;
        setAverageRating(newAverage);
        setTotalRatings(newTotal);
      } catch (error) {
        console.error("Error fetching rating:", error);
      }
    };
    if (mentor.id) fetchRating();
  }, [mentor.id]);

  // Calculate average rating from API
  const calculateAverageRating = () => averageRating;

  const getTotalRatings = () => totalRatings;

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = defaultAvatar;
  };

  return (
    <Link to={`/mentor/${mentor.id}`} className={styles.cardLink}>
      <article className={styles.card}>
        {/* Image */}
        <div className={styles.imageContainer}>
          <img
            src={mentor.image || defaultAvatar}
            alt={`Profile picture of ${displayName}`}
            loading="lazy"
            onError={handleImageError}
          />
        </div>

        {/* Name & Profession */}
        <div className={styles.content}>
          <h4 className={styles.name}>{displayName}</h4>
          <p className={styles.role}>
            {mentor.profession ?? mentor.bio ?? "UI/UX Designer"}
          </p>

          <hr className={styles.divider} />

          {showRating ? (
            <div className={styles.rating}>
              ⭐ {calculateAverageRating()} ({getTotalRatings()} Ratings)
            </div>
          ) : (
            <button className={styles.messageButton}>
              Send Message
              <span className={styles.icon}>✉️</span>
            </button>
          )}
        </div>
      </article>
    </Link>
  );
};

export default MentorCard;
