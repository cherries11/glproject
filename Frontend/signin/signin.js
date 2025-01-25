import React, { useState } from "react";
import fb from "./fb.png";
import "./signin.css";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate(); // Use for navigation

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  // Handle Forgot Password Navigation
  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate("/forgot-password"); // Redirect to Forgot Password page
  };

  // Validate the form
  const validateForm = () => {
    const errors = {};

    // Email validation
    if (!email) {
      errors.email = "This field is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Invalid email format.";
    }

    // Password validation
    if (!password) {
      errors.password = "This field is required.";
    } else if (!Object.values(passwordRequirements).every((req) => req)) {
      errors.password = "Your password must meet all the listed requirements.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validate password dynamically
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

    // Validate form before submitting
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch("YOUR_BACKEND_URL/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // On success, navigate to the dashboard or the appropriate page
        navigate("/offres"); // Example: Redirect to the dashboard
      } else {
        // On failure, display error message
        setFormErrors({ general: data.message || "Something went wrong" });
      }
    } catch (error) {
      setFormErrors({ general: "Network error, please try again later" });
    }
  };

  // Handle email and password input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
    }

    if (name === "password") {
      setPassword(value);
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: "",
      }));
      validatePassword(value);
    }
  };

  return (
    <div className="relative flex min-h-screen">
      {/* Background Image */}
      <div className="background"></div>

      <div className="relative z-10 w-full max-w-md bg-transparent p-8 ml-8 md:ml-16">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-start ml-1">
          Welcome Back 👋
        </h1>
        <p className="text-gray-600 mb-6 text-start">
          Today is a new day. It’s your day. Sign in to start.
        </p>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-black mb-1 text-start" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Example@email.com"
              value={email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-black mb-1 text-start" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}

            {/* Forgot Password */}
            <div className="flex justify-end mt-1">
              <a
                href="#"
                onClick={handleForgotPassword}
                className="text-blue-500 text-sm hover:underline"
              >
                Forgot Password?
              </a>
            </div>

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
            className="w-full bg-new text-black py-2 rounded-lg font-semibold hover:bg-hover"
          >
            Sign in
          </button>
        </form>
        <div className="flex items-center justify-center mt-4">
          <div className="w-full h-[1px] bg-gray-300"></div>
          <span className="mx-4 text-gray-500">Or</span>
          <div className="w-full h-[1px] bg-gray-300"></div>
        </div>
        <div className="flex flex-col mt-4 space-y-4">
          <button
            type="button"
            className="w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center hover:bg-gray-100"
            onClick={() => alert("Google Login - Backend not linked yet")}
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-6 h-6 mr-2"
            />
            Sign in with Google
          </button>
          <button
            type="button"
            className="w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center hover:bg-gray-100"
            onClick={() => alert("Facebook Login - Backend not linked yet")}
          >
            <img
              src={fb}
              alt="Facebook"
              className="w-7 h-7 ml-4 mr-2 bg-transparent"
            />
            Sign in with Facebook
          </button>
        </div>
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t you have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
