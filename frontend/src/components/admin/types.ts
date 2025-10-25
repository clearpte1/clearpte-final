// Question Types for Each Module

// Common Types
export interface BaseQuestion {
  id: string;
  question_id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  created_at?: string;
  updated_at?: string;
  created_by?: number;
  is_active?: boolean;
}

// Speaking Module Types
export interface ReadAloudQuestion extends BaseQuestion {
  type: 'read-aloud';
  passage: string;
  duration: number;
  instructions: string;
  audio_example_url?: string;
}

export interface RepeatSentenceQuestion extends BaseQuestion {
  type: 'repeat-sentence';
  audio_url: string;
  sentence: string;
  duration: number;
}

export interface DescribeImageQuestion extends BaseQuestion {
  type: 'describe-image';
  image_url: string;
  image_type: 'chart' | 'graph' | 'diagram' | 'photo';
  preparation_time: number;
  speaking_time: number;
  sample_answer?: string;
  key_points: string[];
}

export interface AnswerShortQuestion extends BaseQuestion {
  type: 'answer-short-question';
  audio_url: string;
  question: string;
  correct_answer: string;
  acceptable_answers: string[];
  category: string;
}

export interface RetellLectureQuestion extends BaseQuestion {
  type: 'retell-lecture';
  audio_url: string;
  transcript: string;
  duration: number;
  key_points: string[];
  subject: string;
  preparation_time: number;
  speaking_time: number;
}

// Writing Module Types
export interface SummarizeTextQuestion extends BaseQuestion {
  type: 'summarize-text';
  passage: string;
  word_limit: number;
  time_limit: number;
  sample_summary: string;
  key_ideas: string[];
}

export interface WriteEmailQuestion extends BaseQuestion {
  type: 'write-email';
  scenario: string;
  recipient: string;
  purpose: string;
  key_points: string[];
  word_limit: number;
  time_limit: number;
  tone: 'formal' | 'informal';
  sample_email?: string;
}

export interface WritingEssayQuestion extends BaseQuestion {
  type: 'writing-essay';
  prompt: string;
  essay_type: 'argumentative' | 'agree-disagree';
  word_limit: number;
  time_limit: number;
  rubric_content: string;
  rubric_form: string;
  rubric_grammar: string;
  rubric_vocabulary: string;
  sample_essay?: string;
}

// Reading Module Types
export interface ReadingFillBlanksQuestion extends BaseQuestion {
  type: 'reading-fill-blanks';
  passage: string;
  blanks: Array<{
    id: string;
    position: number;
    options: string[];
    correct_answer: string;
  }>;
  time_limit: number;
}

export interface ReadingMultipleChoiceQuestion extends BaseQuestion {
  type: 'reading-multiple-choice';
  passage: string;
  question: string;
  options: string[];
  correct_answers: string[];
  time_limit: number;
}

export interface ReorderParagraphsQuestion extends BaseQuestion {
  type: 'reorder-paragraphs';
  paragraphs: Array<{
    id: string;
    text: string;
    correct_position: number;
  }>;
  correct_order: number[];
  time_limit: number;
}

// Listening Module Types
export interface ListeningSummarizeSpokenTextQuestion extends BaseQuestion {
  type: 'listening-summarize-spoken-text';
  audio_url: string;
  transcript: string;
  duration: number;
  word_limit: number;
  time_limit: number;
  key_points: string[];
  sample_summary: string;
}

export interface ListeningMultipleChoiceQuestion extends BaseQuestion {
  type: 'listening-multiple-choice';
  audio_url: string;
  question: string;
  options: string[];
  correct_answers: string[];
  transcript?: string;
}

export interface ListeningFillBlanksQuestion extends BaseQuestion {
  type: 'listening-fill-blanks';
  audio_url: string;
  transcript: string;
  blanks: Array<{
    id: string;
    position: number;
    correct_answer: string;
    acceptable_answers?: string[];
  }>;
}

export interface HighlightCorrectSummaryQuestion extends BaseQuestion {
  type: 'highlight-correct-summary';
  audio_url: string;
  summaries: string[];
  correct_summary: string;
}

export interface SelectMissingWordQuestion extends BaseQuestion {
  type: 'select-missing-word';
  audio_url: string;
  transcript: string;
  missing_word_position: number;
  options: string[];
  correct_answer: string;
}

export interface HighlightIncorrectWordsQuestion extends BaseQuestion {
  type: 'highlight-incorrect-words';
  audio_url: string;
  transcript: string;
  incorrect_words: number[];
}

export interface WriteFromDictationQuestion extends BaseQuestion {
  type: 'write-from-dictation';
  audio_url: string;
  sentence: string;
  play_count: number;
}

// Union Types
export type SpeakingQuestion = ReadAloudQuestion | RepeatSentenceQuestion | DescribeImageQuestion | AnswerShortQuestion | RetellLectureQuestion;
export type WritingQuestion = SummarizeTextQuestion | WriteEmailQuestion | WritingEssayQuestion;
export type ReadingQuestion = ReadingFillBlanksQuestion | ReadingMultipleChoiceQuestion | ReorderParagraphsQuestion;
export type ListeningQuestion = ListeningSummarizeSpokenTextQuestion | ListeningMultipleChoiceQuestion | ListeningFillBlanksQuestion | HighlightCorrectSummaryQuestion | SelectMissingWordQuestion | HighlightIncorrectWordsQuestion | WriteFromDictationQuestion;

export type AllQuestions = SpeakingQuestion | WritingQuestion | ReadingQuestion | ListeningQuestion;

// Admin User Types
export interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: 'super_admin' | 'admin' | 'content_manager';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Upload History Types
export interface UploadHistory {
  id: number;
  admin_id: number;
  module_type: 'speaking' | 'writing' | 'reading' | 'listening';
  component_type: string;
  file_name: string;
  total_records: number;
  successful_records: number;
  failed_records: number;
  error_details?: any;
  upload_status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: string;
}

// Module Configuration
export interface ModuleConfig {
  speaking: {
    'read-aloud': { label: 'Read Aloud'; fields: string[] };
    'repeat-sentence': { label: 'Repeat Sentence'; fields: string[] };
    'describe-image': { label: 'Describe Image'; fields: string[] };
    'answer-short-question': { label: 'Answer Short Question'; fields: string[] };
    'retell-lecture': { label: 'Retell Lecture'; fields: string[] };
  };
  writing: {
    'summarize-text': { label: 'Summarize Text'; fields: string[] };
    'write-email': { label: 'Write Email'; fields: string[] };
    'writing-essay': { label: 'Writing Essay'; fields: string[] };
  };
  reading: {
    'reading-fill-blanks': { label: 'Fill in Blanks'; fields: string[] };
    'reading-multiple-choice': { label: 'Multiple Choice'; fields: string[] };
    'reorder-paragraphs': { label: 'Reorder Paragraphs'; fields: string[] };
  };
  listening: {
    'listening-summarize-spoken-text': { label: 'Summarize Spoken Text'; fields: string[] };
    'listening-multiple-choice': { label: 'Multiple Choice'; fields: string[] };
    'listening-fill-blanks': { label: 'Fill in Blanks'; fields: string[] };
    'highlight-correct-summary': { label: 'Highlight Correct Summary'; fields: string[] };
    'select-missing-word': { label: 'Select Missing Word'; fields: string[] };
    'highlight-incorrect-words': { label: 'Highlight Incorrect Words'; fields: string[] };
    'write-from-dictation': { label: 'Write From Dictation'; fields: string[] };
  };
}