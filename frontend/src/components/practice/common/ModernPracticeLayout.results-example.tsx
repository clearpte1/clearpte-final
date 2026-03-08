/**
 * ModernPracticeLayout - Results Display Example
 *
 * This example demonstrates how to use the results display feature
 * that appears after a user submits their answer.
 */

import React, { useState } from 'react';
import ModernPracticeLayout from './ModernPracticeLayout';

const ModernPracticeLayoutResultsExample: React.FC = () => {
  // Audio state
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

  // Recording state
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);

  // Results state
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  // Simulate answer evaluation
  const handleSubmit = async () => {
    if (!hasRecorded) return;

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simulate scoring (random for demo purposes)
    const randomScore = Math.floor(Math.random() * 11); // 0-10
    setScore(randomScore);

    // Generate feedback based on score
    let feedbackMessage = '';
    if (randomScore >= 9) {
      feedbackMessage = 'Excellent work! Your pronunciation and fluency are outstanding.';
    } else if (randomScore >= 7) {
      feedbackMessage = 'Great job! Your answer was clear and well-structured.';
    } else if (randomScore >= 5) {
      feedbackMessage = 'Good effort! Focus on improving pronunciation and clarity.';
    } else {
      feedbackMessage = 'Keep practicing! Pay attention to pronunciation and try to speak more clearly.';
    }
    setFeedback(feedbackMessage);

    // Show results
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
    setScore(0);
    setFeedback('');
  };

  // Determine result status based on score
  const getResultStatus = (): 'excellent' | 'good' | 'needsImprovement' => {
    const percentage = (score / 10) * 100;
    if (percentage >= 80) return 'excellent';
    if (percentage >= 60) return 'good';
    return 'needsImprovement';
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

      // Results props (shown after submit)
      showResults={showResults}
      resultScore={score}
      resultTotal={10}
      resultFeedback={feedback}
      resultStatus={getResultStatus()}
      onTryAgain={handleTryAgain}

      // Navigation props
      onPrevious={() => console.log('Previous')}
      onRedo={() => console.log('Redo')}
      onNext={() => console.log('Next')}
      previousDisabled={false}
      nextDisabled={false}
    />
  );
};

export default ModernPracticeLayoutResultsExample;
