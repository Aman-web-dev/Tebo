import { createContext, useState, useContext } from "react";
import AuthContext from "./contextCreator/authContext";



export  const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState({
    username: "",
    email: "",
    designation: "",
    userId: "",
  });

  const login = (userObj) => {
    setUser({
      user: userObj.username,
      email: userObj.email,
      designation: userObj.designation,
      userId: userObj.userId,
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
