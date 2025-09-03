import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/";
import { fetchCourses } from "../../store/slices/courseSlice";
import { FaStar } from "react-icons/fa";
import styles from "./CardsStyle/CourseCard.module.css";
import type { Course } from "../CourseContent";

interface CourseCard2Props {
  mentorId?: string;
}

const CourseCard2: React.FC<CourseCard2Props> = ({ mentorId }) => {
  const dispatch = useDispatch<AppDispatch>();

  // ✅ Defensive destructuring
  const { data: courses = [], loading, error } = useSelector(
    (state: RootState) => state.courses || {}
  );

  useEffect(() => {
    if (!courses.length) dispatch(fetchCourses());
  }, [dispatch, courses.length]);



  // ✅ Mentor filter (shorthand)
  const filteredCourses = mentorId
    ? courses.filter((c: Course) => c.mentorId === mentorId)
    : courses;

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="course-grid">
      {filteredCourses.map((course) => {
        const {
          id,
          title,
          description,
          price = 0,
          rating = 0,
          instructor = "Unknown Instructor",
          thumbnail = "/placeholder-course.jpg",
          reviews = 0,
        } = course;

        const safeRating = Math.max(0, Math.min(5, rating));
        const reviewCount = Array.isArray(reviews) ? reviews.length : reviews;

        return (
          <article key={id} className={styles.card} role="article">
            <div className={styles.imageContainer}>
              <img
                src={thumbnail}
                alt={`Course thumbnail for ${title}`}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-course.jpg";
                }}
              />
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.author}>By {instructor}</p>

              <div
                className={styles.rating}
                role="img"
                aria-label={`Rating: ${safeRating} out of 5 stars`}
              >
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      color={i < safeRating ? "#FFC107" : "#ccc"}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleRating(id, i + 1)}
                    />
                  ))}
                </div>
                <span className={styles.reviewCount}>
                  ({reviewCount} Reviews)
                </span>
              </div>

              <p className={styles.details}>{description}</p>
              <div className={styles.priceContainer}>
                <strong className={styles.price}>
                  ${price.toFixed(2)}
                </strong>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default CourseCard2;
