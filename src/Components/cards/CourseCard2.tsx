import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState, AppDispatch } from "../../store/";
import { fetchCourses } from "../../store/slices/coursesSlice";
import styles from "./CardsStyle/MentorCard.module.css";

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
    ? courses.filter((c: any) => c.mentorId === mentorId)
    : courses;

  if (loading === "pending") return <p>Loading courses...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="course-grid">
      {filteredCourses.map((course) => {
        const {
          _id: id,
          title,
          price = 0,
          rating = 0,
          instructor = "Unknown Instructor",
          thumbnail = "/placeholder-course.jpg",
          reviews = 0,
        } = course;

        const reviewCount = Array.isArray(reviews) ? reviews.length : reviews;

        return (
          <Link key={id} to={`/course/${id}`} className={styles.cardLink}>
            <article className={styles.card}>
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
                <h4 className={styles.name}>{title}</h4>
                <p className={styles.role}>By {instructor}</p>

                <hr className={styles.divider} />

                <div className={styles.rating}>
                  ⭐ {rating.toFixed(1)} ({reviewCount} Reviews)
                </div>
              </div>
            </article>
          </Link>
        );
      })}
    </div>
  );
};

export default CourseCard2;
