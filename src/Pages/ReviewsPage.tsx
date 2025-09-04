import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Styles/ReviewPage.css';
import ProfileSidebar from '../Components/shared/ProfileSidebar';
import Header2 from '../Components/shared/Header2';
import Footer from '../Components/Layout/Footer';
import { fetchReviews } from '../store/slices/reviewsSlice';
import type { AppDispatch } from '../store/store';

const reviewsPerPage = 4;

const ReviewPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: reviewsData, loading, error } = useSelector((state: any) => state.reviews);
  const { user } = useSelector((state: any) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);

  // Transform API data to component format
  let reviewsArray = [];

  if (Array.isArray(reviewsData)) {
    // Direct array response (for course/instructor reviews)
    reviewsArray = reviewsData;
  } else if (reviewsData && typeof reviewsData === 'object') {
    // Handle different response structures
    if (reviewsData.data && reviewsData.data.reviews && Array.isArray(reviewsData.data.reviews)) {
      // User reviews structure: { data: { reviews: [...] } }
      reviewsArray = reviewsData.data.reviews;
    } else if (reviewsData.data && Array.isArray(reviewsData.data)) {
      // Alternative structure
      reviewsArray = reviewsData.data;
    } else if (reviewsData.reviews && Array.isArray(reviewsData.reviews)) {
      reviewsArray = reviewsData.reviews;
    } else if (reviewsData.items && Array.isArray(reviewsData.items)) {
      reviewsArray = reviewsData.items;
    }
  }

  const reviews = reviewsArray.map((review: any) => ({
    course: review.courseId
      ? (review.courseTitle || review.course?.title || `Course ${review.courseId}`)
      : (review.courseTitle || review.course?.title || 'Course N/A'),
    rating: review.rating,
    text: review.comment,
    courseId: review.courseId,
  }));

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const selectedReviews = reviews.slice(startIndex, startIndex + reviewsPerPage);

  useEffect(() => {
    // Only fetch reviews if user is loaded and has a valid ID
    if (user && user.id && typeof user.id === 'string' && user.id.trim() !== '' && user.id !== 'undefined') {
      console.log('Fetching reviews for user:', user.id);
      // Fetch reviews for the current user
      dispatch(fetchReviews({ targetId: user.id, type: 'user' }));
    } else {
      console.log('User not ready for reviews fetch:', { user, userId: user?.id });
    }
  }, [dispatch, user]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div>
        <Header2/>
        <section className="review-page-layout">
          <ProfileSidebar />
          <div className="review-main">
            <h3>Loading Reviews...</h3>
          </div>
        </section>
        <Footer/>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header2/>
        <section className="review-page-layout">
          <ProfileSidebar />
          <div className="review-main">
            <h3>Error loading reviews: {error}</h3>
            <p>Please check the console for more details.</p>
          </div>
        </section>
        <Footer/>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <Header2/>
        <section className="review-page-layout">
          <ProfileSidebar />
          <div className="review-main">
            <h3>Please log in to view your reviews.</h3>
          </div>
        </section>
        <Footer/>
      </div>
    );
  }

  return (
    <div>
        <Header2/>

    <section className="review-page-layout">
      <ProfileSidebar />
      <div className="review-main">
        <h3>Reviews ({reviews.length})</h3>
        {reviews.length === 0 ? (
          <p>No reviews found.</p>
        ) : (
          <>
            {selectedReviews.map((review: any, idx: number) => (
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
          </>
        )}
      </div>
    </section>
    <Footer/>
    </div>
  );
};

export default ReviewPage;

