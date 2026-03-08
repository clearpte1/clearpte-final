/**
 * CoursePage Component
 *
 * Main course page displaying Grammar Course with:
 * - Left sidebar: Quick outline of all modules
 * - Center: Course syllabus with expandable sections
 * - Right sidebar: Progress tracking
 */

import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import QuickOutline from './QuickOutline';
import CourseSyllabus from './CourseSyllabus';
import CourseProgress from './CourseProgress';
import { CourseModule, Lesson } from './types';

// Mock data - replace with API call
const mockModules: CourseModule[] = [
  {
    id: '1',
    title: 'Parts of Speech',
    lessonsCount: 9,
    duration: 18,
    lessons: [
      { id: '1-1', title: 'Nouns', duration: 3, completed: false, locked: false },
      { id: '1-2', title: 'Pronouns', duration: 2, completed: false, locked: false },
      { id: '1-3', title: 'Verbs', duration: 3, completed: false, locked: false },
      { id: '1-4', title: 'Adjectives', duration: 2, completed: false, locked: true },
      { id: '1-5', title: 'Adverbs', duration: 2, completed: false, locked: true },
      { id: '1-6', title: 'Prepositions', duration: 2, completed: false, locked: true },
      { id: '1-7', title: 'Conjunctions', duration: 2, completed: false, locked: true },
      { id: '1-8', title: 'Interjections', duration: 1, completed: false, locked: true },
      { id: '1-9', title: 'Articles', duration: 1, completed: false, locked: true },
    ],
  },
  {
    id: '2',
    title: 'Sentence Structure',
    lessonsCount: 5,
    duration: 15,
    lessons: [
      { id: '2-1', title: 'Simple Sentences', duration: 3, completed: false, locked: true },
      { id: '2-2', title: 'Compound Sentences', duration: 3, completed: false, locked: true },
      { id: '2-3', title: 'Complex Sentences', duration: 3, completed: false, locked: true },
      { id: '2-4', title: 'Compound-Complex Sentences', duration: 3, completed: false, locked: true },
      { id: '2-5', title: 'Sentence Fragments', duration: 3, completed: false, locked: true },
    ],
  },
  {
    id: '3',
    title: 'Punctuation',
    lessonsCount: 8,
    duration: 16,
    lessons: [],
  },
  {
    id: '4',
    title: 'Subject-Verb Agreement',
    lessonsCount: 6,
    duration: 12,
    lessons: [],
  },
  {
    id: '5',
    title: 'Tenses',
    lessonsCount: 12,
    duration: 24,
    lessons: [],
  },
  {
    id: '6',
    title: 'Active and Passive Voice',
    lessonsCount: 4,
    duration: 8,
    lessons: [],
  },
  {
    id: '7',
    title: 'Direct and Indirect Speech',
    lessonsCount: 5,
    duration: 10,
    lessons: [],
  },
  {
    id: '8',
    title: 'Clauses and Phrases',
    lessonsCount: 7,
    duration: 14,
    lessons: [],
  },
  {
    id: '9',
    title: 'Common Grammar Mistakes',
    lessonsCount: 10,
    duration: 20,
    lessons: [],
  },
  {
    id: '10',
    title: 'Writing Style and Tone',
    lessonsCount: 6,
    duration: 12,
    lessons: [],
  },
  {
    id: '11',
    title: 'Advanced Grammar Topics',
    lessonsCount: 8,
    duration: 16,
    lessons: [],
  },
];

const CoursePage: React.FC = () => {
  const [modules, setModules] = useState<CourseModule[]>(mockModules);
  const [selectedModuleId, setSelectedModuleId] = useState<string>('1');

  // Calculate progress
  const totalLessons = modules.reduce((sum, module) => sum + module.lessonsCount, 0);
  const completedLessons = modules.reduce(
    (sum, module) => sum + (module.lessons?.filter(l => l.completed).length || 0),
    0
  );

  const handleModuleSelect = (moduleId: string) => {
    setSelectedModuleId(moduleId);
  };

  const handleLessonComplete = (moduleId: string, lessonId: string) => {
    setModules(prevModules =>
      prevModules.map(module =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons?.map(lesson =>
                lesson.id === lessonId ? { ...lesson, completed: true } : lesson
              ),
            }
          : module
      )
    );
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#000000',
        pt: 3,
        pb: 6,
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            flexDirection: { xs: 'column', lg: 'row' },
          }}
        >
          {/* Left Sidebar - Quick Outline */}
          <Box
            sx={{
              width: { xs: '100%', lg: '280px' },
              flexShrink: 0,
            }}
          >
            <QuickOutline
              modules={modules}
              selectedModuleId={selectedModuleId}
              onModuleSelect={handleModuleSelect}
            />
          </Box>

          {/* Center - Course Syllabus */}
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
            }}
          >
            <CourseSyllabus
              modules={modules}
              onLessonComplete={handleLessonComplete}
            />
          </Box>

          {/* Right Sidebar - Progress */}
          <Box
            sx={{
              width: { xs: '100%', lg: '300px' },
              flexShrink: 0,
            }}
          >
            <CourseProgress
              completedLessons={completedLessons}
              totalLessons={totalLessons}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CoursePage;
