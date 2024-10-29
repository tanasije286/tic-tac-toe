import Square from "./square";
import calculateWinningSquares from "../utils/calculateWinningSquares";
import {Box} from "@mui/material";

/**
 * Board component represents the Tic Tac Toe game board.
 *
 * @param {Object} props - Component properties.
 * @param {boolean} props.xIsNext - Indicates whether the next move is 'X' or 'O'.
 * @param {Array<string|null>} props.squares - Array representing the state of each square on the board.
 * @param {function} props.onPlay - Callback function to handle board state updates when a square is clicked.
 *
 * @returns {JSX.Element} - The rendered board with interactive squares and game status.
 */
function Board({ xIsNext, squares, onPlay }) {
    /**
     * Handles the click event on a square, updating the board state if the square is not already filled
     * and there is no winner yet.
     *
     * @param {number} row - The row index of the clicked square.
     * @param {number} col - The column index of the clicked square.
     */
    function handleClick(row,col){
        const i = row * 3 + col;
        if (squares[i] || calculateWinningSquares(squares)) {
            return; // Do nothing if the square is already filled or there is a winner
        }
        const nextSquares = squares.slice();
        (xIsNext ? nextSquares[i] = 'X' : nextSquares[i] = 'O');
        onPlay(nextSquares, row, col); // Update the game state and switch turns
    }

    // Determine the winning squares, if any
    const winningSquares = calculateWinningSquares(squares);

    // Set the status message based on the game state
    let status;
    if (winningSquares) {
        status = "Winner: " + (xIsNext ? "O" : "X");
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    // Define arrays to iterate over rows and columns for rendering
    const listBoardRow = [0,1,2]
    const listBoardCol = [0,1,2]

    // If there are winning squares, highlight them; otherwise, set an empty array
    const winSquares = (winningSquares? winningSquares:[-1,-1,-1])

    return (
        <>
            <Box className="status">{status}</Box>
            {listBoardRow.map(row => (
                <Box className="board-row">
                    {listBoardCol.map(col => {
                        const index = row * 3 + col;
                        return(
                            <Square value={squares[index]} onSquareClick={() => handleClick(row,col)} highlighted={(winSquares.includes(index))}/>
                        );
                    })}
                </Box>
            ))}
        </>
    );
}

export default Board;