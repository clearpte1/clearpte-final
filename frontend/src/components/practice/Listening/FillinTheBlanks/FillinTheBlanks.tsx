import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Typography, Stack, Paper, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemText } from '@mui/material';
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
import InputField from '../../../common/InputField';
import { mockListeningPassages, mockStudentProgress, convertLegacyPassage } from './FillinTheBlanksMockData';
import { ListeningPassage, BlankPosition, TimerState, QuestionResult, UserAttempt } from './FillinTheBlanksTypes';
import QuestionHeader from '../../common/QuestionHeader';
import ActionButtons from '../../common/ActionButtons';
import NavigationSection from '../../common/NavigationSection';
import StageGoalBanner from '../../common/StageGoalBanner';
import { Close } from '@mui/icons-material';
import { questionTopics } from '../../speaking/answer-short-questions/questionTopics';
import { useFloatingSearch } from '../../../hooks/useFloatingSearch';

interface ListeningFillBlanksProps { }

const ListeningFillBlanks: React.FC<ListeningFillBlanksProps> = () => {
  // Ensure passages are in the new format
  const passages = mockListeningPassages.map(convertLegacyPassage);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [passage, setPassage] = useState<ListeningPassage>(passages[currentQuestionIndex]);
  const [showFillinBlanksSelector, setShowFillinBlanksSelector] = useState(false);

  // State management
  const [blanks, setBlanks] = useState<BlankPosition[]>(passage.blanks.map(blank => ({ ...blank })));
  const [timer, setTimer] = useState<TimerState>({
    timeRemaining: passage.timeLimit,
    isRunning: false, // Start as false, will be started when user first types
    warningThreshold: 30,
    autoSubmit: true,
  });

    // Enable floating search button for this component
      useFloatingSearch({
        topics: passages,
        title: 'Fillin the Blanks',
        type: 'listening',
        onTopicSelect: (topic: any) => {
          setPassage(topic);
          setCurrentQuestionIndex(passages.findIndex(t => t.id === topic.id));
        },
        enabled: true
      });

  // Audio state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(100);

  const [showAnswer, setShowAnswer] = useState(false);
  const [showTranslate, setShowTranslate] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentResult, setCurrentResult] = useState<QuestionResult | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attempts, setAttempts] = useState<UserAttempt[]>([]);
  const [showAttempts, setShowAttempts] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<Date>(new Date());

  // Load attempts from localStorage
  useEffect(() => {
    const savedAttempts = localStorage.getItem('listeningFillBlanksAttempts');
    if (savedAttempts) {
      try {
        setAttempts(JSON.parse(savedAttempts));
      } catch (error) {
        console.error('Failed to parse attempts:', error);
        localStorage.removeItem('listeningFillBlanksAttempts');
      }
    }
  }, []);

  // Save attempt to localStorage
  const saveAttempt = useCallback((attempt: UserAttempt) => {
    setAttempts((prev) => {
      const newAttempts = [...prev, attempt];
      try {
        localStorage.setItem('listeningFillBlanksAttempts', JSON.stringify(newAttempts));
      } catch (error) {
        console.error('Failed to save attempts:', error);
      }
      return newAttempts;
    });
  }, []);

  // Sync state when passage changes
  useEffect(() => {
    setBlanks(passage.blanks.map(blank => ({ ...blank })));
    setTimer({
      timeRemaining: passage.timeLimit,
      isRunning: false,
      warningThreshold: 30,
      autoSubmit: true,
    });
    setIsSubmitted(false);
    setShowResults(false);
    setCurrentResult(null);
    setAudioError(null);
    startTimeRef.current = new Date();
  }, [passage]);

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

  // Start timer when user first types
  const startTimerIfNeeded = useCallback(() => {
    if (!timer.isRunning && !isSubmitted) {
      setTimer(prev => ({ ...prev, isRunning: true }));
      startTimeRef.current = new Date();
    }
  }, [timer.isRunning, isSubmitted]);

  const studentProgress = mockStudentProgress;

  const handleNext = () => {
    if (currentQuestionIndex < passages.length - 1) {
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      setPassage(passages[newIndex]);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newIndex);
      setPassage(passages[newIndex]);
    }
  };

  const handleSearch = () => {
    setShowFillinBlanksSelector(true);
  };

  const handleFillinBlankSelect = (option: any) => {
    const newIndex = passages.findIndex(p => p.id === option.id);
    if (newIndex !== -1) {
      setCurrentQuestionIndex(newIndex);
      setPassage(option);
    }
    setShowFillinBlanksSelector(false);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const areAllBlanksFilled = useCallback((): boolean => {
    return blanks.every(blank => blank.filledWord && blank.filledWord.trim() !== '');
  }, [blanks]);

  // Handle text input change for blanks
  const handleBlankInputChange = (blankId: string, value: string) => {
    // Start timer on first input
    startTimerIfNeeded();

    setBlanks(prev => prev.map(blank =>
      blank.id === blankId
        ? { ...blank, filledWord: value }
        : blank
    ));
  };

  const handleSubmit = () => {
    if (isSubmitted) return;

    setIsSubmitted(true);
    setTimer(prev => ({ ...prev, isRunning: false }));

    const endTime = new Date();
    const timeSpent = Math.floor((endTime.getTime() - startTimeRef.current.getTime()) / 1000);

    let correctAnswers = 0;
    const evaluatedBlanks = blanks.map(blank => {
      const isCorrect = blank.filledWord?.toLowerCase().trim() === blank.correctAnswer.toLowerCase().trim();
      if (isCorrect) correctAnswers++;
      return { ...blank, isCorrect };
    });

    const score = Math.round((correctAnswers / blanks.length) * passage.maxScore);

    const result: QuestionResult = {
      questionId: String(passage?.id),
      score,
      maxScore: passage.maxScore,
      correctAnswers,
      totalBlanks: blanks.length,
      completedAt: endTime,
      timeSpent,
      answers: evaluatedBlanks,
    };

    setBlanks(evaluatedBlanks);
    setCurrentResult(result);
    setShowResults(true);

    // Save attempt
    const attempt: UserAttempt = {
      questionId: passage.id,
      answers: evaluatedBlanks.map(blank => ({
        blankId: blank.id,
        userAnswer: blank.filledWord || '',
        correctAnswer: blank.correctAnswer,
        isCorrect: blank.isCorrect || false
      })),
      score,
      timestamp: new Date().toISOString(),
    };
    saveAttempt(attempt);
  };

  const handleRedo = () => {
    setBlanks(passage.blanks.map(blank => ({ ...blank })));
    setTimer({
      timeRemaining: passage.timeLimit,
      isRunning: false,
      warningThreshold: 30,
      autoSubmit: true,
    });
    setIsSubmitted(false);
    setShowResults(false);
    setCurrentResult(null);
    startTimeRef.current = new Date();
  };

  const questionNumber = studentProgress.questionNumber + currentQuestionIndex;

  const handleViewAttempts = () => {
    setShowAttempts(true);
  };

  // Render text with input fields for blanks
  const renderTextWithBlanks = () => {
    let textParts = passage.text.split(/(\[BLANK_\d+\])/);

    return textParts.map((part, index) => {
      const blankMatch = part.match(/\[BLANK_(\d+)\]/);
      if (blankMatch) {
        const blankIndex = parseInt(blankMatch[1]);
        const blank = blanks.find(b => b.position === blankIndex);
        if (blank) {
          return (
            <InputField
              key={blank.id}
              value={blank.filledWord || ''}
              onChange={(e) => handleBlankInputChange(blank.id, e.target.value)}
              disabled={isSubmitted}
              isCorrect={blank.isCorrect}
              showValidation={isSubmitted}
              placeholder={`Blank ${blank.position + 1}`}
              customWidth="120px"
              fontSize={{ xs: '12px', sm: '14px' }}
            />
          );
        }
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <GradientBackground>
      <StageGoalBanner />

      <PracticeCardWithInstructionsPopover
        icon="FIB"
        title="Listening: Fill in the Blanks"
        instructions={passage.instructions}
        difficulty={passage.difficulty}
        instructionsConfig={{
          sections: [
            {
              title: 'Task Overview',
              items: ['Listen to a recording and fill in the missing words', 'You can listen to the audio multiple times', 'Type the missing words in the correct blanks'],
            },
            {
              title: 'Listening Strategy',
              items: ['Listen to the entire recording first', 'Take notes of key information', 'Focus on the context around each blank', 'Listen for grammar cues (articles, plurals, verb forms)'],
            },
            {
              title: 'Answering Tips',
              items: [
                'Listen for exact words - no synonyms needed',
                'Pay attention to spelling and grammar',
                'Consider word forms (singular/plural, verb tenses)',
                'Use context clues from surrounding text',
                'Listen multiple times to confirm answers'
              ],
            },
            {
              title: 'Scoring',
              items: ['Each correct word scores points', 'Spelling must be exact', 'Grammar and word form must be correct'],
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
          studentName={studentProgress.studentName}
          testedCount={studentProgress.testedCount}
        />

        {/* Timer */}
        <TimerDisplay
          timeRemaining={timer.timeRemaining}
          isRunning={timer.isRunning}
          warningThreshold={timer.warningThreshold}
          showStartMessage={!timer.isRunning && !isSubmitted}
          startMessage="Timer will start when you begin typing"
          autoSubmit={timer.autoSubmit}
        />

        {/* Dual Audio Player - supports both audio files and text-to-speech */}
        <ContentDisplay
          title="Listening Audio"
          content={
            <DualAudioPlayer
              audio={passage.audio}
              onStart={() => console.log('Audio started')}
              onEnd={() => console.log('Audio ended')}
              onError={(error) => setAudioError(error)}
              // showTranscript={false}
              autoPlay={false}
            />
          }
          showMetadata={false}
        />

        {/* Passage with Input Fields */}
        <ContentDisplay
          title={passage.title}
          content={renderTextWithBlanks()}
          category={passage.category}
          difficulty={passage.difficulty}
          tags={passage.tags}
          speaker={passage.speaker}
          duration={passage.duration}
          lineHeight={2}
        />

        {/* Progress Indicator */}
        <ProgressIndicator
          current={blanks.filter(b => b.filledWord && b.filledWord.trim() !== '').length}
          total={blanks.length}
          label="blanks filled"
        />

        {/* Action Buttons */}
        <ActionButtons
          hasResponse={areAllBlanksFilled()}
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
        open={showFillinBlanksSelector}
        onClose={() => setShowFillinBlanksSelector(false)}
        onSelect={handleFillinBlankSelect}
        topics={passages}
        title="Listening: Fill in the Blanks"
        type="question"
      />

      {/* Results Dialog */}
      <ResultsDialog
        open={showResults}
        onClose={() => setShowResults(false)}
        result={currentResult}
        onTryAgain={handleRedo}
      />

      {/* Answer Dialog */}
      <AnswerDialog
        open={showAnswer}
        onClose={() => setShowAnswer(false)}
        title={passage.title}
        audioTitle={passage.title}
        answers={blanks.map(blank => ({
          id: blank.id,
          position: blank.position,
          correctAnswer: blank.correctAnswer
        }))}
      />

      {/* Translation Dialog */}
      <TranslationDialog
        open={showTranslate}
        onClose={() => setShowTranslate(false)}
        description="Translation feature will help you understand the audio content in your preferred language."
      />


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
                          <Typography component="span" variant="body2">
                            Time: {new Date(attempt.timestamp).toLocaleString()}
                          </Typography>
                          <Box mt={1}>
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                              Score: {attempt.score}/{passage.maxScore}
                            </Typography>
                            {attempt.answers.map((answer, answerIndex) => (
                              <Typography key={answerIndex} variant="body2" sx={{ fontSize: '12px', mb: 0.5 }}>
                                Blank {answerIndex + 1}: "{answer.userAnswer}"
                                {answer.isCorrect ? ' ✓' : ` ✗ (Correct: "${answer.correctAnswer}")`}
                              </Typography>
                            ))}
                          </Box>

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
              localStorage.removeItem('listeningFillBlanksAttempts');
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

export default ListeningFillBlanks;