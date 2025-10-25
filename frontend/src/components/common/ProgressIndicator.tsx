import React from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  useTheme
} from '@mui/material';

export interface ProgressIndicatorProps {
  current: number;
  total: number;
  label?: string;
  variant?: 'linear' | 'circular';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  height?: number;
  showPercentage?: boolean;
  customLabel?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  current,
  total,
  label = "Progress",
  variant = 'linear',
  color = 'success',
  height = 8,
  showPercentage = false,
  customLabel
}) => {
  const theme = useTheme();
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
  
  const getColorValue = () => {
    switch (color) {
      case 'primary': return theme.palette.primary.main;
      case 'secondary': return theme.palette.secondary.main;
      case 'success': return theme.palette.success.main;
      case 'warning': return theme.palette.warning.main;
      case 'error': return theme.palette.error.main;
      case 'info': return theme.palette.info.main;
      default: return theme.palette.success.main;
    }
  };

  const displayText = customLabel || `${current} of ${total} ${label.toLowerCase()}`;

  return (
    <Box sx={{ mb: 3 }}>
      <Typography 
        variant="body2" 
        color="textSecondary" 
        sx={{ 
          mb: 1,
          fontSize: { xs: '12px', sm: '14px' }
        }}
      >
        {displayText}
        {showPercentage && ` (${percentage}%)`}
      </Typography>
      
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: height,
          borderRadius: height / 2,
          bgcolor: theme.palette.grey[200],
          '& .MuiLinearProgress-bar': {
            bgcolor: getColorValue(),
            borderRadius: height / 2,
            transition: 'transform 0.4s ease-in-out',
          },
        }}
      />
    </Box>
  );
};

export default ProgressIndicator;