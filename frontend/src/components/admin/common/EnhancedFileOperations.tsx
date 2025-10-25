import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Download as DownloadIcon,
  FileDownload as ExportIcon,
  Info as InfoIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { adminService } from '../../../services/adminService';

interface EnhancedFileOperationsProps {
  selectedModule: string;
  selectedSubModule: string;
  onUploadSuccess: () => void;
  disabled?: boolean;
}

const EnhancedFileOperations: React.FC<EnhancedFileOperationsProps> = ({
  selectedModule,
  selectedSubModule,
  onUploadSuccess,
  disabled = false
}) => {
  const [uploading, setUploading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [showTemplateInfo, setShowTemplateInfo] = useState(false);

  const canPerformOperations = selectedModule && selectedSubModule && !disabled;
  const isListeningModule = selectedModule === 'Listening';

  const onDrop = async (acceptedFiles: File[]) => {
    if (!canPerformOperations || acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setUploading(true);
    setUploadMessage(null);

    try {
      const response = await adminService.uploadExcel(selectedModule, selectedSubModule, file);
      
      if (response.success) {
        setUploadMessage({ type: 'success', text: response.message || 'File uploaded successfully!' });
        onUploadSuccess();
      } else {
        setUploadMessage({ type: 'error', text: response.error || 'Upload failed' });
      }
    } catch (error) {
      setUploadMessage({ type: 'error', text: 'An error occurred during upload' });
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    multiple: false,
    disabled: !canPerformOperations || uploading
  });

  const handleDownloadTemplate = async () => {
    if (!canPerformOperations) return;

    setDownloading(true);
    try {
      const response = await adminService.downloadTemplate(selectedModule, selectedSubModule);
      if (response.success) {
        setUploadMessage({ type: 'success', text: response.message || 'Template downloaded successfully!' });
      } else {
        setUploadMessage({ type: 'error', text: response.error || 'Failed to download template' });
      }
    } catch (error) {
      setUploadMessage({ type: 'error', text: 'Failed to download template' });
    } finally {
      setDownloading(false);
    }
  };

  const handleExportQuestions = async () => {
    if (!canPerformOperations) return;

    setExporting(true);
    try {
      const response = await adminService.exportQuestions(selectedModule, selectedSubModule);
      if (response.success) {
        setUploadMessage({ 
          type: 'success', 
          text: response.message || `Questions exported successfully! Downloaded ${response.data?.exportedCount || 0} questions.`
        });
      } else {
        setUploadMessage({ type: 'error', text: response.error || 'Failed to export questions' });
      }
    } catch (error) {
      setUploadMessage({ type: 'error', text: 'Failed to export questions' });
    } finally {
      setExporting(false);
    }
  };

  const getTemplateColumns = () => {
    const key = `${selectedModule}-${selectedSubModule}`;
    const baseColumns = ['id', 'title', 'difficulty', 'category', 'tags'];
    
    if (isListeningModule) {
      const audioColumns = ['audioUrl', 'audioText', 'audioFormat', 'audioDuration', 'audioTitle'];
      
      switch (key) {
        case 'Listening-summarize-spoken-text':
          return [...baseColumns, ...audioColumns, 'transcript', 'wordLimitMin', 'wordLimitMax', 'timeLimit', 'sampleSummary', 'keyPoints'];
        case 'Listening-multiple-choice-multiple':
        case 'Listening-multiple-choice-single':
          return [...baseColumns, ...audioColumns, 'question', 'optionA', 'optionB', 'optionC', 'optionD', 'optionE', 'correctAnswers', 'transcript', 'speaker'];
        case 'Listening-fill-blanks':
          return [...baseColumns, ...audioColumns, 'text', 'wordBank', 'speaker', 'instructions', 'maxScore', 'timeLimit'];
        case 'Listening-select-missing-word':
          return [...baseColumns, ...audioColumns, 'missingWordPosition', 'optionA', 'optionB', 'optionC', 'correctAnswer', 'speaker'];
        case 'Listening-highlight-incorrect-words':
          return [...baseColumns, ...audioColumns, 'displayText', 'incorrectWords', 'speaker'];
        case 'Listening-write-from-dictation':
          return [...baseColumns, ...audioColumns, 'keyWords', 'acceptableVariations'];
        default:
          return [...baseColumns, ...audioColumns];
      }
    }
    
    return baseColumns;
  };

  const getAudioFieldsInfo = () => [
    {
      field: 'audioUrl',
      description: 'Direct URL to audio file (mp3, wav, ogg, etc.)',
      example: 'https://example.com/audio.mp3',
      required: false
    },
    {
      field: 'audioText',
      description: 'Text that will be converted to speech (fallback if no audioUrl)',
      example: 'This is the spoken content for the listening exercise...',
      required: false
    },
    {
      field: 'audioFormat',
      description: 'Audio file format (auto-detected from URL)',
      example: 'mp3, wav, ogg',
      required: false
    },
    {
      field: 'audioDuration',
      description: 'Duration in seconds (optional, auto-detected if possible)',
      example: '120',
      required: false
    },
    {
      field: 'audioTitle',
      description: 'Descriptive title for the audio',
      example: 'Climate Change Lecture',
      required: false
    }
  ];

  return (
    <Box>
      {/* File Operations Buttons */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
        <Button
          variant="outlined"
          startIcon={downloading ? <CircularProgress size={16} /> : <DownloadIcon />}
          onClick={handleDownloadTemplate}
          disabled={!canPerformOperations || downloading}
          size="medium"
        >
          Download Template
        </Button>
        
        <Button
          variant="outlined"
          startIcon={exporting ? <CircularProgress size={16} /> : <ExportIcon />}
          onClick={handleExportQuestions}
          disabled={!canPerformOperations || exporting}
          size="medium"
        >
          Export Questions
        </Button>

        {isListeningModule && (
          <Tooltip title="View audio fields information">
            <IconButton
              onClick={() => setShowTemplateInfo(true)}
              color="primary"
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* Upload Section */}
      <Paper
        {...getRootProps()}
        sx={{
          p: 4,
          border: '2px dashed',
          borderColor: isDragActive ? 'primary.main' : 'grey.300',
          backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
          cursor: canPerformOperations ? 'pointer' : 'not-allowed',
          opacity: canPerformOperations ? 1 : 0.5,
          transition: 'all 0.3s ease',
          textAlign: 'center',
          '&:hover': canPerformOperations ? {
            borderColor: 'primary.main',
            backgroundColor: 'action.hover'
          } : {}
        }}
      >
        <input {...getInputProps()} />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          {uploading ? (
            <CircularProgress size={40} />
          ) : (
            <UploadIcon sx={{ fontSize: 48, color: 'primary.main' }} />
          )}
          
          <Box>
            <Typography variant="h6" gutterBottom>
              {uploading ? 'Uploading...' : 'Drag & drop Excel file here'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              or click to select file
            </Typography>
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              Supported formats: .xlsx, .xls
            </Typography>
            {isListeningModule && (
              <Typography variant="caption" display="block" sx={{ mt: 1, color: 'primary.main' }}>
                For Listening module: Include audioUrl OR audioText columns (or both)
              </Typography>
            )}
          </Box>
        </Box>
      </Paper>

      {/* Template Information for Listening Module */}
      {isListeningModule && (
        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Audio Configuration for Listening Module:
          </Typography>
          <Typography variant="body2">
            • <strong>audioUrl:</strong> Direct link to audio file (preferred)<br/>
            • <strong>audioText:</strong> Text for speech synthesis (fallback)<br/>
            • At least one of these fields must be provided for each question
          </Typography>
        </Alert>
      )}

      {/* Upload Message */}
      {uploadMessage && (
        <Alert 
          severity={uploadMessage.type} 
          sx={{ mt: 2 }}
          onClose={() => setUploadMessage(null)}
        >
          {uploadMessage.text}
        </Alert>
      )}

      {/* Instructions */}
      {!canPerformOperations && (
        <Alert severity="info" sx={{ mt: 2 }}>
          Please select both module and sub-module to enable file operations.
        </Alert>
      )}

      {/* Template Information Dialog */}
      <Dialog
        open={showTemplateInfo}
        onClose={() => setShowTemplateInfo(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Excel Template Information - Listening Module
            <IconButton onClick={() => setShowTemplateInfo(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Required Columns for {selectedSubModule}:
          </Typography>
          
          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Column Name</TableCell>
                  <TableCell>Required</TableCell>
                  <TableCell>Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getTemplateColumns().map((column) => (
                  <TableRow key={column}>
                    <TableCell>
                      <Typography variant="body2" fontFamily="monospace">
                        {column}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={['audioUrl', 'audioText'].includes(column) ? 'Optional*' : 'Required'} 
                        size="small"
                        color={['audioUrl', 'audioText'].includes(column) ? 'warning' : 'primary'}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {column.includes('Time') ? 'Number' : 'Text'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" gutterBottom>
            Audio Fields Details:
          </Typography>
          
          <List dense>
            {getAudioFieldsInfo().map((field) => (
              <ListItem key={field.field}>
                <ListItemText
                  primary={
                    <Typography variant="body2" fontFamily="monospace">
                      {field.field}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2">{field.description}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Example: {field.example}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>

          <Alert severity="warning" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Important:</strong> At least one of "audioUrl" or "audioText" must be provided for each listening question. 
              If both are provided, audioUrl will be used as primary source with audioText as fallback.
            </Typography>
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowTemplateInfo(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EnhancedFileOperations;