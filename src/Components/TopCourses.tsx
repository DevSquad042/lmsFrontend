import CourseCard from './cards/CourseCards';
import './TopCourses.css';

type Course = {
  image: string;
  title: string;
  author: string;
  rating: number;
  ratingCount: number;
  totalHours: number;
  totalLectures: number;
  level: string;
  price: number;
};

const TopCourses: React.FC = () => {
  const courses: Course[] = [
    {
      image: 'https://via.placeholder.com/300x180',
      title: "Beginner’s Guide to Design",
      author: 'Ronald Richards',
      rating: 4.5,
      ratingCount: 1200,
      totalHours: 22,
      totalLectures: 155,
      level: 'Beginner',
      price: 149.9,
    },
    {
      image: 'https://via.placeholder.com/300x180',
      title: 'React from Scratch',
      author: 'Jane Doe',
      rating: 4.8,
      ratingCount: 980,
      totalHours: 40,
      totalLectures: 200,
      level: 'Intermediate',
      price: 199.99,
    },
    {
      image: 'https://via.placeholder.com/300x180',
      title: 'React from Scratch',
      author: 'Jane Doe',
      rating: 4.8,
      ratingCount: 980,
      totalHours: 40,
      totalLectures: 200,
      level: 'Intermediate',
      price: 199.99,
    },
    {
      image: 'https://via.placeholder.com/300x180',
      title: "Beginner’s Guide to Design",
      author: 'Ronald Richards',
      rating: 4.5,
      ratingCount: 1200,
      totalHours: 22,
      totalLectures: 155,
      level: 'Beginner',
      price: 149.9,
    },
  ];

  return (
    <section className="top-courses">
      <div className="top-courses-header">
        <h2 className="top-courses-title">Top Courses</h2>
        <a href="/courses" className="top-courses-see-all">See All</a>
      </div>

      <div className="top-courses-grid">
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </section>
  );
};

export default TopCourses;


