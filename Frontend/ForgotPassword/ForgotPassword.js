import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [otpSent, setOtpSent] = useState(false); // New state to track OTP sent status
  const [otp, setOtp] = useState(""); // Store OTP for verification
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  // Handle form submission for sending OTP
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the email
    if (!email) {
      setFormErrors("Email is required.");
      return;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setFormErrors("Invalid email format.");
      return;
    }

    // Set loading state
    setIsLoading(true);

    try {
      // Make API request to send OTP
      const response = await axios.post("/api/getotp", { email });
      if (response.data.msg === "OTP is sent to email") {
        setOtpSent(true);
        setFormErrors(""); // Clear previous errors
      }
    } catch (error) {
      setFormErrors("Error sending OTP. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      setFormErrors("OTP is required.");
      return;
    }

    // Set loading state
    setIsLoading(true);

    try {
      // Make API request to verify OTP
      const response = await axios.post("/api/verifyotp", { otp });
      if (response.data.msg === "OTP verification successful") {
        setIsSuccess(true); // OTP verified successfully
        setFormErrors(""); // Clear previous errors
      }
    } catch (error) {
      setFormErrors("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Forgot Password</h1>
        
        <p className="text-gray-600 mb-6">
          Enter your email address below, and we’ll send you a link to reset your password.
        </p>

        {!otpSent ? (
          // Send OTP form
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-black mb-1" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-new"
              />
            </div>

            {/* Error or Success Message */}
            {formErrors && <p className="text-red-500 text-sm">{formErrors}</p>}
            {isSuccess && <p className="text-green-500 text-sm">Password reset link sent to your email!</p>}

            <button
              type="submit"
              className="w-full bg-new text-white py-2 rounded-lg font-semibold hover:bg-hover"
              disabled={isLoading}
            >
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          // OTP verification form
          <form onSubmit={handleVerifyOtp}>
            <div className="mb-4">
              <label className="block text-black mb-1" htmlFor="otp">OTP</label>
              <input
                type="text"
                id="otp"
                name="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-new"
              />
            </div>

            {/* Error or Success Message */}
            {formErrors && <p className="text-red-500 text-sm">{formErrors}</p>}
            {isSuccess && <p className="text-green-500 text-sm">OTP verification successful!</p>}

            <button
              type="submit"
              className="w-full bg-new text-white py-2 rounded-lg font-semibold hover:bg-hover"
              disabled={isLoading}
            >
              {isLoading ? "Verifying OTP..." : "Verify OTP"}
            </button>
          </form>
        )}

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Remember your password?{" "}
            <Link to="/signin">
              <a href="/signin" className="text-new hover:underline">Sign in</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
