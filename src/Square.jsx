export default function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value && (
        <img
          src={value === "X" ? "/error.png" : "/check.png"}
          alt={value}
          className="piece"
        />
      )}
    </button>
  );
}
