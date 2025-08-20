import React, { useState } from 'react';
import '../Styles/CourseDetails.css'; // Import the general page CSS

import CourseHero from '../Components/CourseHero';
import CourseContent from '../Components/CourseContent';
import RelatedCourses from '../Components/RelatedCourses';
import TestimonialCard from '../Components/TestimonialsSection';
import Footer from '../Components/Layout/Footer';
import Header2 from '../Components/shared/Header2';
import { courseData, instructorData, reviewsData, syllabusData } from '../data/coursedata';
import CourseSidebar from '../Components/CourseSidebar';

const CourseDetailPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="course-detail-page">
      <Header2 />

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>Home</span> <span>›</span>
        <span>Categories</span> <span>›</span>
        <span className="active">Introduction to User Experience Design</span>
      </div>

      <div className="main-content">
        <div>
          <CourseHero course={courseData} />
          <CourseContent
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            instructor={instructorData}
            reviews={reviewsData}
            syllabus={syllabusData}
            course={courseData}
          />
        </div>

        {/* Sidebar */}
          <div className="lg:col-span-1 course-sidebar-wrapper">
            <CourseSidebar course={courseData} />
          </div>
      </div>

      <TestimonialCard />
      <RelatedCourses />
      <Footer />
    </div>
  );
};

export default CourseDetailPage;
