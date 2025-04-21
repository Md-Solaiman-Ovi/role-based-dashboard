import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Ensure correct path for AuthContext
import { StudentProvider } from "./context/StudentContext"; // Ensure correct path for StudentContext
import Dashboard from "./pages/Dashboard";
import AdminPage from "./pages/AdminPage";
import StudentPage from "./pages/StudentPage";

const App = () => {
  return (
    <AuthProvider>
      <StudentProvider>
        {" "}
        {/* Wrap both providers so they are available in the app */}
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/student" element={<StudentPage />} />
            {/* Other routes */}
          </Routes>
        </Router>
      </StudentProvider>
    </AuthProvider>
  );
};

export default App;
