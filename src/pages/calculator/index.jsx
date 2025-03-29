import React from "react";
import Display from "./components/Display";
import Keyboard from "./components/Keyboard";
import { CalculatorProvider } from "./context/CalculatorContext";

function Calculator() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-emerald-800 mb-4">计算器</h1>
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <CalculatorProvider>
          <Display/>
          <Keyboard/>
        </CalculatorProvider>
      </div>
    </div>
  );
}

export default Calculator;
