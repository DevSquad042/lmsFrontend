import React from "react";
import { FaPlay, FaFacebook, FaMicrosoft, FaGithub } from "react-icons/fa";
import styles from "./cards/CardsStyle/CourseSidebar.module.css";
import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import type { RootState } from "../store/store"; 
import { toast } from "react-toastify";

interface CourseSidebarProps {
  course: {
    id: string;
    title: string;
    image: string;
    price: number;
    originalPrice: number;
    discount: number;
  };
}

const CourseSidebar: React.FC<CourseSidebarProps> = ({ course }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleAddToCart = () => {
    const alreadyInCart = cartItems.some((item) => item.id === course.id);

    if (alreadyInCart) {
      toast.info("✅ This course is already in your cart.");
    } else {
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
      <div className={styles.previewCard}>
        <div className={styles.videoContainer}>
          <img
            src={course.image}
            alt="Course preview"
            className={styles.previewImage}
          />
          <div className={styles.playOverlay}>
            <div className={styles.playButton}>
              <FaPlay className={styles.playIcon} />
            </div>
          </div>
        </div>

        <div className={styles.cardContent}>
          <div className={styles.priceSection}>
            <div className={styles.priceContainer}>
              <span className={styles.currentPrice}>${course.price}</span>
              <span className={styles.originalPrice}>${course.originalPrice}</span>
            </div>
            <span className={styles.discountBadge}>{course.discount}% Off</span>
          </div>

          {/* ✅ Add to Cart */}
          <button className={styles.addToCartBtn} onClick={handleAddToCart}>
            Add To Cart
          </button>

          {/* ✅ Buy Now */}
          <button className={styles.buyNowBtn} onClick={handleBuyNow}>
            Buy Now
          </button>

          {/* ✅ Social Share Section */}
          <div className={styles.shareSection}>
            <div className={styles.shareHeader}>
              <span className={styles.shareLabel}>Share</span>
              <div className={styles.socialIcons}>
                <div className={styles.Icons}>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook className="icon" />
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="icon" />
                  </a>
                  <a
                    href="https://google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FcGoogle className="icon" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaXTwitter className="icon" />
                  </a>
                  <a
                    href="https://microsoft.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaMicrosoft className="icon" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSidebar;



