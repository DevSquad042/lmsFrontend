import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import type { Course } from "../../Types/Course";
import styles from "./CardsStyle/CourseCard.module.css";

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const safeRating = Math.max(0, Math.min(5, course.rating || 0));

  return (
    <Link to={`/courses/${course.id}`} className={styles.cardLink}>
      <article className={styles.card} role="article">
        <img
          src={course.thumbnail}
          alt={course.title}
          className={styles.thumbnail}
        />
        <div className={styles.content}>
          <h3 className={styles.title}>{course.title}</h3>
          <p className={styles.instructor}>{course.instructor}</p>
          <div className={styles.rating}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  color={i < Math.round(safeRating) ? "#FFC107" : "#ccc"}
                />
              ))}
            </div>
            <span className={styles.ratingText}>{safeRating.toFixed(1)}</span>
          </div>
          <p className={styles.price}>${course.price}</p>
        </div>
      </article>
    </Link>
  );
};

export default CourseCard;