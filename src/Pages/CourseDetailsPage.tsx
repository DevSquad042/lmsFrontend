import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { fetchCourses } from '../store/slices/courseSlice';

import '../Styles/CourseDetails.css';

import CourseHero from '../Components/CourseHero';
import CourseContent from '../Components/CourseContent';
import RelatedCourses from '../Components/RelatedCourses';
import TestimonialCard from '../Components/TestimonialsSection';
import Footer from '../Components/Layout/Footer';
import Header2 from '../Components/shared/Header2';
import CourseSidebar from '../Components/CourseSidebar';


const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { data: courses, loading, error } = useSelector(
    (state: RootState) => state.courses
  );

  const [activeTab, setActiveTab] = useState('description');

  // Fetch courses if not already loaded
  useEffect(() => {
    if (courses.length === 0) {
      dispatch(fetchCourses());
    }
  }, [dispatch, courses.length]);

  // Find course by id
  const course = courses.find((c) => c.id === id);

  if (loading) return <p>Loading course...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!course) return <p>Course not found.</p>;

  return (
    <div className="course-detail-page">
      <Header2 />

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>Home</span> <span>›</span>
        <span>Categories</span> <span>›</span>
        <span className="active">{course.title}</span>
      </div>

      <div className="main-content">
        <div>
          <CourseHero course={course} />
          <CourseContent
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            instructor={course.instructor}   // ⚡ depends how backend sends instructor
            reviews={course.reviews || []}   // ⚡ if reviews array exists
            course={course}
          />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 course-sidebar-wrapper">
          <CourseSidebar course={course} />
        </div>
      </div>

      <TestimonialCard />
      <RelatedCourses />
      <Footer />
    </div>
  );
};

export default CourseDetailPage;
