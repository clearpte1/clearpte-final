import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

interface ReadingSectionProps {
  score?: string;
}

const ReadingSection: React.FC<ReadingSectionProps> = ({ score = '64/90' }) => {
  const leftTasks = [
    'Fill in the Blanks (Dropdown)',
    'Multiple Choice (Single Answer)',
    'Re-order Paragraphs',
  ];

  const rightTasks = [
    'Multiple Choice (Multiple Answer)',
    'Fill in the Blanks (Drag & Drop)',
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        background: '#1a1a1a',
        borderRadius: 2,
        height: '100%',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: '#2196F3',
          mb: 0.5,
        }}
      >
        Reading
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          color: '#B0B0B0',
          mb: 2,
        }}
      >
        Score: {score}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 4,
        }}
      >
        <Box sx={{ flex: 1 }}>
          {leftTasks.map((task, index) => (
            <Typography
              key={index}
              sx={{
                color: '#FFFFFF',
                fontSize: '0.9rem',
                mb: 1,
                '&::before': {
                  content: '"•"',
                  marginRight: '8px',
                },
              }}
            >
              {task}
            </Typography>
          ))}
        </Box>
        <Box sx={{ flex: 1 }}>
          {rightTasks.map((task, index) => (
            <Typography
              key={index}
              sx={{
                color: '#FFFFFF',
                fontSize: '0.9rem',
                mb: 1,
                '&::before': {
                  content: '"•"',
                  marginRight: '8px',
                },
              }}
            >
              {task}
            </Typography>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default ReadingSection;
