import React from "react";
import type { Course } from "../../Types/Course";
import { FaStar } from "react-icons/fa";
import styles from "./CardsStyle/CourseCard.module.css";

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <div className={styles.detailsContainer}>
      <img
        src={course.thumbnail}
        alt={`Thumbnail for ${course.title}`}
        className={styles.thumbnail}
      />
      <h1 className={styles.title}>{course.title}</h1>
      <p className={styles.description}>{course.description}</p>
      <p className={styles.instructor}>By {course.instructor}</p>
      <div className={styles.rating}>
        <div className={styles.stars}>
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              color={i < Math.round(course.rating || 0) ? "#FFC107" : "#ccc"}
            />
          ))}
        </div>
        <span className={styles.reviewCount}>({course.reviews?.length || 0} Reviews)</span>
      </div>
    </div>
  );
};

export default CourseCard;