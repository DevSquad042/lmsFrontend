import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState, AppDispatch } from "../store/index";
import { fetchCourseById } from "../store/slices/courseSlice";
import CourseDetails from "../Components/CourseHero";
import CourseSidebar from "../Components/CourseSidebar";
import Reviews from "../Components/Rating";
import CourseContent from "../Components/CourseContent";
import RelatedCourses from "../Components/RelatedCourses";
import TestimonialCard from "../Components/TestimonialsSection";
import Breadcrumb from "../Components/Breadcrumb";
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

  const breadcrumbLinks = [
    { label: "Home", path: "/" },
    { label: "Categories", path: "/categories" },
    { label: selectedCourse.title, path: `/courses/${selectedCourse.id}` },
  ];

  return (
    <>
      <Breadcrumb links={breadcrumbLinks} />
      <div className={styles.coursePage}>
        <div className={styles.mainContent}>
          <CourseDetails course={selectedCourse} />
          <CourseContent course={selectedCourse} />
          <Reviews course={selectedCourse} onReviewAdded={fetchData} />
          <TestimonialCard />
          <RelatedCourses />
        </div>
        <div className={styles.sidebar}>
          <CourseSidebar course={selectedCourse} />
        </div>
      </div>
    </>
  );
};

export default CoursePage;