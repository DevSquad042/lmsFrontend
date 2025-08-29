
import { MdOutlineEmail } from 'react-icons/md';
import type { Mentor } from '../../../src/Types/Mentor';
import styles from '../cards/CardsStyle/MentorCard.module.css'; // Fixed: was MentorsSection.module.css


interface Props {
  mentor: Mentor;
  showRating?: boolean; // If true, show rating. If false, show button.
}

const MentorCard: React.FC<Props> = ({ mentor, showRating = true }) => {
  return (
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

        {/* Conditional rendering: Show either Rating or Button */}
        {showRating ? (
          <div className={styles.stats}>
            <span
              className={styles.rating}
              aria-label={`Rating: ${mentor.rating} stars`}
            >
              ⭐ {mentor.rating}
            </span>
            <span className={styles.separator}>•</span>
            <span className={styles.students}>
              {mentor.students?.toLocaleString()} Students
            </span>
          </div>
        ) : (
          <button className={styles.buttonSendMessage}>
            <span>Send Message</span>
            <MdOutlineEmail size={20} />
          </button>
        )}
      </div>
    </article>
  );
};

export default MentorCard;
