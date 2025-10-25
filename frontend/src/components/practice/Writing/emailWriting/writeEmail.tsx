import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  Stack,
  Paper,
  TextField,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  LinearProgress
} from '@mui/material';
import { Close } from '@mui/icons-material';
import ActionButtons from '../../common/ActionButtons';
import NavigationSection from '../../common/NavigationSection';
import QuestionHeader from '../../common/QuestionHeader';
import StageGoalBanner from '../../common/StageGoalBanner';
import { emailScenarios } from './emailMockData';
import { EmailScenario } from './emailTypes';
import { User } from '../../../../types';
import TopicSelectionDrawer from '../../../common/TopicSelectionDrawer';
import { GradientBackground, TimerDisplay, ContentDisplay, ProgressIndicator, ResultsDialog, AnswerDialog, TranslationDialog } from '../../../common';
import PracticeCardWithInstructionsPopover from '../../../common/PracticeCardWithInstructionsPopover';
import { useFloatingSearch } from '../../../hooks/useFloatingSearch';

const instructionsSections = [
  {
    title: 'Task Overview',
    items: ['Read a situation description and write an email based on the scenario provided.'],
  },
  {
    title: 'Time Allocation',
    items: ['Reading time: Unlimited', 'Writing time: 9 minutes'],
  },
  {
    title: 'Email Requirements',
    items: [
      'Word count: At least 100 words',
      'Address all key points mentioned',
      'Use appropriate email format',
      'Include greeting and closing',
      'Use professional tone',
    ],
  },
  {
    title: 'Scoring Criteria',
    items: [
      'Content: Address all required points',
      'Format: Proper email structure',
      'Language: Grammar and vocabulary',
      'Tone: Appropriate for context',
    ],
  },
];

interface WriteEmailProps {
  user?: User | null;
}

const WriteEmail: React.FC<WriteEmailProps> = ({ user }) => {
  // State management
  const [selectedScenario, setSelectedScenario] = useState<EmailScenario>(emailScenarios[0]);
  const [userEmail, setUserEmail] = useState<string>('');
  const [wordCount, setWordCount] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(540); // 9 minutes in seconds
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [questionNumber, setQuestionNumber] = useState<number>(67);
  const [studentName] = useState<string>('Rachel Carson');
  const [testedCount] = useState<number>(33);
  const [score, setScore] = useState<number | null>(null);

  // Dialog states
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [showTranslate, setShowTranslate] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [showScenarioSelector, setShowScenarioSelector] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Enable floating search button for this component
  useFloatingSearch({
    topics: emailScenarios,
    title: 'Email Writing Practice',
    type: 'writing',
    onTopicSelect: (topic: any) => {
      const scenario = topic as EmailScenario;
      setSelectedScenario(scenario);
      setQuestionNumber(prev => prev + 1);
      setShowScenarioSelector(false);
      handleRedo();
    },
    enabled: true
  });

  // Word counting function
  const countWords = (text: string): number => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  // Handle email input change
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const text = event.target.value;
    setUserEmail(text);
    setWordCount(countWords(text));
  };

  // Timer functionality
  useEffect(() => {
    if (isTimerActive && timeRemaining > 0) {
      timerRef.current = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      handleAutoSubmit();
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isTimerActive, timeRemaining]);

  // Start timer when user starts typing
  useEffect(() => {
    if (userEmail.length > 0 && !isTimerActive) {
      setIsTimerActive(true);
    }
  }, [userEmail, isTimerActive]);

  // Email scoring algorithm
  const calculateEmailScore = (emailText: string, scenario: EmailScenario): number => {
    let score = 0;
    const words = emailText.toLowerCase().split(/\s+/);
    const wordCount = words.length;

    // Word count scoring (30 points)
    if (wordCount >= scenario.wordLimit.min) {
      score += 30;
    } else {
      score += Math.round((wordCount / scenario.wordLimit.min) * 30);
    }

    // Email structure scoring (25 points)
    const hasGreeting = /dear|hello|hi|greetings/i.test(emailText);
    const hasClosing = /sincerely|regards|best|thank you|yours/i.test(emailText);
    const hasParagraphs = emailText.split('\n\n').length >= 2;

    if (hasGreeting) score += 8;
    if (hasClosing) score += 8;
    if (hasParagraphs) score += 9;

    // Key points coverage (35 points)
    const keyPointsCovered = scenario.keyPoints.filter(point => {
      const keywords = point.toLowerCase().match(/\b\w+\b/g) || [];
      return keywords.some(keyword =>
        keyword.length > 3 && emailText.toLowerCase().includes(keyword)
      );
    }).length;

    score += Math.round((keyPointsCovered / scenario.keyPoints.length) * 35);

    // Professional tone (10 points)
    const professionalWords = ['please', 'thank', 'appreciate', 'would', 'could', 'kindly'];
    const professionalCount = professionalWords.filter(word =>
      emailText.toLowerCase().includes(word)
    ).length;
    score += Math.min(professionalCount * 2, 10);

    return Math.min(score, 100);
  };

  // Handle submission
  const handleSubmit = (): void => {
    if (wordCount < selectedScenario.wordLimit.min) {
      alert(`Please ensure your email is at least ${selectedScenario.wordLimit.min} words.`);
      return;
    }

    const calculatedScore = calculateEmailScore(userEmail, selectedScenario);
    setScore(calculatedScore);
    setIsTimerActive(false);
    setShowResults(true);
  };

  // Handle auto submit when timer expires
  const handleAutoSubmit = (): void => {
    if (userEmail.trim()) {
      const calculatedScore = calculateEmailScore(userEmail, selectedScenario);
      setScore(calculatedScore);
    }
    setIsTimerActive(false);
    setShowResults(true);
  };

  // Action handlers
  const handleRedo = (): void => {
    setUserEmail('');
    setWordCount(0);
    setTimeRemaining(540);
    setIsTimerActive(false);
    setScore(null);
    setShowResults(false);
  };

  const handleShowAnswer = (): void => {
    setShowAnswer(true);
  };

  const handleTranslate = (): void => {
    setShowTranslate(true);
  };

  const handleSearch = (): void => {
    setShowScenarioSelector(true);
  };

  const handlePrevious = (): void => {
    if (questionNumber > 1) {
      setQuestionNumber(prev => prev - 1);
      handleRedo();
    }
  };

  const handleNext = (): void => {
    setShowScenarioSelector(true);
  };

  // Handle scenario selection
  const handleScenarioSelect = (scenario: any) => {
    setSelectedScenario(scenario);
    setQuestionNumber(prev => prev + 1);
    setShowScenarioSelector(false);
    handleRedo();
  };

  // Get word count status color
  const getWordCountColor = (): string => {
    if (wordCount === 0) return '#666';
    if (wordCount < selectedScenario.wordLimit.min) return '#ff9800';
    return '#4caf50';
  };

  // Create result object for dialog
  const currentResult = score !== null ? {
    questionId: String(selectedScenario.id),
    score: score,
    maxScore: 100,
    correctAnswers: score >= 70 ? 1 : 0,
    totalQuestions: 1,
    completedAt: new Date(),
    timeSpent: 540 - timeRemaining,
    percentage: score,
    answers: [{
      id: 'email-response',
      selectedAnswer: `${wordCount} words written`,
      correctAnswer: `${selectedScenario.wordLimit.min}+ words required`,
      isCorrect: wordCount >= selectedScenario.wordLimit.min
    }]
  } : null;

  return (
    <GradientBackground>
      <StageGoalBanner />

      <PracticeCardWithInstructionsPopover
        icon="WE"
        title="Write Email"
        instructions="Read a description of a situation. Then write an email about the situation. You will have 9 minutes. You should aim to write at least 100 words. Write using complete sentences."
        difficulty={selectedScenario.difficulty}
        instructionsConfig={{
          sections: instructionsSections,
          size: 'medium',
          color: 'primary',
          tooltipTitle: 'View detailed instructions for Write Email'
        }}
      >
        {/* Question Header */}
        <QuestionHeader
          questionNumber={questionNumber}
          studentName={studentName}
          testedCount={testedCount}
        />

        {/* Timer */}
        <TimerDisplay
          timeRemaining={timeRemaining}
          isRunning={isTimerActive}
          warningThreshold={60}
          showStartMessage={!isTimerActive}
          startMessage="Timer will start when you begin typing"
          autoSubmit={true}
        />

        {/* Scenario Display */}
        <ContentDisplay
          title={`#${questionNumber} ${selectedScenario.title}`}
          content={
            <Box>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.8,
                  color: '#333',
                  mb: 2
                }}
              >
                {selectedScenario.situation}
              </Typography>

              {/* Key Points */}
              <Box sx={{ mt: 2 }}>
                {selectedScenario.keyPoints.map((point, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{
                      color: '#d32f2f',
                      mb: 1,
                      fontWeight: 500,
                      pl: 1,
                      borderLeft: '3px solid #d32f2f'
                    }}
                  >
                    - {point}
                  </Typography>
                ))}
              </Box>
            </Box>
          }
          category={selectedScenario.category}
          difficulty={selectedScenario.difficulty}
          tags={selectedScenario.tags}
          showMetadata={true}
        />

        {/* Email Input */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            justifyContent="space-between"
            sx={{ mb: 2 }}
            spacing={{ xs: 1, sm: 0 }}
          >
            <Typography variant="h6" sx={{ color: '#333' }}>
              Your Email:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: getWordCountColor(),
                fontWeight: 'bold'
              }}
            >
              Word Count: {wordCount}
            </Typography>
          </Stack>

          {wordCount > 0 && wordCount < selectedScenario.wordLimit.min && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              <Typography>
                Your email should be at least {selectedScenario.wordLimit.min} words. Current count: {wordCount}
              </Typography>
            </Alert>
          )}

          <TextField
            fullWidth
            multiline
            rows={12}
            value={userEmail}
            onChange={handleEmailChange}
            placeholder="Write your email here..."
            disabled={timeRemaining === 0 || score !== null}
          />
        </Paper>

        {/* Progress Indicators */}
        <ProgressIndicator
          current={wordCount}
          total={selectedScenario.wordLimit.min}
          label="words written"
          color="primary"
          showPercentage={true}
        />

        <ProgressIndicator
          current={540 - timeRemaining}
          total={540}
          label="time elapsed"
          color="warning"
          customLabel={`${Math.floor((540 - timeRemaining) / 60)}:${((540 - timeRemaining) % 60).toString().padStart(2, '0')} of 9:00`}
        />

        {/* Score Display */}
        {score !== null && (
          <Paper sx={{ p: 3, mb: 3, textAlign: 'center', bgcolor: score >= 70 ? '#e8f5e9' : '#fff3e0' }}>
            <Typography variant="h4" color={score >= 70 ? 'success.main' : 'warning.main'} fontWeight="bold">
              {score}/100
            </Typography>
            <Typography color="text.secondary">
              {score >= 70 ? '🎉 Great job!' : '📝 Keep practicing!'}
            </Typography>
          </Paper>
        )}

        {/* Action Buttons */}
        <ActionButtons
          hasResponse={userEmail.trim().length > 0}
          onSubmit={handleSubmit}
          onRedo={handleRedo}
          onTranslate={handleTranslate}
          onShowAnswer={handleShowAnswer}
          recordedBlob={null}
        />

        {/* Navigation Section Integrated */}
        <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #e0e0e0' }}>
          <NavigationSection
            onSearch={handleSearch}
            onPrevious={handlePrevious}
            onNext={handleNext}
            questionNumber={questionNumber}
          />
        </Box>
      </PracticeCardWithInstructionsPopover>

      {/* Topic Selection Drawer */}
      <TopicSelectionDrawer
        open={showScenarioSelector}
        onClose={() => setShowScenarioSelector(false)}
        onSelect={handleScenarioSelect}
        topics={emailScenarios}
        title="Select Email Scenario"
        type="lecture"
      />

      {/* Results Dialog */}
      <ResultsDialog
        open={showResults}
        onClose={() => setShowResults(false)}
        result={currentResult}
        onTryAgain={handleRedo}
        showAnswerReview={false}
        customContent={
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Email Analysis:</Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Word Count:</Typography>
                <Typography variant="body2" color={wordCount >= selectedScenario.wordLimit.min ? 'success.main' : 'error.main'}>
                  {wordCount} / {selectedScenario.wordLimit.min} minimum words
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Score Breakdown:</Typography>
                <Typography variant="body2">
                  • Word Count: {wordCount >= selectedScenario.wordLimit.min ? '30/30' : `${Math.round((wordCount / selectedScenario.wordLimit.min) * 30)}/30`}
                </Typography>
                <Typography variant="body2">• Structure & Format: Variable based on content</Typography>
                <Typography variant="body2">• Key Points Coverage: Variable based on content</Typography>
                <Typography variant="body2">• Professional Tone: Variable based on language use</Typography>
              </Box>
            </Stack>
          </Box>
        }
      />

      {/* Answer Dialog */}
      <AnswerDialog
        open={showAnswer}
        onClose={() => setShowAnswer(false)}
        title={`Sample Email: ${selectedScenario.title}`}
        answers={[{
          id: 'sample-email',
          correctAnswer: selectedScenario.sampleEmail,
          label: `Sample Response (${countWords(selectedScenario.sampleEmail)} words)`
        }]}
      />

      {/* Translation Dialog */}
      <TranslationDialog
        open={showTranslate}
        onClose={() => setShowTranslate(false)}
        description="Translation feature will help you understand the email scenario in your preferred language."
      />
    </GradientBackground>
  );
};

export default WriteEmail;