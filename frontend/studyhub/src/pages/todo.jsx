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

  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  // Form fields in modal
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [course, setCourse] = useState("");
  const [newCourse, setNewCourse] = useState("");

  // Filters
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterTime, setFilterTime] = useState("all");
  const [filterCourse, setFilterCourse] = useState("all");

  // Sorting
  const [sortBy, setSortBy] = useState("created");

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

  // Unique user-created course list
  const userCourses = [...new Set(tasks.map((t) => t.course).filter(Boolean))];

  // Add task
  const addTask = async (e) => {
    e.preventDefault();
    if (!taskName.trim()) return;

    await addDoc(collection(db, "tasks"), {
      text: taskName,
      completed: false,
      uid: user.uid,
      dueDate: dueDate ? new Date(dueDate).getTime() : null,
      course: newCourse ? newCourse : course,
      createdAt: Date.now()
    });

    setTaskName("");
    setDueDate("");
    setCourse("");
    setNewCourse("");
    setModalOpen(false);
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

  // ---- FILTERING ----
  let filteredTasks = [...tasks];

  if (filterStatus !== "all") {
    filteredTasks = filteredTasks.filter((t) =>
      filterStatus === "completed" ? t.completed : !t.completed
    );
  }

  if (filterCourse !== "all") {
    filteredTasks = filteredTasks.filter((t) => t.course === filterCourse);
  }

  if (filterTime !== "all") {
    const today = new Date();
    filteredTasks = filteredTasks.filter((t) => {
      if (!t.dueDate) return false;
      const d = new Date(t.dueDate);
      if (filterTime === "today")
        return d.toDateString() === today.toDateString();
      if (filterTime === "week") {
        const diff = d - today;
        return diff >= 0 && diff <= 7 * 24 * 60 * 60 * 1000;
      }
      return true;
    });
  }

  // ---- SORTING ----
  if (sortBy === "alpha") {
    filteredTasks.sort((a, b) => a.text.localeCompare(b.text));
  } else if (sortBy === "due") {
    filteredTasks.sort((a, b) => (a.dueDate || 0) - (b.dueDate || 0));
  } else if (sortBy === "created") {
    filteredTasks.sort((a, b) => b.createdAt - a.createdAt);
  }

  // --- STYLING ---
  const filterStyle = {
    padding: "0.6rem",
    borderRadius: "8px",
    border: "1px solid #D1D5DB",
    background: "white",
    fontSize: "0.9rem",
    cursor: "pointer",
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto", fontFamily: "Poppins" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 600, marginBottom: "1.5rem" }}>To-do list</h1>

      {/* Filters */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        <select style={filterStyle} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All Tasks</option>
          <option value="completed">Completed</option>
          <option value="not">Not Completed</option>
        </select>

        <select style={filterStyle} onChange={(e) => setFilterTime(e.target.value)}>
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
        </select>

        <select style={filterStyle} onChange={(e) => setFilterCourse(e.target.value)}>
          <option value="all">All Courses</option>
          {userCourses.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select style={filterStyle} onChange={(e) => setSortBy(e.target.value)}>
          <option value="created">Newest</option>
          <option value="alpha">A–Z</option>
          <option value="due">Due Date</option>
        </select>

        <button
          onClick={() => setModalOpen(true)}
          style={{
            background: "#4F46E5",
            color: "white",
            padding: "0.6rem 1.2rem",
            borderRadius: "8px",
            border: "none",
            marginLeft: "auto",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          + Add Task
        </button>
      </div>

      {/* Table */}
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            background: "#F3F4F6",
            padding: "0.8rem 1rem",
            fontWeight: 600,
            fontSize: "0.9rem",
            color: "#374151",
          }}
        >
          <div>Task</div>
          <div>Due Date</div>
          <div>Course</div>
          <div>Status</div>
        </div>

        {filteredTasks.map((t) => (
          <div
            key={t.id}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              padding: "0.8rem 1rem",
              borderBottom: "1px solid #E5E7EB",
              background: t.completed ? "#F9FAFB" : "white",
              opacity: t.completed ? 0.6 : 1,
              alignItems: "center",
            }}
          >
            {/* Checkbox + Task */}
            <div
              onClick={() => toggleComplete(t.id, t.completed)}
              style={{ display: "flex", alignItems: "center", gap: "0.6rem", cursor: "pointer" }}
            >
              <input
                type="checkbox"
                checked={t.completed}
                readOnly
                style={{ width: "18px", height: "18px", accentColor: "#4F46E5", cursor: "pointer" }}
              />
              {t.text}
            </div>

            <div>{t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "—"}</div>
            <div>{t.course || "—"}</div>

            <div style={{ display: "flex", gap: "0.7rem" }}>
              <span style={{ fontWeight: 500, color: t.completed ? "#059669" : "#D97706" }}>
                {t.completed ? "Completed" : "Not Completed"}
              </span>

              <button
                onClick={() => deleteTask(t.id)}
                style={{
                  background: "#EF4444",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "0.3rem 0.6rem",
                  cursor: "pointer",
                }}
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 50,
          }}
          onClick={() => setModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              padding: "2rem",
              width: "350px",
              borderRadius: "12px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            }}
          >
            <h2 style={{ marginBottom: "1rem", fontWeight: 600 }}>Add a Task</h2>

            <input
              type="text"
              placeholder="Task name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              style={inputStyle}
            />

            <label style={{ fontSize: "0.9rem", fontWeight: 500 }}>Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              style={inputStyle}
            />

            <label style={{ fontSize: "0.9rem", fontWeight: 500 }}>Course</label>

            {/* if adding a new course */}
            <input
              type="text"
              placeholder="New course name (optional)"
              value={newCourse}
              onChange={(e) => setNewCourse(e.target.value)}
              style={inputStyle}
            />

            {/* dropdown of existing courses */}
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              style={inputStyle}
            >
              <option value="">Choose existing course</option>
              {userCourses.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <button
              onClick={addTask}
              style={{
                width: "100%",
                padding: "0.8rem",
                background: "#4F46E5",
                color: "white",
                borderRadius: "10px",
                border: "none",
                fontSize: "1rem",
                fontWeight: "500",
                cursor: "pointer",
                marginTop: "1rem",
              }}
            >
              Add Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.6rem",
  borderRadius: "8px",
  border: "1px solid #D1D5DB",
  marginBottom: "1rem",
};