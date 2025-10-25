import { BaseTopic } from "../../common/types";

export interface QuestionTopic extends BaseTopic {
  id: number;
  title: string;
  duration: string; // Format: MM:SS
  speaker: string;
  audioText: string;
  expectedAnswer: string;
  type: 'question';
  questionType: 'ASQ' | 'MCQ' | 'Essay';
  preparationTime: number;
  recordingTime: number;
  category: string;
  tags: string[];
  isNew: boolean;
  isMarked: boolean;
  pracStatus: 'Practice' | 'In Progress' | 'Done' | 'Undone';
  hasExplanation: boolean;
  createdAt: string;
  updatedAt: string;
}


// UserAttempt Interface
export interface UserAttempt {
  questionId: number;
  recordedBlob?: Blob;
  recordedAudioUrl?: string;
  transcription?: string;
  score?: number;
  timestamp: string;
}