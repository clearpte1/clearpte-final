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
  Chip
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
import { mockHighlightIncorrectWordsQuestions, mockStudentProgress } from './HighlightIncorrectWordsMockData';
import { HighlightIncorrectWordsQuestion, TimerState, HighlightIncorrectWordsResult, IncorrectWord, UserAttempt } from './HighlightIncorrectWordsTypes';
import { useFloatingSearch } from '../../../hooks/useFloatingSearch';

interface HighlightIncorrectWordsProps {}

const HighlightIncorrectWords: React.FC<HighlightIncorrectWordsProps> = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [question, setQuestion] = useState<HighlightIncorrectWordsQuestion>(mockHighlightIncorrectWordsQuestions[currentQuestionIndex]);
  const [showQuestionSelector, setShowQuestionSelector] = useState(false);
  const [clickedWords, setClickedWords] = useState<Set<string>>(new Set());
  const [showAnswer, setShowAnswer] = useState(false);
  const [showTranslate, setShowTranslate] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showAttempts, setShowAttempts] = useState(false);
  const [currentResult, setCurrentResult] = useState<HighlightIncorrectWordsResult | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attempts, setAttempts] = useState<UserAttempt[]>([]);
  const [audioError, setAudioError] = useState<string | null>(null);

  // Timer state
  const [timer, setTimer] = useState<TimerState>({
    timeRemaining: question.timeLimit,
    isRunning: false,
    warningThreshold: 60,
    autoSubmit: true,
  });

  // Student info
  const [studentName] = useState(mockStudentProgress.studentName);
  const [testedCount] = useState(mockStudentProgress.testedCount);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<Date>(new Date());

  // Load attempts from localStorage
  useEffect(() => {
    const savedAttempts = localStorage.getItem('highlightIncorrectWordsAttempts');
    if (savedAttempts) {
      try {
        setAttempts(JSON.parse(savedAttempts));
      } catch (error) {
        console.error('Failed to parse attempts:', error);
        localStorage.removeItem('highlightIncorrectWordsAttempts');
      }
    }
  }, []);

  // Save attempt to localStorage
  const saveAttempt = useCallback((attempt: UserAttempt) => {
    setAttempts((prev) => {
      const newAttempts = [...prev, attempt];
      try {
        localStorage.setItem('highlightIncorrectWordsAttempts', JSON.stringify(newAttempts));
      } catch (error) {
        console.error('Failed to save attempts:', error);
      }
      return newAttempts;
    });
  }, []);

  // Sync state when question changes
  useEffect(() => {
    setClickedWords(new Set());
    setTimer({
      timeRemaining: question.timeLimit,
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

  // Start timer when user makes first click
  const startTimerIfNeeded = useCallback(() => {
    if (!timer.isRunning && !isSubmitted) {
      setTimer(prev => ({ ...prev, isRunning: true }));
      startTimeRef.current = new Date();
    }
  }, [timer.isRunning, isSubmitted]);

  const hasResponse = useCallback((): boolean => {
    return clickedWords.size > 0;
  }, [clickedWords]);

  // Handle word click
  const handleWordClick = (wordId: string) => {
    if (isSubmitted) return;
    
    startTimerIfNeeded();
    
    const newClickedWords = new Set(clickedWords);
    if (newClickedWords.has(wordId)) {
      newClickedWords.delete(wordId);
    } else {
      newClickedWords.add(wordId);
    }
    setClickedWords(newClickedWords);
  };

  const handleSubmit = () => {
    if (isSubmitted) return;

    setIsSubmitted(true);
    setTimer(prev => ({ ...prev, isRunning: false }));

    const endTime = new Date();
    const timeSpent = Math.floor((endTime.getTime() - startTimeRef.current.getTime()) / 1000);

    // Calculate results more accurately
    const correctWordIds = question.incorrectWords.map(word => word.id);
    const clickedWordIds = Array.from(clickedWords);
    
    // Separate correct clicks (target words) from incorrect clicks (non-target words)
    const correctClicks = clickedWordIds.filter(id => correctWordIds.includes(id)).length;
    const incorrectClicks = clickedWordIds.filter(id => !correctWordIds.includes(id)).length;
    const missedWords = correctWordIds.filter(id => !clickedWordIds.includes(id)).length;
    
    // Improved scoring algorithm
    const totalPossiblePoints = question.maxScore;
    const totalTargetWords = correctWordIds.length;
    
    if (totalTargetWords === 0) {
      // Edge case: no target words
      const score = incorrectClicks === 0 ? totalPossiblePoints : 0;
      createResult(score, correctClicks, incorrectClicks, missedWords, correctWordIds, clickedWordIds, endTime, timeSpent);
      return;
    }
    
    // Points per correct word
    const pointsPerCorrectWord = totalPossiblePoints / totalTargetWords;
    
    // Calculate base score from correct clicks
    const correctScore = correctClicks * pointsPerCorrectWord;
    
    // Apply penalty for incorrect clicks (50% of points per correct word)
    const penaltyPerIncorrectClick = pointsPerCorrectWord * 0.5;
    const incorrectPenalty = incorrectClicks * penaltyPerIncorrectClick;
    
    // Final score (minimum 0)
    const score = Math.max(0, Math.round(correctScore - incorrectPenalty));
    
    createResult(score, correctClicks, incorrectClicks, missedWords, correctWordIds, clickedWordIds, endTime, timeSpent);
  };

  const createResult = (
    score: number, 
    correctClicks: number, 
    incorrectClicks: number, 
    missedWords: number, 
    correctWordIds: string[], 
    clickedWordIds: string[], 
    endTime: Date, 
    timeSpent: number
  ) => {
    const accuracy = correctWordIds.length > 0 ? 
      Math.round((correctClicks / correctWordIds.length) * 100) : 100;

    const result: HighlightIncorrectWordsResult = {
      questionId: String(question.id),
      clickedWords: clickedWordIds,
      correctWords: correctWordIds,
      correctClicks,
      incorrectClicks,
      missedWords,
      score,
      maxScore: question.maxScore,
      accuracy,
      completedAt: endTime,
      timeSpent,
    };

    setCurrentResult(result);
    setShowResults(true);

    // Save attempt
    const attempt: UserAttempt = {
      questionId: question.id,
      clickedWords: clickedWordIds,
      correctWords: correctWordIds,
      score,
      timestamp: new Date().toISOString(),
    };
    saveAttempt(attempt);
  };

  const handleRedo = () => {
    setClickedWords(new Set());
    setTimer({
      timeRemaining: question.timeLimit,
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
      topics: mockHighlightIncorrectWordsQuestions,
      title: 'Highlight Incorrect Words',
      type: 'listening',
      onTopicSelect: (topic: any) => {
        setQuestion(topic);
        setCurrentQuestionIndex(mockHighlightIncorrectWordsQuestions.findIndex(t => t.id === topic.id));
      },
      enabled: true
    });

  // Navigation handlers
  const handleNext = () => {
    if (currentQuestionIndex < mockHighlightIncorrectWordsQuestions.length - 1) {
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      setQuestion(mockHighlightIncorrectWordsQuestions[newIndex]);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newIndex);
      setQuestion(mockHighlightIncorrectWordsQuestions[newIndex]);
    }
  };

  const handleSearch = () => {
    setShowQuestionSelector(true);
  };

  const handleQuestionSelect = (option: any) => {
    const newIndex = mockHighlightIncorrectWordsQuestions.findIndex(q => q.id === option.id);
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

  // Create result for dialog
  const resultForDialog = currentResult ? {
    questionId: currentResult.questionId,
    score: currentResult.score,
    maxScore: currentResult.maxScore,
    correctAnswers: currentResult.correctClicks,
    totalQuestions: currentResult.correctWords.length,
    completedAt: currentResult.completedAt,
    timeSpent: currentResult.timeSpent,
    percentage: currentResult.accuracy,
    answers: currentResult.correctWords.map((wordId, index) => ({
      id: wordId,
      position: index + 1,
      selectedAnswer: currentResult.clickedWords.includes(wordId) ? 'Selected' : 'Not Selected',
      correctAnswer: question.incorrectWords.find(w => w.id === wordId)?.word || '',
      isCorrect: currentResult.clickedWords.includes(wordId)
    }))
  } : null;

  return (
    <GradientBackground>
      <StageGoalBanner />
      
      <PracticeCardWithInstructionsPopover
        icon="HIW"
        title="Highlight Incorrect Words"
        instructions={question.instructions}
        difficulty={question.difficulty}
        instructionsConfig={{
          sections: [
            {
              title: 'Task Overview',
              items: ['Listen to the recording and read the transcription', 'Click on words that are different from what you heard', 'Words in the text may be incorrect compared to the audio'],
            },
            {
              title: 'Strategy Tips',
              items: ['Listen to the audio first while reading along', 'Pay attention to differences between audio and text', 'Click only on words that are incorrect', 'You can replay the audio as needed'],
            },
            {
              title: 'Clicking Guide',
              items: [
                'Click on words that don\'t match the audio',
                'Be precise - only click incorrect words',
                'Avoid clicking correct words (penalty applies)',
                'Selected words are highlighted in blue',
                'Review your selections before submitting'
              ],
            },
            {
              title: 'Scoring',
              items: ['Points for each correctly identified incorrect word', 'Penalty for clicking correct words', 'No points for missed incorrect words'],
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
          startMessage="Timer will start when you click a word"
          autoSubmit={timer.autoSubmit}
        />

        {/* Dual Audio Player */}
        <DualAudioPlayer
          audio={question.audio}
          autoPlay={false}
          onStart={() => console.log('Audio started')}
          onEnd={() => console.log('Audio ended')}
          onError={(error) => setAudioError(error)}
          topicTitle={question.title}
          questionNumber={questionNumber.toString()}
          remainingTime={`${Math.floor(timer.timeRemaining / 60)}:${(timer.timeRemaining % 60).toString().padStart(2, '0')}`}
          testedCount={testedCount}
        />

        {/* Instructions and Visual Guide */}
        <ContentDisplay
          title="Instructions"
          content={
            <Box>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {question.instructions}
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 2, 
                p: 2, 
                backgroundColor: '#f8f9fa', 
                borderRadius: 2,
                border: '1px solid #e9ecef'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ 
                    width: 20, 
                    height: 20, 
                    backgroundColor: '#1976d2', 
                    borderRadius: 1,
                    border: '2px solid #0d47a1'
                  }} />
                  <Typography variant="caption">Selected</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ 
                    width: 20, 
                    height: 20, 
                    backgroundColor: '#4caf50', 
                    borderRadius: 1,
                    border: '2px solid #2e7d32'
                  }} />
                  <Typography variant="caption">Correct</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ 
                    width: 20, 
                    height: 20, 
                    backgroundColor: '#f44336', 
                    borderRadius: 1,
                    border: '2px solid #d32f2f'
                  }} />
                  <Typography variant="caption">Missed</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ 
                    width: 20, 
                    height: 20, 
                    backgroundColor: '#ff9800', 
                    borderRadius: 1,
                    border: '2px solid #f57c00'
                  }} />
                  <Typography variant="caption">Wrong Click</Typography>
                </Box>
              </Box>
            </Box>
          }
          showMetadata={false}
        />

        {/* Transcription with Clickable Words */}
        <ContentDisplay
          title="Transcription - Click on words that are different from what you heard:"
          content={
            <Box sx={{ 
              p: 3, 
              lineHeight: 2.2,
              wordBreak: 'break-word',
              userSelect: 'none',
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              backgroundColor: '#fafafa'
            }}>
              {question.displayText.split(/(\s+)/).map((part, index) => {
                const cleanWord = part.trim().toLowerCase();
                const wordText = part.trim();
                
                // Skip empty strings and whitespace
                if (!wordText) {
                  return <Typography key={index} component="span">{part}</Typography>;
                }
                
                // Create a unique ID for this word
                const wordId = `word-${index}-${cleanWord}`;
                
                // Check if this word is one of the incorrect words we need to find
                const incorrectWord = question.incorrectWords.find(iw => 
                  iw.word.toLowerCase() === cleanWord
                );
                
                const isClicked = clickedWords.has(incorrectWord ? incorrectWord.id : wordId);
                const isTargetWord = Boolean(incorrectWord);
                
                // Determine styling based on state
                let wordStyle: any = {
                  cursor: isSubmitted ? 'default' : 'pointer',
                  padding: '3px 6px',
                  margin: '0 1px',
                  borderRadius: '6px',
                  border: '2px solid transparent',
                  transition: 'all 0.3s ease',
                  display: 'inline-block',
                  fontSize: 'inherit',
                  fontWeight: 'normal',
                  backgroundColor: 'transparent',
                  color: '#333'
                };

                if (isSubmitted) {
                  // After submission - show results
                  if (isTargetWord && isClicked) {
                    // Correctly identified incorrect word (GREEN)
                    wordStyle = {
                      ...wordStyle,
                      backgroundColor: '#4caf50',
                      color: 'white',
                      border: '2px solid #2e7d32',
                      fontWeight: 'bold',
                      boxShadow: '0 2px 4px rgba(76, 175, 80, 0.3)'
                    };
                  } else if (isTargetWord && !isClicked) {
                    // Missed incorrect word (RED with underline)
                    wordStyle = {
                      ...wordStyle,
                      backgroundColor: '#f44336',
                      color: 'white',
                      border: '2px solid #d32f2f',
                      fontWeight: 'bold',
                      textDecoration: 'underline',
                      boxShadow: '0 2px 4px rgba(244, 67, 54, 0.3)'
                    };
                  } else if (!isTargetWord && isClicked) {
                    // Incorrectly clicked correct word (ORANGE)
                    wordStyle = {
                      ...wordStyle,
                      backgroundColor: '#ff9800',
                      color: 'white',
                      border: '2px solid #f57c00',
                      fontWeight: 'bold',
                      boxShadow: '0 2px 4px rgba(255, 152, 0, 0.3)'
                    };
                  }
                } else {
                  // During interaction - show selection state
                  if (isClicked) {
                    // Word is selected (DARK BLUE)
                    wordStyle = {
                      ...wordStyle,
                      backgroundColor: '#1976d2',
                      color: 'white',
                      border: '2px solid #0d47a1',
                      fontWeight: 'bold',
                      transform: 'scale(1.05)',
                      boxShadow: '0 3px 6px rgba(25, 118, 210, 0.4)'
                    };
                  } else {
                    // Word is not selected - will use hover in sx prop
                    // Keep base styling
                  }
                }
                
                return (
                  <Typography
                    key={index}
                    component="span"
                    onClick={() => handleWordClick(incorrectWord ? incorrectWord.id : wordId)}
                    sx={{
                      ...wordStyle,
                      // Add hover effect only when not submitted and not clicked
                      ...(!isSubmitted && !isClicked && {
                        '&:hover': {
                          backgroundColor: '#e3f2fd',
                          border: '2px solid #bbdefb',
                          transform: 'scale(1.02)'
                        }
                      })
                    }}
                  >
                    {part}
                  </Typography>
                );
              })}
            </Box>
          }
          showMetadata={false}
        />

        {/* Progress Indicator */}
        <ProgressIndicator
          current={clickedWords.size}
          total={question.incorrectWords.length}
          label="incorrect words selected"
          customLabel={`${clickedWords.size} word(s) selected`}
          color={clickedWords.size > question.incorrectWords.length ? 'warning' : 'success'}
        />

        {/* Show score after submission */}
        {isSubmitted && currentResult && (
          <ContentDisplay
            title="Results"
            content={
              <Stack spacing={2}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Chip 
                    label={`Score: ${currentResult.score}/${currentResult.maxScore}`}
                    color={currentResult.score >= currentResult.maxScore * 0.7 ? 'success' : 'error'}
                    size="medium"
                    sx={{ fontWeight: 'bold', fontSize: '1rem' }}
                  />
                  <Chip 
                    label={`Accuracy: ${currentResult.accuracy}%`}
                    color={currentResult.accuracy >= 70 ? 'success' : 'warning'}
                    size="medium"
                    sx={{ fontWeight: 'bold' }}
                  />
                  <Chip 
                    label={`${currentResult.correctClicks}/${currentResult.correctWords.length} correct`}
                    color="info"
                    size="medium"
                  />
                </Stack>
                <Box sx={{ 
                  p: 2, 
                  backgroundColor: currentResult.score >= currentResult.maxScore * 0.7 ? '#e8f5e9' : '#fff3e0', 
                  borderRadius: 2,
                  border: `1px solid ${currentResult.score >= currentResult.maxScore * 0.7 ? '#4caf50' : '#ff9800'}`
                }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Detailed Results:
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    ✅ Correct clicks: {currentResult.correctClicks} | 
                    ❌ Incorrect clicks: {currentResult.incorrectClicks} | 
                    ⚠️ Missed words: {currentResult.missedWords}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Total words to find: {question.incorrectWords.length} | 
                    Total clicks made: {currentResult.clickedWords.length}
                  </Typography>
                </Box>
              </Stack>
            }
            showMetadata={false}
          />
        )}

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
        topics={mockHighlightIncorrectWordsQuestions}
        title="Highlight Incorrect Words"
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
              <Typography variant="h6" sx={{ mb: 2 }}>Detailed Analysis:</Typography>
              <Stack spacing={1} sx={{ mb: 2 }}>
                <Typography variant="body2">
                  <strong>Incorrect words to find:</strong> {question.incorrectWords.map(w => w.word).join(', ')}
                </Typography>
                <Typography variant="body2">
                  <strong>Words you clicked:</strong> {
                    currentResult.clickedWords.map(id => 
                      question.incorrectWords.find(w => w.id === id)?.word || 'Unknown'
                    ).join(', ') || 'None'
                  }
                </Typography>
              </Stack>
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
        answers={question.incorrectWords.map((word, index) => ({
          id: word.id,
          position: index + 1,
          correctAnswer: word.word
        }))}
        explanation={question.explanation}
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
                            Clicked Words: {attempt.clickedWords.map(id => 
                              question.incorrectWords.find(w => w.id === id)?.word || 'Unknown'
                            ).join(', ') || 'None'}
                          </Typography>
                          <Typography variant="body2">
                            Correct Words: {attempt.correctWords.map(id => 
                              question.incorrectWords.find(w => w.id === id)?.word || 'Unknown'
                            ).join(', ')}
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
              localStorage.removeItem('highlightIncorrectWordsAttempts');
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

export default HighlightIncorrectWords;