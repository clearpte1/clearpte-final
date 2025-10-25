// Shared types for the application

import { BaseTopic } from "../../common/types";

export interface MultipleChoiceQuestion extends BaseTopic {
  type: 'question';
  questionType: 'MCQ';
  questionText: string;
  options: string[];
  correctAnswer: number; // Index of correct answer (0-3)
  explanation: string;
  timeLimit: number; // in seconds
}

export interface QuestionProgress {
  questionId: number;
  selectedAnswer: number | null;
  isCorrect: boolean | null;
  timeSpent: number;
  attempts: number;
}

export 
interface TimerState {
  timeRemaining: number;
  isRunning: boolean;
  warningThreshold: number;
  autoSubmit: boolean;
}

export interface QuestionResult {
  questionId: string;
  score: number;
  maxScore: number;
  correctAnswers: number;
  totalQuestions: number;
  completedAt: Date;
  timeSpent: number;
  answers: any[];
  percentage: number;
}


export interface PerformanceData {
  totalQuestions: number;
  correctAnswers: number;
  totalTimeSpent: number;
  averageTimePerQuestion: number;
  categoryPerformance: Record<string, {
    total: number;
    correct: number;
    percentage: number;
  }>;
  difficultyPerformance: Record<string, {
    total: number;
    correct: number;
    percentage: number;
  }>;
}