/**
 * Determines the winning squares (if any) in a Tic Tac Toe game.
 *
 * @param {Array<string|null>} squares - An array of 9 elements representing the current state of the game board.
 * Each element can be 'X', 'O', or null, corresponding to a square on the board.
 *
 * @returns {Array<number>|null} - An array of 3 indices that form a winning line if there's a winner, or `null` if there is no winner.
 */
function calculateWinningSquares(squares) {
    // Define all possible winning combinations on a 3x3 Tic Tac Toe board
    const lines = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Top-left to bottom-right diagonal
        [2, 4, 6]  // Top-right to bottom-left diagonal
    ];

    // Check each line to see if it forms a winning combination
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [a,b,c]; // Return the indices of the winning squares
        }
    }

    // Return null if no winning combination is found
    return null;
}

export default calculateWinningSquares;