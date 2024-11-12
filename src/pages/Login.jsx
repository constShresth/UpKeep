import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const {login } = useAuth();
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Added for sign up
  const [role, setRole] = useState("Resident"); // Added dropdown for role selection
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role: role.toLowerCase() }), // Include selected role
      });
      const res = await response.json();
      if (response.ok) {
        // Redirect to the route based on the role
        console.log(res)
        login(res);
        // window.location.href = res.redirect;
        console.log(res.redirect);
      } else {
        alert(res.message); // Show error message if login failed
      }
    } catch (err) {
      console.error("Error during login:", err);
    }
    console.log("Logging in with:", { email, password, role });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Signing up with:", { email, password, role });
  };

  const handleGoogleLogin = () => {
    console.log("Logging in with Google");
  };

  const handleForgotPassword = () => {
    console.log("Redirecting to forgot password");
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-[#008080] mb-6 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form onSubmit={isLogin ? handleLogin : handleSignUp}>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-[#333333] mb-2"
            >
              Select Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#008080] focus:border-[#008080] text-[#333333]"
            >
              <option value="Resident">Resident</option>
              <option value="Admin">Admin</option>
              <option value="Staff">Staff</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#333333] mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#008080] focus:border-[#008080] text-[#333333]"
            />
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#333333] mb-2"
            >
              {isLogin ? "Password" : "Create Password"}
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#008080] focus:border-[#008080] text-[#333333]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute  right-0 top-9 flex items-center pr-3 text-[#008080]"
            >
              {showPassword ? "😮" : "😴"}
            </button>
          </div>

          {!isLogin && (
            <div className="mb-4 relative">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-[#333333] mb-2"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#008080] focus:border-[#008080] text-[#333333]"
              />
            </div>
          )}

          {isLogin && (
            <div className="flex justify-between items-center mb-4">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-[#008080] hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#008080] text-white p-2 rounded-md hover:bg-[#006666] transition duration-300"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center my-4 text-[#333333]">or</p>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-[#E0FFFF] text-[#008080] p-2 rounded-md hover:bg-[#D1F5F5] transition duration-300 flex items-center justify-center"
        >
          <span className="mr-2">
            {isLogin ? "Login" : "Sign Up"} with Google
          </span>
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
        </button>

        <div className="text-center mt-6">
          {isLogin ? (
            <p className="text-sm text-[#333333]">
              Don't have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-[#008080] font-semibold hover:underline"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p className="text-sm text-[#333333]">
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-[#008080] font-semibold hover:underline"
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
