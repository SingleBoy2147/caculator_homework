import CalculatorButton from "./caculatorButton";
export default function KeyBoard({buttons}) {
  return (
    <>
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((row, rowIndex) =>
          row.map((button, colIndex) => (
            <CalculatorButton key={`${rowIndex}-${colIndex}`} onClick={button.onClick} className={button.style}>
              {button.label}
            </CalculatorButton>
          ))
        )}
      </div>
    </>
  );
}