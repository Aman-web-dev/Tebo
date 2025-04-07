import { BrowserRouter as Router } from "react-router";
import { AuthProvider } from "./context/auth-context-provider";
import AppRoutes from "./app-router";
import "./index.css";
import { ModalProvider } from "./context/modal-context-provider";
import Projects from "./pages/projects";

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
