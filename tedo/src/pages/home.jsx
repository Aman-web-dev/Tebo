import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "Admin") {
        navigate("/dashboard");
      } else {
        navigate("/tasks");
      }
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  return null; // or loading spinner if needed
};

export default Home;