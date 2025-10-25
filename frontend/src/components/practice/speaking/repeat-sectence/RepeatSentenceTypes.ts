import { BaseTopic } from "../../common/types";
export const RECORDING_DURATION_MS = 15000;
export const AUDIO_DURATION_MS = 5000;


export interface RepeatSentenceQuestion extends BaseTopic {
  id: number;
  sentence: string;
  audio: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  tags: string[];
  expectedAnswer: string;
  isNew: boolean;
  isMarked: boolean;
  pracStatus: 'Done' | 'Undone' | 'In Progress';
  hasExplanation: boolean;
}

export interface RepeatSentenceFeedback {
  overallScore: number;
  pronunciation: number;
  fluency: number;
  content: number;
  wordsRepeated: number;
  totalWords: number;
  feedback: string[];
  improvements: string[];
}

