import React from 'react';
import MentorCard from '../Components/cards/MentorCard'; 
import { mentors } from '../data/Mentor'; 
import './ComponentStyles/TopInstructors.css';
import { Link } from "react-router-dom";

const TopInstructors: React.FC = () => {
  // Display only the first 4 mentors as "top instructors"
  const topInstructors = mentors.slice(0, 4);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="top-instructors">
      <header className="top-instructors-header">
        <h2 className="top-instructors-title">Top Instructors</h2>
        <Link 
          to="/categories" 
          className="top-instructors-see-all"
          onClick={handleScrollTop}
        >
          See All
        </Link>
      </header>
      
      <div className="top-instructors-grid">
        {topInstructors.map((mentor) => (
          <MentorCard key={mentor.id} mentor={mentor} showRating={true} />
        ))}
      </div>
    </section>
  );
}

export default TopInstructors;
