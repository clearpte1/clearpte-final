import React, { useState, useEffect, useRef, use } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, Typography, IconButton, Stack, CardContent } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Button } from '../../../common/Button';
import {
  TimerDisplay,
  ContentDisplay,
  ProgressIndicator,
  AnswerDialog,
  TranslationDialog,
  GradientBackground,
  StyledCard
} from '../../../common';
import PracticeCardWithInstructionsPopover from '../../../common/PracticeCardWithInstructionsPopover';
import ActionButtons from '../../common/ActionButtons';
import NavigationSection from '../../common/NavigationSection';
import QuestionHeader from '../../common/QuestionHeader';
import RecordingSection from '../../common/RecordingSection';
import StageGoalBanner from '../../common/StageGoalBanner';
import TextToSpeech from '../../common/TextToSpeech';
import TopicSelectionDrawer from '../../../common/TopicSelectionDrawer';
// import { readAloudQuestions } from './ReadALoudMockData';
import { ReadAloudQuestion, UserAttempt } from './ReadAloudTypes';
 import { User } from '../../../../types';
import { useFloatingSearch } from '../../../hooks/useFloatingSearch';
import axios from 'axios';
import { fetchReadAloudQuestions } from '../../../../services/speaking/fetchQuestions';
import { ReadAloudSubmitAnswers } from '../../../../services/speaking/submitAnswers';
import FeedbackDisplay from '../common/feedback';

interface PracticeTestsProps {
  user: User | null;
}

const API_BASE = process.env.REACT_APP_API_URL;

const instructionsSections = [
  {
    title: 'Task Overview',
    items: ['You will see a text on screen. You have 40 seconds to read and understand it, then 40 seconds to read it aloud.'],
  },
  {
    title: 'Time Allocation',
    items: ['Reading time: 40 seconds', 'Recording time: 40 seconds'],
  },
  {
    title: 'Tips',
    items: [
      'Read the text silently first',
      'Note punctuation and intonation',
      'Speak clearly and at natural pace',
      'Don\'t rush or speak too slowly',
    ],
  },
  {
    title: 'Scoring',
    items: [
      'Content: Reading all words correctly',
      'Pronunciation: Clear articulation',
      'Fluency: Natural rhythm and pace',
    ],
  },
];

const useAudioRecording = (preparationTime: number | null, recordingTime = 40000) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [micPermission, setMicPermission] = useState<boolean | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkMicPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicPermission(true);
        stream.getTracks().forEach((track) => track.stop());
      } catch (error) {
        console.error('Microphone permission check failed:', error);
        setMicPermission(false);
      }
    };
    checkMicPermission();
  }, []);

  const toggleRecording = async () => {
    if (micPermission === false) {
      alert('Microphone permission is required. Please grant permission and try again.');
      return;
    }

    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        const chunks: Blob[] = [];
        mediaRecorder.ondataavailable = (event) => chunks.push(event.data);
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/webm' });
          setRecordedBlob(blob);
          const url = URL.createObjectURL(blob);
          setRecordedAudioUrl(url);
          stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorder.start();
        setIsRecording(true);

        timerRef.current = setTimeout(() => {
          if (mediaRecorderRef.current?.state === 'recording') {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
          }
        }, recordingTime);
      } catch (error) {
        console.error('Microphone access denied:', error);
        setMicPermission(false);
        alert('Unable to access microphone. Please check permissions.');
      }
    } else if (isRecording && mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearTimeout(timerRef.current);
    }
  };

  const resetRecording = () => {
    setRecordedBlob(null);
    setRecordedAudioUrl(null);
    setIsRecording(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  useEffect(() => {
    return () => {
      if (recordedAudioUrl) URL.revokeObjectURL(recordedAudioUrl);
    };
  }, [recordedAudioUrl]);

  return { isRecording, recordedBlob, recordedAudioUrl, micPermission, toggleRecording, resetRecording };
};

export const ReadAloud: React.FC<PracticeTestsProps> = ({ user }) => {
  const [readAloudQuestions, setReadAloudQuestions] = useState<ReadAloudQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState<ReadAloudQuestion|null>(null);
  const [questionNumber, setQuestionNumber] = useState(65535);
  const [studentName] = useState('John Doe');
  const [testedCount] = useState(30);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showTranslate, setShowTranslate] = useState(false);
  const [showAttempts, setShowAttempts] = useState(false);
  const [preparationTime, setPreparationTime] = useState<number | null>(null);
  const [showRecordingPrompt, setShowRecordingPrompt] = useState(false);
  const [showTopicSelector, setShowTopicSelector] = useState(false);
  const [attempts, setAttempts] = useState<UserAttempt[]>([]);
  const [loading, setLoading] = useState(false);
  const [scores, setScores] = useState<{ [key: string]: {} }>({});


  const audioRecording = useAudioRecording(
    preparationTime, 
    selectedQuestion?.recordingTime ? selectedQuestion.recordingTime * 1000 : 40000
  );
  const prepTimerRef = useRef<NodeJS.Timeout | null>(null);
  const completedQuestions = attempts.length;

  // Timer state for preparation
  const [timer, setTimer] = useState({
    timeRemaining: selectedQuestion?.preparationTime,
    isRunning: false,
    warningThreshold: 10,
    autoSubmit: false,
  });



  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        const questions = await fetchReadAloudQuestions();
        if (questions.length > 0) {
          setReadAloudQuestions(questions);
          setSelectedQuestion(questions[0]);
          setCurrentQuestionIndex(0);
          setTimer({
            timeRemaining: questions[0].preparationTime,
            isRunning: false,
            warningThreshold: 10,
            autoSubmit: false,
          });
        } else {
          console.warn('No questions received from API, using mock data.');
        }
      } catch (error) {
        console.error('Error fetching questions from API:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  // Sync state when question changes
  useEffect(() => {
    if (readAloudQuestions.length === 0) return;
    setSelectedQuestion(readAloudQuestions[currentQuestionIndex]);
    setTimer({
      timeRemaining: readAloudQuestions[currentQuestionIndex].preparationTime,
      isRunning: false,
      warningThreshold: 10,
      autoSubmit: false,
    });
    audioRecording.resetRecording();
    setPreparationTime(null);
    setShowRecordingPrompt(false);
  }, [currentQuestionIndex, readAloudQuestions]);

  // Load attempts from localStorage
  useEffect(() => {
    const savedAttempts = localStorage.getItem('readAloudAttempts');
    if (savedAttempts) {
      try {
        setAttempts(JSON.parse(savedAttempts));
      } catch (error) {
        console.error('Failed to parse readAloudAttempts:', error);
        localStorage.removeItem('readAloudAttempts');
      }
    }
  }, []);

  // Save attempt to localStorage when recording is available
  useEffect(() => {
    if (audioRecording.recordedBlob && audioRecording.recordedAudioUrl && selectedQuestion) {
      const attempt: UserAttempt = {
        questionId: selectedQuestion.id,
        recordedAudioUrl: audioRecording.recordedAudioUrl,
        timestamp: new Date().toISOString(),
      };
      setAttempts((prev) => {
        const newAttempts = [...prev, attempt];
        try {
          localStorage.setItem('readAloudAttempts', JSON.stringify(newAttempts));
        } catch (error) {
          console.error('Failed to save readAloudAttempts:', error);
        }
        return newAttempts;
      });
    }
  }, [audioRecording.recordedBlob, audioRecording.recordedAudioUrl, selectedQuestion?.id]);

  // Preparation timer
  useEffect(() => {
    if (preparationTime !== null && preparationTime > 0 ) {
      prepTimerRef.current = setTimeout(() => {
        setPreparationTime((prev) => (prev !== null ? prev - 1 : null));
        setTimer(prev => ({ ...prev, timeRemaining: (prev.timeRemaining ?? 0) - 1 }));
      }, 1000);
    } else if (preparationTime === 0) {
      setShowRecordingPrompt(true);
      setPreparationTime(null);
      setTimer(prev => ({ ...prev, isRunning: false }));
    }
    return () => {
      if (prepTimerRef.current) clearTimeout(prepTimerRef.current);
    };
  }, [preparationTime]);

    // Enable floating search button for this component
  useFloatingSearch({
    topics: readAloudQuestions,
    title: 'Read Aloud Practice',
    type: 'speaking',
    onTopicSelect: (topic: any) => {
      const question = topic as ReadAloudQuestion;
      setSelectedQuestion(question);
      setCurrentQuestionIndex(readAloudQuestions.findIndex(q => q.id === question.id));
    },
    enabled: true
  });

  const handleSubmit = async () => {
    if (!audioRecording.recordedBlob) {
      alert('Please record your reading before submitting.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('audio', audioRecording.recordedBlob);
      formData.append('referenceText', selectedQuestion?.text || '');
      const response = await ReadAloudSubmitAnswers(formData);
      if (!response) throw new Error('Failed to process recording');
      setScores(prev => ({ ...prev, [selectedQuestion?.id || 'unknown']: response }));
      // Save attempt locally
      if (!selectedQuestion) return;
      const attempt: UserAttempt = {
        questionId: selectedQuestion.id,
        recordedAudioUrl: audioRecording.recordedAudioUrl || '',
        timestamp: new Date().toISOString(),
      };
      setAttempts((prev) => {
        const newAttempts = [...prev, attempt];
        localStorage.setItem('readAloudAttempts', JSON.stringify(newAttempts));
        return newAttempts;
      });

      // Reset for next question
      setQuestionNumber((prev) => prev + 1);
      handleRedo();
    } catch (error) {
      console.error('Error submitting recording:', error);
      alert('Failed to submit recording. Please try again.');
    }
  };


  const handleRedo = () => {
    audioRecording.resetRecording();
    setPreparationTime(null);
    setShowRecordingPrompt(false);
    setTimer({
      timeRemaining: selectedQuestion?.preparationTime,
      isRunning: false,
      warningThreshold: 10,
      autoSubmit: false,
    });
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setQuestionNumber(questionNumber - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < readAloudQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuestionNumber(questionNumber + 1);
    }
  };

  const handleSearch = () => {
    setShowTopicSelector(true);
  };

  const handleTopicSelect = (topic: any) => {
    const newIndex = readAloudQuestions.findIndex(q => q.id === topic.id);
    if (newIndex !== -1) {
      setCurrentQuestionIndex(newIndex);
      setQuestionNumber(readAloudQuestions.findIndex(q => q.id === topic.id) + 65535);
    }
    setShowTopicSelector(false);
  };

  const handleStartPreparation = () => {
    if (!selectedQuestion) return;
    setPreparationTime(selectedQuestion.preparationTime);
    setTimer(prev => ({ ...prev, isRunning: true }));
  };

  const handleViewAttempts = () => {
    setShowAttempts(true);
  };

  return (
    <GradientBackground>
      {loading ? (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6">Loading questions...</Typography>
      </Box>
      ) : (
      <>
        <StageGoalBanner />
        
        <PracticeCardWithInstructionsPopover
        icon="RA"
        title="Read Aloud"
        subtitle={`Progress: ${completedQuestions}/${readAloudQuestions.length} questions attempted`}
        instructions="You will see a text on screen. You have 40 seconds to read and understand it, then 40 seconds to read it aloud."
        difficulty={selectedQuestion?.difficulty}
        instructionsConfig={{
          sections: instructionsSections,
          size: 'medium', 
          color: 'primary',
          tooltipTitle: 'View detailed instructions for Read Aloud'
        }}
        >
        <QuestionHeader
          questionNumber={questionNumber}
          studentName={studentName} 
          testedCount={testedCount}
        />

        {preparationTime !== null && (
          <TimerDisplay
            timeRemaining={timer.timeRemaining ?? 0}
            isRunning={timer.isRunning}
            warningThreshold={timer.warningThreshold}
            autoSubmit={timer.autoSubmit}
            showStartMessage={false}
          />
        )}

        <ContentDisplay
          title="Text to Read"
          content={
          <Box>
            {!preparationTime && (
            <Box sx={{ mb: 2, textAlign: 'center' }}>
              <button 
              onClick={handleStartPreparation}
              style={{
                padding: '12px 24px',
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
              >
              Start Preparation Timer
              </button>
            </Box>
            )}
            <Box sx={{ fontSize: '18px', lineHeight: 1.8, fontWeight: 'medium' }}>
            {selectedQuestion?.text}
            </Box>
          </Box>
          }
          category={selectedQuestion?.category}
          difficulty={selectedQuestion?.difficulty}
          tags={selectedQuestion?.tags}
        />

        <RecordingSection
          isRecording={audioRecording.isRecording}
          recordedBlob={audioRecording.recordedBlob}
          recordedAudioUrl={audioRecording.recordedAudioUrl}
          micPermission={audioRecording.micPermission}
          showRecordingPrompt={showRecordingPrompt}
          preparationTime={preparationTime}
          recordingType="Read Aloud"
          recordingTime={selectedQuestion?.recordingTime ?? 0}
          onToggleRecording={audioRecording.toggleRecording}
        />

        <ProgressIndicator
          current={audioRecording.recordedBlob ? 1 : 0}
          total={1}
          label="recording completed"
        />

        <ActionButtons
          hasResponse={audioRecording.recordedBlob !== null}
          recordedBlob={audioRecording.recordedBlob}
          onSubmit={handleSubmit}
          onRedo={handleRedo}
          onTranslate={() => setShowTranslate(true)}
          onShowAnswer={() => setShowAnswer(true)}
          handleViewAttempts={handleViewAttempts}
              />
        
        <FeedbackDisplay
          feedback={scores[selectedQuestion?.id || '']}
        />
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
        open={showTopicSelector}
        onClose={() => setShowTopicSelector(false)}
        onSelect={handleTopicSelect}
        topics={readAloudQuestions.map(q => ({
          ...q,
          title: q.text.substring(0, 50) + '...',
          duration: `${q.preparationTime + q.recordingTime}s`,
          speaker: 'Narrator',
        }))}
        title="Select Read Aloud Question"
        type="question"
        />

        <AnswerDialog
        open={showAnswer}
        onClose={() => setShowAnswer(false)}
        title={selectedQuestion?.text.substring(0, 50) + '...'}
        text={selectedQuestion?.text}
        answers={[{
          id: '1',
          position: 1,
          correctAnswer: selectedQuestion?.expectedAnswer || '',
        }]}
        />

        <TranslationDialog
        open={showTranslate}
        onClose={() => setShowTranslate(false)}
        description="Translation feature will help you understand the text content in your preferred language."
        />

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
            const question = readAloudQuestions.find(q => q.id === attempt.questionId);
            return (
              <ListItem key={index}>
              <ListItemText
                primary={`Text: ${question?.text.substring(0, 50) || 'Unknown'}...`}
                secondary={
                <>
                  <Typography component="span" variant="body2">
                  Time: {new Date(attempt.timestamp).toLocaleString()}
                  </Typography>
                  {attempt.recordedAudioUrl && (
                  <audio controls src={attempt.recordedAudioUrl} style={{ width: '100%', marginTop: '8px' }}>
                    Your browser does not support the audio element.
                  </audio>
                  )}
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
            localStorage.removeItem('readAloudAttempts');
          }}
          >
          Clear Attempts
          </Button>
          <Button onClick={() => setShowAttempts(false)}>Close</Button>
        </DialogActions>
        </Dialog>
      </>
      )}
    </GradientBackground>
  );
};

export default ReadAloud;