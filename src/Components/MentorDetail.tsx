import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import type { Mentor } from "../Types/Mentor";
import MentorReviewForm from "./Forms/MentorReviewForm";
import MentorReviewsDisplay from "./MentorReviewsDisplay";
import { fetchMentorReviews, selectMentorReviews, selectMentorReviewsStatus, selectMentorReviewsError } from "../store/slices/mentorSlice";
import type { AppDispatch } from "../store/index";
import styles from "./ComponentStyles/MentorDetails.module.css";

interface Props {
  mentor: Mentor;
}

const MentorDetails: React.FC<Props> = ({ mentor }) => {
  const dispatch = useDispatch<AppDispatch>();

  // Handle nested mentor data structure
  const mentorData = (mentor as any).instructor || mentor;
  const safeRating = Math.max(0, Math.min(5, mentorData.avgRating || 0));

  // Get mentor ID - try different possible properties
  const mentorId = mentorData.id || mentorData._id;

  // Redux selectors for reviews
  const mentorReviews = useSelector(selectMentorReviews);
  const reviewsLoading = useSelector(selectMentorReviewsStatus) === 'pending';
  const reviewsError = useSelector(selectMentorReviewsError);

  console.log('MentorDetail - Mentor object:', mentor);
  console.log('MentorDetail - Mentor data:', mentorData);
  console.log('MentorDetail - Using mentorId:', mentorId);

  // Fetch mentor reviews when component mounts
  useEffect(() => {
    if (mentorId) {
      dispatch(fetchMentorReviews(mentorId));
    }
  }, [dispatch, mentorId]);

  // Callback to refresh reviews after submission
  const handleReviewSubmitted = () => {
    if (mentorId) {
      dispatch(fetchMentorReviews(mentorId));
    }
  };

  return (
    <div>
      <div className={styles.detailsContainer}>
        <div className={styles.imageWrapper}>
          <img
            src={mentorData.image}
            alt={`Profile of ${mentorData.name}`}
            className={styles.profileImage}
          />
        </div>
        <div className={styles.infoWrapper}>
          <h1 className={styles.name}>{mentorData.name}</h1>
          <p className={styles.role}>{mentorData.profession}</p>
          <div className={styles.rating}>
            <FaStar className={styles.starIcon} />
            <span className={styles.ratingValue}>{safeRating.toFixed(1)}</span>
          </div>
          <div className={styles.reviewCount}>
            <span className={styles.reviewText}>
              {mentorData.studentsCount} reviews
            </span>
          </div>
          <p className={styles.bio}>{mentorData.bio}</p>
          <div className={styles.portfolio}>
            <p>
              Portfolio:{" "}
              <a
                href={mentorData.portfolio}
                target="_blank"
                rel="noopener noreferrer"
              >
                {mentorData.portfolio}
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Review Form */}
      {mentorId ? (
        <MentorReviewForm mentorId={mentorId} onReviewSubmitted={handleReviewSubmitted} />
      ) : (
        <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
          Unable to load review form - mentor ID not found
        </div>
      )}

      {/* Reviews Display */}
      <MentorReviewsDisplay
        reviews={mentorReviews}
        loading={reviewsLoading}
        error={reviewsError}
      />
    </div>
  );
};

export default MentorDetails;
