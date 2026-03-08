import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

interface WritingSectionProps {
  score?: string;
}

const WritingSection: React.FC<WritingSectionProps> = ({ score = '55/90' }) => {
  const tasks = [
    'Summarize Written Text',
    'Write Essay',
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
          color: '#E91E63',
          mb: 0.5,
        }}
      >
        Writing
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
      <Box>
        {tasks.map((task, index) => (
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
    </Paper>
  );
};

export default WritingSection;
