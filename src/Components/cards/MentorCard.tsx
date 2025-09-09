import React from "react";
import { FaEnvelope, FaStar, FaUserGraduate } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { Mentor } from "../../Types/Mentor";
import styles from "./CardsStyle/MentorCard.module.css";

interface MentorCardProps {
  mentor: Mentor;
  showMessage?: boolean;
}

const MentorCard: React.FC<MentorCardProps> = ({ mentor, showMessage = false }) => {
  const mentorName = `${mentor.firstName || ""} ${mentor.lastName || ""}`.trim();
  const roleDisplay = mentor.role ? `${mentor.role.charAt(0).toUpperCase() + mentor.role.slice(1)}` : "Teacher";

  // Get profile picture - try multiple sources
  const mentorAvatar = 
    mentor.profilePicture || 
    mentor.profile?.profilePicture || 
    mentor.image || 
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      mentorName || "Mentor"
    )}&size=150&background=ccc&color=fff`;

  // Get profession/headline - try multiple sources
  const profession = 
    mentor.profile?.headline || 
    mentor.profession || 
    "Instructor";

  const mentorId = mentor._id || mentor.id;

  return (
    <Link to={`/mentors/${mentorId}`} className={styles.cardLink}>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img src={mentorAvatar} alt={mentorName || "Mentor"} />
          {(mentor.avgRating ?? 0) > 0 && (
            <div className={styles.ratingBadge}>
              <FaStar className={styles.starIcon} />
              <span>{(mentor.avgRating ?? 0).toFixed(1)}</span>
            </div>
          )}
        </div>

        <div className={styles.content}>
          <h3 className={styles.name}>{mentorName}</h3>
          <p className={styles.role}>{profession}</p>
          <p className={styles.userRole}>{roleDisplay}</p>

          <hr className={styles.divider} />

          <div className={styles.stats}>
            <span className={styles.rating}>
              <FaStar className={styles.starIcon} /> {mentor.avgRating?.toFixed(1) || "0.0"}
            </span>
            <span className={styles.students}>
              <FaUserGraduate className={styles.studentIcon} />
              {mentor.studentsCount || 0} Students
            </span>
          </div>

          {showMessage && (
            <div className={styles.messageLink} onClick={(e) => e.stopPropagation()}>
              <Link to={`/profile5/${mentorId}`}>
                <FaEnvelope className={styles.messageIcon} /> Message Mentor
              </Link>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MentorCard;