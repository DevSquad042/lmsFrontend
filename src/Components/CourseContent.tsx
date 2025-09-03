import React, { useState } from "react";
import { FaChevronDown, FaPlayCircle } from "react-icons/fa";
import styles from "./ComponentStyles/CourseContent.module.css";

// Define types more explicitly (if not already in ../Types/Course)
export interface Section {
  title: string;
  isPreview: boolean;
}

export interface Course {
  title: string;
  sections: Section[];
}

interface CourseContentProps {
  course: Course;
}

const CourseContent: React.FC<CourseContentProps> = ({ course }) => {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenSection((prev) => (prev === index ? null : index));
  };

  return (
    <div className={styles.contentContainer}>
      <h2>Syllabus</h2>
      {course.sections.map((section, index) => (
        <div key={index} className={styles.section}>
          <div
            className={styles.sectionHeader}
            onClick={() => toggleSection(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") toggleSection(index);
            }}
          >
            <div className={styles.titleWrapper}>
              <FaChevronDown
                className={`${styles.chevron} ${
                  openSection === index ? styles.open : ""
                }`}
              />
              <h3 className={styles.sectionTitle}>{section.title}</h3>
            </div>
            <span className={styles.sectionStatus}>
              {section.isPreview ? "Preview" : "Video"}
            </span>
          </div>

          {openSection === index && (
            <div className={styles.sectionContent}>
              <div className={styles.lesson}>
                <FaPlayCircle className={styles.playIcon} />
                <span className={styles.lessonTitle}>
                  Introduction to {section.title}
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseContent;
