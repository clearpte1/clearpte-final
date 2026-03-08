/**
 * AIEvaluationResults - Usage Example
 *
 * Demonstrates how to use the AI Evaluation Results component
 * with realistic data and state management.
 */

import React, { useState } from 'react';
import { Box, Container, Button } from '@mui/material';
import AIEvaluationResults from './AIEvaluationResults';

const AIEvaluationResultsExample: React.FC = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [showResults, setShowResults] = useState(true);

  // Sample evaluation data
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
    ],
  };

  const handlePlayAudio = () => {
    setIsAudioPlaying(!isAudioPlaying);

    // Simulate audio playback
    if (!isAudioPlaying) {
      setTimeout(() => {
        setIsAudioPlaying(false);
      }, 3000);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    console.log('Speed changed to:', speed);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#000000',
        py: 4,
        px: 2,
      }}
    >
      <Container maxWidth="xl">
        {/* Toggle Button for Demo */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Button
            variant="contained"
            onClick={() => setShowResults(!showResults)}
            sx={{
              bgcolor: '#3b82f6',
              '&:hover': {
                bgcolor: '#2563eb',
              },
            }}
          >
            {showResults ? 'Hide' : 'Show'} AI Evaluation
          </Button>
        </Box>

        {/* AI Evaluation Results */}
        {showResults && (
          <Box
            sx={{
              bgcolor: '#0a0a0a',
              borderRadius: '16px',
              p: { xs: 2, md: 3 },
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
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
        )}

        {/* Different Score Examples */}
        <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* Excellent Score Example */}
          <Box
            sx={{
              bgcolor: '#0a0a0a',
              borderRadius: '16px',
              p: { xs: 2, md: 3 },
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <AIEvaluationResults
              overallScore={95}
              pronunciationScore={95}
              fluencyScore={92}
              contentScore={98}
              feedbackItems={[
                'Exceptional pronunciation with native-like clarity.',
                'Natural fluency with appropriate pausing and intonation.',
                'Comprehensive content coverage with excellent vocabulary range.',
              ]}
              improvementAreas={[
                'Minor hesitation detected at the beginning. Try to start more confidently.',
              ]}
              isAudioPlaying={false}
              onPlayAudio={() => console.log('Play audio')}
              playbackSpeed={1.0}
              onSpeedChange={handleSpeedChange}
            />
          </Box>

          {/* Good Score Example */}
          <Box
            sx={{
              bgcolor: '#0a0a0a',
              borderRadius: '16px',
              p: { xs: 2, md: 3 },
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <AIEvaluationResults
              overallScore={75}
              pronunciationScore={78}
              fluencyScore={72}
              contentScore={75}
              feedbackItems={[
                'Good overall performance with clear communication.',
                'Most words were pronounced correctly with minor errors.',
              ]}
              improvementAreas={[
                "Work on pronouncing 'th' sounds more accurately.",
                'Try to reduce filler words like "um" and "uh".',
                'Improve response organization for better content flow.',
              ]}
              isAudioPlaying={false}
              onPlayAudio={() => console.log('Play audio')}
              playbackSpeed={1.0}
              onSpeedChange={handleSpeedChange}
            />
          </Box>

          {/* Needs Improvement Example */}
          <Box
            sx={{
              bgcolor: '#0a0a0a',
              borderRadius: '16px',
              p: { xs: 2, md: 3 },
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <AIEvaluationResults
              overallScore={55}
              pronunciationScore={60}
              fluencyScore={50}
              contentScore={55}
              feedbackItems={[
                'You demonstrated basic understanding of the question.',
                'Some words were pronounced correctly.',
              ]}
              improvementAreas={[
                'Practice pronunciation of complex words more frequently.',
                'Work on speaking at a steady pace - avoid rushing.',
                'Include more specific details to strengthen content.',
                'Focus on sentence structure and grammar.',
              ]}
              isAudioPlaying={false}
              onPlayAudio={() => console.log('Play audio')}
              playbackSpeed={1.0}
              onSpeedChange={handleSpeedChange}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AIEvaluationResultsExample;
