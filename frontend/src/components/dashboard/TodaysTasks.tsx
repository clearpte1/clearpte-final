import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

interface Task {
  title: string;
  subtitle?: string;
  points: number;
}

interface TodaysTasksProps {
  tasks?: Task[];
  day?: string;
}

const TodaysTasks: React.FC<TodaysTasksProps> = ({
  tasks,
  day = 'Tue',
}) => {
  const defaultTasks: Task[] = tasks || [
    {
      title: '10 × Repeat Sentence',
      subtitle: '(strict AI scoring)',
      points: 20,
    },
    {
      title: '1 × Full Speaking Mock',
      subtitle: '(record & review)',
      points: 20,
    },
    {
      title: 'Reading FIB + Re-order Set',
      subtitle: 'Practice set',
      points: 25,
    },
    {
      title: '5 × Write From Dictation',
      subtitle: '10 min',
      points: 10,
    },
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: '#FFFFFF',
          }}
        >
          Today's Tasks
        </Typography>
        <Typography
          sx={{
            color: '#B0B0B0',
            fontSize: '0.9rem',
          }}
        >
          For {day}
        </Typography>
      </Box>
      <Box>
        {defaultTasks.map((task, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mb: 2,
              pb: 2,
              borderBottom: index !== defaultTasks.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  color: '#FFFFFF',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  mb: 0.5,
                  '&::before': {
                    content: '"•"',
                    marginRight: '8px',
                  },
                }}
              >
                {task.title}
              </Typography>
              {task.subtitle && (
                <Typography
                  sx={{
                    color: '#B0B0B0',
                    fontSize: '0.8rem',
                    ml: 2.5,
                  }}
                >
                  {task.subtitle}
                </Typography>
              )}
            </Box>
            <Typography
              sx={{
                color: '#B0B0B0',
                fontSize: '1.1rem',
                fontWeight: 600,
                minWidth: '40px',
                textAlign: 'right',
              }}
            >
              {task.points}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default TodaysTasks;
