import { BrowserRouter as Router } from "react-router";
import { AuthProvider } from "./context/AuthContextProvider";
import AppRoutes from "./AppRouter";
import "./index.css";
import { ModalProvider } from "./context/ModalContextProvider";
import Projects from "./pages/Projects";

function App() {
  return (
    <>
      <AuthProvider>
        <ModalProvider>
          <Router>
          <AppRoutes/>
          </Router>
        </ModalProvider>
      </AuthProvider>
    </>
  );
}

export default App;
