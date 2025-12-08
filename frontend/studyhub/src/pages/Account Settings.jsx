import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Account() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const Row = ({ label, value, link }) => (
    <div
      style= {{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 0",
         borderBottom: "1px solid #e5e5e5",
        }}
    >
      <div>
        <p style={{ fontWeight: 600 }}>{label}</p>
        <p style={{ marginTop: "4px", color: "#666" }}>{value}</p>
      </div>
       {/* Edit Button */}
      <button
        onClick={() => navigate(link)}
        style={{
          background: "#5A4AE3",
          color: "white",
          border: "none",
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: 500,
        }}
      >
        Edit
      </button>
    </div>
  );

