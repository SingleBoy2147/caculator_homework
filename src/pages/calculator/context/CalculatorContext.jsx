import { createContext, useState } from "react";

// 创建计算器上下文，内部使用，不需要命名导出
const CalculatorContext = createContext();

// 创建上下文提供者组件
export const CalculatorProvider = ({ children }) => {
  const [result, setResult] = useState("0");
  const [input, setInput] = useState("0");
  const [opdStack, setOpdStack] = useState([]);
  const [oprStack, setOprStack] = useState([]);
  const [equation, setEquation] = useState([]);

  const calculatorState = {
    result,
    setResult,
    input,
    setInput,
    opdStack,
    setOpdStack,
    oprStack,
    setOprStack,
    equation,
    setEquation
  };

  return (
    <CalculatorContext.Provider value={calculatorState}>
      {children}
    </CalculatorContext.Provider>
  );
};

// 默认导出Context对象，供useContext使用
export default CalculatorContext; 