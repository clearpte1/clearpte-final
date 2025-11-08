import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Stack,
  Typography,
  Alert,
  IconButton,
  Tooltip,
  Slider,
  FormControl,
  Select,
  MenuItem,
  Paper,
  Button,
  Chip
} from '@mui/material';
import { PlayArrow, Pause, Stop, VolumeUp, VolumeOff, Refresh, SkipNext, SkipPrevious } from '@mui/icons-material';
import { AudioConfig } from './AudioTypes';
import TextToSpeech from '../practice/common/TextToSpeech';

export interface DualAudioPlayerProps {
  audio: AudioConfig;
  autoPlay?: boolean;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: string) => void;
  disabled?: boolean;
  topicTitle?: string;
  questionNumber?: string;
  remainingTime?: string;
  testedCount?: number;
}

const DualAudioPlayer: React.FC<DualAudioPlayerProps> = ({
  audio,
  autoPlay = false,
  onStart,
  onEnd,
  onError,
  disabled = false,
  topicTitle = "",
  questionNumber = "",
  remainingTime = "",
  testedCount = 0
}) => {
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const shouldUseAudioUrl = Boolean(audio?.audioUrl && audio?.audioUrl.trim().length > 0);
  const audioSource = shouldUseAudioUrl ? 'url' : 'tts';

  // Format time display
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Handle progress seek
  const handleSeek = (event: Event, newValue: number | number[]) => {
    const seekProgress = Array.isArray(newValue) ? newValue[0] : newValue;
    if (audioRef.current && duration > 0) {
      const newTime = (seekProgress / 100) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(seekProgress);
    }
  };

  // Handle volume change
  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    const volumeValue = Array.isArray(newValue) ? newValue[0] : newValue;
    setVolume(volumeValue);
    setIsMuted(false);
    if (audioRef.current) {
      audioRef.current.volume = volumeValue;
    }
  };

  // Toggle mute
  const handleToggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    if (audioRef.current) {
      audioRef.current.muted = newMutedState;
    }
  };

  // Toggle playback
  const handleTogglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        setIsPaused(true);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setIsPaused(false);
          onStart?.();
        }).catch((err) => {
          setError(`Playback failed: ${err.message}`);
          onError?.(`Playback failed: ${err.message}`);
        });
      }
    }
  };

  // Handle stop
  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentTime(0);
      setProgress(0);
    }
  };

  // Setup audio element
  useEffect(() => {
    if (audioSource === 'url' && audio?.audioUrl) {
      const audioElement = new Audio(audio?.audioUrl);
      audioRef.current = audioElement;

      audioElement.addEventListener('loadstart', () => setIsLoading(true));
      audioElement.addEventListener('canplay', () => setIsLoading(false));
      audioElement.addEventListener('loadedmetadata', () => {
        setDuration(audioElement.duration);
      });
      audioElement.addEventListener('timeupdate', () => {
        setCurrentTime(audioElement.currentTime);
        setProgress((audioElement.currentTime / audioElement.duration) * 100 || 0);
      });
      audioElement.addEventListener('ended', () => {
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentTime(0);
        setProgress(0);
        onEnd?.();
      });
      audioElement.addEventListener('error', () => {
        const errorMsg = `Audio loading failed`;
        setError(errorMsg);
        onError?.(errorMsg);
        setIsLoading(false);
      });

      return () => {
        audioElement.removeEventListener('loadstart', () => {});
        audioElement.removeEventListener('canplay', () => {});
        audioElement.removeEventListener('loadedmetadata', () => {});
        audioElement.removeEventListener('timeupdate', () => {});
        audioElement.removeEventListener('ended', () => {});
        audioElement.removeEventListener('error', () => {});
        audioElement.pause();
        audioRef.current = null;
      };
    }
  }, [audioSource, audio?.audioUrl, onEnd, onError]);

  // Auto play
  useEffect(() => {
    if (autoPlay && audioRef.current && !isPlaying && !disabled) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        onStart?.();
      }).catch((err) => {
        setError(`Auto play failed: ${err.message}`);
        onError?.(`Auto play failed: ${err.message}`);
      });
    }
  }, [autoPlay, disabled, isPlaying, onStart, onError]);

  if (error) {
    return (
      <Paper sx={{ p: 2, mb: 2 }}>
        <Alert
          severity="error"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => setError(null)}
              startIcon={<Refresh />}
            >
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Paper>
    );
  }

  return (
    <Box sx={{ width: '100%', py: 1 }}>
      {(topicTitle || questionNumber) && (
        <Box sx={{ mb: 2 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center">
            <Typography variant="body1" sx={{ fontWeight: 500, color: '#333' }}>
              {questionNumber && `#${questionNumber} `}{topicTitle}
            </Typography>
            {testedCount > 0 && (
              <Box sx={{ 
                bgcolor: '#4caf50', 
                color: 'white', 
                px: 1.5, 
                py: 0.5, 
                borderRadius: 1,
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                Tested ({testedCount})
              </Box>
            )}
          </Stack>
          {remainingTime && (
            <Typography variant="body2" sx={{ color: '#ff5722', mt: 0.5 }}>
              Remain: {remainingTime}
            </Typography>
          )}
        </Box>
      )}

      {audioSource !== 'tts' && <Paper sx={{ p: 3, mb: 3, bgcolor: '#fafafa' }}>
        <Stack spacing={2}>
          {/* Timer Display */}
          <Typography variant="body1" sx={{ color: '#ff5722', mb: 2, fontWeight: 'bold' }}>
            Time: {formatTime(currentTime)}
          </Typography>

          {/* Main Controls */}
          <Stack direction="row" alignItems="center" spacing={2}>
            <Tooltip title="Play/Pause (Space)">
              <IconButton
                onClick={handleTogglePlayback}
                disabled={disabled || isLoading || !audio.audioUrl}
                sx={{
                  bgcolor: isPlaying ? '#ff5722' : '#4caf50',
                  color: 'white',
                  '&:hover': { opacity: 0.8 },
                  '&:disabled': { bgcolor: '#ccc', color: '#999' }
                }}
              >
                {isLoading ? <Refresh sx={{ animation: 'spin 1s linear infinite' }} /> : isPlaying ? <Pause /> : <PlayArrow />}
              </IconButton>
            </Tooltip>

            <Tooltip title="Stop (Esc)">
              <IconButton
                onClick={handleStop}
                disabled={!isPlaying && !isPaused}
                sx={{ color: (!isPlaying && !isPaused) ? '#ccc' : '#666' }}
              >
                <Stop />
              </IconButton>
            </Tooltip>

            <Tooltip title="Previous (Ctrl+←)">
              <IconButton
                disabled={true} // No previous functionality for single audio
                sx={{ color: '#ccc' }}
              >
                <SkipPrevious />
              </IconButton>
            </Tooltip>

            <Tooltip title="Next (Ctrl+→)">
              <IconButton
                disabled={true} // No next functionality for single audio
                sx={{ color: '#ccc' }}
              >
                <SkipNext />
              </IconButton>
            </Tooltip>
          </Stack>

          {/* Progress Bar */}
          <Box sx={{ flexGrow: 1 }}>
            <Tooltip title="Click to seek to position">
              <Slider
                value={progress}
                onChange={handleSeek}
                sx={{
                  height: 8,
                  '& .MuiSlider-thumb': {
                    height: 20,
                    width: 20,
                    backgroundColor: '#4caf50',
                  },
                  '& .MuiSlider-track': {
                    backgroundColor: '#4caf50',
                  },
                  '& .MuiSlider-rail': {
                    backgroundColor: '#e0e0e0',
                  },
                }}
                min={0}
                max={100}
                step={1}
              />
            </Tooltip>
            <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
              <Typography variant="caption" color="textSecondary">
                {formatTime(currentTime)}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {formatTime(duration)}
              </Typography>
            </Stack>
          </Box>

          {/* Volume Control */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Tooltip title="Mute (M)">
              <IconButton onClick={handleToggleMute} size="small">
                {isMuted || volume === 0 ? <VolumeOff /> : <VolumeUp />}
              </IconButton>
            </Tooltip>
            <Slider
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              sx={{ width: 100 }}
              size="small"
              min={0}
              max={1}
              step={0.01}
            />
            <Typography variant="caption" sx={{ minWidth: 40 }}>
              {Math.round((isMuted ? 0 : volume) * 100)}%
            </Typography>
          </Stack>

          {/* Status Display */}
          <Typography variant="body2" sx={{ color: '#666', textAlign: 'center' }}>
            <strong>Audio Source:</strong> {audioSource === 'url' ? 'Audio File' : 'Text-to-Speech'}
            {isPlaying && <Chip label="Playing" size="small" sx={{ ml: 1 }} color="success" />}
            {(isPaused || !isPlaying) && <Chip label="Stopped" size="small" sx={{ ml: 1 }} />}
          </Typography>
        </Stack>
      </Paper>
}
      {audioSource === 'tts' && (
        <TextToSpeech
          text={audio?.audioText}
          autoPlay={autoPlay}
          onStart={onStart}
          onEnd={onEnd}
          onError={onError}
        />
      )}

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      </Box>
  );
};

export default DualAudioPlayer;