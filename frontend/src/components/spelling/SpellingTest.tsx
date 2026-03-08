/**
 * SpellingTest Component
 *
 * Interactive spelling test with audio playback
 * - 15 words per test
 * - 5 second gap between words
 * - Black theme design
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem,
  Select,
  FormControl,
  LinearProgress,
} from '@mui/material';
import { VolumeUp } from '@mui/icons-material';

interface SpellingWord {
  id: string;
  word: string;
  audioUrl?: string;
}

interface SpellingTestData {
  id: string;
  name: string;
  words: SpellingWord[];
}

// Mock data - replace with API call
const mockTests: SpellingTestData[] = [
  {
    id: 'ST3362',
    name: 'Test #ST3362',
    words: [
      { id: '1', word: 'accommodation', audioUrl: '/audio/accommodation.mp3' },
      { id: '2', word: 'embarrass', audioUrl: '/audio/embarrass.mp3' },
      { id: '3', word: 'definitely', audioUrl: '/audio/definitely.mp3' },
      { id: '4', word: 'maintenance', audioUrl: '/audio/maintenance.mp3' },
      { id: '5', word: 'privilege', audioUrl: '/audio/privilege.mp3' },
      { id: '6', word: 'occurrence', audioUrl: '/audio/occurrence.mp3' },
      { id: '7', word: 'necessary', audioUrl: '/audio/necessary.mp3' },
      { id: '8', word: 'separate', audioUrl: '/audio/separate.mp3' },
      { id: '9', word: 'believe', audioUrl: '/audio/believe.mp3' },
      { id: '10', word: 'receive', audioUrl: '/audio/receive.mp3' },
      { id: '11', word: 'achieve', audioUrl: '/audio/achieve.mp3' },
      { id: '12', word: 'rhythm', audioUrl: '/audio/rhythm.mp3' },
      { id: '13', word: 'conscience', audioUrl: '/audio/conscience.mp3' },
      { id: '14', word: 'restaurant', audioUrl: '/audio/restaurant.mp3' },
      { id: '15', word: 'guarantee', audioUrl: '/audio/guarantee.mp3' },
    ],
  },
];

const SpellingTest: React.FC = () => {
  const [selectedTest, setSelectedTest] = useState<SpellingTestData>(mockTests[0]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>(Array(15).fill(''));
  const [currentInput, setCurrentInput] = useState('');
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const totalWords = 15;
  const wordsCompleted = userAnswers.filter(answer => answer !== '').length;

  // Handle test selection
  const handleTestSelect = (event: any) => {
    const test = mockTests.find(t => t.id === event.target.value);
    if (test) {
      setSelectedTest(test);
      handleReset();
    }
  };

  // Start test and play first word
  const handleStartTest = () => {
    setIsTestStarted(true);
    playCurrentWord();
  };

  // Play current word audio
  const playCurrentWord = () => {
    setIsPlaying(true);

    // Simulate audio playback with Text-to-Speech
    const utterance = new SpeechSynthesisUtterance(selectedTest.words[currentWordIndex].word);
    utterance.rate = 0.8;
    utterance.pitch = 1;

    utterance.onend = () => {
      setIsPlaying(false);
    };

    speechSynthesis.speak(utterance);
  };

  // Submit current answer
  const handleSubmit = () => {
    if (currentInput.trim() === '') return;

    const newAnswers = [...userAnswers];
    newAnswers[currentWordIndex] = currentInput.trim();
    setUserAnswers(newAnswers);
    setCurrentInput('');

    // Auto-advance to next word
    if (currentWordIndex < totalWords - 1) {
      setTimeout(() => {
        setCurrentWordIndex(currentWordIndex + 1);
        setTimeout(() => {
          playCurrentWord();
        }, 500); // Small delay before playing next word
      }, 300);
    } else {
      setTestCompleted(true);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  // Navigation handlers
  const handlePrevious = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
      setCurrentInput(userAnswers[currentWordIndex - 1] || '');
    }
  };

  const handleNext = () => {
    if (currentWordIndex < totalWords - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setCurrentInput(userAnswers[currentWordIndex + 1] || '');
    }
  };

  // Reset test
  const handleReset = () => {
    setCurrentWordIndex(0);
    setUserAnswers(Array(15).fill(''));
    setCurrentInput('');
    setIsTestStarted(false);
    setIsPlaying(false);
    setTestCompleted(false);
  };

  // Calculate results
  const calculateResults = () => {
    let correct = 0;
    userAnswers.forEach((answer, index) => {
      if (answer.toLowerCase() === selectedTest.words[index].word.toLowerCase()) {
        correct++;
      }
    });
    return { correct, total: totalWords, percentage: Math.round((correct / totalWords) * 100) };
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#000000',
        color: '#FFFFFF',
        pt: 4,
        pb: 6,
      }}
    >
      <Container maxWidth="lg">
        {/* Top Controls */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2,
            mb: 4,
          }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: '#10b981',
              color: '#000000',
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              borderRadius: '8px',
              '&:hover': {
                bgcolor: '#059669',
              },
            }}
            onClick={() => console.log('Add your own word')}
          >
            Add your own word
          </Button>

          <FormControl sx={{ minWidth: 200 }}>
            <Select
              value={selectedTest.id}
              onChange={handleTestSelect}
              sx={{
                bgcolor: '#10b981',
                color: '#000000',
                fontWeight: 600,
                borderRadius: '8px',
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }}
            >
              {mockTests.map((test) => (
                <MenuItem key={test.id} value={test.id}>
                  Question: #{test.id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            textAlign: 'center',
            maxWidth: '900px',
            mx: 'auto',
          }}
        >
          {/* Title */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '48px', md: '72px' },
              fontWeight: 700,
              mb: 3,
              background: 'linear-gradient(90deg, #4285f4 0%, #ea4335 25%, #fbbc04 50%, #34a853 75%, #4285f4 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-2px',
            }}
          >
            Spelling Test
          </Typography>

          {/* Instructions */}
          <Typography
            sx={{
              fontSize: '18px',
              color: '#B0B0B0',
              mb: 4,
              lineHeight: 1.6,
            }}
          >
            Each question contains <strong style={{ color: '#FFFFFF' }}>15 words</strong>. Click{' '}
            <strong style={{ color: '#FFFFFF' }}>Start Test</strong> to play words with a{' '}
            <strong style={{ color: '#FFFFFF' }}>5 second gap</strong>. After audio finishes, click{' '}
            <strong style={{ color: '#FFFFFF' }}>Submit</strong>.
          </Typography>

          {/* Word Counter */}
          <Box
            sx={{
              display: 'inline-block',
              bgcolor: '#1a1a1a',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '24px',
              px: 4,
              py: 1.5,
              mb: 4,
            }}
          >
            <Typography
              sx={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#FFFFFF',
              }}
            >
              Word: {wordsCompleted} / {totalWords}
            </Typography>
          </Box>

          {/* Results Display */}
          {testCompleted && (
            <Box
              sx={{
                mb: 4,
                p: 4,
                bgcolor: '#1a1a1a',
                borderRadius: '16px',
                border: '2px solid #10b981',
              }}
            >
              <Typography variant="h4" sx={{ color: '#10b981', mb: 2, fontWeight: 700 }}>
                Test Completed! 🎉
              </Typography>
              <Typography variant="h5" sx={{ color: '#FFFFFF', mb: 1 }}>
                Score: {calculateResults().correct} / {totalWords} ({calculateResults().percentage}%)
              </Typography>
              <Button
                variant="contained"
                onClick={handleReset}
                sx={{
                  mt: 2,
                  bgcolor: '#3b82f6',
                  color: '#FFFFFF',
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                }}
              >
                Start New Test
              </Button>
            </Box>
          )}

          {/* Input Area */}
          {!testCompleted && (
            <Box
              sx={{
                position: 'relative',
                mb: 4,
              }}
            >
              <TextField
                fullWidth
                placeholder="Type the spelling for the current word..."
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={!isTestStarted}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: '#1a1a1a',
                    borderRadius: '50px',
                    fontSize: '18px',
                    color: '#FFFFFF',
                    pr: '140px',
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.2)',
                      borderWidth: '2px',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255,255,255,0.3)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                  '& .MuiOutlinedInput-input': {
                    py: 2.5,
                    px: 4,
                    '&::placeholder': {
                      color: '#6b7280',
                      opacity: 1,
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!isTestStarted || currentInput.trim() === ''}
                sx={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: '#3b82f6',
                  color: '#FFFFFF',
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  borderRadius: '40px',
                  minWidth: '120px',
                  '&:hover': {
                    bgcolor: '#2563eb',
                  },
                  '&.Mui-disabled': {
                    bgcolor: '#1e3a5f',
                    color: '#6b7280',
                  },
                }}
              >
                Submit
              </Button>
            </Box>
          )}

          {/* Navigation Buttons */}
          <Stack
            direction="row"
            spacing={3}
            sx={{
              justifyContent: 'center',
              mb: 4,
            }}
          >
            <Button
              variant="contained"
              onClick={handlePrevious}
              disabled={currentWordIndex === 0 || !isTestStarted}
              sx={{
                bgcolor: '#2a2a2a',
                color: '#FFFFFF',
                textTransform: 'none',
                fontWeight: 600,
                px: 5,
                py: 1.5,
                fontSize: '16px',
                borderRadius: '12px',
                minWidth: '140px',
                '&:hover': {
                  bgcolor: '#3a3a3a',
                },
                '&.Mui-disabled': {
                  bgcolor: '#1a1a1a',
                  color: '#6b7280',
                },
              }}
            >
              Previous
            </Button>

            {!isTestStarted ? (
              <Button
                variant="contained"
                onClick={handleStartTest}
                startIcon={<VolumeUp />}
                sx={{
                  bgcolor: '#3b82f6',
                  color: '#FFFFFF',
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 5,
                  py: 1.5,
                  fontSize: '16px',
                  borderRadius: '12px',
                  minWidth: '180px',
                  '&:hover': {
                    bgcolor: '#2563eb',
                  },
                }}
              >
                Start Test
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={playCurrentWord}
                disabled={isPlaying}
                startIcon={<VolumeUp />}
                sx={{
                  bgcolor: '#10b981',
                  color: '#000000',
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 5,
                  py: 1.5,
                  fontSize: '16px',
                  borderRadius: '12px',
                  minWidth: '180px',
                  '&:hover': {
                    bgcolor: '#059669',
                  },
                  '&.Mui-disabled': {
                    bgcolor: '#065f46',
                    color: '#6b7280',
                  },
                }}
              >
                {isPlaying ? 'Playing...' : 'Replay Word'}
              </Button>
            )}

            <Button
              variant="contained"
              onClick={handleNext}
              disabled={currentWordIndex === totalWords - 1 || !isTestStarted}
              sx={{
                bgcolor: '#2a2a2a',
                color: '#FFFFFF',
                textTransform: 'none',
                fontWeight: 600,
                px: 5,
                py: 1.5,
                fontSize: '16px',
                borderRadius: '12px',
                minWidth: '140px',
                '&:hover': {
                  bgcolor: '#3a3a3a',
                },
                '&.Mui-disabled': {
                  bgcolor: '#1a1a1a',
                  color: '#6b7280',
                },
              }}
            >
              Next
            </Button>
          </Stack>

          {/* Progress Bar */}
          <Box sx={{ mt: 6 }}>
            <LinearProgress
              variant="determinate"
              value={(wordsCompleted / totalWords) * 100}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: 'rgba(255,255,255,0.1)',
                '& .MuiLinearProgress-bar': {
                  bgcolor: '#3b82f6',
                  borderRadius: 4,
                },
              }}
            />
            <Typography
              sx={{
                mt: 2,
                fontSize: '14px',
                color: '#9ca3af',
              }}
            >
              Progress: {Math.round((wordsCompleted / totalWords) * 100)}%
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SpellingTest;
