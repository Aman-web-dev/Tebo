import { createContext, useState, useEffect } from "react";
import AuthContext from "./context/auth";

// Optional: Install jwt-decode for client-side JWT decoding
// npm install jwt-decode
import {jwtDecode} from "jwt-decode";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Start with null

  // Function to check if JWT is expired
  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds
      return decoded.exp < currentTime; // True if expired
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return true; // Treat as expired if invalid
    }
  };

  // Initialize user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log(isTokenExpired(parsedUser.token))
      console.log(isAuthenticated)
      if (parsedUser.token && !isTokenExpired(parsedUser.token)) {
        setUser(parsedUser);
        setIsAuthenticated(true);
      } else {
        // Clear expired or invalid user data
        localStorage.removeItem("user");
        setUser(null);
        setIsAuthenticated(false);
      }
    }
  }, []);

  const login = (userObj) => {
    const newUser = {
      username: userObj.username,
      email: userObj.email,
      designation: userObj.designation,
      token: userObj.token,
    };
    setUser(newUser);
    setIsAuthenticated(true);
    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    // Remove from localStorage
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};