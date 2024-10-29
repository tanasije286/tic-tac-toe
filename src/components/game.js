import {useState} from "react";
import Board from "./board";
import {Box, Button, Grid2, List, ListItem, Typography} from "@mui/material";


/**
 * Game component manages the state and logic for the entire Tic Tac Toe game.
 * It handles the game history, player turns, move navigation, and rendering of the board.
 *
 * @returns {JSX.Element} - The rendered game component, including the board, move history, and controls.
 */
function Game() {
    // State to track the history of board states for each move
    const [history, setHistory] = useState([Array(9).fill(null)]);

    // State to track the row and column of each move
    const [rowColHistory, setRowColHistory] = useState([Array(2).fill(null)]);

    // State to track the current move index
    const [currentMove, setCurrentMove] = useState(0);

    // Determine which player's turn is next (X goes on even moves, O on odd moves)
    const xIsNext = currentMove % 2 === 0;

    // Get the current board state based on the history and current move index
    const currentSquares = history[currentMove];

    // State to manage the order of history (ascending or descending)
    const [ascendingHistoryOrder, setAscendingHistoryOrder] = useState(true);

    /**
     * Handle a play on the board by updating the game state, history, and current move.
     *
     * @param {Array<string|null>} nextSquares - The updated board state after the move.
     * @param {number} row - The row index where the move was made.
     * @param {number} col - The column index where the move was made.
     */
    function handlePlay(nextSquares, row, col) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        const nextRowColHistory = [...rowColHistory.slice(0, currentMove + 1), [row,col]];
        setRowColHistory(nextRowColHistory);
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    /**
     * Jump to a specific move in the game history, updating the current move index.
     *
     * @param {number} nextMove - The index of the move to jump to.
     */
    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    /**
     * Toggle the order of the move history between ascending and descending.
     */
    function onHistoryOrder(){
        setAscendingHistoryOrder(!ascendingHistoryOrder);
    }

    // Generate the list of moves for display, including buttons to navigate to specific moves
    const moves = (ascendingHistoryOrder ? history : [...history].reverse()).map((squares, move) => {
        let description;
        const actualMove = ascendingHistoryOrder ? move : history.length - 1 - move;

        // Set the description based on the current move state and history
        if(actualMove === currentMove) {
            if (rowColHistory[actualMove][0]) {
                description = 'You are at move #' + currentMove + " at (" + rowColHistory[actualMove][0] + ", " + rowColHistory[actualMove][1] + ")";
            }
            else {
                description = 'You are at move #' + currentMove;
            }
        }
        else if (actualMove > 0) {
            description = 'Go to move #' + actualMove + " at (" + rowColHistory[actualMove][0] + ", " + rowColHistory[actualMove][1] + ")";
        }
        else {
            description = 'Go to game start';
        }
        return (
            <ListItem key={actualMove} disablePadding>
                {actualMove ===  currentMove ? (
                    <Typography variant="body1">{description}</Typography>
                ) : (
                    <Button variant="outlined" size="small" onClick={() => jumpTo(actualMove)}>{description}</Button>
                )}
            </ListItem>
        );
    });

    // Description for the history order toggle button
    const historyOrderDescription = (ascendingHistoryOrder ?
        "Switch to Descending Order" : "Switch to Ascending Order");

    // Display a tie message if all 9 moves have been played
    const tieMessage = (currentMove >= 9 ? "It's a tie!": "");


    return (
        <>
            <Grid2 container spacing={1}>
                <Grid2 container size={12} justifyContent="center">
                        {tieMessage && <Typography variant="h4" align="center" color="primary" className="status" border={2} borderRadius={2} padding={1}>{tieMessage}</Typography>}
                </Grid2>
                <Grid2 container size={12} justifyContent="center">
                    <div className="game">
                        <div className="game-board">
                            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
                        </div>
                        <div className="game-info">
                            <List >{moves}</List>
                        </div>
                    </div>
                </Grid2>
                <Grid2 container size={12} justifyContent="center">
                    <Button variant="contained" onClick={onHistoryOrder}>{historyOrderDescription}</Button>
                </Grid2>
            </Grid2>
        </>
    );
}

export default Game;