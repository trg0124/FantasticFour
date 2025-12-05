import { useEffect, useState } from "react";

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

    const definition = window.prompt(
      "Enter the answer/definition for this term:"
    );
    if (!definition || !definition.trim()) return;

    const newCard = {
      id: Date.now(),
      term: term.trim(),
      definition: definition.trim(),
    };

    setCards((prev) => [...prev, newCard]);
    setTerm("");
    setCurrentIndex(cards.length); // go to the new card
    setShowFront(true);
  };

  const toggleShow = () => {
    if (cards.length === 0) return;
    setShowFront((prev) => !prev);
  };

  const nextCard = () => {
    if (cards.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % cards.length);
    setShowFront(true);
  };

  const currentCard = cards[currentIndex];

  return (
    <div className="flashcards-page">
      {/* Big title like the mockup */}
      <h1 className="flashcards-title">Flashcards</h1>

      {/* White box in the center */}
      <section className="flashcards-panel-outer">
        <div className="flashcards-panel-inner">
          {/* Top bar: Enter Term + Add Term */}
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

          {/* Big card + button */}
          <div className="flashcards-card-area">
            <div
              className={
                cards.length === 0
                  ? "flashcards-card flashcards-card-empty"
                  : "flashcards-card"
              }
              onClick={nextCard}
            >
              {cards.length === 0 ? (
                <span className="flashcards-placeholder">(WORD)</span>
              ) : (
                <span className="flashcards-text">
                  {showFront ? currentCard.term : currentCard.definition}
                </span>
              )}
            </div>

            <button
              type="button"
              className="flashcards-main-btn"
              onClick={toggleShow}
              disabled={cards.length === 0}
            >
              {showFront ? "Show Answer" : "Show Term"}
            </button>

            {cards.length > 0 && (
              <p className="flashcards-counter">
                Card {currentIndex + 1} of {cards.length} &mdash; click the card
                to see the next one
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
