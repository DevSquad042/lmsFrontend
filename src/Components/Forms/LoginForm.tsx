import React, { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/index";
import { loginUser } from "../../store/slices/authSlice";

import styles from "./FormStyles/LoginForm.module.css";
import { FaFacebookF, FaMicrosoft, FaArrowRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import Header1 from "../shared/Header1";
import Button from "../shared/Buttons";
import LoginImage from "../../assets/Images/login-image.png";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  // Example handlers for social logins (stubbed out)
  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // integrate Firebase/Auth0 here
  };

  const handleFacebookLogin = () => {
    console.log("Facebook login clicked");
  };

  const handleMicrosoftLogin = () => {
    console.log("Microsoft login clicked");
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
            className={styles.signUpBtn}
              label="Sign In →"
              onClick={() =>
                handleSubmit(new Event("submit") as unknown as React.FormEvent)
              }
            />
          </form>

          <div className={styles.divider}>
            <span>Sign in with</span>
          </div>

          <div className={styles.socialButtons}>
            <button
              type="button"
              onClick={handleFacebookLogin}
              className={`${styles.socialBtn} ${styles.facebook}`}
            >
              <FaFacebookF /> Facebook
            </button>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className={`${styles.socialBtn} ${styles.google}`}
            >
              <FcGoogle /> Google
            </button>
            <button
              type="button"
              onClick={handleMicrosoftLogin}
              className={`${styles.socialBtn} ${styles.microsoft}`}
            >
              <FaMicrosoft /> Microsoft
            </button>
          </div>
        </div>

        {/* Right image section */}
        <div className={styles.imageSection}>
          <img src={LoginImage} alt="login background" />
        </div>
      </div>
    </>
  );
};

export default LoginForm;
