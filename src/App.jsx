import { useState } from "react";
import Board from "./Board";
import WinnerModal from "./WinnerModal";
import StartScreen from "./StartScreen";
import "./index.css";

export default function App() {
  const [screen, setScreen] = useState("start");
  const [mode, setMode] = useState("pvp");
  const [size, setSize] = useState(3);
  const [winner, setWinner] = useState(null);

  const [wins, setWins] = useState({
    X: 0,
    O: 0,
    draw: 0
  });

  function startGame(selectedMode) {
    setMode(selectedMode);
    setScreen("game");
  }

  function handleWin(w) {
    if (w === "X") setWins((prev) => ({ ...prev, X: prev.X + 1 }));
    else if (w === "O") setWins((prev) => ({ ...prev, O: prev.O + 1 }));
    else setWins((prev) => ({ ...prev, draw: prev.draw + 1 }));

    setWinner(w);
  }

  return (
    <div className="app">

      {screen === "start" && <StartScreen onStart={startGame} />}

      {screen === "game" && (
        <>
          <h2>Modo: {mode === "pvp" ? "Jugador vs Jugador" : mode === "ai-easy" ? "IA Fácil" : "IA Difícil"}</h2>

          <div className="score">
            <p>Victorias X: {wins.X}</p>
            <p>Victorias O: {wins.O}</p>
            <p>Empates: {wins.draw}</p>
          </div>

          <div className="selector">
            <label>Tamaño del tablero: </label>
            <select value={size} onChange={(e) => setSize(Number(e.target.value))}>
              <option value={3}>3 x 3</option>
              <option value={4}>4 x 4</option>
              <option value={5}>5 x 5</option>
            </select>
          </div>

          <Board
            key={size + mode}
            size={size}
            mode={mode}
            onWin={handleWin}
          />

          {winner && <WinnerModal winner={winner} onClose={() => setWinner(null)} />}
        </>
      )}
    </div>
  );
}
