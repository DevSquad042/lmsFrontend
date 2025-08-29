// src/Components/cards/MentorCard.tsx

import React from 'react';
import { MdOutlineEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import type { Mentor } from '../../Types/Mentor'; // Adjust import path
import styles from './CardsStyle/MentorCard.module.css';

interface Props {
  mentor: Mentor;
}

const MentorCard: React.FC<Props> = ({ mentor }) => {
  return (
    <Link to={`/mentor/${mentor.id}`} className={styles.cardLink}>
      <article className={styles.card} role="article">
        {/* Profile Image */}
        <div className={styles.imageContainer}>
          <img
            src={mentor.image}
            alt={`Profile picture of ${mentor.name}`}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-avatar.jpg';
            }}
          />
        </div>

        {/* Content */}
        <div className={styles.content}>
          <h4 className={styles.name}>{mentor.name}</h4>
          <p className={styles.role}>{mentor.role}</p>

          <hr />

          {/* Conditional rendering */}
          <div className={styles.stats}>
            <span className={styles.rating} aria-label={`Rating: ${mentor.rating} stars`}>
              ⭐ {mentor.rating}
            </span>
            <span className={styles.separator}>|</span>
            <span className={styles.totalReviews}>
              {mentor.reviews.length} reviews
            </span>
          </div>

          <div className={styles.contact}>
            <span className={styles.contactItem}>
              <MdOutlineEmail className={styles.icon} />
              {/* This could be a link to a contact page or modal */}
              <span className={styles.contactText}>Contact</span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default MentorCard;