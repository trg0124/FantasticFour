import { useAuth } from "../components/Auth/authContext";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Home() {
  const { user } = useAuth();
  const [playlist, setPlaylist] = useState(
    "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M"
  );
  const [newPlaylist, setNewPlaylist] = useState("");
  const [showInput, setShowInput] = useState(false);

  // Load user playlist from Firestore
  useEffect(() => {
    if (!user) return;

    const ref = doc(db, "users", user.uid);
    getDoc(ref).then((snapshot) => {
      if (snapshot.exists() && snapshot.data().playlist) {
        setPlaylist(snapshot.data().playlist);
      }
    });
  }, [user]);

  // Save playlist
  const savePlaylist = async () => {
    if (!newPlaylist.trim()) return;

    const embedLink = newPlaylist.replace("open.spotify.com/", "open.spotify.com/embed/");
    const ref = doc(db, "users", user.uid);

    await setDoc(ref, { playlist: embedLink }, { merge: true });

    setPlaylist(embedLink);
    setShowInput(false);
    setNewPlaylist("");
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome, {user?.email} 👋</h1>

      <p style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
        Choose a tool to begin your study session:
      </p>

      <div style={{
        marginTop: "2rem",
        display: "flex",
        justifyContent: "center",
        gap: "2rem",
        flexWrap: "wrap"
      }}>
        <Card title="📝 To-Do List" link="/todo" />
        <Card title="📚 Flashcards" link="/flashcards" />
        <Card title="⏱ Focus Timer" link="/timer" />
      </div>

      {/* Spotify Playlist Card */}
<div
  style={{
    width: "100%",
    maxWidth: "450px",
    margin: "2rem auto",
    background: "#FFFFFF",
    borderRadius: "12px",
    padding: "1.25rem 1.5rem",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
    border: "1px solid #E5E7EB", // Tailwind gray-200
  }}
>
  {/* Title Row */}
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <h3
      style={{
        fontSize: "1.1rem",
        fontWeight: "600",
        color: "#1F2937", // neutral-800
        margin: 0,
      }}
    >
      🎧 Your Study Playlist
    </h3>

    <p
      onClick={() => setShowInput(!showInput)}
      style={{
        color: "#6B7280", // gray-500
        fontSize: "0.85rem",
        cursor: "pointer",
        textDecoration: "underline",
        margin: 0,
      }}
    >
      Edit
    </p>
  </div>

  {/* Spotify Player */}
  <iframe
    style={{
      borderRadius: "12px",
      width: "100%",
      marginTop: "1rem",
      border: "none",
      background: "#F9FAFB",
    }}
    src={playlist}
    height="152"
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
  ></iframe>

  {/* Edit Input */}
  {showInput && (
    <div style={{ marginTop: "1rem" }}>
      <input
        type="text"
        placeholder="Paste Spotify playlist link"
        value={newPlaylist}
        onChange={(e) => setNewPlaylist(e.target.value)}
        style={{
          padding: "0.6rem",
          width: "100%",
          borderRadius: "8px",
          border: "1px solid #D1D5DB", // gray-300
          background: "#FFFFFF",
          fontSize: "0.9rem",
        }}
      />

      <button
        onClick={savePlaylist}
        style={{
          marginTop: "0.75rem",
          background: "#4F46E5", // your purple
          width: "100%",
          padding: "0.6rem",
          borderRadius: "8px",
          border: "none",
          color: "white",
          fontWeight: "500",
          fontSize: "0.9rem",
          cursor: "pointer",
          boxShadow: "0 2px 4px rgba(79, 70, 229, 0.3)",
        }}
      >
        Save Playlist
      </button>
    </div>
  )}
</div>

    </div>
  );
}

function Card({ title, link }) {
  return (
    <div
      onClick={() => (window.location.href = link)}
      style={{
        background: "white",
        borderRadius: "12px",
        padding: "1.5rem",
        width: "160px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        cursor: "pointer",
        fontWeight: "bold"
      }}
    >
      {title}
    </div>
  );
}