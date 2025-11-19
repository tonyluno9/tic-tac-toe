import { useState, useEffect } from "react";
import Square from "./Square";

export default function Board({ size, mode, onWin }) {
  const total = size * size;
  const [squares, setSquares] = useState(Array(total).fill(null));
  const [isX, setIsX] = useState(true);

  // Easter Egg
  const [clickCount, setClickCount] = useState(0);
  const [lastClicked, setLastClicked] = useState(null);

  function resetBoard() {
    setSquares(Array(size * size).fill(null));
    setIsX(true);
  }

  // Easter egg → 3 clics en la misma casilla
  function handleEasterEgg(i) {
    if (i === lastClicked) {
      setClickCount((c) => c + 1);
      if (clickCount + 1 === 3) {
        alert("Ángel Antonio Pérez Reyes\nMatrícula: 66823");
        setClickCount(0);
      }
    } else {
      setLastClicked(i);
      setClickCount(1);
    }
  }

  function checkWinner(cells) {
    const lines = [];

    // Rows
    for (let r = 0; r < size; r++) {
      lines.push([...Array(size)].map((_, c) => r * size + c));
    }

    // Columns
    for (let c = 0; c < size; c++) {
      lines.push([...Array(size)].map((_, r) => r * size + c));
    }

    // Diagonal 1
    lines.push([...Array(size)].map((_, i) => i * size + i));

    // Diagonal 2
    lines.push([...Array(size)].map((_, i) => i * size + (size - 1 - i)));

    for (const line of lines) {
      const vals = line.map((i) => cells[i]);
      if (vals.every((v) => v === "X")) return "X";
      if (vals.every((v) => v === "O")) return "O";
    }

    return null;
  }

  // IA fácil (random)
  function aiMoveEasy(cells) {
    const available = cells
      .map((v, i) => (v === null ? i : null))
      .filter((v) => v !== null);

    return available[Math.floor(Math.random() * available.length)] ?? null;
  }

  // IA difícil (ataque + bloqueo simple)
  function aiMoveHard(cells) {
    const available = cells
      .map((v, i) => (v === null ? i : null))
      .filter((v) => v !== null);

    // Ganar
    for (const i of available) {
      const temp = [...cells];
      temp[i] = "O";
      if (checkWinner(temp) === "O") return i;
    }

    // Bloquear
    for (const i of available) {
      const temp = [...cells];
      temp[i] = "X";
      if (checkWinner(temp) === "X") return i;
    }

    return aiMoveEasy(cells);
  }

  function handleClick(i) {
    handleEasterEgg(i);

    if (squares[i]) return;

    const next = [...squares];
    next[i] = isX ? "X" : "O";

    const winner = checkWinner(next);

    setSquares(next);

    // Si hay ganador
    if (winner) {
      onWin(winner);
      setTimeout(() => resetBoard(), 1200);
      return;
    }

    setIsX(!isX);
  }

  // Turno de la IA
  useEffect(() => {
    if (!isX && (mode === "ai-easy" || mode === "ai-hard")) {
      const move =
        mode === "ai-easy"
          ? aiMoveEasy(squares)
          : aiMoveHard(squares);

      if (move !== null) {
        setTimeout(() => handleClick(move), 400);
      }
    }
  }, [isX]);

  return (
    <>
      <button className="reset-btn" onClick={resetBoard}>
        Reiniciar Juego
      </button>

      <div
        className="board"
        style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
      >
        {squares.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </>
  );
}
