// ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  useEffect(() => {console.log(isAuthenticated)});
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
