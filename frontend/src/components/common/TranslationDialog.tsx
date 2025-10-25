import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Alert,
  useTheme
} from '@mui/material';
import DialogWrapper from './DialogWrapper';

export interface TranslationDialogProps {
  open: boolean;
  onClose: () => void;
  onTranslate?: (language: string) => void;
  title?: string;
  description?: string;
  defaultLanguage?: string;
  languages?: Array<{
    value: string;
    label: string;
  }>;
  isLoading?: boolean;
  translatedText?: string;
}

const defaultLanguages = [
  { value: 'spanish', label: 'Spanish' },
  { value: 'french', label: 'French' },
  { value: 'german', label: 'German' },
  { value: 'chinese', label: 'Chinese' },
  { value: 'japanese', label: 'Japanese' },
  { value: 'korean', label: 'Korean' },
  { value: 'portuguese', label: 'Portuguese' },
  { value: 'italian', label: 'Italian' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'arabic', label: 'Arabic' }
];

const TranslationDialog: React.FC<TranslationDialogProps> = ({
  open,
  onClose,
  onTranslate,
  title = "Translation Options",
  description = "Translation feature will help you understand the content in your preferred language.",
  defaultLanguage = 'spanish',
  languages = defaultLanguages,
  isLoading = false,
  translatedText
}) => {
  const theme = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);

  const handleTranslate = () => {
    if (onTranslate) {
      onTranslate(selectedLanguage);
    }
  };

  return (
    <DialogWrapper
      open={open}
      onClose={onClose}
      title={title}
      maxWidth="sm"
      defaultActions={{
        cancelText: "Cancel",
        onCancel: onClose,
        confirmText: isLoading ? "Translating..." : "Translate",
        onConfirm: onTranslate ? handleTranslate : undefined,
        confirmColor: "primary"
      }}
    >
      <Box>
        {/* Language Selection */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{
            fontSize: '0.875rem',
            '&.Mui-focused': {
              color: theme.palette.primary.main
            },
            '&.Mui-disabled': {
              color: theme.palette.text.disabled
            }
          }}>
            Select Language
          </InputLabel>
          <Select 
            value={selectedLanguage} 
            label="Select Language"
            onChange={(e) => setSelectedLanguage(e.target.value)}
            disabled={isLoading}
            sx={{
              height: '42px',
              '& .MuiSelect-select': { 
                fontSize: '0.875rem',
                py: 1
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
                borderWidth: '1px'
              },
              '&.Mui-disabled': {
                backgroundColor: theme.palette.action.disabledBackground,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.action.disabled
                }
              }
            }}
          >
            {languages.map((lang) => (
              <MenuItem 
                key={lang.value} 
                value={lang.value}
                sx={{
                  fontSize: '0.875rem',
                  py: 1,
                  '&.Mui-selected': {
                    backgroundColor: `${theme.palette.primary.main}10`,
                    '&:hover': {
                      backgroundColor: `${theme.palette.primary.main}20`
                    }
                  }
                }}
              >
                {lang.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Description */}
        <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
          {description}
        </Typography>

        {/* Loading State */}
        {isLoading && (
          <Alert 
            severity="info" 
            sx={{ 
              mb: 2,
              '& .MuiAlert-message': {
                fontSize: '0.875rem'
              },
              '& .MuiAlert-icon': {
                fontSize: '1.25rem'
              }
            }}
          >
            Translating content, please wait...
          </Alert>
        )}

        {/* Translated Content */}
        {translatedText && (
          <Box sx={{ mt: 2 }}>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                mb: 1.5, 
                fontWeight: 600,
                fontSize: '0.875rem',
                color: theme.palette.text.primary
              }}
            >
              Translated Text:
            </Typography>
            <Box sx={{ 
              p: 2, 
              bgcolor: theme.palette.grey[50], 
              borderRadius: 1.5,
              border: `1px solid ${theme.palette.grey[200]}`,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                bgcolor: theme.palette.grey[100],
                borderColor: theme.palette.grey[300],
              }
            }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                  color: theme.palette.text.primary 
                }}
              >
                {translatedText}
              </Typography>
            </Box>
          </Box>
        )}

        {/* Feature Notice */}
        {!onTranslate && (
          <Alert 
            severity="info" 
            sx={{ 
              mt: 2,
              '& .MuiAlert-message': {
                fontSize: '0.875rem'
              },
              '& .MuiAlert-icon': {
                fontSize: '1.25rem'
              }
            }}
          >
            Translation feature is coming soon! This will help you understand content in multiple languages.
          </Alert>
        )}
      </Box>
    </DialogWrapper>
  );
};

export default TranslationDialog;