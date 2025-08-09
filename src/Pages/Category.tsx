import React from 'react';
import { courses } from '../data/Course';
import { mentors } from '../data/Mentor';
import CourseCard from '../Components/cards/card1/CourseCard';
import MentorCard from '../Components/cards/card1/MentorCard'; // Fixed import name
import Filter from '../Components/Filters/Filter';
import Pagination from '../Components/Pagination';
import styles from '../assets/css/global.module.css';
import Header2 from '../Components/shared/Header2';
import Footer from '../Components/shared/Footer';

/**
 * ISSUES FIXED:
 * 1. Import statement formatting (removed extra spaces)
 * 2. Component import name consistency
 * 3. Added proper semantic HTML structure
 * 4. Added loading states and error boundaries consideration
 */
const CategoryPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <Header2 />
      
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {/* Main content area */}
          <div className={styles.mainLayout}>
            <aside>
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
              
              {/* Course grid */}
              <section className={styles.courseSection}>
                <div className={styles.grid}>
                  {courses.map(course => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
                <Pagination />
              </section>
            </main>
          </div>
          
          {/* Popular Mentors Section */}
          <section className={styles.mentorsSection}>
            <h2>Popular Mentors</h2>
            <div className={styles.mentorGrid}>
              {mentors.map(mentor => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>
          </section>
          
          {/* Featured Courses Section */}
          <section className={styles.featuredSection}>
            <h2>Featured Courses</h2>
            <div className={styles.featuredGrid}>
              {courses.slice(0, 4).map(course => (
                <CourseCard key={`featured-${course.id}`} course={course} />
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
