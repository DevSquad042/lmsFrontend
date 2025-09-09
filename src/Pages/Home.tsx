import StatBlock from '../Components/StatBlock'
import TopCategories from '../Components/TopCategories'
import TopCourses from '../Components/TopCourses'
import TopInstructors from '../Components/TopInstructors'
import TestimonialsSection from '../Components/TestimonialsSection'
import InstructorJourney from '../Components/InstructorJourney'
import Footer from '../Components/Layout/Footer'
import Header1 from '../Components/shared/Header1'
import Header2 from '../Components/shared/Header2'
import Hero from '../Components/Hero'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'

function Home() {
  const user = useSelector((state: RootState) => state.auth.user);
  console.log('User in Home:', user);

  return (
    <div>
      {user ? <Header2 /> : <Header1 />}
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
