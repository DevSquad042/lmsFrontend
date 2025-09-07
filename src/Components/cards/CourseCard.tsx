// src/Components/cards/CourseCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import type { Course } from "../../Types/Course";
import styles from "./CardsStyle/CourseCard.module.css";

interface CourseCardProps {
  course: Course;
  isEnrolled?: boolean; // Add this prop to distinguish enrolled courses
}

const CourseCard: React.FC<CourseCardProps> = ({ course, isEnrolled = false }) => {
  const safeRating = Math.max(0, Math.min(5, course.rating || 0));
  const defaultThumbnail = "https://images.unsplash.com/photo-1610500796385-3ffc1ae2f046?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3R1ZGVudCUyMGxlYXJuaW5nfGVufDB8fDB8fHww";

  // For enrolled courses, link to order complete page
  // For non-enrolled courses, link to course details page
  const linkTo = isEnrolled 
    ? `/order-complete/${course._id}` // This matches the new route
    : `/courses/${course._id}`;

  return (
    <Link to={linkTo} className={styles.cardLink}>
      <article className={styles.card} role="article">
        <img
          src={course.thumbnail || defaultThumbnail}
          alt={course.title}
          className={styles.thumbnail}
          loading="lazy"
          onError={(e) => {
            console.error(`Failed to load thumbnail for ${course.title}: ${course.thumbnail}`);
            e.currentTarget.src = defaultThumbnail;
          }}
        />
        {isEnrolled && (
          <div className={styles.enrolledBadge}>Enrolled</div>
        )}
        <div className={styles.content}>
          <h3 className={styles.title}>{course.title}</h3>
          <p className={styles.instructor}>{course.instructor}</p>
          <div className={styles.rating}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  color={i < Math.round(safeRating) ? "#ffc107" : "#ccc"}
                />
              ))}
            </div>
            <span className={styles.ratingText}>{safeRating.toFixed(1)}</span>
          </div>
          <p className={styles.price}>
            {isEnrolled ? "Watch Now" : `NGN${course.price}`}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default CourseCard;