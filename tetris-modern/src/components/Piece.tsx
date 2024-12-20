import { Box, Grid } from '@chakra-ui/react'
import { PieceType } from '../types'
import React from 'react'

interface PieceProps {
  type: PieceType
  isPreview?: boolean
  isGhost?: boolean
}

const TETROMINOES = {
  I: {
    matrix: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    color: '#00f0f0'
  },
  O: {
    matrix: [
      [2, 2],
      [2, 2]
    ],
    color: '#f0f000'
  },
  T: {
    matrix: [
      [0, 3, 0],
      [3, 3, 3],
      [0, 0, 0]
    ],
    color: '#a000f0'
  },
  S: {
    matrix: [
      [0, 4, 4],
      [4, 4, 0],
      [0, 0, 0]
    ],
    color: '#00f000'
  },
  Z: {
    matrix: [
      [5, 5, 0],
      [0, 5, 5],
      [0, 0, 0]
    ],
    color: '#f00000'
  },
  J: {
    matrix: [
      [6, 0, 0],
      [6, 6, 6],
      [0, 0, 0]
    ],
    color: '#0000f0'
  },
  L: {
    matrix: [
      [0, 0, 7],
      [7, 7, 7],
      [0, 0, 0]
    ],
    color: '#f0a000'
  }
}

const Piece = ({ type, isPreview = false, isGhost = false }: PieceProps) => {
  const piece = TETROMINOES[type]
  const matrix = piece.matrix
  const size = matrix.length

  return (
    <Box
      w={isPreview ? '100px' : 'full'}
      h={isPreview ? '100px' : 'full'}
      p={1}
    >
      <Grid
        templateColumns={`repeat(${size}, 1fr)`}
        templateRows={`repeat(${size}, 1fr)`}
        gap={1}
      >
        {matrix.map((row, i) =>
          row.map((cell, j) => (
            <Box
              key={`${i}-${j}`}
              bg={cell ? piece.color : 'transparent'}
              opacity={isGhost ? 0.3 : cell ? 1 : 0}
              borderRadius="sm"
              transition="all 0.2s"
              _hover={isPreview ? { transform: 'scale(1.1)' } : undefined}
            />
          ))
        )}
      </Grid>
    </Box>
  )
}

export const generateRandomPiece = (): PieceType => {
  const pieces: PieceType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L']
  return pieces[Math.floor(Math.random() * pieces.length)]
}

export const rotateMatrix = (matrix: number[][]): number[][] => {
  const N = matrix.length
  const rotated = matrix.map((row, i) =>
    row.map((val, j) => matrix[N - 1 - j][i])
  )
  return rotated
}

export default Piece