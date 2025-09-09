/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import type { Course } from "../Types/Course";
import CourseCard from "./cards/CourseCard";
import styles from "../Components/ComponentStyles/CoursesByMentor.module.css";

interface Props {
  mentorId: string | { _id?: string; id?: string };
}


const CoursesByMentor: React.FC<Props> = ({ mentorId }) => {
  console.log('CoursesByMentor - Received mentorId:', mentorId, typeof mentorId);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const mentorIdString = typeof mentorId === 'object' ? mentorId._id || mentorId.id : mentorId;
        console.log('CoursesByMentor - Using mentorIdString:', mentorIdString);
        const response = await axios.get<Course[]>(
          `https://byway-hoce.onrender.com/api/instructors/${mentorIdString}/courses`
        );
        setCourses(response.data);
      } catch (err) {
        setError("Failed to fetch courses by this mentor.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [mentorId]);

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>{error}</p>;
  if (courses.length === 0) return <p>No courses found for this mentor.</p>;

  return (
    <div className={styles.container}>
      <h2>Courses Taught by This Mentor</h2>
      <div className={styles.grid}>
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CoursesByMentor;
