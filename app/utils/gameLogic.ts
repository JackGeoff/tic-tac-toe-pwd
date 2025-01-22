export function calculateWinner(squares: (string | null)[]): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

export function getComputerMove(squares: (string | null)[]): number {
  // Check for winning move
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      const testBoard = squares.slice()
      testBoard[i] = "O"
      if (calculateWinner(testBoard) === "O") {
        return i
      }
    }
  }

  // Check for blocking player's winning move
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      const testBoard = squares.slice()
      testBoard[i] = "X"
      if (calculateWinner(testBoard) === "X") {
        return i
      }
    }
  }

  // Try to take the center
  if (!squares[4]) {
    return 4
  }

  // Try to take a corner
  const corners = [0, 2, 6, 8]
  const availableCorners = corners.filter((corner) => !squares[corner])
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)]
  }

  // Take any available side
  const sides = [1, 3, 5, 7]
  const availableSides = sides.filter((side) => !squares[side])
  if (availableSides.length > 0) {
    return availableSides[Math.floor(Math.random() * availableSides.length)]
  }

  // This should never happen if the board is not full
  return -1
}


