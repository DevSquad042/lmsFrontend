import React from 'react';
import { Link } from 'react-router-dom';
import type { Mentor } from '../../Types/Mentor';
import styles from './CardsStyle/MentorCard.module.css';

interface MentorCardProps {
  mentor: Mentor;
}

const MentorCard: React.FC<MentorCardProps> = ({ mentor }) => {
  const displayName = `${mentor.firstName} ${mentor.lastName}`;
  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&size=150&background=ccc&color=fff`;

  return (
    <Link to={`/mentor/${mentor.id}`} className={styles.cardLink}>
      <article className={styles.card}>
        {/* Image */}
        <div className={styles.imageContainer}>
          <img
            src={mentor.image || defaultAvatar}
            alt={`Profile picture of ${displayName}`}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = defaultAvatar;
            }}
          />
        </div>

        {/* Name & Profession */}
        <div className={styles.content}>
          <h4 className={styles.name}>{displayName}</h4>
          <p className={styles.role}>{mentor.bio || 'Frontend Developer'}</p>

          <hr className={styles.divider} />

          {/* Rating & Students */}
          <div className={styles.stats}>
            <span className={styles.rating}>⭐ {mentor.rating?.toFixed(1) || '4.9'}</span>
            <span className={styles.students}>2400 Students</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default MentorCard;
