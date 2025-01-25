import React, { useState } from "react";
import "./signup.css";
import { Link } from 'react-router-dom';
import axios from 'axios'

const Signup = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  // Update form values and clear specific error
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for the field being updated
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    if (name === "password") {
      validatePassword(value);
    }
  };

  // Validate the entire form
  const validateForm = () => {
    const errors = {};

    // Validate first name
    if (!formValues.firstName) {
      errors.firstName = "This field is required.";
    } else if (formValues.firstName.length < 4) {
      errors.firstName = "First name must contain at least 4 characters.";
    }

    // Validate last name
    if (!formValues.lastName) {
      errors.lastName = "This field is required.";
    } else if (formValues.lastName.length < 4) {
      errors.lastName = "Last name must contain at least 4 characters.";
    }

    // Validate phone number
    if (!formValues.phoneNumber) {
      errors.phoneNumber = "This field is required.";
    } else if (!/^\d{10}$/.test(formValues.phoneNumber)) {
      errors.phoneNumber = "Phone number must contain exactly 10 digits.";
    }

    // Validate email
    if (!formValues.email) {
      errors.email = "This field is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formValues.email)) {
      errors.email = "Invalid email format.";
    }

    // Validate password
    if (!formValues.password) {
      errors.password = "This field is required.";
    } else if (!Object.values(passwordRequirements).every((req) => req)) {
      errors.password = "Your password must meet all the listed requirements.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validate password and update requirements dynamically
  const validatePassword = (password) => {
    setPasswordRequirements({
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[~!@#%^&*()_+=]/.test(password),
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('/api/signup', {
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          phoneNumber: formValues.phoneNumber,
          email: formValues.email,
          password: formValues.password,
        });
  
        if (response.status === 200) {
          alert('Signup successful!');
          // Redirect or clear form here if needed
          setFormValues({
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            password: "",
          });
        }
      } catch (error) {
        console.error(error);
        if (error.response) {
          alert(error.response.data.message || 'An error occurred during signup.');
        } else {
          alert('Network error. Please try again later.');
        }
      }
    }
  };
  

  return (
    <div className="relative flex min-h-screen">
      {/* Background Image */}
      <div className="background1"></div>

      <div className="relative z-10 w-full max-w-md bg-transparent p-8 ml-8 md:ml-16">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-start ml-1">
          Welcome👋
        </h1>
        <p className="text-gray-600 mb-6 text-start">
          Today is a new day. It’s your day. Sign up to start.
        </p>
        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="mb-4">
            <label className="block  text-black mb-1 text-start" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Nardjess"
              value={formValues.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formErrors.firstName && <p className="text-red-500 text-sm">{formErrors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block  text-black mb-1 text-start" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="dekhinet"
              value={formValues.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formErrors.lastName && <p className="text-red-500 text-sm">{formErrors.lastName}</p>}
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block  text-black mb-1 text-start" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="0634567890"
              value={formValues.phoneNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formErrors.phoneNumber && <p className="text-red-500 text-sm">{formErrors.phoneNumber}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block  text-black mb-1 text-start" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@email.com"
              value={formValues.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block  text-black mb-1 text-start" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="At least 8 characters"
              value={formValues.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
            <div className="mt-2 text-sm">
              <p className={passwordRequirements.length ? "text-green-500" : "text-red-500"}>
                ✔ 8 characters
              </p>
              <p className={passwordRequirements.lowercase ? "text-green-500" : "text-red-500"}>
                ✔ One lowercase character [a-z]
              </p>
              <p className={passwordRequirements.uppercase ? "text-green-500" : "text-red-500"}>
                ✔ One uppercase character [A-Z]
              </p>
              <p className={passwordRequirements.number ? "text-green-500" : "text-red-500"}>
                ✔ One number [0-9]
              </p>
              <p className={passwordRequirements.specialChar ? "text-green-500" : "text-red-500"}>
                ✔ One special character [~!@#%^&*( )_+=]
              </p>
            </div>
          </div>

          <button
            type="submit"
            name="submit"
            className="w-full bg-new text-black py-2 rounded-lg font-semibold hover:bg-hover"
          >
            Sign up
          </button>
        </form>
        <div className="flex items-center justify-center mt-4">
            <div className="w-full h-[1px] bg-gray-300"></div>
            
            <div className="w-full h-[1px] bg-gray-300"></div>
          </div>
        
          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t you have an account?{" "}
           <Link to="/signin"> <a href="/signin" className="text-blue-500 hover:underline">
              Sign in
            </a>
        </Link>
          </p>
      </div>
    </div>
  );
};

export default Signup;
