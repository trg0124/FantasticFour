import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/authContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = async () => {
    await logout();
    nav("/login");
  };

  if (!user) return null; // Hide navbar if not logged in

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2rem",
      backgroundColor: "#1e3a8a",
      color: "white"
    }}>
      <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
        <h2>📚 StudyHub</h2>
      </Link>

      <div style={{ display: "flex", gap: "1.5rem" }}>
        <Link to="/home" style={{ color: "white", textDecoration: "none" }}>Home</Link>
        <Link to="/todo" style={{ color: "white", textDecoration: "none" }}>To-Do List</Link>
        <Link to="/flashcards" style={{ color: "white", textDecoration: "none" }}>Flashcards</Link>
        <Link to="/motivation" style={{ color: "white", textDecoration: "none" }}>Motivation</Link>
        <Link to="/timer" style={{ color: "white", textDecoration: "none" }}>Focus Timer</Link>
        <button 
          onClick={handleLogout}
          style={{
            background: "white",
            color: "#1e3a8a",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            cursor: "pointer"
          }}>
          Logout
        </button>
      </div>
    </nav>
  );
}