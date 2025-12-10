import { useAuth } from "../components/Auth/authContext";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, doc, query, where, setDoc, onSnapshot } from "firebase/firestore";
import Pomodoro from "../components/pomodoro";

// --- TO-DO CARD ---
function TodoCard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "tasks"), where("uid", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, [user]);

  const pending = tasks.filter((t) => !t.completed).length;
  const completed = tasks.filter((t) => t.completed).length;

  return (
    <div
      onClick={() => (window.location.href = "/todo")}
      style={{
        background: "white",
        borderRadius: "12px",
        padding: "1.5rem",
        width: "200px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        cursor: "pointer",
        border: "5px solid #4F46E5",
        fontWeight: "bold",
      }}
    >
      <h3>📝 To-Do List</h3>
      <p style={{ fontWeight: "500", margin: "0.5rem 0" }}>
        Pending: {pending} | Completed: {completed}
      </p>
      <ul style={{ fontSize: "0.85rem", margin: 0, paddingLeft: "1rem" }}>
        {tasks.slice(0, 3).map((t) => (
          <li key={t.id}>{t.text}</li>
        ))}
      </ul>
      {tasks.length > 3 && <p style={{ fontSize: "0.8rem" }}>…and more</p>}
    </div>
  );
}

// --- FLASHCARDS CARD ---
function FlashcardCard() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("studyhub_flashcards");
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        setCards(parsed);
      }
    } catch {
      setCards([]);
    }
  }, []);

  return (
    <div
      onClick={() => (window.location.href = "/flashcards")}
      style={{
        background: "white",
        borderRadius: "12px",
        padding: "1.5rem",
        width: "260px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        cursor: "pointer",
        border: "5px solid #4F46E5",
        fontWeight: "bold",
        textAlign: "center",   // ✅ only horizontal centering
      }}
    >
      <h3 style={{ marginBottom: "0.5rem" }}>📚 Flashcards</h3>

      <p style={{ marginBottom: "0.5rem", fontWeight: 500 }}>
        Total Cards: {cards.length}
      </p>

      {cards.length > 0 ? (
        <div>
          <p style={{ fontSize: "0.85rem", marginBottom: "0.25rem" }}>
            Recent terms:
          </p>
          <ul
            style={{
              fontSize: "0.85rem",
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {cards.slice(0, 3).map((c) => (
              <li key={c.term}>{c.term}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p style={{ fontSize: "0.85rem" }}>
          No cards yet. Click to add your first flashcard.
        </p>
      )}
    </div>
  );
}

// --- MOTIVATION CARD ---
function MotivationCard() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const storedStreak = localStorage.getItem("studyhub_streak");
    if (storedStreak) {
      const num = Number(storedStreak);
      if (!isNaN(num)) setStreak(num);
    }
  }, []);

  return (
    <div
      onClick={() => (window.location.href = "/motivation")}
      style={{
        background: "white",
        borderRadius: "12px",
        padding: "1.5rem",
        width: "260px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        cursor: "pointer",
        border: "5px solid #4F46E5",
        fontWeight: "bold",
        textAlign: "center",   // ✅ horizontal centering only
      }}
    >
      <h3 style={{ marginBottom: "0.5rem" }}>💡 Motivation</h3>

      {streak > 0 ? (
        <>
          <p style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.25rem" }}>
            {streak} day streak ✅
          </p>
          <p style={{ fontSize: "0.85rem" }}>
            Keep going! Click to see your full motivation board.
          </p>
        </>
      ) : (
        <p style={{ fontSize: "0.85rem" }}>
          No streak yet. Tap to start your first day!
        </p>
      )}
    </div>
  );
}

// --- SPOTIFY CARD ---
function SpotifyCard() {
  const { user } = useAuth();
  const [playlist, setPlaylist] = useState(
    "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M"
  );
  const [newPlaylist, setNewPlaylist] = useState("");
  const [showInput, setShowInput] = useState(false);

  // ---- LOAD USER PLAYLIST ----
  useEffect(() => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      if (snapshot.exists() && snapshot.data().playlist) {
        setPlaylist(snapshot.data().playlist);
      }
    });

    return unsubscribe;
  }, [user]);

  // ---- SAVE PLAYLIST ----
  const savePlaylist = async () => {
    if (!newPlaylist.trim()) return;

    // Turn normal link into embed link
    const embedLink = newPlaylist.replace(
      "open.spotify.com/",
      "open.spotify.com/embed/"
    );

    const userRef = doc(db, "users", user.uid);

    await setDoc(
      userRef,
      { playlist: embedLink },
      { merge: true }
    );

    setPlaylist(embedLink);
    setShowInput(false);
    setNewPlaylist("");
  };

  return (
    <div
      style={{
        width: "50%",
        background: "white",
        borderRadius: "12px",
        padding: "1rem",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        border: "5px solid #4F46E5",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ fontSize: "1.1rem", margin: 0 }}>🎧 Your Playlist</h3>
        <p
          onClick={() => setShowInput(!showInput)}
          style={{
            cursor: "pointer",
            color: "#6B7280",
            fontSize: "0.85rem",
            textDecoration: "underline",
          }}
        >
          Edit
        </p>
      </div>

      <iframe
        src={playlist}
        width="100%"
        height="200px"
        style={{ borderRadius: "12px", border: "none", marginTop: "0.5rem" }}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>

      {showInput && (
        <div>
          <input
            type="text"
            placeholder="Paste Spotify playlist link"
            value={newPlaylist}
            onChange={(e) => setNewPlaylist(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "8px",
              border: "1px solid #D1D5DB",
              marginBottom: "0.5rem",
            }}
          />
          <button
            onClick={savePlaylist}
            style={{
              width: "100%",
              padding: "0.5rem",
              background: "#4F46E5",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}


// --- HOME PAGE ---
export default function Home() {
  const { user } = useAuth();

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome, {user?.email} 👋</h1>
      <p style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
        Choose a tool to begin your study session:
      </p>

      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        <Pomodoro />
        <TodoCard />
        <FlashcardCard />
        <MotivationCard />
        <SpotifyCard />
      </div>
    </div>
  );
}
