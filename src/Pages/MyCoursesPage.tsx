import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import CourseCard from '../Components/cards/CourseCard';
import Header2 from '../Components/shared/Header2';
import Footer from '../Components/Layout/Footer';
import ProfileSidebar from '../Components/shared/ProfileSidebar';
import Filter2 from '../Components/Filters/Filter2';
import Pagination from '../Components/Pagination';
import '../Styles/TeachersPage.css';

const MyCoursesPage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [paidCoursesFetched, setPaidCoursesFetched] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const fetchEnrolledCourses = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.log("No token found for fetching enrolled courses");
        return;
      }

      console.log("Fetching enrolled courses from API...");
      const response = await fetch("http://localhost:3000/api/enrolled-courses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch enrolled courses:", response.status, response.statusText);
        return;
      }

      const data = await response.json();
      console.log("Enrolled courses API response:", data);

      // Handle different response structures
      const courses = Array.isArray(data) ? data : data.data || data.courses || [];
      console.log("Processed enrolled courses:", courses);

      setEnrolledCourses(courses);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
      setEnrolledCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("MyCoursesPage useEffect - user:", user);
    console.log("MyCoursesPage - sessionStorage user:", sessionStorage.getItem("user"));
    if (user && !paidCoursesFetched) {
      setPaidCoursesFetched(true);
      fetchEnrolledCourses();
    }
  }, [user, paidCoursesFetched]);


  const searchedCourses = enrolledCourses.filter(
    (course) =>
      (course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (course.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
  );

  const totalPages = Math.ceil(searchedCourses.length / itemsPerPage);

  const paginatedCourses = searchedCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (!user) return <p>Please log in to view your courses.</p>;

  return (
    <div className="page-root">
      <Header2 />

      <div className="page-body">
        <ProfileSidebar />

        <main className="main-content">
          <Filter2
            title="My Courses"
            count={`(${searchedCourses.length})`}
            searchQuery={searchQuery}
            setSearchQuery={(query: string) => {
              setSearchQuery(query);
              setCurrentPage(1);
            }}
          />

          {loading ? (
            <div className="loading-spinner"></div>
          ) : searchedCourses.length === 0 ? (
            <p>No courses match your search.</p>
          ) : (
            <div className="teachers-div">
              {paginatedCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}

          <div className="pagination-wrapper">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page: number) => setCurrentPage(page)}
            />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default MyCoursesPage;