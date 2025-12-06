import React, { useEffect, useState } from "react";
import "./Flashcards.css"; 

export default function Flashcards() {
  const [term, setTerm] = useState("");
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFront, setShowFront] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("studyhub_flashcards");
    if (stored) {
      setCards(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("studyhub_flashcards", JSON.stringify(cards));
  }, [cards]);

  const handleAddCard = (e) => {
    e.preventDefault();
    if (!term.trim()) return;

    const definition = window.prompt("Enter the answer/definition:");
    if (!definition || !definition.trim()) return;

    const newCard = {
      id: Date.now(),
      term: term.trim(),
      definition: definition.trim(),
    };

    setCards((prev) => [...prev, newCard]);
    setTerm("");
    setCurrentIndex(cards.length);
    setShowFront(true);
  };

  const toggleShow = () => {
    if (!cards.length) return;
    setShowFront((prev) => !prev);
  };

  const nextCard = () => {
    if (!cards.length) return;
    setCurrentIndex((prev) => (prev + 1) % cards.length);
    setShowFront(true);
  };

  const currentCard = cards[currentIndex];

  return (
    <div className="flashcards-page">
      {/* Page title */}
      <div className="flashcards-title-row">
        <h1 className="flashcards-title">Flashcards</h1>
      </div>

      {/* White card container */}
      <div className="flashcards-panel-outer">
        <div className="flashcards-panel-inner">
          
          {/* Input row */}
          <form className="flashcards-input-row" onSubmit={handleAddCard}>
            <input
              type="text"
              placeholder="Enter term..."
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
            <button type="submit" className="flashcards-add-btn">
              Add Term
            </button>
          </form>

          {/* Flashcard section */}
          <div className="flashcards-card-area">
            <div
              className={
                cards.length
                  ? "flashcards-card"
                  : "flashcards-card flashcards-card-empty"
              }
              onClick={nextCard}
            >
              {cards.length ? (
                <span className="flashcards-text">
                  {showFront ? currentCard.term : currentCard.definition}
                </span>
              ) : (
                <span className="flashcards-placeholder">(WORD)</span>
              )}
            </div>

            <button
              type="button"
              className="flashcards-main-btn"
              onClick={toggleShow}
              disabled={!cards.length}
            >
              {showFront ? "Show Answer" : "Show Term"}
            </button>

            {cards.length > 0 && (
              <p className="flashcards-counter">
                Card {currentIndex + 1} of {cards.length} — click the card to go next
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
