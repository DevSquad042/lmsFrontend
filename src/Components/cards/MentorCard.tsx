// components/InstructorCard.tsx
import React from 'react';
import type { Instructor } from '../../Types/Mentor';
import styles from './CardsStyle/MentorCard.module.css';
import { Link } from 'react-router-dom';

interface InstructorCardProps {
  instructor: Instructor;
}

const InstructorCard: React.FC<InstructorCardProps> = ({ instructor }) => {
  return (
    <Link to={`/teacher/:id`} className={styles.cardLink}>
    <div className={styles.instructorcard}>
      <img src="/path/to/instructor-image.jpg" alt={`${instructor.firstName} ${instructor.lastName}`} />
      <div className= {styles.instructordetails}>
        <h3>{`${instructor.firstName} ${instructor.lastName}`}</h3>
        <p>UI/UX Designer</p>
      </div>
    </div>
    </Link>
  );
};

export default InstructorCard;