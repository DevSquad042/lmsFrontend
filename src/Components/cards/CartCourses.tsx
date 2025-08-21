// ==========================================
// COURSE CARD COMPONENT
// ==========================================
// Individual course item display in shopping cart
// Handles: Course info display, remove/save actions, rating display

import React from "react";
import { Heart, Star } from "lucide-react";
import type { CourseCardProps } from "../../Types";
import "../cards/CartCourses.css";
import Image from "../../../src/assets/Images/shopping cart-image.png";

const CartCourse: React.FC<CourseCardProps> = ({
  course,
  onRemove,
  onSaveForLater,
}) => {
  // Render star rating
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`star ${
          i < Math.floor(rating) ? "star-filled" : "star-empty"
        }`}
      />
    ));
  };

  return (
    <div className="course-card">
      {/* Course Image with Heart Icon */}
      <div className="course-image-container">
        <img src={Image} alt={course.title} className="course-image" />
        <div className="heart-badge">
          <Heart className="heart-icon" />
        </div>
      </div>

      {/* Course Information */}
      <div className="course-info">
        <h3 className="course-title">{course.title}</h3>
        <p className="course-instructor">By {course.instructor}</p>

        {/* Rating and Details */}
        <div className="course-details">
          <span className="rating-score">{course.rating}</span>
          <div className="stars-container">{renderStars(course.rating)}</div>
          <span className="rating-count">({course.totalRatings} rating)</span>
          <span className="course-meta">
            {course.totalHours} Total Hours. {course.lectures} Lectures.{" "}
            {course.level}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="course-actions">
          <button
            onClick={() => onSaveForLater(course.id)}
            className="action-btn save-btn"
          >
            Save for later
          </button>
          <button
            onClick={() => onRemove(course.id)}
            className="action-btn remove-btn"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Course Price */}
      <div className="course-price">
        <span className="price-amount">${course.price.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CartCourse;
