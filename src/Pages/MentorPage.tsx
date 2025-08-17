import React from "react";
import "../assets/css/MentorPage.css";
import Header1 from "../Components/shared/Header1";
import Footer from "../Components/shared/Footer";
import TopCourses from "../Components/TopCourses";
import Rating from "../Components/cards/RatingSummary";
import Review from "../Components/cards/ReviewCard";
import Button from "../Components/shared/Buttons";
import Image from "../assets/Images/Ellipse 19.jpg";

interface InstructorCardProps {
  name: string;
  title: string;
  students: number;
  // courses: number;
  review: number;
  about: string;
  expertise: string[];
  experience: string;
  image: string;
}

const InstructorCard: React.FC<InstructorCardProps> = ({
  name,
  title,
  students,
  // courses,
  review,
  about,
  expertise,
  experience,
  image,
}) => {
  return (
    <>
      <Header1 />
      <section className="instructor-container">
        <div className="instructor-header">
          <div>
            <p className="instructor-label">INSTRUCTOR</p>
            <h1 className="instructor-name">{name}</h1>
            <p className="instructor-title">{title}</p>
            <div className="instructor-stats">
              <span>
                <strong>{students.toLocaleString()}</strong> Students
              </span>
              {/* <span><strong>{courses}</strong> Courses</span> */}
              <span>
                <strong>{review}</strong> Review
              </span>
            </div>
        <div>
          <h3>About Ronald</h3>
          <p>{about}</p>

          <h3>Areas of Expertise</h3>
          <ul>
            {expertise.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3>Professional Experience</h3>
          <p>{experience}</p>
        </div>
          </div>

          <div className="instructor-profile">
            <img src={image} alt={name} className="instructor-img" />
            <div className="instructor-actions">
              <Button backgroundColor="white" label={"Website"}/>
              <Button backgroundColor="white" label={"Twitter"}/>
              <Button backgroundColor="white" label={"Youtube"}/>

            </div>
          </div>
        </div>

      </section>
      <TopCourses />
      <div className="rating-container-section">
        <div className="ratings-section">
          <Rating
            summary={{
              average: review,
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
          <Review
            review={{
              id: "1",
              userAvatar: Image,
              userName: "John Doe",
              rating: 5,
              date: new Date().toISOString(),
              reviewText:
                "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
            }}
            className="review-card"
          />
          <Review
            review={{
              id: "2",
              userAvatar: Image,
              userName: "Jane Smith",
              rating: 4,
              date: new Date().toISOString(),
              reviewText:
                "The course was well-structured and provided a solid foundation in design principles. I particularly enjoyed the hands-on projects that allowed me to apply what I learned.",
            }}
            className="review-card"
          />

          <Review
            review={{
              id: "3",
              userAvatar: Image,
              userName: "Alice Johnson",
              rating: 5,
              date: new Date().toISOString(),
              reviewText:
                "This course exceeded my expectations! The instructor's passion for design is evident, and the community support was invaluable. I feel much more confident in my design skills now.",
            }}
            className="review-card"
          />
        </aside>
      </div>
      <Footer />
    </>
  );
};

export default InstructorCard;
