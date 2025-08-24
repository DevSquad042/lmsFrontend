import Filter2 from "../Components/Filters/Filter2";
import Footer from "../Components/Layout/Footer";
import Header2 from "../Components/shared/Header2";
import ProfileSidebar from "../Components/shared/ProfileSidebar";
import Pagination from "../Components/Pagination";
import CourseCard from "../Components/cards/CourseCard";


import "../Styles/CoursesPage.css";

// Example data
import type { Course } from "../Types/Course";
const sampleCourses: Course[] = [
  {
    id: "1",
    title: "Beginner's Guide to Design",
    instructor: "Ronald Richards",
    rating: 5,
    reviews: 1200,
    description: "22 Total Hours. 155 Lectures. Beginner",
    price: 49.99,
    thumbnail: "/course-image.jpg"
  },
  
    {
    id: "2",
    title: "React from Scratch",
    instructor: "Jane Doe",
    rating: 5,
    reviews: 1200,
    description: "40 Total Hours. 200 Lectures. Intermediate",
    price: 199.99,
    thumbnail: "/course-image.jpg"
  },
    {
    id: "3",
    title: "Advanced JavaScript Concepts",
    instructor: "John Smith",
    rating: 5,
    reviews: 850,
    description: "30 Total Hours. 175 Lectures. Advanced",
    price: 179.99,
    thumbnail: "/course-image.jpg"
  },
    {
    id: "4",
    title: "Python for Data Science",
    instructor: "Maria Garcia",
    rating: 5,
    reviews: 1200,
    description: "45 Total Hours. 250 Lectures. Intermediate",
    price: 189.9,
    thumbnail: "/course-image.jpg"
  },
    {
    id: "5",
    title: "Beginner's Guide to Design",
    instructor: "Ronald Richards",
    rating: 5,
    reviews: 1200,
    description: "45 Total Hours. 250 Lectures. Intermediate",
    price: 49.99,
    thumbnail: "/course-image.jpg"
  },
    {
    id: "6",
    title: "React from Scratch",
    instructor: "Jane Doe",
    rating: 5,
    reviews: 1200,
    description: "40 Total Hours. 200 Lectures. Intermediate",
    price: 199.99,
    thumbnail: "/course-image.jpg"
  },
    { 
    id: "7",
    title: "Advanced JavaScript Concepts",
    instructor: "John Smith",
    rating: 5,
    reviews: 850,
    description: "30 Total Hours. 175 Lectures. Advanced",
    price: 179.99,
    thumbnail: "/course-image.jpg"
  },
    { 
    id: "8",
    title: "Python for Data Science",
    instructor: "Maria Garcia",
    rating: 5,
    reviews: 1200,
    description: "45 Total Hours. 250 Lectures. Intermediate",
    price: 189.9,
    thumbnail: "/course-image.jpg"
  },
  {
    id: "9",
    title: "Beginner's Guide to Design",
    instructor: "Ronald Richards",
    rating: 5,
    reviews: 1200,
    description: "22 Total Hours. 155 Lectures. Beginner",
    price: 49.99,
    thumbnail: "/course-image.jpg"
  }
];

const CoursesPages = () => {
  return (
    <div>
      <Header2 />
      <section className="courses-section">
        {/* Sidebar */}
        <div className="sidebar-container">
          <ProfileSidebar />
        </div>

        {/* Main content */}
        <div className="main-content">
          {/* Filter Bar */}
            <Filter2 title="Courses" count="(12)" />

           {/* Courses Grid */}
          <div className="courses-grid">
            {sampleCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CoursesPages;
