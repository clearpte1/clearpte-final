import React, { useState, useEffect, useRef, useCallback, use } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Paper,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import { Close, Timer, DragIndicator } from '@mui/icons-material';
import { DndContext, closestCenter, DragEndEvent, useDroppable, useDraggable, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import ActionButtons from '../../common/ActionButtons';
import NavigationSection from '../../common/NavigationSection';
import QuestionHeader from '../../common/QuestionHeader';
import StageGoalBanner from '../../common/StageGoalBanner';
import { ReadingPassage, QuestionResult, BlankPosition, WordBankWord, TimerState } from './ReadingFillInTheBlanksTypes';
import { mockReadingPassages, mockStudentProgress } from './ReadingFillInTheBlanksMockData';
import TopicSelectionDrawer from '../../../common/TopicSelectionDrawer';
import { DroppableBlank, GradientBackground, TimerDisplay, ContentDisplay, DroppableWordBank, DraggableWord, ProgressIndicator, ResultsDialog, AnswerDialog, TranslationDialog } from '../../../common';
import PracticeCardWithInstructionsPopover from '../../../common/PracticeCardWithInstructionsPopover';
import { useFloatingSearch } from '../../../hooks/useFloatingSearch';
import { fetchReadingFillInTheBlanks } from '../../../../services/reading/fetchQuestions';

interface ReadingFillBlanksProps {}

const ReadingFillBlanks: React.FC<ReadingFillBlanksProps> = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [passage, setPassage] = useState<ReadingPassage | null>(null);
  const [showFillinBlanksSelector, setShowFillinBlanksSelector] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  // State management
  const [blanks, setBlanks] = useState<BlankPosition[]>([]);
  const [wordBank, setWordBank] = useState<WordBankWord[]>([]);
  const [timer, setTimer] = useState<TimerState>({
    timeRemaining: passage?.timeLimit || 300,
    isRunning: true,
    warningThreshold: 30,
    autoSubmit: true,
  });
  const [showAnswer, setShowAnswer] = useState(false);
  const [showTranslate, setShowTranslate] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentResult, setCurrentResult] = useState<QuestionResult | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<Date>(new Date());
  const[loading, setLoading] = useState(false);

  // Enable floating search button for this component
    // useFloatingSearch({
    //   topics: mockReadingPassages,
    //   title: 'Reading: Fill in the Blanks',
    //   type: 'Readking',
    //   onTopicSelect: (topic: any) => {
    //     // const sstTopic = convertLegacyTopic(topic as SummarizeSpokenTextTopic);
    //     setPassage(topic);
    //     setCurrentQuestionIndex(mockReadingPassages.findIndex(t => t.id === topic.id));
    //   },
    //   enabled: true
  // });
  
 useEffect(() => {
  async function fetchQuestions() {
    setLoading(true);
    try {
      const questions = await fetchReadingFillInTheBlanks();
      console.log("Raw questions:", questions);

      // 🧩 Map each API question to your UI structure
      const mappedQuestions = questions.map((q: any) => {
        // Collect all blank fields dynamically (blank1, blank2, etc.)
        const blanks: any[] = [];
        const wordBank: any[] = [];

        // Loop through all keys to extract blanks
        Object.keys(q).forEach((key) => {
          const blankMatch = key.match(/^blank(\d+)_answer$/);
          if (blankMatch && q[key]) {
            const position = parseInt(blankMatch[1]) - 1;
            const optionsKey = `blank${blankMatch[1]}_options`;
            const correctAnswer = q[key];
            const options = q[optionsKey] || [];

            blanks.push({
              id: `blank_${position}`,
              position,
              correctAnswer,
            });

            options.forEach((word: string, i: number) => {
              wordBank.push({
                id: `word_${position}_${i}`,
                word,
                isUsed: false,
                correctPosition:
                  word === correctAnswer ? position : undefined,
              });
            });
          }
        });

        // Return transformed object
        return {
          id: q.id,
          title: q.title,
          difficulty: q.difficulty,
          timeLimit: q.time_limit,
          category: q.category,
          tags: [],
          maxScore: 100,
          instructions:
            "Read the passage and fill in the blanks by dragging words from the word bank.",
          text: q.passage,
          blanks,
          wordBank,
          isNew: false,
          isMarked: false,
          pracStatus: 'Undone' as 'Undone' | 'Done' | 'In Progress' | 'Practice',
          hasExplanation: false,
          createdAt: q.created_at,
          updatedAt: q.updated_at,
        };
      });

      console.log("Mapped questions:", mappedQuestions);

      // Set first question to display
      setPassage(mappedQuestions[0]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching reading fill in the blanks questions:", error);
    }
  }

  fetchQuestions();
}, []);


  // Sync state when passage changes
  useEffect(() => {
    setBlanks(passage?.blanks?.map(blank => ({ ...blank })) || []);
    setWordBank(passage?.wordBank?.map(word => ({ ...word })) || []);
    setTimer({
      timeRemaining: passage?.timeLimit || 300,
      isRunning: true,
      warningThreshold: 30,
      autoSubmit: true,
    });
    setIsSubmitted(false);
    setShowResults(false);
    setCurrentResult(null);
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

  const studentProgress = mockStudentProgress;

  const handleNext = () => {
    if (currentQuestionIndex < mockReadingPassages.length - 1) {
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      setPassage(mockReadingPassages[newIndex]);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newIndex);
      setPassage(mockReadingPassages[newIndex]);
    }
  };

  const handleSearch = () => {
    setShowFillinBlanksSelector(true);
  };

  const handleFillinBlankSelect = (option: any) => {
    const newIndex = mockReadingPassages.findIndex(p => p.id === option.id);
    if (newIndex !== -1) {
      setCurrentQuestionIndex(newIndex);
      setPassage(option);
    }
    setShowFillinBlanksSelector(false);
  };

  const areAllBlanksFilled = useCallback((): boolean => {
    return blanks.every(blank => blank.filledWord && blank.filledWord.trim() !== '');
  }, [blanks]);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const sourceId = active.id as string;
    const destinationId = over.id as string;

    // From Word Bank to Blank
    if (sourceId.startsWith('word_') && destinationId.startsWith('blank_')) {
      const word = wordBank.find(w => w.id === sourceId);
      if (!word || word.isUsed) return;

      setBlanks(prev => {
        const newBlanks = [...prev];
        const blankIndex = newBlanks.findIndex(b => b.id === destinationId);
        if (blankIndex !== -1) {
          const blank = newBlanks[blankIndex];
          if (blank.filledWord) {
            setWordBank(prevWords => {
              const newWords = [...prevWords];
              const wordIdx = newWords.findIndex(w => w.word === blank.filledWord);
              if (wordIdx !== -1) {
                newWords[wordIdx] = { ...newWords[wordIdx], isUsed: false };
              }
              return newWords;
            });
          }
          newBlanks[blankIndex] = { ...blank, filledWord: word.word };
        }
        return newBlanks;
      });

      setWordBank(prev => {
        const newWords = [...prev];
        const wordIdx = newWords.findIndex(w => w.id === sourceId);
        if (wordIdx !== -1) {
          newWords[wordIdx] = { ...newWords[wordIdx], isUsed: true };
        }
        return newWords;
      });
    }

    // From Blank to Word Bank
    if (sourceId.startsWith('filled_') && destinationId === 'wordBank') {
      const blankId = sourceId.replace('filled_', '');
      const blankIndex = blanks.findIndex(b => b.id === blankId);

      if (blankIndex !== -1) {
        const blank = blanks[blankIndex];
        if (blank.filledWord) {
          setWordBank(prev => {
            const newWords = [...prev];
            const wordIdx = newWords.findIndex(w => w.word === blank.filledWord);
            if (wordIdx !== -1) {
              newWords[wordIdx] = { ...newWords[wordIdx], isUsed: false };
            }
            return newWords;
          });

          setBlanks(prev => {
            const newBlanks = [...prev];
            newBlanks[blankIndex] = { ...newBlanks[blankIndex], filledWord: undefined };
            return newBlanks;
          });
        }
      }
    }
    setActiveId(null);
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

    const score = Math.round((correctAnswers / blanks.length) * (passage?.maxScore ?? 0));

    const result: QuestionResult = {
      questionId: String(passage?.id),
      score,
      maxScore: passage?.maxScore || 0, 
      correctAnswers,
      totalBlanks: blanks.length,
      completedAt: endTime,
      timeSpent,
      answers: evaluatedBlanks,
    };

    setBlanks(evaluatedBlanks);
    setCurrentResult(result);
    setShowResults(true);
  };

  const handleRedo = () => {
    setBlanks(passage?.blanks?.map(blank => ({ ...blank }))|| []);
    setWordBank(passage?.wordBank.map(word => ({ ...word }))   || []);
    setTimer({
      timeRemaining: passage?.timeLimit || 300,
      isRunning: true,
      warningThreshold: 30,
      autoSubmit: true,
    });
    setIsSubmitted(false);
    setShowResults(false);
    setCurrentResult(null);
    startTimeRef.current = new Date();
  };

  const questionNumber = studentProgress.questionNumber + currentQuestionIndex;

  // Render text with blanks
  const renderTextWithBlanks = () => {
    let textParts = passage?.text.split(/(\[BLANK_\d+\])/) || [];
    
    return textParts.map((part, index) => {
      const blankMatch = part.match(/\[BLANK_(\d+)\]/);
      if (blankMatch) {
        const blankIndex = parseInt(blankMatch[1]);
        const blank = blanks.find(b => b.position+1 === blankIndex);
        if (blank) {
          return <DroppableBlank key={blank.id} blank={blank} />;
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
        title="Reading: Fill in the Blanks"
        instructions={passage?.instructions}
        difficulty={passage?.difficulty}
        instructionsConfig={{
          sections: [
            {
              title: 'Task Overview',
              items: ['Drag words from the box below to the appropriate place in the text.'],
            },
            {
              title: 'Strategy Tips',
              items: [
                'Read the entire text first',
                'Consider grammar and meaning',
                'Look for context clues',
                'Check subject-verb agreement',
                'Consider collocations',
              ],
            },
            {
              title: 'What to Consider',
              items: ['Parts of speech', 'Logical meaning', 'Grammatical correctness', 'Sentence flow', 'Overall coherence'],
            },
            {
              title: 'Scoring',
              items: ['1 point per correct answer', 'No negative marking', 'All blanks must be filled'],
            },
          ],
          size: 'medium',
          color: 'primary',
          tooltipTitle: 'View detailed instructions'
        }}
      >
        <QuestionHeader 
          questionNumber={questionNumber}
          studentName={studentProgress.studentName}
          testedCount={studentProgress.testedCount}
        />

        <TimerDisplay
          timeRemaining={timer.timeRemaining}
          isRunning={timer.isRunning}
          warningThreshold={timer.warningThreshold}
          autoSubmit={timer.autoSubmit}
        />

        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} collisionDetection={closestCenter}>
          <ContentDisplay
            title={passage?.title}
            content={renderTextWithBlanks()}
            category={passage?.category}
            difficulty={passage?.difficulty}
            tags={passage?.tags}
          />

          <ContentDisplay
            title="Word Bank"
            content={
              <DroppableWordBank 
                words={wordBank}
                onRenderWord={(word) => (
                  <DraggableWord key={word.id} word={word.word} id={word.id} />
                )}
              />
            }
            showMetadata={false}
          />

          <DragOverlay>
            {activeId && (
              <DraggableWord
                word={wordBank.find(w => w.id === activeId)?.word || ''}
                id={activeId}
                // dragStyle={{ fontSize: '16px', padding: '8px', width: 'fit-content', backgroundColor: '#f0f0f0' }}
              />
            )}
          </DragOverlay>
        </DndContext>

        <ProgressIndicator
          current={blanks.filter(b => b.filledWord).length}
          total={blanks.length}
          label="blanks filled"
        />

        <ActionButtons
          hasResponse={areAllBlanksFilled()}
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
          questionNumber={questionNumber}
        />
      </PracticeCardWithInstructionsPopover>

      <TopicSelectionDrawer
        open={showFillinBlanksSelector}
        onClose={() => setShowFillinBlanksSelector(false)}
        onSelect={handleFillinBlankSelect}
        topics={mockReadingPassages}
        title="Reading: Fill in the Blanks"
        type="lecture"
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
        title={passage?.title || ''}
        text={passage?.text || ''}
        answers={blanks.map(blank => ({
          id: blank.id,
          position: blank.position,
          correctAnswer: blank.correctAnswer
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
export default ReadingFillBlanks;