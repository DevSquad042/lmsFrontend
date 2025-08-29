import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store"; 
import {
  removeFromCart,
  moveToSaveForLater,
  moveToCart,
  removeFromSaveForLater,
} from "../store/slices/cartSlice";

import Header from "../Components/shared/Header2";
import Footer from "../Components/Layout/Footer";
import OrderSummaryCard from "../Components/cards/OrderSummaryCard";
import "../styles/CartPage.css";
import { Link, useNavigate } from "react-router-dom"; // ✅ import useNavigate

type CartItem = {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  lectures: number;
  level: string;
  image: string;
  price: number;
};

interface ExtendedRootState extends RootState {
  cart: {
    items: CartItem[];
    savedForLater: CartItem[];
  };
}

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ initialize navigate

  const cartItems = useSelector((state: ExtendedRootState) => state.cart.items);
  const savedForLater = useSelector(
    (state: ExtendedRootState) => state.cart.savedForLater
  );

  const price = cartItems.reduce(
    (acc: number, item: CartItem) => acc + item.price,
    0
  );
  const discount = price > 100 ? -10 : 0;
  const tax = (price + discount) * 0.1;
  const total = price + discount + tax;

  return (
    <div className="shopping-cart-page">
      <Header />

      {/* ✅ Breadcrumb and Title */}
      <div className="breadcrumb-container">
        <h1 className="cart-title">Shopping Cart</h1>
        <nav className="breadcrumb-nav">
          <Link to="/categories" className="breadcrumb-link">Categories</Link> ›{" "}
          <Link to="/details" className="breadcrumb-link">Details</Link> ›{" "}
          <span className="breadcrumb-current">Shopping Cart</span>
        </nav>
      </div>

      <div className="main-content">
        <div className="content-grid">
          {/* LEFT - Cart items */}
          <div className="cart-section">
            <div className="cart-container">
              <div className="cart-header">
                <p className="cart-subtitle">
                  {cartItems.length} Course{cartItems.length !== 1 ? "s" : ""} in cart
                </p>
              </div>

              <div className="cart-table">
                <div className="table-header">
                  <div className="header-details">Details</div>
                  <div className="header-price">Price</div>
                </div>

                {cartItems.length > 0 ? (
                  cartItems.map((course) => (
                    <div key={course.id} className="table-row">
                      <div className="course-image">
                        <img src={course.image} alt={course.title} />
                      </div>

                      <div className="course-main">
                        <div className="title-price-row">
                          <h3 className="course-title">{course.title}</h3>
                          <span className="course-price">${course.price.toFixed(2)}</span>
                        </div>
                        <p className="course-instructor">By {course.instructor}</p>
                        <div className="course-rating">
                          <span className="rating">{course.rating.toFixed(1)}</span>
                          <span className="lectures">
                            {course.lectures} Lectures, {course.level}
                          </span>
                        </div>
                        <div className="course-actions">
                          <button
                            className="save-btn"
                            onClick={() => dispatch(moveToSaveForLater(course.id))}
                          >
                            Save for later
                          </button>
                          <button
                            className="remove-btn"
                            onClick={() => dispatch(removeFromCart(course.id))}
                          >
                            Remove
                          </button>
                        </div>
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

            {/* ✅ Saved for Later Section */}
            {savedForLater.length > 0 && (
              <div className="saved-later-section">
                <h2 className="saved-title">Saved for later</h2>
                {savedForLater.map((course) => (
                  <div key={course.id} className="table-row saved-row">
                    <div className="course-image">
                      <img src={course.image} alt={course.title} />
                    </div>

                    <div className="course-main">
                      <div className="title-price-row">
                        <h3 className="course-title">{course.title}</h3>
                        <span className="course-price">${course.price.toFixed(2)}</span>
                      </div>
                      <p className="course-instructor">By {course.instructor}</p>
                      <div className="course-actions">
                        <button
                          className="move-btn"
                          onClick={() => dispatch(moveToCart(course.id))}
                        >
                          Move to cart
                        </button>
                        <button
                          className="remove-btn"
                          onClick={() => dispatch(removeFromSaveForLater(course.id))}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT - Order summary */}
          <div className="summary-section">
            <OrderSummaryCard
              summary={{ price, discount, tax, total }}
              onCheckout={() => navigate("/checkout")} // ✅ redirect to checkout page
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;





