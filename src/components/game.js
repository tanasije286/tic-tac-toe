import {useState} from "react";
import Board from "./board";

function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [rowColHistory, setRowColHistory] = useState([Array(2).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];
    const [ascendingHistoryOrder, setAscendingHistoryOrder] = useState(true);

    function handlePlay(nextSquares, row, col) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        const nextRowColHistory = [...rowColHistory.slice(0, currentMove + 1), [row,col]];
        setRowColHistory(nextRowColHistory);
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    function onHistoryOrder(){
        setAscendingHistoryOrder(!ascendingHistoryOrder);
    }



    const moves = (ascendingHistoryOrder ? history : [...history].reverse()).map((squares, move) => {
        let description;
        const actualMove = ascendingHistoryOrder ? move : history.length - 1 - move;
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
            <li key={actualMove}>
                {actualMove ===  currentMove ? (
                    <span>{description}</span>
                ) : (
                    <button onClick={() => jumpTo(actualMove)}>{description}</button>
                )}
            </li>
        );
    });

    const historyOrderDescription = (ascendingHistoryOrder ?
        "Switch to Descending Order" : "Switch to Ascending Order");
    const tieMessage = (currentMove >= 9 ? "It's a tie!" : "")

    return (
        <>
            <div className="game">
                <div className="game-board">
                    <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
                </div>
                <div className="game-info">
                    <ol>{moves}</ol>
                </div>
            </div>
            <div className="game-history-order">
                <button onClick={onHistoryOrder}>{historyOrderDescription}</button>
            </div>
            <div className="status">{tieMessage}</div>
        </>
    );
}

export default Game;