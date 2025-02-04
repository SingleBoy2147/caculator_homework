import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      className="w-20 h-20 border-2 border-indigo-300 text-4xl font-bold bg-white hover:bg-indigo-50 
      transition-all duration-200 rounded-lg shadow-md hover:shadow-lg hover:scale-105"
      onClick={onSquareClick}
    >
      <span className={`${value === "X" ? "text-indigo-600" : "text-pink-500"}`}>{value}</span>
    </button>
  );
}

function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [nextPlayer, setNextPlayer] = useState("X");

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    nextSquares[i] = nextPlayer;
    setSquares(nextSquares);
    setNextPlayer(nextPlayer === "X" ? "O" : "X");
  }

  const winner = calculateWinner(squares);
  const status = winner ? `获胜者: ${winner}` : squares.every((square) => square) ? "平局！" : `下一步: ${nextPlayer}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-pink-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-indigo-800 mb-4">井字棋游戏</h1>
      <div className="mb-4 text-2xl font-bold text-indigo-700">{status}</div>
      <div className="grid grid-cols-3 gap-3">
        {squares.map((square, i) => (
          <Square key={i} value={square} onSquareClick={() => handleClick(i)} />
        ))}
      </div>
      <button
        className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
        transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 font-bold"
        onClick={() => setSquares(Array(9).fill(null))}
      >
        重新开始
      </button>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default TicTacToe;
