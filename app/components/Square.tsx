interface SquareProps {
  value: string | null
  onClick: () => void
  disabled: boolean
}

export default function Square({ value, onClick, disabled }: SquareProps) {
  const getGlowColor = () => {
    if (value === "X") return "pink"
    if (value === "O") return "green"
    return "white"
  }

  return (
    <button
      className={`w-full aspect-square bg-gray-800 border border-gray-600 text-4xl sm:text-5xl md:text-6xl font-bold flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
        disabled ? "cursor-not-allowed opacity-50" : "hover:bg-gray-700"
      }`}
      onClick={onClick}
      disabled={disabled}
      style={{
        boxShadow: value ? `0 0 15px ${getGlowColor()}` : "0 0 5px rgba(255, 255, 255, 0.1)",
        color: value === "X" ? "pink" : value === "O" ? "green" : "white",
      }}
    >
      {value}
    </button>
  )
}


