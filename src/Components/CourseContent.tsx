import React, { useState, useRef } from 'react';
import { FaStar, FaPlay, FaUsers, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import styles from './CourseContent.module.css';

interface CourseContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  instructor: any;
  reviews: any[];
  syllabus: any[];
  course: any;
}

const CourseContent: React.FC<CourseContentProps> = ({
  activeTab,
  setActiveTab,
  instructor,
  reviews,
  syllabus,
  course
}) => {
  const [expandedSyllabus, setExpandedSyllabus] = useState<{ [key: number]: boolean }>({});

  // Refs for each section
  const descriptionRef = useRef<HTMLDivElement>(null);
  const instructorRef = useRef<HTMLDivElement>(null);
  const syllabusRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  const toggleSyllabus = (index: number) => {
    setExpandedSyllabus(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={i < Math.floor(rating) ? styles.starFilled : styles.starEmpty}
      />
    ));
  };

  const tabs = [
    { key: 'description', label: 'Description', ref: descriptionRef },
    { key: 'instructor', label: 'Instructor', ref: instructorRef },
    { key: 'syllabus', label: 'Syllabus', ref: syllabusRef },
    { key: 'reviews', label: 'Reviews', ref: reviewsRef }
  ];

  // Smooth scroll handler
  const handleTabClick = (tabKey: string, sectionRef: React.RefObject<HTMLDivElement>) => {
    setActiveTab(tabKey);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={styles.contentCard}>
      {/* Tabs Navigation */}
      <div className={styles.tabsContainer}>
        <nav className={styles.tabsNav}>
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => handleTabClick(tab.key, tab.ref)}
              className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Sections */}
      <div className={styles.tabContent}>
        {/* Description */}
        <div ref={descriptionRef}>
          <h3 className={styles.sectionTitle}>Course Description</h3>
          <p className={styles.description}>
            This interactive e-learning course will introduce you to User Experience (UX) design, 
            the art of creating products and services that are intuitive, enjoyable, and user-friendly.
            Gain a solid foundation in UX principles and learn to apply them in real-world scenarios through 
            engaging modules and interactive exercises. 
          </p>
          <h3 className={styles.sectionTitle}>Certification</h3>
          <p className={styles.description}>
           At Byway, we understand the significance of formal recognition for your hard work and 
           dedication to continuous learning. Upon successful completion of our courses, you will 
           earn a prestigious certification that not only validates your expertise but also opens 
           doors to new opportunities in your chosen field.
          </p>
        </div>

        {/* Instructor */}
        <div ref={instructorRef}>
          <h3 className={styles.sectionTitle}>Instructor</h3>
          <div className={styles.instructorCard}>
            <img src={instructor.image} alt={instructor.name} className={styles.instructorImage} />
            <div className={styles.instructorInfo}>
              <h4 className={styles.instructorName}>{instructor.name}</h4>
              <p className={styles.instructorTitle}>{instructor.title}</p>
              <div className={styles.instructorStats}>
                <div className={styles.statItem}>
                  <FaStar className={styles.statIcon} />
                  <span>{instructor.rating} Instructor Rating</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statIcon}>👁️</span>
                  <span>{instructor.reviews.toLocaleString()} Reviews</span>
                </div>
                <div className={styles.statItem}>
                  <FaUsers className={styles.statIcon} />
                  <span>{instructor.students} Students</span>
                </div>
                <div className={styles.statItem}>
                  <FaPlay className={styles.statIcon} />
                  <span>{instructor.courses} Courses</span>
                </div>
              </div>
              <p className={styles.instructorBio}>{instructor.bio}</p>
            </div>
          </div>
        </div>

        {/* Syllabus */}
        <div ref={syllabusRef}>
          <h3 className={styles.sectionTitle}>Syllabus</h3>
          <div className={styles.syllabusContainer}>
            {syllabus.map((item, index) => (
              <div key={index} className={styles.syllabusItem}>
                <button
                  onClick={() => toggleSyllabus(index)}
                  className={styles.syllabusHeader}
                >
                  <div className={styles.syllabusLeft}>
                    {expandedSyllabus[index] ? <FaChevronUp /> : <FaChevronDown />}
                    <span className={styles.syllabusTitle}>{item.title}</span>
                  </div>
                  <div className={styles.syllabusRight}>
                    {item.lessons} Lessons • {item.duration}
                  </div>
                </button>
                {expandedSyllabus[index] && (
                  <div className={styles.syllabusContent}>
                    <p>Detailed content for {item.title} will be shown here...</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div ref={reviewsRef}>
          <h3 className={styles.sectionTitle}>Learner Reviews</h3>
          <div className={styles.reviewsGrid}>
      <div className={styles.reviewSummary}>
       <div>
         <div className={styles.ratingLarge}>4.6</div>
         <div className={styles.starsLarge}>{renderStars(4.6)}</div>
          <div className={styles.reviewCount}>
          ({course.reviews.toLocaleString()} reviews)
       </div>
      </div>
      <div className={styles.ratingBreakdown}>
        {[5, 4, 3, 2, 1].map(star => {
         const width =
          star === 5 ? '80%' : star === 4 ? '15%' : star === 3 ? '3%' : star === 2 ? '1%' : '1%';
         return (
          <div key={star} className={styles.ratingRow}>
            <div className={styles.ratingLabel}>
              <FaStar className={styles.ratingStarSmall} />
              <span>{star}</span>
            </div>
            <div className={styles.ratingBar}>
              <div className={styles.ratingBarFill} style={{ width }}></div>
            </div>
            <span className={styles.ratingPercentage}>{width}</span>
          </div>
        );
      })}
     </div>
    </div>

     <div className={styles.reviewsList}>
       {reviews.map(review => (
         <div key={review.id} className={styles.reviewItem}>
          <div className={styles.reviewHeader}>
          <img src={review.avatar} alt={review.name} className={styles.reviewAvatar} />
          <div className={styles.reviewMeta}>
            <div className={styles.reviewAuthor}>
              <span className={styles.reviewName}>{review.name}</span>
              <div className={styles.reviewStars}>{renderStars(review.rating)}</div>
            </div>
            <div className={styles.reviewDate}>{review.date}</div>
            <p className={styles.reviewText}>{review.text}</p>
          </div>
        </div>
        </div>
      ))}
       </div>
       </div>

          <button className={styles.viewMoreBtn}>View more Reviews</button>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
