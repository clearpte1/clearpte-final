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
  FormGroup,
  FormControlLabel,
  Checkbox,
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
  LinearProgress,
  TextField
} from '@mui/material';
import { Close } from '@mui/icons-material';
import ActionButtons from '../../common/ActionButtons';
import NavigationSection from '../../common/NavigationSection';
import QuestionHeader from '../../common/QuestionHeader';
import StageGoalBanner from '../../common/StageGoalBanner';
import { multipleChoiceQuestions } from './multipleChoiceQuestions';
import { MultipleChoiceQuestion, SubmissionResult } from './multipleChoiceTypes';
 import { User } from '../../../../types';
import TopicSelectionDrawer from '../../../common/TopicSelectionDrawer';
import { GradientBackground, TimerDisplay, ContentDisplay, ProgressIndicator, ResultsDialog, AnswerDialog, TranslationDialog } from '../../../common';
import PracticeCardWithInstructionsPopover from '../../../common/PracticeCardWithInstructionsPopover';
import { TimerState, QuestionResult } from './multipleChoiceTypes';
import { useFloatingSearch } from '../../../hooks/useFloatingSearch';

// Import types and data


interface MultipleChoiceProps {
  user?: User | null;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({ user }) => {
   // State management
  const [selectedQuestion, setSelectedQuestion] = useState<MultipleChoiceQuestion>(multipleChoiceQuestions[0]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [questionNumber, setQuestionNumber] = useState<number>(118);
  const [studentName] = useState<string>('Rachel Carson');
  const [testedCount] = useState<number>(33);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  
  // Timer state
  const [timer, setTimer] = useState<TimerState>({
    timeRemaining: 300, // 5 minutes
    isRunning: false,
    warningThreshold: 60,
    autoSubmit: true,
  });
  
  // Dialog states
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [showTranslate, setShowTranslate] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [currentResult, setCurrentResult] = useState<QuestionResult | null>(null);
  const [showQuestionSelector, setShowQuestionSelector] = useState<boolean>(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<Date>(new Date());

  // Enable floating search button for this component
  useFloatingSearch({
    topics: multipleChoiceQuestions,
    title: 'Multiple Choice (Multiple) Practice',
    type: 'reading',
    onTopicSelect: (topic: any) => {
      const question = topic as MultipleChoiceQuestion;
      setSelectedQuestion(question);
      setQuestionNumber(prev => prev + 1);
      setShowQuestionSelector(false);
      handleRedo();
    },
    enabled: true
  });

  // Sync state when question changes
  useEffect(() => {
    setSelectedOptions([]);
    setTimer({
      timeRemaining: 300,
      isRunning: false,
      warningThreshold: 60,
      autoSubmit: true,
    });
    setIsSubmitted(false);
    setSubmissionResult(null);
    setShowResults(false);
    setCurrentResult(null);
    startTimeRef.current = new Date();
  }, [selectedQuestion]);

  // Timer functionality
  useEffect(() => {
    if (timer.isRunning && timer.timeRemaining > 0 && !isSubmitted) {
      timerRef.current = setTimeout(() => {
        setTimer(prev => ({ ...prev, timeRemaining: prev.timeRemaining - 1 }));
      }, 1000);
    } else if (timer.timeRemaining === 0 && timer.autoSubmit && !isSubmitted) {
      handleAutoSubmit();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timer.timeRemaining, timer.isRunning, isSubmitted]);

  // Start timer when user starts selecting options
  useEffect(() => {
    if (selectedOptions.length > 0 && !timer.isRunning && !isSubmitted) {
      setTimer(prev => ({ ...prev, isRunning: true }));
    }
  }, [selectedOptions, timer.isRunning, isSubmitted]);

  // Handle option selection
  const handleOptionChange = (optionId: string) => {
    if (isSubmitted) return;
    
    setSelectedOptions(prev => {
      if (prev.includes(optionId)) {
        return prev.filter(id => id !== optionId);
      } else {
        return [...prev, optionId];
      }
    });
  };

  // Calculate score and create submission result
  const calculateScore = (selected: string[], question: MultipleChoiceQuestion): SubmissionResult => {
    const correctAnswers = question.options.filter(opt => opt.isCorrect).map(opt => opt.id);
    const correctSelections = selected.filter(id => correctAnswers.includes(id));
    const incorrectSelections = selected.filter(id => !correctAnswers.includes(id));
    const missedAnswers = correctAnswers.filter(id => !selected.includes(id));
    
    // Scoring algorithm
    let score = 0;
    const totalCorrect = correctAnswers.length;
    const totalSelected = selected.length;
    
    if (totalSelected === 0) {
      score = 0;
    } else {
      // Points for correct selections
      const correctPoints = (correctSelections.length / totalCorrect) * 70;
      
      // Penalty for incorrect selections
      const incorrectPenalty = (incorrectSelections.length / question.options.length) * 30;
      
      // Bonus for perfect answer
      const perfectBonus = (correctSelections.length === totalCorrect && incorrectSelections.length === 0) ? 30 : 0;
      
      score = Math.max(0, Math.min(100, correctPoints - incorrectPenalty + perfectBonus));
    }
    
    return {
      score: Math.round(score),
      correctAnswers,
      selectedAnswers: selected,
      feedback: {
        correct: correctSelections,
        incorrect: incorrectSelections,
        missed: missedAnswers
      }
    };
  };

  // Handle submission
  const handleSubmit = (): void => {
    if (selectedOptions.length === 0) {
      alert('Please select at least one option before submitting.');
      return;
    }
    
    if (isSubmitted) return;

    setIsSubmitted(true);
    setTimer(prev => ({ ...prev, isRunning: false }));

    const endTime = new Date();
    const timeSpent = Math.floor((endTime.getTime() - startTimeRef.current.getTime()) / 1000);
    
    const result = calculateScore(selectedOptions, selectedQuestion);
    setSubmissionResult(result);

    const questionResult: QuestionResult = {
      questionId: String(selectedQuestion.id),
      score: result.score,
      maxScore: 100,
      correctAnswers: result.feedback.correct.length,
      totalQuestions: selectedQuestion.options.filter(opt => opt.isCorrect).length,
      completedAt: endTime,
      timeSpent,
      percentage: result.score,
      answers: selectedQuestion.options.map(option => ({
        id: option.id,
        selectedAnswer: selectedOptions.includes(option.id) ? option.text : null,
        correctAnswer: option.isCorrect ? option.text : null,
        isCorrect: selectedOptions.includes(option.id) && option.isCorrect
      }))
    };

    setCurrentResult(questionResult);
    setShowResults(true);
  };

  // Handle auto submit when timer expires
  const handleAutoSubmit = (): void => {
    if (selectedOptions.length > 0) {
      const result = calculateScore(selectedOptions, selectedQuestion);
      setSubmissionResult(result);
      setIsSubmitted(true);
    } else {
      setIsSubmitted(true);
    }
    setTimer(prev => ({ ...prev, isRunning: false }));
  };

  // Action handlers
  const handleRedo = (): void => {
    setSelectedOptions([]);
    setTimer({
      timeRemaining: 300,
      isRunning: false,
      warningThreshold: 60,
      autoSubmit: true,
    });
    setSubmissionResult(null);
    setIsSubmitted(false);
    setShowResults(false);
    setCurrentResult(null);
    startTimeRef.current = new Date();
  };

  const handleShowAnswer = (): void => {
    setShowAnswer(true);
  };

  const handleTranslate = (): void => {
    setShowTranslate(true);
  };

  const handleSearch = (): void => {
    setShowQuestionSelector(true);
  };

  const handlePrevious = (): void => {
    if (questionNumber > 1) {
      setQuestionNumber(prev => prev - 1);
      handleRedo();
    }
  };

  const handleNext = (): void => {
    setShowQuestionSelector(true);
  };

  // Handle question selection
  const handleQuestionSelect = (question: any) => {
    setSelectedQuestion(question);
    setQuestionNumber(prev => prev + 1);
    setShowQuestionSelector(false);
    handleRedo();
  };

  // Get option color based on submission result
  const getOptionColor = (optionId: string): { bgcolor: string; color: string; border?: string } => {
    if (!isSubmitted || !submissionResult) {
      return { bgcolor: 'transparent', color: '#333' };
    }
    
    const isCorrectAnswer = selectedQuestion.options.find(opt => opt.id === optionId)?.isCorrect;
    const isSelected = selectedOptions.includes(optionId);
    
    if (isSelected && isCorrectAnswer) {
      return { bgcolor: '#4caf50', color: 'white' }; // Green for correct selection
    } else if (isSelected && !isCorrectAnswer) {
      return { bgcolor: '#f44336', color: 'white' }; // Red for incorrect selection
    } else if (!isSelected && isCorrectAnswer) {
      return { bgcolor: '#fff3e0', color: '#333', border: '2px solid #4caf50' }; // Should have been selected
    } else {
      return { bgcolor: 'transparent', color: '#333' };
    }
  };

  return (
    <GradientBackground>
      <StageGoalBanner />

      <PracticeCardWithInstructionsPopover
        icon="MCM"
        title="Multiple Choice (Multiple)"
        instructions="Read the text and answer the question by selecting all the correct responses. More than one response is correct."
        difficulty={selectedQuestion.difficulty}
        instructionsConfig={{
          sections: [
            {
              title: 'Task Overview',
              items: ['Read the passage carefully and answer the multiple choice question', 'Select ALL correct responses - more than one answer is correct'],
            },
            {
              title: 'Time Management',
              items: ['Read the question first to focus your reading', 'Scan the passage for relevant information', 'Check each option carefully before selecting'],
            },
            {
              title: 'Strategy Tips',
              items: [
                'Don\'t assume only one answer is correct',
                'Look for keywords that match each option',
                'Consider partial truths - multiple statements can be correct',
                'Eliminate obviously wrong answers first',
                'Select all options that are supported by the text'
              ],
            },
            {
              title: 'Scoring',
              items: ['Points awarded for each correct selection', 'Points deducted for incorrect selections', 'Partial credit possible'],
            },
          ],
          size: 'medium',
          color: 'primary',
          tooltipTitle: 'View detailed instructions'
        }}
      >
        <QuestionHeader 
          questionNumber={questionNumber}
          studentName={studentName}
          testedCount={testedCount}
        />

        <TimerDisplay
          timeRemaining={timer.timeRemaining}
          isRunning={timer.isRunning}
          warningThreshold={timer.warningThreshold}
          showStartMessage={!timer.isRunning}
          startMessage="Timer will start when you begin selecting options"
          autoSubmit={timer.autoSubmit}
        />

        {/* Passage Display */}
        <ContentDisplay
          title={`#${questionNumber} ${selectedQuestion.testSensitivity || 'Test Sensitivity'}`}
          content={selectedQuestion.passage}
          category={selectedQuestion.category}
          difficulty={selectedQuestion.difficulty}
          tags={selectedQuestion.tags}
          showMetadata={true}
        />

        {/* Question */}
        <ContentDisplay
          content={
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#333', 
                fontWeight: 'bold',
                fontSize: { xs: '16px', sm: '18px', md: '20px' },
                wordBreak: 'break-word'
              }}
            >
              {selectedQuestion.question}
            </Typography>
          }
          showMetadata={false}
        />

        {/* Options */}
        <ContentDisplay
          content={
            <FormGroup>
              {selectedQuestion.options.map((option) => {
                const optionStyle = getOptionColor(option.id);
                return (
                  <Box
                    key={option.id}
                    sx={{
                      mb: 2,
                      p: 2,
                      borderRadius: 1,
                      ...optionStyle,
                      border: optionStyle.border || '1px solid #e0e0e0',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedOptions.includes(option.id)}
                          onChange={() => handleOptionChange(option.id)}
                          disabled={isSubmitted}
                          sx={{
                            color: optionStyle.color,
                            '&.Mui-checked': {
                              color: optionStyle.color
                            }
                          }}
                        />
                      }
                      label={
                        <Typography 
                          sx={{ 
                            color: optionStyle.color,
                            fontSize: { xs: '14px', sm: '15px', md: '16px' },
                            fontWeight: isSubmitted && selectedQuestion.options.find(opt => opt.id === option.id)?.isCorrect ? 'bold' : 'normal'
                          }}
                        >
                          <strong>{option.id})</strong> {option.text}
                        </Typography>
                      }
                    />
                  </Box>
                );
              })}
            </FormGroup>
          }
          showMetadata={false}
        />

        <ProgressIndicator
          current={selectedOptions.length}
          total={selectedQuestion.options.filter(opt => opt.isCorrect).length}
          label="options selected"
          color="primary"
          customLabel={`${selectedOptions.length} options selected`}
        />

        <ActionButtons
          hasResponse={selectedOptions.length > 0}
          onSubmit={handleSubmit}
          onRedo={handleRedo}
          onTranslate={handleTranslate}
          onShowAnswer={handleShowAnswer}
          recordedBlob={null}
        />

        <NavigationSection
          onSearch={handleSearch}
          onPrevious={handlePrevious}
          onNext={handleNext}
          questionNumber={questionNumber}
        />
      </PracticeCardWithInstructionsPopover>

      <TopicSelectionDrawer
        open={showQuestionSelector}
        onClose={() => setShowQuestionSelector(false)}
        onSelect={handleQuestionSelect}
        topics={multipleChoiceQuestions}
        title="Select Question"
        type="lecture"
      />

      <ResultsDialog
        open={showResults}
        onClose={() => setShowResults(false)}
        result={currentResult}
        onTryAgain={handleRedo}
        customContent={
          submissionResult && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Answer Analysis:</Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Performance:</Typography>
                  <Typography variant="body2" color="success.main">
                    Correct: {submissionResult.feedback.correct.join(', ') || 'None'}
                  </Typography>
                  <Typography variant="body2" color="error.main">
                    Incorrect: {submissionResult.feedback.incorrect.join(', ') || 'None'}
                  </Typography>
                  <Typography variant="body2" color="warning.main">
                    Missed: {submissionResult.feedback.missed.join(', ') || 'None'}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          )
        }
      />

      <AnswerDialog
        open={showAnswer}
        onClose={() => setShowAnswer(false)}
        title={`Question: ${selectedQuestion.title}`}
        text={selectedQuestion.passage}
        answers={selectedQuestion.options.filter(opt => opt.isCorrect).map(option => ({
          id: option.id,
          correctAnswer: option.text,
          label: `Option ${option.id}`
        }))}
        explanation={selectedQuestion.explanation}
      />

      <TranslationDialog
        open={showTranslate}
        onClose={() => setShowTranslate(false)}
        description="Translation feature will help you understand the question content in your preferred language."
      />
    </GradientBackground>
  );
};

export default MultipleChoice;