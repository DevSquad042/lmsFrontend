// src/Components/cards/CourseCard.tsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import type { Course } from '../../Types/Course';
import { getAverageRating, selectAverageRatings } from '../../store/slices/reviewsSlice';
import type { AppDispatch } from '../../store/store';
import styles from './CardsStyle/CourseCard.module.css';

interface Props {
  course: Course;
}

const CourseCard: React.FC<Props> = ({ course }) => {
  const dispatch = useDispatch<AppDispatch>();
  const averageRatings = useSelector(selectAverageRatings);
  const ratingData = averageRatings[course.id];
  
  useEffect(() => {
    if (!ratingData) {
      dispatch(getAverageRating(course.id));
    }
  }, [dispatch, course.id, ratingData]);

  const safeRating: number = ratingData ? Math.max(0, Math.min(5, ratingData.averageRating || 0)) : 0;
  const reviews: number = ratingData ? ratingData.numberOfRatings : 0;

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
              {ratingData ? (
                [...Array(5)].map((_: undefined, i: number) => (
                  <FaStar
                    key={i}
                    color={i < Math.round(safeRating) ? "#FFC107" : "#ccc"}
                  />
                ))
              ) : (
                [...Array(5)].map((_: undefined, i: number) => <FaStar key={i} color="#ccc" />)
              )}
            </div>
            <span className={styles.ratingText}>
              {ratingData ? safeRating.toFixed(1) : '...'}
            </span>
            <span className={styles.reviews}>
              ({reviews} reviews)
            </span>
          </div>
          <p className={styles.price}>${course.price}</p>
        </div>
      </article>
    </Link>
  );
};

export default CourseCard;