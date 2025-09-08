import React from 'react';
import CourseCard from './cards/CourseCard'; // Fixed import path
import './ComponentStyles/RelatedCourses.css';
import type { Course } from '../Types/Course'; // Import the proper type
import courseImg from '../assets/Images/course.jpg';

interface RelatedCoursesProps {
  categories: string[];
  excludeId: string;
}

const RelatedCourses: React.FC<RelatedCoursesProps> = ({ categories, excludeId }) => {
  // Use a proper Course array with unique data
  const allCourses: Course[] = [
    {
      _id: 'top-course-1',
      title: "Beginner's Guide to Design",
      instructor: 'Ronald Richards',
      rating: 5,
      reviews: [],
      description: '22 Total Hours. 155 Lectures. Beginner',
      price: 149.9,
      thumbnail: courseImg,
      chapters: 18,
      categories: ['Design'],
      hours: 22,
      lectures: 155,
      level: 'Beginner',
      tags: ['Design', 'Beginner'],
      sections: [{ title: 'Intro', videoFile: '', videoUrl: '', pdf: '', _id: 's1', isPreview: true }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0
    },
    {
      _id: 'top-course-2',
      title: 'React from Scratch',
      instructor: 'Jane Doe',
      rating: 5,
      reviews: [],
      description: '40 Total Hours. 200 Lectures. Intermediate',
      price: 199.99,
      thumbnail: courseImg,
      chapters: 25,
      categories: ['Development'],
      hours: 40,
      lectures: 200,
      level: 'Intermediate',
      tags: ['React', 'Intermediate'],
      sections: [{ title: 'Setup', videoFile: '', videoUrl: '', pdf: '', _id: 's2', isPreview: true }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0
    },
    {
      _id: 'top-course-3',
      title: 'Advanced JavaScript Concepts',
      instructor: 'John Smith',
      rating: 4,
      reviews: [],
      description: '30 Total Hours. 175 Lectures. Advanced',
      price: 179.99,
      thumbnail: courseImg,
      chapters: 20,
      categories: ['Development'],
      hours: 30,
      lectures: 175,
      level: 'Advanced',
      tags: ['JavaScript', 'Advanced'],
      sections: [{ title: 'Advanced', videoFile: '', videoUrl: '', pdf: '', _id: 's3', isPreview: true }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0
    },
    {
      _id: 'top-course-4',
      title: 'Python for Data Science',
      instructor: 'Maria Garcia',
      rating: 5,
      reviews: [],
      description: '45 Total Hours. 250 Lectures. Intermediate',
      price: 189.9,
      thumbnail: courseImg,
      chapters: 28,
      categories: ['Data Science'],
      hours: 45,
      lectures: 250,
      level: 'Intermediate',
      tags: ['Python', 'Data Science'],
      sections: [{ title: 'Data', videoFile: '', videoUrl: '', pdf: '', _id: 's4', isPreview: true }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0
    }
  ];

  const courses = allCourses.filter(course =>
    course.categories.some(cat => categories.includes(cat)) && course._id !== excludeId
  );

  return (
    <section className="top-courses">
      <header className="top-courses-header">
        <h2 className="top-courses-title">Related Courses</h2>
        <a href="/courses" className="top-courses-see-all" aria-label="View all courses">
          See All
        </a>
      </header>

      <div className="top-courses-grid">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </section>
  );
};

export default RelatedCourses;
