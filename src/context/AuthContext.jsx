import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();
  
  // Check login status on component mount (e.g., using a token in localStorage)
  useEffect(() => {

    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("userRole");
    setUserRole(storedRole);
    setIsAuthenticated(!!token); // Set to true if token exists
    setLoading(false); // Set loading to false after authentication check is complete
    
    
  }, []);

  const login = (res) => {
    localStorage.setItem("token", res.token); // Save token in local storage
    localStorage.setItem("userRole",res.role)
    setIsAuthenticated(true);
    setUserRole(res.role)
    navigate(res.redirect); // Redirect after login
    console.log("login func")
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setIsAuthenticated(false);
    setUserRole("");
    navigate("/login");
  };

  if (loading) {
    return <div>Loading...</div>; // You can show a loader here while checking the auth status
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated,login, logout , userRole}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
