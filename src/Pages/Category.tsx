
import React from 'react';
import   {courses}  from '../data/Course';
import   {mentors}  from '../data/Mentor';
import CourseCard from '../Components/cards/CourseCards';
import MentorCard from '../Components/MentorsSection/MentorSection';
import Filter from '../Components/Filters/Filter';
import Pagination from '../Components/Pagination';
import styles from '../global.module.css';

const CoursePage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.mainLayout}>
          <Filter />
          <main className={styles.main}>
            <div className={styles.header}>
              <h1>Design Courses</h1>
              <h2>All Development Courses</h2>
              <div className={styles.sort}>
                <span>Sort By</span>
                <select>
                  <option>Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating</option>
                </select>
              </div>
            </div>
            <div className={styles.grid}>
              {courses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
            <Pagination />
          </main>
        </div>
        <section>
          <h2>Popular Mentors</h2>
          <div className={styles.mentorGrid}>
            {mentors.map(mentor => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        </section>
        <section>
          <h2>Featured Courses</h2>
          <div className={styles.featuredGrid}>
            {courses.slice(0, 4).map(course => (
              <CourseCard key={`featured-${course.id}`} course={course} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CoursePage;

