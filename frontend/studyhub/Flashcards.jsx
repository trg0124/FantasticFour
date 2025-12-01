import { useEffect, useState } from "react";

export default function Flashcards() {
  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");
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
    if (!term.trim() || !definition.trim()) return;

    const newCard = {
      id: Date.now(),
      term: term.trim(),
      definition: definition.trim(),
    };

    setCards((prev) => [...prev, newCard]);
    setTerm("");
    setDefinition("");
    setCurrentIndex(cards.length);
    setShowFront(true);
  };

  const handleDeleteCurrent = () => {
    if (cards.length === 0) return;
    const updated = cards.filter((_, i) => i !== currentIndex);
    setCards(updated);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
    setShowFront(true);
  };

  const handleNext = () => {
    if (cards.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % cards.length);
    setShowFront(true);
  };

  const handlePrev = () => {
    if (cards.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    setShowFront(true);
  };

  const currentCard = cards[currentIndex];

  return (
    <section className="panel flashcards-panel">
      <header className="panel-header">
        <h2>Flashcards</h2>
        <span className="badge">Review</span>
      </header>

      <div className="flashcards-layout">
        <form className="flashcard-form" onSubmit={handleAddCard}>
          <h3>Create a new card</h3>
          <label>
            Term
            <input
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Ex: TCP/IP"
            />
          </label>
          <label>
            Definition
            <textarea
              rows="3"
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              placeholder="Ex: Core suite of communication protocols..."
            />
          </label>
          <button type="submit" className="primary-btn">
            Add Card
          </button>
        </form>

        <div className="flashcard-study">
          <h3>Study mode</h3>
          {cards.length === 0 ? (
            <p className="empty-state">
              No cards yet. Add a card on the left to get started.
            </p>
          ) : (
            <>
              <div
                className="flashcard-display"
                onClick={() => setShowFront(!showFront)}
              >
                <p className="flashcard-label">
                  {showFront ? "Term" : "Definition"}
                </p>
                <p className="flashcard-text">
                  {showFront ? currentCard.term : currentCard.definition}
                </p>
                <p className="flashcard-hint">Click the card to flip</p>
              </div>

          <div className="flashcard-controls">
            <span>
              {currentIndex + 1} / {cards.length}
            </span>
          </div>

              <button
                type="button"
                className="danger-btn"
                onClick={handleDeleteCurrent}
              >
                Delete this card
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
