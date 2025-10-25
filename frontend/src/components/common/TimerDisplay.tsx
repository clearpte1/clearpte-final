import React from 'react';
import {
  Box,
  Paper,
  Stack,
  Typography,
  Chip,
  useTheme
} from '@mui/material';
import { Timer } from '@mui/icons-material';

export interface TimerDisplayProps {
  timeRemaining: number;
  isRunning: boolean;
  warningThreshold?: number;
  showStartMessage?: boolean;
  startMessage?: string;
  autoSubmit?: boolean;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({
  timeRemaining,
  isRunning,
  warningThreshold = 30,
  showStartMessage = false,
  startMessage = "Timer will start when you begin",
  autoSubmit = true
}) => {
  const theme = useTheme();
  const isWarning = timeRemaining <= warningThreshold;

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Paper sx={{ 
      p: 2, 
      mb: 3, 
      bgcolor: isWarning ? '#ffebee' : '#e3f2fd',
      border: `1px solid ${isWarning ? '#f44336' : '#2196f3'}`,
      borderRadius: 2
    }}>
      <Stack direction="row" alignItems="center" spacing={2} flexWrap="wrap">
        <Timer sx={{ 
          color: isWarning ? '#f44336' : '#2196f3',
          fontSize: { xs: '20px', sm: '24px' }
        }} />
        
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 'bold',
            color: isWarning ? '#f44336' : '#2196f3',
            fontSize: { xs: '16px', sm: '18px', md: '20px' }
          }}
        >
          Time: {formatTime(timeRemaining)}
        </Typography>
        
        {isWarning && (
          <Chip 
            label="Hurry Up!" 
            color="error" 
            size="small"
            sx={{ animation: 'pulse 1s infinite' }}
          />
        )}
        
        {showStartMessage && !isRunning && (
          <Chip 
            label={startMessage} 
            color="info" 
            size="small" 
            variant="outlined"
          />
        )}
        
        {autoSubmit && timeRemaining <= warningThreshold && (
          <Chip 
            label="Auto-submit enabled" 
            color="warning" 
            size="small" 
            variant="outlined"
          />
        )}
      </Stack>
    </Paper>
  );
};

export default TimerDisplay;