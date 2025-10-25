import { BaseTopic } from "../../common/types";

// Audio configuration interface following the established pattern
export interface AudioConfig {
  audioUrl?: string;
  audioText: string;
  audioFormat?: 'mp3' | 'wav' | 'ogg';
  audioDuration?: number;
  audioTitle?: string;
}

// Select Missing Word specific interfaces
export interface MissingWordOption {
  id: string;
  label: 'A' | 'B' | 'C' | 'D';
  text: string;
  isCorrect: boolean;
}

export interface SelectMissingWordQuestion extends BaseTopic {
  id: number;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeLimit: number; // in seconds
  audio: AudioConfig; // Changed from audioText to audio object
  missingWordPosition: string; // The word/phrase that will be beeped
  instructions: string;
  category: string;
  tags: string[];
  maxScore: number;
  options: MissingWordOption[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation?: string;
  // Legacy support - will be removed once migration is complete
  audioText?: string;
}

export interface SelectMissingWordResult {
  questionId: string;
  selectedOption: 'A' | 'B' | 'C' | 'D' | null;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  isCorrect: boolean;
  score: number;
  maxScore: number;
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
  selectedOption: 'A' | 'B' | 'C' | 'D' | null;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  score: number;
  timestamp: string;
}