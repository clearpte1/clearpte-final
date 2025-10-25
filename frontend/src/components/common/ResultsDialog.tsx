import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Stack,
  useTheme,
  useMediaQuery
} from '@mui/material';
import DialogWrapper from './DialogWrapper';

export interface QuestionResult {
  questionId: string;
  score: number;
  maxScore: number;
  correctAnswers: number;
  totalBlanks?: number;
  totalQuestions?: number;
  completedAt: Date;
  timeSpent: number;
  answers?: any[];
  percentage?: number;
}

export interface ResultsDialogProps {
  open: boolean;
  onClose: () => void;
  result: QuestionResult | null;
  onTryAgain?: () => void;
  showAnswerReview?: boolean;
  customContent?: React.ReactNode;
}

const ResultsDialog: React.FC<ResultsDialogProps> = ({
  open,
  onClose,
  result,
  onTryAgain,
  showAnswerReview = true,
  customContent
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!result) return null;

  const isPassingScore = result.score >= (result.maxScore * 0.7);
  const timeMinutes = Math.floor(result.timeSpent / 60);
  const timeSeconds = result.timeSpent % 60;

  const getScoreColor = () => {
    const percentage = (result.score / result.maxScore) * 100;
    if (percentage >= 80) return 'success';
    if (percentage >= 60) return 'warning';
    return 'error';
  };

  return (
    <DialogWrapper
      open={open}
      onClose={onClose}
      title="Quiz Results"
      maxWidth="md"
      defaultActions={{
        cancelText: "Close",
        onCancel: onClose,
        ...(onTryAgain && {
          confirmText: "Try Again",
          onConfirm: onTryAgain,
          confirmColor: "primary"
        })
      }}
    >
      <Box>
        {/* Score Summary */}
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={2} 
          sx={{ mb: 3 }}
          flexWrap="wrap"
        >
          <Chip 
            label={`Score: ${result.score}/${result.maxScore}`} 
            color={getScoreColor()}
            size="medium"
            sx={{ 
              fontSize: { xs: '12px', sm: '14px' },
              height: { xs: 28, sm: 32 }
            }}
          />
          
          {result.totalBlanks && (
            <Chip 
              label={`${result.correctAnswers}/${result.totalBlanks} Correct`} 
              color="info"
              size="medium"
              sx={{ 
                fontSize: { xs: '12px', sm: '14px' },
                height: { xs: 28, sm: 32 }
              }}
            />
          )}
          
          {result.totalQuestions && (
            <Chip 
              label={`${result.correctAnswers}/${result.totalQuestions} Correct`} 
              color="info"
              size="medium"
              sx={{ 
                fontSize: { xs: '12px', sm: '14px' },
                height: { xs: 28, sm: 32 }
              }}
            />
          )}
          
          <Chip 
            label={`Time: ${timeMinutes}:${timeSeconds.toString().padStart(2, '0')}`} 
            color="default"
            size="medium"
            sx={{ 
              fontSize: { xs: '12px', sm: '14px' },
              height: { xs: 28, sm: 32 }
            }}
          />
          
          {result.percentage && (
            <Chip 
              label={`${result.percentage}%`} 
              color={getScoreColor()}
              size="medium"
              sx={{ 
                fontSize: { xs: '12px', sm: '14px' },
                height: { xs: 28, sm: 32 }
              }}
            />
          )}
        </Stack>

        {/* Performance Message */}
        <Box sx={{ mb: 3, p: 2, borderRadius: 2, bgcolor: isPassingScore ? '#e8f5e9' : '#ffebee' }}>
          <Typography 
            variant="body1" 
            sx={{ 
              color: isPassingScore ? '#2e7d32' : '#c62828',
              fontWeight: 'medium',
              textAlign: 'center'
            }}
          >
            {isPassingScore ? '🎉 Great job! You passed!' : '💪 Keep practicing! You can do better!'}
          </Typography>
        </Box>

        {/* Custom Content */}
        {customContent}

        {/* Answer Review */}
        {showAnswerReview && result.answers && result.answers.length > 0 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Answer Review:
            </Typography>
            {result.answers.map((answer: any, index: number) => (
              <Box 
                key={answer.id || index} 
                sx={{ 
                  mb: 2, 
                  p: 2, 
                  border: '1px solid #e0e0e0', 
                  borderRadius: 2,
                  bgcolor: answer.isCorrect ? '#f3e5f5' : '#ffebee'
                }}
              >
                <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="flex-start" spacing={2}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: 100 }}>
                    {answer.position !== undefined ? `Blank ${answer.position + 1}:` : `Question ${index + 1}:`}
                  </Typography>
                  
                  <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center">
                    <Chip 
                      label={answer.filledWord || answer.selectedAnswer || 'Not answered'} 
                      color={answer.isCorrect ? 'success' : 'error'}
                      size="small"
                    />
                    {answer.correctAnswer && (
                      <Typography variant="body2" color="textSecondary">
                        Correct: {answer.correctAnswer}
                      </Typography>
                    )}
                  </Stack>
                </Stack>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </DialogWrapper>
  );
};

export default ResultsDialog;