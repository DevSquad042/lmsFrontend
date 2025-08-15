import type { Course } from "../Types/Course";
import courseImg from "../assets/Images/course.jpg";

/**
 * ISSUE: Original code generated the same course data 9 times
 * SOLUTION: Create more realistic and varied course data
 * EDUCATION: Always provide meaningful test data that represents real-world scenarios
 */
export const courses: Course[] = [
  {
    id: "course-1",
    title: "Beginner's Guide to Design",
    author: "Ronald Richards",
    rating: 5,
    reviews: 1200,
    details: "22 Total Hours. 155 Lectures. Beginner",
    price: 149.9,
    image: courseImg,
    chapters: 18,
    category: "Design",
    hours: 22,
    lectures: 155,
    level: "Beginner",
  },
  {
    id: "course-2",
    title: "Advanced React Development",
    author: "Sarah Johnson",
    rating: 4,
    reviews: 890,
    details: "35 Total Hours. 220 Lectures. Advanced",
    price: 199.9,
    image: courseImg,
    chapters: 25,
    category: "Development",
    hours: 35,
    lectures: 220,
    level: "Advanced",
  },
  {
    id: "course-3",
    title: "UI/UX Design Masterclass",
    author: "Michael Chen",
    rating: 5,
    reviews: 1500,
    details: "40 Total Hours. 180 Lectures. Intermediate",
    price: 179.9,
    image: courseImg,
    chapters: 22,
    category: "Design",
    hours: 40,
    lectures: 180,
    level: "Intermediate",
  },
  ...Array.from({ length: 6 }, (_, index) => ({
    id: `course-${index + 4}`,
    title: `Course ${index + 4}`,
    author: "Various Authors",
    rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
    reviews: Math.floor(Math.random() * 1000) + 500,
    details: `${Math.floor(Math.random() * 20) + 20} Total Hours. ${
      Math.floor(Math.random() * 100) + 100
    } Lectures. ${
      ["Beginner", "Intermediate", "Advanced"][Math.floor(Math.random() * 3)]
    }`,
    price: Math.floor(Math.random() * 100) + 99,
    image: courseImg,
    chapters: Math.floor(Math.random() * 10) + 15,
    category: ["Design", "Development", "Business"][
      Math.floor(Math.random() * 3)
    ],
    hours: Math.floor(Math.random() * 30) + 15,
    lectures: Math.floor(Math.random() * 100) + 100,
    level: ["Beginner", "Intermediate", "Advanced"][
      Math.floor(Math.random() * 3)
    ] as "Beginner" | "Intermediate" | "Advanced",
  })),
];

export default courses;
