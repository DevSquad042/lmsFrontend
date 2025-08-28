import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState, AppDispatch } from "../store/store";
import { fetchCourseById } from "../store/slices/courseSlice";
import CourseDetails from "../Components/cards/CourseCard";
import CourseSidebar from "../Components/CourseSidebar";
import Reviews from "../Components/Rating";
import CourseContent from "../Components/CourseContent"; // Import the new component
import styles from "../Styles/CourseDetailsPage.module.css";

const CoursePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedCourse, loading, error } = useSelector(
    (state: RootState) => state.courses
  );

  const fetchData = () => {
    if (courseId) {
      dispatch(fetchCourseById(courseId));
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, courseId]);

  if (loading) return <p>Loading course...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!selectedCourse) return <p>No course found.</p>;

  return (
    <div className={styles.coursePage}>
      <div className={styles.mainContent}>
        <CourseDetails course={selectedCourse} />
        <CourseContent course={selectedCourse} />
        <Reviews course={selectedCourse} onReviewAdded={fetchData} />
      </div>
      <CourseSidebar course={selectedCourse} />
    </div>
  );
};

export default CoursePage;