import { useNavigate } from "react-router-dom";
import React from "react";

export default function Resources() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FFF7F7",
        padding: "3rem 1.5rem",
        fontFamily: "Poppins",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          background: "white",
          borderRadius: "16px",
          padding: "2rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: 600, marginBottom: "2rem" }}>
          Resources
        </h1>

       
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <button
            style={buttonStyle}
            onClick={() => {
              /* does nothing */
            }}
          >
            Study Guides
          </button>

          <button
            style={buttonStyle}
            onClick={() => {
         
            }}
          >
            Class Notes
          </button>

          <button
            style={buttonStyle}
            onClick={() => {
 
            }}
          >
            External Links
          </button>

          <button
            style={buttonStyle}
            onClick={() => {
        
            }}
          >
            Tutoring Resources
          </button>
        </div>
      </div>
    </div>
  );
}

const buttonStyle = {
  width: "100%",
  padding: "1rem",
  fontSize: "1.1rem",
  borderRadius: "12px",
  border: "2px solid #e0dede",
  background: "#fafafa",
  cursor: "pointer",
  textAlign: "left",
  fontFamily: "Poppins",
};
