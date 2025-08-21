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
import MessagesPage2 from "./Pages/MessagesPage2";
import Orders1 from "./Pages/Orders1";
import ProfileSettings from "./Pages/ProfileSettings";
import ReviewPage from "./Pages/ReviewsPage";
import ShoppingCart from "./Pages/ShoppingCart";
import TeachersPage from "./Pages/TeachersPage";
import NotFoundPage from "./Pages/404page";





function App() {

  return (
  
  <Routes>
      <Route path="/"element={<Home/>}/>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/categories" element={<CategoryPage />} />
       <Route path="/course" element={< CourseDetailPage/>} />
       <Route path="/cart" element={< ShoppingCart/>} />
       <Route path="/checkout" element={<CheckoutPage/>} />
       <Route path="/order1" element={< Orders1/>} />

    <Route path="*" element={< NotFoundPage/>} />
        <Route path="/profile1" element={< ProfileSettings/>} />
         <Route path="/profile2" element={< CoursesPages/>} />
         <Route path="/profile3" element={< ReviewPage/>} />
          <Route path="/profile4" element={< TeachersPage/>} />
           <Route path="/profile5" element={< MessaagesPage/>} />
            <Route path="/profile6" element={< MessagesPage2/>} />
  </Routes>


  )
}

export default App


