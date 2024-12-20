import { Box, Grid, Button, Icon } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { ArrowUpIcon, ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { useEffect } from 'react'
import React from 'react'

interface ControlsProps {
  onMoveLeft: () => void
  onMoveRight: () => void
  onRotate: () => void
  onDrop: () => void
  onHardDrop: () => void
}

const Controls = ({ onMoveLeft, onMoveRight, onRotate, onDrop, onHardDrop }: ControlsProps) => {
  const buttonBg = useColorModeValue('gray.100', 'gray.700')
  const buttonHoverBg = useColorModeValue('gray.200', 'gray.600')

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          onMoveLeft()
          break
        case 'ArrowRight':
          onMoveRight()
          break
        case 'ArrowUp':
          onRotate()
          break
        case 'ArrowDown':
          onDrop()
          break
        case ' ':
          onHardDrop()
          event.preventDefault()
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [onMoveLeft, onMoveRight, onRotate, onDrop, onHardDrop])

  return (
    <Box maxW="300px" w="full" mt={4}>
      <Grid
        templateColumns="repeat(3, 1fr)"
        templateRows="repeat(2, 1fr)"
        gap={2}
      >
        <Button
          gridColumn={2}
          onClick={onRotate}
          bg={buttonBg}
          _hover={{ bg: buttonHoverBg }}
        >
          <Icon as={ArrowUpIcon} />
        </Button>
        <Button
          gridColumn={1}
          gridRow={2}
          onClick={onMoveLeft}
          bg={buttonBg}
          _hover={{ bg: buttonHoverBg }}
        >
          <Icon as={ArrowLeftIcon} />
        </Button>
        <Button
          gridColumn={2}
          gridRow={2}
          onClick={onDrop}
          bg={buttonBg}
          _hover={{ bg: buttonHoverBg }}
        >
          <Icon as={ArrowDownIcon} />
        </Button>
        <Button
          gridColumn={3}
          gridRow={2}
          onClick={onMoveRight}
          bg={buttonBg}
          _hover={{ bg: buttonHoverBg }}
        >
          <Icon as={ArrowRightIcon} />
        </Button>
      </Grid>
      <Button
        w="full"
        mt={2}
        onClick={onHardDrop}
        bg={buttonBg}
        _hover={{ bg: buttonHoverBg }}
      >
        Hard Drop (Space)
      </Button>
    </Box>
  )
}

export default Controls