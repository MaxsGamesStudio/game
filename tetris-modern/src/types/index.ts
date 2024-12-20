export type PieceType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L'

export type BoardCell = number
export type Board = BoardCell[][]

export interface Position {
  x: number
  y: number
}

export interface GamePiece {
  type: PieceType
  position: Position
  matrix: number[][]
  color: string
}

export interface GameState {
  board: Board
  currentPiece: GamePiece | null
  nextPiece: GamePiece | null
  score: number
  level: number
  lines: number
  isGameOver: boolean
  isPaused: boolean
}

export interface User {
  id: string
  username: string
  highScore: number
  gamesPlayed: number
  totalLines: number
}

export interface LeaderboardEntry {
  userId: string
  username: string
  score: number
  level: number
  lines: number
  timestamp: Date
  gameMode: GameMode
}

export type GameMode = 'classic' | 'sprint' | 'marathon'

export interface GameSettings {
  soundEffects: boolean
  music: boolean
  ghostPiece: boolean
  darkMode: boolean
  difficulty: 'easy' | 'normal' | 'hard'
  volume: number
}

export interface GameControls {
  moveLeft: string
  moveRight: string
  rotateRight: string
  softDrop: string
  hardDrop: string
  hold: string
  pause: string
}