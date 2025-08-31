// src/Components/TopCourses.tsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import type { RootState, AppDispatch } from '../store/index';
import { fetchCourses, selectCourses, selectCoursesStatus } from '../store/slices/courseSlice';
import CourseCard from './cards/CourseCard';
import './ComponentStyles/TopCourses.css';
import type { Course } from '../Types/Course';

const TopCourses: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const courses: Course[] = useSelector(selectCourses);
  const loading: boolean = useSelector(selectCoursesStatus);
  const error: string | null = useSelector((state: RootState) => state.courses.error);

  useEffect(() => {
    if (courses.length === 0) {
      dispatch(fetchCourses());
    }
  }, [dispatch, courses.length]);

  const topCourses: Course[] = courses.slice(0, 4);

  const handleScrollTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return <p>Loading top courses...</p>;
  }

  if (error) {
    return <p>Error: Failed to load courses. Please try again.</p>;
  }

  if (topCourses.length === 0) {
    return <p>No top courses available.</p>;
  }

  return (
    <section className="top-courses">
      <header className="top-courses-header">
        <h2 className="top-courses-title">Top Courses</h2>
        <Link 
          to="/courses" 
          className="top-courses-see-all"
          onClick={handleScrollTop}
        >
          See All
        </Link>
      </header>
      
      <div className="top-courses-grid">
        {topCourses.map((course: Course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
};

export default TopCourses;