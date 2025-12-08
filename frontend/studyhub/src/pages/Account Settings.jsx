import { useEffect, useState } from "react";
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
const Section = ({ title, children }) => (
   <div style={{ marginBottom: "2rem" }}>
     <h2
       style={{
          fontSize: "1.3rem",
          fontWeight: 600,
          color: "#5A4AE3",
          marginBottom: "1rem",
        }}
       >
       {title}
     </h2>
     <div
       style={{
         background: "#F7F7FF",
          padding: "1.5rem",
          borderRadius: "12px",
        }}
       >
       {children}
     </div>
   </div>
  );

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
      <h1 style={{ fontSize: "2rem", fontWeight: 600, marginBottom: "2rem" }}>
          Account Settings
        </h1>

      {/* Profile */}
      <Section title="Profile">
        <Row label="Name" value={user?.displayName || "No name set"} link="/ edit-name" />
        <Row label="Email" value={user?.email} link="/edit-email" />
         <Row label="School" value="University of ———" link="/edit-school" />
         <Row label="Major" value="Major in ———" link="/edit-major" />
        
         </Section>
        {/* Study Goals */}
       <Section title="Study Goals">
         <Row label="Daily Goal" value="Set your study target" link="/edit-goal" / >

         </Section>
      {/* Security */}
        <Section title="Security">
          <Row label="Password" value="********" link="/change-password" />
          
          </Section>
      {/* Terms */}
      <Section title="Legal">
        <Row label="Terms & Conditions" value="View details" link="/terms" />
        <Row label="Privacy Policy" value="Read the policy" link="/privacy" />
                </Section>
      </div>
    </div>
  );
}
      
      
    
        
        
  

