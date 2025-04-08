// AppRoutes.js
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/protected-route";
import ProtectedLayout from "./Layouts/protected-layout";
import Projects from "./pages/projects";
import PublicLayout from "./Layouts/public-layout";
import Auth from "./pages/auth";
import Tasks from "./pages/tasks";
import Home from "./pages/home";
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes with PublicLayout */}
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<Auth />} />
        <Route path="/" element={<Home/>} />
      </Route>

      {/* Protected Routes with MainLayout */}
      <Route element={<ProtectedLayout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks/>
            </ProtectedRoute>
          }
        />
        {/* Add more protected routes here */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
