import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Typography, RadioGroup, FormControlLabel, Radio, Paper, Stack, Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemText } from '@mui/material';
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
} from '../../../common';
import PracticeCardWithInstructionsPopover from '../../../common/PracticeCardWithInstructionsPopover';
import ActionButtons from '../../common/ActionButtons';
import NavigationSection from '../../common/NavigationSection';
import QuestionHeader from '../../common/QuestionHeader';
import StageGoalBanner from '../../common/StageGoalBanner';
import { MULTIPLE_CHOICE_QUESTIONS, convertLegacyQuestion } from './MultipleChoiceSingleMockData';
import { MultipleChoiceQuestion, QuestionResult, UserAttempt } from './MutlipleChoiceSingleType';
import { Close } from '@mui/icons-material';
import { questionTopics } from '../../speaking/answer-short-questions/questionTopics';
import { useFloatingSearch } from '../../../hooks/useFloatingSearch';

interface MultipleChoiceSingleProps { }

const MultipleChoiceSingle: React.FC<MultipleChoiceSingleProps> = () => {
  // Ensure questions are in the new format
  const questions = MULTIPLE_CHOICE_QUESTIONS.map(convertLegacyQuestion);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState<MultipleChoiceQuestion>(questions[currentQuestionIndex]);
  const [showQuestionSelector, setShowQuestionSelector] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [showTranslate, setShowTranslate] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showAttempts, setShowAttempts] = useState(false);
  const [currentResult, setCurrentResult] = useState<QuestionResult | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attempts, setAttempts] = useState<UserAttempt[]>([]);
  const [audioError, setAudioError] = useState<string | null>(null);

  // Timer state
  const [timer, setTimer] = useState({
    timeRemaining: 300, // 5 minutes
    isRunning: false,
    warningThreshold: 60,
    autoSubmit: true,
  });

  // Student info
  const [studentName] = useState('John Smith');
  const [testedCount] = useState(42);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<Date>(new Date());

  // Load attempts from localStorage
  useEffect(() => {
    const savedAttempts = localStorage.getItem('listeningMultipleChoiceSingleAttempts');
    if (savedAttempts) {
      try {
        setAttempts(JSON.parse(savedAttempts));
      } catch (error) {
        console.error('Failed to parse attempts:', error);
        localStorage.removeItem('listeningMultipleChoiceSingleAttempts');
      }
    }
  }, []);

  // Save attempt to localStorage
  const saveAttempt = useCallback((attempt: UserAttempt) => {
    setAttempts((prev) => {
      const newAttempts = [...prev, attempt];
      try {
        localStorage.setItem('listeningMultipleChoiceSingleAttempts', JSON.stringify(newAttempts));
      } catch (error) {
        console.error('Failed to save attempts:', error);
      }
      return newAttempts;
    });
  }, []);

  // Sync state when question changes
  useEffect(() => {
    setSelectedOption('');
    setTimer({
      timeRemaining: 300,
      isRunning: false,
      warningThreshold: 60,
      autoSubmit: true,
    });
    setIsSubmitted(false);
    setShowResults(false);
    setCurrentResult(null);
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
    if (!timer.isRunning && !isSubmitted && selectedOption) {
      setTimer(prev => ({ ...prev, isRunning: true }));
      startTimeRef.current = new Date();
    }
  }, [timer.isRunning, isSubmitted, selectedOption]);

  // Handle option selection
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isSubmitted) return;

    const value = event.target.value;
    setSelectedOption(value);

    // Start timer on first selection
    if (value) {
      startTimerIfNeeded();
    }
  };

  const hasResponse = useCallback((): boolean => {
    return selectedOption !== '';
  }, [selectedOption]);

  // Handle submission
  const handleSubmit = () => {
    if (isSubmitted) return;

    if (!selectedOption) {
      alert('Please select an option before submitting.');
      return;
    }

    setIsSubmitted(true);
    setTimer(prev => ({ ...prev, isRunning: false }));

    const endTime = new Date();
    const timeSpent = Math.floor((endTime.getTime() - startTimeRef.current.getTime()) / 1000);

    const correctAnswer = selectedQuestion.options.find(opt => opt.isCorrect);
    const isCorrect = selectedOption === correctAnswer?.id;
    const score = isCorrect ? 100 : 0;

    const result: QuestionResult = {
      questionId: String(selectedQuestion.id),
      selectedAnswer: selectedOption,
      correctAnswer: correctAnswer?.id || '',
      isCorrect,
      score,
      maxScore: 100,
      completedAt: endTime,
      timeSpent,
    };

    setCurrentResult(result);
    setShowResults(true);

    // Save attempt
    const attempt: UserAttempt = {
      questionId: selectedQuestion.id,
      selectedAnswer: selectedOption,
      correctAnswer: correctAnswer?.id || '',
      isCorrect,
      score,
      timestamp: new Date().toISOString(),
    };
    saveAttempt(attempt);
  };

  const handleRedo = () => {
    setSelectedOption('');
    setTimer({
      timeRemaining: 300,
      isRunning: false,
      warningThreshold: 60,
      autoSubmit: true,
    });
    setIsSubmitted(false);
    setShowResults(false);
    setCurrentResult(null);
    startTimeRef.current = new Date();

    // Clear existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };


  // Enable floating search button for this component
  useFloatingSearch({
    topics: questions,
    title: 'Multiple Choice Single',
    type: 'listening',
    onTopicSelect: (topic: any) => {
      setSelectedQuestion(topic);
      setCurrentQuestionIndex(questions.findIndex(t => t.id === topic.id));
    },
    enabled: true
  });

  // Navigation handlers
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      setSelectedQuestion(questions[newIndex]);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newIndex);
      setSelectedQuestion(questions[newIndex]);
    }
  };

  const handleSearch = () => {
    setShowQuestionSelector(true);
  };

  const handleQuestionSelect = (question: any) => {
    setSelectedQuestion(question);
    setCurrentQuestionIndex(questions.findIndex(q => q.id === question.id));
    setShowQuestionSelector(false);
  };

  const handleViewAttempts = () => {
    setShowAttempts(true);
  };

  // Get option color based on submission result
  const getOptionColor = (optionId: string): { bgcolor: string; color: string; border?: string } => {
    if (!isSubmitted || !currentResult) {
      return { bgcolor: 'transparent', color: '#333' };
    }

    const correctAnswer = selectedQuestion.options.find(opt => opt.isCorrect);

    if (optionId === currentResult.selectedAnswer && optionId === correctAnswer?.id) {
      return { bgcolor: '#4caf50', color: 'white' }; // Green for correct selection
    } else if (optionId === currentResult.selectedAnswer && optionId !== correctAnswer?.id) {
      return { bgcolor: '#f44336', color: 'white' }; // Red for incorrect selection
    } else if (optionId === correctAnswer?.id) {
      return { bgcolor: '#fff3e0', color: '#333', border: '2px solid #4caf50' }; // Show correct answer
    } else {
      return { bgcolor: 'transparent', color: '#333' };
    }
  };

  const questionNumber = testedCount + currentQuestionIndex + 1;

  // Create result for dialog
  const resultForDialog = currentResult ? {
    questionId: currentResult.questionId,
    score: currentResult.score,
    maxScore: currentResult.maxScore,
    correctAnswers: currentResult.isCorrect ? 1 : 0,
    totalQuestions: 1,
    completedAt: currentResult.completedAt,
    timeSpent: currentResult.timeSpent,
    percentage: currentResult.score,
    answers: [{
      id: 'single-choice',
      selectedAnswer: selectedQuestion.options.find(opt => opt.id === currentResult.selectedAnswer)?.text || '',
      correctAnswer: selectedQuestion.options.find(opt => opt.id === currentResult.correctAnswer)?.text || '',
      isCorrect: currentResult.isCorrect
    }]
  } : null;

  return (
    <GradientBackground>
      <StageGoalBanner />

      <PracticeCardWithInstructionsPopover
        icon="LCS"
        title="Listening Multiple Choice (Single)"
        instructions="Listen to the recording and answer the question by selecting the correct response. You will need to select only one response."
        difficulty={selectedQuestion.difficulty}
        instructionsConfig={{
          sections: [
            {
              title: 'Task Overview',
              items: ['Listen to a recording and answer the multiple choice question', 'Select ONLY ONE correct response', 'You can replay the audio multiple times'],
            },
            {
              title: 'Listening Strategy',
              items: ['Listen to the recording completely first', 'Take notes of key information', 'Pay attention to specific details mentioned', 'Focus on the exact question being asked'],
            },
            {
              title: 'Answering Tips',
              items: [
                'Read all options before selecting',
                'Look for exact matches with what you heard',
                'Eliminate clearly wrong answers first',
                'Don\'t overthink - go with what you heard',
                'Only one answer is correct'
              ],
            },
            {
              title: 'Scoring',
              items: ['Full points for correct answer', 'No points for incorrect answer', 'No partial credit available'],
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
          startMessage="Timer will start when you make your selection"
          autoSubmit={timer.autoSubmit}
        />

        {/* Dual Audio Player - supports both audio files and text-to-speech */}
        <ContentDisplay
          title="Listening Audio"
          content={
            <DualAudioPlayer
              audio={selectedQuestion.audio}
              onStart={() => console.log('Audio started')}
              onEnd={() => console.log('Audio ended')}
              onError={(error) => setAudioError(error)}
              // ={false}
              autoPlay={false}
            />
          }
          showMetadata={false}
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
          title="Select the correct answer:"
          content={
            <RadioGroup
              value={selectedOption}
              onChange={handleOptionChange}
            >
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
                    onClick={() => !isSubmitted && setSelectedOption(option.id)}
                  >
                    <FormControlLabel
                      value={option.id}
                      control={
                        <Radio
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
                            fontWeight: isSubmitted && option.isCorrect ? 'bold' : 'normal'
                          }}
                        >
                          <strong>{option.id})</strong> {option.text}
                        </Typography>
                      }
                    />
                  </Box>
                );
              })}
            </RadioGroup>
          }
          showMetadata={false}
        />

        {/* Submission Result */}
        {isSubmitted && currentResult && (
          <Paper sx={{ p: 3, mb: 3, bgcolor: currentResult.isCorrect ? '#e8f5e9' : '#ffebee' }}>
            <Typography variant="h6" sx={{ mb: 1, color: currentResult.isCorrect ? '#2e7d32' : '#d32f2f' }}>
              {currentResult.isCorrect ? '✅ Correct!' : '❌ Incorrect'} - Score: {currentResult.score}/100
            </Typography>
            <Typography variant="body2">
              Your answer: {selectedQuestion.options.find(opt => opt.id === currentResult.selectedAnswer)?.text}
            </Typography>
            {!currentResult.isCorrect && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Correct answer: {selectedQuestion.options.find(opt => opt.id === currentResult.correctAnswer)?.text}
              </Typography>
            )}
          </Paper>
        )}

        {/* Progress Indicator */}
        <ProgressIndicator
          current={selectedOption ? 1 : 0}
          total={1}
          label="option selected"
          customLabel={selectedOption ? 'Option selected' : 'No option selected'}
        />

        {/* Action Buttons */}
        <ActionButtons
          hasResponse={hasResponse()}
          onSubmit={handleSubmit}
          onRedo={handleRedo}
          onTranslate={() => setShowTranslate(true)}
          onShowAnswer={() => setShowAnswer(true)}
          recordedBlob={null}
          additionalActions={[
            {
              label: 'View Attempts',
              onClick: handleViewAttempts,
              variant: 'outlined'
            }
          ]}
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
        topics={questions}
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
        answers={[{
          id: 'correct-answer',
          correctAnswer: selectedQuestion.options.find(opt => opt.isCorrect)?.text || '',
          label: "Correct Answer"
        }]}
        explanation={selectedQuestion.explanation}
      />

      {/* Translation Dialog */}
      <TranslationDialog
        open={showTranslate}
        onClose={() => setShowTranslate(false)}
        description="Translation feature will help you understand the question content in your preferred language."
      />

      {/* View Attempts Dialog */}

      {/* Past Attempts Dialog */}
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
              {attempts.map((attempt, index) => {
                const question = questionTopics.find(q => q.id === attempt.questionId);
                return (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`Question: ${question?.title || 'Unknown'}`}
                      secondary={
                        <>
                          {attempts.map((attempt, index) => (
                            <Paper key={index} sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                              <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                                Attempt {index + 1} - Score: {attempt.score}/100
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#666', mb: 1, display: 'block' }}>
                                {new Date(attempt.timestamp).toLocaleString()}
                              </Typography>
                              <Typography variant="body2" sx={{
                                color: attempt.isCorrect ? '#2e7d32' : '#d32f2f',
                                fontWeight: 'bold'
                              }}>
                                {attempt.isCorrect ? '✅ Correct' : '❌ Incorrect'}
                              </Typography>
                              <Typography variant="body2" sx={{ fontSize: '12px', mt: 1 }}>
                                Selected: {selectedQuestion.options.find(opt => opt.id === attempt.selectedAnswer)?.text}
                              </Typography>
                            </Paper>
                          ))}

                        </>
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            onClick={() => {
              setAttempts([]);
              localStorage.removeItem('answerShortQuestionsAttempts');
            }}
          >
            Clear Attempts
          </Button>
          <Button onClick={() => setShowAttempts(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      {/* <AnswerDialog
        open={showAttempts}
        onClose={() => setShowAttempts(false)}
        title="Past Attempts"
        answers={[]}
        customContent={
          <Box>
            {attempts.length === 0 ? (
              <Typography variant="body2">No attempts recorded yet.</Typography>
            ) : (
              <Stack spacing={2}>
                {attempts.map((attempt, index) => (
                  <Paper key={index} sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Attempt {index + 1} - Score: {attempt.score}/100
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#666', mb: 1, display: 'block' }}>
                      {new Date(attempt.timestamp).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: attempt.isCorrect ? '#2e7d32' : '#d32f2f',
                      fontWeight: 'bold'
                    }}>
                      {attempt.isCorrect ? '✅ Correct' : '❌ Incorrect'}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '12px', mt: 1 }}>
                      Selected: {selectedQuestion.options.find(opt => opt.id === attempt.selectedAnswer)?.text}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            )}
          </Box>
        }
      /> */}
    </GradientBackground>
  );
};

export default MultipleChoiceSingle;