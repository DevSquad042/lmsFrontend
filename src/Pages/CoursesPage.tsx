import { useEffect, useState } from "react";
import axios from "axios";
import Filter2 from "../Components/Filters/Filter2";
import Footer from "../Components/Layout/Footer";
import Header2 from "../Components/shared/Header2";
import ProfileSidebar from "../Components/shared/ProfileSidebar";
import Pagination from "../Components/Pagination";
import CourseCard from "../Components/cards/CourseCard";
import "../Styles/CoursesPage.css";
import type { Course } from "../Types/Course";

const CoursesPages = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 6;

  // Simulated list of course IDs the user has paid for
  const paidCourseIds = ["1", "3", "5", "7", "9", "10", "12", "14"];

  useEffect(() => {
    axios
      .get("https://byway-hoce.onrender.com/api/courses")
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
        setLoading(false);
      });
  }, []);

  // Filter only the courses the user has paid for
  const enrolledCourses = courses.filter((course) =>
    paidCourseIds.includes(course.id)
  );

  // Filter by search query
  const searchedCourses = enrolledCourses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginate the searched courses
  const totalPages = Math.ceil(searchedCourses.length / itemsPerPage);
  const paginatedCourses = searchedCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="courses-wrapper">
      <Header2 />
      <section className="courses-section">
        <aside className="sidebar-container">
          <ProfileSidebar />
        </aside>

        <main className="main-content">
          <Filter2
            title="My Courses"
            count={`(${searchedCourses.length})`}
            searchQuery={searchQuery}
            setSearchQuery={(query: string) => {
              setSearchQuery(query);
              setCurrentPage(1); // Reset pagination on search
            }}
          />

          {loading ? (
            <p>Loading courses...</p>
          ) : searchedCourses.length === 0 ? (
            <p>No courses match your search. Try a different keyword.</p>
          ) : (
            <>
              <div className="courses-grid">
                {paginatedCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page: number) => setCurrentPage(page)}
              />
            </>
          )}
        </main>
      </section>
      <Footer />
    </div>
  );
};

export default CoursesPages;