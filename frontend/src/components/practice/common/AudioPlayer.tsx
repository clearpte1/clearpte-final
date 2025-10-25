import React from 'react';
import { 
  Paper, 
  Stack, 
  IconButton, 
  Box, 
  LinearProgress, 
  Typography, 
  Slider 
} from '@mui/material';
import { PlayArrow, Pause, VolumeUp } from '@mui/icons-material';
import { BaseTopic } from './types';

interface AudioPlayerProps {
  selectedTopic: BaseTopic;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  audioError: string | null;
  onTogglePlayback: () => void;
  onVolumeChange: (event: Event, newValue: number | number[]) => void;
  formatTime: (seconds: number) => string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  selectedTopic,
  isPlaying,
  currentTime,
  duration,
  volume,
  audioError,
  onTogglePlayback,
  onVolumeChange,
  formatTime,
}) => {
  return (
    <>
      <Typography variant="body1" sx={{ color: '#ff5722', mb: 2, fontWeight: 'bold' }}>
        Time: {formatTime(currentTime)}
      </Typography>

      <Paper sx={{ p: 3, mb: 3, bgcolor: '#fafafa' }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <IconButton
            onClick={onTogglePlayback}
            sx={{
              bgcolor: isPlaying ? '#ff5722' : '#4caf50',
              color: 'white',
              '&:hover': { bgcolor: isPlaying ? '#e64a19' : '#388e3c' },
            }}
          >
            {isPlaying ? <Pause /> : <PlayArrow />}
          </IconButton>

          <Box sx={{ flexGrow: 1 }}>
            <LinearProgress
              variant="determinate"
              value={(currentTime / duration) * 100}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: '#e0e0e0',
                '& .MuiLinearProgress-bar': {
                  bgcolor: '#4caf50',
                },
              }}
            />
            <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
              <Typography variant="caption" color="textSecondary">
                {formatTime(currentTime)}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {formatTime(duration)}
              </Typography>
            </Stack>
          </Box>

          <Stack direction="row" alignItems="center" spacing={1}>
            <VolumeUp />
            <Slider
              value={volume}
              onChange={onVolumeChange}
              sx={{ width: 100 }}
              size="small"
              min={0}
              max={100}
              step={1}
            />
            <Typography variant="caption" sx={{ minWidth: 40 }}>
              X{(volume / 100).toFixed(1)}
            </Typography>
            <Typography variant="caption" sx={{ color: '#666' }}>
              Blake (US)
            </Typography>
          </Stack>
        </Stack>

        <Typography variant="body2" sx={{ color: '#666', textAlign: 'center' }}>
          <strong>Current {selectedTopic.type === 'lecture' ? 'Topic' : 'Question'}:</strong>{' '}
          {selectedTopic.title} by {selectedTopic.speaker} (Difficulty: {selectedTopic.difficulty})
        </Typography>
      </Paper>
    </>
  );
};

export default AudioPlayer;