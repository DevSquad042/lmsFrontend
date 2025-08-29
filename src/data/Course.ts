import type { Course } from '../Types/Course';
import courseImg from '../assets/Images/course.jpg';

export const courses: Course[] = [
  {
    id: 'course-1',
    title: "Beginner's Guide to Design",
    instructor: 'Ronald Richards',
    rating: 5,
    reviews: 1200,
    description: '22 Total Hours. 155 Lectures. Beginner',
    price: 149.9,
    thumbnail: courseImg,
    chapters: 18,
    category: 'Design',
    hours: 22,
    lectures: 155,
    level: 'Beginner'
  },
  {
    id: 'course-2',
    title: 'Advanced React Development',
    instructor: 'Sarah Johnson',
    rating: 4,
    reviews: 890,
    description: '35 Total Hours. 220 Lectures. Advanced',
    price: 199.9,
    thumbnail: courseImg,
    chapters: 25,
    category: 'Development',
    hours: 35,
    lectures: 220,
    level: 'Advanced'
  },
  {
    id: 'course-3',
    title: 'UI/UX Design Masterclass',
    instructor: 'Michael Chen',
    rating: 5,
    reviews: 1500,
    description: '40 Total Hours. 180 Lectures. Intermediate',
    price: 179.9,
    thumbnail: courseImg,
    chapters: 22,
    category: 'Design',
    hours: 40,
    lectures: 180,
    level: 'Intermediate'
  },
  ...Array.from({ length: 6 }, (_, index) => ({
    id: `course-${index + 4}`,
    title: `Course ${index + 4}`,
    instructor: 'Various Authors',
    rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
    reviews: Math.floor(Math.random() * 1000) + 500,
    description: `${Math.floor(Math.random() * 20) + 20} Total Hours. ${Math.floor(Math.random() * 100) + 100} Lectures. ${['Beginner', 'Intermediate', 'Advanced'][Math.floor(Math.random() * 3)]}`,
    price: Math.floor(Math.random() * 100) + 99,
    thumbnail: courseImg,
    chapters: Math.floor(Math.random() * 10) + 15,
    category: ['Design', 'Development', 'Business'][Math.floor(Math.random() * 3)],
    hours: Math.floor(Math.random() * 30) + 15,
    lectures: Math.floor(Math.random() * 100) + 100,
    level: ['Beginner', 'Intermediate', 'Advanced'][Math.floor(Math.random() * 3)] as 'Beginner' | 'Intermediate' | 'Advanced'
  }))
];

export default courses;