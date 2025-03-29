import React, { createContext, useEffect, useState } from "react";
import InputBox from "./inputBox";
import KeyBoard from "./keyboard"
export const StateContext = createContext();
function Calculator() {
  const [result, setResult] = useState("0");
  const [input, setInput] = useState("");
  const [opdStack, setOpdStack] = useState([]);
  const [oprStack, setOprStack] = useState([]);
  const [equation, setEquation] = useState([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-emerald-800 mb-4">计算器</h1>
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <StateContext.Provider value = {{result, setResult, input, setInput, 
          opdStack, setOpdStack, oprStack, setOprStack, equation, setEquation}}>
          <InputBox/>
          <KeyBoard/>
        </StateContext.Provider>
      </div>
    </div>
  );
}

export default Calculator;
