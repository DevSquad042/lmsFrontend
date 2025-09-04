import type { Mentor } from "../Types/Mentor";
import mentorImg from "../assets/Images/mentor.jpg";

/**
 * ISSUES FIXED:
 * 1. All mentors were identical objects (sharing same reference)
 * 2. Missing unique IDs
 * EDUCATION: Always create unique objects, especially when dealing with lists
 */
export const mentors: Mentor[] = [
  {
    id: "mentor-1",
    firstName: "Ronald",
    lastName: "Richards",
    profession: "UI/UX Designer",
    rating: 4.9,
    studentsCount: 2400,
    image: mentorImg,
  },
  {
    id: "mentor-2",
    firstName: "Ronald",
    lastName: "Richards",
    profession: "UI/UX Designer",
    rating: 4.9,
    studentsCount: 2400,
    image: mentorImg,
  },
  {
    id: "mentor-3",
    firstName: "Ronald",
    lastName: "Richards",
    profession: "UI/UX Designer",
    rating: 4.9,
    studentsCount: 2400,
    image: mentorImg,
  },
  {
    id: "mentor-4",
    firstName: "Ronald",
    lastName: "Richards",
    profession: "UI/UX Designer",
    rating: 4.9,
    studentsCount: 2400,
    image: mentorImg,
  },
  {
    id: "mentor-5",
    firstName: "Ronald",
    lastName: "Richards",
    profession: "UI/UX Designer",
    rating: 4.9,
    studentsCount: 2400,
    image: mentorImg,
  },
  {
    id: "mentor-6",
    firstName: "Ronald",
    lastName: "Richards",
    profession: "UI/UX Designer",
    rating: 4.9,
    studentsCount: 2400,
    image: mentorImg,
  },
];

export default mentors;
