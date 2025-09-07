import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { Mentor } from "../../Types/Mentor";
import styles from "./CardsStyle/MentorCard.module.css";

interface MentorCardProps {
  mentor: Mentor;
  showMessage?: boolean;
}

const MentorCard: React.FC<MentorCardProps> = ({ mentor, showMessage = false }) => {
  const mentorName = `${mentor.firstName || ""} ${mentor.lastName || ""}`.trim();

  // ✅ Prefer actual uploaded profile picture
  const mentorAvatar =
    mentor.profilePicture || // <-- use profilePicture if API provides it
    mentor.image || // fallback if some mentors still use "image"
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      mentorName || "Mentor"
    )}&size=150&background=ccc&color=fff`;

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={mentorAvatar} alt={mentorName || "Mentor"} />
      </div>

      <div className={styles.content}>
        <h3 className={styles.name}>{mentorName}</h3>
        <p className={styles.role}>{mentor.profession || "Instructor"}</p>

        <hr className={styles.divider} />

        <div className={styles.stats}>
          <span className={styles.rating}>⭐ {mentor.rating ?? 0}</span>
          <span className={styles.students}>{mentor.studentsCount ?? 0} Students</span>
        </div>

        {showMessage && (
          <Link to={`/profile5/${mentor.id}`} className={styles.messageLink}>
            <FaEnvelope className={styles.messageIcon} /> Message
          </Link>
        )}
      </div>
    </div>
  );
};

export default MentorCard;
