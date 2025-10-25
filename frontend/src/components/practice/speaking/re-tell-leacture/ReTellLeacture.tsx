import React, { useState, useEffect, useRef } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, Typography, IconButton, Stack, CardContent } from '@mui/material';
import { Button } from '../../../common/Button';
import { Close, Feedback } from '@mui/icons-material';
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
 import { User } from '../../../../types';
import { LectureTopic, UserAttempt } from './ReTellLeactureType';
import { useFloatingSearch } from '../../../hooks/useFloatingSearch';
import { fetchRetellLectureQuestions } from '../../../../services/speaking/fetchQuestions';
import { compareAudio, reTellLectureSubmitAnswers } from '../../../../services/speaking/submitAnswers';
import FeedbackDisplay from '../common/feedback';

interface PracticeTestsProps {
  user: User | null;
}

const instructionsSections = [
  {
    title: 'Task Overview',
    items: ['You will hear a lecture. After listening, retell what you heard in your own words.'],
  },
  {
    title: 'Time Allocation',
    items: ['Lecture time: Variable', 'Preparation time: 10 seconds', 'Recording time: 40 seconds'],
  },
  {
    title: 'Tips',
    items: [
      'Listen carefully to the main points',
      'Take mental notes during the lecture',
      'Focus on key ideas and supporting details',
      'Use your own words to retell',
      'Speak clearly and maintain good pace',
    ],
  },
  {
    title: 'Scoring',
    items: [
      'Content: Main ideas and details',
      'Pronunciation: Clear speech',
      'Fluency: Natural flow',
      'Vocabulary: Appropriate word choice',
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
        console.error('Initial microphone permission check failed:', error);
        setMicPermission(false);
      }
    };
    checkMicPermission();
  }, []);

  const toggleRecording = async () => {
    if (micPermission === false) {
      alert('Microphone permission is required to record. Please grant permission and try again.');
      return;
    }

    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicPermission(true);
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        const chunks: Blob[] = [];
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };

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
          if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
          }
        }, recordingTime);
      } catch (error) {
        console.error('Microphone access denied:', error);
        setMicPermission(false);
        alert('Unable to access the microphone. Please ensure you have granted permission.');
      }
    } else if (isRecording && mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }
  };

  const resetRecording = () => {
    setRecordedBlob(null);
    setRecordedAudioUrl(null);
    setIsRecording(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (recordedAudioUrl) {
        URL.revokeObjectURL(recordedAudioUrl);
      }
    };
  }, [recordedAudioUrl]);

  return {
    isRecording,
    recordedBlob,
    recordedAudioUrl,
    micPermission,
    toggleRecording,
    resetRecording
  };
};

export const ReTellLeacture: React.FC<PracticeTestsProps> = ({ user }) => {
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState<LectureTopic| null>(null);
  const [showTopicSelector, setShowTopicSelector] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(655);
  const [studentName] = useState('Rachel Carson');
  const [testedCount] = useState(33);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showTranslate, setShowTranslate] = useState(false);
  const [showAttempts, setShowAttempts] = useState(false);
  const [preparationTime, setPreparationTime] = useState<number | null>(null);
  const [showRecordingPrompt, setShowRecordingPrompt] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<UserAttempt[]>([]);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<LectureTopic[]>([]);
  const [scores, setScores] = useState<{ [key: string]: {} }>({});


  const audioRecording = useAudioRecording(preparationTime, 40 * 1000);
  const prepTimerRef = useRef<NodeJS.Timeout | null>(null);
  const completedQuestions = attempts.length;

  // Enable floating search button for this component
  // useFloatingSearch({
  //   topics: audioTopics,
  //   title: 'Re-tell Lecture Practice',
  //   type: 'speaking',
  //   onTopicSelect: (topic: any) => {
  //     const lecture = topic as LectureTopic;
  //     const index = audioTopics.findIndex(t => t.id === lecture.id);
  //     if (index !== -1) {
  //       setCurrentTopicIndex(index);
  //     }
  //   },
  //   enabled: true
  // });


  // Timer state for preparation
  const [timer, setTimer] = useState({
    timeRemaining: selectedTopic?.preparationTime || 40,
    isRunning: false,
    warningThreshold: 3,
    autoSubmit: false,
  });

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        const response = await fetchRetellLectureQuestions();
        const mappedResponse = response.map(item => ({
          id: item.id,
          title: item.title,
          category: item.category,
          difficulty: item.difficulty,
          duration: item.duration,
          preparationTime: item.preparation_time,
          recordingTime: item.speaking_time,
          audioUrl: item.audio_url,
          audioText: item.transcript,
          expectedAnswer: '',
          speaker: "Lecturer",
          tags: [item.subject],
          createdAt: item.created_at,
          updatedAt: item.updated_at,
          type: "lecture" as const,
          isNew: false,
          isMarked: false,
          pracStatus: "Undone" as const,
          attempts: 0,
          lastAttempt: null,
          hasExplanation: false,
          questionType: 'ASQ' as const
        }));
        setQuestions(mappedResponse);
        if (response.length > 0) {
          setSelectedTopic(mappedResponse[0]);
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
      
    }
    fetchQuestions();
  }, []);

  // Sync state when topic changes
  useEffect(() => {
    setSelectedTopic(questions[currentTopicIndex]);
    setTimer({
      timeRemaining: questions[currentTopicIndex]?.preparationTime || 40,
      isRunning: false,
      warningThreshold: 3,
      autoSubmit: false,
    });
    audioRecording.resetRecording();
    setPreparationTime(null);
    setShowRecordingPrompt(false);
    setQuestionNumber(currentTopicIndex + 655);
  }, [currentTopicIndex]);

  // Load attempts from localStorage on mount
  useEffect(() => {
    const savedAttempts = localStorage.getItem('retellLectureAttempts');
    if (savedAttempts) {
      try {
        setAttempts(JSON.parse(savedAttempts));
      } catch (error) {
        console.error('Failed to parse retellLectureAttempts from localStorage:', error);
        localStorage.removeItem('retellLectureAttempts');
      }
    }
  }, []);

  // Save attempt to localStorage when recording is available
  useEffect(() => {
    if (audioRecording.recordedBlob && audioRecording.recordedAudioUrl) {
      const attempt: UserAttempt = {
        questionId: selectedTopic?.id || 0,
        recordedAudioUrl: audioRecording.recordedAudioUrl,
        timestamp: new Date().toISOString(),
      };
      setAttempts((prev) => {
        const newAttempts = [...prev, attempt];
        try {
          localStorage.setItem('retellLectureAttempts', JSON.stringify(newAttempts));
        } catch (error) {
          console.error('Failed to save retellLectureAttempts to localStorage:', error);
        }
        return newAttempts;
      });
    }
  }, [audioRecording.recordedBlob, audioRecording.recordedAudioUrl, selectedTopic?.id]);

  // Preparation timer
  useEffect(() => {
    if (preparationTime !== null && preparationTime > 0) {
      prepTimerRef.current = setTimeout(() => {
        setPreparationTime((prev) => (prev !== null ? prev - 1 : null));
        setTimer(prev => ({ ...prev, timeRemaining: prev?.timeRemaining - 1 }));
      }, 1000);
    } else if (preparationTime === 0) {
      setShowRecordingPrompt(true);
      setPreparationTime(null);
      setTimer(prev => ({ ...prev, isRunning: false }));
    }
    return () => {
      if (prepTimerRef.current) {
        clearTimeout(prepTimerRef.current);
      }
    };
  }, [preparationTime]);

  const handleSubmit = async () => {
    if (!audioRecording.recordedBlob) {
      alert('Please record your reading before submitting.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('audio', audioRecording.recordedBlob);
      formData.append('referenceText', selectedTopic?.audioText || '');
      const response = await reTellLectureSubmitAnswers(formData);
      if (!response) throw new Error('Failed to process recording');
      setScores(prev => ({ ...prev, [selectedTopic?.id || 'unknown']: response }));
      if (!selectedTopic) return;
      const attempt: UserAttempt = {
        questionId: selectedTopic.id,
        recordedAudioUrl: audioRecording.recordedAudioUrl || '',
        timestamp: new Date().toISOString(),
      };
      setAttempts((prev) => {
        const newAttempts = [...prev, attempt];
        localStorage.setItem('retellLectureAttempts', JSON.stringify(newAttempts));
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
      timeRemaining: selectedTopic?.preparationTime || 40,
      isRunning: false,
      warningThreshold: 3,
      autoSubmit: false,
    });
    if (prepTimerRef.current) {
      clearTimeout(prepTimerRef.current);
    }
  };

  const handlePrevious = () => {
    if (currentTopicIndex > 0) {
      setCurrentTopicIndex(currentTopicIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentTopicIndex < questions.length - 1) {
      setCurrentTopicIndex(currentTopicIndex + 1);
    } else {
      setShowTopicSelector(true);
    }
  };

  const handleSearch = () => {
    setShowTopicSelector(true);
  };

  const handleTopicSelect = (topic: any) => {
    const newIndex = questions.findIndex(t => t.id === topic.id);
    if (newIndex !== -1) {
      setCurrentTopicIndex(newIndex);
    }
    setShowTopicSelector(false);
  };

  const handleViewAttempts = () => {
    setShowAttempts(true);
  };

  return (
    <GradientBackground>
      <StageGoalBanner />

      <PracticeCardWithInstructionsPopover
        icon="RL"
        title="Re-tell Lecture"
        subtitle={`Progress: ${completedQuestions}/${questions.length} lectures attempted`}
        instructions={`You will hear a lecture. After listening to the lecture, in ${selectedTopic?.preparationTime} seconds, please speak into the microphone and retell what you have just heard in your own words. You will have ${selectedTopic?.recordingTime} seconds to give your response.`}
        difficulty={selectedTopic?.difficulty}
        instructionsConfig={{
          sections: instructionsSections,
          size: 'medium',
          color: 'primary',
          tooltipTitle: 'View detailed instructions for Re-tell Lecture'
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
            startMessage="Preparation time will start after lecture"
          />
        )}

        <ContentDisplay
          title={`Lecture: ${selectedTopic?.title}`}
          content={
            <Box>
              <TextToSpeech
                text={selectedTopic?.audioText || ''}
                autoPlay={false}
                onStart={() => console.log('Lecture audio started')}
                onEnd={() => {
                  setPreparationTime(selectedTopic?.preparationTime || 40);
                  setTimer(prev => ({ ...prev, isRunning: true }));
                }}
                onError={(error) => {
                  setAudioError(error);
                  console.error('TextToSpeech error:', error);
                }}
              />
              <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Box sx={{ fontSize: '14px', color: 'text.secondary', mb: 1 }}>
                  Speaker: {selectedTopic?.speaker}
                </Box>
                <Box sx={{ fontSize: '14px', color: 'text.secondary' }}>
                  Duration: {selectedTopic?.duration}
                </Box>
              </Box>
            </Box>
          }
          category={selectedTopic?.category}
          difficulty={selectedTopic?.difficulty}
          tags={selectedTopic?.tags}
        />

        <RecordingSection
          isRecording={audioRecording.isRecording}
          recordedBlob={audioRecording.recordedBlob}
          recordedAudioUrl={audioRecording.recordedAudioUrl}
          micPermission={audioRecording.micPermission}
          showRecordingPrompt={showRecordingPrompt}
          preparationTime={preparationTime}
          recordingType="retelling"
          recordingTime={selectedTopic?.recordingTime || 40000}
          onToggleRecording={audioRecording.toggleRecording}
        />

        <ProgressIndicator
          current={audioRecording.recordedBlob ? 1 : 0}
          total={1}
          label="recording completed"
        />

        <ActionButtons
          recordedBlob={audioRecording.recordedBlob}
          onSubmit={handleSubmit}
          onRedo={handleRedo}
          onTranslate={() => setShowTranslate(true)}
          onShowAnswer={() => setShowAnswer(true)}
          handleViewAttempts={handleViewAttempts}
        />

        <FeedbackDisplay
          feedback={scores[selectedTopic?.id || '']}
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
        topics={questions}
        title="Select Lecture Topic"
        type="lecture"
      />

      <AnswerDialog
        open={showAnswer}
        onClose={() => setShowAnswer(false)}
        title={selectedTopic?.title || ''}
        text={selectedTopic?.audioText}
        answers={[{
          id: '1',
          position: 1,
          correctAnswer: selectedTopic?.expectedAnswer || '',
        }]}
      />

      <TranslationDialog
        open={showTranslate}
        onClose={() => setShowTranslate(false)}
        description="Translation feature will help you understand the lecture content in your preferred language."
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
                const lecture = questions.find(l => l.id === attempt.questionId);
                return (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`Lecture: ${lecture?.title || 'Unknown'}`}
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
              localStorage.removeItem('retellLectureAttempts');
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

export default ReTellLeacture;