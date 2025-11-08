import React, { useState, useEffect, useRef, use } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, Typography, IconButton, Stack, CardContent } from '@mui/material';
import { Button } from '../../../common/Button';
import { Close } from '@mui/icons-material';
import {
  TimerDisplay,
  ContentDisplay,
  ProgressIndicator,
  AnswerDialog,
  TranslationDialog,
  GradientBackground,
} from '../../../common';
import PracticeCardWithInstructionsPopover from '../../../common/PracticeCardWithInstructionsPopover';
import ActionButtons from '../../common/ActionButtons';
import NavigationSection from '../../common/NavigationSection';
import QuestionHeader from '../../common/QuestionHeader';
import RecordingSection from '../../common/RecordingSection';
import StageGoalBanner from '../../common/StageGoalBanner';
import TopicSelectionDrawer from '../../../common/TopicSelectionDrawer';
import {  Question } from './constants';
import { useFloatingSearch } from '../../../hooks/useFloatingSearch';
import { fetchDescribeImageQuestions } from '../../../../services/speaking/fetchQuestions';
import FeedbackDisplay from '../common/feedback';
import { describeImageSubmitAnswers } from '../../../../services/speaking/submitAnswers';

interface UserAttempt {
  questionId: number;
  recordedAudioUrl?: string;
  timestamp: string;
}

const instructionsSections = [
  {
    title: 'Task Overview',
    items: ['You have 25 seconds to prepare and 40 seconds to describe the image in detail.'],
  },
  {
    title: 'What to Include',
    items: [
      'Type of chart/diagram',
      'Main trends or patterns',
      'Key data points',
      'Comparisons between elements',
      'Overall conclusion',
    ],
  },
  {
    title: 'Useful Phrases',
    items: [
      '"This chart shows..."',
      '"The highest/lowest point is..."',
      '"There is an increase/decrease in..."',
      '"In comparison to..."',
      '"Overall, the data indicates..."',
    ],
  },
  {
    title: 'Scoring Criteria',
    items: [
      'Content: Completeness and accuracy',
      'Pronunciation: Clear articulation',
      'Fluency: Natural speech flow',
      'Vocabulary: Appropriate word choice',
    ],
  },
];

const useAudioRecording = (recordingTime = 40000) => {
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

const DescribeImage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [studentName] = useState('John Doe');
  const [testedCount] = useState(25);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showTranslate, setShowTranslate] = useState(false);
  const [showAttempts, setShowAttempts] = useState(false);
  const [showTopicSelector, setShowTopicSelector] = useState(false);
  const [preparationTime, setPreparationTime] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<UserAttempt[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [scores, setScores] = useState<{ [questionId: string]: any }>({});  
  const [loading, setLoading] = useState(false);

  const audioRecording = useAudioRecording(40000);

  // Enable floating search button for this component
  // useFloatingSearch({
  //   topics: questions.map(q => ({
  //     ...q,
  //     title: q.title,
  //     duration: '65s',
  //     speaker: 'Visual',
  //     difficulty: 'Intermediate',
  //     category: 'Image',
  //     tags: ['describe', 'image'],
  //     isNew: false,
  //     isMarked: false,
  //     pracStatus: 'Undone' as const,
  //     hasExplanation: true,
  //     createdAt: '2024-01-15',
  //     updatedAt: '2024-01-15'
  //   })),
  //   title: 'Describe Image Practice',
  //   type: 'speaking',
  //   onTopicSelect: (topic: any) => {
  //     const question = topic as Question;
  //     const index = questions.findIndex(q => q.id === question.id);
  //     if (index !== -1) {
  //       setCurrentQuestionIndex(index);
  //     }
  //   },
  //   enabled: true
  // });

  // Timer state for preparation
  const [timer, setTimer] = useState({
    timeRemaining: 25,
    isRunning: false,
    warningThreshold: 5,
    autoSubmit: false,
  });

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        let response = await fetchDescribeImageQuestions();
        console.log(response);
        response = response.map((q: any) => ({
          image: q.image_url,
          title: q.title,
          description: q.description,
          id: q.id
        }));
        setQuestions(response);
        if (response.length > 0) {
          setCurrentQuestion(response[0]);
          setQuestionNumber(1);
        }
      } catch (error) {
        console.error('Error fetching describe image questions:', error);
        setQuestions([]);
        setCurrentQuestion(null);
        setQuestionNumber(0);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);
    

  // Load attempts from localStorage
  useEffect(() => {
    const savedAttempts = localStorage.getItem('describeImageAttempts');
    if (savedAttempts) {
      try {
        setAttempts(JSON.parse(savedAttempts));
      } catch (error) {
        console.error('Failed to parse describeImageAttempts:', error);
        localStorage.removeItem('describeImageAttempts');
      }
    }
  }, []);

  // Save attempt to localStorage when recording is available
  useEffect(() => {
    if (audioRecording.recordedBlob && audioRecording.recordedAudioUrl) {
      const attempt: UserAttempt = {
        questionId: currentQuestion?.id || 0,
        recordedAudioUrl: audioRecording.recordedAudioUrl,
        timestamp: new Date().toISOString(),
      };
      setAttempts((prev) => {
        const newAttempts = [...prev, attempt];
        try {
          localStorage.setItem('describeImageAttempts', JSON.stringify(newAttempts));
        } catch (error) {
          console.error('Failed to save describeImageAttempts:', error);
        }
        return newAttempts;
      });
    }
  }, [audioRecording.recordedBlob, audioRecording.recordedAudioUrl, currentQuestion?.id]);

  // Sync state when question changes
  useEffect(() => {
    setCurrentQuestion(questions[currentQuestionIndex]);
    setTimer({
      timeRemaining: 25,
      isRunning: false,
      warningThreshold: 5,
      autoSubmit: false,
    });
    audioRecording.resetRecording();
    setPreparationTime(null);
    setShowFeedback(false);
  }, [currentQuestionIndex]);

  // Preparation timer
  useEffect(() => {
    if (preparationTime !== null && preparationTime > 0) {
      const prepTimerRef = setTimeout(() => {
        setPreparationTime((prev) => (prev !== null ? prev - 1 : null));
        setTimer(prev => ({ ...prev, timeRemaining: prev.timeRemaining - 1 }));
      }, 1000);
      return () => clearTimeout(prepTimerRef);
    } else if (preparationTime === 0) {
      setPreparationTime(null);
      setTimer(prev => ({ ...prev, isRunning: false }));
    }
  }, [preparationTime]);

  const handleStartPreparation = () => {
    setPreparationTime(25);
    setTimer(prev => ({ ...prev, isRunning: true }));
  };


  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuestionNumber(questionNumber + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setQuestionNumber(questionNumber - 1);
    }
  };

  const handleNext = () => {
    handleNextQuestion();
  };

  const handleSearch = () => {
    setShowTopicSelector(true);
  };

  const handleTopicSelect = (topic: any) => {
    const newIndex = questions.findIndex(q => q.id === topic.id);
    if (newIndex !== -1) {
      setCurrentQuestionIndex(newIndex);
      setQuestionNumber(newIndex + 655);
    }
    setShowTopicSelector(false);
  };

  const handleSubmit = async () => {
    if (!audioRecording.recordedBlob) {
      alert('Please record your reading before submitting.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('audio', audioRecording.recordedBlob);
      formData.append("image_url", currentQuestion?.image || '');
      formData.append("referenceDescription", currentQuestion?.description || '');
      const response = await describeImageSubmitAnswers(formData);
      console.log(response);
      if (!response) throw new Error('Failed to submit recording');
      setScores(prev => ({ ...prev, [currentQuestion?.id || 'unknown']: response }));
      
      setShowFeedback(true);
    } catch (error) {
      console.error('Error submitting recording:', error);
      alert('There was an error submitting your recording. Please try again.');
    } 
  };

  const handleRedo = () => {
    audioRecording.resetRecording();
    setPreparationTime(null);
    setShowFeedback(false);
    setTimer({
      timeRemaining: 25,
      isRunning: false,
      warningThreshold: 5,
      autoSubmit: false,
    });
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
        icon="DI"
        title="Describe Image"
        subtitle={`Progress: ${attempts.length}/${questions.length} questions attempted`}
        instructions="Describe the image including all relevant details, trends, and key information."
        difficulty="Intermediate"
        instructionsConfig={{
          sections: instructionsSections,
          size: 'medium',
          color: 'primary',
          tooltipTitle: 'View detailed instructions for Describe Image'
        }}
      >
        <QuestionHeader
          questionNumber={questionNumber}
          studentName={studentName}
          testedCount={testedCount}
        />

        {preparationTime !== null && (
          <TimerDisplay
            timeRemaining={timer.timeRemaining}
            isRunning={timer.isRunning}
            warningThreshold={timer.warningThreshold}
            autoSubmit={timer.autoSubmit}
            showStartMessage={false}
          />
        )}

        <ContentDisplay
          title={currentQuestion?.title}
          content={
            <Box>
              {!preparationTime && (
                <Box sx={{ mb: 2, textAlign: 'center' }}>
                  <button
                    onClick={handleStartPreparation}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#ff9800',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      cursor: 'pointer'
                    }}
                  >
                    Start Preparation (25s)
                  </button>
                </Box>
              )}
              <Box sx={{ mb: 3 }}>
                <img
                  src={currentQuestion?.image}
                  alt={currentQuestion?.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 8,
                    border: '1px solid #ddd'
                  }}
                />
              </Box>
              <Box sx={{ fontSize: '14px', color: 'text.secondary' }}>
                {currentQuestion?.description}
              </Box>
            </Box>
          }
          category="Image Description"
          difficulty="Intermediate"
          tags={['describe', 'image', 'analysis']}
        />

        <RecordingSection
          isRecording={audioRecording.isRecording}
          recordedBlob={audioRecording.recordedBlob}
          recordedAudioUrl={audioRecording.recordedAudioUrl}
          micPermission={audioRecording.micPermission}
          showRecordingPrompt={preparationTime === 0}
          preparationTime={preparationTime}
          recordingType="Describe Image"
          recordingTime={40}
          onToggleRecording={audioRecording.toggleRecording}
        />

        <ProgressIndicator
          current={audioRecording.recordedBlob ? 1 : 0}
          total={1}
          label="recording completed"
        />

        {!showFeedback && (
          <ActionButtons
            hasResponse={audioRecording.recordedBlob !== null}
            recordedBlob={audioRecording.recordedBlob}
            onSubmit={handleSubmit}
            onRedo={handleRedo}
            onTranslate={() => setShowTranslate(true)}
            onShowAnswer={() => setShowAnswer(true)}
            handleViewAttempts={handleViewAttempts}
          />
        )}
        
        <FeedbackDisplay
          feedback={scores[currentQuestion?.id || '']}
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
        open={showTopicSelector}
        onClose={() => setShowTopicSelector(false)}
        onSelect={handleTopicSelect}
        topics={questions.map(q => ({
          ...q,
          title: q.title,
          duration: '65s',
          speaker: 'Visual',
          difficulty: 'Intermediate',
          category: 'Image',
          tags: ['describe', 'image'],
          isNew: false,
          isMarked: false,
          pracStatus: 'Undone' as const,
          hasExplanation: true,
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15'
        }))}
        title="Select Image to Describe"
        type="question"
      />

      <AnswerDialog
        open={showAnswer}
        onClose={() => setShowAnswer(false)}
        title={currentQuestion?.title || ''}
        text={currentQuestion?.description}
        answers={[{
          id: '1',
          position: 1,
          correctAnswer: 'This is a sample description that covers all key elements of the image.'
        }]}
      />

      <TranslationDialog
        open={showTranslate}
        onClose={() => setShowTranslate(false)}
        description="Translation feature will help you understand the image content in your preferred language."
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
                const question = questions.find(q => q.id === attempt.questionId);
                return (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`Image: ${question?.title || 'Unknown'}`}
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
              localStorage.removeItem('describeImageAttempts');
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

export default DescribeImage;