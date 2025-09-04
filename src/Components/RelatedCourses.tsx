import React from "react";
import CourseCard from "./cards/CourseCard"; // Fixed import path
import "./ComponentStyles/RelatedCourses.css";
import type { Course } from "../Types/Course"; // Import the proper type
import courseImg from "../assets/Images/course.jpg";

const RelatedCourses: React.FC = () => {
  // Use a proper Course array with unique data
  const courses: Course[] = [
    {
      _id: "top-course-1",
      title: "Beginner's Guide to Design",
      instructor: "Ronald Richards",
      rating: 5,
      reviews: [],
      description: "22 Total Hours. 155 Lectures. Beginner",
      price: 149.9,
      thumbnail: courseImg,
      chapters: 18,
      categories: ["Design"],
      hours: 22, // Renamed from totalHours
      lectures: 155, // Renamed from totalLectures
      level: "Beginner",
    },
    {
      _id: "top-course-2",
      title: "Beginner's Guide to Design",
      instructor: "Ronald Richards",
      rating: 5,
      reviews: [],
      description: "22 Total Hours. 155 Lectures. Beginner",
      price: 149.9,
      thumbnail: courseImg,
      chapters: 18,
      categories: ["Design"],
      hours: 22, // Renamed from totalHours
      lectures: 155, // Renamed from totalLectures
      level: "Beginner",
    },
    {
      _id: "top-course-3",
      title: "Beginner's Guide to Design",
      instructor: "Ronald Richards",
      rating: 5,
      reviews: [],
      description: "22 Total Hours. 155 Lectures. Beginner",
      price: 149.9,
      thumbnail: courseImg,
      chapters: 18,
      categories: ["Design"],
      hours: 22, // Renamed from totalHours
      lectures: 155, // Renamed from totalLectures
      level: "Beginner",
    },
    {
      _id: "top-course-4",
      title: "Beginner's Guide to Design",
      instructor: "Ronald Richards",
      rating: 5,
      reviews: [],
      description: "22 Total Hours. 155 Lectures. Beginner",
      price: 149.9,
      thumbnail: courseImg,
      chapters: 18,
      categories: ["Design"],
      hours: 22, // Renamed from totalHours
      lectures: 155, // Renamed from totalLectures
      level: "Beginner",
    },
  ];

  return (
    <section className="top-courses">
      <header className="top-courses-header">
        <h2 className="top-courses-title">Related Courses</h2>
        <a
          href="/courses"
          className="top-courses-see-all"
          aria-label="View all courses"
        >
          See All
        </a>
      </header>

      <div className="top-courses-grid">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </section>
  );
};

export default RelatedCourses;
