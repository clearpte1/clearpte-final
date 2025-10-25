import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Paper
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Download as DownloadIcon,
  FileDownload as ExportIcon
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { adminService } from '../../../services/adminService';

interface FileOperationsProps {
  selectedModule: string;
  selectedSubModule: string;
  onUploadSuccess: () => void;
  disabled?: boolean;
}

const FileOperations: React.FC<FileOperationsProps> = ({
  selectedModule,
  selectedSubModule,
  onUploadSuccess,
  disabled = false
}) => {
  const [uploading, setUploading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const canPerformOperations = selectedModule && selectedSubModule && !disabled;

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

  return (
    <Box>
      {/* File Operations Buttons */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
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
          </Box>
        </Box>
      </Paper>

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
    </Box>
  );
};

export default FileOperations;