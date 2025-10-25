import { AudioConfig } from "../../../common/AudioTypes";
import { BaseTopic } from "../../common/types";

export interface SummarizeSpokenTextTopic extends BaseTopic {
  type: 'listening';
  taskType: 'SST';
  audio: AudioConfig; // Enhanced audio configuration
  wordLimit: {
    min: number;
    max: number;
  };
  timeLimit: number; // in minutes
  sampleSummary?: string;
  keyPoints?: string[];
  transcript?: string; // For reference
  // Backward compatibility
  audioText?: string; // Legacy field - will be deprecated
}

export interface SummaryResponse {
  text: string;
  wordCount: number;
  timeSpent: number;
  isSubmitted: boolean;
}

export interface SummaryResult {
  questionId: string;
  userSummary: string;
  sampleSummary: string;
  score: number;
  maxScore: number;
  wordCount: number;
  timeSpent: number;
  completedAt: Date;
  keyPointsCovered: string[];
}

export interface UserAttempt {
  questionId: number;
  userSummary: string;
  wordCount: number;
  score: number;
  timestamp: string;
}
