import { BaseTopic } from "../../common/types";

// Audio configuration interface following the established pattern
export interface AudioConfig {
  audioUrl?: string;
  audioText: string;
  audioFormat?: 'mp3' | 'wav' | 'ogg';
  audioDuration?: number;
  audioTitle?: string;
}

// Highlight Incorrect Words specific interfaces
export interface IncorrectWord {
  id: string;
  word: string;
  correctWord: string;
  position: number; // Position in the text
  isClicked?: boolean;
  isCorrect?: boolean; // Set after submission
}

export interface HighlightIncorrectWordsQuestion extends BaseTopic {
  id: number;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeLimit: number; // in seconds
  audio: AudioConfig; // Changed from audioText to audio object
  displayText: string; // The transcription shown to user (with incorrect words)
  incorrectWords: IncorrectWord[]; // Words that are different from audio
  instructions: string;
  category: string;
  tags: string[];
  maxScore: number;
  explanation?: string;
  // Legacy support - will be removed once migration is complete
  audioText?: string;
}

export interface HighlightIncorrectWordsResult {
  questionId: string;
  clickedWords: string[]; // IDs of words clicked by user
  correctWords: string[]; // IDs of words that should have been clicked
  correctClicks: number;
  incorrectClicks: number;
  missedWords: number;
  score: number;
  maxScore: number;
  accuracy: number; // Percentage
  completedAt: Date;
  timeSpent: number;
}

export interface StudentProgress {
  studentName: string;
  questionNumber: number;
  testedCount: number;
  totalQuestions: number;
  currentStreak: number;
  averageScore: number;
}

export interface TimerState {
  timeRemaining: number;
  isRunning: boolean;
  warningThreshold: number;
  autoSubmit: boolean;
}

export interface UserAttempt {
  questionId: number;
  clickedWords: string[];
  correctWords: string[];
  score: number;
  timestamp: string;
}