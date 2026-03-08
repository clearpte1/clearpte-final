/**
 * LessonItem Component
 *
 * Individual lesson item with title, duration, and status
 */

import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { PlayCircleFilled, CheckCircle, Lock } from '@mui/icons-material';
import { Lesson } from './types';

interface LessonItemProps {
  lesson: Lesson;
  moduleId: string;
  onLessonComplete: (moduleId: string, lessonId: string) => void;
}

const LessonItem: React.FC<LessonItemProps> = ({ lesson, moduleId, onLessonComplete }) => {
  const handleClick = () => {
    if (!lesson.locked && !lesson.completed) {
      onLessonComplete(moduleId, lesson.id);
    }
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 2,
        px: 2,
        borderRadius: '8px',
        cursor: lesson.locked ? 'not-allowed' : 'pointer',
        opacity: lesson.locked ? 0.5 : 1,
        '&:hover': {
          bgcolor: lesson.locked ? 'transparent' : 'rgba(255,255,255,0.05)',
        },
        transition: 'all 0.2s',
      }}
    >
      {/* Left: Icon and Title */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
        {/* Status Icon */}
        {lesson.locked ? (
          <Lock sx={{ color: '#9ca3af', fontSize: 20 }} />
        ) : lesson.completed ? (
          <CheckCircle sx={{ color: '#10b981', fontSize: 24 }} />
        ) : (
          <PlayCircleFilled sx={{ color: '#3b82f6', fontSize: 24 }} />
        )}

        {/* Lesson Title */}
        <Typography
          sx={{
            fontSize: '15px',
            fontWeight: 500,
            color: lesson.locked ? '#6b7280' : lesson.completed ? '#10b981' : '#FFFFFF',
          }}
        >
          {lesson.title}
        </Typography>
      </Box>

      {/* Right: Duration */}
      <Typography
        sx={{
          fontSize: '14px',
          color: '#9ca3af',
          fontWeight: 500,
        }}
      >
        {lesson.duration} min
      </Typography>
    </Box>
  );
};

export default LessonItem;
