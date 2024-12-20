import { useState, useEffect, useCallback } from 'react'
import { GameState, GamePiece, Position, Board } from '../types'

const BOARD_WIDTH = 10
const BOARD_HEIGHT = 20

const createEmptyBoard = (): Board => 
  Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0))

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: createEmptyBoard(),
    currentPiece: null,
    nextPiece: null,
    score: 0,
    level: 1,
    lines: 0,
    isGameOver: false,
    isPaused: false
  })

  const moveDown = useCallback(() => {
    if (!gameState.currentPiece) return

    const newPosition: Position = {
      x: gameState.currentPiece.position.x,
      y: gameState.currentPiece.position.y + 1
    }

    if (isValidMove(newPosition, gameState.currentPiece.matrix)) {
      setGameState(prev => ({
        ...prev,
        currentPiece: {
          ...prev.currentPiece!,
          position: newPosition
        }
      }))
    } else {
      lockPiece()
    }
  }, [gameState.currentPiece])

  const moveHorizontal = useCallback((direction: -1 | 1) => {
    if (!gameState.currentPiece) return

    const newPosition: Position = {
      x: gameState.currentPiece.position.x + direction,
      y: gameState.currentPiece.position.y
    }

    if (isValidMove(newPosition, gameState.currentPiece.matrix)) {
      setGameState(prev => ({
        ...prev,
        currentPiece: {
          ...prev.currentPiece!,
          position: newPosition
        }
      }))
    }
  }, [gameState.currentPiece])

  const rotate = useCallback(() => {
    if (!gameState.currentPiece) return

    const matrix = rotateMatrix(gameState.currentPiece.matrix)
    if (isValidMove(gameState.currentPiece.position, matrix)) {
      setGameState(prev => ({
          ...prev,
          currentPiece: {
              ...prev.currentPiece!,
              matrix
          }
      }))
    }
  }, [gameState.currentPiece])

  const isValidMove = (position: Position, matrix: number[][]): boolean => {
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] !== 0) {
          const newX = position.x + x
          const newY = position.y + y

          if (
            newX < 0 ||
            newX >= BOARD_WIDTH ||
            newY >= BOARD_HEIGHT ||
            (newY >= 0 && gameState.board[newY][newX] !== 0)
          ) {
            return false
          }
        }
      }
    }
    return true
  }

  const lockPiece = () => {
    if (!gameState.currentPiece) return

    const newBoard = [...gameState.board]
    const { matrix, position } = gameState.currentPiece

    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          const boardY = y + position.y
          const boardX = x + position.x
          if (boardY >= 0) {
            newBoard[boardY][boardX] = value
          }
        }
      })
    })

    const clearedLines = clearLines(newBoard)
    const newScore = calculateScore(clearedLines)

    setGameState(prev => ({
      ...prev,
      board: newBoard,
      currentPiece: prev.nextPiece,
      nextPiece: generateRandomPiece(),
      score: prev.score + newScore,
      lines: prev.lines + clearedLines,
      level: Math.floor(prev.lines / 10) + 1
    }))
  }

  const clearLines = (board: Board): number => {
    let linesCleared = 0
    const newBoard = board.filter(row => {
      const isFull = row.every(cell => cell !== 0)
      if (isFull) linesCleared++
      return !isFull
    })

    while (newBoard.length < BOARD_HEIGHT) {
      newBoard.unshift(Array(BOARD_WIDTH).fill(0))
    }

    return linesCleared
  }

  const calculateScore = (lines: number): number => {
    const basePoints = [0, 40, 100, 300, 1200]
    return basePoints[lines] * gameState.level
  }

  useEffect(() => {
    if (gameState.isGameOver || gameState.isPaused) return

    const gameLoop = setInterval(() => {
      moveDown()
    }, 1000 - (gameState.level - 1) * 50)

    return () => clearInterval(gameLoop)
  }, [gameState.isGameOver, gameState.isPaused, gameState.level, moveDown])

  return {
    gameState,
    moveDown,
    moveHorizontal,
    rotate,
    startGame: () => {
      setGameState({
        ...gameState,
        isGameOver: false,
        isPaused: false,
        score: 0,
        level: 1,
        lines: 0,
        board: createEmptyBoard(),
        currentPiece: generateRandomPiece(),
        nextPiece: generateRandomPiece()
      })
    },
    pauseGame: () => {
      setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }))
    }
  }
}

export default useGame

function rotateMatrix(matrix: number[][]): number[][] {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const rotated = Array(cols).fill(null).map(() => Array(rows).fill(0));
    
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            rotated[x][rows - 1 - y] = matrix[y][x];
        }
    }
    
    return rotated;
}


function generateRandomPiece(): GamePiece | null {
    throw new Error('Function not implemented.')
}
