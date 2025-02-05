function Keyboard({ currentGuess, guesses, solution, gameOver }) {
  const keyboard = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "←"],
  ];

  // 处理屏幕键盘点击事件
  const onKeyPress = (key) => {
    if (key === "Enter") {
      // 处理回车键
      if (currentGuess.length !== 5) {
        return;
      }
      const event = new KeyboardEvent("keydown", { key: "Enter" });
      window.dispatchEvent(event);
    } else if (key === "←") {
      // 处理退格键
      const event = new KeyboardEvent("keydown", { key: "Backspace" });
      window.dispatchEvent(event);
    } else if (currentGuess.length < 5) {
      // 处理字母键
      const event = new KeyboardEvent("keydown", { key });
      window.dispatchEvent(event);
    }
  };

  const getLetterStatus = (letter) => {
    let status = "";
    for (let guess of guesses) {
      if (!guess) continue;
      for (let i = 0; i < guess.length; i++) {
        if (guess[i] === letter) {
          if (solution[i] === letter) {
            return "bg-emerald-500 text-white";
          } else if (solution.includes(letter)) {
            status = "bg-amber-400 text-white";
          } else {
            status = "bg-zinc-500/90 text-white";
          }
        }
      }
    }
    return status || "bg-gray-200";
  };

  return (
    <div className="mt-8 w-full max-w-2xl px-4">
      {keyboard.map((row, i) => (
        <div key={i} className="flex justify-center gap-2 my-2">
          {row.map((key) => {
            const width = key === "Enter" || key === "←" ? "w-16" : "w-10";
            const className = key.length === 1 ? getLetterStatus(key) : "bg-gray-200";

            return (
              <button
                key={key}
                onClick={() => !gameOver && onKeyPress(key)}
                className={`${width} h-14 ${className} text-sm font-bold rounded 
                    flex items-center justify-center transition-colors duration-150
                    hover:opacity-90 active:scale-95 cursor-pointer hover:shadow`}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
