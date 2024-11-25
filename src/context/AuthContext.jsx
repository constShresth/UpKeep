import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("login");
  const navigate = useNavigate();
  const [email,setEmail] = useState(null);
  
  // Check login status on component mount (e.g., using a token in localStorage)
  useEffect(() => {

    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("userRole");
    const storedEmail = localStorage.getItem("email")
    if(email!==storedEmail) setEmail(storedEmail);
    if(storedRole!==userRole) setUserRole(storedRole);
    if(!!token!==isAuthenticated) setIsAuthenticated(!!token); // Set to true if token exists
    setLoading(false); // Set loading to false after authentication check is complete
    
    
  }, []);

  const login = (res) => {
    localStorage.setItem("token", res.token); // Save token in local storage
    localStorage.setItem("userRole",res.role)
    localStorage.setItem("email",res.email);
    setEmail(res.email);
    setIsAuthenticated(true);
    setUserRole(res.role)
    console.log("res.role",res.role)
    navigate(res.redirect); // Redirect after login
    console.log("login func")
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.setItem("userRole","login");
    localStorage.removeItem("email");
    setIsAuthenticated(false);
    setUserRole("login");
    navigate("/login");
  };

  if (loading) {
    return <div>Loading...</div>; // You can show a loader here while checking the auth status
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated,login, logout , userRole, email}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
