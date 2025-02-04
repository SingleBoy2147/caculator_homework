import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home";
import TicTacToe from "./games/tic-tac-toe";
import Calculator from "./games/calculator";
import Wordle from "./games/wordle";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tic-tac-toe" element={<TicTacToe />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/wordle" element={<Wordle />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
