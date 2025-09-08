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
    _id: "mentor-1",
    id: "mentor-1",
    name: "Ronald Richards",
    firstName: "Ronald",
    lastName: "Richards",
    email: "ronald@example.com",
    role: "mentor",
    profession: "UI/UX Designer",
    avgRating: 4.9,
    studentsCount: 2400,
    image: mentorImg,
  },
  {
    _id: "mentor-2",
    id: "mentor-2",
    name: "Ronald Richards",
    firstName: "Ronald",
    lastName: "Richards",
    email: "ronald2@example.com",
    role: "mentor",
    profession: "UI/UX Designer",
    avgRating: 4.9,
    studentsCount: 2400,
    image: mentorImg,
  },
  {
    _id: "mentor-3",
    id: "mentor-3",
    name: "Ronald Richards",
    firstName: "Ronald",
    lastName: "Richards",
    email: "ronald3@example.com",
    role: "mentor",
    profession: "UI/UX Designer",
    avgRating: 4.9,
    studentsCount: 2400,
    image: mentorImg,
  },
  {
    _id: "mentor-4",
    id: "mentor-4",
    name: "Ronald Richards",
    firstName: "Ronald",
    lastName: "Richards",
    email: "ronald4@example.com",
    role: "mentor",
    profession: "UI/UX Designer",
    avgRating: 4.9,
    studentsCount: 2400,
    image: mentorImg,
  },
  {
    _id: "mentor-5",
    id: "mentor-5",
    name: "Ronald Richards",
    firstName: "Ronald",
    lastName: "Richards",
    email: "ronald5@example.com",
    role: "mentor",
    profession: "UI/UX Designer",
    avgRating: 4.9,
    studentsCount: 2400,
    image: mentorImg,
  },
  {
    _id: "mentor-6",
    id: "mentor-6",
    name: "Ronald Richards",
    firstName: "Ronald",
    lastName: "Richards",
    email: "ronald6@example.com",
    role: "mentor",
    profession: "UI/UX Designer",
    avgRating: 4.9,
    studentsCount: 2400,
    image: mentorImg,
  },
];

export default mentors;
