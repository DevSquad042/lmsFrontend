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

        const transformedMentors: Mentor[] = data.map((instructor: any) => ({
          id: instructor._id,
          name: `${instructor.firstName || "Unknown"} ${
            instructor.lastName || "Unknown"
          }`.trim(),
          firstName: instructor.firstName || "Unknown",
          lastName: instructor.lastName || "Unknown",
          profession: instructor.profession || "Instructor",
          rating: instructor.rating ?? 0,
          image: instructor.image || "",
          email: instructor.email,
          createdAt: instructor.createdAt,
          updatedAt: instructor.updatedAt,
          __v: instructor.__v,
          userName: instructor.userName,
          studentsCount: instructor.studentsCount,
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
      mentor.profession.toLowerCase().includes(searchQuery.toLowerCase())
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
                  showMessage={true} // Show the message icon
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
