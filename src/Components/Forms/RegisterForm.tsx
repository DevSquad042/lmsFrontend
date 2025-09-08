import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../../store/index";
import { registerUser } from "../../store/slices/authSlice";

import styles from "./FormStyles/register.module.css";
import { FaFacebookF, FaMicrosoft, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

import Header1 from "../shared/Header1";
import Button from "../shared/Buttons";
import RegisterImage from "../../assets/Images/login-image.png";

interface FormValues {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [values, setValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange =
    (field: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [field]: e.target.value });
      if (errors[field]) {
        setErrors({ ...errors, [field]: "" });
      }
    };

  const validate = () => {
    const newErrors: Partial<FormValues> = {};

    if (!values.firstName) newErrors.firstName = "First Name is required.";
    if (!values.lastName) newErrors.lastName = "Last Name is required.";
    if (!values.userName) newErrors.userName = "Username is required.";
    if (!values.email) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      newErrors.email = "Invalid email address.";
    }
    if (!values.password) {
      newErrors.password = "Password is required.";
    } else if (values.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!values.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required.";
    } else if (
      values.password &&
      values.confirmPassword &&
      values.password !== values.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsLoading(true);
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      userName: values.userName,
      email: values.email,
      password: values.password,
    };

    try {
      const res = await dispatch(registerUser(payload)).unwrap();

      if (res.token) {
        localStorage.setItem("token", res.token);
        toast.success("Registration successful! 🎉");
        navigate("/dashboard");
      } else {
        toast.success(res.message || "Registration successful! Please check your email to verify your account. 📧");
        navigate("/login");
      }
      
      setSubmitted(true);
    } catch (err: unknown) {
      console.error("Registration error:", err);
      
      const maybeError = err as { 
        response?: { 
          status?: number;
          data?: { message?: string };
        };
        message?: string;
      };
      
      const status = maybeError?.response?.status;
      const message = maybeError?.message || "Registration failed";

      if (status === 409) {
        setErrors((prev) => ({
          ...prev,
          email: "This email or username is already registered.",
        }));
        toast.error("Email or username already exists ❌");
      } else if (message.includes("Email verification")) {
        toast.success("Account created! Please check your email to verify your account. 📧");
        navigate("/login");
      } else {
        toast.error(message || "Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => console.log("Google register clicked");
  const handleFacebookLogin = () => console.log("Facebook register clicked");
  const handleMicrosoftLogin = () => console.log("Microsoft register clicked");

  return (
    <>
      <Header1 />
      <div className={styles.container}>
        <div className={styles.imageSection}>
          <img src={RegisterImage} alt="register background" />
        </div>

        <div className={styles.formSection}>
          <h2>Create Your Account</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  placeholder="First Name"
                  value={values.firstName}
                  onChange={handleChange("firstName")}
                  className={errors.firstName ? styles.errorInput : ""}
                />
                {errors.firstName && <p className={styles.error}>{errors.firstName}</p>}
              </div>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={values.lastName}
                  onChange={handleChange("lastName")}
                  className={errors.lastName ? styles.errorInput : ""}
                />
                {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}
              </div>
            </div>

            <div className={styles.inputWrapper}>
              <input
                type="text"
                placeholder="Username"
                value={values.userName}
                onChange={handleChange("userName")}
                className={errors.userName ? styles.errorInput : ""}
              />
              {errors.userName && <p className={styles.error}>{errors.userName}</p>}
            </div>

            <div className={styles.inputWrapper}>
              <input
                type="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange("email")}
                className={errors.email ? styles.errorInput : ""}
              />
              {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>

            <div className={styles.passwordGroup}>
              <div className={styles.inputWrapper}>
                <div className={styles.passwordField}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange("password")}
                    className={`${styles.passwordInput} ${errors.password ? styles.errorInput : ""}`}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className={styles.eyeIcon}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {errors.password && <p className={styles.error}>{errors.password}</p>}
              </div>

              <div className={styles.inputWrapper}>
                <div className={styles.passwordField}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={values.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                    className={`${styles.passwordInput} ${errors.confirmPassword ? styles.errorInput : ""}`}
                  />
                  <span
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={styles.eyeIcon}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {errors.confirmPassword && (
                  <p className={styles.error}>{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div>
              <Button
                label={isLoading ? "Creating Account..." : "Create Account →"}
                className={styles.signUpBtn}
                type="submit"
                disabled={isLoading}
              />
            </div>
          </form>

          <div className={styles.divider}>
            <span>Sign up with</span>
          </div>

          <div className={styles.socialButtons}>
            <button
              type="button"
              onClick={handleFacebookLogin}
              className={`${styles.socialBtn} ${styles.facebook}`}
              disabled={isLoading}
            >
              <FaFacebookF /> Facebook
            </button>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className={`${styles.socialBtn} ${styles.google}`}
              disabled={isLoading}
            >
              <FcGoogle /> Google
            </button>
            <button
              type="button"
              onClick={handleMicrosoftLogin}
              className={`${styles.socialBtn} ${styles.microsoft}`}
              disabled={isLoading}
            >
              <FaMicrosoft /> Microsoft
            </button>
          </div>

          {submitted && (
            <p className={styles.success}>Registration submitted!</p>
          )}

          <div className={styles.loginRedirect}>
            <p>
              Already have an account?{" "}
              <span
                className={styles.loginLink}
                onClick={() => navigate("/login")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") navigate("/login");
                }}
              >
                Log in here
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;