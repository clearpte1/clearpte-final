import React, { useState, useEffect } from 'react';
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
  Divider
} from '@mui/material';
import {
  Close as CloseIcon,
  Save as SaveIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { adminService } from '../../../services/adminService';

interface QuestionFormDrawerProps {
  open: boolean;
  onClose: () => void;
  selectedModule: string;
  selectedSubModule: string;
  question?: any; // For editing
  onSave: () => void;
}

const QuestionFormDrawer: React.FC<QuestionFormDrawerProps> = ({
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

  const isEditing = !!question;

  // Initialize form data
  useEffect(() => {
    if (open) {
      if (isEditing && question) {
        setFormData({ ...question });
      } else {
        // Initialize with default values based on module/sub-module
        setFormData(getDefaultFormData());
      }
      setError(null);
      setSuccess(null);
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

    // Add specific fields based on module/sub-module
    const key = `${selectedModule}-${selectedSubModule}`;
    switch (key) {
      case 'Speaking-read-aloud':
        return { ...base, text: '', preparationTime: 40, recordingTime: 40, expectedAnswer: '' };
      case 'Speaking-repeat-sentence':
        return { ...base, audio: '', expectedAnswer: '' };
      case 'Speaking-answer-short-questions':
        return { ...base, audioText: '', expectedAnswer: '', preparationTime: 3, recordingTime: 10, questionType: 'ASQ' };
      case 'Speaking-retell-lecture':
        return { ...base, audioText: '', expectedAnswer: '', preparationTime: 10, recordingTime: 40, type: 'lecture', questionType: 'ASQ' };
      case 'Writing-summarize-text':
        return { ...base, passage: '', sampleAnswer: '', timeLimit: 10, wordLimit: { min: 25, max: 50 } };
      case 'Writing-write-email':
        return { ...base, situation: '', keyPoints: [], sampleEmail: '', timeLimit: 9, wordLimit: { min: 100 } };
      case 'Writing-writing-essay':
        return { ...base, prompt: '', type: 'Argumentative Essay', timeLimit: 20, wordLimit: '200-300 words' };
      case 'Reading-fill-blanks':
        return { ...base, text: '', blanks: [] };
      case 'Reading-reading-fill-blanks':
        return { ...base, text: '', blanks: [], wordBank: [], maxScore: 100, timeLimit: 900, instructions: '' };
      case 'Reading-multiple-choice-multiple':
      case 'Reading-multiple-choice-single':
        return { ...base, passage: '', question: '', options: [], explanation: '', timeLimit: 5 };
      case 'Reading-reorder-paragraphs':
        return { ...base, paragraphs: [] };
      case 'Listening-summarize-spoken-text':
        return { ...base, audioText: '', sampleSummary: '', keyPoints: [], wordLimit: { min: 50, max: 70 }, timeLimit: 10, taskType: 'SST', type: 'listening' };
      case 'Listening-multiple-choice-multiple':
      case 'Listening-multiple-choice-single':
        return { ...base, audioUrl: '', question: '', options: [], speaker: '', duration: '', testSensitivity: 'Audio' };
      case 'Listening-fill-blanks':
        return { ...base, audioUrl: '', text: '', blanks: [], wordBank: [], speaker: '', duration: '', instructions: '', maxScore: 100, timeLimit: 900 };
      case 'Listening-highlight-correct-summary':
        return { ...base, audioText: '', summaryOptions: [], correctAnswer: '', instructions: '', speaker: '', maxScore: 100, timeLimit: 900 };
      case 'Listening-highlight-incorrect-words':
        return { ...base, audioText: '', displayText: '', incorrectWords: [], instructions: '', speaker: '', maxScore: 100, timeLimit: 1200 };
      case 'Listening-select-missing-word':
        return { ...base, audioText: '', missingWordPosition: '', options: [], correctAnswer: '', instructions: '', speaker: '', maxScore: 100, timeLimit: 900 };
      case 'Listening-write-from-dictation':
        return { ...base, audioText: '', keyWords: [], acceptableVariations: {}, maxScore: 100, timeLimit: 600, instructions: '' };
      default:
        return base;
    }
  };

  const getFormFields = () => {
    const key = `${selectedModule}-${selectedSubModule}`;
    const commonFields = (
      <>
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
      </>
    );

    switch (key) {
      case 'Speaking-read-aloud':
        return (
          <>
            {commonFields}
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
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Preparation Time (seconds)"
                type="number"
                value={formData.preparationTime || 40}
                onChange={(e) => setFormData({ ...formData, preparationTime: parseInt(e.target.value) })}
                margin="normal"
              />
              <TextField
                label="Recording Time (seconds)"
                type="number"
                value={formData.recordingTime || 40}
                onChange={(e) => setFormData({ ...formData, recordingTime: parseInt(e.target.value) })}
                margin="normal"
              />
            </Box>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Expected Answer Guide"
              value={formData.expectedAnswer || ''}
              onChange={(e) => setFormData({ ...formData, expectedAnswer: e.target.value })}
              margin="normal"
            />
          </>
        );

      case 'Speaking-repeat-sentence':
        return (
          <>
            {commonFields}
            <TextField
              fullWidth
              label="Audio Text/Sentence"
              value={formData.audio || ''}
              onChange={(e) => setFormData({ ...formData, audio: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Expected Answer Guide"
              value={formData.expectedAnswer || ''}
              onChange={(e) => setFormData({ ...formData, expectedAnswer: e.target.value })}
              margin="normal"
            />
          </>
        );

      case 'Writing-summarize-text':
        return (
          <>
            {commonFields}
            <TextField
              fullWidth
              multiline
              rows={6}
              label="Text Passage"
              value={formData.passage || ''}
              onChange={(e) => setFormData({ ...formData, passage: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Sample Answer"
              value={formData.sampleAnswer || ''}
              onChange={(e) => setFormData({ ...formData, sampleAnswer: e.target.value })}
              margin="normal"
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Time Limit (minutes)"
                type="number"
                value={formData.timeLimit || 10}
                onChange={(e) => setFormData({ ...formData, timeLimit: parseInt(e.target.value) })}
                margin="normal"
              />
              <TextField
                label="Min Words"
                type="number"
                value={formData.wordLimit?.min || 25}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  wordLimit: { ...formData.wordLimit, min: parseInt(e.target.value) }
                })}
                margin="normal"
              />
              <TextField
                label="Max Words"
                type="number"
                value={formData.wordLimit?.max || 50}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  wordLimit: { ...formData.wordLimit, max: parseInt(e.target.value) }
                })}
                margin="normal"
              />
            </Box>
          </>
        );

      case 'Reading-multiple-choice-multiple':
      case 'Reading-multiple-choice-single':
        return (
          <>
            {commonFields}
            <TextField
              fullWidth
              multiline
              rows={6}
              label="Reading Passage"
              value={formData.passage || ''}
              onChange={(e) => setFormData({ ...formData, passage: e.target.value })}
              margin="normal"
              required
            />
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
              label="Explanation"
              value={formData.explanation || ''}
              onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
              margin="normal"
            />
            <TextField
              label="Time Limit (minutes)"
              type="number"
              value={formData.timeLimit || 5}
              onChange={(e) => setFormData({ ...formData, timeLimit: parseInt(e.target.value) })}
              margin="normal"
            />
          </>
        );

      default:
        return (
          <>
            {commonFields}
            <Alert severity="info" sx={{ mt: 2 }}>
              Form fields for {selectedModule} → {selectedSubModule} are not yet implemented.
              This is a placeholder form.
            </Alert>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Content/Description"
              value={formData.content || ''}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              margin="normal"
            />
          </>
        );
    }
  };

  const handleSave = async () => {
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

  const handleAddTag = (tag: string) => {
    if (tag && !formData.tags?.includes(tag)) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tag]
      });
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((tag: string) => tag !== tagToRemove) || []
    });
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 600, md: 700 } }
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

        {/* Form Fields */}
        <Box component="form" sx={{ mb: 4 }}>
          {getFormFields()}

          {/* Tags */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Tags
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
              {formData.tags?.map((tag: string, index: number) => (
                <Chip
                  key={index}
                  label={tag}
                  onDelete={() => handleRemoveTag(tag)}
                  size="small"
                />
              ))}
            </Stack>
            <TextField
              size="small"
              label="Add tag"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const target = e.target as HTMLInputElement;
                  handleAddTag(target.value);
                  target.value = '';
                }
              }}
              placeholder="Type and press Enter"
            />
          </Box>
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
        <Box sx={{ display: 'flex', gap: 2, mt: 'auto', pt: 3, borderTop: 1, borderColor: 'divider' }}>
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

export default QuestionFormDrawer;