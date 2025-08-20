
import { useState } from 'react';
import NavBar from '../shared/Header1'; 
import RegisterImage from "../../assets/Images/register-image.png"; 
import styles from './RegisterForm.module.css'
import { FaFacebook } from 'react-icons/fa6'
// import { FaGoogle } from "react-icons/fa6";
import { FaMicrosoft } from "react-icons/fa";
import Button from '../shared/Buttons';
import type { AppDispatch } from '../../Store';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../Store/slices/authSlice';
import { FcGoogle } from 'react-icons/fc';





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

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (validate()) {
    const { confirmPassword, ...rest } = values;
    console.log("Confirm password checked:", confirmPassword); // usage
    dispatch(registerUser(rest));
    setSubmitted(true); // mark as submitted
  }
};


  // Social login stubs
  const handleGoogleLogin = () => console.log("Google register clicked");
  const handleFacebookLogin = () => console.log("Facebook register clicked");
  const handleMicrosoftLogin = () => console.log("Microsoft register clicked");

  return (
    <div className='NavBar'>
      <NavBar />
      <div/>
      <div className="container">
      {/* Placeholder for the image */}

      <div className="imageSection">
        <img
            src={ RegisterImage} 
            alt="Registration Background"
            className="imagePlaceholder"
          />
        

      </div>

        {/* Right form */}
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
            <input
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange("password")}
            />
            {errors.password && <p className={styles.error}>{errors.password}</p>}

            <input
              type="password"
              placeholder="Confirm Password"
              value={values.confirmPassword}
              onChange={handleChange("confirmPassword")}
            />
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
              <FaFacebook /> Facebook
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
        </div>
      </div>
    </div>
  );
};

export default Register;
