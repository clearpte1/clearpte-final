/**
 * CourseProgress Component
 *
 * Right sidebar showing user's course progress
 */

import React from 'react';
import { Box, Typography, LinearProgress, Button } from '@mui/material';
import { TrendingUp } from '@mui/icons-material';

interface CourseProgressProps {
  completedLessons: number;
  totalLessons: number;
}

const CourseProgress: React.FC<CourseProgressProps> = ({ completedLessons, totalLessons }) => {
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <Box
      sx={{
        bgcolor: '#1a1a1a',
        borderRadius: '12px',
        p: 3,
        boxShadow: '0 2px 12px rgba(0,0,0,0.5)',
        border: '1px solid rgba(255,255,255,0.1)',
        position: 'sticky',
        top: 80,
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: '20px',
            mb: 1,
            color: '#FFFFFF',
          }}
        >
          Your progress
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#B0B0B0',
            fontSize: '14px',
          }}
        >
          Track your learning journey
        </Typography>
      </Box>

      {/* Progress Stats */}
      <Box
        sx={{
          bgcolor: '#0a0a0a',
          borderRadius: '12px',
          p: 3,
          mb: 3,
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            fontSize: '48px',
            color: '#FFFFFF',
            mb: 1,
          }}
        >
          {completedLessons}/{totalLessons}
        </Typography>
        <Typography
          sx={{
            fontSize: '16px',
            color: '#9ca3af',
            fontWeight: 500,
          }}
        >
          Completed
        </Typography>
      </Box>

      {/* Progress Bar */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#e5e7eb',
            }}
          >
            Overall Progress
          </Typography>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#3b82f6',
            }}
          >
            {Math.round(progressPercentage)}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progressPercentage}
          sx={{
            height: 8,
            borderRadius: 4,
            bgcolor: 'rgba(255,255,255,0.1)',
            '& .MuiLinearProgress-bar': {
              bgcolor: '#3b82f6',
              borderRadius: 4,
            },
          }}
        />
      </Box>

      {/* Continue Button */}
      <Button
        variant="contained"
        fullWidth
        startIcon={<TrendingUp />}
        sx={{
          bgcolor: '#3b82f6',
          color: '#FFFFFF',
          textTransform: 'none',
          fontWeight: 600,
          py: 1.5,
          borderRadius: '10px',
          fontSize: '16px',
          mb: 2,
          '&:hover': {
            bgcolor: '#2563eb',
          },
        }}
      >
        Continue
      </Button>

      {/* Stats */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 2,
          pt: 2,
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#FFFFFF',
              mb: 0.5,
            }}
          >
            {totalLessons - completedLessons}
          </Typography>
          <Typography
            sx={{
              fontSize: '12px',
              color: '#9ca3af',
              fontWeight: 500,
            }}
          >
            Remaining
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#10b981',
              mb: 0.5,
            }}
          >
            {completedLessons}
          </Typography>
          <Typography
            sx={{
              fontSize: '12px',
              color: '#9ca3af',
              fontWeight: 500,
            }}
          >
            Done
          </Typography>
        </Box>
      </Box>

      {/* Achievement Badge */}
      {completedLessons > 0 && (
        <Box
          sx={{
            mt: 3,
            p: 2,
            bgcolor: 'rgba(59, 130, 246, 0.1)',
            borderRadius: '8px',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#3b82f6',
            }}
          >
            🎉 Great progress!
          </Typography>
          <Typography
            sx={{
              fontSize: '12px',
              color: '#60a5fa',
              mt: 0.5,
            }}
          >
            Keep up the good work
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default CourseProgress;
