import { Box, Grid, Text, VStack, HStack, Button, Container, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { useState, useEffect } from 'react'

const Game = () => {
  const [isPaused, setIsPaused] = useState(false)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const bgColor = useColorModeValue('gray.100', 'gray.800')
  const boardBg = useColorModeValue('gray.200', 'gray.700')

  return (
    <Container maxW="container.xl" py={8}>
      <Grid templateColumns={{ base: '1fr', md: '3fr 1fr' }} gap={8}>
        <Box>
          {/* Game Board */}
          <Box
            bg={boardBg}
            aspectRatio={0.5}
            borderRadius="lg"
            p={2}
            position="relative"
          >
            {isPaused && (
              <Box
                position="absolute"
                inset={0}
                bg="blackAlpha.700"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="lg"
              >
                <Text fontSize="2xl" color="white">PAUSED</Text>
              </Box>
            )}
          </Box>

          {/* Controls */}
          <HStack mt={4} justifyContent="center" spacing={4}>
            <Button
              colorScheme={isPaused ? 'green' : 'red'}
              onClick={() => setIsPaused(!isPaused)}
            >
              {isPaused ? 'Resume' : 'Pause'}
            </Button>
            <Button colorScheme="gray">Restart</Button>
          </HStack>
        </Box>

        {/* Game Info */}
        <VStack spacing={6}>
          <Box
            bg={bgColor}
            p={4}
            borderRadius="lg"
            w="full"
          >
            <Text fontSize="lg" fontWeight="bold">Next Piece</Text>
            <Box
              bg={boardBg}
              h="100px"
              mt={2}
              borderRadius="md"
            />
          </Box>

          <Box
            bg={bgColor}
            p={4}
            borderRadius="lg"
            w="full"
          >
            <VStack spacing={2} align="start">
              <Text fontSize="lg">Score: {score}</Text>
              <Text fontSize="lg">Level: {level}</Text>
            </VStack>
          </Box>

          <Box
            bg={bgColor}
            p={4}
            borderRadius="lg"
            w="full"
          >
            <Text fontSize="lg" mb={2}>Controls</Text>
            <VStack align="start" spacing={1}>
              <Text>↑ - Rotate</Text>
              <Text>← → - Move</Text>
              <Text>↓ - Soft Drop</Text>
              <Text>Space - Hard Drop</Text>
            </VStack>
          </Box>
        </VStack>
      </Grid>
    </Container>
  )
}

export default Game