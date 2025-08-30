import { useState } from "react";
import {
  FaChevronDown,
  FaChevronRight,
  FaRegCheckSquare,
  FaRegSquare,
} from "react-icons/fa";
import { FiVideo } from "react-icons/fi";
import "./CardsStyle/CourseSidebar2.css";

type Lesson = {
  id: number;
  title: string;
  duration: string;
};

const CourseSidebar: React.FC = () => {
  const [openSection, setOpenSection] = useState<string>("intro");
  const [activeLesson, setActiveLesson] = useState<number>(3);
  const [completed, setCompleted] = useState<number[]>([1, 2]);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? "" : section);
  };

  const lessons: Record<string, Lesson[]> = {
    intro: [
      { id: 1, title: "What is User Experience (UX) Design?", duration: "4min" },
      { id: 2, title: "Historical Overview of UX Design", duration: "4min" },
      { id: 3, title: "Understanding User-Centered Design", duration: "4min" },
      { id: 4, title: "The Role of UX Design in Digital Products", duration: "4min" },
      { id: 5, title: "Introduction to UX Design Tools and Techniques", duration: "4min" },
    ],
  };

  const toggleCompletion = (id: number) => {
    if (completed.includes(id)) {
      setCompleted(completed.filter((lessonId) => lessonId !== id));
    } else {
      setCompleted([...completed, id]);
    }
  };

  return (
    <div className="sidebar2">
      <h3 className="sidebar-title">Course Completion</h3>

      {/* Section: Introduction to UX Design */}
      <div className="section">
        <div
          className="section-header3"
          onClick={() => toggleSection("intro")}
        >
          {openSection === "intro" ? <FaChevronDown /> : <FaChevronRight />}
          <span>Introduction to UX Design</span>
        </div>
        <hr />

        {openSection === "intro" && (
          <ul className="lesson-list">
            {lessons.intro.map((lesson) => (
              <li
                key={lesson.id}
                className={`lesson-item ${
                  activeLesson === lesson.id ? "active" : ""
                }`}
                onClick={() => setActiveLesson(lesson.id)}
              >
                <div
                  className="lesson-left"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent triggering active state
                    toggleCompletion(lesson.id);
                  }}
                >
                  {completed.includes(lesson.id) ? (
                    <FaRegCheckSquare className="check-completed" />
                  ) : (
                    <FaRegSquare className="check" />
                  )}
                  <span className="lesson-title">{lesson.title}</span>
                </div>
                <div className="lesson-right">
                  <FiVideo className="video-icon" />
                  <span className="duration">{lesson.duration}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* More Sections */}
      <div className="section">
        <div
          className="section-header3"
          onClick={() => toggleSection("basics")}
        >
          {openSection === "basics" ? <FaChevronDown /> : <FaChevronRight />}
          <span>Basics of User-Centered Design</span>
        </div>
      </div>
      <hr />

      <div className="section">
        <div
          className="section-header3"
          onClick={() => toggleSection("elements")}
        >
          {openSection === "elements" ? <FaChevronDown /> : <FaChevronRight />}
          <span>Elements of User Experience</span>
        </div>
      </div>
      <hr />

      <div className="section">
        <div
          className="section-header3"
          onClick={() => toggleSection("visual")}
        >
          {openSection === "visual" ? <FaChevronDown /> : <FaChevronRight />}
          <span>Visual Design Principles</span>
        </div>
      </div>
    </div>
  );
};

export default CourseSidebar;