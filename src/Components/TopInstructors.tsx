
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import type { AppDispatch } from '../store/index';
import { fetchMentors, selectMentors, selectMentorsStatus, selectMentorsError } from '../store/slices/mentorSlice';
import MentorCard from '../Components/cards/MentorCard';
import './ComponentStyles/TopInstructors.css';

const TopInstructors: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const mentors = useSelector(selectMentors);
  const loading = useSelector(selectMentorsStatus);
  const error = useSelector(selectMentorsError);

  useEffect(() => {
    if (loading === 'idle') {
      dispatch(fetchMentors());
    }
  }, [loading, dispatch]);

  const topInstructors = mentors.slice(0, 4);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading === 'pending') {
    return (
      <section className="top-instructors">
        <header className="top-instructors-header">
          <h2 className="top-instructors-title">Top Instructors</h2>
        </header>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading instructors...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="top-instructors">
        <header className="top-instructors-header">
          <h2 className="top-instructors-title">Top Instructors</h2>
        </header>
        <p>Error: {error}</p>
      </section>
    );
  }

  return (
    <section className="top-instructors">
      <header className="top-instructors-header">
        <h2 className="top-instructors-title">Top Instructors</h2>
        <Link 
         to="/categories"
          className="top-instructors-see-all"
          onClick={handleScrollTop}
          aria-label="View all instructors"
        >
          See All
        </Link>
      </header>
      
      <div className="top-instructors-grid">
        {topInstructors.length > 0 ? (
          topInstructors.map((mentor) => (
            <MentorCard key={mentor.id || mentor._id} mentor={mentor} />
          ))
        ) : (
          <p>No instructors available.</p>
        )}
      </div>
    </section>
  );
};

export default TopInstructors;