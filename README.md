# Tic Tac Toe Game

This is a simple Tic Tac Toe game built with **React** and **Material-UI**. The game includes basic gameplay features and a responsive UI with history tracking, allowing players to review previous moves.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)

## Features

- **Responsive UI** with Material-UI components
- **Move history tracking**: Players can revisit each move in the game
- **Winner highlighting**: Highlights the winning combination when a player wins
- **Tie detection**: Indicates when the game ends in a tie
- **Toggleable history order**: View moves in ascending or descending order

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/tanasije286/tic-tac-toe.git
   cd tic-tac-toe
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

   The application should open in your default browser at `http://localhost:3000`.

## Usage

- **Make a move**: Click on any empty square to make a move.
- **Check game status**: The current player and the game status (winner or tie) will be displayed.
- **Toggle move history order**: Use the "Switch to Ascending/Descending Order" button to change the order in which moves are listed.
- **View move history**: Click on any move in the history to jump back to that point in the game.

## Project Structure

```plaintext
src/
├── components/
│   ├── Square.js         # Square component for each tile in the game
│   ├── Board.js          # Main game board displaying squares
│   └── Game.js           # Game component managing state and gameplay logic
├── utils/
│   └── calculateWinningSquares.js # Function to calculate the winning combination
├── App.js                # Root component
├── index.js              # Main entry point for React
└── index.css            # Custom styles
```

## Technologies Used

- **React**: JavaScript library for building user interfaces
- **Material-UI**: Component library for styling and responsive design
- **JavaScript (ES6+)**
- **CSS**: For custom styling


