import { useContext } from 'react';
import CalculatorContext from '../context/CalculatorContext';
import { OPR_PRIOR, addOpr, addOpd, calc } from './calculatorUtils';

/**
 * 自定义Hook，用于处理计算器逻辑
 * 包含所有计算器按钮的处理函数
 */
export const useCalculator = () => {
  const {
    result, setResult,
    input, setInput,
    opdStack, setOpdStack,
    oprStack, setOprStack,
    equation, setEquation
  } = useContext(CalculatorContext);

  // 清除功能
  const clear = () => {
    setInput("");
    setResult("0");
    setOpdStack([]);
    setOprStack([]);
    setEquation([]);
  };

  // 处理数字按钮点击事件
  const handleNumberClick = (number) => {
    if (equation != [] && equation.at(-1) === "=") {
      clear();
    }
    if (input === "0") setInput(number.toString());
    else setInput(input + number.toString());
  };

  // 处理运算符按钮点击事件
  const handleOperatorClick = (newOperator) => {
    let tempOprStack = oprStack;
    let tempOpdStack = opdStack;
    let tempInput = input;
    let tempEquation = equation;
    
    if(equation != [] && equation.at(-1) === "=") {
      tempEquation = [];
    }
    
    if(OPR_PRIOR[newOperator] === 3 && tempInput === "") {
      addOpr(newOperator, tempOprStack, tempOpdStack, tempEquation);
    }
    else if(OPR_PRIOR[newOperator] === 3) {
      tempInput = addOpd(tempInput, tempOpdStack, tempEquation);
      addOpr("×", tempOprStack, tempOpdStack, tempEquation);
      addOpr("(", tempOprStack, tempOpdStack, tempEquation);
    }
    else if(tempInput === "") {
      if(tempEquation.at(-1) != ")") {
        tempEquation.pop();

        if(OPR_PRIOR[newOperator] > OPR_PRIOR[tempOprStack.at(-1)]) {
          let t = tempOpdStack.length;
          let index = 0, cnt = 0;
          while(cnt < t) {
            if(typeof tempEquation[index] === 'number') cnt++;
            if(cnt === t) break;
            else index++;
          }
          if(index < tempEquation.length - 1) {
            tempEquation = [...tempEquation.slice(0,index), '(', ...tempEquation.slice(index), ')'];
          }
        }

        tempOprStack.pop();
      }
      addOpr(newOperator, tempOprStack, tempOpdStack, tempEquation);
    }
    else {
      tempInput = addOpd(tempInput, tempOpdStack, tempEquation);
      addOpr(newOperator, tempOprStack, tempOpdStack, tempEquation);
    }
    
    if (tempOpdStack.length > 0)
      setResult(tempOpdStack.at(-1).toString());

    setOprStack(tempOprStack);
    setOpdStack(tempOpdStack);
    setEquation([...tempEquation]);
    setInput(tempInput);
  };

  // 处理等号按钮点击事件
  const handleEqualClick = () => {
    let tempOprStack = oprStack;
    let tempOpdStack = opdStack;
    let tempInput = input;
    let tempEquation = equation;
    
    if (input != "")
      tempInput = addOpd(tempInput, tempOpdStack, tempEquation);
    
    while (tempOprStack.length > 0) {
      if (tempOprStack.at(-1) === "(") {
        tempOprStack.pop();
        continue;
      }
      let opd1 = tempOpdStack.at(-2);
      let opd2 = tempOpdStack.at(-1);
      let oprr = tempOprStack.at(-1);
      tempOpdStack.pop();
      tempOpdStack.pop();
      tempOprStack.pop();
      let res = calc(opd1, opd2, oprr);
      if (!isFinite(res)) {
        clear();
        return;
      }
      tempOpdStack.push(res);
    }
    
    if (tempOpdStack.length === 0) {
      clear();
      return;
    }
    
    let finalResult = tempOpdStack.at(-1).toString();
    setResult(finalResult);
    tempInput = "";

    tempEquation.push("=");

    setOprStack([]);
    setOpdStack([tempOpdStack.at(-1)]);
    setEquation([...tempEquation]);
    setInput(tempInput);
  };

  // 处理正负号切换
  const handlePlusMinusClick = () => {
    if (input === "") return;
    setInput((parseFloat(input) * -1).toString());
  };

  // 处理百分比按钮
  const handlePercentClick = () => {
    if (input === "") return;
    setInput(Number((parseFloat(input) / 100).toFixed(12)).toString());
  };

  // 处理小数点按钮
  const handleDotClick = () => {
    if (input === "") {
      setInput("0.");
      return;
    }

    if (!input.includes(".")) {
      setInput(input + ".");
    }
  };

  // 处理退格按钮
  const handleBackspaceClick = () => {
    if (input.length > 1) setInput(input.slice(0, -1));
    else if (input.length === 1) setInput("0");
  };

  return {
    result,
    input,
    equation,
    clear,
    handleNumberClick,
    handleOperatorClick,
    handleEqualClick,
    handlePlusMinusClick,
    handlePercentClick,
    handleDotClick,
    handleBackspaceClick
  };
}; 