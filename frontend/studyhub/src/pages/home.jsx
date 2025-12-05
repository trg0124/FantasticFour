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
        Choose a tool to begin:
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

      {/* Spotify mini-player */}
      <div style={{ marginTop: "3rem" }}>
        <h3>🎧 Your Study Playlist</h3>

        {/* Show current playlist */}
        <iframe
          style={{ borderRadius: "12px", marginTop: "1rem" }}
          src={playlist}
          width="80%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>

        {/* Button to change playlist */}
        <p 
          onClick={() => setShowInput(!showInput)} 
          style={{
          marginTop: "0.5rem",
          color: "#555",
          textDecoration: "underline",
          cursor: "pointer",
          fontSize: "0.9rem"
          }}
        >
        Change playlist
        </p>


        {/* Input field */}
        {showInput && (
          <div style={{ marginTop: "1rem" }}>
            <input
              type="text"
              placeholder="Paste your Spotify playlist link"
              value={newPlaylist}
              onChange={(e) => setNewPlaylist(e.target.value)}
              style={{
                padding: "0.5rem",
                width: "300px",
                borderRadius: "6px",
                border: "1px solid #ccc"
              }}
            />
            <button
              onClick={savePlaylist}
              style={{
                marginLeft: "0.5rem",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                border: "none",
                background: "green",
                color: "white",
                cursor: "pointer"
              }}
            >
              Save
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