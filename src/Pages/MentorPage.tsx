/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState, AppDispatch } from "../store/index";
import { fetchMentorById } from "../store/slices/mentorSlice";
import MentorDetails from "../Components/MentorDetail";
import MentorReviews from "../Components/MentorReviews";
import CoursesByMentor from "../Components/CourseByMentor";
import styles from "../Styles/MentorPage.module.css";
import Header2 from "../Components/shared/Header2";
import Footer from "../Components/Layout/Footer";
import TestimonialCard from "../Components/TestimonialsSection";
import Breadcrumb from "../Components/Breadcrumb";

const MentorPage: React.FC = () => {
  const { mentorId: urlMentorId } = useParams<{ mentorId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedMentor, loading, error } = useSelector(
    (state: RootState) => state.mentors
  );

  // Handle nested mentor data structure
  const mentorData = selectedMentor?.instructor || selectedMentor;
  const actualMentorId = mentorData?.id || mentorData?._id || urlMentorId;

  const fetchData = () => {
    if (urlMentorId) {
      console.log('MentorPage - Fetching mentor with ID:', urlMentorId);
      dispatch(fetchMentorById(urlMentorId));
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, urlMentorId]);

  // Debug logging
  useEffect(() => {
    console.log('MentorPage - Current state:', { selectedMentor, loading, error });
  }, [selectedMentor, loading, error]);

  if (loading === 'pending') return <p>Loading mentor...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!selectedMentor) return <p>No mentor found.</p>;

  const breadcrumbLinks = [
    { label: "Home", path: "/" },
    { label: "Mentors", path: "/mentors" },
    { label: mentorData?.name || "Mentor", path: `/mentors/${actualMentorId}` },
  ];

  return (
    <>
      <Header2 />
      <Breadcrumb links={breadcrumbLinks} />
      <div className={styles.mentorPage}>
        <div className={styles.mainContent}>
          <MentorDetails mentor={mentorData} />
          <MentorReviews mentor={mentorData} onReviewAdded={fetchData} />
          <CoursesByMentor mentorId={actualMentorId} />
          <TestimonialCard />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MentorPage;