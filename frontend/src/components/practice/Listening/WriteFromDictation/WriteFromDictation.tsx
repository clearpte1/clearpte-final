import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box,
  TextField,
  Typography,
  Stack,
  Chip,
  Paper
} from '@mui/material';
import {
  PracticeCard,
  TimerDisplay,
  ProgressIndicator,
  ResultsDialog,
  AnswerDialog,
  TranslationDialog,
  ContentDisplay,
  GradientBackground,
  TopicSelectionDrawer,
  DualAudioPlayer,
  PracticeCardWithInstructionsPopover
} from '../../../common';
import { mockWriteFromDictationQuestions, mockStudentProgress } from './WriteFromDictationMockData';
import { WriteFromDictationQuestion, TimerState, WriteFromDictationResult, WordAnalysis } from './WriteFromDictationTypes';
import ActionButtons from '../../common/ActionButtons';
import NavigationSection from '../../common/NavigationSection';
import QuestionHeader from '../../common/QuestionHeader';
import { useFloatingSearch } from '../../../hooks/useFloatingSearch';
import { fetchWriteFromDictationQuestions } from '../../../../services/listening/fetchQuestions';

interface WriteFromDictationProps { }

const WriteFromDictationRefactored: React.FC<WriteFromDictationProps> = () => {
  const [questions, setQuestions] = useState<WriteFromDictationQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [question, setQuestion] = useState<WriteFromDictationQuestion | undefined>(questions[currentQuestionIndex]);
  const [showQuestionSelector, setShowQuestionSelector] = useState(false);

  // State management
  const [userInput, setUserInput] = useState<string>('');
  const [timer, setTimer] = useState<TimerState>({
    timeRemaining: question?.timeLimit || 0,
    isRunning: false,
    warningThreshold: 60,
    autoSubmit: true,
  });

  const [showAnswer, setShowAnswer] = useState(false);
  const [showTranslate, setShowTranslate] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentResult, setCurrentResult] = useState<WriteFromDictationResult | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasPlayedAudio, setHasPlayedAudio] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<Date>(new Date());

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const apiQuestions = await fetchWriteFromDictationQuestions();
        const mappedQuestions: WriteFromDictationQuestion[] = apiQuestions.map((question): WriteFromDictationQuestion => ({
          id: question.id,
          category: question.category,
          difficulty: question.difficulty,
          keyWords: (question.key_words || []) as string[],
          title: question.title,
          timeLimit: 10,
          audio: {
            audioUrl: question.audio_url,
            audioText: question.sentence,
            audioTitle: question.title,
          },
          audioText: question.sentence,
          instructions: question?.instructions || '',
          tags: (question?.tags || []) as string[],
          maxScore: question.max_score,
          isNew: false,
          isMarked: false,
          pracStatus: 'Practice',
          hasExplanation: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          explanation: '',
          speaker: ''
        }));
        console.log(mappedQuestions);
        setQuestions(mappedQuestions);
        if (mappedQuestions && mappedQuestions.length > 0) {
          setCurrentQuestionIndex(0);
          setQuestion(mappedQuestions[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  // Sync state when question changes
  useEffect(() => {
    setUserInput('');
    setWordCount(0);
    setTimer({
      timeRemaining: question?.timeLimit || 0,
      isRunning: false,
      warningThreshold: 60,
      autoSubmit: true,
    });
    setIsSubmitted(false);
    setShowResults(false);
    setCurrentResult(null);
    setHasPlayedAudio(false);
    startTimeRef.current = new Date();
  }, [question]);

  // Update word count when user input changes
  useEffect(() => {
    const words = userInput.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [userInput]);

  // Timer functionality
  useEffect(() => {
    if (timer.isRunning && timer.timeRemaining > 0 && !isSubmitted) {
      timerRef.current = setTimeout(() => {
        setTimer(prev => ({ ...prev, timeRemaining: prev.timeRemaining - 1 }));
      }, 1000);
    } else if (timer.isRunning && timer.timeRemaining === 0 && timer.autoSubmit && !isSubmitted) {
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
    if (!timer.isRunning && !isSubmitted) {
      setTimer(prev => ({ ...prev, isRunning: true }));
      startTimeRef.current = new Date();
    }
  }, [timer.isRunning, isSubmitted]);

  const studentProgress = mockStudentProgress;

  // Enable floating search button for this component
  useFloatingSearch({
    topics: questions,
    title: 'write from dictation',
    type: 'listening',
    onTopicSelect: (topic: any) => {
      setQuestion(topic);
      setCurrentQuestionIndex(questions.findIndex(t => t.id === topic.id));
    },
    enabled: true
  });
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      setQuestion(questions[newIndex]);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newIndex);
      setQuestion(questions[newIndex]);
    }
  };

  const handleSearch = () => {
    setShowQuestionSelector(true);
  };

  const handleQuestionSelect = (option: any) => {
    const newIndex = questions.findIndex(q => q.id === option.id);
    if (newIndex !== -1) {
      setCurrentQuestionIndex(newIndex);
      setQuestion(option);
    }
    setShowQuestionSelector(false);
  };

  const hasResponse = useCallback((): boolean => {
    return userInput.trim().length > 0;
  }, [userInput]);

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isSubmitted) return;

    startTimerIfNeeded();
    setUserInput(event.target.value);
  };

  // Function to normalize text for comparison
  const normalizeText = (text: string): string => {
    return text.toLowerCase()
      .replace(/[.,!?;:"'()-]/g, '') // Remove punctuation
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
  };

  // Function to check if word is acceptable (including variations)
  const isWordAcceptable = (userWord: string, expectedWord: string): boolean => {
    const normalizedUser = normalizeText(userWord);
    const normalizedExpected = normalizeText(expectedWord);

    if (normalizedUser === normalizedExpected) return true;

    // Check acceptable variations
    if (question?.acceptableVariations && question.acceptableVariations[expectedWord]) {
      return question.acceptableVariations[expectedWord].some(variation =>
        normalizeText(variation) === normalizedUser
      );
    }

    return false;
  };

  const handleSubmit = () => {
    if (isSubmitted) return;

    setIsSubmitted(true);
    setTimer(prev => ({ ...prev, isRunning: false }));

    const endTime = new Date();
    const timeSpent = Math.floor((endTime.getTime() - startTimeRef.current.getTime()) / 1000);

    // Analyze the response
    const userWords = userInput.trim().split(/\s+/).filter(word => word.length > 0);
    const expectedWords = ((question?.audio?.audioText || question?.audioText)?.split(/\s+/).filter(word => word?.length > 0)) || [];

    let wordsCorrect = 0;
    let keyWordsCorrect = 0;
    const detailedAnalysis: WordAnalysis[] = [];

    const maxLength = Math.max(userWords?.length || 0, expectedWords?.length || 0);

    for (let i = 0; i < maxLength; i++) {
      const userWord = userWords[i] || '';
      const expectedWord = expectedWords[i] || '';
      const isKeyWord = question?.keyWords?.includes(normalizeText(expectedWord)) || false;
      const isCorrect = expectedWord.length > 0 && isWordAcceptable(userWord, expectedWord);

      if (isCorrect) {
        wordsCorrect++;
        if (isKeyWord) keyWordsCorrect++;
      }

      if (expectedWord) {
        detailedAnalysis.push({
          expectedWord,
          userWord,
          isCorrect,
          isKeyWord,
          position: i
        });
      }
    }

    // Calculate score with key word weighting
    const keyWordWeight = 2.5;
    const regularWordWeight = 1.0;

    const totalKeyWords = question?.keyWords?.length ?? 0;
    const totalRegularWords = Math.max(0, (expectedWords.length ?? 0) - totalKeyWords);

    const keyWordPoints = keyWordsCorrect * keyWordWeight;
    const regularWordPoints = (wordsCorrect - keyWordsCorrect) * regularWordWeight;
    const maxPossiblePoints = ((totalKeyWords * keyWordWeight) + (totalRegularWords * regularWordWeight)) || 1;

    const score = Math.round(((keyWordPoints + regularWordPoints) / maxPossiblePoints) * (question?.maxScore ?? 0));
    const accuracy = expectedWords.length ? Math.round((wordsCorrect / expectedWords.length) * 100) : 0;

    const result: WriteFromDictationResult = {
      questionId: String(question?.id),
      userInput,
      correctText: question?.audio?.audioText || question?.audioText || '',
      score: Math.max(0, score),
      maxScore: question?.maxScore || 0,
      accuracy,
      wordsCorrect,
      totalWords: expectedWords.length || 0,
      keyWordsCorrect,
      totalKeyWords: totalKeyWords || 0,
      completedAt: endTime,
      timeSpent,
      detailedAnalysis
    };

    setCurrentResult(result);
    setShowResults(true);
  };

  const handleRedo = () => {
    setUserInput('');
    setWordCount(0);
    setTimer({
      timeRemaining: question?.timeLimit || 0,
      isRunning: false,
      warningThreshold: 60,
      autoSubmit: true,
    });
    setIsSubmitted(false);
    setShowResults(false);
    setCurrentResult(null);
    setHasPlayedAudio(false);
    startTimeRef.current = new Date();
  };

  const questionNumber = studentProgress.questionNumber + currentQuestionIndex;

  const handleAudioStart = () => {
    setHasPlayedAudio(true);
  };

  // Create custom result object for dialog
  const resultForDialog = currentResult ? {
    questionId: currentResult.questionId,
    score: currentResult.score,
    maxScore: currentResult.maxScore,
    correctAnswers: currentResult.wordsCorrect,
    totalQuestions: currentResult.totalWords,
    completedAt: currentResult.completedAt,
    timeSpent: currentResult.timeSpent,
    percentage: currentResult.accuracy,
    answers: currentResult.detailedAnalysis?.map(analysis => ({
      id: String(analysis.position),
      selectedAnswer: analysis.userWord,
      correctAnswer: analysis.expectedWord,
      isCorrect: analysis.isCorrect
    })) || []
  } : null;

  return (
    <GradientBackground>
      {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
              <Typography variant="h6">Loading questions...</Typography>
            </Box>
            ) : (
            <>
      <PracticeCardWithInstructionsPopover
        icon="WFD"
        title="Write From Dictation"
        instructions={question?.instructions}
        difficulty={question?.difficulty}
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

        {/* Dual Audio Player - Supports both audio files and text-to-speech */}
        <DualAudioPlayer
          audio={question?.audio || { audioUrl: '', audioText: '', audioTitle: '' }}
          autoPlay={false}
          onStart={handleAudioStart}
          onEnd={() => console.log('Audio ended')}
          onError={(error) => console.error('Audio error:', error)}
          topicTitle={question?.title}
          questionNumber={String(questionNumber)}
          remainingTime={`${Math.floor(timer.timeRemaining / 60)}:${(timer.timeRemaining % 60).toString().padStart(2, '0')}`}
          testedCount={studentProgress.testedCount}
        />

        {/* Writing Area */}
        <ContentDisplay
          title="Type the sentence you heard:"
          content={
            <Box>
              <TextField
                fullWidth
                multiline
                rows={6}
                value={userInput}
                onChange={handleInputChange}
                disabled={isSubmitted}
                placeholder="Type the sentence exactly as you heard it..."
                variant="outlined"
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

              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="textSecondary">
                  Word Count: {wordCount}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  You will hear the sentence only once
                </Typography>
              </Box>
            </Box>
          }
          showMetadata={false}
        />

        {/* Progress Indicator */}
        <ProgressIndicator
          current={userInput.trim().length > 0 ? 1 : 0}
          total={1}
          label="response completed"
          customLabel={userInput.trim().length > 0 ? 'Response in progress' : 'No response yet'}
        />

        {/* Action Buttons */}
        <ActionButtons
          hasResponse={hasResponse()}
          onSubmit={handleSubmit}
          onRedo={handleRedo}
          onTranslate={() => setShowTranslate(true)}
          onShowAnswer={() => setShowAnswer(true)}
          recordedBlob={null}
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
        title="Write From Dictation"
        type="question"
      />

      {/* Results Dialog with Custom Content */}
      <ResultsDialog
        open={showResults}
        onClose={() => setShowResults(false)}
        result={resultForDialog}
        onTryAgain={handleRedo}
        showAnswerReview={false}
        customContent={
          currentResult && (
            <Box>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
                <Chip
                  label={`Accuracy: ${currentResult.accuracy}%`}
                  color={currentResult.accuracy >= 70 ? 'success' : 'error'}
                  size="medium"
                />
                <Chip
                  label={`${currentResult.keyWordsCorrect}/${currentResult.totalKeyWords} key words`}
                  color="warning"
                  size="medium"
                />
              </Stack>

              <Typography variant="h6" sx={{ mb: 2 }}>Text Comparison:</Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Your Answer:
                </Typography>
                <Paper sx={{ p: 2, bgcolor: '#fff3e0', border: '1px solid #ffb74d' }}>
                  <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                    "{currentResult.userInput || 'No input provided'}"
                  </Typography>
                </Paper>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Correct Answer:
                </Typography>
                <Paper sx={{ p: 2, bgcolor: '#e8f5e9', border: '1px solid #4caf50' }}>
                  <Typography variant="body2">
                    "{currentResult.correctText}"
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
        title={question?.title || ''}
        answers={[{
          id: 'correct-sentence',
          correctAnswer: question?.audio?.audioText || question?.audioText || '',
          label: "Correct sentence"
        }]}
        explanation={question?.explanation}
        guidance={
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
              Key words to focus on:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
              {question?.keyWords.map((word, index) => (
                <Chip
                  key={index}
                  label={word}
                  color="primary"
                  size="small"
                  variant="outlined"
                />
              ))}
            </Stack>
          </Box>
        }
      />

      {/* Translation Dialog */}
      <TranslationDialog
        open={showTranslate}
        onClose={() => setShowTranslate(false)}
        description="Translation feature will help you understand the audio content in your preferred language."
      />
      </>
      )}
    </GradientBackground>
  );
};

export default WriteFromDictationRefactored;