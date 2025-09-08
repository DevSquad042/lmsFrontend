import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState, AppDispatch } from "../store/index";
import { fetchCourseById } from "../store/slices/coursesSlice";
import CourseDetails from "../Components/CourseHero";
import CourseSidebar from "../Components/CourseSidebar";
import CourseContent from "../Components/CourseContent";
import RelatedCourses from "../Components/RelatedCourses";
import TestimonialCard from "../Components/TestimonialsSection";
import Breadcrumb from "../Components/Breadcrumb";
import styles from "../Styles/CourseDetailsPage.module.css";

import Header2 from "../Components/shared/Header2";
import Footer from "../Components/Layout/Footer";
import { BsAward } from "react-icons/bs";
import { PiGraduationCap } from "react-icons/pi";
import { IoPlayOutline } from "react-icons/io5";
import Image from "../assets/Images/Ellipse 19.jpg";
import Rating from "../Components/cards/RatingSummary";
import ReviewCard from "../Components/cards/ReviewCard";

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

const CoursePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

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
       
        <div className={styles.coursePage}>
          <div className={styles.mainContent}>
           <div className={styles.detailsss}>
            <Breadcrumb links={breadcrumbLinks} />
             <CourseDetails course={selectedCourse} />

            {/* Tabs */}
            <div className={styles.tabss}>
              <a href="#course-details" className="active">Details</a>
              <a href="#instructor-details">Instructor</a>
              <a href="#syllabus-details">Courses</a>
              <a href="#reviews-section">Reviews</a>
            </div>

           
          </div>
           <CourseSidebar course={selectedCourse} />
          </div>


           {/* Course Overview */}
            <section className={styles.courseDetailss}>
              <h2>Course Overview</h2>
              <p>
                This interactive e-learning course is designed to give you a solid foundation in the subject area while keeping learning practical,
                 engaging, and easy to follow. Through step-by-step modules,
                 you’ll explore core concepts, proven strategies, and hands-on applications that prepare you for real-world scenarios.
              </p>
              <h2>Certificate</h2>
              <p>
                At Byway, we understand the significance of formal recognition for your hard work and dedication to continuous learning. <br />Upon successful completion of our courses, you will earn a prestigious certification that not only validates your expertise <br />but also opens doors to new opportunities in your chosen field.
              </p>
            </section>

            {/* Instructor */}
            <section className={styles.instructorDetails}>

              <div className={styles.instructorInfo}>
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
              <p className={styles.textss}>With over a decade of industry experience, Ronald brings a wealth of practical knowledge to the classroom. He <br /> has played  a pivotal role in designing user-centric interfaces for renowned tech companies, ensuring seamless <br /> brand engaging user experiences.</p>
              </div>
             
                 <CourseContent course={selectedCourse} />
            </section>

         
{/*             
          <div className={styles.sidebar}>
           </div> */}
           


          <div className={styles.review}>
            <div className="container">
              <section className="reviews-section" id="reviews-section">
                {/* <h2>Learner Reviews</h2> */}
                <div className="reviews-grid">
                  <div className="rating-summary">
                    <Rating summary={reviewsSummary} />
                  </div>
                  <aside className="reviews-list">
                    <div className={styles.groupedReviews}>
                      <ReviewCard className={styles.reviewsss}
                      review={{
                        id: "1",
                        userAvatar: Image,
                        userName: "John Doe",
                        rating: 5,
                        date: new Date().toISOString(),
                        reviewText: "I was initially apprehensive, but the instructor was amazing.",
                      }}
                    />
                    <ReviewCard className={styles.reviewsss}
                      review={{
                        id: "2",
                        userAvatar: Image,
                        userName: "Jane Smith",
                        rating: 4,
                        date: new Date().toISOString(),
                        reviewText: "Well-structured course with a solid foundation in design principles.",
                      }}
                    />
                    <ReviewCard className={styles.reviewsss}
                      review={{
                        id: "3",
                        userAvatar: Image,
                        userName: "Alice Johnson",
                        rating: 5,
                        date: new Date().toISOString(),
                        reviewText: "Exceeded my expectations! Passionate instructor and great community.",
                      }}
                    />
                   
                   <button className={styles.button}>View more</button>

                    </div>
                   
                  </aside>
                </div>
              </section>

              <TestimonialCard />
              <RelatedCourses
                categories={selectedCourse.categories}
                excludeId={selectedCourse._id}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CoursePage;