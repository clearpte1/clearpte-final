import { BaseTopic } from "../../common/types";

export interface MultipleChoiceOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

// Audio configuration interface following the established pattern
export interface AudioConfig {
  audioUrl?: string;
  audioText: string;
  audioFormat?: 'mp3' | 'wav' | 'ogg';
  audioDuration?: number;
  audioTitle?: string;
}

export interface MultipleChoiceQuestion extends BaseTopic {
  id: number;
  audio: AudioConfig; // Changed from audioText to audio object
  question: string;
  options: MultipleChoiceOption[];
  explanation?: string;
  // Legacy support - will be removed once migration is complete
  audioText?: string;
}

export interface QuestionResult {
  questionId: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  score: number;
  maxScore: number;
  completedAt: Date;
  timeSpent: number;
}

export interface UserAttempt {
  questionId: number;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  score: number;
  timestamp: string;
}