import React, { ReactNode } from 'react';
import { Box, Stack, Typography, Paper } from '@mui/material';
import PracticeCardWithInstructionsPopover from '../../common/PracticeCardWithInstructionsPopover';
import QuestionHeader from './QuestionHeader';
import NavigationSection from './NavigationSection';
import ActionButtons from './ActionButtons';
import StageGoalBanner from './StageGoalBanner';
import { TimerDisplay, GradientBackground, InstructionSection } from '../../common';

export interface UnifiedPracticeLayoutProps {
  // Header props
  icon: string;
  title: string;
  subtitle?: string;
  instructions: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  instructionsConfig?: {
    sections: InstructionSection[];
    size?: 'small' | 'medium' | 'large';
    color?: 'default' | 'primary' | 'secondary';
    tooltipTitle?: string;
  };

  // Question header props
  questionNumber: number;
  studentName: string;
  testedCount: number;

  // Timer props (optional)
  showTimer?: boolean;
  timerProps?: {
    timeRemaining: number;
    isRunning: boolean;
    warningThreshold: number;
    autoSubmit: boolean;
    showStartMessage?: boolean;
    startMessage?: string;
  };

  // Layout configuration
  layoutMode?: 'two-column' | 'single-column';

  // Left section (Audio Question / Content)
  leftSection: {
    title: string;
    content: ReactNode;
    showAudioInfo?: boolean;
    audioInfo?: {
      time: string;
      voice?: string;
    };
  };

  // Right section (Response Area)
  rightSection: {
    title: string;
    content: ReactNode;
    subtitle?: string;
  };

  // Action buttons props
  actionButtonsProps?: {
    recordedBlob?: Blob | null;
    hasResponse?: boolean;
    onSubmit: () => void;
    onRedo: () => void;
    onTranslate: () => void;
    onShowAnswer: () => void;
    handleViewAttempts?: () => void;
    showSubmit?: boolean;
    showRedo?: boolean;
    showTranslate?: boolean;
    showAnswer?: boolean;
    showViewAttempts?: boolean;
  };

  // Navigation props
  navigationProps: {
    onSearch: () => void;
    onPrevious: () => void;
    onNext: () => void;
    questionNumber: number;
  };

  // Additional content (optional)
  additionalContent?: ReactNode;

  // Show stage goal banner
  showStageGoalBanner?: boolean;

  // Loading state
  loading?: boolean;
  loadingMessage?: string;
}

const UnifiedPracticeLayout: React.FC<UnifiedPracticeLayoutProps> = ({
  icon,
  title,
  subtitle,
  instructions,
  difficulty,
  instructionsConfig,
  questionNumber,
  studentName,
  testedCount,
  showTimer = false,
  timerProps,
  layoutMode = 'two-column',
  leftSection,
  rightSection,
  actionButtonsProps,
  navigationProps,
  additionalContent,
  showStageGoalBanner = true,
  loading = false,
  loadingMessage = 'Loading...',
}) => {
  if (loading) {
    return (
      <GradientBackground>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Typography variant="h6" sx={{ color: '#FFFFFF' }}>
            {loadingMessage}
          </Typography>
        </Box>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      {showStageGoalBanner && <StageGoalBanner />}

      <PracticeCardWithInstructionsPopover
        icon={icon}
        title={title}
        subtitle={subtitle}
        instructions={instructions}
        difficulty={difficulty}
        instructionsConfig={instructionsConfig}
      >
        {/* Question Header */}
        <QuestionHeader
          questionNumber={questionNumber}
          studentName={studentName}
          testedCount={testedCount}
        />

        {/* Timer Display */}
        {showTimer && timerProps && (
          <Box sx={{ mb: 3 }}>
            <TimerDisplay
              timeRemaining={timerProps.timeRemaining}
              isRunning={timerProps.isRunning}
              warningThreshold={timerProps.warningThreshold}
              autoSubmit={timerProps.autoSubmit}
              showStartMessage={timerProps.showStartMessage}
              startMessage={timerProps.startMessage}
            />
          </Box>
        )}

        {/* Main Content Layout */}
        <Box sx={{ mb: 3 }}>
          {layoutMode === 'two-column' ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 3,
              }}
            >
              {/* Left Section: Audio Question / Content */}
              <Box sx={{ flex: 1 }}>
                <Paper
                  sx={{
                    p: 3,
                    bgcolor: '#1a1a1a',
                    borderRadius: 2,
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.5)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                      fontSize: { xs: '16px', sm: '18px' },
                    }}
                  >
                    {leftSection.title}
                  </Typography>

                  {leftSection.showAudioInfo && leftSection.audioInfo && (
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#ff5722',
                          fontWeight: 'bold',
                          fontSize: '14px',
                        }}
                      >
                        Time: {leftSection.audioInfo.time}
                      </Typography>
                    </Box>
                  )}

                  <Box sx={{ flexGrow: 1 }}>{leftSection.content}</Box>

                  {leftSection.showAudioInfo && leftSection.audioInfo?.voice && (
                    <Box sx={{ mt: 2 }}>
                      <Typography
                        variant="caption"
                        sx={{
                          color: '#B0B0B0',
                          fontSize: '12px',
                        }}
                      >
                        Voice: {leftSection.audioInfo.voice}
                      </Typography>
                    </Box>
                  )}
                </Paper>
              </Box>

              {/* Right Section: Response Area */}
              <Box sx={{ flex: 1 }}>
                <Paper
                  sx={{
                    p: 3,
                    bgcolor: '#1a1a1a',
                    borderRadius: 2,
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.5)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                      fontSize: { xs: '16px', sm: '18px' },
                    }}
                  >
                    {rightSection.title}
                  </Typography>

                  {rightSection.subtitle && (
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 2,
                        color: '#B0B0B0',
                        fontSize: '13px',
                      }}
                    >
                      {rightSection.subtitle}
                    </Typography>
                  )}

                  <Box sx={{ flexGrow: 1 }}>{rightSection.content}</Box>
                </Paper>
              </Box>
            </Box>
          ) : (
            // Single Column Layout
            <Stack spacing={3}>
              <Paper
                sx={{
                  p: 3,
                  bgcolor: '#1a1a1a',
                  borderRadius: 2,
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.5)',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    fontSize: { xs: '16px', sm: '18px' },
                  }}
                >
                  {leftSection.title}
                </Typography>
                {leftSection.content}
              </Paper>

              <Paper
                sx={{
                  p: 3,
                  bgcolor: '#1a1a1a',
                  borderRadius: 2,
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.5)',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    fontSize: { xs: '16px', sm: '18px' },
                  }}
                >
                  {rightSection.title}
                </Typography>
                {rightSection.subtitle && (
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 2,
                      color: '#B0B0B0',
                      fontSize: '13px',
                    }}
                  >
                    {rightSection.subtitle}
                  </Typography>
                )}
                {rightSection.content}
              </Paper>
            </Stack>
          )}
        </Box>

        {/* Additional Content */}
        {additionalContent && (
          <Box sx={{ mb: 3 }}>{additionalContent}</Box>
        )}

        {/* Action Buttons */}
        {actionButtonsProps && (
          <Box sx={{ mb: 3 }}>
            <ActionButtons {...actionButtonsProps} recordedBlob={actionButtonsProps?.recordedBlob ?? null} />
          </Box>
        )}

        {/* Navigation Section */}
        <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <NavigationSection {...navigationProps} />
        </Box>
      </PracticeCardWithInstructionsPopover>
    </GradientBackground>
  );
};

export default UnifiedPracticeLayout;
