// 运算符优先级定义
export const OPR_PRIOR = {
  "(" : 3,
  "+" : 1,
  "-" : 1,
  "×" : 2,
  "÷" : 2,
  ")" : 0
};

// 计算函数：接收两个操作数和运算符，返回计算结果
export const calc = (a, b, operator) => {
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

// 添加操作符到栈
export const addOpr = (opr, tempOprStack, tempOpdStack, tempEquation) => {
  let opr_prior = OPR_PRIOR[opr];
  while (tempOprStack.length > 0 && 
    OPR_PRIOR[tempOprStack.at(-1)] >= opr_prior) {
    if(OPR_PRIOR[tempOprStack.at(-1)] === 3)
    {
      break;
    }
    let opd1 = tempOpdStack.at(-2);
    let opd2 = tempOpdStack.at(-1);
    let oprr = tempOprStack.at(-1);
    tempOpdStack.pop(); 
    tempOpdStack.pop();
    tempOprStack.pop();
    let res = calc(opd1, opd2, oprr);

    if (!isFinite(res)) {
      return;
    }
    tempOpdStack.push(res);
  }
  tempOprStack.push(opr);
  tempEquation.push(opr);
};

// 添加操作数到栈
export const addOpd = (tempInput, tempOpdStack, tempEquation) => {
  tempOpdStack.push(parseFloat(tempInput));
  tempEquation.push(parseFloat(tempInput));
  return "";
}; 