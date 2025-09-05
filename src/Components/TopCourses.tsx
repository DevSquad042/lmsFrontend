import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import type { RootState, AppDispatch } from '../store/index';
import { fetchCourses } from '../store/slices/coursesSlice';
import CourseCard from './cards/CourseCard';
import './ComponentStyles/TopCourses.css';

const TopCourses: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // ✅ Read from unified slice shape
  const courses = useSelector((state: RootState) => state.courses.list);
  const loading = useSelector((state: RootState) => state.courses.loading);
  const error = useSelector((state: RootState) => state.courses.error);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const topCourses = courses.slice(0, 4);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading === "pending") {
    return (
      <section className="top-courses">
        <div className="loading-spinner"></div>
      </section>
    );
  }

  if (error) return <p>Error: {error}</p>;

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
        {topCourses.length === 0 ? (
          <p>No top courses available.</p>
        ) : (
          topCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))
        )}
      </div>
    </section>
  );
};

export default TopCourses;
