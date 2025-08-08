import type { Course } from '../../../Types/Course';
import { FaStar } from 'react-icons/fa';
import styles from './CourseCard.module.css';

interface Props {
  course: Course;
}

const CourseCards: React.FC<Props> = ({ course }) => (
  <div className={styles.card}>
    {/* Image container wrapper */}
    <div className={styles.imageContainer}>
      <img src={course.image} alt={course.title} />
    </div>
    
    {/* Content wrapper */}
    <div className={styles.content}>
      <h3>{course.title}</h3>
      <p>By {course.author}</p>
      
      <div className={styles.rating}>
        {/* Stars wrapper */}
        <div className={styles.stars}>
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} color={i < course.rating ? '#FFC107' : '#ccc'} />
          ))}
        </div>
        {/* Review count class */}
        <span className={styles.reviewCount}>({course.reviews} Ratings)</span>
      </div>
      
      {/*  Details class */}
      <p className={styles.details}>{course.details}</p>
      
      {/*  Price container wrapper */}
      <div className={styles.priceContainer}>
        <strong>${course.price}</strong>
      </div>
    </div>
  </div>
);

export default CourseCards;

