import React, { useEffect, useState } from "react";
import "./Motivation.css";

const QUOTES = [
  "The secret of getting ahead is getting started.",
  "Small steps every day add up to big results.",
  "You don’t have to be perfect, just consistent.",
  "Study now, thank yourself later.",
  "Your future self is watching you. Keep going."
];

export default function Motivation() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [goalText, setGoalText] = useState("");
  const [goals, setGoals] = useState([]);
  const [streak, setStreak] = useState(1);

  useEffect(() => {
    const storedStreak = localStorage.getItem("studyhub_streak");
    const storedDate = localStorage.getItem("studyhub_lastDate");
    const today = new Date().toDateString();

    if (storedStreak && storedDate) {
      if (storedDate === today) {
        setStreak(parseInt(storedStreak, 10));
      } else {
        const next = parseInt(storedStreak, 10) + 1;
        setStreak(next);
        localStorage.setItem("studyhub_streak", String(next));
        localStorage.setItem("studyhub_lastDate", today);
      }
    } else {
      localStorage.setItem("studyhub_streak", "1");
      localStorage.setItem("studyhub_lastDate", today);
      setStreak(1);
    }
  }, []);

  const handleNewQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
  };

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!goalText.trim()) return;
    setGoals((prev) => [...prev, { id: Date.now(), text: goalText, done: false }]);
    setGoalText("");
  };

  const toggleGoal = (id) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, done: !g.done } : g))
    );
  };

  return (
    <section className="panel motivation-panel">
      <header className="panel-header">
        <h2>Stay Motivated</h2>
        <span className="badge">StudyHub</span>
      </header>

      <div className="motivation-grid">
        <div className="motivation-card quote-card">
          <p className="quote-text">“{QUOTES[quoteIndex]}”</p>
          <button className="primary-btn" onClick={handleNewQuote}>
            New Quote
          </button>
        </div>

        <div className="motivation-card streak-card">
          <h3>Study Streak</h3>
          <p className="streak-number">{streak} day(s)</p>
          <p className="streak-caption">Keep your streak alive!</p>
        </div>

        <div className="motivation-card goals-card">
          <h3>Today&apos;s Goals</h3>
          <form className="goal-form" onSubmit={handleAddGoal}>
            <input
              type="text"
              placeholder="Ex: Review chapter 3"
              value={goalText}
              onChange={(e) => setGoalText(e.target.value)}
            />
            <button type="submit" className="secondary-btn">
              Add
            </button>
          </form>
          <ul className="goal-list">
            {goals.map((goal) => (
              <li
                key={goal.id}
                className={goal.done ? "goal-item done" : "goal-item"}
                onClick={() => toggleGoal(goal.id)}
              >
                <input
                  type="checkbox"
                  checked={goal.done}
                  onChange={() => toggleGoal(goal.id)}
                  onClick={(e) => e.stopPropagation()}
                />
                <span>{goal.text}</span>
              </li>
            ))}
            {goals.length === 0 && (
              <li className="goal-empty">No goals yet. Add your first one!</li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
