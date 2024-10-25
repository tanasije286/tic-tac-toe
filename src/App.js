import './App.css';
import {useState} from "react";

function Square({ value , onSquareClick, highlighted = false}) {
    return (
        <button className={`square ${highlighted ? "highlighted" : ""}`}  onClick={onSquareClick}>
            {value}
        </button>
    );
}

function Board({ xIsNext, squares, onPlay }) {
    function handleClick(row,col){
        const i = row * 3 + col;
        if (squares[i] || calculateWinningSquares(squares)) {
            return;
        }
        const nextSquares = squares.slice();
        (xIsNext ? nextSquares[i] = 'X' : nextSquares[i] = 'O');
        onPlay(nextSquares, row, col);
    }

    const winningSquares = calculateWinningSquares(squares);
    let status;
    if (winningSquares) {
        status = "Winner: " + (xIsNext ? "O" : "X");
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    const listBoardRow = [0,1,2]
    const listBoardCol = [0,1,2]
    const winSquares = (winningSquares? winningSquares:[-1,-1,-1])

    return (
        <>
            <div className="status">{status}</div>
            {listBoardRow.map(row => (
                <div className="board-row">
                    {listBoardCol.map(col => {
                        const index = row * 3 + col;
                        return(
                            <Square value={squares[index]} onSquareClick={() => handleClick(row,col)} highlighted={(winSquares.includes(index))}/>
                        );
                    })}
                </div>
            ))}
        </>
    );
}

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

function calculateWinningSquares(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [a,b,c];
        }
    }
    return null;
}

export default Game;
