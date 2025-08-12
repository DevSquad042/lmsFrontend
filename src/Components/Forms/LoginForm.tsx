import React, { useState } from "react";
import './FormStyles/LoginForm.css'
import LoginImage from '../assets/Images/login-image.png';

import { FaFacebookF, FaMicrosoft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Header1 from '../shared/Header1'
import Button from "../shared/Buttons"
import { FaArrowRight } from "react-icons/fa";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Replace with your sign-in logic
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <>
      <Header1 />
      <div className="login-container">
        <div className="login-form-section">
          <h2>Sign in to your account</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Username or Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* <button type="submit" className="sign-in-button">
              Sign In
            </button> */}

            <Button label={<>Sign in <FaArrowRight /></>} style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px"
            }}  onClick={() => handleSubmit (new Event ('submit') as unknown as React.FormEvent)}  backgroundColor="#020617"  />
          </form>

          <div className="divider">
            <span>Sign in with</span>
          </div>

          <div className="social-buttons">
            <button  type= "button" className= "social-button facebook">
            <FaFacebookF /> Facebook 
            </button>
            <button type="button" className="social-button google">
            <FcGoogle /> Google
            </button>
            <button type="button" className="social-button microsoft">
            <FaMicrosoft /> Microsoft 
            </button>
          </div>
        </div>

        <div className="login-image-section">
          <img src={LoginImage} alt="login background" />
        </div>
      </div>
    </>
  );
};

export default LoginForm;
