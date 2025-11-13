import { useState } from "react";
import Board from "./Board";
import WinnerModal from "./WinnerModal";
import "./index.css";

export default function App() {
  const [size, setSize] = useState(3); 
  const [winner, setWinner] = useState(null);

  return (
    <div className="app">
      <h1>Tic-Tac-Toe React</h1>

      <div className="selector">
        <label>Tamaño del tablero: </label>
        <select value={size} onChange={(e) => setSize(Number(e.target.value))}>
          <option value={3}>3 x 3</option>
          <option value={4}>4 x 4</option>
          <option value={5}>5 x 5</option>
        </select>
      </div>

      <Board key={size} size={size} onWin={setWinner} />


      {winner && <WinnerModal winner={winner} onClose={() => setWinner(null)} />}
    </div>
  );
}
