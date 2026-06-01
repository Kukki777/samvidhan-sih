import { useEffect, useMemo, useState } from "react";
import "./guess.css";

const Guess = () => {
  const articlesAndUses = [
    { article: "Article 14", use: "Equality before law" },
    { article: "Article 17", use: "Abolition of untouchability" },
    { article: "Article 19", use: "Freedom of speech and expression" },
    { article: "Article 21", use: "Life and personal liberty" },
    { article: "Article 21A", use: "Right to education" },
    { article: "Article 32", use: "Constitutional remedies" },
    { article: "Article 51A", use: "Fundamental duties" },
    { article: "Article 368", use: "Amendment of the Constitution" },
  ];

  const buildCards = () => {
    const cardData = articlesAndUses.flatMap(({ article, use }, pairId) => [
      { id: `${pairId}-article`, pairId, type: "Article", value: article },
      { id: `${pairId}-use`, pairId, type: "Meaning", value: use },
    ]);

    return [...cardData].sort(() => Math.random() - 0.5);
  };

  const [cards, setCards] = useState(() => buildCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);

  const matchedPairs = useMemo(() => matchedIds.length / 2, [matchedIds]);

  useEffect(() => {
    if (gameOver) return undefined;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          setGameOver(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameOver]);

  useEffect(() => {
    if (matchedIds.length === cards.length && cards.length > 0) {
      setGameOver(true);
    }
  }, [cards.length, matchedIds.length]);

  const flipCard = (index) => {
    const selectedCard = cards[index];

    if (
      gameOver ||
      matchedIds.includes(selectedCard.id) ||
      flippedCards.length < 2 &&
      flippedCards.some((card) => card.index === index)
    ) {
      return;
    }

    if (flippedCards.length >= 2) return;

    const newFlippedCards = [...flippedCards, { index, ...selectedCard }];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      checkMatch(newFlippedCards);
    }
  };

  const checkMatch = (selectedCards) => {
    const [firstCard, secondCard] = selectedCards;
    if (firstCard.pairId === secondCard.pairId && firstCard.id !== secondCard.id) {
      setMatchedIds((prev) => [...prev, firstCard.id, secondCard.id]);
      window.setTimeout(() => setFlippedCards([]), 400);
    } else {
      window.setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  };

  const restartGame = () => {
    setCards(buildCards());
    setTimeLeft(60);
    setMatchedIds([]);
    setFlippedCards([]);
    setGameOver(false);
  };

  return (
    <main className="memory-page">
      <section className="memory-panel">
        <div className="memory-header">
          <h1>Constitutional Matchmaker</h1>
          <div className="memory-stats">
            <span>Time: {timeLeft}s</span>
            <span>Pairs: {matchedPairs}/{cards.length / 2}</span>
          </div>
        </div>

        <div className="memory-grid">
          {cards.map((card, index) => (
            <button
              key={card.id}
              className={`memory-card ${
                flippedCards.some((fc) => fc.index === index) ||
                matchedIds.includes(card.id)
                  ? "is-flipped"
                  : ""
              } ${matchedIds.includes(card.id) ? "is-matched" : ""}`}
              onClick={() => flipCard(index)}
              type="button"
            >
              <span className="memory-card-inner">
                <span className="memory-card-front" aria-hidden="true">
                  ?
                </span>
                <span className="memory-card-back">
                  <small>{card.type}</small>
                  {card.value}
                </span>
              </span>
            </button>
          ))}
        </div>

        {gameOver && (
          <div className="memory-result">
            {matchedPairs === cards.length / 2
              ? "Congratulations! You've matched all pairs."
              : "Time's up! Game Over."}
            <button onClick={restartGame} type="button">
              Restart Game
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Guess;
