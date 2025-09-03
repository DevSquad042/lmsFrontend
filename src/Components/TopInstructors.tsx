// components/TopInstructors.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store/index'; // Assuming you have a Redux store setup
import { fetchMentors } from '../store/slices/mentorSlice';
import InstructorCard from './cards/MentorCard';
import styles from './ComponentStyles/TopInstructors.module.css';
import { Link } from 'react-router-dom';

const TopInstructors: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: instructors, loading, error } = useSelector((state: RootState) => state.instructors);

  useEffect(() => {
    dispatch(fetchMentors());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

    const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.topinstructors}>
        <header className={styles.topcoursesheader}>
        <h2 className={styles.topcoursestitle}>Top Instructors</h2>
        <Link
          to="/categories" 
          className={styles.topcoursesseeall}
          onClick={handleScrollTop}
        >
          See All
        </Link>
      </header>
      <div className={styles.instructorslist}>
        {instructors.slice(0, 4).map((instructor) => (
          <InstructorCard key={instructor.id} mentor={instructor} />
        ))}
      </div>
    </div>
  );
};

export default TopInstructors;