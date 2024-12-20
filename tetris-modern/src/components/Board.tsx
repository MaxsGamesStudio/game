import { Box, Grid, useColorModeValue } from '@chakra-ui/react'
import { Board as BoardType, GamePiece } from '../types'
import React from 'react'

interface BoardProps {
  board: BoardType
  currentPiece?: GamePiece
  ghostPieceEnabled?: boolean
}

const Board = ({ board, currentPiece, ghostPieceEnabled = true }: BoardProps) => {
  const cellBg = useColorModeValue('gray.100', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  const getCellColor = (value: number) => {
    const colors = {
      0: 'transparent',
      1: '#00f0f0', // I piece
      2: '#f0f000', // O piece
      3: '#a000f0', // T piece
      4: '#00f000', // S piece
      5: '#f00000', // Z piece
      6: '#0000f0', // J piece
      7: '#f0a000', // L piece
    }
    return colors[value as keyof typeof colors] || cellBg
  }

  const renderCell = (value: number, rowIndex: number, colIndex: number) => {
    let cellValue = value

    // Render current piece
    if (currentPiece) {
      const { matrix, position } = currentPiece
      const pieceRow = rowIndex - position.y
      const pieceCol = colIndex - position.x

      if (
        pieceRow >= 0 &&
        pieceRow < matrix.length &&
        pieceCol >= 0 &&
        pieceCol < matrix[0].length &&
        matrix[pieceRow][pieceCol] !== 0
      ) {
        cellValue = matrix[pieceRow][pieceCol]
      }
    }

    return (
      <Box
        key={`${rowIndex}-${colIndex}`}
        w="full"
        h="full"
        bg={getCellColor(cellValue)}
        border="1px solid"
        borderColor={borderColor}
        transition="background-color 0.2s"
        opacity={cellValue === 0 ? 0.3 : 1}
      />
    )
  }

  return (
    <Box
      w="full"
      maxW="500px"
      aspectRatio={0.5}
      bg={cellBg}
      p={2}
      borderRadius="lg"
      boxShadow="lg"
    >
      <Grid
        templateColumns={`repeat(${board[0].length}, 1fr)`}
        templateRows={`repeat(${board.length}, 1fr)`}
        gap={1}
        h="full"
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))
        )}
      </Grid>
    </Box>
  )
}

export default Board