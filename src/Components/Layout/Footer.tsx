import React from 'react';
import Logo from '../../assets/logo/Logo.png';
import { FaFacebook, FaGithub, FaMicrosoft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";

import './Footer.css'
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <div className='Footer-container'>
      <div className='Sub-container'>
        <img src={Logo} alt="Logo" />
        <p>Empowering learners through accessible and engaging online  <br />education.</p>
        <p>Byway is a leading online learning platform dedicated to <br /> providing high-quality, flexible, and affordable educational <br /> experiences.</p>
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

      <div  className='Sub-container'>
        <h3>Programs</h3>
        <p>Art & Design</p>
        <p>Business</p>
        <p>IT & Software</p>
        <p>Languages</p>
        <p>Programming</p>
      </div>

      <div  className='Sub-container2'>
        <h3>Contact Us</h3>
        <p>Address: 123 Main Street, Anytown, CA 12345</p>
        <p>Tel: +(123) 456--7890</p>
        <p>Mail: bywatedu@webkul.in</p>
        <div className='Icons'>
          <Link to="www.facebook.com">
          <FaFacebook />
          </Link>
          <Link to="www.github.com">
          <FaGithub />
          </Link>
          <Link to="https://www.google.com">
          <FcGoogle />
          </Link>
          <Link to="https://twitter.com">
          <FaXTwitter />
          </Link>
          <Link to="https://www.microsoft.com">
          <FaMicrosoft />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;

