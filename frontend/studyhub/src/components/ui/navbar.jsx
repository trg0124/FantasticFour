import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/authContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isHovered, setIsHovered] = useState(false); 

  const links = [
    { to: "/account", label: "Your account"}
  ];


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
      backgroundColor: "#4F46E5",
      color: "black",
      fontWeight: "bold",
      fontFamily: "Poppins, sans-serif"
    }}>
      <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            color: isHovered ? "white" : "black",
            fontFamily: "Poppins",
          }}
        >
          <img
            src="/learning.png"
            alt="logo"
            style={{ width: "50px", height: "50px" }}
          />
          <h1 style={{ fontSize: "2.7rem", fontWeight: "500", margin: 0 }}>
            StudyHub
          </h1>
        </div>
      </Link>

      <div style={{ display: "flex", gap: "1.5rem" }}>
        {links.map((link, i) => (
          <Link
            key={i}
            to={link.to}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              color: hoveredIndex === i ? "white" : "black",
              textDecoration: "none",
              fontSize: "1.5rem",
            }}
          >
            {link.label}
          </Link>
        ))}
        <button 
          onClick={handleLogout}
          style={{
            background: "white",
            color: "black",
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