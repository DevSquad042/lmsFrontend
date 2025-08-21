import React from 'react';
import { FaPlay, FaFacebook, FaMicrosoft, FaGithub } from 'react-icons/fa';
import styles from './cards/CardsStyle/CourseSidebar.module.css';
import { FcGoogle } from 'react-icons/fc';
import { FaXTwitter } from 'react-icons/fa6';

interface CourseSidebarProps {
  course: {
    image: string;
    price: number;
    originalPrice: number;
    discount: number;
  };
}

const CourseSidebar: React.FC<CourseSidebarProps> = ({ course }) => {
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
            <span className={styles.discountBadge}>
              {course.discount}% Off
            </span>
          </div>
          
          <button className={styles.addToCartBtn}>
            Add To Cart
          </button>
          
          <button className={styles.buyNowBtn}>
            Buy Now
          </button>
          
          <div className={styles.shareSection}>
            <div className={styles.shareHeader}>
              <span className={styles.shareLabel}>Share</span>
              <div className={styles.socialIcons}>
                <div className={styles.Icons}>
                  <FaFacebook  className='icon'/>
                  <FaGithub  className='icon'/>
                  <FcGoogle  className='icon'/>
                  <FaXTwitter  className='icon'/>
                  <FaMicrosoft  className='icon'/>
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
