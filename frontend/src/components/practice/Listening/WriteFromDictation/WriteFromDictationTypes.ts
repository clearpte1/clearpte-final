import { BaseTopic } from "../../common/types";
import { AudioConfig } from "../../../common/AudioTypes";

// Write From Dictation specific interfaces
export interface WriteFromDictationQuestion extends BaseTopic {
  id: number;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeLimit: number; // in seconds
  audio: AudioConfig; // Audio configuration object
  audioText: string; // Backward compatibility - will be deprecated
  instructions: string;
  category: string;
  tags: string[];
  maxScore: number;
  keyWords: string[]; // Important words that carry more weight in scoring
  acceptableVariations?: { [key: string]: string[] }; // Alternative spellings/forms
  explanation?: string;
  speaker?: string; // Speaker information
}

export interface WriteFromDictationResult {
  questionId: string;
  userInput: string;
  correctText: string;
  score: number;
  maxScore: number;
  accuracy: number; // Percentage
  wordsCorrect: number;
  totalWords: number;
  keyWordsCorrect: number;
  totalKeyWords: number;
  completedAt: Date;
  timeSpent: number;
  detailedAnalysis: WordAnalysis[];
}

export interface WordAnalysis {
  expectedWord: string;
  userWord: string;
  isCorrect: boolean;
  isKeyWord: boolean;
  position: number;
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