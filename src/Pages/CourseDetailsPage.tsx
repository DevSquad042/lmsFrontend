import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState, AppDispatch } from "../store/index";
import { fetchCourseById } from "../store/slices/coursesSlice";
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

const CoursePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  // ✅ Correct slice shape
  const selectedCourse = useSelector((state: RootState) => state.courses.selected);
  const loading = useSelector((state: RootState) => state.courses.loading);
  const error = useSelector((state: RootState) => state.courses.error);

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
  if (!selectedCourse) return <p>No course found.</p>;

  const breadcrumbLinks = [
    { label: "Home", path: "/" },
    { label: "Categories", path: "/categories" },
    { label: selectedCourse.title, path: `/courses/${selectedCourse._id}` },
  ];

  return (
    <>
      <Header2 />

      <main className={styles.main}>
        <Breadcrumb links={breadcrumbLinks} />
        <div className={styles.coursePage}>
          <div className={styles.mainContent}>
            <CourseDetails course={selectedCourse} />
            <CourseContent course={selectedCourse} />
          </div>
          <div className={styles.sidebar}>
            <CourseSidebar course={selectedCourse} />
          </div>

          <div className={styles.review}>
            <Reviews course={selectedCourse} onReviewAdded={fetchData} />
            <TestimonialCard />
            {/* ✅ Pass categories & excludeId so RelatedCourses can filter */}
            <RelatedCourses
              categories={selectedCourse.categories}
              excludeId={selectedCourse._id}
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CoursePage;
