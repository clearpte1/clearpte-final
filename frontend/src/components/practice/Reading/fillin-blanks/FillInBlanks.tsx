import React, { useState, useEffect, useCallback, useRef, use } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,  Select, MenuItem,FormControl, InputLabel
} from '@mui/material';
import { BlankAnswer,  instructionsSections, Question, QuestionResult, questions, TimerState } from './FillInBlanksMockData';
import TopicSelectionDrawer from '../../../common/TopicSelectionDrawer';
import ActionButtons from '../../common/ActionButtons';
import NavigationSection from '../../common/NavigationSection';
import QuestionHeader from '../../common/QuestionHeader';
import StageGoalBanner from '../../common/StageGoalBanner';
import { 
  GradientBackground, 
  TimerDisplay, 
  ContentDisplay, 
  ProgressIndicator, 
  ResultsDialog, 
  AnswerDialog, 
  TranslationDialog 
} from '../../../common';
import PracticeCardWithInstructionsPopover from '../../../common/PracticeCardWithInstructionsPopover';
import { useFloatingSearch } from '../../../hooks/useFloatingSearch';
import { fetchFillInTheBlanks } from '../../../../services/reading/fetchQuestions';

const FillInBlanks: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question>(questions[currentQuestionIndex]);
  const [answers, setAnswers] = useState<BlankAnswer[]>([]);
  const [showTopicSelector, setShowTopicSelector] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  // const [questions, setQuestions] = useState<Question[]>([]);

  // Timer state
  const [timer, setTimer] = useState<TimerState>({
    timeRemaining: 600,
    isRunning: false,
    warningThreshold: 30,
    autoSubmit: true,
  });

  // Dialog states
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [showTranslate, setShowTranslate] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [currentResult, setCurrentResult] = useState<QuestionResult | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<Date>(new Date());

  // Enable floating search button for this component
  // useFloatingSearch({
  //   topics: questions,
  //   title: 'Reading Fill in the Blanks Practice',
  //   type: 'reading',
  //   onTopicSelect: (topic: any) => {
  //     const question = topic as Question;
  //     const index = questions.findIndex(q => q.id === question.id);
  //     if (index !== -1) {
  //       setCurrentQuestionIndex(index);
  //     }
  //   },
  //   enabled: true
  // });

  useEffect(() => {
    async function fetchQuestions() {
      setLoading(true);
      try {
        const questions = await fetchFillInTheBlanks();
        console.log('Fetched questions:', questions);
        // setQuestions(questions);
        setCurrentQuestion(questions[0]);
      } catch (error) {
        console.error('Error fetching fill in the blanks questions:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  


  // Sync state when question changes
  useEffect(() => {
    const newQuestion = questions[currentQuestionIndex];
    setCurrentQuestion(newQuestion);
    const initialAnswers = newQuestion.blanks.map((blank) => ({
      id: blank.id,
      userAnswer: '',
      correctAnswer: blank.correctAnswer,
      options: blank.options,
    }));
    setAnswers(initialAnswers);
    setTimer({
      timeRemaining: 600,
      isRunning: false,
      warningThreshold: 30,
      autoSubmit: true,
    });
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
      handleSubmit();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timer.timeRemaining, timer.isRunning, isSubmitted]);

  // Start timer when user starts answering
  useEffect(() => {
    if (answers.some(answer => answer.userAnswer) && !timer.isRunning && !isSubmitted) {
      setTimer(prev => ({ ...prev, isRunning: true }));
    }
  }, [answers, timer.isRunning, isSubmitted]);

  const handleAnswerChange = (blankId: number, value: string) => {
    setAnswers((prev) =>
      prev.map((answer) =>
        answer.id === blankId ? { ...answer, userAnswer: value } : answer
      )
    );
  };

  const areAllBlanksFilled = useCallback((): boolean => {
    return answers.every(answer => answer.userAnswer.trim() !== '');
  }, [answers]);

  const handleSubmit = () => {
    if (isSubmitted) return;

    setIsSubmitted(true);
    setTimer(prev => ({ ...prev, isRunning: false }));

    const endTime = new Date();
    const timeSpent = Math.floor((endTime.getTime() - startTimeRef.current.getTime()) / 1000);

    let correctAnswers = 0;
    const evaluatedAnswers = answers.map(answer => {
      const isCorrect = answer.userAnswer.toLowerCase().trim() === answer.correctAnswer.toLowerCase().trim();
      if (isCorrect) correctAnswers++;
      return { ...answer, isCorrect };
    });

    const score = Math.round((correctAnswers / answers.length) * 100);

    const result: QuestionResult = {
      questionId: String(currentQuestion?.id),
      score,
      maxScore: 100,
      correctAnswers,
      totalBlanks: answers.length,
      completedAt: endTime,
      timeSpent,
      answers: evaluatedAnswers.map(answer => ({
        id: answer.id,
        position: answer.id,
        selectedAnswer: answer.userAnswer,
        correctAnswer: answer.correctAnswer,
        isCorrect: answer.isCorrect
      })),
    };

    setAnswers(evaluatedAnswers);
    setCurrentResult(result);
    setShowResults(true);
  };

  const handleRedo = () => {
    const initialAnswers = currentQuestion ? currentQuestion.blanks.map((blank) => ({
      id: blank.id,
      userAnswer: '',
      correctAnswer: blank.correctAnswer,
      options: blank.options,
    })) : [];
    setAnswers(initialAnswers);
    setTimer({
      timeRemaining: 600,
      isRunning: false,
      warningThreshold: 30,
      autoSubmit: true,
    });
    setIsSubmitted(false);
    setShowResults(false);
    setCurrentResult(null);
    startTimeRef.current = new Date();
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSearch = () => {
    setShowTopicSelector(true);
  };

  const handleTopicSelect = (topic: any) => {
    const newIndex = questions.findIndex(q => q.id === topic.id);
    if (newIndex !== -1) {
      setCurrentQuestionIndex(newIndex);
    }
    setShowTopicSelector(false);
  };

  // Render text with blanks
  const renderTextWithBlanks = () => {
    const parts = currentQuestion?.text.split(/_____\(\d+\)_____/) || [];
    const blanks = currentQuestion?.text.match(/_____\(\d+\)_____/g) || [];

    const result: React.ReactNode[] = [];
    for (let i = 0; i < parts.length; i++) {
      result.push(<span key={`text-${i}`} style={{ margin: '0 4px' }}>{parts[i]}</span>);
      if (i < blanks.length) {
        const blankNum = parseInt(blanks[i].match(/\d+/)?.[0] || '0');
        const answer = answers.find((a) => a.id === blankNum);
        result.push(
          <FormControl
            key={`blank-${blankNum}`}
            size="small"
            sx={{
              mx: 1,
              minWidth: { xs: 100, sm: 120 },
              '& .MuiOutlinedInput-root': {
                bgcolor: isSubmitted && answer
                  ? (answer.userAnswer.toLowerCase() === answer.correctAnswer.toLowerCase()
                    ? 'success.light'
                    : 'error.light')
                  : 'background.paper',
              }
            }}
            disabled={isSubmitted}
          >
            <InputLabel>{`Blank ${blankNum}`}</InputLabel>
            <Select
              value={answer?.userAnswer || ''}
              onChange={(e) => handleAnswerChange(blankNum, e.target.value as string)}
            >
              <MenuItem value="">Select...</MenuItem>
              {answer?.options.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      }
    }
    return result;
  };

  // Convert questions to topic format
  const questionTopics = questions.map((q) => ({
    id: q.id,
    title: q.title,
    duration: '10m',
    speaker: 'Narrator',
    difficulty: q.difficulty,
    category: 'Reading & Writing',
    tags: q.tags,
    isNew: q.isNew,
    isMarked: q.isMarked,
    pracStatus: q.pracStatus,
    hasExplanation: q.hasExplanation,
    createdAt: q.createdAt,
    updatedAt: q.updatedAt,
  }));

  return (
    <GradientBackground>
      <StageGoalBanner />

      <PracticeCardWithInstructionsPopover
        icon="FIB"
        title="Reading & Writing: Fill in the Blanks"
        instructions="There are some words missing in the following text. Please select the correct word in the drop-down box."
        difficulty={currentQuestion?.difficulty}
        instructionsConfig={{
          sections: instructionsSections,
          size: 'medium',
          color: 'primary',
          // maxWidth: 'sm',
          tooltipTitle: 'View detailed instructions'
        }}
      >
        <QuestionHeader
          questionNumber={currentQuestionIndex + 1}
          studentName="Student Name"
          testedCount={30}
        />

        <TimerDisplay
          timeRemaining={timer.timeRemaining}
          isRunning={timer.isRunning}
          warningThreshold={timer.warningThreshold}
          showStartMessage={!timer.isRunning}
          startMessage="Timer will start when you begin answering"
          autoSubmit={timer.autoSubmit}
        />

        <ContentDisplay
          title={currentQuestion?.title}
          content={
            <Box sx={{ lineHeight: 1.8, fontSize: { xs: '14px', sm: '16px' } }}>
              {renderTextWithBlanks()}
            </Box>
          }
          category="Reading & Writing"
          difficulty={currentQuestion?.difficulty}
          tags={['Fill in Blanks']}
          showMetadata={true}
        />

        <ProgressIndicator
          current={answers.filter(a => a.userAnswer).length}
          total={answers.length}
          label="blanks filled"
          color="primary"
        />

        <ActionButtons
          hasResponse={answers.some(answer => answer.userAnswer)}
          onSubmit={handleSubmit}
          onRedo={handleRedo}
          onTranslate={() => setShowTranslate(true)}
          onShowAnswer={() => setShowAnswer(true)}
          recordedBlob={null}
        />

        <NavigationSection
          onSearch={handleSearch}
          onPrevious={handlePrevious}
          onNext={handleNext}
          questionNumber={currentQuestionIndex + 1}
        />
      </PracticeCardWithInstructionsPopover>

      <TopicSelectionDrawer
        open={showTopicSelector}
        onClose={() => setShowTopicSelector(false)}
        onSelect={handleTopicSelect}
        topics={questionTopics}
        title="Reading & Writing: Fill in the Blanks"
        type="question"
      />

      <ResultsDialog
        open={showResults}
        onClose={() => setShowResults(false)}
        result={currentResult}
        onTryAgain={handleRedo}
      />

      <AnswerDialog
        open={showAnswer}
        onClose={() => setShowAnswer(false)}
        title={currentQuestion?.title || ''}
        text={currentQuestion?.text}
        answers={answers.map(answer => ({
          id: String(answer.id),
          position: answer.id,
          correctAnswer: answer.correctAnswer,
          label: `Blank ${answer.id}`
        }))}
      />

      <TranslationDialog
        open={showTranslate}
        onClose={() => setShowTranslate(false)}
        description="Translation feature will help you understand the passage content in your preferred language."
      />
    </GradientBackground>
  );
};

export default FillInBlanks;