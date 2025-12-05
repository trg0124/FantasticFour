import { useAuth } from "../components/Auth/authContext";
import LogoutButton from "../components/Auth/logout";

export default function Home() {
  const { user } = useAuth();

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Welcome back, {user?.email} 👋</h1>

      <p style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
        Ready to study? Choose a tool below:
      </p>

      <div style={{
        marginTop: "2rem",
        display: "flex",
        justifyContent: "center",
        gap: "2rem"
      }}>
        <div style={cardStyle}>📝 To-Do List</div>
        <div style={cardStyle}>📚 Flashcards</div>
        <div style={cardStyle}>⏱ Focus Timer</div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "white",
  borderRadius: "10px",
  padding: "2rem",
  width: "150px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  cursor: "pointer",
  fontWeight: "bold",
  textAlign: "center"
};