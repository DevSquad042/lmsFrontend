// src/Components/cards/CourseCard.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaSpinner, FaStarHalfAlt } from "react-icons/fa";
import type { Course } from "../../Types/Course";
import { getSummary } from "../../API/starIconAPI";
import styles from "./CardsStyle/CourseCard.module.css";

interface CourseCardProps {
  course: Course;
  isEnrolled?: boolean; // Add this prop to distinguish enrolled courses
}

const CourseCard: React.FC<CourseCardProps> = ({ course, isEnrolled = false }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [actualRating, setActualRating] = useState(course.rating || 0);
  const [totalReviews, setTotalReviews] = useState(0);

  const defaultThumbnail = "https://images.unsplash.com/photo-1610500796385-3ffc1ae2f046?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3R1ZGVudCUyMGxlYXJuaW5nfGVufDB8fDB8fHww";

  useEffect(() => {
    
  
    if (course._id) {
      setIsLoading(true);
      getSummary(course._id)
        .then((summary) => {
          setActualRating(summary.averageRating);
          setTotalReviews(summary.totalReviews);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Failed to fetch reviews:', error);
          setActualRating(course.rating || 0);
          setTotalReviews(0);
          setIsLoading(false);
        });
    }
  }, [course._id]);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} color="#ffc107" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<FaStarHalfAlt key={i} color="#ffc107" />);
      } else {
        stars.push(<FaStar key={i} color="#ccc" />);
      }
    }
    return stars;
  };

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
            {isLoading ? (
              <FaSpinner className="fa-spin" />
            ) : (
              <>
                <div className={styles.stars}>
                  {renderStars(actualRating)}
                </div>
                <span className={styles.ratingText}>
                  {actualRating.toFixed(1)} ({totalReviews} reviews)
                </span>
              </>
            )}
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