import React from "react";
import Button from "../Button";
import { BUTTON_STYLES } from "../Button/styles";
import { useCalculator } from "../../utils/useCalculator";

// 按钮配置数组：定义计算器键盘布局和每个按钮的属性
export default function Keyboard() {
  // 使用自定义hook获取所有操作函数
  const {
    handleNumberClick,
    handleOperatorClick,
    handleEqualClick,
    handlePlusMinusClick,
    handlePercentClick,
    handleDotClick,
    handleBackspaceClick,
    handleLeftParenthesis,
    handleRightParenthesis,
    clear
  } = useCalculator();

  // 保持原有的buttons定义方式不变
  const buttons = [
    [
      { label: "π", onClick: () => handleNumberClick(Math.PI), style: BUTTON_STYLES.number },
      { label: "e", onClick: () => handleNumberClick(Math.E), style: BUTTON_STYLES.number },
      { label: "←", onClick: handleBackspaceClick, style: BUTTON_STYLES.function },
      { label: "C", onClick: clear, style: BUTTON_STYLES.clear },
    ],
    [
      { label: "(", onClick: handleLeftParenthesis, style: BUTTON_STYLES.function },
      { label: ")", onClick: handleRightParenthesis, style: BUTTON_STYLES.function },
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
    <div className="grid grid-cols-4 gap-2">
      {buttons.map((row, rowIndex) =>
        row.map((button, colIndex) => (
          <Button key={`${rowIndex}-${colIndex}`} onClick={button.onClick} className={button.style}>
            {button.label}
          </Button>
        ))
      )}
    </div>
  );
} 