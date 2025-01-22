"use client"

import { useState, useEffect } from "react"
import Board from "./components/Board"
import { calculateWinner, getComputerMove } from "./utils/gameLogic"
import ServiceWorkerRegistration from "./components/ServiceWorkerRegistration"
import { Switch } from "@/app/components/ui/switch"
import { Label } from "@/app/components/ui/label"

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const [status, setStatus] = useState("")
  const [isSinglePlayer, setIsSinglePlayer] = useState(false)

  useEffect(() => {
    const winner = calculateWinner(board)
    if (winner) {
      setStatus(`Winner: ${winner}`)
    } else if (board.every((square) => square !== null)) {
      setStatus("Draw!")
    } else {
      setStatus(`Next player: ${xIsNext ? "X" : "O"}`)
    }

    if (isSinglePlayer && !xIsNext && !winner && board.some((square) => square === null)) {
      const timer = setTimeout(() => {
        const computerMove = getComputerMove(board)
        if (computerMove !== -1) {
          const newBoard = board.slice()
          newBoard[computerMove] = "O"
          setBoard(newBoard)
          setXIsNext(true)
        }
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [board, xIsNext, isSinglePlayer])

  const handleClick = (i: number) => {
    if (calculateWinner(board) || board[i] || (isSinglePlayer && !xIsNext)) {
      return
    }
    const newBoard = board.slice()
    newBoard[i] = xIsNext ? "X" : "O"
    setBoard(newBoard)
    setXIsNext(!xIsNext)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setXIsNext(true)
  }

  const toggleGameMode = () => {
    setIsSinglePlayer(!isSinglePlayer)
    resetGame()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-4">Tic-Tac-Toe</h1>
      <ServiceWorkerRegistration />
      <div className="flex items-center space-x-2 mb-4">
        <Switch id="game-mode" checked={isSinglePlayer} onCheckedChange={toggleGameMode} />
        <Label htmlFor="game-mode" className="text-white">
          {isSinglePlayer ? "Single Player (vs Computer)" : "Two Players"}
        </Label>
      </div>
      <Board squares={board} onClick={handleClick} disableClicks={isSinglePlayer && !xIsNext} />
      <div className="mt-4 text-xl font-semibold">{status}</div>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  )
}


