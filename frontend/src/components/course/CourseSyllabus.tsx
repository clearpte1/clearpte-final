/**
 * CourseSyllabus Component
 *
 * Main content area showing expandable course sections with lessons
 */

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Stack,
} from '@mui/material';
import { ExpandMore, PlayCircleOutline, Assignment } from '@mui/icons-material';
import { CourseModule } from './types';
import LessonItem from './LessonItem';

interface CourseSyllabusProps {
  modules: CourseModule[];
  onLessonComplete: (moduleId: string, lessonId: string) => void;
}

const CourseSyllabus: React.FC<CourseSyllabusProps> = ({ modules, onLessonComplete }) => {
  const [expanded, setExpanded] = useState<string>('1');

  const handleAccordionChange = (moduleId: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? moduleId : '');
  };

  return (
    <Box
      sx={{
        bgcolor: '#1a1a1a',
        borderRadius: '12px',
        p: 4,
        boxShadow: '0 2px 12px rgba(0,0,0,0.5)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: '32px',
            mb: 1,
            color: '#FFFFFF',
          }}
        >
          Grammar Course
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#B0B0B0',
            fontSize: '16px',
          }}
        >
          Master English grammar with comprehensive lessons and practice exercises
        </Typography>
      </Box>

      {/* Course Syllabus Title */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          fontSize: '24px',
          mb: 3,
          color: '#FFFFFF',
        }}
      >
        Course syllabus
      </Typography>

      {/* Modules */}
      <Box sx={{ mb: 2 }}>
        {modules
          .filter(module => module.lessons && module.lessons.length > 0)
          .map((module) => (
            <Accordion
              key={module.id}
              expanded={expanded === module.id}
              onChange={handleAccordionChange(module.id)}
              sx={{
                mb: 2,
                borderRadius: '12px !important',
                border: '1px solid rgba(255,255,255,0.1)',
                bgcolor: '#0a0a0a',
                boxShadow: 'none',
                '&:before': {
                  display: 'none',
                },
                '&.Mui-expanded': {
                  margin: '0 0 16px 0',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore sx={{ color: '#FFFFFF' }} />}
                sx={{
                  px: 3,
                  py: 2,
                  '&.Mui-expanded': {
                    minHeight: '64px',
                  },
                  '& .MuiAccordionSummary-content': {
                    margin: '12px 0',
                    '&.Mui-expanded': {
                      margin: '12px 0',
                    },
                  },
                }}
              >
                <Box sx={{ width: '100%' }}>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: '18px',
                      color: '#FFFFFF',
                      mb: 0.5,
                    }}
                  >
                    {module.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      color: '#9ca3af',
                    }}
                  >
                    {module.lessonsCount} lessons • {module.duration} min
                  </Typography>
                </Box>
              </AccordionSummary>

              <AccordionDetails
                sx={{
                  px: 3,
                  py: 2,
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  bgcolor: '#000000',
                }}
              >
                {/* Lessons */}
                <Box sx={{ mb: 3 }}>
                  {module.lessons?.map((lesson) => (
                    <LessonItem
                      key={lesson.id}
                      lesson={lesson}
                      moduleId={module.id}
                      onLessonComplete={onLessonComplete}
                    />
                  ))}
                </Box>

                {/* Action Buttons */}
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    startIcon={<PlayCircleOutline />}
                    sx={{
                      bgcolor: '#3b82f6',
                      color: '#FFFFFF',
                      textTransform: 'none',
                      fontWeight: 600,
                      px: 3,
                      py: 1,
                      borderRadius: '8px',
                      '&:hover': {
                        bgcolor: '#2563eb',
                      },
                    }}
                  >
                    Open lessons
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Assignment />}
                    sx={{
                      color: '#3b82f6',
                      borderColor: '#3b82f6',
                      textTransform: 'none',
                      fontWeight: 600,
                      px: 3,
                      py: 1,
                      borderRadius: '8px',
                      '&:hover': {
                        borderColor: '#2563eb',
                        bgcolor: '#eff6ff',
                      },
                    }}
                  >
                    Practice
                  </Button>
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}
      </Box>
    </Box>
  );
};

export default CourseSyllabus;
