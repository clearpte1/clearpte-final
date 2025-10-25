import { BaseTopic } from "../../common/types";

export interface LectureTopic extends BaseTopic {
  id: number;
  title: string;
  duration: string; // Format: MM:SS
  speaker: string;
  audioText: string; // Transcript for TextToSpeech
  expectedAnswer: string; // Sample answer for dialog
  type: "lecture";
  preparationTime: number;
  recordingTime: number;
  category: string;
  tags: string[];
  isNew: boolean;
  isMarked: boolean;
  pracStatus: "Undone" | "In Progress" | "Done";
  hasExplanation: boolean;
  createdAt: string;
  updatedAt: string;
  questionType: "ASQ";
}

export interface UserAttempt {
  questionId: number;
  recordedAudioUrl?: string;
  timestamp: string;
}
