import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Alert,
  Stack,
  TextField,
} from '@mui/material';
import {
  ESSAY_QUESTIONS,
  ESSAY_MOCK_FEEDBACK,
  ESSAY_TIME_LIMIT_SECONDS,
  ESSAY_MIN_WORDS,
  ESSAY_MAX_WORDS,
  EssayFeedback,
  QuestionResult,
  TimerState,
} from './constants';
import { GradientBackground, TimerDisplay, ContentDisplay, ProgressIndicator, TopicSelectionDrawer, ResultsDialog, AnswerDialog, TranslationDialog } from '../../../common';
import PracticeCardWithInstructionsPopover from '../../../common/PracticeCardWithInstructionsPopover';
import ActionButtons from '../../common/ActionButtons';
import NavigationSection from '../../common/NavigationSection';
import QuestionHeader from '../../common/QuestionHeader';
import StageGoalBanner from '../../common/StageGoalBanner';
import { useFloatingSearch } from '../../../hooks/useFloatingSearch';
import axios from 'axios';
import { fetchWriteEssayQuestions } from '../../../../services/writing/fetchQuestions';
import { submitEssayAnswers } from '../../../../services/writing/submitAnswers';

const instructionsSections = [
  {
    title: 'Task Overview',
    items: ['Write an argumentative essay of 200-300 words in response to the given prompt.'],
  },
  {
    title: 'Time Allocation',
    items: ['Planning time: 2-3 minutes', 'Writing time: 15-17 minutes', 'Review time: 1-2 minutes'],
  },
  {
    title: 'Essay Structure',
    items: [
      'Introduction: State your position clearly',
      'Body paragraphs: 2-3 paragraphs with examples',
      'Conclusion: Summarize your main points',
      'Use transitions between ideas',
      'Support arguments with examples',
    ],
  },
  {
    title: 'Scoring Criteria',
    items: [
      'Content (40%): Address the topic, develop ideas',
      'Form (25%): Structure and organization',
      'Grammar (25%): Sentence variety and accuracy', 
      'Vocabulary (10%): Word choice and range',
    ],
  },
];

const WritingEssay: React.FC=() => {
  // State management
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  interface Question {
    id: string;
    prompt: string;
    type: string;
    wordLimit: string;
  }
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [essayText, setEssayText] = useState<string>('');
  const [wordCount, setWordCount] = useState<number>(0);
  const [questionNumber, setQuestionNumber] = useState<number>(85);
  const [studentName] = useState<string>('Rachel Carson');
  const [testedCount] = useState<number>(33);
  const [feedback, setFeedback] = useState<EssayFeedback | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  // Timer state
  const [timer, setTimer] = useState<TimerState>({
    timeRemaining: ESSAY_TIME_LIMIT_SECONDS,
    isRunning: false,
    warningThreshold: 300, // 5 minutes
    autoSubmit: true,
  });

  // Dialog states
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [showTranslate, setShowTranslate] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [currentResult, setCurrentResult] = useState<QuestionResult | null>(null);

  // Enable floating search button for this component
  // useFloatingSearch({
  //   topics: ESSAY_QUESTIONS,
  //   title: 'Writing Essay Practice',
  //   type: 'writing',
  //   onTopicSelect: (topic: any) => {
  //     const question = topic;
  //     const index = ESSAY_QUESTIONS.findIndex(q => q.id === question.id);
  //     if (index !== -1) {
  //       setCurrentQuestionIndex(index);
  //       handleRedo();
  //     }
  //   },
  //   enabled: true
  // });

  const [showQuestionSelector, setShowQuestionSelector] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<Date>(new Date());

  // Sync state when question changes
  useEffect(() => {
    const newQuestion = questions[currentQuestionIndex];
    setCurrentQuestion(newQuestion);
    setEssayText('');
    setWordCount(0);
    setTimer({
      timeRemaining: ESSAY_TIME_LIMIT_SECONDS,
      isRunning: false,
      warningThreshold: 300,
      autoSubmit: true,
    });
    setFeedback(null);
    setIsSubmitted(false);
    setShowResults(false);
    setCurrentResult(null);
    startTimeRef.current = new Date();
  }, [currentQuestionIndex]);

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

  useEffect(() => {
    // Load essay questions
    async function fetchQuestions() {
      try {
        const questions = await fetchWriteEssayQuestions();
        console.log(questions)
        const questionTopics = questions.map((q, index) => ({
          id: parseInt(q.id) || index + 1,
          title: q.title || q.prompt.substring(0, 80) + '...',
          prompt: q.prompt,
          wordLimit: q.word_limit,
          type: q.essay_type,
          duration: `${q.time_limit || 20}m`,
          speaker: q.essay_type,
          difficulty: q.difficulty,
          category: q.category,
          tags: [q.essay_type, `${q.word_limit} words`],
          isNew: false,
          isMarked: false,
          pracStatus: 'Undone',
          hasExplanation: true,
          createdAt: q.created_at || '',
          updatedAt: q.updated_at || '',
        }));
        setQuestions(questionTopics);
        setCurrentQuestion(questions[0]);
        setCurrentQuestionIndex(0);
        setQuestionNumber(1); // Example question number

      } catch (error) {
        console.error("Error loading essay questions:", error);
      }
    } 
    fetchQuestions();
  }, []);

  // Start timer when user starts typing
  useEffect(() => {
    if (essayText.length > 0 && !timer.isRunning && !isSubmitted) {
      setTimer(prev => ({ ...prev, isRunning: true }));
    }
  }, [essayText, timer.isRunning, isSubmitted]);

  // Handle text input change
  const handleEssayChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const text = event.target.value;
    setEssayText(text);
    setWordCount(getWordCount(text));
  };

  // Get word count
  const getWordCount = (text: string): number => {
    return text.trim().split(/\s+/).filter((word) => word.length > 0).length;
  };

  // Calculate essay score
  const calculateEssayScore = (text: string): EssayFeedback => {
    const currentWordCount = getWordCount(text);
    
    // Base scores
    let contentScore = 65;
    let formScore = 70;
    let grammarScore = 75;
    let vocabularyScore = 68;

    // Word count impact
    if (currentWordCount >= ESSAY_MIN_WORDS && currentWordCount <= ESSAY_MAX_WORDS) {
      formScore += 10;
    } else if (currentWordCount < ESSAY_MIN_WORDS) {
      formScore -= 15;
      contentScore -= 10;
    } else if (currentWordCount > ESSAY_MAX_WORDS) {
      formScore -= 5;
    }

    // Length and structure impact
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    if (sentences.length >= 8) {
      formScore += 5;
    }

    const overallScore = Math.round((contentScore * 0.4 + formScore * 0.25 + grammarScore * 0.25 + vocabularyScore * 0.1));

    return {
      overallScore: Math.min(overallScore, 100),
      contentScore,
      formScore,
      spellingScore:80,
      grammarScore,
      vocabularyScore,
      wordCount: currentWordCount,
      feedback: ESSAY_MOCK_FEEDBACK.feedback
    };
  };

  // Handle submission
  const handleSubmit = async () => {
    if (wordCount < ESSAY_MIN_WORDS) {
      alert(`Please write at least ${ESSAY_MIN_WORDS} words. Current count: ${wordCount}`);
      return;
    }

    const response = await submitEssayAnswers({
      question: currentQuestion?.prompt,
      student_essay: essayText,
    });
    console.log(response);

    if (isSubmitted) return;

    setIsSubmitted(true);
    setTimer(prev => ({ ...prev, isRunning: false }));

    const endTime = new Date();
    const timeSpent = Math.floor((endTime.getTime() - startTimeRef.current.getTime()) / 1000);
    const essayFeedback = calculateEssayScore(essayText);
    setFeedback(essayFeedback);

    const result: QuestionResult = {
      questionId: String(currentQuestion?.id),
      score: essayFeedback.overallScore,
      maxScore: 100,
      correctAnswers: essayFeedback.overallScore >= 70 ? 1 : 0,
      totalQuestions: 1,
      completedAt: endTime,
      timeSpent,
      percentage: essayFeedback.overallScore,
      answers: [{
        id: 'essay-response',
        selectedAnswer: `${wordCount} words written`,
        correctAnswer: `${ESSAY_MIN_WORDS}-${ESSAY_MAX_WORDS} words required`,
        isCorrect: wordCount >= ESSAY_MIN_WORDS && wordCount <= ESSAY_MAX_WORDS
      }]
    };

    setCurrentResult(result);
    setShowResults(true);
  };

  // Handle auto submit when timer expires
  const handleAutoSubmit = (): void => {
    try {
      if (essayText.trim()) {
      const essayFeedback = calculateEssayScore(essayText);
      setFeedback(essayFeedback);
    }
    setIsSubmitted(true);
    setTimer(prev => ({ ...prev, isRunning: false }));
      
    } catch (err) {
    }
    
  };

  // Action handlers
  const handleRedo = (): void => {
    setEssayText('');
    setWordCount(0);
    setTimer({
      timeRemaining: ESSAY_TIME_LIMIT_SECONDS,
      isRunning: false,
      warningThreshold: 300,
      autoSubmit: true,
    });
    setFeedback(null);
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
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = (): void => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowQuestionSelector(true);
    }
  };

  // Handle question selection
  const handleQuestionSelect = (question: any) => {
    const newIndex = questions.findIndex(q => q.id === question.id);
    if (newIndex !== -1) {
      setCurrentQuestionIndex(newIndex);
    }
    setShowQuestionSelector(false);
  };

  // Get word count status color
  const getWordCountColor = (): string => {
    if (wordCount === 0) return '#666';
    if (wordCount < ESSAY_MIN_WORDS) return '#ff9800';
    if (wordCount > ESSAY_MAX_WORDS) return '#f44336';
    return '#4caf50';
  };

  // Convert questions to topic format
  

  return (
    <GradientBackground>
      <StageGoalBanner />

      <PracticeCardWithInstructionsPopover
        icon="WE"
        title="Write Essay"
        instructions={`Write an essay of ${ESSAY_MIN_WORDS}-${ESSAY_MAX_WORDS} words in response to the prompt below. You have 20 minutes. Your response will be judged on content, form, grammar, vocabulary, and spelling.`}
        difficulty="Advanced"
        instructionsConfig={{
          sections: instructionsSections,
          size: 'medium',
          color: 'primary',
          tooltipTitle: 'View detailed instructions for Write Essay'
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
          startMessage="Timer will start when you begin typing"
          autoSubmit={timer.autoSubmit}
        />

        {/* Question Prompt */}
        <ContentDisplay
          title={`Essay Question (#${questionNumber})`}
          content={
            <Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#333', 
                  mb: 2, 
                  fontWeight: 'bold',
                  fontSize: { xs: '16px', sm: '18px', md: '20px' }
                }}
              >
                {currentQuestion?.prompt}
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Typography variant="body2" color="text.secondary">
                  <strong>Type:</strong> {currentQuestion?.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Word Limit:</strong> {currentQuestion?.wordLimit}
                </Typography>
              </Stack>
            </Box>
          }
          category="Writing"
          difficulty="Advanced"
          tags={[currentQuestion?.type || '', currentQuestion?.wordLimit || '']}
          showMetadata={true}
        />

        {/* Essay Input */}
        <ContentDisplay
          title="Your Essay:"
          content={
            <Box>
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                alignItems={{ xs: 'flex-start', sm: 'center' }} 
                justifyContent="space-between" 
                sx={{ mb: 2 }}
                spacing={{ xs: 1, sm: 0 }}
              >
                <Typography variant="h6" sx={{ color: '#333' }}>
                  Essay Response:
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: getWordCountColor(),
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}
                >
                  Words: {wordCount}/{ESSAY_MAX_WORDS}
                </Typography>
              </Stack>
              
              {wordCount > 0 && (wordCount < ESSAY_MIN_WORDS || wordCount > ESSAY_MAX_WORDS) && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                  {wordCount < ESSAY_MIN_WORDS 
                    ? `Write at least ${ESSAY_MIN_WORDS} words. Current: ${wordCount}`
                    : `Exceeds maximum ${ESSAY_MAX_WORDS} words. Current: ${wordCount}`
                  }
                </Alert>
              )}
              
              <TextField
                fullWidth
                multiline
                rows={15}
                value={essayText}
                onChange={handleEssayChange}
                placeholder="Start writing your essay here..."
                disabled={isSubmitted || timer.timeRemaining === 0}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontSize: '16px',
                    lineHeight: 1.6,
                    fontFamily: 'monospace',
                  },
                }}
              />
            </Box>
          }
          showMetadata={false}
        />

        {/* Detailed Feedback after submission */}
        {feedback && (
          <ContentDisplay
            title="🤖 AI Feedback & Analysis"
            content={
              <Box>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: 2, 
                    mb: 3 
                  }}
                >
                  <Box
                    sx={{
                      flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 18%' },
                      minWidth: 120,
                    }}
                  >
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light' }}>
                      <Typography variant="h6" color="primary.main" fontWeight="bold">
                        {feedback.overallScore}
                      </Typography>
                      <Typography variant="caption">Overall</Typography>
                    </Paper>
                  </Box>
                  <Box
                    sx={{
                      flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 18%' },
                      minWidth: 120,
                    }}
                  >
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'info.light' }}>
                      <Typography variant="h6" color="info.main" fontWeight="bold">
                        {feedback.contentScore}
                      </Typography>
                      <Typography variant="caption">Content</Typography>
                    </Paper>
                  </Box>
                  <Box
                    sx={{
                      flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 18%' },
                      minWidth: 120,
                    }}
                  >
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.light' }}>
                      <Typography variant="h6" color="success.main" fontWeight="bold">
                        {feedback.formScore}
                      </Typography>
                      <Typography variant="caption">Form</Typography>
                    </Paper>
                  </Box>
                  <Box
                    sx={{
                      flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 18%' },
                      minWidth: 120,
                    }}
                  >
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'warning.light' }}>
                      <Typography variant="h6" color="warning.main" fontWeight="bold">
                        {feedback.grammarScore}
                      </Typography>
                      <Typography variant="caption">Grammar</Typography>
                    </Paper>
                  </Box>
                  <Box
                    sx={{
                      flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 18%' },
                      minWidth: 120,
                    }}
                  >
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'secondary.light' }}>
                      <Typography variant="h6" color="secondary.main" fontWeight="bold">
                        {feedback.vocabularyScore}
                      </Typography>
                      <Typography variant="caption">Vocabulary</Typography>
                    </Paper>
                  </Box>
                </Box>

                <Stack spacing={2}>
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold" color="success.main" sx={{ mb: 1 }}>
                      ✅ Strengths:
                    </Typography>
                    {feedback.feedback.strengths.map((item, index) => (
                      <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                        • {item}
                      </Typography>
                    ))}
                  </Box>
                  
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold" color="warning.main" sx={{ mb: 1 }}>
                      💡 Areas for Improvement:
                    </Typography>
                    {feedback.feedback.improvements.map((item, index) => (
                      <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                        • {item}
                      </Typography>
                    ))}
                  </Box>
                </Stack>
              </Box>
            }
            showMetadata={false}
          />
        )}

        <ProgressIndicator
          current={wordCount}
          total={ESSAY_MAX_WORDS}
          label="words written"
          color={wordCount >= ESSAY_MIN_WORDS && wordCount <= ESSAY_MAX_WORDS ? 'success' : wordCount > ESSAY_MAX_WORDS ? 'error' : 'warning'}
          showPercentage={false}
          customLabel={`${wordCount} of ${ESSAY_MIN_WORDS}-${ESSAY_MAX_WORDS} words required`}
        />

        <ActionButtons
          hasResponse={essayText.trim().length > 0}
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

      <TopicSelectionDrawer
        open={showQuestionSelector}
        onClose={() => setShowQuestionSelector(false)}
        onSelect={handleQuestionSelect}
        topics={questions}
        title="Select Essay Question"
        type="lecture"
      />

      <ResultsDialog
        open={showResults}
        onClose={() => setShowResults(false)}
        result={currentResult}
        onTryAgain={handleRedo}
        customContent={
          feedback && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Essay Performance:</Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Word Count Analysis:</Typography>
                  <Typography variant="body2" color={wordCount >= ESSAY_MIN_WORDS && wordCount <= ESSAY_MAX_WORDS ? 'success.main' : 'error.main'}>
                    {wordCount} words (Target: {ESSAY_MIN_WORDS}-{ESSAY_MAX_WORDS} words)
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Score Breakdown:</Typography>
                  <Typography variant="body2">• Content: {feedback.contentScore}/100 (40% weight)</Typography>
                  <Typography variant="body2">• Form & Development: {feedback.formScore}/100 (25% weight)</Typography>
                  <Typography variant="body2">• Grammar: {feedback.grammarScore}/100 (25% weight)</Typography>
                  <Typography variant="body2">• Vocabulary: {feedback.vocabularyScore}/100 (10% weight)</Typography>
                </Box>
              </Stack>
            </Box>
          )
        }
      />

      <AnswerDialog
        open={showAnswer}
        onClose={() => setShowAnswer(false)}
        title={`Essay Guidelines & Tips`}
        answers={[{
          id: 'essay-structure',
          correctAnswer: 'Introduction with thesis → 2-3 body paragraphs with examples → Clear conclusion',
          label: 'Recommended Structure'
        }]}
        guidance={
          <Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              <strong>Scoring Criteria:</strong>
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>• Content (40%): Address the question directly, use specific examples</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>• Form & Development (25%): Clear structure, logical flow</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>• Grammar (25%): Varied sentence structures, correct usage</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>• Vocabulary (10%): Academic vocabulary, appropriate word choice</Typography>
          </Box>
        }
      />

      <TranslationDialog
        open={showTranslate}
        onClose={() => setShowTranslate(false)}
        description="Translation feature will help you understand the essay prompt in your preferred language."
      />
    </GradientBackground>
  );
};
export default WritingEssay;