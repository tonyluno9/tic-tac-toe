export default function WinnerModal({ winner, onClose }) {
  return (
    <div className="modal">
      <div className="winner-box">
        <h2>¡Ganó: {winner}!</h2>

        {/* 🎉 Easter Egg */}
        <p className="egg">
          Ángel Antonio Pérez Reyes <br />
          Matrícula: 66823
        </p>

        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}
