
// Admin interface types
export interface AudioUploadData {
  audioUrl?: string;
  audioText: string;
  audioFormat?: string;
  audioTitle?: string;
}

export interface ExcelImportRow {
  id?: number;
  title: string;
  audioUrl?: string;
  audioText: string;
  audioFormat?: string;
  audioDuration?: number;
  wordLimitMin: number;
  wordLimitMax: number;
  timeLimit: number;
  sampleSummary?: string;
  keyPoints?: string;
  transcript?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  tags?: string;
}

// Validation helper types
export interface AudioValidationResult {
  isValid: boolean;
  hasAudio: boolean;
  hasText: boolean;
  errors: string[];
}


export interface AudioConfig {
  audioUrl?: string; // High priority - actual audio file URL
  audioText: string; // Fallback - text for TextToSpeech
  audioFormat?: 'mp3' | 'wav' | 'ogg' | 'mp4' | 'm4a'; // Audio format
  audioDuration?: number; // Duration in seconds (optional)
  audioTitle?: string; // Audio title for display
}
