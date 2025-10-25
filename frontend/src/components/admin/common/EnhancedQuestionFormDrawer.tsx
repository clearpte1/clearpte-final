import React, { useState, useEffect } from 'react';
import {
  PlayArrow as PlayIcon,
  Stop as StopIcon,
  VolumeUp as VolumeIcon,
  Link as LinkIcon,
  TextFields as TextIcon
} from '@mui/icons-material';
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  Alert,
  CircularProgress,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  InputAdornment
} from '@mui/material';
import {
  Close as CloseIcon,
  Save as SaveIcon,
  ExpandMore as ExpandMoreIcon,
  AudioFile as AudioIcon
} from '@mui/icons-material';
import { adminService } from '../../../services/adminService';
import AudioInputComponent, { AudioData } from './AudioInputComponent';

interface EnhancedQuestionFormDrawerProps {
  open: boolean;
  onClose: () => void;
  selectedModule: string;
  selectedSubModule: string;
  question?: any;
  onSave: () => void;
}

const EnhancedQuestionFormDrawer: React.FC<EnhancedQuestionFormDrawerProps> = ({
  open,
  onClose,
  selectedModule,
  selectedSubModule,
  question,
  onSave
}) => {
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [audioError, setAudioError] = useState<string | null>(null);

  const isEditing = !!question;
  const isListeningModule = selectedModule === 'Listening';

  // Initialize form data
  useEffect(() => {
    if (open) {
      if (isEditing && question) {
        setFormData({ ...question });
      } else {
        setFormData(getDefaultFormData());
      }
      setError(null);
      setSuccess(null);
      setAudioError(null);
    }
  }, [open, question, selectedModule, selectedSubModule]);

  const getDefaultFormData = () => {
    const base = {
      id: Date.now(),
      title: '',
      difficulty: 'Beginner',
      category: '',
      tags: [],
      isNew: true,
      isMarked: false,
      pracStatus: 'Undone',
      hasExplanation: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const key = `${selectedModule}-${selectedSubModule}`;
    switch (key) {
      case 'Listening-summarize-spoken-text':
        return {
          ...base,
          audio: {
            audioText: '',
            audioTitle: ''
          },
          transcript: '',
          wordLimit: { min: 50, max: 70 },
          timeLimit: 10,
          sampleSummary: '',
          keyPoints: [],
          taskType: 'SST',
          type: 'listening'
        };

      case 'Listening-multiple-choice-multiple':
      case 'Listening-multiple-choice-single':
        return {
          ...base,
          audio: {
            audioText: '',
            audioTitle: ''
          },
          question: '',
          options: [],
          correctAnswers: [],
          transcript: '',
          speaker: '',
          testSensitivity: 'Audio'
        };

      case 'Listening-fill-blanks':
        return {
          ...base,
          audio: {
            audioText: '',
            audioTitle: ''
          },
          text: '',
          blanks: [],
          wordBank: [],
          speaker: '',
          instructions: '',
          maxScore: 100,
          timeLimit: 900
        };

      case 'Listening-select-missing-word':
        return {
          ...base,
          audio: {
            audioText: '',
            audioTitle: ''
          },
          missingWordPosition: '',
          options: [],
          correctAnswer: '',
          instructions: '',
          speaker: '',
          maxScore: 100,
          timeLimit: 900
        };

      case 'Listening-highlight-incorrect-words':
        return {
          ...base,
          audio: {
            audioText: '',
            audioTitle: ''
          },
          displayText: '',
          incorrectWords: [],
          instructions: '',
          speaker: '',
          maxScore: 100,
          timeLimit: 1200
        };

      case 'Listening-write-from-dictation':
        return {
          ...base,
          audio: {
            audioText: '',
            audioTitle: ''
          },
          keyWords: [],
          acceptableVariations: {},
          maxScore: 100,
          timeLimit: 600,
          instructions: ''
        };

      default:
        return base;
    }
  };

  const handleAudioChange = (audioData: AudioData) => {
    setFormData({
      ...formData,
      audio: audioData
    });
    setAudioError(null);
  };

  const validateForm = (): string | null => {
    if (!formData.title?.trim()) {
      return 'Title is required';
    }

    if (isListeningModule) {
      const audio = formData.audio;
      if (!audio?.audioUrl && !audio?.audioText) {
        return 'Either audio URL or text for speech synthesis is required';
      }
      if (audio.audioUrl && !isValidUrl(audio.audioUrl)) {
        return 'Please provide a valid audio URL';
      }
      if (audio.audioText && audio.audioText.trim().length < 10) {
        return 'Audio text should be at least 10 characters long';
      }
    }

    return null;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSave = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      let response;
      if (isEditing) {
        response = await adminService.updateQuestion(
          selectedModule,
          selectedSubModule,
          question.id.toString(),
          formData
        );
      } else {
        response = await adminService.createQuestion(
          selectedModule,
          selectedSubModule,
          formData
        );
      }

      if (response.success) {
        setSuccess(response.message || 'Question saved successfully!');
        setTimeout(() => {
          onSave();
          onClose();
        }, 1500);
      } else {
        setError(response.error || 'Failed to save question');
      }
    } catch (error) {
      setError('An error occurred while saving the question');
    } finally {
      setLoading(false);
    }
  };

  const getSpeakingSpecificFields = () => {
    const key = `${selectedModule}-${selectedSubModule}`;
    console.log(key);
    
    switch (key) {
      case 'Speaking-read-aloud':
        return (
          <>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Text to Read"
              value={formData.text || ''}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              margin="normal"
              required
            />
          </>
        );

      case 'Speaking-repeat-sentence':
        return (
          <>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Sentence to Repeat"
              value={formData.sentence || ''}
              onChange={(e) => setFormData({ ...formData, sentence: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Audio URL"
              value={formData.audioUrl || ''}
              onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
              placeholder="https://example.com/audio.mp3"
              sx={{ mb: 2 }}
            />
          </>

        );
      case 'Speaking-describe-image':
        return (
          <>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Image Description"
              value={formData.imageDescription || ''}
              onChange={(e) => setFormData({ ...formData, imageDescription: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Image URL"
              value={formData.imageUrl || ''}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://example.com/image.jpg"
              margin="normal"
            />
          </>
        );
      
      case 'Speaking-retell-lecture':
        return (
          <>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Lecture Transcript"
              value={formData.lectureTranscript || ''}
              onChange={(e) => setFormData({ ...formData, lectureTranscript: e.target.value })}
              margin="normal"
              required
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Min Words"
                type="number"
                value={formData.wordLimit?.min || 50}
                onChange={(e) => setFormData({ 
                  ...formData,
                  wordLimit: { ...formData.wordLimit, min: parseInt(e.target.value) }
                })}
                margin="normal"
              />
              <TextField
                label="Max Words"
                type="number"
                value={formData.wordLimit?.max || 70}
                onChange={(e) => setFormData({
                  ...formData,
                  wordLimit: { ...formData.wordLimit, max: parseInt(e.target.value) }
                })}
                margin="normal"
              />
            </Box>
            <TextField
              fullWidth
              label="Time Limit (minutes)"
              type="number"
              value={formData.timeLimit || 10}
              onChange={(e) => setFormData({ ...formData, timeLimit: parseInt(e.target.value) })}
              margin="normal"
            />
          </>
        );
      case 'Speaking-answer-short-questions':
        return (
          <>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Question"
              value={formData.question || ''}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Audio URL"
              value={formData.audioUrl || ''}
              onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
              placeholder="https://example.com/audio.mp3"
              sx={{ mb: 2 }}
            />
          </>
        );

      default:
        return (
          <Alert severity="info" sx={{ mt: 2 }}>
            Basic form fields for {selectedSubModule}. Additional fields can be added as needed.
          </Alert>
        );
    }
  }

  const getSpecificFieldsbasedOnModule = () => {
    if (selectedModule === 'Speaking') {
      return getSpeakingSpecificFields();
    };
    if (selectedModule === 'Listening') {
      return getListeningSpecificFields();
    };
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        Form fields for {selectedModule} → {selectedSubModule} will be rendered here.
      </Alert>
    );
  }
    
  

  const getListeningSpecificFields = () => {
    const key = `${selectedModule}-${selectedSubModule}`;
    console.log(key);
    
    switch (key) {
      case 'Listening-summarize-spoken-text':
        return (
          <>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Transcript"
              value={formData.transcript || ''}
              onChange={(e) => setFormData({ ...formData, transcript: e.target.value })}
              margin="normal"
              helperText="Full transcript of the audio content"
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Min Words"
                type="number"
                value={formData.wordLimit?.min || 50}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  wordLimit: { ...formData.wordLimit, min: parseInt(e.target.value) }
                })}
                margin="normal"
              />
              <TextField
                label="Max Words"
                type="number"
                value={formData.wordLimit?.max || 70}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  wordLimit: { ...formData.wordLimit, max: parseInt(e.target.value) }
                })}
                margin="normal"
              />
              <TextField
                label="Time Limit (minutes)"
                type="number"
                value={formData.timeLimit || 10}
                onChange={(e) => setFormData({ ...formData, timeLimit: parseInt(e.target.value) })}
                margin="normal"
              />
            </Box>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Sample Summary"
              value={formData.sampleSummary || ''}
              onChange={(e) => setFormData({ ...formData, sampleSummary: e.target.value })}
              margin="normal"
            />
          </>
        );

      case 'Listening-multiple-choice-multiple':
      case 'Listening-multiple-choice-single':
        return (
          <>
            <TextField
              fullWidth
              label="Question"
              value={formData.question || ''}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Transcript"
              value={formData.transcript || ''}
              onChange={(e) => setFormData({ ...formData, transcript: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Speaker"
              value={formData.speaker || ''}
              onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
              margin="normal"
            />
          </>
        );

      case 'Listening-fill-blanks':
        return (
          <>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Text with Blanks"
              value={formData.text || ''}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              margin="normal"
              helperText="Use _____ to indicate blanks in the text"
            />
            <TextField
              fullWidth
              label="Instructions"
              value={formData.instructions || ''}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              margin="normal"
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Max Score"
                type="number"
                value={formData.maxScore || 100}
                onChange={(e) => setFormData({ ...formData, maxScore: parseInt(e.target.value) })}
                margin="normal"
              />
              <TextField
                label="Time Limit (seconds)"
                type="number"
                value={formData.timeLimit || 900}
                onChange={(e) => setFormData({ ...formData, timeLimit: parseInt(e.target.value) })}
                margin="normal"
              />
            </Box>
          </>
        );

      default:
        return (
          <Alert severity="info" sx={{ mt: 2 }}>
            Basic form fields for {selectedSubModule}. Additional fields can be added as needed.
          </Alert>
        );
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 600, md: 800 } }
      }}
    >
      <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5">
            {isEditing ? 'Edit' : 'Create'} Question
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Module Info */}
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2" color="text.secondary">Module:</Typography>
            <Chip label={selectedModule} color="primary" size="small" />
            <Typography variant="body2" color="text.secondary">→</Typography>
            <Chip label={selectedSubModule} color="secondary" size="small" />
          </Stack>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Basic Fields */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Title"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            margin="normal"
            required
          />
          
          <FormControl fullWidth margin="normal">
            <InputLabel>Difficulty</InputLabel>
            <Select
              value={formData.difficulty || 'Beginner'}
              label="Difficulty"
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
            >
              <MenuItem value="Beginner">Beginner</MenuItem>
              <MenuItem value="Intermediate">Intermediate</MenuItem>
              <MenuItem value="Advanced">Advanced</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Category"
            value={formData.category || ''}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            margin="normal"
          />
        </Box>

        {/* Audio Configuration for Listening Module */}
        {isListeningModule && (
          <Accordion defaultExpanded sx={{ mb: 3 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AudioIcon />
                <Typography variant="h6">Audio Configuration</Typography>
                {formData.audio?.audioUrl || formData.audio?.audioText ? (
                  <Chip label="Configured" color="success" size="small" />
                ) : (
                  <Chip label="Required" color="error" size="small" />
                )}
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <AudioInputComponent
                value={formData.audio || {}}
                onChange={handleAudioChange}
                required={true}
                // error={audioError}
                helperText="Configure audio source for the listening question"
              />
            </AccordionDetails>
          </Accordion>
        )}

        {/* Module-specific Fields */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Question Details
          </Typography>
          
          {/* {isListeningModule ? getListeningSpecificFields() : (
            <Alert severity="info">
              Form fields for {selectedModule} → {selectedSubModule} will be rendered here.
            </Alert>
          )} */
          getSpecificFieldsbasedOnModule()}
        </Box>

        {/* Messages */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        {/* Actions */}
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          mt: 'auto', 
          pt: 3, 
          borderTop: 1, 
          borderColor: 'divider',
          position: 'sticky',
          bottom: 0,
          backgroundColor: 'background.paper'
        }}>
          <Button variant="outlined" onClick={onClose} fullWidth>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} /> : <SaveIcon />}
            fullWidth
          >
            {loading ? 'Saving...' : 'Save Question'}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default EnhancedQuestionFormDrawer;