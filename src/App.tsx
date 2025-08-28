// src/App.tsx
import CourseCard from "./Components/cards/CourseCard";
import ReviewSection from "./Components/Rating";
import CourseDetailPage from "./Pages/CourseDetailsPage";

function App() {
  // you can change this to any valid courseId from your backend
  const testCourseId = "6895fda5ef5fc1bf0a804de3";

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Course Page</h1>
      <p>Welcome to the course! Scroll down to see reviews:</p>

      {/* Mount the review system */}
      <CourseDetailPage/>
    </div>
  );
}

export default App;

