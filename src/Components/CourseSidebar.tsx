import React from "react";
import { FaFacebook, FaGithub, FaMicrosoft } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { addToCart } from "../store/slices/cartSlice";
import { toast } from "react-toastify";
import type { Course } from "../Types/Course"; 
import styles from "./ComponentStyles/CourseSidebar.module.css";

const CourseSidebar: React.FC<{ course: Course }> = ({ course }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleAddToCart = () => {
    const alreadyInCart = cartItems.some((item) => item.id === course._id);

    if (alreadyInCart) {
      toast.info("✅ This course is already in your cart.");
    } else {
      dispatch(
        addToCart({
          id: course._id,
          title: course.title,
          price: Number(course.discountedPrice),
          image: course.thumbnail,
          instructor: course.instructor,
          rating: course.rating,
          lectures: course.lectures,
          level: course.level,
        })
      );
      toast.success("🎉 Course added to cart!");
    }
  };

  const handleBuyNow = () => {
    // 🚀 Skip cart, go directly to checkout with only this course
    navigate("/checkout", {
      state: {
        items: [
          {
            id: course._id,
            title: course.title,
            price: Number(course.discountedPrice),
            image: course.thumbnail,
            instructor: course.instructor,
            rating: course.rating,
            lectures: course.lectures,
            level: course.level,
          },
        ],
      },
    });
  };

  return (
    <div className={styles.sidebar}>
      {/* Image Preview */}
      <div className={styles.thumbnailWrapper}>
        <img src={course.thumbnail} alt={course.title} className={styles.thumbnail} />
      </div>

      <div className={styles.cardContent}>
        {/* Price Section */}
        <div className={styles.priceSection}>
          <div className={styles.priceContainer}>
            <span className={styles.currentPrice}>
              <span>₦</span>
              {course.discountedPrice}
            </span>
            <span className={styles.originalPrice}>
              <span>₦</span>
              {course.price}
            </span>
          </div>
          <span className={styles.discountBadge}>
            {course.discountPercentage}% Off
          </span>
        </div>

        {/* Action Buttons */}
        <div className={styles.buttonGroup}>
          <button className={styles.addToCartBtn} onClick={handleAddToCart}>
            Add To Cart
          </button>
          <button className={styles.buyNowBtn} onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>

        {/* Social Share Section */}
        <div className={styles.shareSection}>
          <div className={styles.shareHeader}>
            <span className={styles.shareLabel}>Share</span>
            <div className={styles.socialIcons}>
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
  );
};

export default CourseSidebar;
