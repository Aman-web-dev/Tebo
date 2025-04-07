import { createContext, useState, useContext } from "react";
import { AuthContext } from "./contextCreator/authContext";

export  const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    designation: "",
    token:""
  });

  const login = (userObj) => {
    setUser({
      username: userObj.username,
      email: userObj.email,
      designation: userObj.designation,
      token:userObj.token
    });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser({ user: "", email: "", designation: "", userId: "" });
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
