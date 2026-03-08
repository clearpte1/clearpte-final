/**
 * EXAMPLE: Answer Short Questions Implementation
 * Using UnifiedPracticeLayout + Helper Components
 *
 * This example demonstrates how to recreate the UI shown in the screenshot
 * using the new unified layout and helper components.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Dialog } from '@mui/material';
import UnifiedPracticeLayout from './UnifiedPracticeLayout';
import AudioQuestionContent from './AudioQuestionContent';
import RecordingAnswerContent from './RecordingAnswerContent';
import { Button } from '../../common/Button';
import { AnswerDialog, TranslationDialog, TopicSelectionDrawer } from '../../common';

// ============================================================================
// EXAMPLE COMPONENT
// ============================================================================

interface AnswerShortQuestionsExampleProps {
  user?: any;
}

const instructionsSections = [
  {
    title: 'Task Overview',
    items: ['Listen to the question and provide a concise answer in your own words.'],
  },
  {
    title: 'Time Allocation',
    items: ['Preparation time: 3 seconds', 'Recording time: 10 seconds'],
  },
  {
    title: 'Tips',
    items: [
      'Listen carefully to the question',
      'Answer directly and concisely',
      'Use simple and clear language',
      "Don't overthink the response",
    ],
  },
  {
    title: 'Scoring',
    items: [
      'Content: Relevance and accuracy',
      'Pronunciation: Clear speech',
      'Fluency: Natural flow',
    ],
  },
];

const AnswerShortQuestionsExample: React.FC<AnswerShortQuestionsExampleProps> = ({ user }) => {
  // ============================================================================
  // STATE
  // ============================================================================
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions] = useState([
    {
      id: 1,
      title: 'What is the capital of France?',
      audioText: 'What is the capital of France?',
      audioUrl: '/audio/question1.mp3',
      difficulty: 'Beginner' as const,
      category: 'Geography',
      tags: ['Geography', 'Capitals', 'Europe'],
      expectedAnswer: 'Paris',
      preparationTime: 3,
      recordingTime: 10,
    },
  ]);

  const selectedQuestion = questions[currentQuestionIndex];

  const [questionNumber] = useState(655);
  const [studentName] = useState('Rachel Carson');
  const [testedCount] = useState(33);
  const [completedQuestions] = useState(5);

  // Dialog states
  const [showAnswer, setShowAnswer] = useState(false);
  const [showTranslate, setShowTranslate] = useState(false);
  const [showTopicSelector, setShowTopicSelector] = useState(false);
  const [showAttempts, setShowAttempts] = useState(false);

  // Audio player state
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(45); // example duration
  const [volume, setVolume] = useState(70);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

  // Recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [micPermission, setMicPermission] = useState<boolean | null>(true);
  const [preparationTime, setPreparationTime] = useState<number | null>(null);
  const [recordingTimeLeft, setRecordingTimeLeft] = useState<number | null>(null);
  const [showRecordingPrompt, setShowRecordingPrompt] = useState(false);

  // Timer state
  const [timer, setTimer] = useState({
    timeRemaining: selectedQuestion.preparationTime,
    isRunning: false,
    warningThreshold: 1,
    autoSubmit: false,
  });

  // ============================================================================
  // HELPER FUNCTIONS
  // ============================================================================
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // ============================================================================
  // AUDIO HANDLERS
  // ============================================================================
  const handleToggleAudioPlayback = () => {
    setIsAudioPlaying(!isAudioPlaying);
    // Start preparation timer when audio ends
    if (isAudioPlaying) {
      // Audio stopped, start preparation
      setPreparationTime(selectedQuestion.preparationTime);
      setTimer((prev) => ({ ...prev, isRunning: true }));
    }
  };

  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  const handleSpeedChange = (event: Event, newValue: number | number[]) => {
    setPlaybackSpeed(newValue as number);
  };

  const handleAudioSeek = (event: Event, newValue: number | number[]) => {
    setCurrentTime(newValue as number);
  };

  // ============================================================================
  // RECORDING HANDLERS
  // ============================================================================
  const handleToggleRecording = async () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordingTimeLeft(selectedQuestion.recordingTime);
      // Simulate recording
      setTimeout(() => {
        setIsRecording(false);
        setRecordedBlob(new Blob([], { type: 'audio/webm' }));
        setRecordedAudioUrl('blob:http://example.com/audio');
        setRecordingTimeLeft(null);
      }, 3000); // 3 seconds for demo
    } else {
      setIsRecording(false);
      setRecordingTimeLeft(null);
    }
  };

  // ============================================================================
  // ACTION HANDLERS
  // ============================================================================
  const handleSubmit = () => {
    if (!recordedBlob) {
      alert('Please record your answer before submitting.');
      return;
    }
    alert('Answer submitted!');
    handleRedo();
  };

  const handleRedo = () => {
    setRecordedBlob(null);
    setRecordedAudioUrl(null);
    setIsRecording(false);
    setRecordingTimeLeft(null);
    setPreparationTime(null);
    setShowRecordingPrompt(false);
  };

  // ============================================================================
  // NAVIGATION HANDLERS
  // ============================================================================
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSearch = () => {
    setShowTopicSelector(true);
  };

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <>
      <UnifiedPracticeLayout
        // Header props
        icon="ASQ"
        title="Speaking: Answer Short Question"
        subtitle={`Progress: ${completedQuestions}/${questions.length} questions attempted`}
        instructions={`You will hear a short question. After listening to the question, in ${selectedQuestion.preparationTime} seconds, please speak into the microphone and provide a concise answer in your own words. You will have ${selectedQuestion.recordingTime} seconds to give your response.`}
        difficulty={selectedQuestion.difficulty}
        instructionsConfig={{
          sections: instructionsSections,
          size: 'medium',
          color: 'primary',
          tooltipTitle: 'View detailed instructions for Answer Short Questions',
        }}

        // Question header
        questionNumber={questionNumber}
        studentName={studentName}
        testedCount={testedCount}

        // Timer
        showTimer={preparationTime !== null}
        timerProps={{
          timeRemaining: timer.timeRemaining,
          isRunning: timer.isRunning,
          warningThreshold: timer.warningThreshold,
          autoSubmit: timer.autoSubmit,
          showStartMessage: false,
        }}

        // Layout
        layoutMode="two-column"

        // Left section: Audio Question
        leftSection={{
          title: 'Audio Question',
          showAudioInfo: true,
          audioInfo: {
            time: formatTime(currentTime),
            voice: 'Blake (US)',
          },
          content: (
            <AudioQuestionContent
              isPlaying={isAudioPlaying}
              currentTime={currentTime}
              duration={duration}
              volume={volume}
              playbackSpeed={playbackSpeed}
              onTogglePlayback={handleToggleAudioPlayback}
              onVolumeChange={handleVolumeChange}
              onSpeedChange={handleSpeedChange}
              onSeek={handleAudioSeek}
              showTranscript={true}
              transcript={selectedQuestion.audioText}
              voiceInfo="Blake (US)"
              formatTime={formatTime}
            />
          ),
        }}

        // Right section: Record Your Answer
        rightSection={{
          title: 'Record Your Answer',
          subtitle: preparationTime !== null && preparationTime > 0
            ? `Preparation time: ${preparationTime}s remaining`
            : isRecording
            ? 'Recording in progress...'
            : recordedBlob
            ? 'Recording completed'
            : 'Click "Start Recording" when ready',
          content: (
            <RecordingAnswerContent
              isRecording={isRecording}
              recordedBlob={recordedBlob}
              recordedAudioUrl={recordedAudioUrl}
              micPermission={micPermission}
              showPreparationTimer={false}
              preparationTime={preparationTime}
              showRecordingPrompt={showRecordingPrompt}
              recordingTime={selectedQuestion.recordingTime}
              recordingTimeLeft={recordingTimeLeft}
              onToggleRecording={handleToggleRecording}
              recordingType="answer"
              formatTime={formatTime}
            />
          ),
        }}

        // Action buttons
        actionButtonsProps={{
          recordedBlob: recordedBlob,
          onSubmit: handleSubmit,
          onRedo: handleRedo,
          onTranslate: () => setShowTranslate(true),
          onShowAnswer: () => setShowAnswer(true),
          handleViewAttempts: () => setShowAttempts(true),
        }}

        // Navigation
        navigationProps={{
          onSearch: handleSearch,
          onPrevious: handlePrevious,
          onNext: handleNext,
          questionNumber: questionNumber,
        }}

        // Additional content (optional - score display, etc.)
        additionalContent={
          <Box
            sx={{
              p: 2,
              bgcolor: '#1a1a1a',
              borderRadius: 2,
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
              💡 Your answer will be evaluated for content, pronunciation, and fluency.
            </Typography>
          </Box>
        }
      />

      {/* Dialogs */}
      <AnswerDialog
        open={showAnswer}
        onClose={() => setShowAnswer(false)}
        title={selectedQuestion.title}
        text={selectedQuestion.audioText}
        answers={[
          {
            id: '1',
            position: 1,
            correctAnswer: selectedQuestion.expectedAnswer,
          },
        ]}
      />

      <TranslationDialog
        open={showTranslate}
        onClose={() => setShowTranslate(false)}
        description="Translation feature will help you understand the question content in your preferred language."
      />

      <TopicSelectionDrawer
        open={showTopicSelector}
        onClose={() => setShowTopicSelector(false)}
        onSelect={(topic: any) => {
          setCurrentQuestionIndex(questions.findIndex((q) => q.id === topic.id));
          setShowTopicSelector(false);
        }}
        topics={questions as any[]}
        title="Select Question Topic"
        type="question"
      />
    </>
  );
};

export default AnswerShortQuestionsExample;

// ============================================================================
// KEY DIFFERENCES FROM OLD APPROACH
// ============================================================================

/**
 * OLD APPROACH (Before):
 * - Manually create Grid layout
 * - Manually style Paper components
 * - Repeat styling for each practice type
 * - Inconsistent dark theme colors
 * - Mix of light and dark components
 * - Harder to maintain consistency
 *
 * NEW APPROACH (Now):
 * - Use UnifiedPracticeLayout wrapper
 * - Use AudioQuestionContent helper
 * - Use RecordingAnswerContent helper
 * - Consistent dark theme everywhere
 * - Reusable across all practice types
 * - Easy to maintain and update
 * - Much less code duplication
 *
 * BENEFITS:
 * ✅ Reduced code by ~40%
 * ✅ Consistent UI across all practice types
 * ✅ Dark theme by default
 * ✅ Responsive layout handled automatically
 * ✅ Easy to customize via props
 * ✅ Better maintainability
 * ✅ Type-safe with TypeScript
 */
