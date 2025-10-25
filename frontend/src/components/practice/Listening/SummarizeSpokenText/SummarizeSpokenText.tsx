import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, TextField, Typography, Stack, Chip, Paper, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Button } from '../../../common/Button';
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
import { allSummarizeSpokenTextTopics, convertLegacyTopic } from './SummarizeSpokenTextMockData';
import { SummarizeSpokenTextTopic, SummaryResponse, SummaryResult, UserAttempt } from './SummarizeSpokenTextType';
import { useFloatingSearch } from '../../../hooks/useFloatingSearch';

interface SummarizeSpokenTextProps {}

const SummarizeSpokenText: React.FC<SummarizeSpokenTextProps> = () => {
  // Convert legacy topics to new format
  const [selectedTopic, setSelectedTopic] = useState<SummarizeSpokenTextTopic>(
    convertLegacyTopic(allSummarizeSpokenTextTopics[0])
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showTopicSelector, setShowTopicSelector] = useState(false);
  const [summaryText, setSummaryText] = useState<string>('');
  const [wordCount, setWordCount] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showTranslate, setShowTranslate] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showAttempts, setShowAttempts] = useState(false);
  const [currentResult, setCurrentResult] = useState<SummaryResult | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attempts, setAttempts] = useState<UserAttempt[]>([]);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [audioValidation, setAudioValidation] = useState(validateAudioConfig(convertLegacyTopic(allSummarizeSpokenTextTopics[0]).audio));

  // Timer state
  const [timer, setTimer] = useState({
    timeRemaining: selectedTopic.timeLimit * 60,
    isRunning: false,
    warningThreshold: 60,
    autoSubmit: true,
  });

  // Student info
  const [studentName] = useState('Rachel Carson');
  const [testedCount] = useState(33);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<Date>(new Date());

  // Enable floating search button for this component
  useFloatingSearch({
    topics: allSummarizeSpokenTextTopics,
    title: 'Summarize Spoken Text',
    type: 'listening',
    onTopicSelect: (topic: any) => {
      const sstTopic = convertLegacyTopic(topic as SummarizeSpokenTextTopic);
      setSelectedTopic(sstTopic);
      setCurrentQuestionIndex(allSummarizeSpokenTextTopics.findIndex(t => t.id === sstTopic.id));
    },
    enabled: true
  });

  // Load attempts from localStorage
  useEffect(() => {
    const savedAttempts = localStorage.getItem('summarizeSpokenTextAttempts');
    if (savedAttempts) {
      try {
        setAttempts(JSON.parse(savedAttempts));
      } catch (error) {
        console.error('Failed to parse attempts:', error);
        localStorage.removeItem('summarizeSpokenTextAttempts');
      }
    }
  }, []);

  // Save attempt to localStorage
  const saveAttempt = useCallback((attempt: UserAttempt) => {
    setAttempts((prev) => {
      const newAttempts = [...prev, attempt];
      try {
        localStorage.setItem('summarizeSpokenTextAttempts', JSON.stringify(newAttempts));
      } catch (error) {
        console.error('Failed to save attempts:', error);
      }
      return newAttempts;
    });
  }, []);

  // Sync state when topic changes
  useEffect(() => {
    const topic = convertLegacyTopic(selectedTopic);
    setSelectedTopic(topic);
    setAudioValidation(validateAudioConfig(topic.audio));
    
    setTimer({
      timeRemaining: topic.timeLimit * 60,
      isRunning: false,
      warningThreshold: 60,
      autoSubmit: true,
    });
    setSummaryText('');
    setWordCount(0);
    setIsSubmitted(false);
    setShowResults(false);
    setCurrentResult(null);
    setAudioError(null);
    startTimeRef.current = new Date();

    // Clear existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [selectedTopic.id]);

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

  // Start timer when user starts typing
  const startTimerIfNeeded = useCallback(() => {
    if (!timer.isRunning && !isSubmitted && summaryText.trim().length > 0) {
      setTimer(prev => ({ ...prev, isRunning: true }));
      startTimeRef.current = new Date();
    }
  }, [timer.isRunning, isSubmitted, summaryText]);

  // Handle text change and word count
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isSubmitted) {
      const text = event.target.value;
      setSummaryText(text);

      // Count words (split by whitespace and filter empty strings)
      const words = text.trim().split(/\s+/).filter(word => word.length > 0);
      setWordCount(words.length);

      // Start timer on first meaningful input
      if (text.trim().length > 0) {
        startTimerIfNeeded();
      }
    }
  };

  const hasResponse = useCallback((): boolean => {
    return summaryText.trim().length > 0 && wordCount >= selectedTopic.wordLimit.min;
  }, [summaryText, wordCount, selectedTopic.wordLimit.min]);

  // Handle submission
  const handleSubmit = () => {
    if (isSubmitted) return;

    if (wordCount < selectedTopic.wordLimit.min || wordCount > selectedTopic.wordLimit.max) {
      const message = `Please ensure your summary is between ${selectedTopic.wordLimit.min}-${selectedTopic.wordLimit.max} words. Current word count: ${wordCount}`;
      alert(message);
      return;
    }

    setIsSubmitted(true);
    setTimer(prev => ({ ...prev, isRunning: false }));

    const endTime = new Date();
    const timeSpent = Math.floor((endTime.getTime() - startTimeRef.current.getTime()) / 1000);

    // Calculate score (simplified scoring)
    let score = 0;
    if (wordCount >= selectedTopic.wordLimit.min && wordCount <= selectedTopic.wordLimit.max) {
      score = Math.min(100, 60 + (summaryText.length / 10)); // Base score plus content
    }

    const result: SummaryResult = {
      questionId: String(selectedTopic.id),
      userSummary: summaryText,
      sampleSummary: selectedTopic.sampleSummary as string,
      score: Math.round(score),
      maxScore: 100,
      wordCount,
      timeSpent,
      completedAt: endTime,
      keyPointsCovered: [], // Would be calculated in real implementation
    };

    setCurrentResult(result);
    setShowResults(true);

    // Save attempt
    const attempt: UserAttempt = {
      questionId: selectedTopic.id,
      userSummary: summaryText,
      wordCount,
      score: Math.round(score),
      timestamp: new Date().toISOString(),
    };
    saveAttempt(attempt);
  };

  const handleRedo = () => {
    setSummaryText('');
    setWordCount(0);
    setTimer({
      timeRemaining: selectedTopic.timeLimit * 60,
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
      clearInterval(timerRef.current);
    }
  };

  // Navigation handlers
  const handleNext = () => {
    if (currentQuestionIndex < allSummarizeSpokenTextTopics.length - 1) {
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      setSelectedTopic(convertLegacyTopic(allSummarizeSpokenTextTopics[newIndex]));
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newIndex);
      setSelectedTopic(convertLegacyTopic(allSummarizeSpokenTextTopics[newIndex]));
    }
  };

  const handleSearch = () => {
    setShowTopicSelector(true);
  };

  const handleTopicSelect = (topic: any) => {
    const sstTopic = convertLegacyTopic(topic as SummarizeSpokenTextTopic);
    setSelectedTopic(sstTopic);
    setCurrentQuestionIndex(allSummarizeSpokenTextTopics.findIndex(t => t.id === sstTopic.id));
    setShowTopicSelector(false);
  };

  const handleViewAttempts = () => {
    setShowAttempts(true);
  };

  // Get word count color based on limits
  const getWordCountColor = (): string => {
    if (wordCount < selectedTopic.wordLimit.min) return '#ff9800'; // Orange for too few
    if (wordCount > selectedTopic.wordLimit.max) return '#f44336'; // Red for too many
    return '#4caf50'; // Green for correct range
  };

  const questionNumber = testedCount + currentQuestionIndex + 1;

  // Create result for dialog
  const resultForDialog = currentResult ? {
    questionId: currentResult.questionId,
    score: currentResult.score,
    maxScore: currentResult.maxScore,
    correctAnswers: 1,
    totalQuestions: 1,
    completedAt: currentResult.completedAt,
    timeSpent: currentResult.timeSpent,
    percentage: Math.round((currentResult.score / currentResult.maxScore) * 100),
    answers: []
  } : null;

  return (
    <GradientBackground>
      <StageGoalBanner />
      
      <PracticeCardWithInstructionsPopover
        icon="SST"
        title="Summarize Spoken Text"
        instructions="You will hear a short report. Write a summary for a fellow student who was not present. You should write 50-70 words. You have 10 minutes to finish this task. Your response will be judged on the quality of your writing and on how well your response presents the key points presented in the lecture."
        difficulty={selectedTopic.difficulty}
        instructionsConfig={{
          sections: [
            {
              title: 'Task Overview',
              items: ['Listen to a recording and write a summary of 50-70 words', 'You have 10 minutes to complete this task', 'The audio plays automatically and can only be heard once'],
            },
            {
              title: 'Listening Strategy',
              items: ['Take notes while listening', 'Focus on main ideas and key points', 'Identify topic sentences and supporting details', 'Listen for signal words (first, however, therefore)'],
            },
            {
              title: 'Writing Tips',
              items: [
                'Use your own words, not direct quotes',
                'Include only the most important information',
                'Write in complete sentences with proper grammar',
                'Check word count stays within 50-70 words',
                'Maintain the logical flow of ideas'
              ],
            },
            {
              title: 'Scoring Criteria',
              items: ['Content: How well you capture key points', 'Form: Staying within word limit', 'Grammar: Correct sentence structure', 'Vocabulary: Appropriate word choice'],
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
          startMessage="Timer will start when you begin typing"
          autoSubmit={timer.autoSubmit}
        />

        {/* Dual Audio Player */}
        <DualAudioPlayer
          audio={selectedTopic.audio}
          autoPlay={false}
          onStart={() => console.log('Audio started')}
          onEnd={() => console.log('Audio ended')}
          onError={(error) => setAudioError(error)}
          disabled={false}
          topicTitle={selectedTopic.title}
          questionNumber={questionNumber.toString()}
          remainingTime={`${Math.floor(timer.timeRemaining / 60)}:${String(timer.timeRemaining % 60).padStart(2, '0')}`}
          testedCount={testedCount}
        />

        {/* Topic Information */}
        <ContentDisplay
          title={selectedTopic.title}
          content={
            <Box>
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                <Chip
                  label={selectedTopic.difficulty}
                  size="small"
                  color={
                    selectedTopic.difficulty === 'Beginner' ? 'success' :
                    selectedTopic.difficulty === 'Intermediate' ? 'warning' : 'error'
                  }
                />
                <Chip
                  label={selectedTopic.category}
                  size="small"
                  variant="outlined"
                />
                {selectedTopic.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: '10px' }}
                  />
                ))}
              </Stack>
            </Box>
          }
          showMetadata={false}
        />

        {/* Text Input Area */}
        <ContentDisplay
          title="Write your summary:"
          content={
            <Box>
              <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Summary Response
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: getWordCountColor(),
                    fontWeight: 'bold'
                  }}
                >
                  {wordCount}/{selectedTopic.wordLimit.min}-{selectedTopic.wordLimit.max} words
                </Typography>
              </Box>

              <TextField
                fullWidth
                multiline
                rows={8}
                placeholder="Type your summary here..."
                value={summaryText}
                onChange={handleTextChange}
                disabled={isSubmitted}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: isSubmitted ? '#f5f5f5' : '#fff',
                    fontSize: { xs: '14px', sm: '16px' },
                    '& fieldset': {
                      borderColor: '#e0e0e0',
                    },
                    '&:hover fieldset': {
                      borderColor: isSubmitted ? '#e0e0e0' : '#1976d2',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                }}
              />

              {/* Submission Result Card */}
              {isSubmitted && (
                <Paper sx={{ p: 3, mt: 3, bgcolor: '#e8f5e9' }}>
                  <Stack spacing={2}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#2e7d32',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}
                    >
                      ✅ Summary Submitted Successfully!
                      <Chip
                        label={`${wordCount} words`}
                        size="small"
                        color="success"
                      />
                    </Typography>

                    <Typography variant="body2" sx={{
                      lineHeight: 1.6,
                      bgcolor: 'rgba(255,255,255,0.7)',
                      p: 2,
                      borderRadius: 1,
                      border: '1px solid rgba(0,0,0,0.1)'
                    }}>
                      <strong>Your Summary:</strong> {summaryText}
                    </Typography>
                  </Stack>
                </Paper>
              )}
            </Box>
          }
          showMetadata={false}
        />

        {/* Progress Indicator */}
        <ProgressIndicator
          current={wordCount >= selectedTopic.wordLimit.min ? 1 : 0}
          total={1}
          label="summary completed"
          customLabel={
            wordCount === 0 ? 'No summary written' :
            wordCount < selectedTopic.wordLimit.min ? 'Summary too short' :
            wordCount > selectedTopic.wordLimit.max ? 'Summary too long' :
            'Summary complete'
          }
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
        open={showTopicSelector}
        onClose={() => setShowTopicSelector(false)}
        onSelect={handleTopicSelect}
        topics={allSummarizeSpokenTextTopics}
        title="Select SST Topic"
        type="question"
      />

      {/* Results Dialog */}
      <ResultsDialog
        open={showResults}
        onClose={() => setShowResults(false)}
        result={resultForDialog}
        onTryAgain={handleRedo}
        showAnswerReview={false}
        customContent={
          currentResult && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>Summary Analysis:</Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Your Summary ({currentResult.wordCount} words):
                </Typography>
                <Paper sx={{ p: 2, bgcolor: '#fff3e0', border: '1px solid #ffb74d' }}>
                  <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                    "{currentResult.userSummary}"
                  </Typography>
                </Paper>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Sample Summary:
                </Typography>
                <Paper sx={{ p: 2, bgcolor: '#e8f5e9', border: '1px solid #4caf50' }}>
                  <Typography variant="body2">
                    "{currentResult.sampleSummary}"
                  </Typography>
                </Paper>
              </Box>
            </Box>
          )
        }
      />

      {/* Answer Dialog */}
      <AnswerDialog
        open={showAnswer}
        onClose={() => setShowAnswer(false)}
        title={selectedTopic.title}
        text={selectedTopic.audio.audioText}
        answers={[{
          id: 'sample-summary',
          position: 1,
          correctAnswer: selectedTopic.sampleSummary as string
        }]}
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
                    primary={`Attempt ${index + 1} - Score: ${attempt.score}/100`}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          Time: {new Date(attempt.timestamp).toLocaleString()} - {attempt.wordCount} words
                        </Typography>
                        <Box sx={{ mt: 1, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                            "{attempt.userSummary}"
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
              localStorage.removeItem('summarizeSpokenTextAttempts');
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

export default SummarizeSpokenText;