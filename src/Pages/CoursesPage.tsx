import Filter2 from "../Components/Filters/Filter2"

import Footer from "../Components/Layout/Footer"
import Header2 from "../Components/shared/Header2"
import ProfileSidebar from "../Components/shared/ProfileSidebar"
import Pagination from "../Components/Pagination"

import '../Styles/CoursesPage.css'

const CoursesPage = () => {
  return (
    <div>
 <Header2/>
        <section>
            <ProfileSidebar/>
            <div  className="filter-container">
            <Filter2 title="Courses" count="(12)"/>
           
        </div>
        </section>
        < Pagination/>
       <Footer/>
    </div>
  )
}

export default CoursesPage
