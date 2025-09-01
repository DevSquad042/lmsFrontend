import './ComponentStyles/Hero.css';
import heroimg from '../assets/Images/heroimg.png';
import Button from './shared/Buttons';
import Students from '../assets/Images/Students.png';
import Dots from '../assets/Images/Dots.png';
import CourseRate from '../assets/Images/CourseRate.png';
import CouserNumber from '../assets/Images/CoursesNumber.png';

function Hero() {
  return (
    <section className="hero-container">
      <div className="hero-text">
        <h1>Unlock Your Potential with <span>Byway</span></h1>
        <p>
          Welcome to Byway, where learning knows no bounds. We believe that education is the key to personal and professional growth, and we're here to guide you on your journey to success. Whether you're a student, professional, or lifelong learner, our cutting-edge Learning Management System is designed to elevate your learning experience.
        </p>
        <Button className="hero-button" label="Start your Instructor Journey" />
      </div>

      <div className="hero-visuals">
       
        <img src={heroimg} alt="Instructor" className="main-hero-img" />
       

        <img src={CourseRate} alt="Course completion rate" className="stat-img rate" />
        <img src={CouserNumber} alt="Courses sold" className="stat-img number" />
        <img src={Students} alt="Students" className="students-img" />
         <img src={Dots} alt="Decorative dots" className="dots-bg" />
      
      </div>
    </section>
  );
}

export default Hero;