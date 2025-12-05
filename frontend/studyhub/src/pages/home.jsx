import { useAuth } from "../components/Auth/authContext";
import LogoutButton from "../components/Auth/logout";

export default function Home() {
  const { user } = useAuth();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome, {user?.email} 🎉</h1>
      <p>This is your StudyHub home page.</p>
      <LogoutButton />
    </div>
  );
}