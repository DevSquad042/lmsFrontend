/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import type { AppDispatch, RootState } from "../../store";
import { loginUser, googleLogin } from "../../store/slices/authSlice";

import styles from "./FormStyles/LoginForm.module.css";
import styles2 from "./FormStyles/register.module.css";
import { FaFacebookF, FaMicrosoft, FaEye, FaEyeSlash } from "react-icons/fa";
import Header1 from "../shared/Header1";
import LoginImage from "../../assets/Images/login-image.png";

import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import axios from "axios";
import { toast } from "react-toastify";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, token, loading } = useSelector((state: RootState) => state.auth);

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Autocomplete data for login
  const [loginHistory, setLoginHistory] = useState<string[]>([]);

  // Load login history from sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem("loginHistory");
    if (saved) {
      try {
        setLoginHistory(JSON.parse(saved));
      } catch (error) {
        console.error("Error loading login history:", error);
      }
    }
  }, []);

  // Save successful login to history
  const saveToLoginHistory = (value: string) => {
    if (!value.trim()) return;

    setLoginHistory(prev => {
      const updated = [value, ...prev.filter(item => item !== value)].slice(0, 5); // Keep only 5 recent entries
      sessionStorage.setItem("loginHistory", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    if (user && token) {
      console.log("User and token after login:", { user, token }); // Debug log
      // Save successful login identifier to history
      if (identifier) {
        saveToLoginHistory(identifier);
      }
      toast.success("Login successful!");
      navigate("/profile1");
    }
  }, [user, token, navigate, identifier]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    // Basic validation
    if (!identifier.trim()) {
      setLoginError("Please enter your username or email");
      return;
    }

    if (!password) {
      setLoginError("Please enter your password");
      return;
    }

    try {
      const result = await dispatch(loginUser({ identifier, password })).unwrap();
      console.log("Login result:", result);
    } catch (err: any) {
      const errorMessage =
        err || "Account not found. Please register first or check your credentials.";
      setLoginError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleFacebookLogin = () => {
    console.log("Facebook login clicked");
  };

  const handleMicrosoftLogin = () => {
    console.log("Microsoft login clicked");
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error("No credential returned from Google");
      }

      const result = await dispatch(googleLogin(credentialResponse.credential)).unwrap();

      console.log("Google login result:", result);
      toast.success("Google login successful!");
    } catch (error) {
      console.error("Google login failed", error);
      setLoginError("Google sign-in failed. Try again.");
      toast.error("Google sign-in failed. Try again.");
    }
  };

  const handleGoogleError = () => {
    setLoginError("Google sign-in failed");
    toast.error("Google sign-in failed");
  };

  return (
    <>
      <Header1 />
      <div className={styles.container}>
        <div className={styles.formSection}>
          <h2>Sign in to your account</h2>

          {loginError && (
            <p className={styles.error}>
              {loginError}{" "}
              <Link
                to="/register"
                className={styles2.plainLink}
                style={{ marginLeft: 8 }}
              >
                Create Account
              </Link>
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <label htmlFor="identifier">Username or Email</label>
             <input
               id="identifier"
               type="text"
               placeholder="Username or Email ID"
               value={identifier}
               onChange={(e) => setIdentifier(e.target.value)}
               list="loginHistoryList"
               required
               autoComplete="username"
             />

             {/* Datalist for login history */}
             <datalist id="loginHistoryList">
               {loginHistory.map((item, index) => (
                 <option key={index} value={item} />
               ))}
             </datalist>

            <label htmlFor="password">Password</label>
            <div className={styles.passwordField}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className={styles.eyeIcon}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button
              type="submit"
              className={styles.loginBtn}
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? "Signing In..." : "Sign In →"}
            </button>
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

            <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />

            <button
              type="button"
              onClick={handleMicrosoftLogin}
              className={`${styles.socialBtn} ${styles.microsoft}`}
            >
              <FaMicrosoft /> Microsoft
            </button>
          </div>

          <div className={styles.loginRedirect}>
            <p>
              Don't have an account?{" "}
              <span
                className={styles.loginLink}
                onClick={() => navigate("/register")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") navigate("/register");
                }}
              >
                Create Account
              </span>
            </p>
          </div>
        </div>

        <div className={styles.imageSection}>
          <img src={LoginImage} alt="login background" />
        </div>
      </div>
    </>
  );
};

export default LoginForm;
