import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/index";
import { fetchCourses } from "../store/slices/coursesSlice";
import { fetchMentors } from "../store/slices/mentorSlice";
import CourseCard from "../Components/cards/CourseCard";
import MentorCard from "../Components/cards/MentorCard";
import Filter from "../Components/Filters/Filter";
import Pagination from "../Components/Pagination";
import styles from "../Styles/CategoryPage.module.css";
import Header2 from "../Components/shared/Header2";
import Footer from "../Components/Layout/Footer";
import type { Course } from "../Types/Course";
import type { Mentor } from "../Types/Mentor";

const coursesPerPage = 6;

const CategoryPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const courses = useSelector((state: RootState) => state.courses.list);
  const coursesLoading = useSelector((state: RootState) => state.courses.loading);
  const coursesError = useSelector((state: RootState) => state.courses.error);

  const mentors = useSelector((state: RootState) => state.mentors.data);
  const mentorsLoading = useSelector((state: RootState) => state.mentors.loading);
  const mentorsError = useSelector((state: RootState) => state.mentors.error);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchMentors());
  }, [dispatch]);

  console.log("Mentors from Redux:", mentors);
  console.log("Mentors Error:", mentorsError);
  const safeCourses = Array.isArray(courses) ? courses : [];
  const safeMentors = Array.isArray(mentors) ? mentors : [];
  console.log("Safe Mentors:", safeMentors);
  console.log("Popular Mentors:", safeMentors.slice(0, 4));

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = safeCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(safeCourses.length / coursesPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const popularMentors = safeMentors.slice(0, 4);
  const featuredCourses = safeCourses.slice(0, 3);

  if (coursesLoading === "pending" || mentorsLoading === "pending") {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p className={styles.loadingText}>Loading categories...</p>
      </div>
    );
  }

  if (coursesError) return <p>Error loading courses: {coursesError}</p>;
  if (mentorsError) return <p>Error loading mentors: {mentorsError}</p>;

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
                <div className={styles.grid2}>
                  {currentCourses.length > 0 ? (
                    currentCourses.map((course: Course) => (
                      <CourseCard key={course._id} course={course} />
                    ))
                  ) : (
                    <p className={styles.noCourses}>No courses found.</p>
                  )}
                </div>
                {safeCourses.length > coursesPerPage && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </section>
            </main>
          </div>
          <section className={styles.mentorsSection}>
            <h2>Popular Mentors</h2>
            <div className={styles.mentorGrid}>
              {popularMentors.length > 0 ? (
                popularMentors.map((mentor: Mentor) => (
                  <MentorCard key={mentor._id || mentor.id} mentor={mentor} />
                ))
              ) : (
                <p className={styles.noMentors}>No mentors found.</p>
              )}
            </div>
          </section>
          <section className={styles.featuredSection}>
            <h2>Featured Courses</h2>
            <div className={styles.featuredGrid}>
              {featuredCourses.length > 0 ? (
                featuredCourses.map((course: Course) => (
                  <CourseCard key={course._id} course={course} />
                ))
              ) : (
                <p className={styles.noCourses}>No featured courses found.</p>
              )}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;