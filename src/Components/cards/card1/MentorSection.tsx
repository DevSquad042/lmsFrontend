import type { Mentor } from '../../../Types/Mentor';
import styles from './MentorsSection.module.css';

interface Props {
  mentor: Mentor;
}

const MentorsSection: React.FC<Props> = ({ mentor }) => (
  <div className={styles.card}>
    <img src={mentor.image} alt={mentor.name} />
    <h4>{mentor.name}</h4>
    <p>{mentor.role}</p>
    <span>⭐ {mentor.rating} • {mentor.students} Students</span>
  </div>
);

export default MentorsSection;

