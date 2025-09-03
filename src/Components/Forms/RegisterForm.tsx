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

  const handleChange =
    (field: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [field]: e.target.value });
    };

  const validate = () => {
    const newErrors: Partial<FormValues> = {};

    if (!values.firstName) newErrors.firstName = "Full Name is required.";
    if (!values.lastName) newErrors.lastName = "Last Name is required.";
    if (!values.userName) newErrors.userName = "Username is required.";
    if (!values.email) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      newErrors.email = "Invalid email address.";
    }
    if (!values.password) newErrors.password = "Password is required.";
    if (!values.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required.";
    if (
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
  if (validate()) {
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      userName: values.userName,
      email: values.email,
      password: values.password,
    };

    try {
      const res = await dispatch(registerUser(payload)).unwrap();
      console.log("Registration response:", res); // Enhanced logging for debugging

      // The thunk returns { user, token? } on success
      if (res && typeof res === "object" && "user" in res) {
        // Registration successful
        setSubmitted(true);
        if (res.token) {
          toast.success("Registration successful! You are now logged in! 🎉");
          // User is already authenticated, could navigate to dashboard
          navigate("/");
        } else {
          toast.success("Registration successful! Please log in to continue. 🎉");
          navigate("/login");
        }
      } else {
        // Unexpected response format
        console.warn("Unexpected response format:", res);
        toast.error("Registration completed, but response was unexpected. Please try logging in.");
        navigate("/login");
      }
    } catch (err: unknown) {
      console.error("Registration error:", err);

      let errorMessage = "Something went wrong. Please try again later.";
      let toastMessage = "Registration failed. Please try again 💔";

      // Handle string errors from rejectWithValue
      if (typeof err === "string") {
        const errorStr = err.toLowerCase();
        if (errorStr.includes("409") || errorStr.includes("already") || errorStr.includes("exists")) {
          errorMessage = "This email or username is already registered.";
          toastMessage = "Email or username already exists ❌";
        } else if (errorStr.includes("400")) {
          errorMessage = "Invalid registration data. Please check your input.";
          toastMessage = "Invalid data—please check your input ❌";
        } else if (errorStr.includes("500")) {
          errorMessage = "Server error occurred.";
          toastMessage = "Server error—please try again later ❌";
        } else {
          errorMessage = err;
          toastMessage = err;
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
        toastMessage = err.message;
      }

      setErrors((prev) => ({
        ...prev,
        email: errorMessage,
      }));
      toast.error(toastMessage);
    }
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
              <input
                type="text"
                placeholder="First Name"
                value={values.firstName}
                onChange={handleChange("firstName")}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={values.lastName}
                onChange={handleChange("lastName")}
              />
            </div>
            {errors.firstName && <p className={styles.error}>{errors.firstName}</p>}
            {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}

            <input
              type="text"
              placeholder="Username"
              value={values.userName}
              onChange={handleChange("userName")}
            />
            {errors.userName && <p className={styles.error}>{errors.userName}</p>}

            <input
              type="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange("email")}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}

            <div className={styles.passwordGroup}>
              <div className={styles.passwordField}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange("password")}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.eyeIcon}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && <p className={styles.error}>{errors.password}</p>}

              <div className={styles.passwordField}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={values.confirmPassword}
                  onChange={handleChange("confirmPassword")}
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

            <div>
              <Button
                label="Create Account →"
                className={styles.signUpBtn}
                onClick={() =>
                  handleSubmit(new Event("submit") as unknown as React.FormEvent)
                }
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

