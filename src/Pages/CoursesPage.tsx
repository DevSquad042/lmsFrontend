/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Footer from "../Components/Layout/Footer";
import Header2 from "../Components/shared/Header2";
import ProfileSidebar from "../Components/shared/ProfileSidebar";
import Pagination from "../Components/Pagination";
import CourseCard from "../Components/cards/CourseCard";
import Filter2 from "../Components/Filters/Filter2";
import "../Styles/CoursesPage.css";
import type { Course } from "../Types/Course";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CoursesPages = () => {
  const { user } = useSelector((state: any) => state.auth);
  const location = useLocation();
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Relevance");
  const itemsPerPage = 6;

  // Check if this is a search results page
  const searchQueryFromState = location.state?.searchQuery;
  const fromSearch = location.state?.fromSearch;

  // Fetch user courses
  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates on unmounted component

    const fetchCourses = async (userId: string) => {
      try {
        // Retrieve token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          if (isMounted) {
            setTimeout(() => {
              if (isMounted) {
                toast.error("You are not authenticated. Please log in.");
                setLoading(false);
              }
            }, 100);
          }
          return;
        }

        console.log("Fetching user courses...");

        // Try the user courses endpoint first
        let response;

        try {
          response = await axios.get(
            `http://localhost:3000/api/enrollments/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } catch (firstError: any) {
          console.log("Primary endpoint failed, trying fallback:", firstError.message);

          // Fallback to enrollments endpoint
          try {
            response = await axios.get(
              "http://localhost:3000/api/enrollments",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          } catch (secondError: any) {
            console.error("Both endpoints failed:", secondError);

            // Try another potential endpoint
            try {
              response = await axios.get(
                "http://localhost:3000/api/courses/user",
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
            } catch (thirdError: any) {
              console.error("Third endpoint also failed:", thirdError);
              throw thirdError;
            }
          }
        }

        if (!isMounted) return; // Component was unmounted

        console.log("API Response:", response.data);
        console.log("Response status:", response.status);
        console.log("Token being sent:", token ? "Present" : "Missing");

        // Handle different response formats
        let coursesData = [];
        if (Array.isArray(response.data)) {
          // Direct array of courses
          console.log("Response is direct array");
          coursesData = response.data;
        } else if (response.data && response.data.courses && Array.isArray(response.data.courses)) {
          // { courses: [...] }
          console.log("Response has courses property");
          coursesData = response.data.courses;
        } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
          // { data: [...] }
          console.log("Response has data property");
          coursesData = response.data.data;
        } else if (response.data && response.data.enrollments && Array.isArray(response.data.enrollments)) {
          // Handle enrollment data - extract course information
          console.log("Response has enrollments property");
          coursesData = response.data.enrollments.map((enrollment: any) => {
            // If enrollment has a course property, use it
            if (enrollment.course) {
              return enrollment.course;
            }
            // If enrollment has course details directly
            return {
              _id: enrollment.courseId || enrollment._id,
              title: enrollment.courseTitle || enrollment.title || 'Unknown Course',
              description: enrollment.courseDescription || enrollment.description || '',
              instructor: enrollment.instructorName || enrollment.instructor || 'Unknown Instructor',
              rating: enrollment.rating || 0,
              reviews: enrollment.reviews || [],
              price: enrollment.price || 0,
              categories: enrollment.categories || [],
              tags: enrollment.tags || [],
              thumbnail: enrollment.thumbnail || '',
              sections: enrollment.sections || [],
              hours: enrollment.hours || 0,
              lectures: enrollment.lectures || 0,
              chapters: enrollment.chapters || 0,
              level: enrollment.level || 'Beginner',
              createdAt: enrollment.createdAt || new Date().toISOString(),
              updatedAt: enrollment.updatedAt || new Date().toISOString(),
            };
          });
        } else if (response.data && typeof response.data === 'object') {
          // If it's a single course/enrollment object, wrap it in array
          console.log("Response is single object, wrapping in array");
          coursesData = [response.data];
        } else {
          console.log("Response format not recognized:", typeof response.data, response.data);
        }

        console.log("Final processed courses data:", coursesData);
        console.log("Courses data length:", coursesData.length);

        if (isMounted) {
          setCourses(coursesData);
          setLoading(false);
        }
      } catch (err: any) {
        console.error("Error fetching courses:", err);
        console.error("Error response:", err.response?.data);

        if (isMounted) {
          // Show more detailed error message
          const errorMessage = err?.response?.data?.message ||
                             err?.response?.data?.error ||
                             err?.message ||
                             "Failed to load courses.";

          setTimeout(() => {
            if (isMounted) {
              toast.error(errorMessage);
              setLoading(false);
            }
          }, 100);
        }
      }
    };

    // Only fetch if user is available and has valid ID
    if (user && user.id && typeof user.id === 'string' && user.id.trim() !== '' && user.id !== 'undefined') {
      fetchCourses(user.id);
    } else {
      console.log('User not ready for courses fetch:', { user, userId: user?.id });
      setLoading(false);
    }

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false;
    };
  }, [user]);

  // Filter and sort courses
  useEffect(() => {
    try {
      let filtered = courses || [];

      // Search filter
      if (searchQuery && searchQuery.trim()) {
        filtered = filtered.filter(course =>
          course?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course?.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course?.instructor?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Sort
      switch (sortBy) {
        case "Rating":
          filtered = [...filtered].sort((a, b) => (b?.rating || 0) - (a?.rating || 0));
          break;
        case "Title":
          filtered = [...filtered].sort((a, b) => (a?.title || '').localeCompare(b?.title || ''));
          break;
        case "Newest":
          filtered = [...filtered].sort((a, b) =>
            new Date(b?.createdAt || 0).getTime() - new Date(a?.createdAt || 0).getTime()
          );
          break;
        case "Relevance":
        default:
          // Keep original order for relevance
          break;
      }

      setFilteredCourses(filtered);
      setCurrentPage(1); // Reset to first page when filtering/sorting
    } catch (error) {
      console.error('Error in filtering/sorting courses:', error);
      setFilteredCourses([]);
    }
  }, [courses, searchQuery, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const paginatedCourses = filteredCourses.slice(
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
            title={fromSearch ? `Search Results for "${searchQueryFromState}"` : "Courses"}
            count={filteredCourses.length}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onFilterClick={() => toast.info("Filter functionality coming soon!")}
          />

          {/* Debug info */}
          {!loading && courses.length === 0 && (
            <div style={{
              background: '#f0f0f0',
              padding: '15px',
              margin: '10px 0',
              fontSize: '12px',
              border: '1px solid #ccc',
              borderRadius: '5px'
            }}>
              <strong>🔍 Debug Info - No Courses Found</strong><br/>
              <br/>
              <strong>Possible Issues:</strong><br/>
              • API endpoint might not exist<br/>
              • User might not have any enrolled courses<br/>
              • API response format might be unexpected<br/>
              • Authentication token might be invalid<br/>
              <br/>
              <strong>Check:</strong><br/>
              • Browser console for detailed API response<br/>
              • Network tab for API call status<br/>
              • Backend logs for API endpoint activity<br/>
              <br/>
              <em>The console will show the exact API response and processing steps.</em>
            </div>
          )}

          {loading ? (
            <p>Loading courses...</p>
          ) : filteredCourses.length === 0 ? (
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