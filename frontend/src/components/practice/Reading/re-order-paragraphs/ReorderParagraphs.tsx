import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Divider,
  LinearProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Chip,
  useTheme,
  useMediaQuery,
  Stack,
  styled,
  Alert,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Paragraph, Question, QUESTIONS } from './constants';
import TopicSelectionDrawer from '../../../common/TopicSelectionDrawer';
import ActionButtons from '../../common/ActionButtons';
import NavigationSection from '../../common/NavigationSection';
import QuestionHeader from '../../common/QuestionHeader';
import StageGoalBanner from '../../common/StageGoalBanner';
import { GradientBackground } from '../../../common/CommonStyles';
import TranslationDialog from '../../../common/TranslationDialog';
import { DragStartEvent, DragEndEvent, DndContext, closestCenter, DragOverlay } from '@dnd-kit/core';
import { DragIndicator } from '@mui/icons-material';
import { TimerDisplay, ContentDisplay, ProgressIndicator, ResultsDialog, AnswerDialog } from '../../../common';
import PracticeCardWithInstructionsPopover from '../../../common/PracticeCardWithInstructionsPopover';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useFloatingSearch } from '../../../hooks/useFloatingSearch';

interface TimerState {
  timeRemaining: number;
  isRunning: boolean;
  warningThreshold: number;
  autoSubmit: boolean;
}

interface QuestionResult {
  questionId: string;
  score: number;
  maxScore: number;
  correctAnswers: number;
  totalQuestions: number;
  completedAt: Date;
  timeSpent: number;
  answers: any[];
  percentage: number;
}

// Sortable paragraph item component
interface SortableParagraphItemProps {
  paragraph: Paragraph;
  index: number;
  isSubmitted: boolean;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  totalItems: number;
}

const SortableParagraphItem: React.FC<SortableParagraphItemProps> = ({
  paragraph,
  index,
  isSubmitted,
  onMoveUp,
  onMoveDown,
  totalItems
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: paragraph.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const isCorrectPosition = isSubmitted && paragraph.originalOrder === index + 1;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      sx={{
        mb: 1,
        border: isSubmitted 
          ? (isCorrectPosition ? '2px solid #4caf50' : '2px solid #f44336')
          : '1px solid #e0e0e0',
        bgcolor: isSubmitted 
          ? (isCorrectPosition ? '#e8f5e9' : '#ffebee')
          : 'white',
        cursor: isDragging ? 'grabbing' : 'grab',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: 2
        }
      }}
    >
      <CardContent sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box display="flex" flexDirection="column" gap={0.5} alignItems="center">
          <IconButton
            onClick={() => onMoveUp(index)}
            disabled={index === 0 || isSubmitted}
            size="small"
          >
            <ArrowUpwardIcon fontSize="small" />
          </IconButton>
          
          <Chip 
            label={index + 1} 
            size="small" 
            color={isSubmitted ? (isCorrectPosition ? 'success' : 'error') : 'default'}
          />
          
          <IconButton
            onClick={() => onMoveDown(index)}
            disabled={index === totalItems - 1 || isSubmitted}
            size="small"
          >
            <ArrowDownwardIcon fontSize="small" />
          </IconButton>
        </Box>
         <Box
            className="drag-handle"
            {...listeners}
            sx={{ 
              cursor: 'grab',
              display: 'flex',
              alignItems: 'center',
              mr: 1,
              // color: theme.palette.text.secondary,
              '&:active': { cursor: 'grabbing' }
            }}
          >
            <DragIndicator sx={{ fontSize: 24 }} />
          </Box>
        
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="body1"
            sx={{ 
              wordBreak: 'break-word',
              fontSize: { xs: '14px', sm: '16px' }
            }}
          >
            {paragraph.text}
          </Typography>
          
          {isSubmitted && !isCorrectPosition && (
            <Typography 
              variant="caption" 
              color="error.main" 
              sx={{ mt: 1, display: 'block' }}
            >
              Should be in position {paragraph.originalOrder}
            </Typography>
          )}
        </Box>
        
        {isSubmitted && (
          <Typography variant="h6" sx={{ ml: 1 }}>
            {isCorrectPosition ? '✅' : '❌'}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

const ReorderParagraphs: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question>(QUESTIONS[currentQuestionIndex]);
  const [orderedParagraphs, setOrderedParagraphs] = useState<Paragraph[]>([]);
  const [showTopicSelector, setShowTopicSelector] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Timer state
  const [timer, setTimer] = useState<TimerState>({
    timeRemaining: 600, // 10 minutes
    isRunning: false,
    warningThreshold: 120,
    autoSubmit: true,
  });

  // Dialog states
  const [showAnswer, setShowAnswer] = useState(false);
  const [showTranslate, setShowTranslate] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentResult, setCurrentResult] = useState<QuestionResult | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<Date>(new Date());

  // Enable floating search button for this component
  useFloatingSearch({
    topics: QUESTIONS,
    title: 'Re-order Paragraphs Practice',
    type: 'reading',
    onTopicSelect: (topic: any) => {
      const question = topic;
      const index = QUESTIONS.findIndex(q => q.id === question.id);
      if (index !== -1) {
        setCurrentQuestionIndex(index);
      }
    },
    enabled: true
  });

  // Initialize question
  useEffect(() => {
    const newQuestion = QUESTIONS[currentQuestionIndex];
    setCurrentQuestion(newQuestion);
    const shuffledParagraphs = [...newQuestion.paragraphs].sort(() => Math.random() - 0.5);
    setOrderedParagraphs(shuffledParagraphs);
    setTimer({
      timeRemaining: 600,
      isRunning: false,
      warningThreshold: 120,
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

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    if (!timer.isRunning && !isSubmitted) {
      setTimer(prev => ({ ...prev, isRunning: true }));
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeIndex = orderedParagraphs.findIndex(p => p.id === active.id);
    const overIndex = orderedParagraphs.findIndex(p => p.id === over.id);

    if (activeIndex !== overIndex) {
      setOrderedParagraphs(prev => arrayMove(prev, activeIndex, overIndex));
    }
  };

  const moveParagraphUp = (index: number) => {
    if (index > 0 && !isSubmitted) {
      const newParagraphs = [...orderedParagraphs];
      [newParagraphs[index - 1], newParagraphs[index]] = [newParagraphs[index], newParagraphs[index - 1]];
      setOrderedParagraphs(newParagraphs);
      
      if (!timer.isRunning) {
        setTimer(prev => ({ ...prev, isRunning: true }));
      }
    }
  };

  const moveParagraphDown = (index: number) => {
    if (index < orderedParagraphs.length - 1 && !isSubmitted) {
      const newParagraphs = [...orderedParagraphs];
      [newParagraphs[index], newParagraphs[index + 1]] = [newParagraphs[index + 1], newParagraphs[index]];
      setOrderedParagraphs(newParagraphs);
      
      if (!timer.isRunning) {
        setTimer(prev => ({ ...prev, isRunning: true }));
      }
    }
  };

  const calculateScore = (): number => {
    let correctPairs = 0;
    for (let i = 0; i < orderedParagraphs.length - 1; i++) {
      const current = orderedParagraphs[i];
      const next = orderedParagraphs[i + 1];
      if (current.originalOrder === next.originalOrder - 1) correctPairs++;
    }
    return Math.round((correctPairs / (orderedParagraphs.length - 1)) * 100);
  };

  const getCorrectOrder = (): Paragraph[] => 
    [...currentQuestion.paragraphs].sort((a, b) => a.originalOrder - b.originalOrder);

  const handleSubmit = () => {
    if (isSubmitted) return;

    setIsSubmitted(true);
    setTimer(prev => ({ ...prev, isRunning: false }));

    const endTime = new Date();
    const timeSpent = Math.floor((endTime.getTime() - startTimeRef.current.getTime()) / 1000);
    const score = calculateScore();
    const correctOrder = getCorrectOrder();

    const result: QuestionResult = {
      questionId: String(currentQuestion.id),
      score,
      maxScore: 100,
      correctAnswers: orderedParagraphs.filter((p, i) => p.originalOrder === i + 1).length,
      totalQuestions: orderedParagraphs.length,
      completedAt: endTime,
      timeSpent,
      percentage: score,
      answers: orderedParagraphs.map((paragraph, index) => ({
        id: paragraph.id,
        position: index + 1,
        selectedAnswer: paragraph.text.substring(0, 50) + '...',
        correctAnswer: `Position ${paragraph.originalOrder}`,
        isCorrect: paragraph.originalOrder === index + 1
      }))
    };

    setCurrentResult(result);
    setShowResults(true);
  };

  const handleRedo = () => {
    const shuffledParagraphs = [...currentQuestion.paragraphs].sort(() => Math.random() - 0.5);
    setOrderedParagraphs(shuffledParagraphs);
    setTimer({
      timeRemaining: 600,
      isRunning: false,
      warningThreshold: 120,
      autoSubmit: true,
    });
    setIsSubmitted(false);
    setShowResults(false);
    setCurrentResult(null);
    startTimeRef.current = new Date();
  };

  const handleNext = () => {
    if (currentQuestionIndex < QUESTIONS.length - 1) {
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
    const index = QUESTIONS.findIndex(q => q.id === topic.id);
    if (index !== -1) {
      setCurrentQuestionIndex(index);
    }
    setShowTopicSelector(false);
  };

  // Convert questions to topic format
  const questionTopics = QUESTIONS.map(q => ({
    id: q.id,
    title: q.title,
    duration: '10m',
    speaker: 'Narrator',
    difficulty: 'Medium',
    category: 'Reading & Writing',
    tags: ['Reorder Paragraphs'],
    isNew: false,
    isMarked: false,
    pracStatus: 'In Progress',
    hasExplanation: true,
    createdAt: '',
    updatedAt: '',
  }));

  return (
    <GradientBackground>
      <StageGoalBanner />

      <PracticeCardWithInstructionsPopover
        icon="ROP"
        title="Reading & Writing: Re-order Paragraphs"
        instructions="Drag and drop the paragraphs to arrange them in the correct logical order."
        difficulty="Intermediate"
        instructionsConfig={{
          sections: [
            {
              title: 'Task Overview',
              items: ['Drag and drop the text boxes to put them in the correct order', 'Text boxes can be moved up, down, or reordered by dragging'],
            },
            {
              title: 'Reading Strategy',
              items: ['Look for chronological indicators (first, then, finally)', 'Identify cause and effect relationships', 'Find pronouns and their references', 'Look for connecting words and phrases'],
            },
            {
              title: 'Logical Flow Tips',
              items: [
                'Find the topic sentence (usually comes first)',
                'Look for supporting details and examples',
                'Identify conclusion or summary statements',
                'Check for smooth transitions between ideas',
                'Ensure the text flows logically from general to specific'
              ],
            },
            {
              title: 'Scoring',
              items: ['Points for each correct adjacent pair', 'Maximum score for perfect sequence', 'Partial credit for partial correctness'],
            },
          ],
          size: 'medium',
          color: 'primary',
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
          startMessage="Timer will start when you begin reordering"
          autoSubmit={timer.autoSubmit}
        />

        <ContentDisplay
          title={currentQuestion.title}
          content={
            <Typography variant="body2" color="text.secondary">
              Drag and drop the paragraphs to reorder them, or use the arrow buttons to move them up and down.
            </Typography>
          }
          category="Reading & Writing"
          difficulty="Intermediate"
          tags={['Reorder Paragraphs']}
          showMetadata={true}
        />

        {/* Reorder Interface */}
        <ContentDisplay
          content={
            <DndContext 
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <SortableContext 
                items={orderedParagraphs.map(p => p.id)} 
                strategy={verticalListSortingStrategy}
              >
                <Box>
                  {orderedParagraphs.map((paragraph, index) => (
                    <SortableParagraphItem
                      key={paragraph.id}
                      paragraph={paragraph}
                      index={index}
                      isSubmitted={isSubmitted}
                      onMoveUp={moveParagraphUp}
                      onMoveDown={moveParagraphDown}
                      totalItems={orderedParagraphs.length}
                    />
                  ))}
                </Box>
              </SortableContext>

              <DragOverlay>
                {activeId && (
                  <Card sx={{ opacity: 0.8, transform: 'rotate(5deg)' }}>
                    <CardContent>
                      <Typography>
                        {orderedParagraphs.find(p => p.id === activeId)?.text.substring(0, 50)}...
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </DragOverlay>
            </DndContext>
          }
          showMetadata={false}
        />

        {/* Score Display after submission */}
        {isSubmitted && (
          <Alert severity={calculateScore() >= 70 ? 'success' : 'warning'} sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Score: {calculateScore()}/100
            </Typography>
            <Typography variant="body2">
              {orderedParagraphs.filter((p, i) => p.originalOrder === i + 1).length} out of {orderedParagraphs.length} paragraphs in correct position
            </Typography>
          </Alert>
        )}

        <ProgressIndicator
          current={orderedParagraphs.filter((p, i) => p.originalOrder === i + 1).length}
          total={orderedParagraphs.length}
          label="paragraphs in correct position"
          color={isSubmitted ? (calculateScore() >= 70 ? 'success' : 'warning') : 'primary'}
        />

        <ActionButtons
          hasResponse={true}
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
        title="Select Question Topic"
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
              <Typography variant="h6" sx={{ mb: 2 }}>Paragraph Analysis:</Typography>
              <Stack spacing={1}>
                {orderedParagraphs.map((paragraph, index) => {
                  const isCorrect = paragraph.originalOrder === index + 1;
                  return (
                    <Box key={paragraph.id} sx={{ 
                      p: 1, 
                      bgcolor: isCorrect ? '#e8f5e9' : '#ffebee',
                      borderRadius: 1,
                      border: isCorrect ? '1px solid #4caf50' : '1px solid #f44336'
                    }}>
                      <Typography variant="body2">
                        <strong>Position {index + 1}:</strong> {paragraph.text.substring(0, 60)}...
                        {!isCorrect && ` (Should be position ${paragraph.originalOrder})`}
                      </Typography>
                    </Box>
                  );
                })}
              </Stack>
            </Box>
          )
        }
      />

      <AnswerDialog
        open={showAnswer}
        onClose={() => setShowAnswer(false)}
        title={currentQuestion.title}
        answers={getCorrectOrder().map((paragraph, index) => ({
          id: paragraph.id,
          position: index,
          correctAnswer: paragraph.text,
          label: `Position ${index + 1}`
        }))}
        guidance="The paragraphs should be arranged in logical order to form a coherent text."
      />

      <TranslationDialog
        open={showTranslate}
        onClose={() => setShowTranslate(false)}
        description="Translation feature will help you understand the paragraph content in your preferred language."
      />
    </GradientBackground>
  );
};

export default ReorderParagraphs;