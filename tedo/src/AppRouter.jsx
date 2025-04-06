// AppRoutes.js
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedLayout from './Layouts/ProtectedLayout';

import Projects from './pages/Projects';
import PublicLayout from './Layouts/PublicLayout';
import Auth from './pages/Auth';

const AppRoutes = () => {
  return (
    <Routes>

      {/* Public Routes with PublicLayout */}
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<Auth />} />
        {/* <Route path="/" element={<Home />} /> */}
      </Route>

      {/* Protected Routes with MainLayout */}
      <Route element={<ProtectedLayout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Projects/>
            </ProtectedRoute>
          }
        />
        {/* Add more protected routes here */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;