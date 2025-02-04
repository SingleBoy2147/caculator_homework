import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import TicTacToe from "./pages/tic-tac-toe";
import Calculator from "./pages/calculator";
import Wordle from "./pages/wordle";
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
