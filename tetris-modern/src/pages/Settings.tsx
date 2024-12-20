import {
  Box,
  Container,
  Heading,
  VStack,
  FormLabel,
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Button,
  useToast,
} from '@chakra-ui/react'
import { FormControl } from '@chakra-ui/form-control'
import { Switch } from '@chakra-ui/switch'
import React from 'react'
import { useState } from 'react'

interface GameSettings {
  soundEffects: boolean
  music: boolean
  ghostPiece: boolean
  darkMode: boolean
  difficulty: string
  volume: number
}

const Settings = () => {
  const toast = useToast()
  const [settings, setSettings] = useState<GameSettings>({
    soundEffects: true,
    music: true,
    ghostPiece: true,
    darkMode: true,
    difficulty: 'normal',
    volume: 70,
  })

  const handleSave = () => {
    localStorage.setItem('gameSettings', JSON.stringify(settings))
    toast({
      title: 'Settings saved',
      status: 'success',
      duration: 2000,
    })
  }

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading size="lg">Game Settings</Heading>

        <Box bg="gray.700" p={6} borderRadius="lg">
          <VStack spacing={6}>
            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Sound Effects</FormLabel>
              <Switch
                isChecked={settings.soundEffects}
                onChange={(e) =>
                  setSettings({ ...settings, soundEffects: e.target.checked })
                }
              />
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Background Music</FormLabel>
              <Switch
                isChecked={settings.music}
                onChange={(e) =>
                  setSettings({ ...settings, music: e.target.checked })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>Volume</FormLabel>
              <Slider
                value={settings.volume}
                onChange={(v) => setSettings({ ...settings, volume: v })}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FormControl>

            <FormControl>
              <FormLabel>Difficulty</FormLabel>
              <Select
                value={settings.difficulty}
                onChange={(e) =>
                  setSettings({ ...settings, difficulty: e.target.value })
                }
              >
                <option value="easy">Easy</option>
                <option value="normal">Normal</option>
                <option value="hard">Hard</option>
              </Select>
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Show Ghost Piece</FormLabel>
              <Switch
                isChecked={settings.ghostPiece}
                onChange={(e) =>
                  setSettings({ ...settings, ghostPiece: e.target.checked })
                }
              />
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Dark Mode</FormLabel>
              <Switch
                isChecked={settings.darkMode}
                onChange={(e) =>
                  setSettings({ ...settings, darkMode: e.target.checked })
                }
              />
            </FormControl>
          </VStack>
        </Box>

        <Button colorScheme="blue" onClick={handleSave}>
          Save Settings
        </Button>
      </VStack>
    </Container>
  )
}

export default Settings