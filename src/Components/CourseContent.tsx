import React, { useState } from 'react';
import { FaChevronDown, FaPlayCircle } from 'react-icons/fa';
import type { Course } from '../Types/Course';
import styles from './ComponentStyles/CourseContent.module.css';

const CourseContent: React.FC<{ course: Course }> = ({ course }) => {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  // --- START OF DUMMY DATA FOR DEMO ---
  const dummyCourseDescription = `This interactive e-learning course will introduce you to User Experience (UX) design, the art of creating products and services that are intuitive, enjoyable, and user-friendly. Gain a solid foundation in UX principles and learn to apply them in real-world scenarios through engaging modules and interactive exercises.`;
  
  const dummySections = [
    {
      _id: '1',
      title: 'Introduction to UX Design',
      lessons: ['Introduction to UX', 'The UX Design Process', 'User-Centered Design Principles'],
    },
    {
      _id: '2',
      title: 'Basics of User-Centered Design',
      lessons: ['User Research Methods', 'Creating Personas', 'Journey Mapping'],
    },
    {
      _id: '3',
      title: 'Elements of User Experience',
      lessons: ['Usability vs. Utility', 'Information Architecture', 'Interaction Design'],
    },
    {
      _id: '4',
      title: 'Visual Design Principles',
      lessons: ['Layout and Composition', 'Color Theory', 'Typography for UX'],
    },
  ];
  // --- END OF DUMMY DATA ---

  return (
    <div className={styles.contentContainer}>
      {/* Syllabus Section */}
      <h2 className={styles.sectionHeading}>Syllabus</h2>
      <div className={styles.syllabusContainer}>
        {course.sections.map((section, index) => (
          <div key={index} className={styles.section}>
            <div 
              className={styles.sectionHeader} 
              onClick={() => toggleSection(index)}
            >
              <div className={styles.titleWrapper}>
                <FaChevronDown
                  className={`${styles.chevron} ${openSection === index ? styles.open : ''}`}
                />
                <h3 className={styles.sectionTitle}>{section.title}</h3>
              </div>
              <span className={styles.sectionStatus}>
                {section.isPreview ? 'Preview' : 'Video'}
              </span>
            </div>
            {openSection === index && (
              <div className={styles.sectionContent}>
                <div className={styles.lesson}>
                  <FaPlayCircle className={styles.playIcon} />
                  <span className={styles.lessonTitle}>Introduction to {section.title}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Course Description */}
      <p className={styles.descriptionText}>{dummyCourseDescription}</p>

      {/* Certification Section */}
      <div className={styles.certificationSection}>
        <h3 className={styles.certificationTitle}>Certification</h3>
        <p className={styles.certificationText}>
          At Byway, we understand the significance of formal recognition for your hard work and dedication to continuous learning. Upon successful completion of our courses, you will earn a prestigious certification that not only validates your expertise but also opens doors to new opportunities in your chosen field.
        </p>
      </div>

      {/* Dummy Syllabus Section */}
      <h2 className={styles.sectionHeading}>Syllabus</h2>
      <div className={styles.syllabusContainer}>
        {dummySections.map((section, index) => (
          <div key={index} className={styles.section}>
            <div 
              className={styles.sectionHeader} 
              onClick={() => toggleSection(index)}
            >
              <div className={styles.titleWrapper}>
                <FaChevronDown
                  className={`${styles.chevron} ${openSection === index ? styles.open : ''}`}
                />
                <h3 className={styles.sectionTitle}>{section.title}</h3>
              </div>
              <span className={styles.sectionStatus}>Preview</span>
            </div>
            {openSection === index && (
              <div className={styles.sectionContent}>
                {section.lessons.map((lessonTitle, lessonIndex) => (
                  <div key={lessonIndex} className={styles.lesson}>
                    <FaPlayCircle className={styles.playIcon} />
                    <span className={styles.lessonTitle}>{lessonTitle}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseContent;
