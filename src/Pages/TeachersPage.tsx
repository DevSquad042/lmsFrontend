import React from "react";
import Header2 from "../Components/shared/Header2";
import ProfileSidebar from "../Components/shared/ProfileSidebar";
import Footer from "../Components/Layout/Footer";
import Pagination from "../Components/Pagination";
import Filter2 from "../Components/Filters/Filter2";
import MentorCard from "../Components/cards/MentorCard";
import "../Styles/TeachersPage.css";


export interface Mentor {
  id: string; // changed from number to string
  name: string;
  role: string;
  rating: number;
  students: number;
  image: string;
}

const mentors: Mentor[] = [
  {
    id: "1",
    name: "John Doe",
    role: "Mathematics Teacher",
    rating: 4.5,
    students: 120,
    image: "lmsFrontend/src/assets/Images/mentor.jpg",
  },
  {
    id: "2",
    name: "Jane Smith",
    role: "Physics Instructor",
    rating: 4.8,
    students: 95,
    image: "lmsFrontend/src/assets/Images/mentor.jpg",
  },
  {
    id: "2",
    name: "Jane Smith",
    role: "Physics Instructor",
    rating: 4.8,
    students: 95,
    image: "lmsFrontend/src/assets/Images/mentor.jpg",
  },
  {
    id: "2",
    name: "Jane Smith",
    role: "Physics Instructor",
    rating: 4.8,
    students: 95,
    image: "lmsFrontend/src/assets/Images/mentor.jpg",
  },
  {
    id: "2",
    name: "Jane Smith",
    role: "Physics Instructor",
    rating: 4.8,
    students: 95,
    image: "lmsFrontend/src/assets/Images/mentor.jpg",
  },
  {
    id: "2",
    name: "Jane Smith",
    role: "Physics Instructor",
    rating: 4.8,
    students: 95,
    image: "lmsFrontend/src/assets/Images/mentor.jpg",
  },
  {
    id: "2",
    name: "Jane Smith",
    role: "Physics Instructor",
    rating: 4.8,
    students: 95,
    image: "lmsFrontend/src/assets/Images/mentor.jpg",
  },
  {
    id: "2",
    name: "Jane Smith",
    role: "Physics Instructor",
    rating: 4.8,
    students: 95,
    image: "lmsFrontend/src/assets/Images/mentor.jpg",
  },
];

const TeachersPage: React.FC = () => {
  return (
    <div className="page-root">
      <Header2 />

      <div className="page-body">
        <ProfileSidebar />

        <main className="main-content">
          <Filter2 title="Teachers" count={`(${mentors.length})`} />

          <div className="teachers-div">
            {mentors.map((mentor) => (
              <MentorCard
                key={mentor.id}
                mentor={mentor}
                showRating={false} // Only show the button
              />
            ))}
          </div>

          {/* Pagination at the bottom */}
          <div style={{ marginTop: "auto", paddingTop: 50 }}>
            <Pagination />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default TeachersPage;
