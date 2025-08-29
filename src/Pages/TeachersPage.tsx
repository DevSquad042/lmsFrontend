import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Header2 from "../Components/shared/Header2";
import ProfileSidebar from "../Components/shared/ProfileSidebar";
import Footer from "../Components/Layout/Footer";
import Pagination from "../Components/Pagination";
import Filter2 from "../Components/Filters/Filter2";
import MentorCard from "../Components/cards/MentorCard";
import "../Styles/TeachersPage.css";
import type { RootState } from "../store/store"; // ✅ Import RootState

export interface Mentor {
  id: string;
  name: string;
  role: string;
  rating: number;
  students: number;
  image: string;
}

const TeachersPage: React.FC = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // ✅ Typed selector for paidCourses
  const paidCourses = useSelector(
    (state: RootState) => state.auth.user?.paidCourses || []
  );

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);

        if (paidCourses.length === 0) {
          setMentors([]);
          return;
        }

        // 🔹 Build query string from paidCourses
        const query = paidCourses.map((id) => `courseId=${id}`).join("&");

        // 🔹 Replace with your actual API endpoint
        const res = await axios.get(`/api/mentors?${query}`);

        const data = Array.isArray(res.data) ? res.data : res.data.data;
        setMentors(data || []);
      } catch (error) {
        console.error("Error fetching mentors:", error);
        setMentors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, [paidCourses]);

  // 🔍 Filter by search query
  const searchedMentors = mentors.filter((mentor) =>
    mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 📦 Paginate the filtered mentors
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
            <p>Loading teachers...</p>
          ) : paidCourses.length === 0 ? (
            <p>You haven’t enrolled in any courses yet.</p>
          ) : searchedMentors.length === 0 ? (
            <p>No teachers match your search.</p>
          ) : (
            <div className="teachers-div">
              {paginatedMentors.map((mentor) => (
                <MentorCard
                  key={mentor.id}
                  mentor={mentor}
                  showRating={false}
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
