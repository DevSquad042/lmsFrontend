/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { fetchPaidCourses } from "../store/slices/authSlice";
import type { RootState, AppDispatch } from "../store";

const CoursesPages = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch enrolled courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("You are not authenticated. Please log in.");
          setLoading(false);
          return;
        }

        // Refresh user's paid courses data
        if (user?.id) {
          dispatch(fetchPaidCourses(user.id));
        }

        const response = await axios.get(
          "https://byway-hoce.onrender.com/api/enrolled-courses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // ✅ Handle both possible API response formats
        let enrolledCourses: Course[] = [];

        if (Array.isArray(response.data)) {
          // Case 1: array of enrollments with { course }
          enrolledCourses = response.data.map((enrollment: any) => enrollment.course);
        } else if (response.data.courses) {
          // Case 2: object with { courses: [] }
          enrolledCourses = response.data.courses;
        }

        setCourses(enrolledCourses || []);
        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching courses:", err);
        toast.error(err.response?.data?.message || "Failed to load courses.");
        setLoading(false);
      }
    };

    fetchCourses();
  }, [dispatch, user?.id]);

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
          <h2 className="courses-title">
            Enrolled Courses ({courses.length})
          </h2>

          {loading ? (
            <div className="loading-spinner"></div>
          ) : courses.length === 0 ? (
            <p>You haven't enrolled in any courses yet.</p>
          ) : (
            <>
              <div className="courses-grid">
                {paginatedCourses.map((course) => (
                  <CourseCard 
                    key={course._id} 
                    course={course} 
                    isEnrolled={true} // This tells the card it's an enrolled course
                  />
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