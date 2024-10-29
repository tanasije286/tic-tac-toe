import {Button} from "@mui/material";

/**
 * Square component represents a single cell in the Tic Tac Toe board.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.value - The value to be displayed in the square (e.g., 'X', 'O', or null).
 * @param {function} props.onSquareClick - Callback function to handle click events.
 * @param {boolean} [props.highlighted=false] - Optional flag to highlight the square (e.g., when it is part of the winning line).
 *
 * @returns {JSX.Element} - The rendered button element representing the square.
 */
function Square({ value , onSquareClick, highlighted = false}) {
    return (
        <Button variant="outlined"  size="large" className={`square ${highlighted ? "highlighted" : ""}`}  onClick={onSquareClick}>
            {value}
        </Button>
    );
}

export default Square;