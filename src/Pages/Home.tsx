import StatBlock from '../Components/StatBlock'
import TopCategories from '../Components/TopCategories'
import TopCourses from '../Components/TopCourses'
import TopInstructors from '../Components/TopInstructors'
import TestimonialsSection from '../Components/TestimonialsSection'
import InstructorJourney from '../Components/InstructorJourney'
import Footer from '../Components/shared/Footer'
import Header1 from '../Components/shared/Header1'
import Hero from '../Components/Hero'

function Home() {
  return (
    <div>
     < Header1/>
     <Hero/>
    <StatBlock/>
    <TopCategories/>
    <TopCourses/>
    <TopInstructors/>
    <TestimonialsSection/>
    <InstructorJourney/>
    <Footer/>
    </div>
  )
}

export default Home
