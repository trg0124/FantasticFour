import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Home from "./pages/home";
import ProtectedRoute from "./components/Auth/protectedRoute";
import { useAuth } from "./components/Auth/authContext";
import './App.css';

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/home" /> : <Navigate to="/login" />}
      />

      <Route
        path="/login"
        element={user ? <Navigate to="/home" /> : <Login />}
      />

      <Route
        path="/signup"
        element={user ? <Navigate to="/home" /> : <Signup />}
      />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;