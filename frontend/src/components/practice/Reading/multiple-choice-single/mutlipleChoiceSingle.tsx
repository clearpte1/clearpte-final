import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  LinearProgress
} from '@mui/material';
import { Close } from '@mui/icons-material';
import TopicSelectionDrawer from '../../../common/TopicSelectionDrawer';
import ActionButtons from '../../common/ActionButtons';
import NavigationSection from '../../common/NavigationSection';
import QuestionHeader from '../../common/QuestionHeader';
import StageGoalBanner from '../../common/StageGoalBanner';
import { allMultipleChoiceQuestions } from './mutlipleChoiceSingleMockData';
import { MultipleChoiceQuestion, QuestionProgress, PerformanceData, QuestionResult, TimerState } from './mutlipleChoiceSingleType';
import { GradientBackground, TimerDisplay, ContentDisplay, ProgressIndicator, ResultsDialog, AnswerDialog, TranslationDialog } from '../../../common';
import PracticeCardWithInstructionsPopover from '../../../common/PracticeCardWithInstructionsPopover';
import { useFloatingSearch } from '../../../hooks/useFloatingSearch';

const MultipleChoiceSingle: React.FC = () => {
 // State management
  const [selectedQuestion, setSelectedQuestion] = useState<MultipleChoiceQuestion>(allMultipleChoiceQuestions[0]);
  const [showTopicSelector, setShowTopicSelector] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Timer state
  const [timer, setTimer] = useState<TimerState>({
    timeRemaining: 0,
    isRunning: false,
    warningThreshold: 30,
    autoSubmit: true,
  });

  // Dialog states
  const [showAnswer, setShowAnswer] = useState(false);
  const [showTranslate, setShowTranslate] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentResult, setCurrentResult] = useState<QuestionResult | null>(null);

  // Performance tracking
  const [questionProgress, setQuestionProgress] = useState<QuestionProgress[]>([]);
  const [currentQuestionStartTime, setCurrentQuestionStartTime] = useState<number>(Date.now());

  // Student info
  const [studentName] = useState('Rachel Carson');
  const [testedCount] = useState(33);

  // Timer reference
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<Date>(new Date());

  // Enable floating search button for this component
  useFloatingSearch({
    topics: allMultipleChoiceQuestions,
    title: 'Multiple Choice (Single) Practice',
    type: 'reading',
    onTopicSelect: (topic: any) => {
      const question = topic as MultipleChoiceQuestion;
      handleQuestionSelect(question);
    },
    enabled: true
  });

  // Initialize timer when question changes
  useEffect(() => {
    setTimer({
      timeRemaining: selectedQuestion.timeLimit,
      isRunning: false,
      warningThreshold: 30,
      autoSubmit: true,
    });
    setCurrentQuestionStartTime(Date.now());
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setShowAnswer(false);
    setShowResults(false);
    setCurrentResult(null);
    startTimeRef.current = new Date();
    
    // Clear existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [selectedQuestion.id]);
const [showPerformance, setShowPerformance] = useState(false);
  const handleShowPerformance = () => setShowPerformance(true);

  // Calculate performance data
  const getPerformanceData = (): PerformanceData => {
    const answeredQuestions = questionProgress.filter(p => p.selectedAnswer !== null);
    const correctAnswers = answeredQuestions.filter(p => p.isCorrect).length;
    const totalTimeSpent = answeredQuestions.reduce((sum, p) => sum + p.timeSpent, 0);
    
    // Category performance
    const categoryPerformance: Record<string, { total: number; correct: number; percentage: number }> = {};
    answeredQuestions.forEach(progress => {
      const question = allMultipleChoiceQuestions.find(q => q.id === progress.questionId);
      if (question) {
        if (!categoryPerformance[question.category]) {
          categoryPerformance[question.category] = { total: 0, correct: 0, percentage: 0 };
        }
        categoryPerformance[question.category].total++;
        if (progress.isCorrect) {
          categoryPerformance[question.category].correct++;
        }
        categoryPerformance[question.category].percentage = 
          Math.round((categoryPerformance[question.category].correct / categoryPerformance[question.category].total) * 100);
      }
    });

    // Difficulty performance
    const difficultyPerformance: Record<string, { total: number; correct: number; percentage: number }> = {};
    answeredQuestions.forEach(progress => {
      const question = allMultipleChoiceQuestions.find(q => q.id === progress.questionId);
      if (question) {
        if (!difficultyPerformance[question.difficulty]) {
          difficultyPerformance[question.difficulty] = { total: 0, correct: 0, percentage: 0 };
        }
        difficultyPerformance[question.difficulty].total++;
        if (progress.isCorrect) {
          difficultyPerformance[question.difficulty].correct++;
        }
        difficultyPerformance[question.difficulty].percentage = 
          Math.round((difficultyPerformance[question.difficulty].correct / difficultyPerformance[question.difficulty].total) * 100);
      }
    });

    return {
      totalQuestions: answeredQuestions.length,
      correctAnswers,
      totalTimeSpent,
      averageTimePerQuestion: answeredQuestions.length > 0 ? Math.round(totalTimeSpent / answeredQuestions.length) : 0,
      categoryPerformance,
      difficultyPerformance
    };
  };

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

  // Start timer when user selects an answer
  useEffect(() => {
    if (selectedAnswer !== null && !timer.isRunning && !isSubmitted) {
      setTimer(prev => ({ ...prev, isRunning: true }));
    }
  }, [selectedAnswer, timer.isRunning, isSubmitted]);

  // Handle question selection
  const handleQuestionSelect = (question: any) => {
    setSelectedQuestion(question);
    setQuestionNumber(allMultipleChoiceQuestions.findIndex(q => q.id === question.id) + 1);
    setShowTopicSelector(false);
  };

  // Handle answer selection
  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isSubmitted) {
      setSelectedAnswer(parseInt(event.target.value));
    }
  };

  // Handle submit
  const handleSubmit = () => {
    if (selectedAnswer === null && !isSubmitted) {
      // alert('Please select an answer before submitting.');
      return;
    }

    if (isSubmitted) return;

    // Stop the timer immediately
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setIsSubmitted(true);
    setTimer(prev => ({ ...prev, isRunning: false }));

    const endTime = new Date();
    const timeSpent = Math.floor((endTime.getTime() - startTimeRef.current.getTime()) / 1000);
    const isCorrect = selectedAnswer === selectedQuestion.correctAnswer;
    
    // Update progress tracking
    const newProgress: QuestionProgress = {
      questionId: selectedQuestion.id,
      selectedAnswer,
      isCorrect,
      timeSpent,
      attempts: 1
    };
    
    setQuestionProgress(prev => {
      const existingIndex = prev.findIndex(p => p.questionId === selectedQuestion.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { ...newProgress, attempts: prev[existingIndex].attempts + 1 };
        return updated;
      }
      return [...prev, newProgress];
    });

    // Calculate score
    const score = isCorrect ? Math.round((1 - timeSpent / selectedQuestion.timeLimit) * 100) : 0;

    const result: QuestionResult = {
      questionId: String(selectedQuestion.id),
      score,
      maxScore: 100,
      correctAnswers: isCorrect ? 1 : 0,
      totalQuestions: 1,
      completedAt: endTime,
      timeSpent,
      percentage: score,
      answers: [{
        id: 'answer',
        selectedAnswer: selectedAnswer !== null ? selectedQuestion.options[selectedAnswer] : null,
        correctAnswer: selectedQuestion.options[selectedQuestion.correctAnswer],
        isCorrect
      }]
    };

    setCurrentResult(result);
    setShowResults(true);
  };

  // Handle re-do
  const handleRedo = () => {
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setShowAnswer(false);
    setShowResults(false);
    setCurrentResult(null);
    setTimer({
      timeRemaining: selectedQuestion.timeLimit,
      isRunning: false,
      warningThreshold: 30,
      autoSubmit: true,
    });
    setCurrentQuestionStartTime(Date.now());
    startTimeRef.current = new Date();
  };

  // Navigation handlers
  const handlePrevious = () => {
    if (questionNumber > 1) {
      const prevQuestion = allMultipleChoiceQuestions[questionNumber - 2];
      handleQuestionSelect(prevQuestion);
    }
  };

  const handleNext = () => {
    if (questionNumber < allMultipleChoiceQuestions.length) {
      const nextQuestion = allMultipleChoiceQuestions[questionNumber];
      handleQuestionSelect(nextQuestion);
    } else {
      setShowTopicSelector(true);
    }
  };

  // Dialog handlers
  const handleShowAnswer = () => setShowAnswer(true);
  const handleTranslate = () => setShowTranslate(true);
  const handleSearch = () => setShowTopicSelector(true);
  const performanceData = getPerformanceData();

  return (
    <GradientBackground>
      <StageGoalBanner />

      <PracticeCardWithInstructionsPopover
        icon="MCS"
        title="Multiple Choice (Single)"
        instructions="Read the text and answer the multiple choice question by selecting the correct response. Only one response is correct."
        difficulty={selectedQuestion.difficulty}
        instructionsConfig={{
          sections: [
            {
              title: 'Task Overview',
              items: ['Read the passage carefully and answer the multiple choice question', 'Only one response is correct'],
            },
            {
              title: 'Time Management',
              items: ['Read the question first to focus your reading', 'Scan the passage for relevant information', 'Choose the best answer from the given options'],
            },
            {
              title: 'Strategy Tips',
              items: [
                'Eliminate obviously wrong answers first',
                'Look for keywords that match the question',
                'Consider the context and main ideas',
                'Don\'t overthink - choose the most logical answer'
              ],
            },
            {
              title: 'Scoring',
              items: ['1 point for correct answer', '0 points for incorrect answer', 'No negative marking'],
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
         <Button
          variant="outlined"
          size="small"
          onClick={handleShowPerformance}
          sx={{ textTransform: 'none' }}
        >
          View Performance
        </Button>

        <TimerDisplay
          timeRemaining={timer.timeRemaining}
          isRunning={timer.isRunning}
          warningThreshold={timer.warningThreshold}
          showStartMessage={!timer.isRunning}
          startMessage="Timer will start when you select an answer"
          autoSubmit={timer.autoSubmit}
        />

        {/* Question Display */}
        <ContentDisplay
          title={selectedQuestion.title}
          content={
            <Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold', 
                  mb: 2, 
                  color: '#333',
                  fontSize: { xs: '16px', sm: '18px', md: '20px' }
                }}
              >
                {selectedQuestion.questionText}
              </Typography>
              
              <RadioGroup
                value={selectedAnswer?.toString() || ''}
                onChange={handleAnswerChange}
                sx={{ mt: 2 }}
              >
                {selectedQuestion.options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={index.toString()}
                    control={<Radio disabled={isSubmitted} />}
                    label={
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: isSubmitted 
                            ? (index === selectedQuestion.correctAnswer 
                              ? '#4caf50' 
                              : (index === selectedAnswer 
                                ? '#f44336' 
                                : '#666'))
                            : '#333',
                          fontWeight: isSubmitted && index === selectedQuestion.correctAnswer ? 'bold' : 'normal'
                        }}
                      >
                        {String.fromCharCode(65 + index)}) {option}
                        {isSubmitted && index === selectedQuestion.correctAnswer && ' ✅'}
                        {isSubmitted && index === selectedAnswer && index !== selectedQuestion.correctAnswer && ' ❌'}
                      </Typography>
                    }
                    sx={{ 
                      alignItems: 'flex-start',
                      mb: 1,
                      '& .MuiFormControlLabel-label': {
                        paddingLeft: 1
                      }
                    }}
                  />
                ))}
              </RadioGroup>
            </Box>
          }
          category={selectedQuestion.category}
          difficulty={selectedQuestion.difficulty}
          tags={[`${selectedQuestion.timeLimit}s`]}
          showMetadata={true}
        />

        {/* Answer Explanation Card - Shows after submission */}
        {isSubmitted && (
          <Alert 
            severity={selectedAnswer === selectedQuestion.correctAnswer ? 'success' : 'error'} 
            sx={{ mb: 3 }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              {selectedAnswer === selectedQuestion.correctAnswer ? '✅ Correct!' : '❌ Incorrect'}
              {selectedAnswer === selectedQuestion.correctAnswer && (
                <Chip 
                  label={`Score: ${Math.round((1 - (Math.floor((Date.now() - currentQuestionStartTime) / 1000)) / selectedQuestion.timeLimit) * 100)}%`}
                  size="small"
                  color="success"
                  sx={{ ml: 1 }}
                />
              )}
            </Typography>
            
            {selectedAnswer !== selectedQuestion.correctAnswer && (
              <Typography variant="body1" sx={{ color: '#2e7d32', fontWeight: 'bold', mb: 1 }}>
                <strong>Correct Answer:</strong> {String.fromCharCode(65 + selectedQuestion.correctAnswer)}) {selectedQuestion.options[selectedQuestion.correctAnswer]}
              </Typography>
            )}
            
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              <strong>Explanation:</strong> {selectedQuestion.explanation}
            </Typography>
          </Alert>
        )}

        <ProgressIndicator
          current={selectedAnswer !== null ? 1 : 0}
          total={1}
          label="question answered"
          color={isSubmitted ? (selectedAnswer === selectedQuestion.correctAnswer ? 'success' : 'error') : 'primary'}
        />

        <ActionButtons
          hasResponse={selectedAnswer !== null}
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
        open={showTopicSelector}
        onClose={() => setShowTopicSelector(false)}
        onSelect={handleQuestionSelect}
        topics={allMultipleChoiceQuestions}
        title="Select Question"
        type="question"
      />

      <ResultsDialog
        open={showResults}
        onClose={() => setShowResults(false)}
        result={currentResult}
        onTryAgain={handleRedo}
        customContent={
          currentResult && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Performance Analysis:</Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Time Performance:</Typography>
                  <Typography variant="body2">
                    Completed in {currentResult.timeSpent} seconds out of {selectedQuestion.timeLimit} seconds allowed
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Answer Analysis:</Typography>
                  <Typography variant="body2" color={currentResult.correctAnswers > 0 ? 'success.main' : 'error.main'}>
                    {currentResult.correctAnswers > 0 ? 'Correct answer selected' : 'Incorrect answer selected'}
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
        title={selectedQuestion.title}
        answers={[{
          id: 'correct-answer',
          correctAnswer: `${String.fromCharCode(65 + selectedQuestion.correctAnswer)}) ${selectedQuestion.options[selectedQuestion.correctAnswer]}`,
          label: 'Correct Answer'
        }]}
        explanation={selectedQuestion.explanation}
      />

       {/* Performance Dialog */}
      <Dialog open={showPerformance} onClose={() => setShowPerformance(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">Performance Summary</Typography>
            <IconButton onClick={() => setShowPerformance(false)}>
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            {/* Overall Performance */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>Overall Performance</Typography>
              <Stack direction="row" spacing={4}>
                <Box>
                  <Typography variant="h4" color="primary">{performanceData.correctAnswers}</Typography>
                  <Typography variant="body2">Correct Answers</Typography>
                </Box>
                <Box>
                  <Typography variant="h4" color="text.secondary">{performanceData.totalQuestions}</Typography>
                  <Typography variant="body2">Total Questions</Typography>
                </Box>
                <Box>
                  <Typography variant="h4" color="warning.main">
                    {performanceData.totalQuestions > 0 ? Math.round((performanceData.correctAnswers / performanceData.totalQuestions) * 100) : 0}%
                  </Typography>
                  <Typography variant="body2">Accuracy</Typography>
                </Box>
                <Box>
                  <Typography variant="h4" color="info.main">{performanceData.averageTimePerQuestion}s</Typography>
                  <Typography variant="body2">Avg Time/Question</Typography>
                </Box>
              </Stack>
            </Box>

            {/* Category Performance */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>Performance by Category</Typography>
              {Object.entries(performanceData.categoryPerformance).map(([category, stats]) => (
                <Box key={category} sx={{ mb: 2 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body1">{category}</Typography>
                    <Typography variant="body2">
                      {stats.correct}/{stats.total} ({stats.percentage}%)
                    </Typography>
                  </Stack>
                  <LinearProgress 
                    variant="determinate" 
                    value={stats.percentage} 
                    sx={{ mt: 0.5 }}
                  />
                </Box>
              ))}
            </Box>

            {/* Difficulty Performance */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>Performance by Difficulty</Typography>
              {Object.entries(performanceData.difficultyPerformance).map(([difficulty, stats]) => (
                <Box key={difficulty} sx={{ mb: 2 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body1">{difficulty}</Typography>
                    <Typography variant="body2">
                      {stats.correct}/{stats.total} ({stats.percentage}%)
                    </Typography>
                  </Stack>
                  <LinearProgress 
                    variant="determinate" 
                    value={stats.percentage} 
                    sx={{ mt: 0.5 }}
                    color={
                      difficulty === 'Beginner' ? 'success' :
                      difficulty === 'Intermediate' ? 'warning' : 'error'
                    }
                  />
                </Box>
              ))}
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPerformance(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <TranslationDialog
        open={showTranslate}
        onClose={() => setShowTranslate(false)}
        description="Translation feature will help you understand the question content in your preferred language."
      />
    </GradientBackground>
  );
};

export default MultipleChoiceSingle;