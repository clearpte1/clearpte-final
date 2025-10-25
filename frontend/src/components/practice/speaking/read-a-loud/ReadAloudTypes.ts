import { BaseTopic } from "../../common/types";

export interface ReadAloudQuestion extends BaseTopic {
  id: number;
  text: string;
  preparationTime: number;
  recordingTime: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  tags: string[];
  expectedAnswer: string; // For sample answer dialog
}

export interface UserAttempt {
  questionId: number;
  recordedAudioUrl?: string;
  timestamp: string;
}