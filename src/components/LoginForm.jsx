import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Resident"); 
  const [showPassword, setShowPassword] = useState(false);

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
        console.log(res);
        login(res);
        console.log(res.redirect);
      } else {
        alert(res.message); 
      }
    } catch (err) {
      console.error("Error during login:", err);
    }
    console.log("Logging in with:", { email, password, role });
  };

  const handleForgotPassword = () => {
    console.log("Redirecting to forgot password");
  };
  return (
    <form onSubmit={handleLogin}>
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
              Password
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

          <div className="flex justify-between items-center mb-4">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-[#008080] hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#008080] text-white p-2 rounded-md hover:bg-[#006666] transition duration-300"
          >
            Login
          </button>
        </form>
  )
}

export default LoginForm