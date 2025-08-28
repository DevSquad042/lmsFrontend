import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { fetchMentors } from "../store/slices/mentorSlice";
import { fetchCourses } from "../store/slices/courseSlice";

import Header1 from "../Components/shared/Header1";
import Footer from "../Components/Layout/Footer";
import CourseCard from "../Components/cards/CourseCard";
import Rating from "../Components/cards/RatingSummary";
import Review from "../Components/cards/ReviewCard";
import Image from "../assets/Images/Ellipse 19.jpg";

import "../Styles/MentorPage.css";

const MentorsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // ✅ Defensive destructuring for mentors
  const mentorState = useSelector((state: RootState) => state.mentors);
  const mentors = mentorState?.data ?? [];
  const mentorsLoading = mentorState?.loading ?? false;
  const mentorsError = mentorState?.error ?? null;

  // ✅ Defensive destructuring for courses
  const courseState = useSelector((state: RootState) => state.courses);
  const coursesLoading = courseState?.loading ?? false;
  const coursesError = courseState?.error ?? null;

  useEffect(() => {
    if (mentors.length === 0) dispatch(fetchMentors());
    dispatch(fetchCourses());
  }, [dispatch, mentors.length]);

  const mentor = mentors[0]; // Example: show first mentor

  return (
    <>
      <Header1 />

      {/* Mentor Profile */}
      <section className="instructor-container">
        {mentorsLoading ? (
          <p>Loading mentor...</p>
        ) : mentorsError ? (
          <p>Error: {mentorsError}</p>
        ) : mentor ? (
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
        ) : (
          <p>No mentor found.</p>
        )}
      </section>

      {/* Mentor’s Courses */}
      <section className="more-courses">
        <h2>More Courses by {mentor?.name || "this mentor"}</h2>
        {coursesLoading ? (
          <p>Loading courses...</p>
        ) : coursesError ? (
          <p>Error: {coursesError}</p>
        ) : mentor ? (
          <CourseCard mentorId={mentor.id} />
        ) : (
          <p>No courses available.</p>
        )}
      </section>

      {/* Rating Summary + Reviews */}
      <div className="rating-container-section">
        <div className="ratings-section">
          <Rating
            summary={{
              average: mentor?.rating || 0,
              totalReviews: 1000,
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
