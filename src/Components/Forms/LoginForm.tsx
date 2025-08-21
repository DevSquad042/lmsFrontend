import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { loginUser } from "../../store/slices/authSlice";

import styles from "./FormStyles/LoginForm.module.css";
import styles2 from "./FormStyles/register.module.css";
import { FaFacebookF, FaMicrosoft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import Header1 from "../shared/Header1";
import Button from "../shared/Buttons";
import LoginImage from "../../assets/Images/login-image.png";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";


const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  // handlers for social logins (stubbed)
  const handleFacebookLogin = () => console.log("Facebook login clicked");
  const handleMicrosoftLogin = () => console.log("Microsoft login clicked");

  // Google Login
const googleLogin = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    try {
      // Get user info from Google using the access token
      const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      });

      // Send the user info or token to your backend
      console.log("Google User:", res.data);

      // You can also dispatch it to Redux (authSlice)
      // dispatch(googleLoginUser(res.data));
    } catch (error) {
      console.error("Google login failed", error);
    }
  },
  onError: () => console.log("Google Login Failed"),
});

  return (
    <>
      <Header1 />
      <div className={styles.container}>
        {/* Left form section */}
        <div className={styles.formSection}>
          <h2>Sign in to your account</h2>

          {/* Show error if login fails */}
          {error && <p className={styles.error}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Username or Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              label={loading ? "Signing In..." : "Sign In →"}
             className={styles2.signUpBtn}
              // let <form onSubmit> handle submit, no manual event creation
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
  onClick={() => googleLogin()}
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
