/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState, AppDispatch } from "../store/index";
import { fetchMentorById } from "../store/slices/mentorSlice";
import MentorDetails from "../Components/MentorDetail";
import MentorReviews from "../Components/ComponentStyles/MentorReviews.module.css";
import CoursesByMentor from "../Components/ComponentStyles/CoursesByMentor.module.css";
import styles from "../Styles/MentorPage.module.css";
import Header2 from "../Components/shared/Header2";
import Footer from "../Components/Layout/Footer";
import TestimonialCard from "../Components/TestimonialsSection";
import Breadcrumb from "../Components/Breadcrumb";

const MentorPage: React.FC = () => {
  const { mentorId } = useParams<{ mentorId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedMentor, loading, error } = useSelector(
    (state: RootState) => state.mentors
  );

  const fetchData = () => {
    if (mentorId) {
      dispatch(fetchMentorById(mentorId));
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, mentorId]);

  if (loading) return <p>Loading mentor...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!selectedMentor) return <p>No mentor found.</p>;

  const breadcrumbLinks = [
    { label: "Home", path: "/" },
    { label: "Mentors", path: "/mentors" },
    { label: selectedMentor.name, path: `/mentors/${selectedMentor.id}` },
  ];

  return (
    <>
      <Header2 />
      <Breadcrumb links={breadcrumbLinks} />
      <div className={styles.mentorPage}>
        <div className={styles.mainContent}>
          <MentorDetails mentor={selectedMentor} />
          <MentorReviews mentor={selectedMentor} onReviewAdded={fetchData} />
          <CoursesByMentor mentorId={selectedMentor.id} />
          <TestimonialCard />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MentorPage;