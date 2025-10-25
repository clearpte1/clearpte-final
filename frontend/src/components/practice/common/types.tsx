// Shared types for both components
export interface User {
  id: string;
  name: string;
  email: string;
}
export interface BaseTopic {
  id: number;
  title: string;
  duration?: string;
  speaker?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  link?: string;
  type?: 'question' | 'lecture' | 'reading' | 'listening' | 'writing';
  preparationTime?: number;
  recordingTime?: number;
  category: string;
  tags: string[];
  isNew: boolean;
  isMarked: boolean;
  pracStatus: 'Undone' | 'Done' | 'In Progress' |'Practice';
  hasExplanation: boolean;
  createdAt: string;
  updatedAt: string;
  questionType?: 'ASQ' | 'MCQ' | 'Essay'; // Only for question topics
}
//   }

export interface AudioTopic extends BaseTopic {
  type: 'lecture';
  preparationTime: number; // in seconds
  recordingTime: number; // in seconds
}

export interface SummarizeTextTopic extends BaseTopic {

  timeLimit: number;
  sampleAnswer: string;
  passage: string;
  wordLimit: Record<string, number>;
}

export interface PracticeTestsProps {
  user: User | null;
}

export interface FilterOptions {
  new: string;
  mark: string;
  pracStatus: string;
  difficulty: string;
  explanation: string;
  category?: string;
}

export interface TopicSelectionDrawerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (topic: any) => void;
  topics: BaseTopic[];
  title: string;
  type?: 'lecture' | 'question';
}

export interface TextToSpeechState {
  isPlaying: boolean;
  isPaused: boolean;
  currentTime: number;
  duration: number;
  progress: number;
  error: string | null;
  voices: SpeechSynthesisVoice[];
}


// TextToSpeech specific types
export interface TextToSpeechProps {
  text: string;
  autoPlay?: boolean;
  selectedVoice?: SpeechSynthesisVoice | null;
  rate?: number; // 0.1 to 10
  pitch?: number; // 0 to 2  
  volume?: number; // 0 to 1
  onStart?: () => void;
  onEnd?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onError?: (error: string) => void;
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




// TextToSpeech component types and interfaces
export enum TextToSpeechStateEnum {
  IDLE = 'idle',
  PLAYING = 'playing',
  PAUSED = 'paused',
  STOPPED = 'stopped',
  ERROR = 'error'
}

// Speed options for dropdown
export interface SpeedOption {
  value: number;
  label: string;
}

export const SPEED_OPTIONS: SpeedOption[] = [
  { value: 0.5, label: '0.5x' },
  { value: 0.75, label: '0.75x' },
  { value: 1.0, label: '1.0x' },
  { value: 1.25, label: '1.25x' },
  { value: 1.5, label: '1.5x' },
  { value: 1.75, label: '1.75x' },
  { value: 2.0, label: '2.0x' }
];

export const DEFAULT_SETTINGS = {
  rate: 1.0,
  pitch: 1.0,
  volume: 1.0,
  autoPlay: false
};

export const TIMER_UPDATE_INTERVAL = 100; // milliseconds
export const DEFAULT_WORDS_PER_MINUTE = 180;