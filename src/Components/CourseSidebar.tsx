import React from "react";
import type { Course } from "../Types/Course";
import { FaPlay, FaFacebook, FaGithub, FaMicrosoft } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import styles from "./ComponentStyles/CourseSidebar.module.css";

const CourseSidebar: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.videoPlayer}>
        <div className={styles.playButton}>
          <FaPlay className={styles.playIcon} />
        </div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.priceSection}>
          <div className={styles.priceContainer}>
            <span className={styles.currentPrice}>${course.price}</span>
            <span className={styles.originalPrice}>${course.originalPrice}</span>
          </div>
          <span className={styles.discountBadge}>
            {course.discount}% Off
          </span>
        </div>
        <button className={styles.addToCartBtn}>Add To Cart</button>
        <button className={styles.buyNowBtn}>Buy Now</button>
        <div className={styles.shareSection}>
          <div className={styles.shareHeader}>
            <span className={styles.shareLabel}>Share</span>
            <div className={styles.socialIcons}>
              <div className={styles.Icons}>
                <FaFacebook className='icon' />
                <FaGithub className='icon' />
                <FcGoogle className='icon' />
                <FaXTwitter className='icon' />
                <FaMicrosoft className='icon' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSidebar;