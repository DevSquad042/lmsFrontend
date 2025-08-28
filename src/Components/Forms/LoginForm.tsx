import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { loginUser } from "../../store/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import styles from "./FormStyles/LoginForm.module.css";
import styles2 from "./FormStyles/register.module.css";
import { FaFacebookF, FaMicrosoft, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Header1 from "../shared/Header1";
import LoginImage from "../../assets/Images/login-image.png";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast } from "react-toastify";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, token, loading } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user && token) {
      console.log("User and token after login:", { user, token }); // Debug log
      toast.success("Login successful!");
      navigate("/profile1");
    }
  }, [user, token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      console.log("Login result:", result); // Debug log
    } catch (err: any) {
      const errorMessage = err || "Account not found. Please register first or check your credentials.";
      setLoginError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleFacebookLogin = () => console.log("Facebook login clicked");
  const handleMicrosoftLogin = () => console.log("Microsoft login clicked");

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        console.log("Google User:", res.data);
        const result = await dispatch(googleLogin(res.data.sub)).unwrap();
        console.log("Google login result:", result); // Debug log
        toast.success("Google login successful!");
      } catch (error) {
        console.error("Google login failed", error);
        setLoginError("Google sign-in failed. Try again.");
        toast.error("Google sign-in failed. Try again.");
      }
    },
    onError: () => {
      console.log("Google Login Failed");
      setLoginError("Google sign-in failed. Try again.");
      toast.error("Google sign-in failed. Try again.");
    },
  });

  return (
    <>
      <Header1 />
      <div className={styles.container}>
        <div className={styles.formSection}>
          <h2>Sign in to your account</h2>

          {loginError && (
            <p className={styles.error}>
              {loginError}{" "}
              <Link to="/register" className={styles2.plainLink} style={{ marginLeft: 8 }}>
                Create Account
              </Link>
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Username or Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />

            <label htmlFor="password">Password</label>
            <div style={{ position: "relative" }}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                style={{ paddingRight: "2.5rem" }}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#555",
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button
              type="submit"
              className={styles2.signUpBtn}
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