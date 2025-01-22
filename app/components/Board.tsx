import Square from "./Square"

interface BoardProps {
  squares: (string | null)[]
  onClick: (i: number) => void
  disableClicks: boolean
}

export default function Board({ squares, onClick, disableClicks }: BoardProps) {
  return (
    <div className="grid grid-cols-3 gap-2 w-full max-w-xs sm:max-w-sm md:max-w-md">
      {squares.map((square, i) => (
        <Square key={i} value={square} onClick={() => onClick(i)} disabled={disableClicks || square !== null} />
      ))}
    </div>
  )
}


