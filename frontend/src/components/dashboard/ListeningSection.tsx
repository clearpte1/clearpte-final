import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

interface ListeningSectionProps {
  score?: string;
}

const ListeningSection: React.FC<ListeningSectionProps> = ({ score = '55/90' }) => {
  const leftTasks = [
    'Summarize Spoken Text',
    'Fill in the Blanks',
    'Multiple Choice (Multiple Answer)',
    'Highlight Incorrect Words',
  ];

  const rightTasks = [
    'Multiple Choice (Single Answer)',
    'Highlight Correct Summary',
    'Select Missing Word',
    'Write From Dictation',
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
          color: '#F44336',
          mb: 0.5,
        }}
      >
        Listening
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

export default ListeningSection;
