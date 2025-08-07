import React, { useState } from 'react';
import '../assets/css/ProfilePage3.css';
import ProfileSidebar from '../Components/shared/ProfileSidebar';
import Header2 from '../Components/shared/Header2';
import Footer from '../Components/shared/Footer';

const reviewsPerPage = 4;

const reviews = [
  {
    course: 'React from Scratch',
    rating: 5,
    text: "I was initially apprehensive... But the instructor, John Doe, did an amazing job.",
  },
  {
    course: 'JavaScript Essentials',
    rating: 4,
    text: "Very interactive and helpful!",
  },
  {
    course: 'UI/UX Design Masterclass',
    rating: 5,
    text: "This course helped me land a freelance gig!",
  },
  {
    course: 'HTML & CSS Basics',
    rating: 3,
    text: "Good start for beginners but could be deeper.",
  },
  {
    course: 'Advanced TypeScript',
    rating: 4,
    text: "Challenging but rewarding.",
  },
  {
    course: 'JavaScript Essentials',
    rating: 4,
    text: "Very interactive and helpful!",
  },
  {
    course: 'UI/UX Design Masterclass',
    rating: 5,
    text: "This course helped me land a freelance gig!",
  },
  {
    course: 'HTML & CSS Basics',
    rating: 3,
    text: "Good start for beginners but could be deeper.",
  },
  {
    course: 'Advanced TypeScript',
    rating: 4,
    text: "Challenging but rewarding.",
  },
];

const ProfilePage3: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const selectedReviews = reviews.slice(startIndex, startIndex + reviewsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
        <Header2/>
        
    <section className="review-page-layout">
      <ProfileSidebar />
      <div className="review-main">
        <h3>Reviews ({reviews.length})</h3>
        {selectedReviews.map((review, idx) => (
          <div key={idx} className="review-card">
            <div className="review-header">
              <p className="course-name">Course Name: <b>{review.course}</b></p>
              <span className="menu-icon">⋯</span>
            </div>
            <div className="review-rating">Rating: {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
            <p className="review-text">Review: {review.text}</p>
          </div>
        ))}

        {/* Pagination - Just numbers */}
        <div className="pagination-bar">
          <span className="arrow" onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}>{'<'}</span>
          {[...Array(totalPages)].map((_, i) => (
            <span
              key={i}
              className={`page-number ${currentPage === i + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </span>
          ))}
          <span className="arrow" onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}>{'>'}</span>
        </div>
      </div>
    </section>
    <Footer/>
    </div>
  );
};

export default ProfilePage3;

