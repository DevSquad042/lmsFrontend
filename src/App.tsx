
import Hero from "./Components/Hero";
import Header1 from "./Components/shared/Header1";
import StatBlock from "./Components/StatBlock";
import TopCategories from "./Components/TopCategories";
import TopCourses from "./Components/TopCourses";
import TopInstructors from "./Components/TopInstructors";









const App = () => {
  return (
    <div>
      <Header1/>
      <Hero/>
      <StatBlock></StatBlock>
      <TopCategories/>
      <TopCourses/>
      <TopInstructors></TopInstructors>
     
    </div>
  )
}

export default App




