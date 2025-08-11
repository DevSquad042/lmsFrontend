// ==========================================
// SHOPPING CART PAGE COMPONENT
// ==========================================
// Main container component that orchestrates all cart functionality
// Handles: State management, data flow, page layout

import React, { useState } from 'react';
import Header from '../Components/shared/Header2';
import Breadcrumb from '../Components/Breadcrumb';
import CartCourse from '../Components/cards/CartCourses';
import OrderSummaryCard from '../Components/cards/OrderSummaryCard';
import Footer from '../Components/shared/Footer';
import type { Course, OrderSummary } from '../../src/Types/Index';
import '../Components/cards/CartCourses.css';

const ShoppingCart: React.FC = () => {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  
  // Courses in cart state
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'Introduction to User Experience Design',
      instructor: 'John Doe',
      price: 45.00,
      rating: 4.6,
      totalRatings: 250,
      totalHours: 22,
      lectures: 155,
      level: 'All levels',
      image: '/api/placeholder/96/64'
    },
    {
      id: '2',
      title: 'Introduction to User Experience Design',
      instructor: 'John Doe',
      price: 45.00,
      rating: 4.6,
      totalRatings: 250,
      totalHours: 22,
      lectures: 155,
      level: 'All levels',
      image: '/api/placeholder/96/64'
    },
    {
      id: '3',
      title: 'Introduction to User Experience Design',
      instructor: 'John Doe',
      price: 45.00,
      rating: 4.6,
      totalRatings: 250,
      totalHours: 22,
      lectures: 155,
      level: 'All levels',
      image: '/api/placeholder/96/64'
    }
  ]);

  // Order summary state
  const [orderSummary] = useState<OrderSummary>({
    price: 300.00,
    discount: -10.00,
    tax: 20.00,
    total: 290.00
  });

  // ==========================================
  // EVENT HANDLERS
  // ==========================================
  
  // Handle course removal from cart
  const handleRemove = (id: string): void => {
    setCourses(prevCourses => prevCourses.filter(course => course.id !== id));
  };

  // Handle save for later functionality
  const handleSaveForLater = (id: string): void => {
    console.log('Saving course for later:', id);
    // Implementation for save for later functionality
  };

  // Handle checkout process
  const handleCheckout = (): void => {
    console.log('Proceeding to checkout with courses:', courses);
    // Implementation for checkout process
  };

  // ==========================================
  // RENDER
  // ==========================================
  
  return (
    <div className="shopping-cart-page">
      {/* Header Section */}
      <Header />
      
      {/* Breadcrumb Navigation */}
      <Breadcrumb />
      
      {/* Main Content Area */}
      <div className="main-content">
        <div className="content-grid">
          {/* Left Column - Cart Items */}
          <div className="cart-section">
            <div className="cart-container">
              {/* Cart Header */}
              <div className="cart-header">
                <h1 className="cart-title">Shopping Cart</h1>
                <p className="cart-subtitle">
                  {courses.length} Course{courses.length !== 1 ? 's' : ''} in cart
                </p>
              </div>
              
              {/* Course List */}
              <div className="course-list">
                {courses.length > 0 ? (
                  courses.map((course) => (
                    <CartCourse
                      key={course.id}
                      course={course}
                      onRemove={handleRemove}
                      onSaveForLater={handleSaveForLater}
                    />
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
      
      {/* Footer Section */}
      <Footer />
    </div>
  );
};
export default ShoppingCart;
