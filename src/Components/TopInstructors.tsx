// src/Components/TopInstructors.tsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import type { RootState, AppDispatch } from '../store/index';
import { fetchMentors, selectMentors, selectMentorsStatus } from '../store/slices/mentorSlice';
import MentorCard from '../Components/cards/MentorCard';
import './ComponentStyles/TopInstructors.css';


const TopInstructors: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const mentors = useSelector(selectMentors);
  const loading = useSelector(selectMentorsStatus);

  // This is the corrected useEffect hook
  useEffect(() => {
    if (loading === 'idle') {
      dispatch(fetchMentors());
    }
  }, [loading, dispatch]);

  // slice first 4 mentors
  const topInstructors = mentors.slice(0, 4);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="top-instructors">
      <header className="top-instructors-header">
        <h2 className="top-instructors-title">Top Instructors</h2>
        <Link 
          to="/mentors"
          className="top-instructors-see-all"
          onClick={handleScrollTop}
        >
          See All
        </Link>
      </header>
      
      <div className="top-instructors-grid">
        {topInstructors.map((mentor) => (
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
      </div>
    </section>
  );
};

export default TopInstructors;