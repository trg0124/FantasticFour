import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";

const cardStyle = {
  width: "100%",
  maxWidth: "420px",
  background: "#FFFFFF",
  padding: "2rem 2.5rem",
  borderRadius: "16px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  textAlign: "center",
  animation: "fadeIn 0.5s ease",
};

const inputStyle = {
  width: "100%",
  padding: "0.9rem 1rem",
  borderRadius: "12px",
  border: "1px solid #D1D5DB",
  marginBottom: "1.2rem",
  fontSize: "0.95rem",
  background: "#FFFFFF",
  transition: "all 0.2s ease",
};

const buttonStyle = {
  width: "100%",
  padding: "0.9rem",
  borderRadius: "12px",
  background: "#4F46E5",
  border: "none",
  color: "white",
  fontSize: "1rem",
  fontWeight: "500",
  cursor: "pointer",
  marginTop: "0.5rem",
  boxShadow: "0 4px 6px rgba(79, 70, 229, 0.25)",
  transition: "0.2s ease",
};


export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      nav("/home");
    } catch (err) {
      setError("Invalid email or password.");
    }
  }

  return (
    <div
      style={{
        background: "#FFF7F7",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        fontFamily: "Poppins",
      }}
    >
      <div style={cardStyle}>
        {/* Logo + Title */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
          <img
            src="/learning.png"
            alt="logo"
            style={{ width: "50px", height: "50px" }}
          />
          <h1 style={{ fontSize: "1.6rem", fontWeight: "600", margin: 0 }}>StudyHub</h1>
        </div>

        <h2 style={{ fontSize: "1.25rem", fontWeight: "500", color: "#374151", marginBottom: "1rem" }}>
          Let’s get started!
        </h2>

        {error && (
          <p style={{ color: "#DC2626", fontSize: "0.9rem", marginBottom: "1rem" }}>
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} style={{ marginTop: "1rem" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              ...inputStyle,
              borderColor: email ? "#4F46E5" : "#D1D5DB",
            }}
          />

          <div style={{ position: "relative" }}>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                ...inputStyle,
                borderColor: password ? "#4F46E5" : "#D1D5DB",
              }}
            />

            <span
              onClick={() => setShowPass(!showPass)}
              style={{
                position: "absolute",
                right: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                opacity: 0.7,
              }}
            >
            </span>
          </div>

          <button
            type="submit"
            style={{
              ...buttonStyle,
              background: "#4F46E5",
            }}
            onMouseEnter={(e) => (e.target.style.background = "#4338CA")}
            onMouseLeave={(e) => (e.target.style.background = "#4F46E5")}
          >
            Login
          </button>
        </form>

        <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#6B7280" }}>
          Don’t have an account?{" "}
          <Link
            to="/signup"
            style={{ color: "#4F46E5", textDecoration: "none", fontWeight: "500" }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}