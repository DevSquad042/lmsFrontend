import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../Styles/MentorPage.css";
import Header1 from "../Components/shared/Header1";
import Footer from "../Components/Layout/Footer";
import TopCourses from "../Components/TopCourses";
import Rating from "../Components/cards/RatingSummary";
import Review from "../Components/cards/ReviewCard";
import Button from "../Components/shared/Buttons";
import Image from "../assets/Images/Ellipse 19.jpg";

interface Mentor {
  id: string;
  name: string;
  title: string;
  students: number;
  review: number;
  about: string;
  expertise: string[];
  experience: string;
  image: string;
}

const InstructorDetailPage: React.FC = () => {
  const { id } = useParams();
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/mentors/${id}`)
      .then((res) => {
        setMentor(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching mentor:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading instructor...</p>;
  if (!mentor) return <p>Instructor not found.</p>;

  return (
    <>
      <Header1 />
      <section className="instructor-container">
        <div className="instructor-header">
          <div>
            <p className="instructor-label">INSTRUCTOR</p>
            <h1 className="instructor-name">{mentor.name}</h1>
            <p className="instructor-title">{mentor.title}</p>
            <div className="instructor-stats">
              <span><strong>{mentor.students.toLocaleString()}</strong> Students</span>
              <span><strong>{mentor.review}</strong> Review</span>
            </div>

            <div>
              <h3>About {mentor.name}</h3>
              <p>{mentor.about}</p>

              <h3>Areas of Expertise</h3>
              <ul>
                {mentor.expertise.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h3>Professional Experience</h3>
              <p>{mentor.experience}</p>
            </div>
          </div>

          <div className="instructor-profile">
            <img src={mentor.image} alt={mentor.name} className="instructor-img" />
            <div className="instructor-actions">
              <Button label={"Website"} />
              <Button label={"Twitter"} />
              <Button label={"Youtube"} />
            </div>
          </div>
        </div>
      </section>

      <TopCourses />
      <div className="rating-container-section">
        <div className="ratings-section">
          <Rating
            summary={{
              average: mentor.review,
              totalReviews: 1000,
              breakdown: [
                { stars: 5, percentage: 80 },
                { stars: 4, percentage: 10 },
                { stars: 3, percentage: 5 },
                { stars: 2, percentage: 3 },
                { stars: 1, percentage: 2 },
              ],
            }}
          />
        </div>
        <aside className="reviews-section">
          <h2>Learner Reviews</h2>
          {/* Static reviews for now */}
          <Review
            review={{
              id: "1",
              userAvatar: Image,
              userName: "John Doe",
              rating: 5,
              date: new Date().toISOString(),
              reviewText: "Amazing instructor, very clear and engaging!",
            }}
            className="review-card"
          />
        </aside>
      </div>
      <Footer />
    </>
  );
};

export default InstructorDetailPage;
