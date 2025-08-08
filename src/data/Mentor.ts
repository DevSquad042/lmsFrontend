import type { Mentor } from '../Types/Mentor';
import mentorImg from '../assets/mentor.jpg';

export const mentors: Mentor[] = Array(6).fill({
  id: undefined, // Optional ID for unique identification
  name: 'Ronald Richards',
  role: 'UI/UX Designer',
  rating: 4.9,
  students: 2400,
  image: mentorImg
});

 
