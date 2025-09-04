import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState, AppDispatch } from "../store/index";
import { fetchCourseById } from '../store/slices/coursesSlice';
import CourseDetails from "../Components/CourseHero";
import CourseSidebar from "../Components/CourseSidebar";
import Reviews from "../Components/Rating";
import CourseContent from "../Components/CourseContent";
import RelatedCourses from "../Components/RelatedCourses";
import TestimonialCard from "../Components/TestimonialsSection";
import Breadcrumb from "../Components/Breadcrumb";
import styles from "../Styles/CourseDetailsPage.module.css";
import Header2 from "../Components/shared/Header2";
import Footer from "../Components/Layout/Footer";

const CourseDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { data :selectedCourse, loading, error } = useSelector(
    (state: RootState) => state.courses
  );
  const currentCourse = selectedCourse.find(course => course._id === id);

  const fetchData = useCallback(() => {
    if (id) {
      dispatch(fetchCourseById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    fetchData();
  }, [fetchData, id]);

  if (loading === "pending") return <p>Loading course...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!currentCourse) return <p>No course found.</p>;

  const breadcrumbLinks = [
    { label: "Home", path: "/" },
    { label: "Categories", path: "/categories" },
    { label: currentCourse.title, path: `/courses/${currentCourse._id}` },
  ];

  return (
    <>
    <Header2/>

    <main className={styles.main}>
      <Breadcrumb links={breadcrumbLinks} />
      <div className={styles.coursePage}>
        <div className={styles.mainContent}>
          <CourseDetails course={currentCourse} />
          <CourseContent course={currentCourse} />
          
        </div>
        <div className={styles.sidebar}>
          <CourseSidebar course={currentCourse} />
        </div>

        <div className={styles.review}>
          <Reviews course={currentCourse} onReviewAdded={fetchData} />
          <TestimonialCard />
          <RelatedCourses />
        </div>
      </div>
    
    </main>

      <Footer/>
    </>
  );
};

export default CourseDetailsPage;