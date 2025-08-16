import React, { useState } from "react";
import Header from "../Components/shared/Header2";
import Breadcrumb from '../Components/Breadcrumb'
import OrderSummaryCard from "../Components/cards/OrderSummaryCard";
import Footer from '../Components/Layout/Footer';
import type { Course, OrderSummary } from "../../src/Types/Index";
import "../Styles/ShoppingCart.css";

const ShoppingCart: React.FC = () => {
  // Courses in cart state
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      title: "Introduction to User Experience Design",
      instructor: "John Doe",
      price: 45.0,
      rating: 4.6,
      totalRatings: 250,
      totalHours: 22,
      lectures: 155,
      level: "All levels",
      image: "/api/placeholder/96/64",
    },
    {
      id: "2",
      title: "Introduction to User Experience Design",
      instructor: "John Doe",
      price: 45.0,
      rating: 4.6,
      totalRatings: 250,
      totalHours: 22,
      lectures: 155,
      level: "All levels",
      image: "/api/placeholder/96/64",
    },
  ]);

  // Order summary state
  const [orderSummary] = useState<OrderSummary>({
    price: 90.0,
    discount: -10.0,
    tax: 8.0,
    total: 88.0,
  });

  // Handle course removal from cart
  const handleRemove = (id: string): void => {
    setCourses((prevCourses) =>
      prevCourses.filter((course) => course.id !== id)
    );
  };

  // Handle save for later functionality
  const handleSaveForLater = (id: string): void => {
    console.log("Saving course for later:", id);
  };

  // Handle checkout process
  const handleCheckout = (): void => {
    console.log("Proceeding to checkout with courses:", courses);
  };

  return (
    <div className="shopping-cart-page">
      <Header />
      <Breadcrumb />

      <div className="main-content">
        <div className="content-grid">
          {/* Left Column - Cart Items */}
          <div className="cart-section">
            <div className="cart-container">
              <div className="cart-header">
                <h1 className="cart-title">Shopping Cart</h1>
                <p className="cart-subtitle">
                  {courses.length} Course{courses.length !== 1 ? "s" : ""} in
                  cart
                </p>
              </div>

              <div className="cart-table">
                <div className="table-header">
                  <div className="header-details">Details</div>
                  <div className="header-price">Price</div>
                </div>

                {courses.length > 0 ? (
                  courses.map((course) => (
                    <div key={course.id} className="table-row">
                      <div className="course-details">
                        <h3 className="course-title">{course.title}</h3>
                        <p className="course-instructor">
                          By {course.instructor}
                        </p>
                        <div className="course-rating">
                          <span className="rating">
                            {course.rating.toFixed(1)}
                          </span>
                          <span className="lectures">
                            {course.lectures} Lectures, {course.level}
                          </span>
                        </div>
                        <div className="course-actions">
                          <button
                            className="save-btn"
                            onClick={() => handleSaveForLater(course.id)}
                          >
                            Save for later
                          </button>
                          <button
                            className="remove-btn"
                            onClick={() => handleRemove(course.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="course-price">
                        ${course.price.toFixed(2)}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-cart">
                    <p>Your cart is empty</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="summary-section">
            <OrderSummaryCard
              summary={orderSummary}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShoppingCart;
