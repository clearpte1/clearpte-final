import { User } from "../../../../types";
import { BaseTopic } from "../../common/types";



export interface TopicSelectionDrawerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (topic: any) => void;
  topics: BaseTopic[];
  title: string;
  type?: 'lecture' | 'question';
}


// Highlight Correct Summary types
export interface SummaryOption {
  id: string;
  label: 'A' | 'B' | 'C' | 'D';
  text: string;
  isCorrect: boolean;
}

export interface HighlightSummaryQuestion extends BaseTopic {
  id: number;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeLimit: number;
  audioText: string; // Text to be converted to speech
  instructions: string;
  summaryOptions: SummaryOption[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  maxScore: number;
  explanation?: string;
}

export interface SummaryResult {
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

export interface AudioTopic extends BaseTopic {
  type: 'lecture';
  preparationTime: number;
  recordingTime: number;
}

export interface SummarizeTextTopic extends BaseTopic {
  timeLimit: number;
  sampleAnswer: string;
  passage: string;
  wordLimit: Record<string, number>;
}

export interface QuestionTopic extends BaseTopic {
  type: 'question';
  questionType: 'ASQ' | 'MCQ' | 'Essay';
  preparationTime: number;
  recordingTime: number;
}

export interface PracticeTestsProps {
  user: User | null;
}
