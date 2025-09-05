/* eslint-disable @typescript-eslint/no-unused-vars */
import { BsAward } from "react-icons/bs";
import { PiGraduationCap } from "react-icons/pi";
import { IoPlayOutline } from "react-icons/io5";

import Header3 from "../Components/shared/Header3";
import Footer from "../Components/Layout/Footer";
import CourseSidebar from "../Components/cards/CourseSidebar2";
import CourseCard from "../Components/cards/CourseCard";
import Rating from "../Components/cards/RatingSummary";
import ReviewCard from "../Components/cards/ReviewCard";

import Image from "../assets/Images/Ellipse 19.jpg";
import "../Styles/OrderCompletePage.css";

import type { Course } from "../Types/Course";
import type { JSX } from "react";

// Static data
const courses: Course[] = [
  // Same course objects as before...
];

const reviewsSummary = {
  average: 4.6,
  totalReviews: 1000,
  breakdown: [
    { stars: 5, percentage: 80 },
    { stars: 4, percentage: 10 },
    { stars: 3, percentage: 5 },
    { stars: 2, percentage: 3 },
    { stars: 1, percentage: 2 },
  ],
};

const OrderComplete = (): JSX.Element => {
  const slideWidth = "25% + 7.5px"; // Default static width

  return (
    <>
      <Header3 />

      <div className="order-complete-page">
        <div className="order-complete-container">
          <h1 className="course-title">Introduction to User Experience Design</h1>

          <div className="content-grid">
            {/* Left Column */}
            <div className="left-column">
              {/* Video */}
              <div className="video-wrapper">
                <iframe
                  width="565"
                  height="318"
                  src="https://www.youtube.com/embed/IQWOeVgy5gI"
                  title="User-Centered Design"
                  style={{ border: "0" }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="course-video"
                ></iframe>
              </div>

              {/* Tabs */}
              <div className="tabs">
                <a href="#course-details" className="active">Details</a>
                <a href="#instructor-details">Instructor</a>
                <a href="#more-courses">Courses</a>
                <a href="#reviews-section">Reviews</a>
              </div>

              {/* Course Overview */}
              <section className="course-details" id="course-details">
                <h2>Course Overview</h2>
                <p>
                  Embark on a transformative journey into the dynamic world of UX Design...
                </p>
                <h2>Key Learning Objectives</h2>
                <ul>
                  <li>Gain understanding of UX Design and its importance</li>
                  <li>Explore user-centered design principles</li>
                  <li>Understand elements of positive user experience</li>
                </ul>
              </section>

              {/* Instructor */}
              <section className="instructor-details" id="instructor-details">
                <h2>Instructor</h2>
                <span className="instructor-name">Ronald Richards</span>
                <h2 className="instructor-role">UI/UX Designer</h2>

                <div className="instructor-profile">
                  <img
                    src={Image}
                    alt="Instructor Ronald Richards"
                    className="instructor-avatar"
                  />
                  <div className="instructor-meta">
                    <div><BsAward size={18} /> <span>40,445 Reviews</span></div>
                    <div><PiGraduationCap size={18} /> <span>500 Students</span></div>
                    <div><IoPlayOutline size={18} /> <span>15 Courses</span></div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column */}
            <div className="right-column">
              <CourseSidebar />
            </div>
          </div>

          {/* More Courses Section */}
          <section className="more-courses" id="more-courses">
            <div className="section-header2">
              <h2>
                More Courses by <span style={{ color: "blue" }}>Ronald Richards</span>
              </h2>
              <div className="scroll-controls">
                <button disabled>&lt;</button>
                <button disabled>&gt;</button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Carousel - Static */}
      <div className="container">
        <div className="carousel-wrapper">
          <div
            className="carousel-track"
            style={{
              transform: `translateX(0)`,
              transition: "transform 0.4s ease",
            }}
          >
            {courses.map((course, i) => (
              <CourseCard key={i} course={course} />
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="container">
        <section className="reviews-section" id="reviews-section">
          <h2>Learner Reviews</h2>
          <div className="reviews-grid">
            <div className="rating-summary">
              <Rating summary={reviewsSummary} />
            </div>
            <aside className="reviews-list">
              <ReviewCard
                review={{
                  id: "1",
                  userAvatar: Image,
                  userName: "John Doe",
                  rating: 5,
                  date: new Date().toISOString(),
                  reviewText:
                    "I was initially apprehensive, but the instructor was amazing.",
                }}
              />
              <ReviewCard
                review={{
                  id: "2",
                  userAvatar: Image,
                  userName: "Jane Smith",
                  rating: 4,
                  date: new Date().toISOString(),
                  reviewText:
                    "Well-structured course with a solid foundation in design principles.",
                }}
              />
              <ReviewCard
                review={{
                  id: "3",
                  userAvatar: Image,
                  userName: "Alice Johnson",
                  rating: 5,
                  date: new Date().toISOString(),
                  reviewText:
                    "Exceeded my expectations! Passionate instructor and great community.",
                }}
              />
            </aside>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default OrderComplete;
