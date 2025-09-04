// src/Components/cards/CourseCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import type { Course } from "../../Types/Course";
import styles from "./CardsStyle/CourseCard.module.css";

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const safeRating = Math.max(0, Math.min(5, course.rating || 0));
  const defaultThumbnail = "https://images.unsplash.com/photo-1610500796385-3ffc1ae2f046?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3R1ZGVudCUyMGxlYXJuaW5nfGVufDB8fDB8fHww"; // PNG fallback

  // Log thumbnail details for debugging
  console.log(`Course: ${course.title}, Thumbnail: ${course.thumbnail || 'undefined'}`);

  return (
    <Link to={`/courses/${course._id}`} className={styles.cardLink}>
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
        <div className={styles.content}>
          <h3 className={styles.title}>{course.title}</h3>
          <p className={styles.instructor}>By {course.instructor}</p>

          {/* Progress Bar */}
          <div className={styles.progressBar}>
            <div className={styles.progressFill}></div>
          </div>

          <div className={styles.rating}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < Math.round(safeRating) ? styles.starFilled : styles.starEmpty}
                />
              ))}
            </div>
            <span className={styles.ratingText}>({course.reviews?.length || 1200} Ratings)</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default CourseCard;