import {
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Select,
  HStack,
  Badge,
} from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'

interface Score {
  rank: number
  username: string
  score: number
  date: string
  gameMode: string
}

const Leaderboard = () => {
  const [timeFilter, setTimeFilter] = useState('all')
  
  const mockScores: Score[] = [
    { rank: 1, username: "Player1", score: 25000, date: "2024-03-10", gameMode: "Classic" },
    { rank: 2, username: "Player2", score: 22000, date: "2024-03-09", gameMode: "Sprint" },
    { rank: 3, username: "Player3", score: 20000, date: "2024-03-08", gameMode: "Classic" },
  ]

  return (
    <Container maxW="container.lg" py={8}>
      <Heading mb={6}>Leaderboard</Heading>
      
      <HStack mb={6} spacing={4}>
        <Select 
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          width="200px"
        >
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </Select>
      </HStack>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Rank</Th>
              <Th>Player</Th>
              <Th>Mode</Th>
              <Th isNumeric>Score</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {mockScores.map((score) => (
              <Tr key={score.rank}>
                <Td>
                  {score.rank === 1 && <Badge colorScheme="gold">🏆</Badge>}
                  {score.rank === 2 && <Badge colorScheme="silver">🥈</Badge>}
                  {score.rank === 3 && <Badge colorScheme="bronze">🥉</Badge>}
                  {score.rank > 3 && score.rank}
                </Td>
                <Td>{score.username}</Td>
                <Td>
                  <Badge 
                    colorScheme={score.gameMode === 'Classic' ? 'blue' : 'green'}
                  >
                    {score.gameMode}
                  </Badge>
                </Td>
                <Td isNumeric>{score.score.toLocaleString()}</Td>
                <Td>{new Date(score.date).toLocaleDateString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Leaderboard