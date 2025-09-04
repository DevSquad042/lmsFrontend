import React from "react";
import { FaStar } from "react-icons/fa";
import type { Mentor } from "../Types/Mentor";
import styles from "./ComponentStyles/MentorDetails.module.css";

interface Props {
  mentor: Mentor;
}

const MentorDetails: React.FC<Props> = ({ mentor }) => {
  const safeRating = Math.max(0, Math.min(5, mentor.rating || 0));

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.imageWrapper}>
        <img
          src={mentor.image}
          alt={`Profile of ${mentor.name}`}
          className={styles.profileImage}
        />
      </div>
      <div className={styles.infoWrapper}>
        <h1 className={styles.name}>{mentor.name}</h1>
        <p className={styles.role}>{mentor.profession}</p>
        <div className={styles.rating}>
          <FaStar className={styles.starIcon} />
          <span className={styles.ratingValue}>{safeRating.toFixed(1)}</span>
        </div>
        <div className={styles.reviewCount}>
          <span className={styles.reviewText}>
            {mentor.studentsCount} reviews
          </span>
        </div>
        <p className={styles.bio}>{mentor.bio}</p>
        <div className={styles.portfolio}>
          <p>
            Portfolio:{" "}
            <a
              href={mentor.portfolio}
              target="_blank"
              rel="noopener noreferrer"
            >
              {mentor.portfolio}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MentorDetails;
