import React from 'react';
import { FaStar } from 'react-icons/fa';
import styles from './CourseHero.module.css';

interface CourseHeroProps {
  course: {
    title: string;
    description: string;
    rating: number;
    reviews: number;
    totalHours: number;
    lectures: number;
    level: string;
    author: string;
    languages: string[];
  };
}

const CourseHero: React.FC<CourseHeroProps> = ({ course }) => {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <FaStar 
        key={i} 
        className={i < Math.floor(rating) ? styles.starFilled : styles.starEmpty}
      />
    ));
  };

  return (
    <div className={styles.hero}>
      <h1 className={styles.title}>{course.title}</h1>
      <p className={styles.description}>{course.description}</p>
      
      <div className={styles.stats}>
        <div className={styles.rating}>
          <span className={styles.ratingValue}>{course.rating}</span>
          <div className={styles.stars}>{renderStars(course.rating)}</div>
          <span className={styles.reviewLink}>({course.reviews.toLocaleString()} ratings)</span>
        </div>
        <span className={styles.separator}>|</span>
        <span className={styles.statItem}>{course.totalHours} Total Hours</span>
        <span className={styles.separator}>|</span>
        <span className={styles.statItem}>{course.lectures} Lectures</span>
        <span className={styles.separator}>|</span>
        <span className={styles.statItem}>{course.level}</span>
      </div>

      <div className={styles.meta}>
        <span>Created by <span className={styles.authorLink}>{course.author}</span></span>
      </div>

      <div className={styles.languages}>
        <span>🌐 {course.languages.join(', ')}</span>
      </div>
    </div>
  );
};

export default CourseHero;