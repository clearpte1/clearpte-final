import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Stack,
  TextField,
  Alert,
} from '@mui/material';

import ActionButtons from '../../common/ActionButtons';
import NavigationSection from '../../common/NavigationSection';
import QuestionHeader from '../../common/QuestionHeader';
import StageGoalBanner from '../../common/StageGoalBanner';
// import { textPassages } from './textPassages';
 import { User } from '../../../../types';
import TopicSelectionDrawer from '../../../common/TopicSelectionDrawer';
import { GradientBackground, TimerDisplay, ContentDisplay, ProgressIndicator, ResultsDialog, AnswerDialog, TranslationDialog } from '../../../common';
import PracticeCardWithInstructionsPopover from '../../../common/PracticeCardWithInstructionsPopover';
import { TimerState, QuestionResult } from '../writing-essay/constants';
import { useFloatingSearch } from '../../../hooks/useFloatingSearch';
import { fetchSummarizeTextQuestions } from '../../../../services/writing/fetchQuestions';
import { submitSummarizeTextAnswers } from '../../../../services/writing/submitAnswers';

const instructionsSections = [
  {
    title: 'Task Overview',
    items: ['Read the passage below and summarize it using between 25 and 50 words.'],
  },
  {
    title: 'Time Allocation',
    items: ['Reading time: Unlimited', 'Writing time: 10 minutes'],
  },
  {
    title: 'Writing Requirements',
    items: [
      'Word count: 25-50 words exactly',
      'Use your own words',
      'Include only the main points',
      'Write in one sentence if possible',
      'Check grammar and spelling',
    ],
  },
  {
    title: 'Scoring Criteria',
    items: [
      'Content: Key points covered accurately',
      'Form: Word count within range',
      'Grammar: Correct sentence structure',
      'Vocabulary: Appropriate word choice',
    ],
  },
];

// Import mock data
interface SummarizeTextProps {
  user: User | null;
}
const SummarizeText = ({ user }:SummarizeTextProps) => {
  // State management
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedPassage, setSelectedPassage] = useState<any>({});
  const [userResponse, setUserResponse] = useState<string>('');
  const [wordCount, setWordCount] = useState<number>(0);
  const [questionNumber, setQuestionNumber] = useState<number>(73);
  const [studentName] = useState<string>('Rachel Carson');
  const [testedCount] = useState<number>(33);
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  // Timer state
  const [timer, setTimer] = useState<TimerState>({
    timeRemaining: 600, // 10 minutes
    isRunning: false,
    warningThreshold: 60,
    autoSubmit: true,
  });
  
  // Dialog states
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [showTranslate, setShowTranslate] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [currentResult, setCurrentResult] = useState<QuestionResult | null>(null);
  const [showPassageSelector, setShowPassageSelector] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<Date>(new Date());

  // Enable floating search button for this component
  // useFloatingSearch({
  //   topics: textPassages,
  //   title: 'Summarize Written Text Practice',
  //   type: 'writing',
  //   onTopicSelect: (topic: any) => {
  //     const passage = topic;
  //     setSelectedPassage(passage);
  //     setQuestionNumber(prev => prev + 1);
  //     setShowPassageSelector(false);
  //     handleRedo();
  //   },
  //   enabled: true
  // });

  useEffect(() => {
      async function fetchQuestions() {
        try {
          setLoading(true);
          const questions = await fetchSummarizeTextQuestions();
          setSelectedPassage(questions[0] || {});
        } catch (error) {
          console.error('Error fetching questions from API:', error);
        } finally {
          setLoading(false);
        }
      }
      fetchQuestions();
    }, []);

  // Sync state when passage changes
  useEffect(() => {
    setUserResponse('');
    setWordCount(0);
    setTimer({
      timeRemaining: 600,
      isRunning: false,
      warningThreshold: 60,
      autoSubmit: true,
    });
    setScore(null);
    setIsSubmitted(false);
    setShowResults(false);
    setCurrentResult(null);
    startTimeRef.current = new Date();
  }, [selectedPassage]);

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

  // Start timer when user starts typing
  useEffect(() => {
    if (userResponse.length > 0 && !timer.isRunning && !isSubmitted) {
      setTimer(prev => ({ ...prev, isRunning: true }));
    }
  }, [userResponse, timer.isRunning, isSubmitted]);

  // Word counting function
  const countWords = (text: string): number => {
    return text?.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  // Handle text input change
  const handleResponseChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const text = event.target.value;
    setUserResponse(text);
    setWordCount(countWords(text));
  };

  // Simple scoring algorithm
  const calculateScore = (userText: string, sampleAnswer: string): number => {
    const userWords = userText.toLowerCase().split(/\s+/);
    const sampleWords = sampleAnswer.toLowerCase().split(/\s+/);
    
    // Check word count compliance
    const wordCountScore = (wordCount >= 25 && wordCount <= 50) ? 30 : 10;
    
    // Simple keyword matching
    const keywordMatches = userWords.filter(word => 
      sampleWords.some(sampleWord => 
        sampleWord.includes(word) || word.includes(sampleWord)
      )
    ).length;
    
    const keywordScore = Math.min((keywordMatches / sampleWords.length) * 50, 50);
    
    // Length appropriateness
    const lengthScore = userText.length > 100 ? 20 : 10;
    
    return Math.round(wordCountScore + keywordScore + lengthScore);
  };

  // Handle submission
  const handleSubmit = async () => {
    if (wordCount < 25 || wordCount > 50) {
      alert('Please ensure your summary is between 25 and 50 words.');
      return;
    }

    const response = await submitSummarizeTextAnswers({
      original_text: selectedPassage.passage,
      student_summary: userResponse
    });
    console.log(response);
    if(response.similarity_score > 0.8) {
      alert('Your summary is too similar to the original text. Please rephrase it in your own words.');
      return;
    }
    
    if (isSubmitted) return;

    setIsSubmitted(true);
    setTimer(prev => ({ ...prev, isRunning: false }));

    const endTime = new Date();
    const timeSpent = Math.floor((endTime.getTime() - startTimeRef.current.getTime()) / 1000);
    const calculatedScore = Math.round(
      (response.evaluation.scores.Content * 0.6) +
      (response.evaluation.scores.Fluency * 0.4)
    );
    setScore(calculatedScore);

    let result = {
    questionId: String(selectedPassage.id),
    score: calculatedScore,
    maxScore: 100,
    correctAnswers: calculatedScore >= 70 ? 1 : 0,
    totalQuestions: 1,
    completedAt: endTime,
    timeSpent,
    percentage: calculatedScore,
    answers: [
      {
        id: 'summary-response',
        selectedAnswer: `${wordCount} words written`,
        correctAnswer: `25–50 words required (Sample: ${countWords(selectedPassage.sampleAnswer)} words)`,
        isCorrect: wordCount >= 25 && wordCount <= 50,
        feedback: response.evaluation.overallSummary
      },
      {
        id: 'content-feedback',
        selectedAnswer: `Content score: ${response.evaluation.scores.Content}`,
        correctAnswer: 'Target ≥ 70',
        isCorrect: response.evaluation.scores.Content >= 70,
        feedback: response.evaluation.feedback.Content
      },
      {
        id: 'fluency-feedback',
        selectedAnswer: `Fluency score: ${response.evaluation.scores.Fluency}`,
        correctAnswer: 'Target ≥ 70',
        isCorrect: response.evaluation.scores.Fluency >= 70,
        feedback: response.evaluation.feedback.Fluency
      }
    ]
  };
  setCurrentResult(result);
  setShowResults(true);
  };

  // Handle auto submit when timer expires
  const handleAutoSubmit = (): void => {
    if (userResponse.trim()) {
      const calculatedScore = calculateScore(userResponse, selectedPassage.sampleAnswer);
      setScore(calculatedScore);
    }
    setIsSubmitted(true);
    setTimer(prev => ({ ...prev, isRunning: false }));
  };

  // Action handlers
  const handleRedo = (): void => {
    setUserResponse('');
    setWordCount(0);
    setTimer({
      timeRemaining: 600,
      isRunning: false,
      warningThreshold: 60,
      autoSubmit: true,
    });
    setScore(null);
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
    setShowPassageSelector(true);
  };

  const handlePrevious = (): void => {
    if (questionNumber > 1) {
      setQuestionNumber(prev => prev - 1);
      handleRedo();
    }
  };

  const handleNext = (): void => {
    setShowPassageSelector(true);
  };

  // Handle passage selection
  const handlePassageSelect = (passage: any) => {
    setSelectedPassage(passage);
    setQuestionNumber(prev => prev + 1);
    setShowPassageSelector(false);
    handleRedo();
  };

  // Get word count status color
  const getWordCountColor = (): string => {
    if (wordCount === 0) return '#666';
    if (wordCount < 25) return '#ff9800';
    if (wordCount > 50) return '#f44336';
    return '#4caf50';
  };

  return (
    <GradientBackground>
      <StageGoalBanner />

      <PracticeCardWithInstructionsPopover
        icon="SWT"
        title="Summarize Written Text (Core)"
        instructions="Read the passage below. Summarize the passage using between 25 and 50 words. Type your response in the box at the bottom of the screen. You have 10 minutes to finish this task. Your response will be judged on the quality of your writing and on how well your response presents the key points in the passage."
        difficulty={selectedPassage.difficulty}
        instructionsConfig={{
          sections: instructionsSections,
          size: 'medium',
          color: 'primary',
          tooltipTitle: 'View detailed instructions for Summarize Written Text'
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

        {/* Passage Display */}
        <ContentDisplay
          title={`#${questionNumber} ${selectedPassage.title}`}
          content={selectedPassage.passage}
          category={selectedPassage.category}
          difficulty={selectedPassage.difficulty}
          tags={selectedPassage.tags}
          showMetadata={true}
        />

        {/* Response Input */}
        <ContentDisplay
          title="Your Response:"
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
                  Summary (25-50 words):
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: getWordCountColor(),
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}
                >
                  Word Count: {wordCount}
                </Typography>
              </Stack>
              
              {wordCount > 0 && (wordCount < 25 || wordCount > 50) && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                  Your summary must be between 25 and 50 words. Current count: {wordCount}
                </Alert>
              )}
              
              <TextField
                fullWidth
                multiline
                rows={6}
                value={userResponse}
                onChange={handleResponseChange}
                placeholder="Type your summary here..."
                disabled={isSubmitted || timer.timeRemaining === 0}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontSize: '16px',
                    lineHeight: 1.6,
                  },
                }}
              />
            </Box>
          }
          showMetadata={false}
        />

        <ProgressIndicator
          current={wordCount}
          total={50}
          label="words written"
          color={wordCount >= 25 && wordCount <= 50 ? 'success' : wordCount > 50 ? 'error' : 'warning'}
          showPercentage={false}
          customLabel={`${wordCount} of 25-50 words required`}
        />

        {/* Score Display */}
        {score !== null && (
          <Alert severity={score >= 70 ? 'success' : score >= 50 ? 'warning' : 'error'} sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Score: {score}/100
            </Typography>
            <Typography variant="body2">
              {score >= 70 ? '🎉 Excellent summary!' : score >= 50 ? '👍 Good effort!' : '📝 Keep practicing!'}
            </Typography>
          </Alert>
        )}

        <ActionButtons
          hasResponse={userResponse.trim().length > 0}
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
        open={showPassageSelector}
        onClose={() => setShowPassageSelector(false)}
        onSelect={handlePassageSelect}
        topics={questions}
        title="Summarize Written Text (Core)"
        type="lecture"
      />

      <ResultsDialog
        open={showResults}
        onClose={() => setShowResults(false)}
        result={currentResult}
        onTryAgain={handleRedo}
        customContent={
          currentResult && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Summary Analysis:</Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Word Count:</Typography>
                  <Typography variant="body2" color={wordCount >= 25 && wordCount <= 50 ? 'success.main' : 'error.main'}>
                    {wordCount} words (Required: 25-50 words)
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Score Breakdown:</Typography>
                  <Typography variant="body2">
                    • Word Count Compliance: {wordCount >= 25 && wordCount <= 50 ? '30/30' : '10/30'}
                  </Typography>
                  <Typography variant="body2">• Content Quality: Variable based on key points coverage</Typography>
                  <Typography variant="body2">• Writing Quality: Variable based on language use</Typography>
                </Box>
              </Stack>
            </Box>
          )
        }
      />

      <AnswerDialog
        open={showAnswer}
        onClose={() => setShowAnswer(false)}
        title={`Sample Summary: ${selectedPassage.title}`}
        answers={[{
          id: 'sample-summary',
          correctAnswer: selectedPassage.sampleAnswer,
          label: `Sample Response (${countWords(selectedPassage.sampleAnswer)} words)`
        }]}
        guidance="The sample answer demonstrates how to capture key points within the word limit while maintaining clarity and coherence."
      />

      <TranslationDialog
        open={showTranslate}
        onClose={() => setShowTranslate(false)}
        description="Translation feature will help you understand the passage content in your preferred language."
      />
    </GradientBackground>
  );
};

export default SummarizeText;