function Square({ value , onSquareClick, highlighted = false}) {
    return (
        <button className={`square ${highlighted ? "highlighted" : ""}`}  onClick={onSquareClick}>
            {value}
        </button>
    );
}

export default Square;