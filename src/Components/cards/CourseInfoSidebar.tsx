// src/Components/cards/CourseInfoSidebar.tsx
import React from "react";
import type { Course } from "../../Types/Course";
import styles from "./CardsStyle/CourseInfoSidebar.module.css";

interface CourseInfoSidebarProps {
  course: Course;
}

const CourseInfoSidebar: React.FC<CourseInfoSidebarProps> = ({ course }) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.courseInfo}>
        <img 
          src={course.thumbnail || "https://via.placeholder.com/300x200"} 
          alt={course.title} 
          className={styles.courseThumbnail}
        />
        <h3 className={styles.courseTitle}>{course.title}</h3>
        <p className={styles.instructor}>By {course.instructor || "Unknown Instructor"}</p>
        
        <div className={styles.priceSection}>
           <span className={styles.price}>
             {course.discountedPrice && course.discountedPrice < course.price ? `NGN ${course.discountedPrice}` : course.price === 0 ? "FREE" : `NGN ${course.price}`}
           </span>
           {(course.discountedPrice && course.discountedPrice < course.price) || (course.originalPrice && course.originalPrice > course.price) ? (
             <span className={styles.originalPrice}>
               NGN {course.discountedPrice && course.discountedPrice < course.price ? course.price : course.originalPrice}
             </span>
           ) : null}
         </div>
        
        <button className={styles.startLearningBtn}>
          Start Learning
        </button>
        
        <div className={styles.courseStats}>
           <div className={styles.stat}>
             <span className={styles.statLabel}>Duration</span>
             <span className={styles.statValue}>{course.hours ? `${course.hours} hours` : "10 hours"}</span>
           </div>
           <div className={styles.stat}>
             <span className={styles.statLabel}>Lessons</span>
             <span className={styles.statValue}>{course.lectures || "24"}</span>
           </div>
           <div className={styles.stat}>
             <span className={styles.statLabel}>Level</span>
             <span className={styles.statValue}>{course.level || "Intermediate"}</span>
           </div>
         </div>
      </div>
    </div>
  );
};

export default CourseInfoSidebar;