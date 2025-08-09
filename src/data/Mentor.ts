import type { Mentor } from '../Types/Mentor';
import mentorImg from '../assets/Images/mentor.jpg';

/**
 * ISSUES FIXED:
 * 1. All mentors were identical objects (sharing same reference)
 * 2. Missing unique IDs
 * EDUCATION: Always create unique objects, especially when dealing with lists
 */
export const mentors: Mentor[] = [
  {
    id: 'mentor-1',
    name: 'Ronald Richards',
    role: 'UI/UX Designer',
    rating: 4.9,
    students: 2400,
    image: mentorImg
  },
  {
    id: 'mentor-2',
    name: 'Sarah Johnson',
    role: 'Frontend Developer',
    rating: 4.8,
    students: 1900,
    image: mentorImg
  },
  {
    id: 'mentor-3',
    name: 'Michael Chen',
    role: 'Full Stack Developer',
    rating: 4.7,
    students: 3200,
    image: mentorImg
  },
  {
    id: 'mentor-4',
    name: 'Emily Davis',
    role: 'Product Designer',
    rating: 4.9,
    students: 2100,
    image: mentorImg
  },
  {
    id: 'mentor-5',
    name: 'Alex Thompson',
    role: 'Mobile Developer',
    rating: 4.6,
    students: 1700,
    image: mentorImg
  },
  {
    id: 'mentor-6',
    name: 'Lisa Wang',
    role: 'Data Scientist',
    rating: 4.8,
    students: 2800,
    image: mentorImg
  }
];

export default mentors;