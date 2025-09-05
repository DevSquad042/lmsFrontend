// src/Components/RelatedCourses.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState, AppDispatch } from "../store";
import { fetchCourses } from "../store/slices/coursesSlice";
import CourseCard from "./cards/CourseCard";
import "./ComponentStyles/RelatedCourses.css";
import type { Course } from "../Types/Course";

interface RelatedCoursesProps {
  categories: string[];  // required for filtering
  excludeId: string;     // required to exclude current course
}

const RelatedCourses: React.FC<RelatedCoursesProps> = ({ categories, excludeId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const courses = useSelector((state: RootState) => state.courses.list);
  const loading = useSelector((state: RootState) => state.courses.loading);
  const error = useSelector((state: RootState) => state.courses.error);

  useEffect(() => {
    if (courses.length === 0) {
      dispatch(fetchCourses());
    }
  }, [dispatch, courses.length]);

  // ✅ Filter related courses
  const relatedCourses: Course[] = courses
    .filter((course) => course._id !== excludeId) // exclude current
    .filter((course) =>
      categories.some((cat) => course.categories.includes(cat))
    )
    .slice(0, 4); // limit to 4

  if (loading === "pending") return <p>Loading related courses...</p>;
  if (error) return <p>Error loading related courses: {error}</p>;

  return (
    <section className="top-courses">
      <header className="top-courses-header">
        <h2 className="top-courses-title">Related Courses</h2>
        <Link to="/courses" className="top-courses-see-all" aria-label="View all courses">
          See All
        </Link>
      </header>

      <div className="top-courses-grid">
        {relatedCourses.length === 0 ? (
          <p>No related courses found.</p>
        ) : (
          relatedCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))
        )}
      </div>
    </section>
  );
};

export default RelatedCourses;
