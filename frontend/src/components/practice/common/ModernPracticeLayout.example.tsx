/**
 * Example Implementation: ModernPracticeLayout
 *
 * This example shows how to use the ModernPracticeLayout component
 * to create an Answer Short Questions practice interface that matches
 * the screenshot design.
 */

import React, { useState, useEffect } from 'react';
import ModernPracticeLayout from './ModernPracticeLayout';

const ModernPracticeExample: React.FC = () => {
  // State
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(10);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [volume, setVolume] = useState(70);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [recordingCount, setRecordingCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState(1);
  const totalQuestions = 3;

  // Format time helper
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Audio playback simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAudioPlaying && audioCurrentTime < audioDuration) {
      interval = setInterval(() => {
        setAudioCurrentTime((prev) => {
          if (prev >= audioDuration) {
            setIsAudioPlaying(false);
            return audioDuration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAudioPlaying, audioCurrentTime, audioDuration]);

  // Handlers
  const handleAudioPlayPause = () => {
    if (audioCurrentTime >= audioDuration) {
      setAudioCurrentTime(0);
    }
    setIsAudioPlaying(!isAudioPlaying);
  };

  const handleAudioSeek = (value: number) => {
    setAudioCurrentTime(value);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
  };

  const handleVolumeChange = (vol: number) => {
    setVolume(vol);
  };

  const handleStartRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simulate recording for 3 seconds
      setTimeout(() => {
        setIsRecording(false);
        setHasRecorded(true);
        setRecordingCount(1);
      }, 3000);
    } else {
      setIsRecording(false);
    }
  };

  const handleSubmit = () => {
    if (hasRecorded) {
      alert('Answer submitted!');
      setCompletedQuestions((prev) => prev + 1);
      handleNext();
    }
  };

  const handleShowAnswer = () => {
    alert('Answer: Paris');
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      resetRecording();
    }
  };

  const handleRedo = () => {
    resetRecording();
    setAudioCurrentTime(0);
    setIsAudioPlaying(false);
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1);
      resetRecording();
    }
  };

  const resetRecording = () => {
    setIsRecording(false);
    setHasRecorded(false);
    setRecordingCount(0);
  };

  return (
    <ModernPracticeLayout
      // Header
      icon="ASQ"
      title="Speaking: Answer Short Question"
      progress={`${completedQuestions}/${totalQuestions} questions attempted`}
      instructions="You will hear a question. Please give a simple and short answer. Often just one or a few words is enough."
      time="9:59"
      timeRunning={true}
      difficulty="Hard"
      questionInfo={`Question ${currentQuestion + 1} of 82.`}

      // Audio section
      audioTime={formatTime(audioCurrentTime)}
      audioTotal={formatTime(audioDuration)}
      audioCurrentTime={audioCurrentTime}
      audioDuration={audioDuration}
      isAudioPlaying={isAudioPlaying}
      playbackSpeed={playbackSpeed}
      volume={volume}
      onAudioPlayPause={handleAudioPlayPause}
      onAudioSeek={handleAudioSeek}
      onSpeedChange={handleSpeedChange}
      onVolumeChange={handleVolumeChange}
      audioVoiceInfo="Microsoft David · English (en-US) · SX3"

      // Recording section
      recordingButtonText={isRecording ? 'Stop Recording' : 'Start Recording'}
      recordingStatus={`${recordingCount} of 1 recording completed`}
      isRecording={isRecording}
      onStartRecording={handleStartRecording}
      onSubmit={handleSubmit}
      onShowAnswer={handleShowAnswer}
      submitDisabled={!hasRecorded}

      // Navigation
      onPrevious={handlePrevious}
      onRedo={handleRedo}
      onNext={handleNext}
      previousDisabled={currentQuestion === 0}
      nextDisabled={currentQuestion === totalQuestions - 1}
    />
  );
};

export default ModernPracticeExample;
