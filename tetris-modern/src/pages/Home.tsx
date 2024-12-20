import React from 'react'
import { Box, Button, Container, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const MotionBox = motion(Box)

const Home = () => {
  const navigate = useNavigate()
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const buttonHoverBg = useColorModeValue('blue.500', 'blue.300')

  return (
    <Container maxW="container.xl" centerContent>
      <VStack
        spacing={8}
        py={20}
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Heading
          size="2xl"
          bgGradient="linear(to-r, blue.400, purple.500)"
          bgClip="text"
          fontSize="6xl"
        >
          TETRIS
        </Heading>
        
        <Text fontSize="xl" color="gray.500" textAlign="center" maxW="lg">
          Experience the classic block-stacking game reimagined for the modern web
        </Text>

        <VStack spacing={4} width="full" maxW="md">
          <Button
            w="full"
            size="lg"
            colorScheme="blue"
            _hover={{ bg: buttonHoverBg, transform: 'scale(1.05)' }}
            onClick={() => navigate('/game')}
          >
            Play Now
          </Button>
          
          <Button
            w="full"
            size="lg"
            variant="outline"
            _hover={{ bg: 'gray.700' }}
            onClick={() => navigate('/leaderboard')}
          >
            Leaderboard
          </Button>
          
          <Button
            w="full"
            size="lg"
            variant="ghost"
            _hover={{ bg: 'gray.700' }}
            onClick={() => navigate('/settings')}
          >
            Settings
          </Button>
        </VStack>
      </VStack>
    </Container>
  )
}

export default Home