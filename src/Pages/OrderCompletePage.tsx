import { useEffect, useState } from "react";
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

const courses: Course[] = [
   {
    _id: "1",
    title: "Beginner's Guide to UX Design",
    instructor: "Ronald Richards",
    rating: 4.5,
    reviews: 1245,
    details: "Learn the foundations of UX design and user-centered principles.",
    price: 149.0,
    thumbnail: "/images/course1.jpg",
  },
  {
    _id: "2",
    title: "Beginner's Guide to UX Design",
    instructor: "Ronald Richards",
    rating: 4.5,
    reviews: 1245,
    details: "Learn the foundations of UX design and user-centered principles.",
    price: 149.0,
    thumbnail: "/images/course1.jpg",
  },
   {
    _id: "3",
    title: "Beginner's Guide to UX Design",
    instructor: "Ronald Richards",
    rating: 4.5,
    reviews: 1245,
    details: "Learn the foundations of UX design and user-centered principles.",
    price: 149.0,
    thumbnail: "/images/course1.jpg",
  },
  {
    _id: "4",
    title: "Beginner's Guide to UX Design",
    instructor: "Ronald Richards",
    rating: 4.5,
    reviews: 1245,
    details: "Learn the foundations of UX design and user-centered principles.",
    price: 149.0,
    thumbnail: "/images/course1.jpg",
  },
   {
    _id: "5",
    title: "Beginner's Guide to UX Design",
    instructor: "Ronald Richards",
    rating: 4.5,
    reviews: 1245,
    details: "Learn the foundations of UX design and user-centered principles.",
    price: 149.0,
    thumbnail: "/images/course1.jpg",
  },
   {
    _id: "6",
    title: "Beginner's Guide to UX Design",
    instructor: "Ronald Richards",
    rating: 4.5,
    reviews: 1245,
    details: "Learn the foundations of UX design and user-centered principles.",
    price: 149.0,
    thumbnail: "/images/course1.jpg",
  },
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

const OrderComplete = () => {
  const [index, setIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState("25% + 7.5px");
  const width = Number(slideWidth.split(" + ").at(0)?.replace("%", ""));

  useEffect(() => {
    const updateSlideWidth = () => {
      if (window.innerWidth >= 992) {
        setSlideWidth("25% + 7.5px"); 
      } else if (window.innerWidth >= 480) {
        setSlideWidth("50% + 15px"); 
      } else {
        setSlideWidth("100% + 30px");
      }
      setIndex(0);
    };

    updateSlideWidth();
    window.addEventListener("resize", updateSlideWidth);

    return () => window.removeEventListener("resize", updateSlideWidth);
  }, []);

  const next = () => {
    if (index < courses.length - 100 / width) {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };
  return (
    <>
      <Header3 />

      <div className="order-complete-page">
        <div className="order-complete-container">
          {/* Page Title */}
          <h1 className="course-title">
            Introduction to User Experience Design
          </h1>

          <div className="content-grid">
            {/* Left Column */}
            <div className="left-column">
              {/* Video Placeholder */}
              <div className="video-wrapper">
                <iframe
                  width="565"
                  height="318"
                  src="https://www.youtube.com/embed/IQWOeVgy5gI"
                  title="User-Centered Design - Creating Better Solutions for Global Challenges v5.mp4"
                  style={{ border: "0" }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="course-video"
                ></iframe>
              </div>

              {/* Tabs */}
              <div className="tabs">
                <a href="#course-details" className="active">
                  Details
                </a>
                <a href="#instructor-details">Instructor</a>
                <a href="#more-courses">Courses</a>
                <a href="#reviews-section">Reviews</a>
              </div>

              {/* Course Overview */}
              <section className="course-details" id="course-details">
                <h2>Course Overview</h2>
                <p>
                  Embark on a transformative journey into the dynamic world of
                  User Experience (UX) Design with our comprehensive course,
                  "Introduction to User Experience Design." This course is
                  meticulously crafted to provide you with a foundational
                  understanding of the principles, methodologies, and tools that
                  drive exceptional user experiences in the digital landscape.
                </p>

                <h2>Key Learning Objectives</h2>
                <ul>
                  <li>
                    Gain a clear understanding of what User Experience (UX)
                    Design entails and its importance in today's digital world
                  </li>
                  <li>
                    Explore the fundamental principles of user-centered design
                    and how to apply them to create intuitive and user-friendly
                    interfaces.
                  </li>
                  <li>
                    Learn about the various elements that contribute to a
                    positive user experience, including information
                    architecture, interaction design, and visual design.
                  </li>
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
                    <div>
                      <BsAward size={18} style={{ fontWeight: "bold" }} />{" "}
                      <span>40,445 Reviews</span>
                    </div>
                    <div>
                      <PiGraduationCap
                        size={18}
                        style={{ fontWeight: "bold" }}
                      />{" "}
                      <span>500 Students</span>
                    </div>
                    <div>
                      <IoPlayOutline size={18} style={{ fontWeight: "bold" }} />{" "}
                      <span>15 Courses</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column */}
            <div className="right-column">
              <CourseSidebar />
            </div>
          </div>
          {/* More Courses */}
          <section className="more-courses" id="more-courses">
            <div className="section-header2">
              <h2>
                More Courses by{" "}
                <span style={{ color: "blue" }}>Ronald Richards</span>
              </h2>
              <div className="scroll-controls">
                <button onClick={prev}>&lt;</button>
                <button onClick={next}>&gt;</button>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="container">
        <div className="carousel-wrapper">
          <div
            className="carousel-track"
           style={{
  transform: `translateX(calc(-${index} * (${slideWidth})))`,
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
                    "I was initially apprehensive, having no prior design experience. But the instructor did an amazing job of breaking down complex concepts into easily digestible modules.",
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
                    "The course was well-structured and provided a solid foundation in design principles. The hands-on projects were great.",
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
                    "This course exceeded my expectations! The instructor's passion for design is evident, and the community support was invaluable.",
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