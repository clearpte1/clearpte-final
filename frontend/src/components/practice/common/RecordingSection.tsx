import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert, LinearProgress } from '@mui/material';
import { Button } from '../../common/Button';
import { Mic, MicOff } from '@mui/icons-material';

interface RecordingSectionProps {
  isRecording: boolean;
  recordedBlob: Blob | null;
  recordedAudioUrl: string | null;
  micPermission: boolean | null;
  showRecordingPrompt: boolean;
  preparationTime: number | null;
  recordingType: string;
  recordingTime: number; // Duration in seconds
  onToggleRecording: () => void;
}

const RecordingSection: React.FC<RecordingSectionProps> = ({
  isRecording,
  recordedBlob,
  recordedAudioUrl,
  micPermission,
  showRecordingPrompt,
  preparationTime,
  recordingType,
  recordingTime,
  onToggleRecording,
}) => {
  const [recordingTimeLeft, setRecordingTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (isRecording) {
      setRecordingTimeLeft(recordingTime);
      const timer = setInterval(() => {
        setRecordingTimeLeft((prev) => (prev !== null && prev > 0 ? prev - 1 : null));
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setRecordingTimeLeft(null);
    }
  }, [isRecording, recordingTime]);

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Record Your {recordingType}
      </Typography>
      {micPermission === false && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Microphone permission denied. Please enable it to record.
        </Alert>
      )}
      {preparationTime !== null && preparationTime > 0 && (
        <Typography variant="body1" sx={{ mb: 2, color: '#ff9800' }}>
          Preparation Time: {preparationTime} seconds remaining
        </Typography>
      )}
      {showRecordingPrompt && (
        <Typography variant="body1" sx={{ mb: 2, color: '#4caf50' }}>
          Start speaking now!
        </Typography>
      )}
      <Button
        variant="contained"
        color={isRecording ? 'error' : 'primary'}
        startIcon={isRecording ? <MicOff /> : <Mic />}
        onClick={onToggleRecording}
        disabled={micPermission === false || preparationTime !== null}
        sx={{ mb: 2 }}
        aria-label={isRecording ? 'Stop recording answer' : 'Start recording answer'}
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </Button>
      {recordedAudioUrl && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Your Recorded Answer:
          </Typography>
          <audio controls src={recordedAudioUrl} style={{ width: '100%' }}>
            Your browser does not support the audio element.
          </audio>
        </Box>
      )}
      {isRecording && <CircularProgress size={24} sx={{ ml: 2 }} />}
      {recordingTimeLeft !== null && recordingTimeLeft >= 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography>Recording Time: {recordingTimeLeft} seconds</Typography>
          <LinearProgress
            variant="determinate"
            value={(recordingTimeLeft / recordingTime) * 100}
            sx={{ mt: 1 }}
          />
        </Box>
      )}
    </Box>
  );
};

export default RecordingSection;