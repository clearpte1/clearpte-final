/**
 * ModernPracticeLayout - AI Evaluation Example
 *
 * This example demonstrates how to use the AI Evaluation feature
 * in the ModernPracticeLayout component.
 */

import React, { useState } from 'react';
import ModernPracticeLayout from './ModernPracticeLayout';

const ModernPracticeLayoutAIExample: React.FC = () => {
  // Audio state
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

  // Recording state
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);

  // Results state
  const [showResults, setShowResults] = useState(false);

  // AI Evaluation state
  const [aiAudioPlaying, setAIAudioPlaying] = useState(false);
  const [aiSpeed, setAISpeed] = useState(1.0);

  // Simulate answer evaluation with AI
  const handleSubmit = async () => {
    if (!hasRecorded) return;

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));

    // Show AI evaluation results
    setShowResults(true);
  };

  // Handle recording
  const handleStartRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simulate recording for 3 seconds
      setTimeout(() => {
        setIsRecording(false);
        setHasRecorded(true);
      }, 3000);
    } else {
      setIsRecording(false);
      setHasRecorded(true);
    }
  };

  // Reset for new attempt
  const handleTryAgain = () => {
    setShowResults(false);
    setHasRecorded(false);
    setIsRecording(false);
  };

  return (
    <ModernPracticeLayout
      // Header props
      icon="ASQ"
      title="Speaking: Answer Short Question"
      progress="1/3 questions attempted"
      instructions="You will hear a question. Please give a simple and short answer. Often just one or a few words is enough."
      time="9:59"
      timeRunning={true}
      difficulty="Hard"
      questionInfo="Question 1 of 82."

      // Audio props
      audioTime="00:00"
      audioTotal="0:10"
      audioCurrentTime={audioCurrentTime}
      audioDuration={10}
      isAudioPlaying={isAudioPlaying}
      playbackSpeed={playbackSpeed}
      volume={70}
      onAudioPlayPause={() => setIsAudioPlaying(!isAudioPlaying)}
      onAudioSeek={(value) => setAudioCurrentTime(value)}
      onSpeedChange={(speed) => setPlaybackSpeed(speed)}
      onVolumeChange={(vol) => console.log('Volume:', vol)}
      audioVoiceInfo="Microsoft David · English (en-US)"

      // Recording props
      recordingButtonText={isRecording ? 'Stop Recording' : 'Start Recording'}
      recordingStatus={
        hasRecorded
          ? '1 of 1 recording completed'
          : '0 of 1 recording completed'
      }
      isRecording={isRecording}
      onStartRecording={handleStartRecording}
      onSubmit={handleSubmit}
      onShowAnswer={() => console.log('Show Answer')}
      submitDisabled={!hasRecorded || showResults}

      // Enable AI Evaluation Results
      showResults={showResults}
      useAIEvaluation={true}

      // AI Evaluation scores
      aiOverallScore={90}
      aiPronunciationScore={90}
      aiFluencyScore={88}
      aiContentScore={92}

      // AI Evaluation feedback
      aiFeedbackItems={[
        'Your response was well-articulated with clear pronunciation and good pacing.',
        'You demonstrated strong understanding of the question and provided a comprehensive answer.',
      ]}
      aiImprovementAreas={[
        "You missed mentioning 'environmental' in your transcription which was part of the original content.",
      ]}

      // AI Audio playback
      aiAudioWaveform={[
        0.3, 0.6, 0.4, 0.7, 0.5, 0.8, 0.6, 0.4, 0.5, 0.7, 0.6, 0.4, 0.3, 0.5,
        0.7, 0.6, 0.4, 0.8, 0.5, 0.3, 0.6, 0.7, 0.4, 0.5, 0.6, 0.8, 0.5, 0.4,
        0.7, 0.5, 0.3, 0.6, 0.4, 0.7, 0.5, 0.8, 0.6, 0.4,
      ]}
      aiAudioPlaying={aiAudioPlaying}
      aiPlaybackSpeed={aiSpeed}
      onAIPlayAudio={() => {
        setAIAudioPlaying(!aiAudioPlaying);
        if (!aiAudioPlaying) {
          // Simulate audio duration
          setTimeout(() => {
            setAIAudioPlaying(false);
          }, 5000);
        }
      }}
      onAISpeedChange={(speed) => setAISpeed(speed)}

      // Navigation props
      onPrevious={() => console.log('Previous')}
      onRedo={handleTryAgain}
      onNext={() => console.log('Next')}
      previousDisabled={false}
      nextDisabled={false}
    />
  );
};

export default ModernPracticeLayoutAIExample;
