
// src/Components/CoursePage.tsx

import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState, AppDispatch } from "../store/index";
import { fetchCourseById, selectSelectedCourse } from "../store/slices/courseSlice";
import { getAverageRating, getReviews, selectAverageRatings, selectReviewsByTargetId, selectReviewsLoading } from "../store/slices/reviewsSlice";
import type { AverageRating, Review } from "../Types/rating";
import CourseDetails from "../Components/CourseHero";
import CourseSidebar from "../Components/CourseSidebar";
import CourseContent from "../Components/CourseContent";
import RelatedCourses from "../Components/RelatedCourses";
import TestimonialCard from "../Components/TestimonialsSection";
import Breadcrumb from "../Components/Breadcrumb";
import ReviewCard from "../Components/cards/ReviewCard"; // Correct component name from your code
import RatingSummary from "../Components/cards/RatingSummary"; // Correct component name from your code
import AddReviewForm from "../Components/cards/AddReviewForm";
import styles from "../Styles/CourseDetailsPage.module.css";

const CoursePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const selectedCourse = useSelector(selectSelectedCourse);
  const loadingCourse = useSelector((state: RootState) => state.courses.loading);
  const courseError = useSelector((state: RootState) => state.courses.error);
  
  const allAverageRatings = useSelector(selectAverageRatings);
  const allReviews = useSelector(selectReviewsByTargetId);
  const loadingReviews = useSelector(selectReviewsLoading);
  const reviewError = useSelector((state: RootState) => state.reviews.error);

  // The definitive fix for the type error.
  // We explicitly check for existence before assigning to ensure the type is correct.
  const averageRating: AverageRating | null = courseId && allAverageRatings[courseId] ? allAverageRatings[courseId] : null;
  const reviews: Review[] = courseId && allReviews[courseId] ? allReviews[courseId] : [];

  const fetchReviewsData = useCallback(() => {
    if (courseId) {
      dispatch(getAverageRating(courseId));
      dispatch(getReviews(courseId));
    }
  }, [dispatch, courseId]);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseById(courseId));
      fetchReviewsData();
    }
  }, [dispatch, courseId, fetchReviewsData]);

  if (loadingCourse) return <p>Loading course...</p>;
  if (courseError) return <p>Error: {courseError}</p>;
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
          
          <div className={styles.reviewsSection}>
            <ReviewCard averageRating={averageRating} />
            <AddReviewForm courseId={courseId as string} onReviewAdded={fetchReviewsData} />
            {loadingReviews ? (
              <p>Loading reviews...</p>
            ) : reviewError ? (
                <p>Error: {reviewError}</p>
            ) : (
              <RatingSummary reviews={reviews} />
            )}
          </div>

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