import React, { useEffect, useState } from "react";
import "./Motivation.css";

const QUOTES = [
  "The secret of getting ahead is getting started.",
  "Small steps every day add up to big results.",
  "You don’t have to be perfect, just consistent.",
  "Study now, thank yourself later.",
  "Your future self is watching you. Keep going.",
];

export default function Motivation() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [streak, setStreak] = useState(1);

  useEffect(() => {
    const storedStreak = localStorage.getItem("studyhub_streak");
    const lastDate = localStorage.getItem("studyhub_lastDate");
    const today = new Date().toDateString();

    if (storedStreak && lastDate) {
      if (lastDate === today) {
        setStreak(Number(storedStreak));
      } else {
        const next = Number(storedStreak) + 1;
        setStreak(next);
        localStorage.setItem("studyhub_streak", String(next));
        localStorage.setItem("studyhub_lastDate", today);
      }
    } else {
      setStreak(1);
      localStorage.setItem("studyhub_streak", "1");
      localStorage.setItem("studyhub_lastDate", today);
    }
  }, []);

  const nextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
  };

  return (
    <div className="motivation-page">
      <div className="motivation-inner">
        {/* Heading + subtitle */}
        <h1 className="motivation-heading">Stay Motivated</h1>
        <p className="motivation-subtitle">
          Stay consistent and turn your study habits into success
        </p>

        {/* Top 3 cards row */}
        <div className="motivation-top-row">
          {/* Quote card */}
          <div className="motivation-info-card" onClick={nextQuote}>
            <p className="motivation-quote">
              “{QUOTES[quoteIndex]}”
            </p>
            <p className="motivation-quote-hint">Click to see another quote</p>
          </div>

          {/* Goals text card */}
          <div className="motivation-info-card motivation-center-card">
            <p className="motivation-center-line">Create goals,</p>
            <p className="motivation-center-line">break limits.</p>
          </div>

          {/* Streak card */}
          <div className="motivation-info-card motivation-streak-card">
            <div className="motivation-streak-number">{streak}</div>
            <p className="motivation-streak-label">day streak</p>
          </div>
        </div>

        {/* Bottom banner */}
        <div className="motivation-bottom-banner">
          <div className="motivation-bottom-text">
            <p className="motivation-bottom-quote">
              “Education is the most powerful weapon which you can use to change
              the world.”
            </p>
            <p className="motivation-bottom-author">– Nelson Mandela</p>
          </div>
          <button className="motivation-join-btn">Join Now</button>
        </div>
      </div>
    </div>
  );
}
