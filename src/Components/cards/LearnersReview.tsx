import React from 'react';
import { Star } from 'lucide-react';

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
  const overallRating = 154.0;
  const totalReviews = 1000;

  const ratingDistribution: RatingDistribution[] = [
    { stars: 5, percentage: 80 },
    { stars: 4, percentage: 10 },
    { stars: 3, percentage: 5 },
    { stars: 2, percentage: 3 },
    { stars: 1, percentage: 2 },
  ];

  const reviews: Review[] = [
    {
      id: '1',
      name: 'John Doe',
      avatar: '/api/placeholder/40/40',
      rating: 5,
      date: 'August 15th, 2025',
      content: 'I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.'
    },
    {
      id: '2',
      name: 'Jane Smith',
      avatar: '/api/placeholder/40/40',
      rating: 4,
      date: 'August 15th, 2025',
      content: 'The course was well-structured and provided a solid foundation in design principles. I particularly enjoyed the hands-on projects that allowed me to apply what I learned.'
    }
  ];

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
