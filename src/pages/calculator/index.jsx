import React, { useState } from "react";
import InputBox from "./inputBox";
import KeyBoard from "./keyboard";
const BUTTON_STYLES = {
  number: "bg-gray-200 hover:bg-gray-300",
  operator: "bg-blue-500 text-white hover:bg-blue-600",
  function: "bg-gray-300 hover:bg-gray-400",
  clear: "bg-red-500 text-white hover:bg-red-600",
  equals: "bg-green-500 text-white hover:bg-green-600",
};

// 计算函数：接收两个操作数和运算符，返回计算结果
const calc = (a, b, operator) => {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      return a / b;
    default:
      throw new Error("Invalid operator");
  }
};

function Calculator() {
  // 键盘输入的内容（第二行）
  const [input, setInput] = useState("");

  // 上一次计算的结果（第一行）
  const [result, setResult] = useState(null);

  // 当前的运算符
  const [operator, setOperator] = useState(null);

  // 处理数字按钮点击事件：将点击的数字添加到输入框
  const handleNumberClick = (number) => {
    setInput(input + number.toString());
  };

  // 处理运算符按钮点击事件
  const handleOperatorClick = (newOperator) => {
    // 未输入任何数字时无视运算符输入
    if (!result && !input) return;

    // 未输入任何数字时可以切换加减乘除
    if (result && input === "") {
      setOperator(newOperator);
      return;
    }

    // 输入框有数字，但没有以往结果时，将输入的数字作为第一个操作数
    if (input && !result) {
      setResult(parseFloat(input));
      setOperator(newOperator);
      setInput("");
      return;
    }

    // operator 是上次的运算符，newOperator 是新输入的运算符
    // 使用上次的运算符计符出结果后将运算符更新为新的
    const currentNumber = parseFloat(input);
    let newResult = calc(result, currentNumber, operator);

    // 计算错误时清空计算机（除零）
    if (!isFinite(newResult)) {
      clear();
      return;
    }

    // 保留计算结果
    setResult(newResult);

    // 清除输入框
    setInput("");

    // 更新运算符供下次计算使用
    setOperator(newOperator);
  };

  // 处理等号按钮点击事件：计算最终结果
  const handleEqualClick = () => {
    // 输入为空时使用上次的结果作为第二个操作数
    const currentNumber = input === "" ? result : parseFloat(input);
    let newResult = calc(result, currentNumber, operator);

    // 计算错误时清空计算机（除零）
    if (!isFinite(newResult)) {
      clear();
      return;
    }

    // 显示计算结果（第二行）
    setInput(newResult.toString());

    // 清除上次的计算结果和运算符（第一行）
    setResult(null);
    setOperator(null);
  };

  // 清空计算器所有状态
  const clear = () => {
    setInput("");
    setResult(null);
    setOperator(null);
  };

  // 处理正负号切换：将当前输入数字变为相反数
  const handlePlusMinusClick = () => {
    if (input === "") return;
    setInput((parseFloat(input) * -1).toString());
  };

  // 处理百分比按钮：将当前输入数字除以100
  const handlePercentClick = () => {
    if (input === "") return;
    setInput(Number((parseFloat(input) / 100).toFixed(12)).toString());
  };

  // 处理小数点按钮：确保小数点只能输入一次，空输入时自动补0
  const handleDotClick = () => {
    // 如果输入为空，自动补0
    if (input === "") {
      setInput("0.");
      return;
    }

    if (!input.includes(".")) {
      setInput(input + ".");
    }
  };

  // 处理退格按钮：删除输入框最后一个字符
  const handleBackspaceClick = () => {
    input.length > 0 && setInput(input.slice(0, -1));
  };

  // 按钮配置数组：定义计算器键盘布局和每个按钮的属性
  const BUTTONS = [
    [
      { label: "π", onClick: () => handleNumberClick(Math.PI), style: BUTTON_STYLES.number },
      { label: "e", onClick: () => handleNumberClick(Math.E), style: BUTTON_STYLES.number },
      { label: "←", onClick: handleBackspaceClick, style: BUTTON_STYLES.function },
      { label: "C", onClick: clear, style: BUTTON_STYLES.clear },
    ],
    [
      { label: "(", onClick: () => handleOperatorClick("("), style: BUTTON_STYLES.function },
      { label: ")", onClick: () => handleOperatorClick(")"), style: BUTTON_STYLES.function },
      { label: "%", onClick: () => handlePercentClick, style: BUTTON_STYLES.function },
      { label: "÷", onClick: () => handleOperatorClick("÷"), style: BUTTON_STYLES.operator },
    ],
    [
      { label: "7", onClick: () => handleNumberClick(7), style: BUTTON_STYLES.number },
      { label: "8", onClick: () => handleNumberClick(8), style: BUTTON_STYLES.number },
      { label: "9", onClick: () => handleNumberClick(9), style: BUTTON_STYLES.number },
      { label: "×", onClick: () => handleOperatorClick("×"), style: BUTTON_STYLES.operator },
    ],
    [
      { label: "4", onClick: () => handleNumberClick(4), style: BUTTON_STYLES.number },
      { label: "5", onClick: () => handleNumberClick(5), style: BUTTON_STYLES.number },
      { label: "6", onClick: () => handleNumberClick(6), style: BUTTON_STYLES.number },
      { label: "-", onClick: () => handleOperatorClick("-"), style: BUTTON_STYLES.operator },
    ],
    [
      { label: "1", onClick: () => handleNumberClick(1), style: BUTTON_STYLES.number },
      { label: "2", onClick: () => handleNumberClick(2), style: BUTTON_STYLES.number },
      { label: "3", onClick: () => handleNumberClick(3), style: BUTTON_STYLES.number },
      { label: "+", onClick: () => handleOperatorClick("+"), style: BUTTON_STYLES.operator },
    ],
    [
      { label: "+/-", onClick: handlePlusMinusClick, style: BUTTON_STYLES.function },
      { label: "0", onClick: () => handleNumberClick(0), style: BUTTON_STYLES.number },
      { label: ".", onClick: handleDotClick, style: BUTTON_STYLES.number },
      { label: "=", onClick: handleEqualClick, style: BUTTON_STYLES.equals },
    ],
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-emerald-800 mb-4">计算器</h1>
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <InputBox result = {result} operator = {operator} input = {input}/>
        <KeyBoard buttons = {BUTTONS}/>
      </div>
    </div>
  );
}

export default Calculator;
