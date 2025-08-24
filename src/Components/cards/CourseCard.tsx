import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { fetchCourses, patchCourseRating } from "../../store/slices/courseSlice";
import { FaStar } from "react-icons/fa";
import styles from "./CardsStyle/CourseCard.module.css";

const CourseCard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: courses, loading, error } = useSelector(
    (state: RootState) => state.courses
  );

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleRating = (id: string, rating: number) => {
    // Local UI update (optional for instant feedback)
    // dispatch(updateCourseRating({ id, rating }));

    // Persist change to API
    dispatch(patchCourseRating({ id, rating }));
  };

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="course-grid">
      {courses.map((course) => {
        const safeRating = Math.max(0, Math.min(5, course.rating || 0));

        return (
          <article key={course.id} className={styles.card} role="article">
            <div className={styles.imageContainer}>
              <img
                src={course.thumbnail}
                alt={`Course thumbnail for ${course.title}`}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-course.jpg";
                }}
              />
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>{course.title}</h3>
              <p className={styles.author}>By {course.instructor}</p>

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
                      onClick={() => handleRating(course.id, i + 1)}
                    />
                  ))}
                </div>
                <span className={styles.reviewCount}>
                  ({course.reviews?.toLocaleString() || 0} Reviews)
                </span>
              </div>

              <p className={styles.details}>{course.description}</p>
              <div className={styles.priceContainer}>
                <strong className={styles.price}>
                  ${course.price?.toFixed(2) || "0.00"}
                </strong>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default CourseCard;
