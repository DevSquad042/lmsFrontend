import CourseCard from './cards/CourseCard'; 
import './ComponentStyles/TopCourses.css';
import type { Course } from '../Types/Course';
import courseImg from '../assets/Images/course.jpg';
import { Link } from "react-router-dom";

const TopCourses: React.FC = () => {
  const courses: Course[] = [
    {
      id: 'top-course-1',
      title: "Beginner's Guide to Design",
      author: 'Ronald Richards',
      rating: 5,
      reviews: 1200, 
      details: '22 Total Hours. 155 Lectures. Beginner',
      price: 149.9,
      image: courseImg,
      chapters: 18,
      category: 'Design',
      hours: 22,
      lectures: 155,
      level: 'Beginner'
    },
    {
      id: 'top-course-2',
      title: 'React from Scratch',
      author: 'Jane Doe',
      rating: 5, 
      reviews: 980,
      details: '40 Total Hours. 200 Lectures. Intermediate',
      price: 199.99,
      image: courseImg,
      chapters: 25,
      category: 'Development',
      hours: 40,
      lectures: 200,
      level: 'Intermediate'
    },
    {
      id: 'top-course-3',
      title: 'Advanced JavaScript Concepts',
      author: 'John Smith',
      rating: 4,
      reviews: 850,
      details: '30 Total Hours. 175 Lectures. Advanced',
      price: 179.99,
      image: courseImg,
      chapters: 20,
      category: 'Development',
      hours: 30,
      lectures: 175,
      level: 'Advanced'
    },
    {
      id: 'top-course-4',
      title: 'Python for Data Science',
      author: 'Maria Garcia',
      rating: 5,
      reviews: 1100,
      details: '45 Total Hours. 250 Lectures. Intermediate',
      price: 189.9,
      image: courseImg,
      chapters: 28,
      category: 'Data Science',
      hours: 45,
      lectures: 250,
      level: 'Intermediate'
    }
  ];

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="top-courses">
      <header className="top-courses-header">
        <p className="top-courses-title">Top Courses</p>
        <Link 
          to="/categories" 
          className="top-courses-see-all" 
          onClick={handleScrollTop}
        >
          See All
        </Link>
      </header>

      <div className="top-courses-grid">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
};

export default TopCourses;

