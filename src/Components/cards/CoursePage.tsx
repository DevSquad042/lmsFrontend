import React from "react";
import "../ComponentStyles/CoursePage.css";
import Header1 from "../shared/Header1";
import Footer from "../Layout/Footer";

const CoursePage = () => {
  return (
    <>
      <Header1 />

      <div className="course-page">
        {/* Left Main Content */}
        <div className="course-main">
          {/* Video Player */}
          <div className="video-player">
            <img
              src="https://via.placeholder.com/600x300"
              alt="Course Thumbnail"
              className="video-thumbnail"
            />
            <button className="play-button">▶</button>
          </div>

          {/* Tabs */}
          <div className="course-tabs">
            <button className="tab active">Details</button>
            <button className="tab">Instructor</button>
            <button className="tab">Courses</button>
            <button className="tab">Reviews</button>
          </div>

          {/* Course Overview */}
          <section className="course-overview">
            <h2>Course Overview</h2>
            <p>
              Embark on a transformative journey into the dynamic world of User
              Experience (UX) Design with our comprehensive course,
              "Introduction to User Experience Design." This course is
              meticulously crafted to provide you with a foundational
              understanding of the principles, methodologies, and tools that
              drive exceptional user experiences in the digital landscape.
            </p>
          </section>

          {/* Key Learning Objectives */}
          <section className="learning-objectives">
            <h3>Key Learning Objectives</h3>
            <ul>
              <li>
                Gain a clear understanding of what User Experience (UX) Design
                entails and its importance in today’s digital world.
              </li>
              <li>
                Explore the fundamental principles of user-centered design and
                how to apply them to create intuitive and user-friendly
                interfaces.
              </li>
              <li>
                Learn about the various elements that contribute to a positive
                user experience, including information architecture, interaction
                design, and visual design.
              </li>
            </ul>
          </section>

          {/* Instructor */}
          <div className="instructor-card">
            <h3>Instructor</h3>
            <div className="instructor-info">
              <img
                src="https://via.placeholder.com/80"
                alt="Instructor"
                className="instructor-img"
              />
              <div>
                <h4>Ronald Richards</h4>
                <p>UI/UX Designer</p>
                <p>40,445 Reviews • 500 Students • 15 Courses</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="course-sidebar">
          <h3>Course Completion</h3>
          <ul>
            <li className="completed">
              1. What is User Experience (UX) Design? - 4min
            </li>
            <li className="completed">2. Historical Overview of UX - 5min</li>
            <li className="active">
              3. Understanding User-Centered Design - 4min
            </li>
            <li>4. The Role of UX Design in Digital Products - 6min</li>
            <li>5. Introduction to UX Design Tools and Techniques - 7min</li>
          </ul>
        </aside>
      </div>
      <Footer />
    </>
  );
};

export default CoursePage;
