import './ComponentStyles/Hero.css';

import Button from './shared/Buttons';

import Main from '../assets/Images/herooooo.svg';

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

       <img src={Main} alt="Hero" className="hero-img" />

      
    </section>
  );
}

export default Hero;