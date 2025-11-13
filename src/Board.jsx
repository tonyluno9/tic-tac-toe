import { useState } from "react";
import Square from "./Square";

export default function Board({ size, onWin }) {
  const total = size * size;
  const [squares, setSquares] = useState(Array(total).fill(null));
  const [isX, setIsX] = useState(true);

  function checkWinner(cells) {
    const lines = [];

    // Filas
    for (let r = 0; r < size; r++) {
      lines.push([...Array(size)].map((_, i) => r * size + i));
    }

    // Columnas
    for (let c = 0; c < size; c++) {
      lines.push([...Array(size)].map((_, i) => i * size + c));
    }

    // Diagonal principal
    lines.push([...Array(size)].map((_, i) => i * size + i));

    // Diagonal inversa
    lines.push([...Array(size)].map((_, i) => i * size + (size - 1 - i)));

    for (let line of lines) {
      const values = line.map((i) => cells[i]);
      if (values.every((v) => v === "X")) return "X";
      if (values.every((v) => v === "O")) return "O";
    }

    return null;
  }

  function handleClick(i) {
    if (squares[i] || checkWinner(squares)) return;

    const nextSquares = squares.slice();
    nextSquares[i] = isX ? "X" : "O";

    const w = checkWinner(nextSquares);
    if (w) onWin(w);

    setSquares(nextSquares);
    setIsX(!isX);
  }

  return (
    <div
      className="board"
      style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
    >
      {squares.map((value, index) => (
        <Square key={index} value={value} onClick={() => handleClick(index)} />
      ))}
    </div>
  );
}
