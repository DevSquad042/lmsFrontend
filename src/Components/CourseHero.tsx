import React from 'react';
import type { Course } from '../Types/Course'; // Adjust the import path as needed
import { FaStar, FaUser, FaClock, FaBook } from 'react-icons/fa';
import styles from './ComponentStyles/CourseHero.module.css';

interface CourseDetailsProps {
  course: Course;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ course }) => {
  const safeRating = Math.max(0, Math.min(5, course.rating || 0));

  return (
    <div className={styles.detailsContainer}>
      <h1 className={styles.title}>{course.title}</h1>
      <p className={styles.description}>{course.description}</p>
      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <FaUser className={styles.metaIcon} />
          <span className={styles.metaText}>{course.instructor}</span>
        </div>
        <div className={styles.metaItem}>
          <FaStar className={styles.metaIcon} />
          <span className={styles.metaText}>{safeRating.toFixed(1)} Rating</span>
        </div>
        <div className={styles.metaItem}>
          <FaClock className={styles.metaIcon} />
          <span className={styles.metaText}>{course.sections.length} sections</span>
        </div>
        <div className={styles.metaItem}>
          <FaBook className={styles.metaIcon} />
          <span className={styles.metaText}>All videos</span>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;