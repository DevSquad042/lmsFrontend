import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchMentors,
  selectMentors,
  selectMentorsStatus,
} from '../../features/mentors/mentorSlice';
import MentorCard from './MentorCard';
import './ComponentStyles/TopInstructors.css';

const TopInstructors: React.FC = () => {
  const dispatch = useAppDispatch();
  const mentors = useAppSelector(selectMentors);
  const status = useAppSelector(selectMentorsStatus);

  // fetch mentors if not already loaded
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMentors());
    }
  }, [status, dispatch]);

  // slice first 4 mentors
  const topInstructors = mentors.slice(0, 4);

  if (status === 'loading') {
    return <p>Loading top instructors...</p>;
  }

  if (status === 'failed') {
    return <p>Failed to load instructors.</p>;
  }

  return (
    <section className="top-instructors">
      <header className="top-instructors-header">
        <h2 className="top-instructors-title">Top Instructors</h2>
        <a 
          href="/instructors" 
          className="top-instructors-see-all"
          aria-label="View all instructors"
        >
          See All
        </a>
      </header>
      
      <div className="top-instructors-grid">
        {topInstructors.map((mentor) => (
          <MentorCard key={mentor.id} mentorId={mentor.id!} showRating />
        ))}
      </div>
    </section>
  );
};

export default TopInstructors;
