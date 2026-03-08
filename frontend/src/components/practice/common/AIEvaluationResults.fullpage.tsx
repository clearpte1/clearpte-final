/**
 * AIEvaluationResults - Full Page Example
 *
 * Complete standalone page showing AI Evaluation Results
 * exactly as shown in the screenshot design.
 */

import React, { useState } from 'react';
import { Box, Container, Button, Stack } from '@mui/material';
import AIEvaluationResults from './AIEvaluationResults';

const AIEvaluationResultsFullPage: React.FC = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

  // Exact data from screenshot
  const evaluationData = {
    overallScore: 90,
    pronunciationScore: 90,
    fluencyScore: 90,
    contentScore: 90,
    feedbackItems: [
      'Your response was well-articulated with clear pronunciation and good pacing.',
      'You demonstrated strong understanding of the question and provided a comprehensive answer.',
    ],
    improvementAreas: [
      "You missed mentioning 'environmental' in your transcription which was part of the original content.",
    ],
    audioWaveform: [
      0.3, 0.6, 0.4, 0.7, 0.5, 0.8, 0.6, 0.4, 0.5, 0.7, 0.6, 0.4, 0.3, 0.5,
      0.7, 0.6, 0.4, 0.8, 0.5, 0.3, 0.6, 0.7, 0.4, 0.5, 0.6, 0.8, 0.5, 0.4,
      0.7, 0.5, 0.3, 0.6, 0.4, 0.7, 0.5, 0.8, 0.6, 0.4,
    ],
  };

  const handlePlayAudio = () => {
    setIsAudioPlaying(!isAudioPlaying);

    // Simulate audio playback duration
    if (!isAudioPlaying) {
      setTimeout(() => {
        setIsAudioPlaying(false);
      }, 5000);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    console.log('Playback speed changed to:', speed);
  };

  const handleTryAgain = () => {
    console.log('Try Again clicked');
    // Reset state and allow user to record again
  };

  const handleNext = () => {
    console.log('Next question clicked');
    // Navigate to next question
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#000000',
        py: 4,
        px: { xs: 2, md: 3 },
      }}
    >
      <Container maxWidth="xl">
        {/* AI Evaluation Results Card */}
        <Box
          sx={{
            bgcolor: '#0a0a0a',
            borderRadius: '16px',
            p: { xs: 2, md: 4 },
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
            mb: 4,
          }}
        >
          <AIEvaluationResults
            {...evaluationData}
            isAudioPlaying={isAudioPlaying}
            onPlayAudio={handlePlayAudio}
            playbackSpeed={playbackSpeed}
            onSpeedChange={handleSpeedChange}
          />
        </Box>

        {/* Action Buttons */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={3}
          sx={{
            maxWidth: '900px',
            mx: 'auto',
            justifyContent: 'center',
          }}
        >
          <Button
            variant="contained"
            onClick={handleTryAgain}
            sx={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#FFFFFF',
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '16px',
              py: 2,
              px: 5,
              borderRadius: '12px',
              minWidth: '180px',
              boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            Try Again
          </Button>

          <Button
            variant="contained"
            onClick={handleNext}
            sx={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              color: '#FFFFFF',
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '16px',
              py: 2,
              px: 5,
              borderRadius: '12px',
              minWidth: '180px',
              boxShadow: '0 4px 16px rgba(59, 130, 246, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            Next Question
          </Button>
        </Stack>

        {/* Additional Info Section */}
        <Box
          sx={{
            mt: 6,
            textAlign: 'center',
            maxWidth: '800px',
            mx: 'auto',
          }}
        >
          <Box
            sx={{
              bgcolor: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '12px',
              p: 3,
            }}
          >
            <Box sx={{ fontSize: '32px', mb: 1 }}>💡</Box>
            <Box
              sx={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#3b82f6',
                mb: 1,
              }}
            >
              Tips for Improvement
            </Box>
            <Box
              sx={{
                fontSize: '14px',
                color: '#9ca3af',
                lineHeight: 1.6,
              }}
            >
              Listen to your recording multiple times and compare it with the original.
              Focus on the pronunciation of challenging words and practice them separately.
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AIEvaluationResultsFullPage;
