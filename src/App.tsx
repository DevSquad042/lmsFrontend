
//import { ReviewSection } from "./Components/Rating";
import ReviewSection from "./Components/Rating";
import CourseDetailPage from "./Pages/CoursePage";



function App() {
  return (


    <div>

     <CourseDetailPage/>
     <ReviewSection productId="p1" currentUser="DemoUser"/>
   
     {/*<ReviewSection productId="p1" currentUser="DemoUser"/>*/}
     
    </div>

  )
};

export default App;


