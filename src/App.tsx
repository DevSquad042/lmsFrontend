// import Testimony from './Components/TestimonialsSection'
// import { mentors } from './data/Mentor';
// import TopInstructors from './Components/TopInstructors';
// import MentorCard from './Components/cards/MentorCard';
// import Courses from './Components/TopCourses'
// import Categories from './Components/TopCategories'
// import Stat from './Components/StatBlock'
// import Instructor from './Components/InstructorJourney'
// import RonaldProfile from './Components/cards/Ronald';
// import InstructorProfile from './Pages/InstructorPage';








// function App() {
//   return (
//     <div>
// <InstructorProfile />
//     </div>
//   );
    
    
  
// };

// export default App;

// import React from "react";
import InstructorCard from "./Pages/MentorPage";
import Image from "./assets/images/profileImage.png";

function App() {
  return (
    <><InstructorCard
      name="Ronald Richards"
      title="UI/UX Designer, Web developer, and Teacher"
      students={1000}
      // courses={12}
      review={154}
      about="Ronald Richard is a highly skilled UX/UI Designer with over a decade of experience in crafting user-centric digital solutions. With a background in graphic design and a keen eye for detail, Ronald specializes in creating intuitive interfaces that delight users and drive business results."
      expertise={[
        'User Experience (UX) Design',
'User Interface (UI) Design',
'Information Architecture',
'Interaction Design',
'Visual Design',
'Usability Testing',
'Wireframing and Prototyping' ,
'Design Thinking',
      ]}
      experience="Ronald Richard has an extensive professional background in UX/UI design, having worked with renowned companies such as [Company Name] and [Company Name]. His portfolio includes a diverse range of projects spanning web applications, mobile apps, and e-commerce platforms."
      image={Image}
    /></>
  );
}

export default App;