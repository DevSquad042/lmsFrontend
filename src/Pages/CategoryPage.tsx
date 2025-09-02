// src/Pages/CategoryPage.tsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/index';
import { fetchCourses } from '../store/slices/courseSlice';
import { fetchInstructors } from '../store/slices/mentorSlice';
import CourseCard from '../Components/cards/CourseCard';
import InstructorCard from '../Components/cards/MentorCard';
import Filter from '../Components/Filters/Filter';
import Pagination from '../Components/Pagination';
import styles from '../Styles/CategoryPage.module.css';
import Header2 from '../Components/shared/Header2';
import Footer from '../Components/Layout/Footer';

const coursesPerPage = 6;

const CategoryPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: courses, loading: coursesLoading } = useSelector(
    (state: RootState) => state.courses
  );
  const { instructors, loading: instructorsLoading } = useSelector(
    (state: RootState) => state.instructors
  );

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchInstructors());
  }, [dispatch]);

  // Pagination Logic
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (coursesLoading === "pending" || instructorsLoading === "pending") {
    return <p>Loading categories...</p>;
  }

  const popularInstructors = instructors.slice(0, 4);
  const featuredCourses = courses.slice(0, 3);

  return (
    <div className={styles.pageContainer}>
      <Header2 />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.mainLayout}>
            <aside className={styles.sidebar}>
              <Filter />
            </aside>
            <main className={styles.main}>
              <header className={styles.header}>
                <h1>Design Courses</h1>
                <p className={styles.subtitle}>All Development Courses</p>
                <div className={styles.sort}>
                  <label htmlFor="sort-select">Sort By:</label>
                  <select id="sort-select" className={styles.sortSelect}>
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </header>
              <section className={styles.courseSection}>
                <div className={styles.grid}>
                  {currentCourses.map((course) => (
                    <CourseCard key={course._id} course={course} />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </section>
            </main>
          </div>
          <section className={styles.mentorsSection}>
            <h2>Popular Instructors</h2>
            <div className={styles.mentorGrid}>
              {popularInstructors.map((instructor) => (
                <InstructorCard key={instructor._id} instructor={instructor} />
              ))}
            </div>
          </section>
          <section className={styles.featuredSection}>
            <h2>Featured Courses</h2>
            <div className={styles.featuredGrid}>
              {featuredCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;