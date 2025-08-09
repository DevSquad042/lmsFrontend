import React, { useState } from 'react';
import NavBar from '../Components/shared/Header1'; 
import '../Register/register.css'; 
import '../assets/Images/Frame 427319048.png'
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";
import { FaMicrosoft } from "react-icons/fa";
import Button from '../Components/shared/Buttons'; 


interface FormValues {
  fullName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const register: React.FC = () => {
    
  const [values, setValues] = useState<FormValues>({
    fullName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof FormValues) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [field]: e.target.value });
  };

  const validate = () => {
    const newErrors: Partial<FormValues> = {};

    if (!values.fullName) newErrors.fullName = 'Full Name is required.';
    if (!values.lastName) newErrors.lastName = 'Last Name is required.';
    if (!values.username) newErrors.username = 'Username is required.';
    if (!values.email) {
      newErrors.email = 'Email is required.';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      newErrors.email = 'Invalid email address.';
    }
    if (!values.password) newErrors.password = 'Password is required.';
    if (!values.confirmPassword)
      newErrors.confirmPassword = 'Confirm Password is required.';
    if (
      values.password &&
      values.confirmPassword &&
      values.password !== values.confirmPassword
    )
      newErrors.confirmPassword = 'Passwords do not match.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      // Handle registration logic here
    }
  };

  return (
    <div className='NavBar'>
      <NavBar />
      <div/>
      <div className="container">
      {/* Placeholder for the image */}

      <div className="imageSection">
        <img
          src="../src/assets/Images/Frame 427319048.png"
          alt="Registration Background"
          className="imagePlaceholder"
        />
        

      </div>

      {/* Registration Form */}
      <div className="formSection">

        
        

        <h2 className = "Form-text">Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <h5 className='inputText'>Full Name</h5>
          <div className="inputGroup">
            <input
              type="text"
              placeholder="First Name"
              value={values.fullName}
              onChange={handleChange('fullName')}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={values.lastName}
              onChange={handleChange('lastName')}
            />
          </div>
          {errors.fullName && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.fullName}</p>}
          {errors.lastName && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.lastName}</p>}

          <h5 className='inputText'>Username</h5>

          <input
            type="text"
            placeholder="Username"
            value={values.username}
            onChange={handleChange('username')}
          />
          {errors.username && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.username}</p>}

          <h5 className='inputText'>Email</h5>

          <input
            type="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange('email')}
          />
          {errors.email && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.email}</p>}

          <section className="parent-div">
<div className="passwordSection">
            <p>Password</p> 

          <input
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange('password')}
          />
          {errors.password && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.password}</p>}
             </div>
          
          <div className="inputGroup">

          <div className='confirmPasswordSection'>
<p>Confirm Password</p>
          <input
            type="password"
            placeholder="Confirm Password"
            value={values.confirmPassword}
            onChange={handleChange('confirmPassword')}
          />
          {errors.confirmPassword && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.confirmPassword}</p>}
          </div>

</div>
          </section>
         
          <Button label="Create Account →" onClick={() => handleSubmit(new Event('submit') as unknown as React.FormEvent)} backgroundColor="#020617"  />
        </form>

<div className="signupText">
  <span>Sign up with</span>
</div>




        <div className="signupOptions">
          <button className='signupOption Facebook'> <FaFacebook /> Facebook</button>
          <button className='signupOption Google'><FaGoogle /> Google</button>
          <button className='signupOption Microsoft'><FaMicrosoft /> Microsoft</button>
        </div>

        {submitted && <p style={{ color: 'green', marginTop: '1rem' }}>Registration submitted!</p>}
      </div>
      </div>
    </div>
  );
};

export default register
