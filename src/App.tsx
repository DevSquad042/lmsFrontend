import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

// ✅ Pages and Components
import Home from "./Pages/Home";
import LoginForm from "./Components/Forms/LoginForm";
import Register from "./Components/Forms/RegisterForm";
import CategoryPage from "./Pages/CategoryPage";
import CheckoutPage from "./Pages/Checkout";
import CoursePage from "./Pages/CourseDetailsPage";
import CoursesPages from "./Pages/CoursesPage";
import InstructorDetailPage from "./Pages/InstructorsDetailsPage";
import MessaagesPage from "./Pages/MessagesPage";
import MessagesPage2 from "./Pages/MessagesPage2";
import Orders1 from "./Pages/Orders1";
import ProfileSettings from "./Pages/ProfileSettings";
import ReviewPage from "./Pages/ReviewsPage";
import CartPage from "./Pages/CartPage";
import TeachersPage from "./Pages/TeachersPage";
import OrderFailed from "./Pages/OrderFailed";
import NotFoundPage from "./Pages/404page";
import OrderCompletePage from "./Pages/OrderCompletePage";
import MentorPage from "./Pages/MentorPage";

// ✅ Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ ProtectedRoute
import ProtectedRoute from "./Components/ProtectedRoute";

// ✅ Redux Slice
import { setUser } from "./store/slices/authSlice";
import type { AppDispatch } from "./store/index";
import type { User } from "./store/slices/authSlice";

function App() {
  const dispatch = useDispatch<AppDispatch>(); // Type the dispatch

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData) as User;
        dispatch(setUser(parsedUser));
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, [dispatch]);

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/courses/:id" element={<CoursePage />} /> {/* Use your CoursePage component */}
        <Route path="/teacher/:id" element={<InstructorDetailPage />} />
        <Route path="/mentors/:mentorId" element={<MentorPage />} />
        
        {/* Protected Routes */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order1"
          element={
            <ProtectedRoute>
              <Orders1 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order2"
          element={
            <ProtectedRoute>
              <OrderFailed />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile1"
          element={
            <ProtectedRoute>
              <ProfileSettings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile2"
          element={
            <ProtectedRoute>
              <CoursesPages />
            </ProtectedRoute>
          }
        />

        {/* Add this new route for order complete page */}
        <Route
          path="/order-complete/:courseId"
          element={
            <ProtectedRoute>
              <OrderCompletePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile3"
          element={
            <ProtectedRoute>
              <ReviewPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile4"
          element={
            <ProtectedRoute>
              <TeachersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile5"
          element={
            <ProtectedRoute>
              <MessaagesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile5/:id"
          element={
            <ProtectedRoute>
              <MessagesPage2 />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* ✅ Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        pauseOnHover={false}
      />
    </>
  );
}

export default App;