/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header2 from "../Components/shared/Header2";
import ProfileSidebar from "../Components/shared/ProfileSidebar";
import Footer from "../Components/Layout/Footer";
import Pagination from "../Components/Pagination";
import Filter2 from "../Components/Filters/Filter2";
import MentorCard from "../Components/cards/MentorCard";
import "../Styles/TeachersPage.css";
import type { Mentor } from "../Types/Mentor";

const TeachersPage: React.FC = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/instructors", {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        });
        console.log("API Response:", res.data); // Debug raw data

        let data = [];
        if (Array.isArray(res.data)) {
          data = res.data;
        } else if (res.data && typeof res.data === 'object') {
          // Handle different response structures
          if (res.data.data && Array.isArray(res.data.data)) {
            data = res.data.data;
          } else if (res.data.instructors && Array.isArray(res.data.instructors)) {
            data = res.data.instructors;
          } else if (res.data.items && Array.isArray(res.data.items)) {
            data = res.data.items;
          }
        }

        console.log("Extracted data array:", data);

        const transformedMentors = data.map((instructor: any) => {
          console.log("Processing instructor:", instructor); // Debug each instructor
          return {
            id: instructor._id || instructor.id,
            firstName: instructor.firstName || instructor.firstName || "",
            lastName: instructor.lastName || instructor.lastName || "",
            email: instructor.email || "",
            userName: instructor.userName || instructor.username || "",
            createdAt: instructor.createdAt || new Date().toISOString(),
            updatedAt: instructor.updatedAt || new Date().toISOString(),
            __v: instructor.__v || 0,
            name: `${instructor.firstName || ""} ${instructor.lastName || ""}`.trim() || instructor.name || 'Unknown Instructor',
            rating: instructor.rating || 0,
            reviews: instructor.reviews || [],
            bio: instructor.bio || instructor.role || "Instructor",
            portfolio: instructor.portfolio || "",
            image: instructor.image || instructor.profilePicture || instructor.avatar || "",
          } as Mentor;
        });

        console.log("Transformed Mentors:", transformedMentors); // Debug transformed data
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

  const searchedMentors = mentors.filter((mentor) =>
    (mentor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
    (mentor.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
    (`${mentor.firstName} ${mentor.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()))
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
              setCurrentPage(1);
            }}
          />

          {loading ? (
            <div className="loading-spinner"></div>
          ) : searchedMentors.length === 0 ? (
            <p>No teachers match your search.</p>
          ) : (
            <div className="teachers-div">
              {paginatedMentors.map((mentor) => (
                <MentorCard
                  key={mentor.id}
                  mentor={mentor}
                />
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

export default TeachersPage;