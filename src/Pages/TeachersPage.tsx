/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header2 from "../Components/shared/Header2";
import ProfileSidebar from "../Components/shared/ProfileSidebar";
import Footer from "../Components/Layout/Footer";
import Pagination from "../Components/Pagination";
import Filter2 from "../Components/Filters/Filter2";
import MentorCard from "../Components/cards/MentorCard";
import type { Mentor } from "../Types/Mentor";
import "../Styles/TeachersPage.css";

// ---------- Component ----------
const TeachersPage: React.FC = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://byway-hoce.onrender.com/api/instructors"
        );

        const data = Array.isArray(res.data) ? res.data : res.data.data || [];

        // Transform the mentor data from API response
        const transformedMentors: Mentor[] = data.map((instructor: any) => ({
          // Core identity fields
          _id: instructor._id,
          id: instructor._id, // alias for compatibility
          firstName: instructor.firstName || "Unknown",
          lastName: instructor.lastName || "Unknown",
          name: `${instructor.firstName || ""} ${instructor.lastName || ""}`.trim(),
          email: instructor.email,
          role: instructor.role || "instructor",

          // Profile data
          profile: instructor.profile,
          profilePicture: instructor.profile?.profilePicture || "",

          // Ratings and reviews
          avgRating: instructor.avgRating ?? 0,
          totalReviews: instructor.totalReviews || 0,
          reviews: instructor.reviews || [],

          // Student count - use actual data from API or default to 0
          studentsCount: instructor.studentsCount || instructor.studentCount || instructor.students || 0,
        }));

        setMentors(transformedMentors);
      } catch (error) {
        console.error("Error fetching mentors:", error);
        setMentors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  const searchedMentors = mentors.filter(
    (mentor) =>
      (mentor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (mentor.profile?.headline?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (mentor.role?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
  );

  const totalPages = Math.ceil(searchedMentors.length / itemsPerPage);

  const paginatedMentors = searchedMentors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="page-root">
      <Header2 />

      <div className="page-body">
        <ProfileSidebar />

        <main className="main-content">
          <Filter2
            title="Teachers"
            count={`(${searchedMentors.length})`}
            searchQuery={searchQuery}
            setSearchQuery={(query: string) => {
              setSearchQuery(query);
              setCurrentPage(1); // reset pagination on new search
            }}
            placeholder="Search teachers by name, specialty, or role..."
          />

          {loading ? (
            <div className="loading-spinner">Loading teachers...</div>
          ) : searchedMentors.length === 0 ? (
            <p className="no-results">No teachers match your search.</p>
          ) : (
            <>
              <div className="teachers-div">
                {paginatedMentors.map((mentor) => (
                  <MentorCard
                    key={mentor._id}
                    mentor={mentor}
                    showMessage={true}
                  />
                ))}
              </div>
              
              {totalPages > 1 && (
                <div className="pagination-wrapper">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page: number) => setCurrentPage(page)}
                  />
                </div>
              )}
            </>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default TeachersPage;