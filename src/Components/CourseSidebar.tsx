import React from "react";
import { FaPlay, FaFacebook, FaGithub, FaMicrosoft } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { addToCart } from "../store/slices/cartSlice";
import { toast } from "react-toastify";
import type { Course } from "../Types/Course"; // Using the unified Course type
import styles from "./ComponentStyles/CourseSidebar.module.css";

const CourseSidebar: React.FC<{ course: Course }> = ({ course }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleAddToCart = () => {
    const alreadyInCart = cartItems.some((item) => item.id === course.id);

    if (alreadyInCart) {
      toast.info("✅ This course is already in your cart.");
    } else {
      // The `addToCart` action needs to be defined in your cartSlice
      dispatch(addToCart(course));
      toast.success("🎉 Course added to cart!");
    }
  };

  const handleBuyNow = () => {
    const alreadyInCart = cartItems.some((item) => item.id === course.id);

    if (!alreadyInCart) {
      dispatch(addToCart(course));
    }
    navigate("/cart");
  };

  return (
    <div className={styles.sidebar}>
      {/* Video Preview and Play Button */}
      <div className={styles.videoPlayer}>
        <div className={styles.playButton}>
          <FaPlay className={styles.playIcon} />
        </div>
      </div>

      <div className={styles.cardContent}>
        {/* Price Section */}
        <div className={styles.priceSection}>
          <div className={styles.priceContainer}>
            <span className={styles.currentPrice}>${course.price}</span>
            <span className={styles.originalPrice}>${course.originalPrice}</span>
          </div>
          <span className={styles.discountBadge}>{course.discount}% Off</span>
        </div>

        {/* Action Buttons */}
        <button className={styles.addToCartBtn} onClick={handleAddToCart}>
          Add To Cart
        </button>
        <button className={styles.buyNowBtn} onClick={handleBuyNow}>
          Buy Now
        </button>

        {/* Social Share Section */}
        <div className={styles.shareSection}>
          <div className={styles.shareHeader}>
            <span className={styles.shareLabel}>Share</span>
            <div className={styles.socialIcons}>
              <div className={styles.Icons}>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebook className="icon" />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <FaGithub className="icon" />
                </a>
                <a href="https://google.com" target="_blank" rel="noopener noreferrer">
                  <FcGoogle className="icon" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <FaXTwitter className="icon" />
                </a>
                <a href="https://microsoft.com" target="_blank" rel="noopener noreferrer">
                  <FaMicrosoft className="icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSidebar;