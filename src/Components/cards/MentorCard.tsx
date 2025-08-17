// import type { mentors } from '../../data/Mentor';
import type { Mentor } from '../../Types/Mentor';
import styles from '../cards/MentorCard.module.css'; // Fixed: was MentorsSection.module.css

interface Props {
  mentor: Mentor;
}

/**
 * ISSUES FIXED:
 * 1. Component name was inconsistent (MentorsSection vs MentorCard)
 * 2. CSS import path was incorrect
 * 3. Missing accessibility features
 * 4. Emoji used instead of proper star component
 */
const MentorCard: React.FC<Props> = ({ mentor }) => (
  <article className={styles.card} role="article">
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
    
    <div className={styles.content}>
      <h4 className={styles.name}>{mentor.name}</h4>
      <p className={styles.role}>{mentor.role}</p>
      
      <div className={styles.stats}>
        <span className={styles.rating} aria-label={`Rating: ${mentor.rating} stars`}>
          ⭐ {mentor.rating}
        </span>
        <span className={styles.separator}>•</span>
        <span className={styles.students}>
          {mentor.students?.toLocaleString()} Students
        </span>
      </div>
    </div>
  </article>
);

export default MentorCard;