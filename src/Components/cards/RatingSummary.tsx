import React from "react";
import "./RatingSummary.css";

export interface RatingBreakdown {
  stars: number;
  percentage: number;
}

export interface RatingsSummaryType {
  average: number;
  totalReviews: number;
  breakdown: RatingBreakdown[];
}

interface RatingsSummaryProps {
  summary: RatingsSummaryType;
}

export const RatingsSummary: React.FC<RatingsSummaryProps> = ({ summary }) => {
  return (
    <div className="ratings-summary">
      <h3 className="ratings-title">Learner Reviews</h3>

      {/* Average rating */}
      <div className="average-rating">
        <span className="star">⭐</span>
        <strong>{summary.average.toFixed(1)}</strong>
        <span className="reviews-count">
          {summary.totalReviews.toLocaleString()} reviews
        </span>
      </div>

      {/* Breakdown */}
      <div className="breakdown">
        {summary.breakdown.map((item) => (
          <div className="breakdown-row" key={item.stars}>
            <span className="stars-label">
              {Array(item.stars).fill("⭐").join("")}
            </span>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
            <span className="percentage">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingsSummary;