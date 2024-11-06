import './App.css';
import { useEffect, useState,  } from 'react';
import Card from './Components/Cards/Card';

const image = ["🍎", "🍌", "🍇", "🍉", "🍒", "🍍", "🥝", "🍓"];

const generateCards = () => {
  const flipImage = [...image, ...image]
    .sort(() => Math.random() - 0.5)
    .map((symbol, index) => ({
      id: index,
      symbol,
      isFlipped: false,
      isMatched: false,
    }));
  return flipImage;
};


function App() {
  const [cards, setCards] = useState(generateCards());
  const [flipcard, setflipcard] = useState([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    let interval;
    if (!isGameOver) {
      interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isGameOver]);

  const resetGame = () => {
    setCards(generateCards());
    setflipcard([]);
    setMoves(0);
    setMatches(0);
    setTimer(0);
    setIsGameOver(false);
  };

  const handleClick = (card) => {
    if (flipcard.length === 2 || card.isFlipped || card.isMatched)
       return;

    const newflipcard = [...flipcard, card];
    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);
    setflipcard(newflipcard);
    if (newflipcard.length === 2) {
      setMoves((prev) => prev + 1);
      const [first, second] = newflipcard;
      if (first.symbol === second.symbol) {
        const updatedCards = newCards.map((c) =>
          c.symbol === first.symbol ? { ...c, isMatched: true } : c
        );
        setCards(updatedCards);
        setflipcard([]);
        setMatches((prev) => prev + 1);
        if (updatedCards.every((c) => c.isMatched)) {
          setIsGameOver(true);
        }
      } else {
        setTimeout(() => {
          const resetCards = newCards.map((c) =>
            c.isFlipped && !c.isMatched ? { ...c, isFlipped: false } : c
          );
          setCards(resetCards);
          setflipcard([]);
        }, 1000);
      }
    }
  };
  return (
    <div className="App">
    <h1>Memory Matching Game</h1>
    <div className="timer">
      <p>Moves: {moves}  </p>
      <p>Matches: {matches} </p>
      <p>Time: {timer}s</p>
    </div>
    <div className="flip-cards">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          handleClick={handleClick}
        />
      ))}
    </div>
    <button onClick={resetGame}>Restart Game</button>
    {isGameOver && <p>Congratulations! You've completed the game in {timer} seconds.</p>}
  </div>
  );
}

export default App;
