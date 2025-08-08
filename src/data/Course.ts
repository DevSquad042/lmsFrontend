// data/Course.ts
import type { Course } from '../Types/Course';
import courseImg from '../assets/course.jpg';

export const courses: Course[] = Array.from({ length: 9 }, (_, index) => ({
  id: `course-${index + 1}`,
  title: "Beginner's Guide to Design",
  author: 'Ronald Richards',
  rating: 5,
  reviews: 1200,
  details: '22 Total Hours. 155 Lectures. Beginner',
  price: 149.9,
  image: courseImg,
  chapters: Math.floor(Math.random() * 10) + 15, 
  category: 'Design',
  hours: 22,
  lectures: 155,
  level: 'Beginner'
}));

export default courses;