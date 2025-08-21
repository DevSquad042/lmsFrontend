import React, { useState, useEffect } from "react";
import Header from "../Components/shared/Header2";
import Breadcrumb from "../Components/Breadcrumb";
import OrderSummaryCard from "../Components/cards/OrderSummaryCard";
import Footer from "../Components/Layout/Footer";
// import { Course, OrderSummary } from "../../src/Types/Index";
import "../Styles/ShoppingCart.css";

const ShoppingCart = () => {
  const [courses, setCourses] = useState([
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
      image: "https://via.placeholder.com/96x64",
    },
    {
      id: "2",
      title: "Advanced UX Design",
      instructor: "Jane Smith",
      price: 55.0,
      rating: 4.8,
      totalRatings: 320,
      totalHours: 28,
      lectures: 180,
      level: "Intermediate",
      image: "https://via.placeholder.com/96x64",
    },

    {
      id: "3",
      title: "UX Design for Beginners",
      instructor: "Alice Johnson",
      price: 35.0,
      rating: 4.5,
      totalRatings: 180,
      totalHours: 15,
      lectures: 100,
      level: "Beginner",
      image: "https://via.placeholder.com/96x64",
    },
  ]);

  const [orderSummary, setOrderSummary] = useState<OrderSummary>({
    price: 0,
    discount: 0,
    tax: 0,
    total: 0,
  });

  useEffect(() => {
    const price = courses.reduce((sum, course) => sum + course.price, 0);
    const discount = price > 0 ? -10 : 0;
    const tax = price > 0 ? 8 : 0;
    const total = price + discount + tax;
    setOrderSummary({ price, discount, tax, total });
  }, [courses]);

  const handleRemove = (id) =>
    setCourses((prev) => prev.filter((course) => course.id !== id));

  const handleSaveForLater = (id) => {
    console.log("Saving course for later:", id);
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout with courses:", courses);
  };

  return (
    <div className="shopping-cart-page">
      <Header />
      <Breadcrumb />
      <div className="main-content">
        <div className="content-grid">
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
