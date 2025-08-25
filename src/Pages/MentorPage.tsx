import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { fetchMentors } from "../store/slices/mentorSlice";
import { fetchCourses } from "../store/slices/courseSlice";

import Header1 from "../Components/shared/Header1";
import Footer from "../Components/Layout/Footer";
import CourseCard from "../Components/cards/CourseCard2";
import Rating from "../Components/cards/RatingSummary";
import Review from "../Components/cards/ReviewCard";
import Image from "../assets/Images/Ellipse 19.jpg";

import "../Styles/MentorPage.css";

const MentorsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // mentor state
 const mentorsState = useSelector((state: RootState) => state.mentors);
 const coursesState = useSelector((state: RootState) => state.courses);

 const { data: mentors = [], loading: mentorsLoading = false, error: mentorsError = null } = mentorsState || {};
 const { data: courses = [], loading: coursesLoading = false, error: coursesError = null } = coursesState || {};


  useEffect(() => {
    if (mentors.length === 0) dispatch(fetchMentors());
    if (courses.length === 0) dispatch(fetchCourses());
  }, [dispatch, mentors.length, courses.length]);

  if (mentorsLoading || coursesLoading) return <p>Loading...</p>;
  if (mentorsError) return <p>Error: {mentorsError}</p>;
  if (coursesError) return <p>Error: {coursesError}</p>;

  // For now, just display the first mentor
  const mentor = mentors[0];
  if (!mentor) return <p>No mentor found.</p>;

  return (
    <>
      <Header1 />

      {/* Mentor Profile */}
      <section className="instructor-container">
        <div className="instructor-header">
          <div>
            <p className="instructor-label">INSTRUCTOR</p>
            <h1 className="instructor-name">{mentor.name}</h1>
            <p className="instructor-title">{mentor.role}</p>
            <div className="instructor-stats">
              <span>
                <strong>{mentor.students.toLocaleString()}</strong> Students
              </span>
              <span>
                <strong>{mentor.rating}</strong> Rating
              </span>
            </div>
          </div>

          <div className="instructor-profile">
            <img
              src={mentor.image}
              alt={mentor.name}
              className="instructor-img"
            />
          </div>
        </div>
      </section>

      {/* Mentor’s Courses */}
      <section className="more-courses">
        <h2>More Courses by {mentor.name}</h2>
        <CourseCard mentorId={mentor.id} />
      </section>

      {/* Rating Summary + Reviews */}
      <div className="rating-container-section">
        <div className="ratings-section">
          <Rating
            summary={{
              average: mentor.rating,
              totalReviews: 1000, // replace with real data when available
              breakdown: [
                { stars: 5, percentage: 80 },
                { stars: 4, percentage: 10 },
                { stars: 3, percentage: 5 },
                { stars: 2, percentage: 3 },
                { stars: 1, percentage: 2 },
              ],
            }}
          />
        </div>

        <aside className="reviews-section">
          <h2>Learner Reviews</h2>
          <Review
            review={{
              id: "1",
              userAvatar: Image,
              userName: "John Doe",
              rating: 5,
              date: new Date().toISOString(),
              reviewText:
                "This mentor explained concepts so clearly. I learned a lot!",
            }}
            className="review-card"
          />
        </aside>
      </div>

      <Footer />
    </>
  );
};

export default MentorsPage;
