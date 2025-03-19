import React, { useEffect, useState } from "react";
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
  const [result, setResult] = useState("0");
  const [input, setInput] = useState("");
  // 算式（栈）
  const [opdStack, setOpdStack] = useState([]);
  const [oprStack, setOprStack] = useState([]);
  // 上一次计算的结果（第一行）
  const [equation, setEquation] = useState("");

  // 当前的运算符
  // const [operator, setOperator] = useState(null);

  // 处理数字按钮点击事件：将点击的数字添加到输入框
  const handleNumberClick = (number) => {
    if(equation != "" && equation.at(-1) === "=")
    {
      clear();
    }
    if(input === "0") setInput(number.toString());
    else setInput(input + number.toString());
  };
  // useEffect(()=>{setResult(input)}, [input]);

  const addOpr = (opr, tempOprStack, tempOpdStack) => {
    if(opr === "(")
    {
      tempOprStack.push(opr);
      return;
    }
    else if(opr === ")")
    {
      while(tempOprStack.length > 0 && tempOprStack.at(-1) != "(")
      {
        let opd1 = tempOpdStack.at(-2);
        let opd2 = tempOpdStack.at(-1);
        let oprr = tempOprStack.at(-1);
        tempOpdStack.pop(); tempOpdStack.pop();
        tempOprStack.pop();
        let res = calc(opd1, opd2, oprr);

        if (!isFinite(res)) {
          clear();
          return;
        }
        tempOpdStack.push(res);
      }
      if(tempOprStack.length === 0)
        throw new Error("Invalid operator");
      tempOprStack.pop();
    }
    else if(opr === "×" || opr === "÷")
    {
      while(tempOprStack.at(-1) === "×" || tempOprStack.at(-1) === "÷")
      {
        let opd1 = tempOpdStack.at(-2);
        let opd2 = tempOpdStack.at(-1);
        let oprr = tempOprStack.at(-1);
        tempOpdStack.pop(); tempOpdStack.pop();
        tempOprStack.pop();
        let res = calc(opd1, opd2, oprr);

        if (!isFinite(res)) {
          clear();
          return;
        }
        tempOpdStack.push(res);
      }
      tempOprStack.push(opr);
    }
    else if(opr === "+" || opr === "-")
    {
      while(tempOprStack.at(-1) === "+" || tempOprStack.at(-1) === "-"
        ||tempOprStack.at(-1) === "×" || tempOprStack.at(-1) === "÷")
        {
          let opd1 = tempOpdStack.at(-2);
          let opd2 = tempOpdStack.at(-1);
          let oprr = tempOprStack.at(-1);
          tempOpdStack.pop(); tempOpdStack.pop();
          tempOprStack.pop();
          let res = calc(opd1, opd2, oprr);
  
          if (!isFinite(res)) {
            clear();
            return;
          }
          tempOpdStack.push(res);
        }
        tempOprStack.push(opr);
    }
  } 

  // useEffect(()=>{
  //   if(opdStack.length === 1)
  //     setResult((opdStack[0]).toString());
  // },[opdStack]);
  // 处理左括号输入
  // const handleLeftBracket = () => {
  //   let tempOprStack = oprStack;
  //   let tempOpdStack = opdStack;
  //   let tempInput = input;
  //   let tempEquation = equation;
  // }
  // 处理运算符按钮点击事件
  const handleOperatorClick = (newOperator) => {

    let tempOprStack = oprStack;
    let tempOpdStack = opdStack;
    let tempInput = input;
    let tempEquation = equation;
    if(tempEquation != "" && tempEquation.at(-1) === "=")
    {
      tempInput = result;
      tempEquation = "";
      // setInput(result);
    }

    if(tempEquation === "" && tempInput === "")
    {
      if(newOperator != "(") return;
      addOpr("(", tempOprStack, tempOpdStack);
      // setEquation(pre=>[...pre, newOperator]);
      tempEquation = newOperator;
    }
    else if(tempInput === "")
    {
      if(newOperator === "(")
      {
        addOpr("(", tempOprStack, tempOpdStack);
        // setEquation(pre=>[...pre, newOperator]);
        tempEquation.push(newOperator);
      }
      else if(newOperator === ")")
      {
        clear();
      }
      else if((newOperator === "×" || newOperator === "÷")
        && (tempOprStack.at(-1) === "+" || tempOprStack.at(-1) === "-"))
      {
        // setEquation(pre=>["(",pre.slice(0,-1),")"]);
        tempEquation = ["(", ...tempEquation.slice(0,-1), ")", newOperator];
        // setOprStack(pre=>[pre.slice(0,-1), newOperator]);
        tempOprStack = tempOprStack.slice(0,-1);
        addOpr(newOperator, tempOprStack, tempOpdStack);
      }
      else
      {
        // setEquation(pre=>[pre.slice(0,-1), newOperator]);
        tempEquation = [...tempEquation.slice(0,-1), newOperator];
        // setOprStack(pre=>[pre.slice(0,-1), newOperator]);
        tempOprStack = tempOprStack.slice(0,-1);
        addOpr(newOperator, tempOprStack, tempOpdStack);
      }
    }
    else
    {
      // setOpdStack(pre=>[...pre, parseFloat(input)]);
      tempOpdStack.push(parseFloat(tempInput));
      if(newOperator === "(")
      {
        if(tempOpdStack.at(-1) === 0)
        {
          tempOpdStack.pop();
          addOpr(newOperator, tempOprStack, tempOpdStack);
          tempEquation = [...tempEquation, newOperator];
        }
        else
        {
          addOpr("×", tempOprStack, tempOpdStack);
          addOpr(newOperator, tempOprStack, tempOpdStack);
          if(tempEquation.at(-1) === ")")
            tempEquation = [...tempEquation, "×", newOperator];
          else
            tempEquation = [...tempEquation, tempInput, "×", newOperator];
        }
        // setEquation(pre=>[...pre, tempInput, "×", newOperator]);
      }
      else
      {
        addOpr(newOperator, tempOprStack, tempOpdStack);
        // setEquation(pre=>[...pre, tempInput, newOperator]);
        if(tempEquation.at(-1) === ")")
          tempEquation = [...tempEquation, newOperator];
        else
          tempEquation = [...tempEquation, tempInput, newOperator];
      }
    }
    if(newOperator === "(") setInput("0");
    else if(newOperator === ")") 
    {
      setInput(tempOpdStack.at(-1));
      tempOpdStack.pop();
    }
    else setInput("");
    if(tempOpdStack.length > 0)
      setResult(tempOpdStack.at(-1).toString());
    setOprStack(tempOprStack);
    setOpdStack(tempOpdStack);
    setEquation(tempEquation);
  };

  // 处理等号按钮点击事件：计算最终结果
  const handleEqualClick = () => {
    // if(input === "") return;
    let tempOprStack = oprStack;
    let tempOpdStack = opdStack;
    if(input != "") 
      tempOpdStack.push(parseFloat(input));

    while(tempOprStack.length > 0)
    {
      if(tempOprStack.at(-1) === "(")
      {
        tempOprStack.pop();
        continue;
      }
      let opd1 = tempOpdStack.at(-2);
      let opd2 = tempOpdStack.at(-1);
      let oprr = tempOprStack.at(-1);

      tempOpdStack.pop(); tempOpdStack.pop();
      tempOprStack.pop();
      let res = calc(opd1, opd2, oprr);

      if (!isFinite(res)) {
        clear();
        return;
      }
      tempOpdStack.push(res);
    }
    if(tempOpdStack.length != 1)
    {
      clear();
      return;
    }
    // setResult(tempOpdStack[0]);
    setResult(tempOpdStack[0].toString());
    setOprStack([]);
    setOpdStack([]);
    setInput("");
    if(equation.at(-1) === ")")
      setEquation(pre=>[...pre,"="]);
    else
      setEquation(pre=>[...pre, input,"="]);
  };

  // 清空计算器所有状态
  const clear = () => {
    setInput("");
    setResult("");
    setOprStack([]);
    setOpdStack([]);
    setEquation("");
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
    if(input.length > 1) setInput(input.slice(0, -1));
    else if(input.length === 1) setInput("0");
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
      { label: "%", onClick: handlePercentClick, style: BUTTON_STYLES.function },
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
        <InputBox equation = {equation} result = {result} input = {input}/>
        <KeyBoard buttons = {BUTTONS}/>
      </div>
    </div>
  );
}

export default Calculator;
