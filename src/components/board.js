import Square from "./square";
import calculateWinningSquares from "../utils/calculateWinningSquares";

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

export default Board;