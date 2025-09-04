// pages/CoursePage.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState, AppDispatch } from "../store";
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

  const { data: courses, loading, error } = useSelector(
    (state: RootState) => state.courses
  );
  const currentCourse = courses.find((c) => c._id === id);

  // Fetch on mount/param change if we don't already have the course
  useEffect(() => {
    if (id && !currentCourse && loading !== "pending") {
      dispatch(fetchCourseById(id));
    }
  }, [dispatch, id, currentCourse, loading]);

  // Loading state
  if (loading === "pending" || (loading === "idle" && !currentCourse)) {
    return (
      <>
        <Header2 />
        <main className={styles.main}>
          <p>Loading course…</p>
        </main>
        <Footer />
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Header2 />
        <main className={styles.main}>
          <p>Error: {error}</p>
        </main>
        <Footer />
      </>
    );
  }

  // Not found state (after API finished successfully but course still missing)
  if (!currentCourse && loading === "succeeded") {
    return (
      <>
        <Header2 />
        <main className={styles.main}>
          <p>No course found.</p>
        </main>
        <Footer />
      </>
    );
  }

  // Safe to render course
  const breadcrumbLinks = [
    { label: "Home", path: "/" },
    { label: "Categories", path: "/categories" },
    { label: currentCourse!.title, path: `/courses/${currentCourse!._id}` },
  ];

  return (
    <>
      <Header2 />
      <main className={styles.main}>
        <Breadcrumb links={breadcrumbLinks} />
        <div className={styles.coursePage}>
          <div className={styles.mainContent}>
            <CourseDetails course={currentCourse!} />
            <CourseContent course={currentCourse!} />
          </div>

          <div className={styles.sidebar}>
            <CourseSidebar course={currentCourse!} />
          </div>

          <div className={styles.review}>
            <Reviews
              course={currentCourse!}
              onReviewAdded={() => id && dispatch(fetchCourseById(id))}
            />
            <TestimonialCard />
            <RelatedCourses />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CoursePage;
