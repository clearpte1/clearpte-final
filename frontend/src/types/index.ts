// export interface User {
//   id: string;
//   name: string;
//   email: string;
//   avatar?: string;
//   joinDate: string;
//   totalTests: number;
//   averageScore: number;
// }

export interface PracticeTest {
  id: string;
  title: string;
  type: 'speaking' | 'writing' | 'reading' | 'listening';
  duration: number;
  questions: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  completedBy?: number;
  averageScore?: number;
}

export interface TestResult {
  id: string;
  testId: string;
  userId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  completedAt: string;
  timeSpent: number;
}

export interface StudyMaterial {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'article' | 'audio';
  category: 'speaking' | 'writing' | 'reading' | 'listening' | 'general';
  duration?: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  url: string;
  description: string;
  thumbnail?: string;
}

export interface ProgressData {
  speaking: number;
  writing: number;
  reading: number;
  listening: number;
  overall: number;
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'essay' | 'speaking' | 'listening';
  question: string;
  options?: string[];
  correctAnswer?: string;
  points: number;
}

export interface AIFeedback {
  score: number;
  strengths: string[];
  improvements: string[];
  suggestions: string[];
}









// ===============================================

// Common types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  avatar?: string;
  createdAt?: string;
  progress?: UserProgress;
}

export interface UserProgress {
  speaking: number;
  writing: number;
  reading: number;
  listening: number;
  lastTestDate?: string;
  totalTests: number;
  completedTests: number;
  averageScore: number;
  strongAreas: string[];
  weakAreas: string[];
  createdAt: string;
}

// Question types
export interface BaseQuestion {
  id: string;
  type: QuestionType;
  skill: PteSkill;
  title: string;
  instructions: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  createdAt: string;
  updatedAt: string;
  question_id?: string; // Unique identifier for the question
}

export type QuestionType =
  // Speaking
  | 'read-aloud' | 'repeat-sentence' | 'describe-image' | 'answer-short-question'
  | 'respond-situation' | 'retell-lecture'
  // Writing  
  | 'summarize-written-text' | 'write-email' | 'write-essay'
  // Reading
  | 'reading-fill-blanks' | 'reading-writing-fill-blanks' | 'multiple-choice-single'
  | 'multiple-choice-multiple' | 'reorder-paragraphs'
  // Listening
  | 'summarize-spoken-text' | 'listening-fill-blanks' | 'listening-multiple-choice-single'
  | 'listening-multiple-choice-multiple' | 'select-missing-word'
  | 'highlight-incorrect-words' | 'write-from-dictation' | 'highlight-correct-summary';

export type PteSkill = 'speaking' | 'writing' | 'reading' | 'listening';

// Specific question interfaces
export interface ReadAloudQuestion extends BaseQuestion {
  text: string;
  audioUrl?: string;
  prepTime: number; // seconds
  recordTime: number; // seconds
}

export interface RepeatSentenceQuestion extends BaseQuestion {
  audioUrl: string;
  sentence: string;
  recordTime: number;
}

export interface DescribeImageQuestion extends BaseQuestion {
  imageUrl: string;
  keywords: string[];
  prepTime: number;
  recordTime: number;
}

export interface WritingEssayQuestion extends BaseQuestion {
  prompt: string;
  wordLimit: number;
  timeLimit: number; // minutes
  sampleResponse?: string;
}

export interface ReadingFillBlanksQuestion extends BaseQuestion {
  time_limit: number;
  passage: string;
  blanks: FillBlank[];
}

export interface FillBlank {
  id: string;
  position: number;
  options: string[];
  correctAnswer: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  passage: string;
  question: string;
  options: string[];
  correctAnswers: string[]; // for multiple answers
  isMultiple: boolean;
}

export interface ReorderParagraphsQuestion extends BaseQuestion {
  paragraphs: string[];
  correctOrder: number[];
}

// Test and Progress types
export interface TestResult {
  id: string;
  userId: string;
  questionId: string;
  type: QuestionType;
  userAnswer: any;
  score: number;
  maxScore: number;
  timeSpent: number; // seconds
  completedAt: string;
  feedback?: string;
}

export interface MockTest {
  id: string;
  title: string;
  description: string;
  duration: number; // minutes
  questions: BaseQuestion[];
  skill?: PteSkill;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// UI Component types
export interface SelectOption {
  value: string;
  label: string;
}

export interface FilterOptions {
  skill?: PteSkill;
  difficulty?: string;
  type?: QuestionType;
  search?: string;
}


export interface StudyMaterial {
  id: string;
  title: string;
}

export interface PracticeTest {
  id: string;
  title: string;
  // description: string;
  // duration: number; // in minutes
  // type: PteSkill;
  // difficulty: 'beginner' | 'intermediate' | 'advanced';
  // questions: BaseQuestion[];
  // completedBy?: Date; // date when the test was completed
}

