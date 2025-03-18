export default function CalculatorButton({ onClick, className, children }) {
  return (
    <button onClick={onClick} className={`p-4 rounded ${className}`}>
      {children}
    </button>
  );
}