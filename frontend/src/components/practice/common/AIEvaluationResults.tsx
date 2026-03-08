/**
 * AIEvaluationResults Component
 *
 * Premium AI-powered evaluation results display with:
 * - Overall score with circular progress
 * - Individual metrics (Pronunciation, Fluency, Content)
 * - Audio playback with waveform
 * - Detailed feedback and areas for improvement
 */

import React, { useState } from 'react';
import { Box, Typography, LinearProgress, IconButton, Stack } from '@mui/material';
import { PlayArrow, Pause, VolumeUp, Lightbulb } from '@mui/icons-material';

// ============================================================================
// TYPES
// ============================================================================

export interface AIEvaluationResultsProps {
  overallScore: number;
  pronunciationScore: number;
  fluencyScore: number;
  contentScore: number;
  feedbackItems: string[];
  improvementAreas: string[];
  audioUrl?: string;
  audioWaveform?: number[]; // Array of amplitudes for waveform visualization
  onPlayAudio?: () => void;
  isAudioPlaying?: boolean;
  playbackSpeed?: number;
  onSpeedChange?: (speed: number) => void;
}

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

const CircularScore: React.FC<{ score: number }> = ({ score }) => {
  const circumference = 2 * Math.PI * 80; // radius = 80
  const offset = circumference - (score / 100) * circumference;

  return (
    <Box sx={{ position: 'relative', width: 200, height: 200, mx: 'auto' }}>
      <svg width="200" height="200" style={{ transform: 'rotate(-90deg)' }}>
        {/* Background circle */}
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="12"
        />
        {/* Progress circle */}
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 1s ease-in-out',
          }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <Typography
          sx={{
            fontSize: '56px',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1,
          }}
        >
          {score}
        </Typography>
      </Box>
    </Box>
  );
};

const ScoreBar: React.FC<{
  label: string;
  score: number;
  color: string;
}> = ({ label, score, color }) => {
  return (
    <Box sx={{ flex: 1 }}>
      <Typography
        sx={{
          fontSize: '16px',
          fontWeight: 500,
          color: '#9ca3af',
          mb: 1,
          textAlign: 'center',
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontSize: '40px',
          fontWeight: 700,
          color: '#FFFFFF',
          textAlign: 'center',
          mb: 1.5,
          lineHeight: 1,
        }}
      >
        {score}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={score}
        sx={{
          height: 6,
          borderRadius: 3,
          bgcolor: 'rgba(255,255,255,0.1)',
          '& .MuiLinearProgress-bar': {
            bgcolor: color,
            borderRadius: 3,
          },
        }}
      />
    </Box>
  );
};

const AudioWaveform: React.FC<{
  waveform: number[];
  isPlaying: boolean;
}> = ({ waveform, isPlaying }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        height: 40,
        px: 2,
      }}
    >
      {waveform.map((amplitude, index) => (
        <Box
          key={index}
          sx={{
            width: 3,
            height: `${amplitude * 40}px`,
            bgcolor: isPlaying ? '#3b82f6' : '#4b5563',
            borderRadius: '2px',
            transition: 'all 0.3s',
          }}
        />
      ))}
    </Box>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const AIEvaluationResults: React.FC<AIEvaluationResultsProps> = ({
  overallScore,
  pronunciationScore,
  fluencyScore,
  contentScore,
  feedbackItems,
  improvementAreas,
  audioUrl,
  audioWaveform = [0.3, 0.6, 0.4, 0.7, 0.5, 0.8, 0.6, 0.4, 0.5, 0.7, 0.6, 0.4, 0.3],
  onPlayAudio,
  isAudioPlaying = false,
  playbackSpeed = 1.0,
  onSpeedChange,
}) => {
  const [localIsPlaying, setLocalIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (onPlayAudio) {
      onPlayAudio();
    } else {
      setLocalIsPlaying(!localIsPlaying);
    }
  };

  const isPlaying = onPlayAudio ? isAudioPlaying : localIsPlaying;

  const getScoreColor = (score: number): string => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#3b82f6';
    return '#f59e0b';
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        gap: 3,
        height: '100%',
      }}
    >
      {/* Left Section - Scores */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        {/* Header */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
            }}
          >
            <Typography sx={{ fontSize: '20px' }}>🤖</Typography>
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '20px', md: '24px' },
              color: '#FFFFFF',
              letterSpacing: '-0.5px',
            }}
          >
            AI Evaluation
          </Typography>
        </Stack>

        {/* Overall Score */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
            borderRadius: '16px',
            p: 3,
            border: '1px solid rgba(59, 130, 246, 0.3)',
            boxShadow: '0 8px 24px rgba(59, 130, 246, 0.2)',
          }}
        >
          <CircularScore score={overallScore} />
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: '18px',
              fontWeight: 600,
              color: '#FFFFFF',
              mt: 2,
            }}
          >
            Overall Score
          </Typography>
        </Box>

        {/* Score Metrics */}
        <Stack direction="row" spacing={2}>
          <ScoreBar
            label="Pronunciation"
            score={pronunciationScore}
            color={getScoreColor(pronunciationScore)}
          />
          <ScoreBar
            label="Fluency"
            score={fluencyScore}
            color={getScoreColor(fluencyScore)}
          />
          <ScoreBar
            label="Content"
            score={contentScore}
            color={getScoreColor(contentScore)}
          />
        </Stack>

        {/* Audio Player */}
        <Box
          sx={{
            bgcolor: '#000000',
            borderRadius: '12px',
            p: 2,
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton
              onClick={handlePlayPause}
              sx={{
                width: 48,
                height: 48,
                bgcolor: '#3b82f6',
                color: '#FFFFFF',
                '&:hover': {
                  bgcolor: '#2563eb',
                },
              }}
            >
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>

            <Box sx={{ flex: 1 }}>
              <AudioWaveform waveform={audioWaveform} isPlaying={isPlaying} />
            </Box>

            <Box
              onClick={() => {
                if (onSpeedChange) {
                  const speeds = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
                  const currentIndex = speeds.indexOf(playbackSpeed);
                  const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
                  onSpeedChange(nextSpeed);
                }
              }}
              sx={{
                bgcolor: '#1a1a1a',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '8px',
                px: 2,
                py: 1,
                cursor: 'pointer',
                minWidth: '60px',
                textAlign: 'center',
                '&:hover': {
                  bgcolor: '#2a2a2a',
                  borderColor: 'rgba(59, 130, 246, 0.5)',
                },
              }}
            >
              <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#3b82f6' }}>
                {playbackSpeed} x
              </Typography>
            </Box>

            <Box
              sx={{
                bgcolor: '#1a1a1a',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                p: 1,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <VolumeUp sx={{ color: '#9ca3af', fontSize: 20 }} />
            </Box>
          </Stack>
        </Box>
      </Box>

      {/* Right Section - Feedback */}
      <Box
        sx={{
          flex: 1,
          bgcolor: '#000000',
          borderRadius: '16px',
          p: 3,
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        {/* Feedback Header */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: '20px',
            color: '#FFFFFF',
            mb: 1,
          }}
        >
          Feedback
        </Typography>

        {/* Feedback Items */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {feedbackItems.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'flex-start',
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  bgcolor: '#10b981',
                  mt: 1,
                  flexShrink: 0,
                }}
              />
              <Typography
                sx={{
                  fontSize: '15px',
                  color: '#d1d5db',
                  lineHeight: 1.6,
                }}
              >
                {item}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Areas for Improvement */}
        {improvementAreas.length > 0 && (
          <Box
            sx={{
              bgcolor: 'rgba(245, 158, 11, 0.1)',
              borderRadius: '12px',
              p: 2.5,
              border: '1px solid rgba(245, 158, 11, 0.3)',
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <Lightbulb sx={{ color: '#f59e0b', fontSize: 20 }} />
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#f59e0b',
                }}
              >
                Areas for Improvement
              </Typography>
            </Stack>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {improvementAreas.map((area, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    gap: 2,
                    alignItems: 'flex-start',
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      bgcolor: '#f59e0b',
                      mt: 1,
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: '14px',
                      color: '#fbbf24',
                      lineHeight: 1.6,
                    }}
                    dangerouslySetInnerHTML={{
                      __html: area.replace(/'([^']+)'/g, "<span style='color: #10b981'>&#39;$1&#39;</span>"),
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AIEvaluationResults;
