import type { ExpertsProps } from '../Components/cards/Experts';
import mentorImg from '../assets/mentor.jpg';

export const mentors: ExpertsProps[] = Array(6).fill({
  id: undefined, // Optional ID for unique identification
  name: 'Ronald Richards',
  role: 'UI/UX Designer',
  rating: 4.9,
  students: 2400,
  image: mentorImg
});

 
