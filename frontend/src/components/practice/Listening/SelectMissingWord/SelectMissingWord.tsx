import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  FormControlLabel,
  RadioGroup,
  Radio,
  Paper
} from '@mui/material';
import { Close } from '@mui/icons-material';
import {
  TimerDisplay,
  ProgressIndicator,
  ResultsDialog,
  AnswerDialog,
  TranslationDialog,
  ContentDisplay,
  GradientBackground,
  TopicSelectionDrawer,
  DualAudioPlayer
} from '../../../common';
import PracticeCardWithInstructionsPopover from '../../../common/PracticeCardWithInstructionsPopover';
import ActionButtons from '../../common/ActionButtons';
import NavigationSection from '../../common/NavigationSection';
import QuestionHeader from '../../common/QuestionHeader';
import StageGoalBanner from '../../common/StageGoalBanner';
import { mockSelectMissingWordQuestions, mockStudentProgress } from './SelectMissingWordMockData';
import { SelectMissingWordQuestion, TimerState, SelectMissingWordResult, MissingWordOption, UserAttempt } from './SelectMissingWordType';
import { useFloatingSearch } from '../../../hooks/useFloatingSearch';

interface SelectMissingWordProps {}

const SelectMissingWord: React.FC<SelectMissingWordProps> = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [question, setQuestion] = useState<SelectMissingWordQuestion>(mockSelectMissingWordQuestions[currentQuestionIndex]);
  const [showQuestionSelector, setShowQuestionSelector] = useState(false);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showTranslate, setShowTranslate] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showAttempts, setShowAttempts] = useState(false);
  const [currentResult, setCurrentResult] = useState<SelectMissingWordResult | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attempts, setAttempts] = useState<UserAttempt[]>([]);
  const [audioError, setAudioError] = useState<string | null>(null);

  // Timer state
  const [timer, setTimer] = useState<TimerState>({
    timeRemaining: question.timeLimit,
    isRunning: false,
    warningThreshold: 30,
    autoSubmit: true,
  });

  // Student info
  const [studentName] = useState(mockStudentProgress.studentName);
  const [testedCount] = useState(mockStudentProgress.testedCount);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<Date>(new Date());

  // Load attempts from localStorage
  useEffect(() => {
    const savedAttempts = localStorage.getItem('selectMissingWordAttempts');
    if (savedAttempts) {
      try {
        setAttempts(JSON.parse(savedAttempts));
      } catch (error) {
        console.error('Failed to parse attempts:', error);
        localStorage.removeItem('selectMissingWordAttempts');
      }
    }
  }, []);

  // Save attempt to localStorage
  const saveAttempt = useCallback((attempt: UserAttempt) => {
    setAttempts((prev) => {
      const newAttempts = [...prev, attempt];
      try {
        localStorage.setItem('selectMissingWordAttempts', JSON.stringify(newAttempts));
      } catch (error) {
        console.error('Failed to save attempts:', error);
      }
      return newAttempts;
    });
  }, []);

  // Sync state when question changes
  useEffect(() => {
    setSelectedOption(null);
    setTimer({
      timeRemaining: question.timeLimit,
      isRunning: false,
      warningThreshold: 30,
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
  }, [question]);

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

  // Start timer when user makes first selection
  const startTimerIfNeeded = useCallback(() => {
    if (!timer.isRunning && !isSubmitted) {
      setTimer(prev => ({ ...prev, isRunning: true }));
      startTimeRef.current = new Date();
    }
  }, [timer.isRunning, isSubmitted]);

  const hasResponse = useCallback((): boolean => {
    return selectedOption !== null;
  }, [selectedOption]);

  // Handle option selection
  const handleOptionSelect = (option: 'A' | 'B' | 'C' | 'D') => {
    if (isSubmitted) return;
    startTimerIfNeeded();
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (isSubmitted) return;

    if (selectedOption === null) {
      alert('Please select an option before submitting.');
      return;
    }

    setIsSubmitted(true);
    setTimer(prev => ({ ...prev, isRunning: false }));

    const endTime = new Date();
    const timeSpent = Math.floor((endTime.getTime() - startTimeRef.current.getTime()) / 1000);

    const isCorrect = selectedOption === question.correctAnswer;
    const score = isCorrect ? question.maxScore : 0;

    const result: SelectMissingWordResult = {
      questionId: String(question.id),
      selectedOption,
      correctAnswer: question.correctAnswer,
      isCorrect,
      score,
      maxScore: question.maxScore,
      completedAt: endTime,
      timeSpent,
    };

    setCurrentResult(result);
    setShowResults(true);

    // Save attempt
    const attempt: UserAttempt = {
      questionId: question.id,
      selectedOption,
      correctAnswer: question.correctAnswer,
      score,
      timestamp: new Date().toISOString(),
    };
    saveAttempt(attempt);
  };

  const handleRedo = () => {
    setSelectedOption(null);
    setTimer({
      timeRemaining: question.timeLimit,
      isRunning: false,
      warningThreshold: 30,
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

  // Navigation handlers
  const handleNext = () => {
    if (currentQuestionIndex < mockSelectMissingWordQuestions.length - 1) {
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      setQuestion(mockSelectMissingWordQuestions[newIndex]);
    }
  };


  // Enable floating search button for this component
  useFloatingSearch({
    topics: mockSelectMissingWordQuestions,
    title: 'Select Missing Word',
    type: 'listening',
    onTopicSelect: (topic: any) => {
      setQuestion(topic);
      setCurrentQuestionIndex(mockSelectMissingWordQuestions.findIndex(t => t.id === topic.id));
    },
    enabled: true
  });
  

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newIndex);
      setQuestion(mockSelectMissingWordQuestions[newIndex]);
    }
  };

  const handleSearch = () => {
    setShowQuestionSelector(true);
  };

  const handleQuestionSelect = (option: any) => {
    const newIndex = mockSelectMissingWordQuestions.findIndex(q => q.id === option.id);
    if (newIndex !== -1) {
      setCurrentQuestionIndex(newIndex);
      setQuestion(option);
    }
    setShowQuestionSelector(false);
  };

  const handleViewAttempts = () => {
    setShowAttempts(true);
  };

  const questionNumber = mockStudentProgress.questionNumber + currentQuestionIndex;

  const getOptionStyle = (option: MissingWordOption) => {
    if (!isSubmitted) {
      return {
        cursor: 'pointer',
        border: selectedOption === option.label ? '2px solid #1976d2' : '1px solid #e0e0e0',
        bgcolor: selectedOption === option.label ? '#e3f2fd' : '#fff',
        '&:hover': { bgcolor: '#f5f5f5', borderColor: '#1976d2' }
      };
    }

    // Show results after submission
    const isSelected = selectedOption === option.label;
    const isCorrect = option.isCorrect;

    if (isSelected && isCorrect) {
      return { border: '2px solid #4caf50', bgcolor: '#e8f5e9' }; // Selected and correct
    } else if (isSelected && !isCorrect) {
      return { border: '2px solid #f44336', bgcolor: '#ffebee' }; // Selected but wrong
    } else if (!isSelected && isCorrect) {
      return { border: '2px solid #4caf50', bgcolor: '#e8f5e9' }; // Correct answer (not selected)
    } else {
      return { border: '1px solid #e0e0e0', bgcolor: '#f9f9f9' }; // Not selected, not correct
    }
  };

  // Function to create audio text with beep simulation
  const getAudioTextWithBeep = () => {
    // Replace the missing word with "BEEP" for text-to-speech
    return question.audio.audioText.replace(question.missingWordPosition, 'BEEP');
  };

  // Prepare audio config for DualAudioPlayer with beep simulation
  const getAudioConfigWithBeep = () => {
    const audioTextWithBeep = getAudioTextWithBeep();
    
    return {
      ...question.audio,
      audioText: audioTextWithBeep
    };
  };

  // Create result for dialog
  const resultForDialog = currentResult ? {
    questionId: currentResult.questionId,
    score: currentResult.score,
    maxScore: currentResult.maxScore,
    correctAnswers: currentResult.isCorrect ? 1 : 0,
    totalQuestions: 1,
    completedAt: currentResult.completedAt,
    timeSpent: currentResult.timeSpent,
    percentage: Math.round((currentResult.score / currentResult.maxScore) * 100),
    answers: [{
      id: 'missing-word',
      selectedAnswer: currentResult.selectedOption || 'No selection',
      correctAnswer: currentResult.correctAnswer,
      isCorrect: currentResult.isCorrect
    }]
  } : null;

  return (
    <GradientBackground>
      <StageGoalBanner />
      
      <PracticeCardWithInstructionsPopover
        icon="SMW"
        title="Select Missing Word"
        instructions={question.instructions}
        difficulty={question.difficulty}
        instructionsConfig={{
          sections: [
            {
              title: 'Task Overview',
              items: ['Listen to the recording completely', 'At the end, a missing word is replaced with a beep sound', 'Select the correct option that best fits the context'],
            },
            {
              title: 'Listening Strategy',
              items: ['Focus on the context before and after the beep', 'Listen for grammatical clues (word forms, tense)', 'Pay attention to the meaning and logical flow', 'Consider what type of word fits (noun, verb, adjective)'],
            },
            {
              title: 'Selection Tips',
              items: [
                'Read all options before selecting',
                'Consider which option makes grammatical sense',
                'Think about the meaning and context',
                'Eliminate options that don\'t fit logically',
                'Trust your first instinct if unsure'
              ],
            },
            {
              title: 'Scoring',
              items: ['Full points for correct selection', 'No points for incorrect selection', 'No partial credit available'],
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
          startMessage="Timer will start when you select an option"
          autoSubmit={timer.autoSubmit}
        />

        {/* Dual Audio Player */}
        <DualAudioPlayer
          audio={getAudioConfigWithBeep()}
          autoPlay={false}
          onStart={() => console.log('Audio started')}
          onEnd={() => console.log('Audio ended')}
          onError={(error) => setAudioError(error)}
          topicTitle={question.title}
          questionNumber={questionNumber.toString()}
          remainingTime={`${Math.floor(timer.timeRemaining / 60)}:${(timer.timeRemaining % 60).toString().padStart(2, '0')}`}
          testedCount={testedCount}
        />

        {/* Instructions and Options */}
        <ContentDisplay
          title="At the end of the recording the lost word or group of words has been replaced by a beep. Select the correct option to complete the recording."
          content={
            <RadioGroup 
              value={selectedOption || ''} 
              onChange={(e) => handleOptionSelect(e.target.value as 'A' | 'B' | 'C' | 'D')}
            >
              <Stack spacing={2}>
                {question.options.map((option) => (
                  <Paper 
                    key={option.id}
                    sx={{
                      p: 2,
                      ...getOptionStyle(option),
                      transition: 'all 0.2s ease-in-out'
                    }}
                    onClick={() => !isSubmitted && handleOptionSelect(option.label)}
                  >
                    <FormControlLabel
                      value={option.label}
                      control={<Radio sx={{ mt: -1 }} />}
                      disabled={isSubmitted}
                      label={
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontSize: { xs: '14px', sm: '15px', md: '16px' },
                            lineHeight: 1.6,
                            pl: 1
                          }}
                        >
                          <strong>{option.label})</strong> {option.text}
                        </Typography>
                      }
                      sx={{ 
                        width: '100%', 
                        margin: 0,
                        alignItems: 'flex-start',
                        cursor: isSubmitted ? 'default' : 'pointer'
                      }}
                    />
                  </Paper>
                ))}
              </Stack>
            </RadioGroup>
          }
          showMetadata={false}
        />

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
        topics={mockSelectMissingWordQuestions}
        title="Select Missing Word"
        type="question"
      />

      {/* Results Dialog */}
      <ResultsDialog
        open={showResults}
        onClose={() => setShowResults(false)}
        result={resultForDialog}
        onTryAgain={handleRedo}
        showAnswerReview={true}
        customContent={
          currentResult && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>Missing Word Details:</Typography>
              <Box sx={{ mb: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Missing Word Position: "{question.missingWordPosition}"
                </Typography>
                <Typography variant="body2">
                  Complete sentence with correct word: {question.audio.audioText}
                </Typography>
              </Box>
              {question.explanation && (
                <Box sx={{ p: 2, bgcolor: '#e8f5e9', borderRadius: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Explanation:
                  </Typography>
                  <Typography variant="body2">
                    {question.explanation}
                  </Typography>
                </Box>
              )}
            </Box>
          )
        }
      />

      {/* Answer Dialog */}
      <AnswerDialog
        open={showAnswer}
        onClose={() => setShowAnswer(false)}
        title={question.title}
        text={question.audio.audioText}
        answers={[{
          id: 'correct-option',
          position: 1,
          correctAnswer: `${question.correctAnswer}) ${question.options.find(opt => opt.isCorrect)?.text || ''}`
        }]}
        explanation={question.explanation}
        guidance={
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
              Missing Word: "{question.missingWordPosition}"
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Listen carefully to the context around the beep to identify the missing word.
            </Typography>
          </Box>
        }
      />

      {/* Translation Dialog */}
      <TranslationDialog
        open={showTranslate}
        onClose={() => setShowTranslate(false)}
        description="Translation feature will help you understand the audio content in your preferred language."
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
                    primary={`Attempt ${index + 1} - Score: ${attempt.score}/${question.maxScore}`}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          Time: {new Date(attempt.timestamp).toLocaleString()}
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2">
                            Selected: {attempt.selectedOption} | 
                            Correct: {attempt.correctAnswer} | 
                            Result: {attempt.selectedOption === attempt.correctAnswer ? '✓ Correct' : '✗ Incorrect'}
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
              localStorage.removeItem('selectMissingWordAttempts');
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

export default SelectMissingWord;