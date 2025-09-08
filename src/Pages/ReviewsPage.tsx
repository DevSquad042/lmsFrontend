import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../Styles/ReviewPage.css';
import ProfileSidebar from '../Components/shared/ProfileSidebar';
import Header2 from '../Components/shared/Header2';
import Footer from '../Components/Layout/Footer';
import { type RootState, type AppDispatch } from '../store/store';
import { fetchUserReviews, selectUserReviews, selectUserReviewsLoading, selectUserReviewsError } from '../store/slices/reviewsSlice';

const reviewsPerPage = 4;

const ReviewPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const userReviews = useSelector(selectUserReviews);
  const loading = useSelector(selectUserReviewsLoading);
  const error = useSelector(selectUserReviewsError);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserReviews(user.id));
    }
  }, [dispatch, user?.id]);

  const totalPages = Math.ceil((userReviews?.length || 0) / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const selectedReviews = (userReviews || []).slice(startIndex, startIndex + reviewsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
        <Header2/>

    <section className="review-page-layout">
      <ProfileSidebar />
      <div className="review-main">
        <h3>Reviews ({userReviews?.length || 0})</h3>
        {loading && <p>Loading reviews...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && selectedReviews.map((review) => (
          <div key={review.id} className="review-card2">
            <div className="review-rating">Rating: {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
            <p className="review-text">Review: {review.comment}</p>
          </div>
        ))}

        {/* Pagination - Just numbers */}
        {!loading && !error && (userReviews?.length || 0) > 0 && (
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
        )}
      </div>
    </section>
    <Footer/>
    </div>
  );
};

export default ReviewPage;
