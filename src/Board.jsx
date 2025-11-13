import { useState } from "react";
import Square from "./Square";

export default function Board({ size, onWin }) {
  const [squares, setSquares] = useState(Array(size * size).fill(null));
  const [isX, setIsX] = useState(true);

  function resetBoard() {
    setSquares(Array(size * size).fill(null));
    setIsX(true);
  }

  function checkWinner(cells) {
    const lines = [];

    // Filas
    for (let r = 0; r < size; r++) {
      const row = [];
      for (let c = 0; c < size; c++) {
        row.push(r * size + c);
      }
      lines.push(row);
    }

    // Columnas
    for (let c = 0; c < size; c++) {
      const col = [];
      for (let r = 0; r < size; r++) {
        col.push(r * size + c);
      }
      lines.push(col);
    }

    // Diagonal principal
    const diag1 = [];
    for (let i = 0; i < size; i++) {
      diag1.push(i * size + i);
    }
    lines.push(diag1);

    // Diagonal secundaria
    const diag2 = [];
    for (let i = 0; i < size; i++) {
      diag2.push(i * size + (size - 1 - i));
    }
    lines.push(diag2);

    // Verificar si una línea está llena de X o de O
    for (const line of lines) {
      const vals = line.map((index) => cells[index]);
      if (vals.every((v) => v === "X")) return "X";
      if (vals.every((v) => v === "O")) return "O";
    }

    return null;
  }

  function handleClick(i) {
    if (squares[i]) return; // ya ocupada

    const next = [...squares];
    next[i] = isX ? "X" : "O";

    const winner = checkWinner(next);
    setSquares(next);

    if (winner) {
      onWin(winner);

      // reinicio automático después de 1.2s
      setTimeout(() => {
        resetBoard();
      }, 1200);

      return; // no cambiar turno después de ganar
    }

    setIsX(!isX);
  }

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
