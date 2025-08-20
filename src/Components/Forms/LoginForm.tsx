import React, { useState } from "react";
import './FormStyles/LoginForm.css';
import loginImage from "../../assets/Images/login-image.png"; // ✅ Import it like this

import styles from "./FormStyles/LoginForm.module.css";
import { FaFacebookF, FaMicrosoft, FaArrowRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Header1 from '../shared/Header1';
import Button from "../shared/Buttons";
import { FaArrowRight } from "react-icons/fa";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <>
      <Header1 />
      <div className={styles.container}>
        {/* Left form section */}
        <div className={styles.formSection}>
          <h2>Sign in to your account</h2>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Username or Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              label={<>Sign in <FaArrowRight /></>}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px"
              }}
              onClick={() => handleSubmit(new Event('submit') as unknown as React.FormEvent)}
              backgroundColor="#020617"
            />
          </form>

          <div className={styles.divider}>
            <span>Sign in with</span>
          </div>

          <div className="social-buttons">
            <button type="button" className="social-button facebook">
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
          <img
            src={loginImage} 
            alt="Registration Background"
            className="imagePlaceholder"
          />
        </div>
      </div>
    </>
  );
};

export default LoginForm;

