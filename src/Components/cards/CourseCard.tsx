// src/Components/cards/CourseCard.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaSpinner, FaCheckCircle } from "react-icons/fa";
import type { Course } from "../../Types/Course";
import styles from "./CardsStyle/CourseCard.module.css";

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const [actualRating, setActualRating] = useState<number | null>(null);
  const [totalReviews, setTotalReviews] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  

  const safeRating = Math.max(0, Math.min(5, actualRating ?? course.rating ?? 0));
  const displayReviews = totalReviews ?? course.reviews?.length ?? 1200;
  const defaultThumbnail = "https://images.unsplash.com/photo-1610500796385-3ffc1ae2f046?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3R1ZGVudCUyMGxlYXJuaW5nfGVufDB8fDB8fHww"; // PNG fallback


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const url = `http://localhost:3000/api/review/courseAverage/${course._id}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // API returns { status: 'success', data: { averageRating: number, totalReviews: number } }
        if (data.data && data.data.averageRating !== undefined) {
          setActualRating(data.data.averageRating);
        }
        if (data.data && data.data.totalRatingSum !== undefined) {
          setTotalReviews(data.data.totalRatingSum);
        }
      } catch (error) {
        console.error('Error fetching reviews for course:', course._id, error);
        // Fallback to course data
      }}


    if (course._id) {
      fetchReviews();
    }
  }, [course._id]);

  return (
    <Link to={`/courses/${course._id}`} className={styles.cardLink}>
      <article className={styles.card} role="article">
        {isLoading && (
          <div className={styles.loadingOverlay}>
            <FaSpinner className={styles.spinner} />
          </div>
        )}
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

    

          <div className={styles.rating}>
            <div className={styles.stars}>
              {(() => {
                const fullStars = Math.floor(safeRating);
                const hasHalf = safeRating % 1 >= 0.5;
                const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

                const stars = [];
                for (let i = 0; i < fullStars; i++) {
                  stars.push(<FaStar key={`full-${i}`} className={styles.starFilled} />);
                }
                if (hasHalf) {
                  stars.push(<FaStarHalfAlt key="half" className={styles.starFilled} />);
                }
                for (let i = 0; i < emptyStars; i++) {
                  stars.push(<FaStar key={`empty-${i}`} className={styles.starEmpty} />);
                }
                return stars;
              })()}
            </div>
            <span className={styles.ratingText}>({displayReviews} Ratings)</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default CourseCard;