import ShoppingCart from "../src/Pages/ShoppingCart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CoursePage from "./Components/cards/CoursePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShoppingCart />} />
        <Route path="/course-page" element={<CoursePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
