// src/Pages/OrderCompletePage.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";

import Header3 from "../Components/shared/Header3";
import Footer from "../Components/Layout/Footer";
import CourseInfoSidebar from "../Components/cards/CourseInfoSidebar";
import "../Styles/OrderCompletePage.css";

import type { Course, Section } from "../Types/Course";

const OrderCompletePage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("curriculum");
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState<Section | null>(null);

  useEffect(() => {
    const checkEnrollmentAndFetchCourse = async () => {
      if (!courseId) return;
      
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("Please log in to access this course");
          navigate("/login");
          return;
        }

        // Fetch user's enrolled courses to check enrollment
        const enrolledResponse = await axios.get(
          "https://byway-hoce.onrender.com/api/enrolled-courses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Check if the current course is in the enrolled list
        let enrolledCourses: Course[] = [];
        
        if (Array.isArray(enrolledResponse.data)) {
          enrolledCourses = enrolledResponse.data.map((enrollment: { course: Course }) => enrollment.course);
        } else if (enrolledResponse.data.courses) {
          enrolledCourses = enrolledResponse.data.courses;
        } else if (enrolledResponse.data.data) {
          enrolledCourses = enrolledResponse.data.data;
        }

        const isUserEnrolled = enrolledCourses.some(
          (enrolledCourse: Course) => enrolledCourse._id === courseId
        );
        
        if (isUserEnrolled) {
          setIsEnrolled(true);
          
          // Try to fetch the course details from enrolled courses first
          const enrolledCourse = enrolledCourses.find(
            (c: Course) => c._id === courseId
          );
          
          if (enrolledCourse) {
            setCourse(enrolledCourse);
            // Set the first video as default if available
            if (enrolledCourse.sections && enrolledCourse.sections.length > 0) {
              const firstSection = enrolledCourse.sections[0];
              setCurrentSection(firstSection);
              setCurrentVideo(firstSection.videoUrl || firstSection.videoFile);
            }
          } else {
            // Fallback: fetch course details from courses API
            try {
              const courseResponse = await axios.get(
                `https://byway-hoce.onrender.com/api/courses/${courseId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              const courseData = courseResponse.data;
              setCourse(courseData);
              
              // Set the first video as default if available
              if (courseData.sections && courseData.sections.length > 0) {
                const firstSection = courseData.sections[0];
                setCurrentSection(firstSection);
                setCurrentVideo(firstSection.videoUrl || firstSection.videoFile);
              }
            } catch (courseError) {
              console.error("Error fetching course details:", courseError);
              toast.error("Course details not available");
            }
          }
        } else {
          toast.error("You are not enrolled in this course");
          navigate("/profile2");
        }

      } catch (error: AxiosError | unknown) {
        console.error("Error checking enrollment:", error);

        if (error instanceof AxiosError && error.response?.status === 401) {
          toast.error("Please log in to access this course");
          navigate("/login");
        } else {
          toast.error("Failed to verify course enrollment");
        }
      } finally {
        setLoading(false);
      }
    };

    checkEnrollmentAndFetchCourse();
  }, [courseId, navigate]);

  // Function to play a specific section video
  const playSectionVideo = (section: Section) => {
    setCurrentSection(section);
    setCurrentVideo(section.videoUrl || section.videoFile);
  };

  if (loading) {
    return (
      <>
        <Header3 />
        <div className="order-complete-page">
          <div className="loading">Loading course content...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (!course) {
    return (
      <>
        <Header3 />
        <div className="order-complete-page">
          <div className="error">Course not found.</div>
        </div>
        <Footer />
      </>
    );
  }

  if (!isEnrolled) {
    return (
      <>
        <Header3 />
        <div className="order-complete-page">
          <div className="error">
            You are not enrolled in this course.
            <button 
              onClick={() => navigate("/profile2")}
              style={{ 
                marginLeft: '10px', 
                padding: '8px 16px', 
                background: '#007bff', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Back to My Courses
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header3 />

      <div className="order-complete-page">
        <div className="order-complete-container">
          {/* Add the back button here */}
          <div style={{ marginBottom: '20px' }}>
            <button 
              onClick={() => navigate("/profile2")}
              className="back-to-profile-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                background: '#f1f5f9',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                color: '#374151',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#e2e8f0';
                e.currentTarget.style.borderColor = '#cbd5e1';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#f1f5f9';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              <FaArrowLeft size={14} />
              Back to My Courses
            </button>
          </div>

          <h1 className="course-title">{course.title}</h1>

          <div className="content-grid">
            {/* Left Column */}
            <div className="left-column">
              {/* Video Player */}
              <div className="video-wrapper">
                {currentVideo ? (
                  <>
                    {/* YouTube */}
                    {currentVideo.includes('youtube.com') || currentVideo.includes('youtu.be') ? (
                      <iframe
                        width="565"
                        height="318"
                        src={currentVideo
                          .replace('watch?v=', 'embed/')
                          .replace('youtu.be/', 'youtube.com/embed/')
                          .split('&')[0]
                        }
                        title={currentSection?.title || course.title}
                        style={{ border: "0" }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="course-video"
                      />
                    ) : (
                      /* Direct video files */
                      (currentVideo.match(/\.(mp4|webm|ogg|mov)$/i)) ? (
                        <video
                          controls
                          width="565"
                          height="318"
                          className="course-video"
                          key={currentVideo} // Important: force re-render on video change
                        >
                          <source src={currentVideo} type={`video/${currentVideo.split('.').pop()}`} />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        /* Other embeds */
                        <iframe
                          width="565"
                          height="318"
                          src={currentVideo}
                          title={currentSection?.title || course.title}
                          style={{ border: "0" }}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                          className="course-video"
                        />
                      )
                    )}
                    
                    {/* Current video info */}
                    {currentSection && (
                      <div style={{ marginTop: '10px', padding: '10px', background: '#f5f5f5', borderRadius: '5px' }}>
                        <h3 style={{ margin: '0 0 5px 0' }}>{currentSection.title}</h3>
                        <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
                          Now playing: {currentSection.title}
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="video-placeholder">
                    <h3>Select a Lesson to Begin</h3>
                    <p>Choose a lesson from the curriculum to start watching</p>
                    {course.thumbnail && (
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '15px' }}
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Tabs */}
              <div className="tabs">
                <button 
                  className={activeTab === "curriculum" ? "active" : ""}
                  onClick={() => setActiveTab("curriculum")}
                >
                  Curriculum
                </button>
                <button 
                  className={activeTab === "details" ? "active" : ""}
                  onClick={() => setActiveTab("details")}
                >
                  Details
                </button>
                <button 
                  className={activeTab === "instructor" ? "active" : ""}
                  onClick={() => setActiveTab("instructor")}
                >
                  Instructor
                </button>
                <button 
                  className={activeTab === "reviews" ? "active" : ""}
                  onClick={() => setActiveTab("reviews")}
                >
                  Reviews
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === "curriculum" && course.sections && course.sections.length > 0 && (
                <div className="course-sections">
                  <h2>Course Curriculum</h2>
                  {course.sections.map((section, index) => (
                    <div 
                      key={section._id} 
                      className={`section-item ${currentSection?._id === section._id ? 'active' : ''}`}
                      onClick={() => playSectionVideo(section)}
                      style={{ 
                        cursor: 'pointer', 
                        padding: '15px', 
                        border: '1px solid #ddd', 
                        marginBottom: '10px', 
                        borderRadius: '5px',
                        backgroundColor: currentSection?._id === section._id ? '#f0f8ff' : '#fff'
                      }}
                    >
                      <h4 style={{ margin: '0 0 5px 0' }}>
                        {index + 1}. {section.title}
                        {section.isPreview && (
                          <span style={{ fontSize: '12px', color: '#007bff', marginLeft: '10px' }}>
                            (Preview)
                          </span>
                        )}
                      </h4>
                      <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
                        Click to play this lesson
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "details" && (
                <section className="course-details">
                  <h2>Course Overview</h2>
                  <p>
                    {course.description || "Embark on a transformative journey into the dynamic world of this course. No description available."}
                  </p>
                  <h2>What You'll Learn</h2>
                  <ul>
                    {course.sections?.map((section) => (
                      <li key={section._id}>{section.title}</li>
                    )) || (
                      <>
                        <li>Gain understanding of the course concepts and their importance</li>
                        <li>Explore fundamental principles</li>
                        <li>Understand key elements for success</li>
                      </>
                    )}
                  </ul>
                </section>
              )}

              {/* ... keep the instructor and reviews sections the same ... */}
            </div>

            {/* Right Column - Course Info Sidebar */}
            <div className="right-column">
              <CourseInfoSidebar course={course} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OrderCompletePage;