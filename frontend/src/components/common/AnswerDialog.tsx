import React, { ReactNode } from 'react';
import {
  Typography,
  Box,
  Chip,
  Stack
} from '@mui/material';
import DialogWrapper from './DialogWrapper';

export interface AnswerDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  text?: string;
  audioTitle?: string;
  answers: Array<{
    id: string;
    position?: number;
    correctAnswer: string;
    label?: string;
  }>;
  guidance?: string|ReactNode;
  explanation?: string;
}

const AnswerDialog: React.FC<AnswerDialogProps> = ({
  open,
  onClose,
  title,
  text,
  audioTitle,
  answers,
  guidance,
  explanation
}) => {
  return (
    <DialogWrapper
      open={open}
      onClose={onClose}
      title="Correct Answers"
      defaultActions={{
        cancelText: "Close",
        onCancel: onClose
      }}
    >
      <Box>
        {/* Content Title */}
        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>{text ? 'Passage:' : audioTitle ? 'Audio:' : 'Content:'}</strong> {title}
        </Typography>

        {/* Full Text */}
        {text && (
          <Box sx={{ mb: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
            <Typography variant="body2">
              {text}
            </Typography>
          </Box>
        )}

        {/* Guidance */}
        {guidance && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Guidance:</strong>
            </Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>
              {guidance}
            </Typography>
          </Box>
        )}

        {/* Answers */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          Correct Answers:
        </Typography>
        
        {answers.map((answer, index) => (
          <Box 
            key={answer.id} 
            sx={{ 
              mb: 2, 
              p: 2, 
              bgcolor: '#e8f5e9', 
              borderRadius: 2,
              border: '1px solid #4caf50'
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2} flexWrap="wrap">
              <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: 100 }}>
                {answer.label || (answer.position !== undefined ? `Blank ${answer.position + 1}:` : `Answer ${index + 1}:`)}
              </Typography>
              <Chip 
                label={answer.correctAnswer} 
                color="success"
                size="small"
                variant="filled"
              />
            </Stack>
          </Box>
        ))}

        {/* Additional Explanation */}
        {explanation && (
          <Box sx={{ mt: 3, p: 2, bgcolor: '#e3f2fd', borderRadius: 2 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
              Explanation:
            </Typography>
            <Typography variant="body2">
              {explanation}
            </Typography>
          </Box>
        )}
      </Box>
    </DialogWrapper>
  );
};

export default AnswerDialog;