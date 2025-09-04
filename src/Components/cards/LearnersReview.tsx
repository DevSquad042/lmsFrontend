import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Star } from 'lucide-react';
import type { AppDispatch, RootState } from '../../store';
import { fetchReviews, fetchAverage } from '../../store/slices/reviewsSlice';

interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
}

interface RatingDistribution {
  stars: number;
  percentage: number;
}

const LearnerReviews: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: reviewsData, average: averageRating, loading } = useSelector((state: any) => state.reviews);

  // Transform API data to component format - handle both response structures
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

  // Transform API data to component format
  const reviews: Review[] = reviewsArray.map((review: any) => ({
    id: review._id || review.id,
    name: review.userId?.userName || review.userId?.email || review.userId || 'Anonymous',
    avatar: '/api/placeholder/40/40',
    rating: review.rating,
    date: review.createdAt ? new Date(review.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    content: review.comment
  }));

  const totalReviews = reviewsArray.length;
  const overallRating = averageRating || 0;

  // Calculate rating distribution from actual data
  const ratingDistribution: RatingDistribution[] = [5, 4, 3, 2, 1].map(stars => {
    const count = reviewsArray.filter((review: any) => review.rating === stars).length;
    const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
    return { stars, percentage };
  });

  useEffect(() => {
    // Fetch reviews and average rating for a specific target (e.g., course or instructor)
    // You might want to pass the targetId and type as props to this component
    dispatch(fetchReviews({ targetId: 'course-123', type: 'Course' }));
    dispatch(fetchAverage({ targetId: 'course-123', type: 'Course' }));
  }, [dispatch]);

  const renderStars = (rating: number, size: 'sm' | 'md' = 'sm') => {
    const sizeClass = size === 'md' ? 'w-5 h-5' : 'w-4 h-4';
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClass} ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const renderRatingBar = (stars: number, percentage: number) => {
    return (
      <div className="flex items-center gap-2 mb-2">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= stars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className="bg-yellow-400 h-2 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <span className="text-sm text-gray-600 w-8">{percentage}%</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white">
        <h2 className="text-2xl font-bold mb-6">Learner Reviews</h2>
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">Loading reviews...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-6">Learner Reviews</h2>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - Rating Overview */}
        <div className="lg:w-2/5">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              <span className="text-3xl font-bold">{overallRating}</span>
              <span className="text-gray-600">{totalReviews.toLocaleString()} reviews</span>
            </div>
          </div>

          <div className="space-y-2">
            {ratingDistribution.map((item) => renderRatingBar(item.stars, item.percentage))}
          </div>
        </div>

        {/* Right Side - Individual Reviews */}
        <div className="lg:w-3/5">
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden flex-shrink-0">
                    <span className="text-sm font-medium text-gray-700">
                      {review.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-lg">{review.name}</h4>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {renderStars(review.rating)}
                        <span className="font-bold">{review.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-500 mb-3">
                      Reviewed on {review.date}
                    </p>
                    
                    <p className="text-gray-700 leading-relaxed">
                      {review.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnerReviews;
