export default function Button({ onClick, className, children }) {
  return (
    <button onClick={onClick} className={`p-4 rounded ${className}`}>
      {children}
    </button>
  );
} 