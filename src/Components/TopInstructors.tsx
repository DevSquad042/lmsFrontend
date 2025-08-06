import React from 'react';
import InstructorCard from './cards/Experts';
import './TopInstructors.css';

interface Instructor {
  image: string;
  name: string;
  title: string;
  rating: number;
  students: number;
}

const TopInstructors: React.FC = () => {
  const instructors: Instructor[] = [
    {
      image: 'https://via.placeholder.com/300x180',
      name: 'Ronald Richards',
      title: 'UI/UX Designer',
      rating: 4.9,
      students: 2400,
    },
    {
      image: 'https://via.placeholder.com/300x180',
      name: 'Jane Doe',
      title: 'Web Developer',
      rating: 4.7,
      students: 1800,
    },
    {
      image: 'https://via.placeholder.com/300x180',
      name: 'Alex Johnson',
      title: 'Data Scientist',
      rating: 4.8,
      students: 2200,
    },
    {
      image: 'https://via.placeholder.com/300x180',
      name: 'Emily Carter',
      title: 'Mobile App Developer',
      rating: 4.6,
      students: 1700,
    },
    
  ];

  return (
    <section className="top-instructors">
      <div className="top-instructors-header">
        <h2 className="top-instructors-title">Top Instructors</h2>
        <a href="/instructors" className="top-instructors-see-all">
          See All
        </a>
      </div>
      <div className="top-instructors-grid">
        {instructors.map((instructor, index) => (
          <InstructorCard key={index} {...instructor} />
        ))}
      </div>
    </section>
  );
};

export default TopInstructors;

