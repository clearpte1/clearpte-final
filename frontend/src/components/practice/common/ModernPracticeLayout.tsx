import React, { ReactNode } from 'react';
import { Box, Typography, IconButton, Slider, Stack, Container } from '@mui/material';
import { PlayArrow, Pause, VolumeUp } from '@mui/icons-material';
import AIEvaluationResults from './AIEvaluationResults';
import RecordingSection from './RecordingSection';

export interface ModernPracticeLayoutProps {
  // Header section
  icon: string;
  title: string;
  progress: string;
  instructions: string;
  time: string;
  timeRunning?: boolean;
  difficulty: 'Beginner' | 'Intermediate' | 'Hard';
  questionInfo: string;

  // Audio section
  audioTime: string;
  audioTotal: string;
  audioCurrentTime: number;
  audioDuration: number;
  isAudioPlaying: boolean;
  playbackSpeed: number;
  volume: number;
  onAudioPlayPause: () => void;
  onAudioSeek: (value: number) => void;
  onSpeedChange: (value: number) => void;
  onVolumeChange: (value: number) => void;
  audioVoiceInfo: string;

  // Recording section - using RecordingSection component
  recordingSectionProps?: {
    isRecording: boolean;
    recordedBlob: Blob | null;
    recordedAudioUrl: string | null;
    micPermission: boolean | null;
    showRecordingPrompt: boolean;
    preparationTime: number | null;
    recordingType: string;
    recordingTime: number;
    onToggleRecording: () => void;
  };

  // Legacy recording props (kept for backward compatibility)
  recordingButtonText?: string;
  recordingStatus?: string;
  isRecording?: boolean;
  onStartRecording?: () => void;
  onSubmit: () => void;
  onShowAnswer: () => void;
  submitDisabled?: boolean;

  // Results section (shown after submit)
  showResults?: boolean;
  resultScore?: number;
  resultTotal?: number;
  resultFeedback?: string;
  resultStatus?: 'excellent' | 'good' | 'needsImprovement';
  onTryAgain?: () => void;

  // AI Evaluation (advanced results - shown when useAIEvaluation is true)
  useAIEvaluation?: boolean;
  aiOverallScore?: number;
  aiPronunciationScore?: number;
  aiFluencyScore?: number;
  aiContentScore?: number;
  aiFeedbackItems?: string[];
  aiImprovementAreas?: string[];
  aiAudioUrl?: string;
  aiAudioWaveform?: number[];
  aiAudioPlaying?: boolean;
  aiPlaybackSpeed?: number;
  onAIPlayAudio?: () => void;
  onAISpeedChange?: (speed: number) => void;

  // Navigation
  onPrevious: () => void;
  onRedo: () => void;
  onNext: () => void;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
}

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

const DifficultyBadge: React.FC<{ difficulty: 'Beginner' | 'Intermediate' | 'Hard' }> = ({ difficulty }) => {
  const styles = {
    Beginner: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
    },
    Intermediate: {
      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)',
    },
    Hard: {
      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)',
    },
  };

  return (
    <Box
      sx={{
        px: 2,
        py: 0.5,
        ...styles[difficulty],
        borderRadius: '16px',
        fontWeight: 700,
        fontSize: '12px',
        color: '#FFFFFF',
        letterSpacing: '0.5px',
        border: '1px solid rgba(255,255,255,0.1)',
        transition: 'all 0.2s',
      }}
    >
      {difficulty}
    </Box>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const ModernPracticeLayout: React.FC<ModernPracticeLayoutProps> = ({
  icon,
  title,
  progress,
  instructions,
  time,
  timeRunning = false,
  difficulty,
  questionInfo,
  audioTime,
  audioTotal,
  audioCurrentTime,
  audioDuration,
  isAudioPlaying,
  playbackSpeed,
  volume,
  onAudioPlayPause,
  onAudioSeek,
  onSpeedChange,
  onVolumeChange,
  audioVoiceInfo,
  recordingSectionProps,
  recordingButtonText = 'Start Recording',
  recordingStatus = 'Recording status',
  isRecording = false,
  onStartRecording = () => {},
  onSubmit,
  onShowAnswer,
  submitDisabled = false,
  showResults = false,
  resultScore = 0,
  resultTotal = 10,
  resultFeedback = '',
  resultStatus = 'good',
  onTryAgain,
  useAIEvaluation = false,
  aiOverallScore = 90,
  aiPronunciationScore = 90,
  aiFluencyScore = 90,
  aiContentScore = 90,
  aiFeedbackItems = [],
  aiImprovementAreas = [],
  aiAudioUrl,
  aiAudioWaveform,
  aiAudioPlaying = false,
  aiPlaybackSpeed = 1.0,
  onAIPlayAudio,
  onAISpeedChange,
  onPrevious,
  onRedo,
  onNext,
  previousDisabled = false,
  nextDisabled = false,
}) => {
  return (
    <Box
      sx={{
        height: 'calc(100vh - 80px)',
        bgcolor: '#000000',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        py: { xs: 1.5, md: 2 },
        px: { xs: 2, sm: 3 },
      }}
    >
      <Container maxWidth="xl" disableGutters sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header Section */}
        <Box sx={{ mb: 2, flexShrink: 0 }}>
          {/* Icon and Title */}
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1.5 }}>
            <Box
              sx={{
                bgcolor: '#1a1a1a',
                borderRadius: '12px',
                px: 2,
                py: 1,
                fontWeight: 700,
                fontSize: '16px',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
              }}
            >
              {icon}
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '24px', md: '28px' },
                letterSpacing: '-0.5px',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #E0E0E0 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {title}
            </Typography>
          </Stack>

          {/* Progress and Info Row */}
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            alignItems={{ xs: 'flex-start', md: 'center' }}
            justifyContent="space-between"
            spacing={{ xs: 1, md: 0 }}
            sx={{ mb: 1.5 }}
          >
            <Box>
              <Typography
                variant="body1"
                sx={{
                  color: '#9ca3af',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                <span style={{ fontWeight: 700, color: '#FFFFFF' }}>Progress:</span> {progress}
              </Typography>
            </Box>

            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              flexWrap="wrap"
              sx={{ gap: { xs: 1.5, md: 2 } }}
            >
              {/* Time */}
              <Stack direction="row" alignItems="center" spacing={1}>
                {timeRunning && (
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      bgcolor: '#10b981',
                      borderRadius: '50%',
                      boxShadow: '0 0 12px rgba(16, 185, 129, 0.6)',
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                      '@keyframes pulse': {
                        '0%, 100%': {
                          opacity: 1,
                        },
                        '50%': {
                          opacity: 0.5,
                        },
                      },
                    }}
                  />
                )}
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: '14px',
                    color: '#FFFFFF',
                  }}
                >
                  Time {time}
                </Typography>
              </Stack>

              {/* Difficulty */}
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography sx={{ color: '#9ca3af', fontSize: '14px', fontWeight: 500 }}>
                  Difficulty
                </Typography>
                <DifficultyBadge difficulty={difficulty} />
              </Stack>

              {/* Question Info */}
              <Typography sx={{ color: '#9ca3af', fontSize: '14px', fontWeight: 500 }}>
                {questionInfo}
              </Typography>
            </Stack>
          </Stack>

          {/* Instructions */}
          <Box
            sx={{
              bgcolor: '#0a0a0a',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '10px',
              p: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            <Typography
              sx={{
                color: '#d1d5db',
                fontSize: '14px',
                lineHeight: 1.5,
                fontWeight: 400,
              }}
            >
              {instructions}
            </Typography>
          </Box>
        </Box>

        {/* Two-Column Layout */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            gap: 2,
            flex: 1,
            overflow: 'hidden',
            minHeight: 0,
          }}
        >
          {/* Left Column - Audio Question */}
          <Box
            sx={{
              flex: 1,
              bgcolor: '#0a0a0a',
              borderRadius: '16px',
              p: { xs: 2, md: 3 },
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              '&:hover': {
                boxShadow: '0 12px 48px rgba(0,0,0,0.8)',
                borderColor: 'rgba(255,255,255,0.12)',
              },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '18px', md: '22px' },
                mb: 2,
                color: '#FFFFFF',
                letterSpacing: '-0.5px',
                flexShrink: 0,
              }}
            >
              Audio Question
            </Typography>

            {/* Time Display */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                mb: 2,
                px: 2,
                py: 1.5,
                bgcolor: '#000000',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.05)',
                flexShrink: 0,
              }}
            >
              <Typography
                sx={{
                  color: '#f59e0b',
                  fontWeight: 700,
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    width: 6,
                    height: 6,
                    bgcolor: '#f59e0b',
                    borderRadius: '50%',
                    display: 'inline-block',
                  }}
                />
                Time: {audioTime}
              </Typography>
              <Typography sx={{ color: '#9ca3af', fontSize: '14px', fontWeight: 600 }}>
                Total: {audioTotal}
              </Typography>
            </Stack>

            {/* Audio Player */}
            <Box
              sx={{
                bgcolor: '#000000',
                borderRadius: '12px',
                p: 2.5,
                mb: 2,
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.4)',
                flexShrink: 0,
              }}
            >
              {/* Progress Bar */}
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2.5 }}>
                <Typography
                  sx={{
                    color: '#9ca3af',
                    fontSize: '12px',
                    minWidth: '40px',
                    fontWeight: 600,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {audioTime}
                </Typography>
                <Slider
                  value={audioCurrentTime}
                  max={audioDuration}
                  onChange={(_, value) => onAudioSeek(value as number)}
                  sx={{
                    color: '#3b82f6',
                    height: 5,
                    '& .MuiSlider-thumb': {
                      width: 14,
                      height: 14,
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 2px 8px rgba(59, 130, 246, 0.4)',
                      '&:hover, &.Mui-focusVisible': {
                        boxShadow: '0 0 0 8px rgba(59, 130, 246, 0.16)',
                      },
                    },
                    '& .MuiSlider-track': {
                      border: 'none',
                      background: 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)',
                    },
                    '& .MuiSlider-rail': {
                      bgcolor: '#1a1a1a',
                      opacity: 1,
                    },
                  }}
                />
                <Typography
                  sx={{
                    color: '#9ca3af',
                    fontSize: '12px',
                    minWidth: '40px',
                    fontWeight: 600,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {audioTotal}
                </Typography>
              </Stack>

              {/* Controls */}
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                {/* Play Button */}
                <IconButton
                  onClick={onAudioPlayPause}
                  sx={{
                    width: 56,
                    height: 56,
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#FFFFFF',
                    boxShadow: '0 4px 16px rgba(16, 185, 129, 0.4)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                      boxShadow: '0 6px 24px rgba(16, 185, 129, 0.5)',
                      transform: 'scale(1.05)',
                    },
                    '&:active': {
                      transform: 'scale(0.98)',
                    },
                  }}
                >
                  {isAudioPlaying ? <Pause sx={{ fontSize: 28 }} /> : <PlayArrow sx={{ fontSize: 28 }} />}
                </IconButton>

                {/* Speed Control */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ color: '#9ca3af', fontSize: '13px', fontWeight: 600 }}>
                    Speed
                  </Typography>
                  <Box
                    onClick={() => {
                      const speeds = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
                      const currentIndex = speeds.indexOf(playbackSpeed);
                      const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
                      onSpeedChange(nextSpeed);
                    }}
                    sx={{
                      bgcolor: '#1a1a1a',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      px: 2,
                      py: 1,
                      cursor: 'pointer',
                      minWidth: '60px',
                      textAlign: 'center',
                      fontWeight: 700,
                      fontSize: '14px',
                      color: '#FFFFFF',
                      transition: 'all 0.2s',
                      '&:hover': {
                        bgcolor: '#2a2a2a',
                        borderColor: 'rgba(255,255,255,0.2)',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                      },
                      '&:active': {
                        transform: 'translateY(0)',
                      },
                    }}
                  >
                    {playbackSpeed}×
                  </Box>
                </Box>

                {/* Volume Control */}
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography sx={{ color: '#9ca3af', fontSize: '13px', fontWeight: 600 }}>
                    Volume
                  </Typography>
                  <Box
                    sx={{
                      bgcolor: '#1a1a1a',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      p: 1,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <VolumeUp sx={{ color: '#9ca3af', fontSize: 20 }} />
                  </Box>
                </Stack>
              </Stack>
            </Box>

            {/* Voice Info */}
            <Box
              sx={{
                bgcolor: '#000000',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '8px',
                px: 2,
                py: 1.5,
                flexShrink: 0,
              }}
            >
              <Typography sx={{ color: '#9ca3af', fontSize: '12px', fontWeight: 500 }}>
                <span style={{ fontWeight: 700, color: '#FFFFFF' }}>Text-to-Speech:</span>{' '}
                {audioVoiceInfo}
              </Typography>
            </Box>
          </Box>

          {/* Right Column - Record Your Answer */}
          <Box
            sx={{
              flex: 1,
              bgcolor: '#0a0a0a',
              borderRadius: '16px',
              p: { xs: 2, md: 3 },
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                boxShadow: '0 12px 48px rgba(0,0,0,0.8)',
                borderColor: 'rgba(255,255,255,0.12)',
              },
            }}
          >
            {/* Conditional Content: AI Evaluation, Simple Results, or Recording Interface */}
            {showResults && useAIEvaluation ? (
              // AI Evaluation Display
              <Box sx={{ height: '100%', overflow: 'auto', py: 1 }}>
                <AIEvaluationResults
                  overallScore={aiOverallScore}
                  pronunciationScore={aiPronunciationScore}
                  fluencyScore={aiFluencyScore}
                  contentScore={aiContentScore}
                  feedbackItems={aiFeedbackItems}
                  improvementAreas={aiImprovementAreas}
                  audioUrl={aiAudioUrl}
                  audioWaveform={aiAudioWaveform}
                  isAudioPlaying={aiAudioPlaying}
                  onPlayAudio={onAIPlayAudio}
                  playbackSpeed={aiPlaybackSpeed}
                  onSpeedChange={onAISpeedChange}
                />
              </Box>
            ) : (
              <>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '18px', md: '22px' },
                    mb: 2,
                    color: '#FFFFFF',
                    letterSpacing: '-0.5px',
                    flexShrink: 0,
                  }}
                >
                  {showResults ? 'Your Results' : 'Record Your Answer'}
                </Typography>

                {showResults ? (
                  // Simple Results Display
                  <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {/* Score Display */}
                <Box
                  sx={{
                    bgcolor: '#000000',
                    borderRadius: '16px',
                    p: 3,
                    mb: 2.5,
                    border: '2px solid',
                    borderColor:
                      resultStatus === 'excellent' ? '#10b981' :
                      resultStatus === 'good' ? '#3b82f6' :
                      '#f59e0b',
                    boxShadow:
                      resultStatus === 'excellent' ? '0 8px 24px rgba(16, 185, 129, 0.3)' :
                      resultStatus === 'good' ? '0 8px 24px rgba(59, 130, 246, 0.3)' :
                      '0 8px 24px rgba(245, 158, 11, 0.3)',
                  }}
                >
                  {/* Status Badge */}
                  <Box
                    sx={{
                      display: 'inline-block',
                      px: 3,
                      py: 1,
                      borderRadius: '20px',
                      mb: 2.5,
                      background:
                        resultStatus === 'excellent' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' :
                        resultStatus === 'good' ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' :
                        'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      boxShadow:
                        resultStatus === 'excellent' ? '0 4px 12px rgba(16, 185, 129, 0.4)' :
                        resultStatus === 'good' ? '0 4px 12px rgba(59, 130, 246, 0.4)' :
                        '0 4px 12px rgba(245, 158, 11, 0.4)',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                      }}
                    >
                      {resultStatus === 'excellent' ? '🎉 Excellent!' :
                       resultStatus === 'good' ? '👍 Good Job!' :
                       '💡 Keep Practicing!'}
                    </Typography>
                  </Box>

                  {/* Score */}
                  <Typography
                    sx={{
                      fontSize: { xs: '42px', md: '52px' },
                      fontWeight: 800,
                      color: '#FFFFFF',
                      textAlign: 'center',
                      mb: 1,
                      lineHeight: 1,
                    }}
                  >
                    {resultScore}/{resultTotal}
                  </Typography>

                  {/* Percentage */}
                  <Typography
                    sx={{
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#9ca3af',
                      textAlign: 'center',
                      mb: 2,
                    }}
                  >
                    {Math.round((resultScore / resultTotal) * 100)}% Score
                  </Typography>

                  {/* Feedback */}
                  {resultFeedback && (
                    <Box
                      sx={{
                        bgcolor: '#0a0a0a',
                        borderRadius: '10px',
                        p: 2,
                        border: '1px solid rgba(255,255,255,0.05)',
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '14px',
                          color: '#d1d5db',
                          textAlign: 'center',
                          lineHeight: 1.6,
                        }}
                      >
                        {resultFeedback}
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* Action Buttons */}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  {onTryAgain && (
                    <Box
                      onClick={onTryAgain}
                      sx={{
                        flex: 1,
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        borderRadius: '10px',
                        py: 1.5,
                        px: 2,
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)',
                        },
                        '&:active': {
                          transform: 'translateY(0)',
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: '15px',
                          color: '#FFFFFF',
                          letterSpacing: '0.5px',
                        }}
                      >
                        Try Again
                      </Typography>
                    </Box>
                  )}

                  <Box
                    onClick={onShowAnswer}
                    sx={{
                      flex: 1,
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      borderRadius: '10px',
                      py: 1.5,
                      px: 2,
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: '0 4px 16px rgba(245, 158, 11, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(245, 158, 11, 0.4)',
                      },
                      '&:active': {
                        transform: 'translateY(0)',
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: '15px',
                        color: '#FFFFFF',
                        letterSpacing: '0.5px',
                      }}
                    >
                      Show Answer
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            ) : (
              // Recording Interface
              <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {recordingSectionProps ? (
                  // Use RecordingSection component with modern styling wrapper
                  <Box
                    sx={{
                      '& .MuiTypography-h6': {
                        display: 'none', // Hide default title as we have it in the column header
                      },
                      '& .MuiButton-root': {
                        background: recordingSectionProps.isRecording
                          ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                          : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: '#FFFFFF',
                        borderRadius: '12px',
                        py: 3,
                        px: 2,
                        fontSize: { xs: '18px', md: '20px' },
                        fontWeight: 800,
                        letterSpacing: '0.5px',
                        boxShadow: recordingSectionProps.isRecording
                          ? '0 8px 24px rgba(239, 68, 68, 0.4)'
                          : '0 8px 24px rgba(16, 185, 129, 0.4)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        border: 'none',
                        '&:hover': {
                          background: recordingSectionProps.isRecording
                            ? 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)'
                            : 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                          transform: 'translateY(-2px)',
                          boxShadow: recordingSectionProps.isRecording
                            ? '0 12px 32px rgba(239, 68, 68, 0.5)'
                            : '0 12px 32px rgba(16, 185, 129, 0.5)',
                        },
                        '&:active': {
                          transform: 'translateY(0)',
                        },
                      },
                      '& audio': {
                        width: '100%',
                        bgcolor: '#000000',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.1)',
                      },
                      '& .MuiAlert-root': {
                        bgcolor: '#1a0000',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#ef4444',
                      },
                      '& .MuiCircularProgress-root': {
                        color: '#10b981',
                      },
                      '& .MuiLinearProgress-root': {
                        bgcolor: '#1a1a1a',
                        borderRadius: '4px',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: '#10b981',
                        },
                      },
                    }}
                  >
                    <RecordingSection {...recordingSectionProps} />
                  </Box>
                ) : (
                  // Legacy recording interface
                  <>
                    <Box
                      onClick={onStartRecording}
                      sx={{
                        background: isRecording
                          ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                          : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        borderRadius: '12px',
                        py: 3,
                        px: 2,
                        textAlign: 'center',
                        cursor: 'pointer',
                        mb: 2.5,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: isRecording
                          ? '0 8px 24px rgba(239, 68, 68, 0.4)'
                          : '0 8px 24px rgba(16, 185, 129, 0.4)',
                        border: '2px solid transparent',
                        '&:hover': {
                          background: isRecording
                            ? 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)'
                            : 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                          transform: 'translateY(-2px)',
                          boxShadow: isRecording
                            ? '0 12px 32px rgba(239, 68, 68, 0.5)'
                            : '0 12px 32px rgba(16, 185, 129, 0.5)',
                        },
                        '&:active': {
                          transform: 'translateY(0)',
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 800,
                          fontSize: { xs: '18px', md: '20px' },
                          color: '#FFFFFF',
                          letterSpacing: '0.5px',
                        }}
                      >
                        {recordingButtonText}
                      </Typography>
                    </Box>

                    {/* Recording Status */}
                    <Box
                      sx={{
                        bgcolor: '#000000',
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: '10px',
                        py: 2,
                        px: 2,
                        mb: 2.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#9ca3af',
                          fontSize: '14px',
                          textAlign: 'center',
                          fontWeight: 600,
                        }}
                      >
                        {recordingStatus}
                      </Typography>
                    </Box>
                  </>
                )}

                {/* Action Buttons */}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Box
                    onClick={submitDisabled ? undefined : onSubmit}
                    sx={{
                      flex: 1,
                      background: submitDisabled
                        ? '#1a1a1a'
                        : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                      borderRadius: '10px',
                      py: 1.5,
                      px: 2,
                      textAlign: 'center',
                      cursor: submitDisabled ? 'not-allowed' : 'pointer',
                      opacity: submitDisabled ? 0.4 : 1,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: submitDisabled ? 'none' : '0 4px 16px rgba(59, 130, 246, 0.3)',
                      border: '1px solid',
                      borderColor: submitDisabled ? 'rgba(255,255,255,0.05)' : 'transparent',
                      '&:hover': {
                        background: submitDisabled
                          ? '#1a1a1a'
                          : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                        transform: submitDisabled ? 'none' : 'translateY(-2px)',
                        boxShadow: submitDisabled ? 'none' : '0 6px 20px rgba(59, 130, 246, 0.4)',
                      },
                      '&:active': {
                        transform: submitDisabled ? 'none' : 'translateY(0)',
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: '15px',
                        color: '#FFFFFF',
                        letterSpacing: '0.5px',
                      }}
                    >
                      Submit
                    </Typography>
                  </Box>

                  <Box
                    onClick={onShowAnswer}
                    sx={{
                      flex: 1,
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      borderRadius: '10px',
                      py: 1.5,
                      px: 2,
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: '0 4px 16px rgba(245, 158, 11, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(245, 158, 11, 0.4)',
                      },
                      '&:active': {
                        transform: 'translateY(0)',
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: '15px',
                        color: '#FFFFFF',
                        letterSpacing: '0.5px',
                      }}
                    >
                      Show Answer
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            )}
          </>
        )}
          </Box>
        </Box>

        {/* Bottom Navigation */}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{
            maxWidth: '750px',
            mx: 'auto',
            mt: 2,
            flexShrink: 0,
          }}
        >
          <Box
            onClick={previousDisabled ? undefined : onPrevious}
            sx={{
              bgcolor: '#1a1a1a',
              border: '1px solid',
              borderColor: previousDisabled ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
              borderRadius: '10px',
              px: 3,
              py: 1.5,
              cursor: previousDisabled ? 'not-allowed' : 'pointer',
              opacity: previousDisabled ? 0.4 : 1,
              minWidth: '120px',
              textAlign: 'center',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              '&:hover': {
                bgcolor: previousDisabled ? '#1a1a1a' : '#2a2a2a',
                borderColor: previousDisabled ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.15)',
                transform: previousDisabled ? 'none' : 'translateY(-2px)',
                boxShadow: previousDisabled ? '0 2px 8px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.4)',
              },
              '&:active': {
                transform: previousDisabled ? 'none' : 'translateY(0)',
              },
            }}
          >
            <Typography sx={{ fontWeight: 700, fontSize: '14px', color: '#FFFFFF' }}>
              Previous
            </Typography>
          </Box>

          <Box
            onClick={onRedo}
            sx={{
              bgcolor: '#1a1a1a',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px',
              px: 3,
              py: 1.5,
              cursor: 'pointer',
              minWidth: '120px',
              textAlign: 'center',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              '&:hover': {
                bgcolor: '#2a2a2a',
                borderColor: 'rgba(255,255,255,0.15)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
              },
              '&:active': {
                transform: 'translateY(0)',
              },
            }}
          >
            <Typography sx={{ fontWeight: 700, fontSize: '14px', color: '#FFFFFF' }}>
              Re-do
            </Typography>
          </Box>

          <Box
            onClick={nextDisabled ? undefined : onNext}
            sx={{
              bgcolor: '#1a1a1a',
              border: '1px solid',
              borderColor: nextDisabled ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
              borderRadius: '10px',
              px: 3,
              py: 1.5,
              cursor: nextDisabled ? 'not-allowed' : 'pointer',
              opacity: nextDisabled ? 0.4 : 1,
              minWidth: '120px',
              textAlign: 'center',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              '&:hover': {
                bgcolor: nextDisabled ? '#1a1a1a' : '#2a2a2a',
                borderColor: nextDisabled ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.15)',
                transform: nextDisabled ? 'none' : 'translateY(-2px)',
                boxShadow: nextDisabled ? '0 2px 8px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.4)',
              },
              '&:active': {
                transform: nextDisabled ? 'none' : 'translateY(0)',
              },
            }}
          >
            <Typography sx={{ fontWeight: 700, fontSize: '14px', color: '#FFFFFF' }}>Next</Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default ModernPracticeLayout;
