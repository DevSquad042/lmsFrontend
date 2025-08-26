
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import LoginForm from "./Components/Forms/LoginForm";
import Register from "./Components/Forms/RegisterForm";
import CategoryPage from "./Pages/CategoryPage";
import CheckoutPage from "./Pages/Checkout";
import CourseDetailPage from "./Pages/CourseDetailsPage";
import CoursesPages from "./Pages/CoursesPage";
// import MentorsPage from "./Pages/MentorPage";
import MessaagesPage from "./Pages/MessagesPage";
import MessagesPage2 from "./Pages/MessagesPage2"; // ✅ This becomes your ChatPage
import Orders1 from "./Pages/Orders1";
import ProfileSettings from "./Pages/ProfileSettings";
import ReviewPage from "./Pages/ReviewsPage";
import CartPage from "./Pages/CartPage";
import TeachersPage from "./Pages/TeachersPage";
import OrderFailed from "./Pages/OrderFailed";
import NotFoundPage from "./Pages/404page";

// ✅ Toastify imports
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/details" element={<CourseDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order1" element={<Orders1 />} />
        <Route path="/order2" element={<OrderFailed />} />

        <Route path="/profile1" element={<ProfileSettings />} />
        <Route path="/profile2" element={<CoursesPages />} />
        <Route path="/profile3" element={<ReviewPage />} />
        <Route path="/profile4" element={<TeachersPage />} />

        {/* ✅ Messaging routes */}
        <Route path="/profile5" element={<MessaagesPage />} />
      <Route path="/profile5/:id" element={<MessagesPage2 />} />


        {/* Always keep * route last */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* ✅ Toast container (global host for notifications) */}
      <ToastContainer position="top-right" autoClose={2000} pauseOnHover={false} />
    </>
  );
}

export default App;







