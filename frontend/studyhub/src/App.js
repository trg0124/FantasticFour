import { useAuth } from "./components/Auth/authContext";
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Home from "./pages/home";
import ProtectedRoute from "./components/Auth/protectedRoute";
import Layout from "./components/ui/layout";
import Todo from "./pages/todo";
import Flashcards from "./pages/Flashcards";
import Motivation from "./pages/Motivation";
import Account from "./pages/Account";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Layout>
              <Home />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/todo"
        element={
          <ProtectedRoute>
            <Layout>
              <Todo />
            </Layout>
          </ProtectedRoute>
        }
      />


      <Route
        path="/flashcards"
        element={
          <ProtectedRoute>
            <Layout>
              <Flashcards />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/motivation"
        element={
          <ProtectedRoute>
            <Layout>
              <Motivation />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/timer"
        element={
          <ProtectedRoute>
            <Layout>
              <h1>Focus Timer Page</h1>
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Layout>
              <Account />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}