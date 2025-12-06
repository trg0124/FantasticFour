import { useEffect, useRef, useState } from "react";

export default function Pomodoro() {
  // DEFAULT DURATIONS (in seconds)
  const PRESETS = {
    "25 / 5": { work: 25 * 60, break: 5 * 60 },
    "50 / 10": { work: 50 * 60, break: 10 * 60 },
    "15 / 3": { work: 15 * 60, break: 3 * 60 },
    Custom: null,
  };

  const [selectedPreset, setSelectedPreset] = useState("25 / 5");
  const [customWork, setCustomWork] = useState(25);
  const [customBreak, setCustomBreak] = useState(5);

  const [workTime, setWorkTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);

  const [time, setTime] = useState(workTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const intervalRef = useRef(null);

  // --- SOUND EFFECT ---
  const beep = new Audio("/beep.mp3"); // add a beep sound file in public folder

  // Load correct durations when preset changes
  useEffect(() => {
    if (selectedPreset === "Custom") {
      setWorkTime(customWork * 60);
      setBreakTime(customBreak * 60);
      setTime(customWork * 60);
    } else {
      const preset = PRESETS[selectedPreset];
      setWorkTime(preset.work);
      setBreakTime(preset.break);
      setTime(preset.work);
    }
    pauseTimer();
    setIsBreak(false);
  }, [selectedPreset, customWork, customBreak]);

  // TIMER LOGIC
  const startTimer = () => {
    if (intervalRef.current) return;
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev === 0) {
          beep.play(); // SOUND ALERT

          clearInterval(intervalRef.current);
          intervalRef.current = null;

          // Switch mode
          if (isBreak) {
            setIsBreak(false);
            setTime(workTime);
          } else {
            setIsBreak(true);
            setTime(breakTime);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
  };

  const resetTimer = () => {
    pauseTimer();
    setIsBreak(false);
    setTime(workTime);
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  // --- PROGRESS RING ---
  const totalTime = isBreak ? breakTime : workTime;
  const progress = 1 - time / totalTime; // 0 → 1

  return (
    <div
      style={{
        background: "white",
        padding: "1.8rem",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        fontFamily: "Poppins",
        width: "100%",
        border: "5px solid #4F46E5",
        maxWidth: "350px",
      }}
    >
      <h2
        style={{
          fontSize: "1.3rem",
          fontWeight: "600",
          marginBottom: "1rem",
          color: "black",
        }}
      >
        Pomodoro Timer
      </h2>

      {/* Preset Selector */}
      <select
        value={selectedPreset}
        onChange={(e) => setSelectedPreset(e.target.value)}
        style={{
          width: "100%",
          marginBottom: "1rem",
          padding: "0.6rem",
          borderRadius: "10px",
          border: "1px solid #D1D5DB",
        }}
      >
        {Object.keys(PRESETS).map((p) => (
          <option key={p}>{p}</option>
        ))}
      </select>

      {/* Custom Inputs */}
      {selectedPreset === "Custom" && (
        <div
          style={{
            marginBottom: "1rem",
            display: "flex",
            gap: "1rem",
          }}
        >
          <input
            type="number"
            min="1"
            value={customWork}
            onChange={(e) => setCustomWork(e.target.value)}
            style={inputStyle}
            placeholder="Work (min)"
          />
          <input
            type="number"
            min="1"
            value={customBreak}
            onChange={(e) => setCustomBreak(e.target.value)}
            style={inputStyle}
            placeholder="Break (min)"
          />
        </div>
      )}

      {/* PROGRESS CIRCLE */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <svg width="170" height="170">
          <circle
            cx="85"
            cy="85"
            r="70"
            stroke="#E5E7EB"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="85"
            cy="85"
            r="70"
            stroke="#4F46E5"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 70}
            strokeDashoffset={(1 - progress) * 2 * Math.PI * 70}
            style={{ transition: "stroke-dashoffset 0.3s linear" }}
          />
        </svg>

        <div
          style={{
            position: "absolute",
            marginTop: "50px",
            textAlign: "center",
            fontSize: "2.2rem",
            fontWeight: "700",
            color: "#374151",
          }}
        >
          {formatTime(time)}
        </div>
      </div>

      {/* Session Type */}
      <div
        style={{
          textAlign: "center",
          marginTop: "1rem",
          marginBottom: "1.3rem",
          fontWeight: "500",
          color: isBreak ? "#059669" : "#D97706",
        }}
      >
        {isBreak ? "Break Time" : "Focus Time"}
      </div>

      {/* BUTTONS */}
      <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center" }}>
        {!isRunning ? (
          <button onClick={startTimer} style={buttonStyle}>
            Start
          </button>
        ) : (
          <button onClick={pauseTimer} style={buttonStyle}>
            Pause
          </button>
        )}

        <button
          onClick={resetTimer}
          style={{ ...buttonStyle, background: "#6B7280" }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: "0.6rem 1.2rem",
  background: "#4F46E5",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "500",
  fontSize: "0.9rem",
};

const inputStyle = {
  width: "100%",
  padding: "0.6rem",
  borderRadius: "10px",
  border: "1px solid #D1D5DB",
};