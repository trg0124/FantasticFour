import { useAuth } from "../components/Auth/authContext";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Account() {
  const { user } = useAuth();

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
        {/* Header */}
        <h1 style={{ fontSize: "2rem", fontWeight: 600, marginBottom: "2rem" }}>
          Account Settings
        </h1>

        {/* Profile Section */}
        <Section title="Profile">
          <Row label="Name" value={user?.displayName || "No name set"} />
          <Row label="Email" value={user?.email} />
          <Row label="School" value="University of ———" />
          <Row label="Major" value="Major in ———" />
        </Section>

        {/* Study goals */}
        <Section title="Study Goals">
          <Row label="Daily Goal" value="Set your study target" />
        </Section>

        {/* Security */}
        <Section title="Security">
          <Row label="Password" value="********" />
        </Section>

        {/* Terms */}
        <Section title="Terms & Conditions">
          <Row label="Legal" value="View platform terms" hideEdit />
        </Section>
      </div>
    </div>
  );
}

/* ——— Components ——— */

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <h2
        style={{
          fontSize: "1.2rem",
          fontWeight: 600,
          marginBottom: "1rem",
          color: "#4F46E5",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          background: "#F9FAFB",
          borderRadius: "12px",
          padding: "1rem",
          boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Row({ label, value, hideEdit }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0.75rem 0",
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <div>
        <div style={{ fontSize: "0.95rem", fontWeight: "500", color: "#374151" }}>
          {label}
        </div>
        <div style={{ fontSize: "0.9rem", color: "#6B7280" }}>{value}</div>
      </div>

      {!hideEdit && (
        <button
          style={{
            background: "#4F46E5",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "0.4rem 0.8rem",
            cursor: "pointer",
            fontSize: "0.85rem",
            fontWeight: "500",
          }}
        >
          Edit
        </button>
      )}
    </div>
  );
}