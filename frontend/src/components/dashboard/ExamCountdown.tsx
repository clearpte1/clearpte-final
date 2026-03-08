import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';

interface ExamCountdownProps {
  examDate?: Date;
}

const ExamCountdown: React.FC<ExamCountdownProps> = ({ examDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 30,
    hours: 12,
    minutes: 0,
  });

  useEffect(() => {
    if (!examDate) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = examDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examDate]);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        background: '#1a1a1a',
        borderRadius: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: '#FFFFFF',
          mb: 3,
        }}
      >
        Exam Countdown
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          mb: 3,
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              color: '#FFFFFF',
              fontSize: '3.5rem',
              lineHeight: 1,
            }}
          >
            {timeLeft.days.toString().padStart(2, '0')}
          </Typography>
          <Typography
            sx={{
              color: '#B0B0B0',
              fontSize: '0.9rem',
              mt: 1,
            }}
          >
            Days
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              color: '#FFFFFF',
              fontSize: '3.5rem',
              lineHeight: 1,
            }}
          >
            {timeLeft.hours.toString().padStart(2, '0')}
          </Typography>
          <Typography
            sx={{
              color: '#B0B0B0',
              fontSize: '0.9rem',
              mt: 1,
            }}
          >
            Hours
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              color: '#FFFFFF',
              fontSize: '3.5rem',
              lineHeight: 1,
            }}
          >
            {timeLeft.minutes.toString().padStart(2, '0')}
          </Typography>
          <Typography
            sx={{
              color: '#B0B0B0',
              fontSize: '0.9rem',
              mt: 1,
            }}
          >
            Minutes
          </Typography>
        </Box>
      </Box>
      <Typography
        sx={{
          color: '#B0B0B0',
          fontSize: '0.85rem',
          textAlign: 'center',
          mt: 'auto',
        }}
      >
        Stay aligned. Listening practice and mock tests intensify as you approach exam day.
      </Typography>
    </Paper>
  );
};

export default ExamCountdown;
