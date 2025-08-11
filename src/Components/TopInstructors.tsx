import React from 'react';
import MentorCard from '../Components/cards/MentorCard'; 
import { mentors } from '../data/Mentor'; 
import './TopInstructors.css';

/**
 * ISSUES FIXED:
 * 1. Now uses the existing mentor data instead of creating duplicate instructor data
 * 2. Uses the MentorCard component for consistency
 * 3. Eliminates code duplication between mentors and instructors
 * 4. Follows DRY (Don't Repeat Yourself) principle
 * 
 * EDUCATION: Always reuse existing components and data when they serve the same purpose.
 * Instructors and Mentors are essentially the same entity in this context.
 */

const TopInstructors: React.FC = () => {
  // Display only the first 4 mentors as "top instructors"
  const topInstructors = mentors.slice(0, 4);

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
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
      </div>
    </section>
  );
}
export default TopInstructors;