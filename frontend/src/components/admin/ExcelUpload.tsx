import React, { useState, useCallback } from 'react';
import {
  Box,
  Button,
  Typography,
  Alert,
  LinearProgress,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Close as CloseIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';

interface ExcelUploadProps {
  moduleType: 'speaking' | 'writing' | 'reading' | 'listening';
  componentType: string;
  onUpload: (data: any[], fileName: string) => Promise<void>;
  templateFields: string[];
  sampleData?: any[];
}

interface ValidationError {
  row: number;
  field: string;
  message: string;
}

const ExcelUpload: React.FC<ExcelUploadProps> = ({
  moduleType,
  componentType,
  onUpload,
  templateFields,
  sampleData = [],
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [fileName, setFileName] = useState('');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setFileName(file.name);
    setUploading(true);
    setUploadProgress(0);

    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      // Validate data
      const errors = validateData(data);
      setValidationErrors(errors);

      if (errors.length === 0) {
        setParsedData(data);
        setShowPreview(true);
      }
    } catch (error) {
      console.error('Error parsing Excel file:', error);
      setValidationErrors([{ row: 0, field: 'file', message: 'Invalid Excel file format' }]);
    } finally {
      setUploading(false);
      setUploadProgress(100);
    }
  }, []);

  const validateData = (data: any[]): ValidationError[] => {
    const errors: ValidationError[] = [];

    data.forEach((row, index) => {
      templateFields.forEach((field) => {
        if (!row[field] && field !== 'audio_example_url' && field !== 'sample_answer') {
          errors.push({
            row: index + 2, // +2 for header row and 0-based index
            field,
            message: `Required field '${field}' is missing`,
          });
        }
      });

      // Additional validation based on component type
      if (componentType === 'read-aloud' && row.duration && isNaN(Number(row.duration))) {
        errors.push({
          row: index + 2,
          field: 'duration',
          message: 'Duration must be a number',
        });
      }

      if (row.difficulty && !['easy', 'medium', 'hard'].includes(row.difficulty)) {
        errors.push({
          row: index + 2,
          field: 'difficulty',
          message: 'Difficulty must be easy, medium, or hard',
        });
      }
    });

    return errors;
  };

  const handleUpload = async () => {
    if (parsedData.length === 0) return;

    setUploading(true);
    try {
      await onUpload(parsedData, fileName);
      setShowPreview(false);
      setParsedData([]);
      setFileName('');
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const downloadTemplate = () => {
    const templateData = sampleData.length > 0 ? sampleData : [
      templateFields.reduce((acc, field) => {
        acc[field] = `Sample ${field}`;
        return acc;
      }, {} as any)
    ];

    const worksheet = XLSX.utils.json_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');
    XLSX.writeFile(workbook, `${moduleType}-${componentType}-template.xlsx`);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    multiple: false,
  });

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">
          Upload {componentType.replace('-', ' ')} Questions
        </Typography>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={downloadTemplate}
        >
          Download Template
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Box
            {...getRootProps()}
            sx={{
              border: '2px dashed',
              borderColor: isDragActive ? 'primary.main' : 'grey.400',
              borderRadius: 2,
              p: 4,
              textAlign: 'center',
              cursor: 'pointer',
              bgcolor: isDragActive ? 'action.hover' : 'background.default',
              transition: 'all 0.3s ease',
            }}
          >
            <input {...getInputProps()} />
            <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              {isDragActive ? 'Drop the Excel file here' : 'Drag & drop Excel file here'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              or click to select file
            </Typography>
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              Supported formats: .xlsx, .xls
            </Typography>
          </Box>

          {uploading && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" gutterBottom>
                Processing file...
              </Typography>
              <LinearProgress variant="determinate" value={uploadProgress} />
            </Box>
          )}

          {validationErrors.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Alert severity="error" sx={{ mb: 2 }}>
                Found {validationErrors.length} validation error(s). Please fix them and try again.
              </Alert>
              <List dense>
                {validationErrors.slice(0, 10).map((error, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <ErrorIcon color="error" />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Row ${error.row}: ${error.field}`}
                      secondary={error.message}
                    />
                  </ListItem>
                ))}
                {validationErrors.length > 10 && (
                  <Typography variant="caption" color="text.secondary">
                    ... and {validationErrors.length - 10} more errors
                  </Typography>
                )}
              </List>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <Dialog
        open={showPreview}
        onClose={() => setShowPreview(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Preview Upload Data
            <IconButton onClick={() => setShowPreview(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Chip label={`${parsedData.length} records found`} color="primary" />
          </Box>
          <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
            {parsedData.slice(0, 5).map((record, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="subtitle2" gutterBottom>
                    Record {index + 1}
                  </Typography>
                  {Object.entries(record).map(([key, value]) => (
                    <Typography key={key} variant="body2">
                      <strong>{key}:</strong> {String(value).substring(0, 100)}
                      {String(value).length > 100 ? '...' : ''}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            ))}
            {parsedData.length > 5 && (
              <Typography variant="caption" color="text.secondary">
                ... and {parsedData.length - 5} more records
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPreview(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={uploading}
            startIcon={uploading ? undefined : <CheckCircleIcon />}
          >
            {uploading ? 'Uploading...' : 'Confirm Upload'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ExcelUpload;