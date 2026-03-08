import React from 'react';
import { Box, Typography, Paper, Stack, IconButton, Slider, LinearProgress } from '@mui/material';
import { PlayArrow, Pause, VolumeUp, Speed } from '@mui/icons-material';

interface AudioQuestionContentProps {
  // Audio playback state
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackSpeed?: number;

  // Audio controls
  onTogglePlayback: () => void;
  onVolumeChange: (event: Event, newValue: number | number[]) => void;
  onSpeedChange?: (event: Event, newValue: number | number[]) => void;
  onSeek?: (event: Event, newValue: number | number[]) => void;

  // Display options
  showTranscript?: boolean;
  transcript?: string;
  voiceInfo?: string;
  audioError?: string | null;

  // Helpers
  formatTime: (seconds: number) => string;
}

/**
 * AudioQuestionContent Component
 *
 * A styled audio player specifically designed for practice questions.
 * Includes playback controls, progress bar, volume control, speed control,
 * and optional transcript display.
 *
 * Dark-themed and fully responsive.
 */
const AudioQuestionContent: React.FC<AudioQuestionContentProps> = ({
  isPlaying,
  currentTime,
  duration,
  volume,
  playbackSpeed = 1.0,
  onTogglePlayback,
  onVolumeChange,
  onSpeedChange,
  onSeek,
  showTranscript = false,
  transcript,
  voiceInfo = "Blake (US)",
  audioError,
  formatTime,
}) => {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <Box>
      {/* Audio Player Controls */}
      <Paper
        sx={{
          p: 3,
          bgcolor: '#2a2a2a',
          borderRadius: 2,
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
      >
        {/* Play/Pause Button */}
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <IconButton
            onClick={onTogglePlayback}
            disabled={audioError !== null}
            sx={{
              bgcolor: isPlaying ? '#ff5722' : '#4caf50',
              color: 'white',
              width: 56,
              height: 56,
              '&:hover': {
                bgcolor: isPlaying ? '#e64a19' : '#388e3c',
              },
              '&:disabled': {
                bgcolor: '#666',
                color: '#999',
              },
            }}
          >
            {isPlaying ? <Pause sx={{ fontSize: 32 }} /> : <PlayArrow sx={{ fontSize: 32 }} />}
          </IconButton>

          {/* Progress Bar */}
          <Box sx={{ flexGrow: 1 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: 'rgba(255,255,255,0.1)',
                '& .MuiLinearProgress-bar': {
                  bgcolor: '#4caf50',
                  borderRadius: 4,
                },
              }}
              onClick={(e) => {
                if (onSeek && duration > 0) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const percentage = clickX / rect.width;
                  onSeek(e.nativeEvent, percentage * duration);
                }
              }}
            />
            <Stack direction="row" justifyContent="space-between" sx={{ mt: 0.5 }}>
              <Typography variant="caption" sx={{ color: '#B0B0B0', fontSize: '11px' }}>
                {formatTime(currentTime)}
              </Typography>
              <Typography variant="caption" sx={{ color: '#B0B0B0', fontSize: '11px' }}>
                {formatTime(duration)}
              </Typography>
            </Stack>
          </Box>
        </Stack>

        {/* Volume and Speed Controls */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent="space-between"
        >
          {/* Volume Control */}
          <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: 200 }}>
            <VolumeUp sx={{ color: '#B0B0B0', fontSize: 20 }} />
            <Slider
              value={volume}
              onChange={onVolumeChange}
              min={0}
              max={100}
              step={1}
              sx={{
                color: '#4caf50',
                '& .MuiSlider-thumb': {
                  width: 16,
                  height: 16,
                },
              }}
            />
            <Typography variant="caption" sx={{ color: '#B0B0B0', minWidth: 40 }}>
              {Math.round(volume)}%
            </Typography>
          </Stack>

          {/* Speed Control */}
          {onSpeedChange && (
            <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: 180 }}>
              <Speed sx={{ color: '#B0B0B0', fontSize: 20 }} />
              <Slider
                value={playbackSpeed}
                onChange={onSpeedChange}
                min={0.5}
                max={2.0}
                step={0.25}
                marks
                sx={{
                  color: '#2196f3',
                  '& .MuiSlider-thumb': {
                    width: 16,
                    height: 16,
                  },
                }}
              />
              <Typography variant="caption" sx={{ color: '#B0B0B0', minWidth: 40 }}>
                {playbackSpeed.toFixed(2)}x
              </Typography>
            </Stack>
          )}

          {/* Voice Info */}
          <Typography
            variant="caption"
            sx={{
              color: '#B0B0B0',
              fontSize: '12px',
              fontStyle: 'italic',
            }}
          >
            {voiceInfo}
          </Typography>
        </Stack>

        {/* Error Display */}
        {audioError && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ color: '#ff5722' }}>
              ⚠️ {audioError}
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Transcript (Optional) */}
      {showTranscript && transcript && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            bgcolor: '#2a2a2a',
            borderRadius: 2,
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: '#B0B0B0',
              fontSize: '11px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              mb: 1,
              display: 'block',
            }}
          >
            Transcript
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#FFFFFF',
              fontSize: '14px',
              lineHeight: 1.6,
            }}
          >
            {transcript}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default AudioQuestionContent;
