import { useAuth } from "../components/Auth/authContext";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import { db } from "../firebase";

export default function Todo() {
  const { user } = useAuth();
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Load tasks in real time
  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "tasks"), where("uid", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let items = [];
      snapshot.forEach((doc) =>
        items.push({ id: doc.id, ...doc.data() })
      );
      setTasks(items);
    });

    return unsubscribe;
  }, [user]);

  // Add new task
  const addTask = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    await addDoc(collection(db, "tasks"), {
      text: task,
      completed: false,
      uid: user.uid, // associate with user
      createdAt: Date.now()
    });

    setTask("");
  };

  // Toggle complete
  const toggleComplete = async (taskId, currentState) => {
    await updateDoc(doc(db, "tasks", taskId), {
      completed: !currentState
    });
  };

  // Delete task
  const deleteTask = async (taskId) => {
    await deleteDoc(doc(db, "tasks", taskId));
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h1>To-Do List</h1>

      <form onSubmit={addTask} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "0.5rem"
          }}
        />
        <button style={{
          width: "100%",
          padding: "0.5rem",
          background: "#1e3a8a",
          color: "white",
          border: "none",
          borderRadius: "5px"
        }}>
          Add Task
        </button>
      </form>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((t) => (
          <li
            key={t.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.5rem",
              borderBottom: "1px solid #ddd",
              textDecoration: t.completed ? "line-through" : "none",
              opacity: t.completed ? 0.5 : 1
            }}
          >
            <span
              onClick={() => toggleComplete(t.id, t.completed)}
              style={{ cursor: "pointer" }}
            >
              {t.text}
            </span>

            <button
              onClick={() => deleteTask(t.id)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "0.3rem 0.6rem",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}