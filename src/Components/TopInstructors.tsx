// src/Components/TopInstructors.tsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import type {  AppDispatch } from '../store/index';
import { fetchMentors, selectMentors, selectMentorsStatus, selectMentorsError } from '../store/slices/mentorSlice';
import MentorCard from './cards/MentorCard';
import './ComponentStyles/TopInstructors.css';


const TopInstructors: React.FC = () => {
const dispatch = useDispatch<AppDispatch>();
const mentors = useSelector(selectMentors);
const loading = useSelector(selectMentorsStatus);
const error = useSelector(selectMentorsError);

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

  // Handle loading state
  if (loading === 'pending') {
    return (
      <section className="top-instructors">
        <header className="top-instructors-header">
          <h2 className="top-instructors-title">Top Instructors</h2>
        </header>
        <div className="top-instructors-grid">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="mentor-card-skeleton">
              <div className="skeleton-image"></div>
              <div className="skeleton-content">
                <div className="skeleton-text"></div>
                <div className="skeleton-text short"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Handle error state
  if (loading === 'failed') {
    return (
      <section className="top-instructors">
        <header className="top-instructors-header">
          <h2 className="top-instructors-title">Top Instructors</h2>
        </header>
        <div className="error-message">
          <p>Unable to load instructors at this time. {error ? `Error: ${error}` : ''}</p>
          <button onClick={() => dispatch(fetchMentors())}>
            Try Again
          </button>
        </div>
      </section>
    );
  }

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
        {topInstructors.length > 0 ? (
          topInstructors.map((mentor) => (
            <MentorCard key={mentor.id || mentor._id} mentor={mentor} />
          ))
        ) : (
          <div className="no-instructors">
            <p>No instructors available at this time.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopInstructors;