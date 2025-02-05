import { useState, useEffect } from "react";
import { WORDS } from "./words";
import Keyboard from "./keyboard";

function Wordle() {
  // 游戏状态管理
  const [solution, setSolution] = useState(""); // 存储答案
  const [guesses, setGuesses] = useState(Array(6).fill("")); // 存储所有猜测，最多6次
  const [currentGuess, setCurrentGuess] = useState(""); // 当前输入的猜测
  const [currentRow, setCurrentRow] = useState(0); // 当前猜测行数
  const [gameOver, setGameOver] = useState(false); // 游戏是否结束
  const [message, setMessage] = useState(""); // 提示信息

  // 初始化游戏，随机选择一个单词作为答案
  useEffect(() => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setSolution(randomWord.toUpperCase());
  }, []);

  // 处理键盘输入事件
  useEffect(() => {
    const handleKeydown = (e) => {
      if (gameOver) return;

      if (e.key === "Enter") {
        // 提交猜测
        if (currentGuess.length !== 5) {
          setMessage("请输入5个字母");
          return;
        }

        // 更新猜测历史
        const newGuesses = [...guesses];
        newGuesses[currentRow] = currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess("");

        // 检查游戏结果
        if (currentGuess === solution) {
          setMessage("恭喜你赢了！");
          setGameOver(true);
        } else if (currentRow === 5) {
          setMessage(`游戏结束！正确答案是 ${solution}`);
          setGameOver(true);
        } else {
          setCurrentRow(currentRow + 1);
        }
      } else if (e.key === "Backspace") {
        // 删除字母
        setCurrentGuess(currentGuess.slice(0, -1));
        setMessage("");
      } else if (/^[A-Za-z]$/.test(e.key) && currentGuess.length < 5) {
        // 输入字母
        setCurrentGuess(currentGuess + e.key.toUpperCase());
        setMessage("");
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [currentGuess, currentRow, gameOver, solution, guesses]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-teal-50">
      <h1 className="text-3xl font-bold text-slate-800 mb-4">猜词游戏</h1>

      <div className="mb-4">{message && <div className="text-rose-600 font-bold text-lg">{message}</div>}</div>

      <div className="grid gap-2">
        {guesses.map((guess, i) => (
          <div key={i} className="flex gap-2">
            {Array(5)
              .fill(0)
              .map((_, j) => {
                const letter = guess[j] || "";
                let bgColor = "bg-white";

                if (guess) {
                  if (letter === solution[j]) {
                    bgColor = "bg-emerald-500"; // 正确位置的字母
                  } else if (solution.includes(letter)) {
                    bgColor = "bg-amber-400"; // 存在但位置错误的字母
                  } else {
                    bgColor = "bg-zinc-500/90"; // 不存在的字母
                  }
                }

                return (
                  <div
                    key={j}
                    className={`w-14 h-14 ${bgColor} flex items-center justify-center text-2xl font-bold 
                    border-2 border-slate-300 rounded-md shadow-sm ${
                      !guess ? "hover:border-slate-400" : "text-white"
                    } transition-colors duration-200`}
                  >
                    {i === currentRow && !letter ? currentGuess[j] : letter}
                  </div>
                );
              })}
          </div>
        ))}
      </div>

      <Keyboard currentGuess={currentGuess} guesses={guesses} solution={solution} gameOver={gameOver} />

      {gameOver && (
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
          transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 font-bold"
        >
          重新开始
        </button>
      )}
    </div>
  );
}

export default Wordle;
