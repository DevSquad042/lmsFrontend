import './ComponentStyles/Hero.css'
import heroimg from '../assets/Images/heroimg.png'
import Button from './shared/Buttons'

function Hero() {
  return (
    <div className='general-container'>
      <div className='text-content'>
        <h3>Unlock Your Potential<br/>with Byway</h3>
        <p>Welcome to Byway, where learning knows no bounds. We believe that education is the key to personal and <br />professional growth, and we're here to guide you on your journey to success. Whether  you're a student,<br /> professional, or lifelong learner, our cutting-edge Learning Management System is  designed to elevate your  <br />learning experience</p>
         <Button
            label="Start your Instructor Journey"
            backgroundColor="#2563EB" />
      </div>
       <img src={heroimg} alt="Instructor" />
    </div>
  )
}

export default Hero
