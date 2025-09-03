import { useState, useEffect } from "react";
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

  // Autocomplete data
  const [autocompleteData, setAutocompleteData] = useState<{
    firstNames: string[];
    lastNames: string[];
    userNames: string[];
    emails: string[];
  }>({
    firstNames: [],
    lastNames: [],
    userNames: [],
    emails: [],
  });

  // Load autocomplete data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("registerAutocomplete");
    if (saved) {
      try {
        setAutocompleteData(JSON.parse(saved));
      } catch (error) {
        console.error("Error loading autocomplete data:", error);
      }
    }
  }, []);

  // Save to autocomplete data
  const saveToAutocomplete = (field: keyof FormValues, value: string) => {
    if (!value.trim()) return;

    setAutocompleteData(prev => {
      const updated = { ...prev };
      const fieldMap: Record<string, keyof typeof updated> = {
        firstName: 'firstNames',
        lastName: 'lastNames',
        userName: 'userNames',
        email: 'emails',
      };

      const arrayKey = fieldMap[field];
      if (arrayKey && !updated[arrayKey].includes(value)) {
        updated[arrayKey] = [value, ...updated[arrayKey].slice(0, 4)]; // Keep only 5 recent entries
      }

      localStorage.setItem("registerAutocomplete", JSON.stringify(updated));
      return updated;
    });
  };

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

      // The thunk returns { user, token? } on success
      if (res && typeof res === "object" && "user" in res) {
        // Check if the response contains error information despite having a user
        if (res.user && typeof res.user === 'object' && 'error' in res.user) {
          throw new Error(res.user.error as string);
        }

        setSubmitted(true);

        // Save successful registration data to autocomplete
        saveToAutocomplete("firstName", values.firstName);
        saveToAutocomplete("lastName", values.lastName);
        saveToAutocomplete("userName", values.userName);
        saveToAutocomplete("email", values.email);

        if (res.token) {
          toast.success("Registration successful! You are now logged in! 🎉");
          // User is already authenticated, could navigate to dashboard
          navigate("/");
        } else {
          toast.success("Registration successful! Please check your email to verify your account before logging in. 📧");
          navigate("/login");
        }
      } else {
        // Unexpected response format
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

        if (errorStr.includes("409") || errorStr.includes("already") || errorStr.includes("exists") || errorStr.includes("duplicate") || errorStr.includes("taken") || errorStr.includes("registered") || errorStr.includes("conflict") || errorStr.includes("email") || errorStr.includes("in use")) {
          errorMessage = "This email is already registered. Please use a different email or try logging in.";
          toastMessage = "Email already registered. Please use a different email or log in. ❌";
        } else if (errorStr.includes("400")) {
          errorMessage = "Invalid registration data. Please check your input.";
          toastMessage = "Invalid data—please check your input ❌";
        } else if (errorStr.includes("500") || errorStr.includes("internal server")) {
          errorMessage = "Server error occurred. Please try again later.";
          toastMessage = "Server error—please try again later ❌";
        } else if (errorStr.includes("registration failed")) {
          // Generic registration failure - extract status if possible
          const statusMatch = errorStr.match(/status (\d+)/);
          if (statusMatch) {
            const status = statusMatch[1];
            if (status === "500") {
              errorMessage = "Server error occurred. Please try again later.";
              toastMessage = "Server error—please try again later ❌";
            } else {
              errorMessage = `Registration failed (Error ${status}). Please try again.`;
              toastMessage = `Registration failed (Error ${status}) ❌`;
            }
          } else {
            errorMessage = "Registration failed. Please try again.";
            toastMessage = "Registration failed ❌";
          }
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
                list="firstNameList"
                autoComplete="given-name"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={values.lastName}
                onChange={handleChange("lastName")}
                list="lastNameList"
                autoComplete="family-name"
              />
            </div>

            {/* Datalist for autocomplete */}
            <datalist id="firstNameList">
              {autocompleteData.firstNames.map((name, index) => (
                <option key={index} value={name} />
              ))}
            </datalist>
            <datalist id="lastNameList">
              {autocompleteData.lastNames.map((name, index) => (
                <option key={index} value={name} />
              ))}
            </datalist>
            {errors.firstName && <p className={styles.error}>{errors.firstName}</p>}
            {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}

            <input
              type="text"
              placeholder="Username"
              value={values.userName}
              onChange={handleChange("userName")}
              list="userNameList"
              autoComplete="username"
            />
            {errors.userName && <p className={styles.error}>{errors.userName}</p>}

            <input
              type="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange("email")}
              list="emailList"
              autoComplete="email"
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}

            {/* Additional datalist elements */}
            <datalist id="userNameList">
              {autocompleteData.userNames.map((username, index) => (
                <option key={index} value={username} />
              ))}
            </datalist>
            <datalist id="emailList">
              {autocompleteData.emails.map((email, index) => (
                <option key={index} value={email} />
              ))}
            </datalist>

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

