import React from 'react';
import { Box, Typography, Stack, LinearProgress, Alert, Button as MuiButton } from '@mui/material';
import { Mic, MicOff, PlayArrow, Stop } from '@mui/icons-material';
import { Button } from '../../common/Button';

interface RecordingAnswerContentProps {
  // Recording state
  isRecording: boolean;
  recordedBlob: Blob | null;
  recordedAudioUrl: string | null;
  micPermission: boolean | null;

  // Preparation state
  showPreparationTimer?: boolean;
  preparationTime?: number | null;
  showRecordingPrompt?: boolean;

  // Recording time
  recordingTime: number; // in seconds
  recordingTimeLeft?: number | null;

  // Handlers
  onToggleRecording: () => void;
  onStartPreparation?: () => void;

  // Display options
  recordingType?: string; // "answer", "reading", "lecture", etc.
  showPreparationButton?: boolean;
  preparationButtonText?: string;

  // Helper
  formatTime?: (seconds: number) => string;
}

/**
 * RecordingAnswerContent Component
 *
 * A styled recording interface for practice questions.
 * Includes preparation timer, recording controls, playback of recorded audio,
 * and visual feedback during recording.
 *
 * Dark-themed and fully responsive.
 */
const RecordingAnswerContent: React.FC<RecordingAnswerContentProps> = ({
  isRecording,
  recordedBlob,
  recordedAudioUrl,
  micPermission,
  showPreparationTimer = false,
  preparationTime = null,
  showRecordingPrompt = false,
  recordingTime,
  recordingTimeLeft = null,
  onToggleRecording,
  onStartPreparation,
  recordingType = "answer",
  showPreparationButton = false,
  preparationButtonText = "Start Preparation Timer",
  formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  },
}) => {
  // Calculate recording progress if recording
  const recordingProgress =
    isRecording && recordingTimeLeft !== null
      ? ((recordingTime - recordingTimeLeft) / recordingTime) * 100
      : 0;

  return (
    <Box>
      {/* Microphone Permission Error */}
      {micPermission === false && (
        <Alert severity="error" sx={{ mb: 2, bgcolor: '#ff572220', color: '#ff5722' }}>
          <strong>Microphone Permission Denied</strong>
          <br />
          Please enable microphone access in your browser settings to record your {recordingType}.
        </Alert>
      )}

      {/* Preparation Timer Display */}
      {showPreparationTimer && preparationTime !== null && preparationTime > 0 && (
        <Box
          sx={{
            mb: 3,
            p: 2,
            bgcolor: '#ff980020',
            borderRadius: 2,
            border: '1px solid #ff9800',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" sx={{ color: '#ff9800', fontWeight: 'bold' }}>
            Preparation Time
          </Typography>
          <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 'bold', mt: 1 }}>
            {formatTime(preparationTime)}
          </Typography>
          <Typography variant="caption" sx={{ color: '#B0B0B0' }}>
            Prepare before recording
          </Typography>
        </Box>
      )}

      {/* Recording Prompt */}
      {showRecordingPrompt && (
        <Alert severity="success" sx={{ mb: 2, bgcolor: '#4caf5020', color: '#4caf50' }}>
          <strong>✓ Ready to Record</strong>
          <br />
          Click "Start Recording" to begin!
        </Alert>
      )}

      {/* Preparation Button (optional) */}
      {showPreparationButton && onStartPreparation && preparationTime === null && (
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <MuiButton
            variant="contained"
            onClick={onStartPreparation}
            sx={{
              bgcolor: '#4caf50',
              color: 'white',
              px: 4,
              py: 1.5,
              fontSize: '16px',
              fontWeight: 'bold',
              textTransform: 'none',
              borderRadius: 2,
              '&:hover': {
                bgcolor: '#388e3c',
              },
            }}
          >
            {preparationButtonText}
          </MuiButton>
        </Box>
      )}

      {/* Recording Controls */}
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Box
          sx={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {/* Recording Button */}
          <Button
            variant="contained"
            color={isRecording ? 'error' : 'primary'}
            size="large"
            startIcon={isRecording ? <MicOff /> : <Mic />}
            onClick={onToggleRecording}
            disabled={micPermission === false || (preparationTime !== null && preparationTime > 0)}
            sx={{
              minWidth: 200,
              py: 1.5,
              fontSize: '16px',
              fontWeight: 'bold',
              bgcolor: isRecording ? '#ff5722' : '#4caf50',
              '&:hover': {
                bgcolor: isRecording ? '#e64a19' : '#388e3c',
              },
              '&:disabled': {
                bgcolor: '#666',
                color: '#999',
              },
            }}
          >
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Button>

          {/* Recording Status */}
          {isRecording && (
            <Box sx={{ width: '100%' }}>
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mb: 1 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: '#ff5722',
                    animation: 'pulse 1.5s ease-in-out infinite',
                    '@keyframes pulse': {
                      '0%': { opacity: 1 },
                      '50%': { opacity: 0.4 },
                      '100%': { opacity: 1 },
                    },
                  }}
                />
                <Typography variant="body2" sx={{ color: '#ff5722', fontWeight: 'bold' }}>
                  Recording...
                </Typography>
              </Stack>

              {recordingTimeLeft !== null && (
                <Box>
                  <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                    {formatTime(recordingTimeLeft)}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={recordingProgress}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: 'rgba(255,255,255,0.1)',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: '#ff5722',
                        borderRadius: 4,
                      },
                      mt: 1,
                    }}
                  />
                  <Typography variant="caption" sx={{ color: '#B0B0B0', mt: 0.5, display: 'block' }}>
                    Recording time remaining
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>

      {/* Recording Info */}
      {!isRecording && !recordedBlob && (
        <Box
          sx={{
            p: 2,
            bgcolor: '#2a2a2a',
            borderRadius: 2,
            border: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: '#B0B0B0', mb: 1 }}>
            Recording Status
          </Typography>
          <Typography variant="body1" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
            {micPermission === null
              ? 'Checking microphone...'
              : micPermission === false
              ? 'Microphone access denied'
              : preparationTime !== null && preparationTime > 0
              ? 'Preparation in progress...'
              : 'Ready to record'}
          </Typography>
          <Typography variant="caption" sx={{ color: '#B0B0B0', display: 'block', mt: 1 }}>
            Maximum recording time: {formatTime(recordingTime)}
          </Typography>
        </Box>
      )}

      {/* Recorded Audio Playback */}
      {recordedAudioUrl && recordedBlob && (
        <Box
          sx={{
            mt: 3,
            p: 2,
            bgcolor: '#4caf5020',
            borderRadius: 2,
            border: '1px solid #4caf50',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: '#4caf50',
              fontWeight: 'bold',
              mb: 1.5,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <PlayArrow sx={{ fontSize: 20 }} />
            Your Recorded {recordingType.charAt(0).toUpperCase() + recordingType.slice(1)}
          </Typography>
          <audio
            controls
            src={recordedAudioUrl}
            style={{
              width: '100%',
              height: 40,
              borderRadius: 8,
            }}
          >
            Your browser does not support the audio element.
          </audio>
          <Typography variant="caption" sx={{ color: '#B0B0B0', display: 'block', mt: 1 }}>
            Audio size: {(recordedBlob.size / 1024).toFixed(2)} KB
          </Typography>
        </Box>
      )}

      {/* Helper Text */}
      {!recordedBlob && micPermission === true && !isRecording && (
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: '#B0B0B0' }}>
            💡 Tip: Speak clearly and at a natural pace. The recording will automatically stop after {formatTime(recordingTime)}.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default RecordingAnswerContent;
