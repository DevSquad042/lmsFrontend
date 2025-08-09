import type { Course } from '../../Types/Course';
import { FaStar } from 'react-icons/fa';
import styles from './CourseCard.module.css';

interface Props {
  course: Course;
}

/**
 * ISSUES FIXED:
 * 1. Component name was inconsistent (CourseCards vs CourseCard)
 * 2. Missing accessibility features
 * 3. No error handling for missing data
 * EDUCATION: Always use consistent naming and include accessibility features
 */
const CourseCard: React.FC<Props> = ({ course }) => {
  // Handle missing or invalid rating gracefully
  const safeRating = Math.max(0, Math.min(5, course.rating || 0));
  
  return (
    <article className={styles.card} role="article">
      {/* Image container with proper alt text and loading optimization */}
      <div className={styles.imageContainer}>
        <img 
          src={course.image} 
          alt={`Course thumbnail for ${course.title}`}
          loading="lazy"
          onError={(e) => {
            // Fallback image handling
            e.currentTarget.src = '/placeholder-course.jpg';
          }}
        />
      </div>
      
      {/* Content wrapper with semantic structure */}
      <div className={styles.content}>
        <h3 className={styles.title}>{course.title}</h3>
        <p className={styles.author}>By {course.author}</p>
        
        {/* Rating section with accessibility */}
        <div className={styles.rating} role="img" aria-label={`Rating: ${safeRating} out of 5 stars`}>
          <div className={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <FaStar 
                key={i} 
                color={i < safeRating ? '#FFC107' : '#ccc'}
                aria-hidden="true"
              />
            ))}
          </div>
          <span className={styles.reviewCount}>
            ({course.reviews?.toLocaleString() || 0} Reviews)
          </span>
        </div>
        
        {/* Course details */}
        <p className={styles.details}>{course.details}</p>
        
        {/* Price container with currency formatting */}
        <div className={styles.priceContainer}>
          <strong className={styles.price}>
            ${course.price?.toFixed(2) || '0.00'}
          </strong>
        </div>
      </div>
    </article>
  );
};

export default CourseCard;