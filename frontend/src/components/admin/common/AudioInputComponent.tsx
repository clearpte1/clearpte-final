import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Alert,
  Chip,
  IconButton,
  Tooltip,
  InputAdornment
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Stop as StopIcon,
  VolumeUp as VolumeIcon,
  Link as LinkIcon,
  TextFields as TextIcon
} from '@mui/icons-material';

export interface AudioData {
  audioUrl?: string;
  audioText?: string;
  audioFormat?: string;
  audioDuration?: number;
  audioTitle?: string;
}

interface AudioInputComponentProps {
  value: AudioData;
  onChange: (audioData: AudioData) => void;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
}

const AudioInputComponent: React.FC<AudioInputComponentProps> = ({
  value,
  onChange,
  label = "Audio Configuration",
  required = false,
  disabled = false,
  error,
  helperText
}) => {
  const [audioMode, setAudioMode] = useState<'url' | 'text' | 'both'>('text');
  const [isPlaying, setIsPlaying] = useState(false);
  const [textToSpeechAudio, setTextToSpeechAudio] = useState<HTMLAudioElement | null>(null);

  // Initialize audio mode based on existing data
  useEffect(() => {
    if (value.audioUrl && value.audioText) {
      setAudioMode('both');
    } else if (value.audioUrl) {
      setAudioMode('url');
    } else if (value.audioText) {
      setAudioMode('text');
    } else {
      setAudioMode('text'); // Default to text mode
    }
  }, [value.audioUrl, value.audioText]);

  const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMode = event.target.value as 'url' | 'text' | 'both';
    setAudioMode(newMode);
    
    // Clear data based on mode selection
    let newData: AudioData = { ...value };
    if (newMode === 'url') {
      newData.audioText = undefined;
    } else if (newMode === 'text') {
      newData.audioUrl = undefined;
      newData.audioFormat = undefined;
      newData.audioDuration = undefined;
    }
    // For 'both' mode, keep existing data
    
    onChange(newData);
  };

  const handleAudioUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    const format = getAudioFormat(url);
    onChange({
      ...value,
      audioUrl: url,
      audioFormat: format,
      audioTitle: value.audioTitle || `Audio File - ${format?.toUpperCase()}`
    });
  };

  const handleAudioTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    onChange({
      ...value,
      audioText: text,
      audioTitle: value.audioTitle || 'Text-to-Speech Audio'
    });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...value,
      audioTitle: event.target.value
    });
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const duration = parseInt(event.target.value) || undefined;
    onChange({
      ...value,
      audioDuration: duration
    });
  };

  const getAudioFormat = (url: string): string | undefined => {
    if (!url) return undefined;
    const extension = url.split('.').pop()?.toLowerCase();
    if (['mp3', 'wav', 'ogg', 'm4a', 'aac'].includes(extension || '')) {
      return extension;
    }
    return 'mp3'; // Default format
  };

  const validateAudioUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const playTextToSpeech = () => {
    if (!value.audioText) return;
    
    if (isPlaying && textToSpeechAudio) {
      textToSpeechAudio.pause();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(value.audioText);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    
    speechSynthesis.speak(utterance);
  };

  const playAudioUrl = () => {
    if (!value.audioUrl || !validateAudioUrl(value.audioUrl)) return;
    
    if (isPlaying && textToSpeechAudio) {
      textToSpeechAudio.pause();
      setIsPlaying(false);
      return;
    }

    const audio = new Audio(value.audioUrl);
    audio.onplay = () => setIsPlaying(true);
    audio.onended = () => setIsPlaying(false);
    audio.onerror = () => setIsPlaying(false);
    
    setTextToSpeechAudio(audio);
    audio.play().catch(() => setIsPlaying(false));
  };

  const hasValidInput = () => {
    return (value.audioUrl && validateAudioUrl(value.audioUrl)) || 
           (value.audioText && value.audioText.trim().length > 0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <FormControl component="fieldset" sx={{ width: '100%', mb: 2 }}>
        <FormLabel component="legend" sx={{ mb: 1, fontWeight: 'medium' }}>
          {label} {required && <span style={{ color: 'red' }}>*</span>}
        </FormLabel>
        
        <RadioGroup
          row
          value={audioMode}
          onChange={handleModeChange}
          sx={{ mb: 2 }}
        >
          <FormControlLabel
            value="text"
            control={<Radio />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <TextIcon fontSize="small" />
                Text-to-Speech
              </Box>
            }
            disabled={disabled}
          />
          <FormControlLabel
            value="url"
            control={<Radio />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <LinkIcon fontSize="small" />
                Audio URL
              </Box>
            }
            disabled={disabled}
          />
          <FormControlLabel
            value="both"
            control={<Radio />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <VolumeIcon fontSize="small" />
                Both (Fallback)
              </Box>
            }
            disabled={disabled}
          />
        </RadioGroup>

        {/* Audio URL Input */}
        {(audioMode === 'url' || audioMode === 'both') && (
          <TextField
            fullWidth
            label="Audio URL"
            value={value.audioUrl || ''}
            onChange={handleAudioUrlChange}
            placeholder="https://example.com/audio.mp3"
            disabled={disabled}
            error={!!error && audioMode === 'url' && !value.audioUrl}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: value.audioUrl && validateAudioUrl(value.audioUrl) && (
                <InputAdornment position="end">
                  <Tooltip title={isPlaying ? "Stop Audio" : "Play Audio"}>
                    <IconButton
                      size="small"
                      onClick={playAudioUrl}
                      disabled={disabled}
                    >
                      {isPlaying ? <StopIcon /> : <PlayIcon />}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              )
            }}
            helperText={
              value.audioUrl && !validateAudioUrl(value.audioUrl) 
                ? "Please enter a valid URL" 
                : "Enter direct link to audio file (mp3, wav, ogg, etc.)"
            }
          />
        )}

        {/* Audio Text Input */}
        {(audioMode === 'text' || audioMode === 'both') && (
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Text for Speech Synthesis"
            value={value.audioText || ''}
            onChange={handleAudioTextChange}
            placeholder="Enter the text that will be converted to speech..."
            disabled={disabled}
            error={!!error && audioMode === 'text' && !value.audioText}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                  <TextIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: value.audioText && (
                <InputAdornment position="end" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                  <Tooltip title={isPlaying ? "Stop Speech" : "Preview Speech"}>
                    <IconButton
                      size="small"
                      onClick={playTextToSpeech}
                      disabled={disabled}
                    >
                      {isPlaying ? <StopIcon /> : <PlayIcon />}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              )
            }}
            helperText="This text will be converted to speech for audio playback"
          />
        )}

        {/* Additional Fields */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Audio Title"
            value={value.audioTitle || ''}
            onChange={handleTitleChange}
            placeholder="Descriptive title for the audio"
            disabled={disabled}
            sx={{ flex: 1 }}
          />
          
          {(audioMode === 'url' || audioMode === 'both') && (
            <TextField
              label="Duration (seconds)"
              type="number"
              value={value.audioDuration || ''}
              onChange={handleDurationChange}
              placeholder="Auto-detected"
              disabled={disabled}
              sx={{ width: 150 }}
              inputProps={{ min: 1, max: 3600 }}
            />
          )}
        </Box>

        {/* Format Display */}
        {value.audioFormat && (audioMode === 'url' || audioMode === 'both') && (
          <Box sx={{ mb: 2 }}>
            <Chip 
              label={`Format: ${value.audioFormat.toUpperCase()}`}
              size="small"
              color="primary"
              variant="outlined"
            />
          </Box>
        )}

        {/* Validation Messages */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {helperText && !error && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {helperText}
          </Typography>
        )}

        {/* Mode-specific help text */}
        {audioMode === 'both' && (
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>Fallback Mode:</strong> Audio URL will be used if available and valid, 
              otherwise text-to-speech will be used as fallback.
            </Typography>
          </Alert>
        )}

        {/* Validation Status */}
        {hasValidInput() && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip 
              label="Valid Audio Configuration" 
              color="success" 
              size="small"
              icon={<VolumeIcon />}
            />
          </Box>
        )}
      </FormControl>
    </Box>
  );
};

export default AudioInputComponent;