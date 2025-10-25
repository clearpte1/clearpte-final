import { AudioConfig, AudioValidationResult, AudioUploadData } from './AudioTypes';

/**
 * Validates audio configuration for dual audio support
 */
export const validateAudioConfig = (audio: AudioConfig): AudioValidationResult => {
  const errors: string[] = [];
  let hasAudio = false;
  let hasText = false;

  // Check if audioUrl is provided and valid
  if (audio.audioUrl) {
    if (typeof audio.audioUrl === 'string' && audio.audioUrl.trim().length > 0) {
      // Basic URL validation
      try {
        new URL(audio.audioUrl);
        hasAudio = true;
      } catch {
        errors.push('Invalid audio URL format');
      }
    } else {
      errors.push('Audio URL must be a valid string');
    }
  }

  // Check if audioText is provided (mandatory fallback)
  if (audio.audioText) {
    if (typeof audio.audioText === 'string' && audio.audioText.trim().length > 0) {
      hasText = true;
    } else {
      errors.push('Audio text must be a non-empty string');
    }
  } else {
    errors.push('Audio text is required as fallback for text-to-speech');
  }

  // Validate audio format if provided
  if (audio.audioFormat) {
    const validFormats = ['mp3', 'wav', 'ogg', 'mp4', 'm4a'];
    if (!validFormats.includes(audio.audioFormat.toLowerCase())) {
      errors.push(`Invalid audio format. Supported formats: ${validFormats.join(', ')}`);
    }
  }

  // At least one audio source must be available
  if (!hasAudio && !hasText) {
    errors.push('Either audio URL or audio text must be provided');
  }

  return {
    isValid: errors.length === 0,
    hasAudio,
    hasText,
    errors
  };
};

/**
 * Validates audio upload data from admin interface
 */
export const validateAudioUpload = (data: AudioUploadData): AudioValidationResult => {
  const errors: string[] = [];
  let hasAudio = false;
  let hasText = false;

  // Check audio URL
  if (data.audioUrl && data.audioUrl.trim().length > 0) {
    try {
      new URL(data.audioUrl);
      hasAudio = true;
    } catch {
      errors.push('Invalid audio URL format');
    }
  }

  // Check audio text (mandatory)
  if (data.audioText && data.audioText.trim().length > 0) {
    hasText = true;
  } else {
    errors.push('Audio text is required');
  }

  // If no audio URL, text is mandatory
  if (!hasAudio && !hasText) {
    errors.push('Either audio URL or audio text must be provided');
  }

  return {
    isValid: errors.length === 0,
    hasAudio,
    hasText,
    errors
  };
};

/**
 * Converts legacy audioText field to new AudioConfig format
 */
export const migrateLegacyAudio = (audioText: string, audioUrl?: string): AudioConfig => {
  return {
    audioUrl: audioUrl,
    audioText: audioText,
    audioFormat: audioUrl ? detectAudioFormat(audioUrl) : undefined,
    audioTitle: 'Listening Audio'
  };
};

/**
 * Detects audio format from URL
 */
export const detectAudioFormat = (
  url: string
): 'mp3' | 'wav' | 'ogg' | 'mp4' | 'm4a' | undefined => {
  const extension = url.split('.').pop()?.toLowerCase();
  const validFormats = ['mp3', 'wav', 'ogg', 'mp4', 'm4a'] as const;
  return validFormats.includes(extension as any)
    ? (extension as typeof validFormats[number])
    : undefined;
};

/**
 * Creates a sample audio config for testing
 */
export const createSampleAudioConfig = (text: string, includeUrl: boolean = true): AudioConfig => {
  const sampleUrls = [
    'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
    'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
    'https://filesamples.com/samples/audio/mp3/SampleAudio_0.4mb_mp3.mp3',
    'https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg'
  ];

  return {
    audioUrl: includeUrl ? sampleUrls[Math.floor(Math.random() * sampleUrls.length)] : undefined,
    audioText: text,
    audioFormat: includeUrl ? 'mp3' : undefined,
    audioTitle: 'Sample Audio for Testing'
  };
};

/**
 * Formats audio duration for display
 */
export const formatAudioDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Gets audio source priority label
 */
export const getAudioSourceLabel = (audio: AudioConfig): string => {
  if (audio.audioUrl) {
    return `Audio File${audio.audioFormat ? ` (${audio.audioFormat.toUpperCase()})` : ''}`;
  }
  return 'Text-to-Speech';
};

/**
 * Checks if audio config uses actual audio file
 */
export const hasActualAudio = (audio: AudioConfig): boolean => {
  return Boolean(audio.audioUrl && audio.audioUrl.trim().length > 0);
};

/**
 * Gets the effective audio text for display
 */
export const getEffectiveAudioText = (audio: AudioConfig): string => {
  return audio.audioText || '';
};