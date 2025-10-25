import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, FormGroup, FormControlLabel, Checkbox, Typography, Stack, Chip, Paper, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { Button } from '../../../common/Button';
import {
  TimerDisplay,
  ProgressIndicator,
  ResultsDialog,
  AnswerDialog,
  TranslationDialog,
  ContentDisplay,
  GradientBackground,
  TopicSelectionDrawer,
  DualAudioPlayer,
  validateAudioConfig,
  hasActualAudio,
  getAudioSourceLabel,
} from '../../../common';
import PracticeCardWithInstructionsPopover from '../../../common/PracticeCardWithInstructionsPopover';
import ActionButtons from '../../common/ActionButtons';
import NavigationSection from '../../common/NavigationSection';
import QuestionHeader from '../../common/QuestionHeader';
import StageGoalBanner from '../../common/StageGoalBanner';
import { allListeningMultipleChoiceQuestions, listeningMultipleChoiceQuestions, convertLegacyQuestion } from './MutlipleChoiceMultipleMockData';
import { ListeningMultipleChoiceQuestion, SubmissionResult, UserAttempt } from './MultipleChoiceMultipleType';
import { User } from '../../../../types';
import { Close } from '@mui/icons-material';
import { useFloatingSearch } from '../../../hooks/useFloatingSearch';

interface ListeningMultipleChoiceProps {
  user?: User | null;
}

const ListeningMultipleChoice: React.FC<ListeningMultipleChoiceProps> = ({ user }) => {
  // Convert legacy questions to new format
  const [selectedQuestion, setSelectedQuestion] = useState<ListeningMultipleChoiceQuestion>(
    convertLegacyQuestion(allListeningMultipleChoiceQuestions[0])
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showQuestionSelector, setShowQuestionSelector] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showTranslate, setShowTranslate] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showAttempts, setShowAttempts] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attempts, setAttempts] = useState<UserAttempt[]>([]);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [audioValidation, setAudioValidation] = useState(validateAudioConfig(convertLegacyQuestion(allListeningMultipleChoiceQuestions[0]).audio));

  // Timer state
  const [timer, setTimer] = useState({
    timeRemaining: 300, // 5 minutes
    isRunning: false,
    warningThreshold: 60,
    autoSubmit: true,
  });

  // Student info
  const [studentName] = useState('Weight Gain');
  const [testedCount] = useState(51);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<Date>(new Date());

  // Load attempts from localStorage
  useEffect(() => {
    const savedAttempts = localStorage.getItem('listeningMultipleChoiceAttempts');
    if (savedAttempts) {
      try {
        setAttempts(JSON.parse(savedAttempts));
      } catch (error) {
        console.error('Failed to parse attempts:', error);
        localStorage.removeItem('listeningMultipleChoiceAttempts');
      }
    }
  }, []);

  // Save attempt to localStorage
  const saveAttempt = useCallback((attempt: UserAttempt) => {
    setAttempts((prev) => {
      const newAttempts = [...prev, attempt];
      try {
        localStorage.setItem('listeningMultipleChoiceAttempts', JSON.stringify(newAttempts));
      } catch (error) {
        console.error('Failed to save attempts:', error);
      }
      return newAttempts;
    });
  }, []);

  // Sync state when question changes
  useEffect(() => {
    const question = convertLegacyQuestion(selectedQuestion);
    setSelectedQuestion(question);
    setAudioValidation(validateAudioConfig(question.audio));
    
    setSelectedOptions([]);
    setTimer({
      timeRemaining: 300,
      isRunning: false,
      warningThreshold: 60,
      autoSubmit: true,
    });
    setIsSubmitted(false);
    setShowResults(false);
    setSubmissionResult(null);
    setAudioError(null);
    startTimeRef.current = new Date();

    // Clear existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, [selectedQuestion.id]);

  // Timer functionality
  useEffect(() => {
    if (timer.isRunning && timer.timeRemaining > 0 && !isSubmitted) {
      timerRef.current = setTimeout(() => {
        setTimer(prev => ({ ...prev, timeRemaining: prev.timeRemaining - 1 }));
      }, 1000);
    } else if (timer.timeRemaining === 0 && timer.autoSubmit && !isSubmitted) {
      handleSubmit();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timer.timeRemaining, timer.isRunning, isSubmitted]);

  // Start timer when user first makes a selection
  const startTimerIfNeeded = useCallback(() => {
    if (!timer.isRunning && !isSubmitted && selectedOptions.length > 0) {
      setTimer(prev => ({ ...prev, isRunning: true }));
      startTimeRef.current = new Date();
    }
  }, [timer.isRunning, isSubmitted, selectedOptions.length]);

  // Handle option selection
  const handleOptionChange = (optionId: string) => {
    if (isSubmitted) return;
    
    setSelectedOptions(prev => {
      const newOptions = prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId];
      
      // Start timer on first selection
      if (newOptions.length > 0) {
        startTimerIfNeeded();
      }
      
      return newOptions;
    });
  };

  const hasResponse = useCallback((): boolean => {
    return selectedOptions.length > 0;
  }, [selectedOptions.length]);

  // Calculate score and create submission result
  const calculateScore = (selected: string[], question: ListeningMultipleChoiceQuestion): SubmissionResult => {
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
  const handleSubmit = () => {
    if (isSubmitted) return;

    if (selectedOptions.length === 0) {
      alert('Please select at least one option before submitting.');
      return;
    }
    
    setIsSubmitted(true);
    setTimer(prev => ({ ...prev, isRunning: false }));

    const endTime = new Date();
    const timeSpent = Math.floor((endTime.getTime() - startTimeRef.current.getTime()) / 1000);

    const result = calculateScore(selectedOptions, selectedQuestion);
    setSubmissionResult(result);
    setShowResults(true);

    // Save attempt
    const attempt: UserAttempt = {
      questionId: selectedQuestion.id,
      selectedAnswers: selectedOptions,
      correctAnswers: result.correctAnswers,
      score: result.score,
      timestamp: new Date().toISOString(),
    };
    saveAttempt(attempt);
  };

  const handleRedo = () => {
    setSelectedOptions([]);
    setTimer({
      timeRemaining: 300,
      isRunning: false,
      warningThreshold: 60,
      autoSubmit: true,
    });
    setIsSubmitted(false);
    setShowResults(false);
    setSubmissionResult(null);
    startTimeRef.current = new Date();

    // Clear existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

      // Enable floating search button for this component
      useFloatingSearch({
        topics: allListeningMultipleChoiceQuestions,
        title: 'Multiple Choice Multiple',
        type: 'listening',
        onTopicSelect: (topic: any) => {
          setSelectedQuestion(topic);
          setCurrentQuestionIndex(allListeningMultipleChoiceQuestions.findIndex(t => t.id === topic.id));
        },
        enabled: true
      });
  

  // Navigation handlers
  const handleNext = () => {
    if (currentQuestionIndex < allListeningMultipleChoiceQuestions.length - 1) {
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      setSelectedQuestion(convertLegacyQuestion(allListeningMultipleChoiceQuestions[newIndex]));
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newIndex);
      setSelectedQuestion(convertLegacyQuestion(allListeningMultipleChoiceQuestions[newIndex]));
    }
  };

  const handleSearch = () => {
    setShowQuestionSelector(true);
  };

  const handleQuestionSelect = (question: any) => {
    const convertedQuestion = convertLegacyQuestion(question);
    setSelectedQuestion(convertedQuestion);
    setCurrentQuestionIndex(allListeningMultipleChoiceQuestions.findIndex(q => q.id === convertedQuestion.id));
    setShowQuestionSelector(false);
  };

  const handleViewAttempts = () => {
    setShowAttempts(true);
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

  const questionNumber = testedCount + currentQuestionIndex + 1;

  // Create result for dialog
  const resultForDialog = submissionResult ? {
    questionId: String(selectedQuestion.id),
    score: submissionResult.score,
    maxScore: 100,
    correctAnswers: submissionResult.feedback.correct.length,
    totalQuestions: submissionResult.correctAnswers.length,
    completedAt: new Date(),
    timeSpent: 0,
    percentage: submissionResult.score,
    answers: selectedQuestion.options.map(option => ({
      id: option.id,
      selectedAnswer: selectedOptions.includes(option.id) ? option.text : '',
      correctAnswer: option.isCorrect ? option.text : '',
      isCorrect: selectedOptions.includes(option.id) && option.isCorrect
    }))
  } : null;

  return (
    <GradientBackground>
      <StageGoalBanner />
      
      <PracticeCardWithInstructionsPopover
        icon="LCM"
        title="Listening Multiple Choice (Multiple)"
        instructions="Listen to the recording and answer the question by selecting all the correct responses. You will need to select more than one response."
        difficulty={selectedQuestion.difficulty}
        instructionsConfig={{
          sections: [
            {
              title: 'Task Overview',
              items: ['Listen to a recording and answer the multiple choice question', 'Select ALL correct responses - more than one answer is correct', 'You can replay the audio multiple times'],
            },
            {
              title: 'Listening Strategy',
              items: ['Listen to the recording completely first', 'Take notes of key information', 'Pay attention to details and specific information', 'Listen for keywords that match the options'],
            },
            {
              title: 'Answering Tips',
              items: [
                'Don\'t assume only one answer is correct',
                'Check each option against what you heard',
                'Look for partial truths - multiple statements can be correct',
                'Eliminate obviously wrong answers first',
                'Select all options that are supported by the audio'
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
        {/* Question Header */}
        <QuestionHeader
          questionNumber={questionNumber}
          studentName={studentName}
          testedCount={testedCount}
        />

        {/* Timer */}
        <TimerDisplay
          timeRemaining={timer.timeRemaining}
          isRunning={timer.isRunning}
          warningThreshold={timer.warningThreshold}
          showStartMessage={!timer.isRunning && !isSubmitted}
          startMessage="Timer will start when you make your first selection"
          autoSubmit={timer.autoSubmit}
        />

        {/* Dual Audio Player */}
        <DualAudioPlayer
          audio={selectedQuestion.audio}
          autoPlay={false}
          onStart={() => console.log('Audio started')}
          onEnd={() => console.log('Audio ended')}
          onError={(error) => setAudioError(error)}
          disabled={false}
          topicTitle={selectedQuestion.title}
          questionNumber={questionNumber.toString()}
          remainingTime={`${Math.floor(timer.timeRemaining / 60)}:${String(timer.timeRemaining % 60).padStart(2, '0')}`}
          testedCount={testedCount}
        />

        {/* Question Display */}
        <ContentDisplay
          title="Question"
          content={
            <Typography variant="h6" sx={{ color: '#333', fontWeight: 'bold' }}>
              {selectedQuestion.question}
            </Typography>
          }
          category={selectedQuestion.category}
          difficulty={selectedQuestion.difficulty}
          tags={selectedQuestion.tags}
          showMetadata={true}
        />

        {/* Options */}
        <ContentDisplay
          title="Select all correct answers:"
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
                      transition: 'all 0.3s ease',
                      cursor: isSubmitted ? 'default' : 'pointer'
                    }}
                    onClick={() => !isSubmitted && handleOptionChange(option.id)}
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

        {/* Submission Result */}
        {isSubmitted && submissionResult && (
          <Paper sx={{ p: 3, mb: 3, bgcolor: submissionResult.score >= 70 ? '#e8f5e9' : '#ffebee' }}>
            <Typography variant="h6" sx={{ mb: 1, color: submissionResult.score >= 70 ? '#2e7d32' : '#d32f2f' }}>
              Score: {submissionResult.score}/100
            </Typography>
            <Typography variant="body2">
              Correct: {submissionResult.feedback.correct.join(', ') || 'None'} | 
              Incorrect: {submissionResult.feedback.incorrect.join(', ') || 'None'} | 
              Missed: {submissionResult.feedback.missed.join(', ') || 'None'}
            </Typography>
          </Paper>
        )}

        {/* Progress Indicator */}
        <ProgressIndicator
          current={selectedOptions.length}
          total={selectedQuestion.options.filter(opt => opt.isCorrect).length}
          label="options selected"
          customLabel={selectedOptions.length === 0 ? 'No options selected' : `${selectedOptions.length} option(s) selected`}
        />

        {/* Action Buttons */}
        <ActionButtons
          hasResponse={hasResponse()}
          onSubmit={handleSubmit}
          onRedo={handleRedo}
          onTranslate={() => setShowTranslate(true)}
          onShowAnswer={() => setShowAnswer(true)}
          recordedBlob={null}
          handleViewAttempts={handleViewAttempts}
        />

        {/* Navigation */}
        <NavigationSection
          onSearch={handleSearch}
          onPrevious={handlePrevious}
          onNext={handleNext}
          questionNumber={questionNumber}
        />
      </PracticeCardWithInstructionsPopover>

      {/* Topic Selection Drawer */}
      <TopicSelectionDrawer
        open={showQuestionSelector}
        onClose={() => setShowQuestionSelector(false)}
        onSelect={handleQuestionSelect}
        topics={allListeningMultipleChoiceQuestions}
        title="Select Question"
        type="question"
      />

      {/* Results Dialog */}
      <ResultsDialog
        open={showResults}
        onClose={() => setShowResults(false)}
        result={resultForDialog}
        onTryAgain={handleRedo}
        showAnswerReview={true}
      />

      {/* Answer Dialog */}
      <AnswerDialog
        open={showAnswer}
        onClose={() => setShowAnswer(false)}
        title={selectedQuestion.title}
        text={selectedQuestion.audio.audioText || "Audio content not available."}
        answers={selectedQuestion.options.filter(opt => opt.isCorrect).map((option, index) => ({
          id: option.id,
          position: index + 1,
          correctAnswer: `${option.id}) ${option.text}`
        }))}
      />

      {/* Translation Dialog */}
      <TranslationDialog
        open={showTranslate}
        onClose={() => setShowTranslate(false)}
        description="Translation feature will help you understand the question content in your preferred language."
      />

      {/* View Attempts Dialog */}
      <Dialog open={showAttempts} onClose={() => setShowAttempts(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">Past Attempts</Typography>
            <IconButton onClick={() => setShowAttempts(false)}>
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          {attempts.length === 0 ? (
            <Typography variant="body2">No attempts recorded yet.</Typography>
          ) : (
            <List>
              {attempts.map((attempt, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`Attempt ${index + 1} - Score: ${attempt.score}/100`}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          Time: {new Date(attempt.timestamp).toLocaleString()}
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2">
                            Selected: {attempt.selectedAnswers.join(', ')} | 
                            Correct: {attempt.correctAnswers.join(', ')}
                          </Typography>
                        </Box>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            onClick={() => {
              setAttempts([]);
              localStorage.removeItem('listeningMultipleChoiceAttempts');
            }}
          >
            Clear Attempts
          </Button>
          <Button onClick={() => setShowAttempts(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </GradientBackground>
  );
};

export default ListeningMultipleChoice;