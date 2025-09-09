import React from 'react';
import Logo from '../../assets/logo/Logo.png';
import { FaFacebook, FaGithub, FaMicrosoft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";

import './Footer.css'
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className='Footer-container'>
      <div className='Sub-container'>
        <img src={Logo} alt="Byway Logo" />
        <p>Empowering learners through accessible and engaging online education.</p>
        <p>Byway is a leading online learning platform dedicated to providing high-quality, flexible, and affordable educational experiences.</p>
      </div>

      <div className='Sub-container'>
        <h3>Get Help</h3>
        <Link to="mailto:bywatedu@webkul.in">
          <p>Contact Us</p>
        </Link>
        <Link to="*">
          <p>Latest Articles</p>
        </Link>
        <Link to="*">
          <p>FAQ</p>
        </Link>
      </div>

      <div className='Sub-container'>
        <h3>Programs</h3>
        <p>Art & Design</p>
        <p>Business</p>
        <p>IT & Software</p>
        <p>Languages</p>
        <p>Programming</p>
      </div>

      <div className='Sub-container2'>
        <h3>Contact Us</h3>
        <p>Kilometer 7 Enugu Port Harcourt Express Way, Centenary City Enugu</p>
        <p>Tel: +(123) 907-798-3405</p>
        <p>Mail: bywatedu@webkul.in</p>
        <div className='Icons'>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="https://www.github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" aria-label="Google">
            <FcGoogle />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaXTwitter />
          </a>
          <a href="https://www.microsoft.com" target="_blank" rel="noopener noreferrer" aria-label="Microsoft">
            <FaMicrosoft />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

