export default function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value && (
        <img
          src={value === "X" ? "error.png" : "o.png"}
          alt={value}
          className="piece"
        />
      )}
    </button>
  );
}
