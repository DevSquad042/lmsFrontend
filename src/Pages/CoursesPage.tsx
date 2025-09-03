/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../Components/Layout/Footer";
import Header2 from "../Components/shared/Header2";
import ProfileSidebar from "../Components/shared/ProfileSidebar";
import Pagination from "../Components/Pagination";
import CourseCard from "../Components/cards/CourseCard";
import "../Styles/CoursesPage.css";
import type { Course } from "../Types/Course";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CoursesPages = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Retrieve token from localStorage (or your preferred storage)
        const token = localStorage.getItem("token"); // Use correct key from authSlice

        if (!token) {
          toast.error("You are not authenticated. Please log in.");
          setLoading(false);
          return;
        }

        // Make API request with Authorization header
        const response = await axios.get(
          "https://byway-hoce.onrender.com/api/enrollments",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in header
            },
          }
        );

        setCourses(response.data);
        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching courses:", err);
        toast.error(
          err.response?.data?.message || "Failed to load courses."
        );
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const paginatedCourses = courses.slice(
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
          <h2 className="courses-title">All Courses ({courses.length})</h2>

          {loading ? (
            <p>Loading courses...</p>
          ) : courses.length === 0 ? (
            <p>No courses available at the moment.</p>
          ) : (
            <>
              <div className="courses-grid">
                {paginatedCourses.map((course) => (
                  <CourseCard key={course._id} course={course} />
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
      <ToastContainer />
    </div>
  );
};

export default CoursesPages;