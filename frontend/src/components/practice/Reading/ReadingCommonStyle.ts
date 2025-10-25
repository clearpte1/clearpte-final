import { styled } from '@mui/material/styles';
import { Card, Box, Paper } from '@mui/material';

// Reading Module Specific Styled Components
export const ReadingCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
  transition: 'box-shadow 0.2s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[6],
  },
  [theme.breakpoints.down('sm')]: {
    borderRadius: theme.spacing(1),
    margin: theme.spacing(1),
  },
}));

export const ReadingPassageContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: '#fafafa',
  borderRadius: theme.spacing(1),
  border: '1px solid #e0e0e0',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

export const ReadingQuestionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: 'white',
  borderRadius: theme.spacing(1),
  border: '1px solid #e0e0e0',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  },
}));

export const ReadingOptionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
  borderRadius: theme.spacing(1),
  border: '1px solid #e0e0e0',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.light + '10',
    borderColor: theme.palette.primary.main,
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  },
}));

export const ReadingBlankContainer = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  minWidth: '120px',
  marginLeft: theme.spacing(0.5),
  marginRight: theme.spacing(0.5),
  [theme.breakpoints.down('sm')]: {
    minWidth: '100px',
  },
}));

export const ReadingScoreContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  backgroundColor: theme.palette.primary.light,
  borderRadius: theme.spacing(2),
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
}));

export const ReadingFeedbackCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isCorrect',
})<{ isCorrect?: boolean }>(({ theme, isCorrect }) => ({
  border: `2px solid ${isCorrect ? theme.palette.success.light : theme.palette.error.light}`,
  backgroundColor: isCorrect ? theme.palette.success.light : theme.palette.error.light,
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

export const ReadingDragDropZone = styled(Box)(({ theme }) => ({
  minHeight: '10px',
  backgroundColor: theme.palette.primary.light,
  opacity: 0.5,
  margin: '0 -16px',
  transition: 'height 0.3s ease',
  '&.active': { 
    height: '20px', 
    opacity: 0.7 
  },
}));

export const ReadingParagraphCard = styled(Card)(({ theme }) => ({
  cursor: 'move',
  transition: 'transform 0.3s ease, box-shadow 0.2s',
  '&:active': { 
    transform: 'translateY(-2px)', 
    boxShadow: theme.shadows[6] 
  },
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

// Reading Module Color Schemes
export const readingColors = {
  fillInBlanks: {
    primary: '#2196f3',
    secondary: '#e3f2fd',
    correct: '#4caf50',
    incorrect: '#f44336',
    neutral: '#9e9e9e',
  },
  multipleChoice: {
    primary: '#00bcd4',
    secondary: '#e0f2f1',
    correct: '#4caf50',
    incorrect: '#f44336',
    neutral: '#9e9e9e',
  },
  multipleChoiceSingle: {
    primary: '#ffc107',
    secondary: '#fff3e0',
    correct: '#4caf50',
    incorrect: '#f44336',
    neutral: '#9e9e9e',
  },
  reorderParagraphs: {
    primary: '#9c27b0',
    secondary: '#f3e5f5',
    correct: '#4caf50',
    incorrect: '#f44336',
    neutral: '#9e9e9e',
  },
};

// Reading Module Typography Styles
export const readingTypography = {
  passageText: {
    fontSize: { xs: '14px', sm: '15px', md: '16px' },
    lineHeight: 1.8,
    color: '#333',
    wordBreak: 'break-word',
    hyphens: 'auto',
  },
  questionText: {
    fontSize: { xs: '16px', sm: '18px', md: '20px' },
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 1.4,
    marginBottom: 2,
  },
  optionText: {
    fontSize: { xs: '14px', sm: '15px', md: '16px' },
    lineHeight: 1.6,
    color: '#333',
  },
  explanationText: {
    fontSize: { xs: '12px', sm: '13px', md: '14px' },
    lineHeight: 1.6,
    color: '#666',
    fontStyle: 'italic',
  },
  scoreText: {
    fontSize: { xs: '24px', sm: '32px', md: '48px' },
    fontWeight: 'bold',
    lineHeight: 1.2,
  },
};

// Reading Module Spacing Patterns
export const readingSpacing = {
  cardPadding: { xs: 2, sm: 3, md: 4 },
  sectionMargin: { xs: 2, sm: 3, md: 4 },
  itemSpacing: { xs: 1, sm: 1.5, md: 2 },
  compactSpacing: { xs: 0.5, sm: 1, md: 1 },
};

// Reading Module Common Animations
export const readingAnimations = {
  fadeIn: {
    animation: 'fadeIn 0.5s ease-in',
    '@keyframes fadeIn': {
      from: {
        opacity: 0,
        transform: 'translateY(20px)',
      },
      to: {
        opacity: 1,
        transform: 'translateY(0)',
      },
    },
  },
  slideIn: {
    animation: 'slideIn 0.3s ease-out',
    '@keyframes slideIn': {
      from: {
        transform: 'translateX(-100%)',
        opacity: 0,
      },
      to: {
        transform: 'translateX(0)',
        opacity: 1,
      },
    },
  },
  pulse: {
    animation: 'pulse 2s ease-in-out infinite',
    '@keyframes pulse': {
      '0%': {
        transform: 'scale(1)',
        opacity: 1,
      },
      '50%': {
        transform: 'scale(1.05)',
        opacity: 0.8,
      },
      '100%': {
        transform: 'scale(1)',
        opacity: 1,
      },
    },
  },
  bounce: {
    animation: 'bounce 0.6s ease',
    '@keyframes bounce': {
      '0%, 20%, 53%, 80%, 100%': {
        transform: 'translate3d(0,0,0)',
      },
      '40%, 43%': {
        transform: 'translate3d(0, -10px, 0)',
      },
      '70%': {
        transform: 'translate3d(0, -5px, 0)',
      },
      '90%': {
        transform: 'translate3d(0, -2px, 0)',
      },
    },
  },
};

// Reading Module Utility Functions
export const getReadingDifficultyColor = (difficulty: string) => {
  switch (difficulty?.toLowerCase()) {
    case 'beginner':
    case 'easy':
      return 'success';
    case 'intermediate':
    case 'medium':
      return 'warning';
    case 'advanced':
    case 'hard':
      return 'error';
    default:
      return 'default';
  }
};

export const getReadingScoreColor = (score: number) => {
  if (score >= 80) return 'success';
  if (score >= 60) return 'warning';
  return 'error';
};

export const formatReadingTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const calculateReadingProgress = (current: number, total: number): number => {
  return total > 0 ? Math.round((current / total) * 100) : 0;
};

// Reading Module Icons
export const readingIcons = {
  fillInBlanks: 'FIB',
  multipleChoice: 'MCM',
  multipleChoiceSingle: 'MCS',
  reorderParagraphs: 'ROP',
  readingWriting: 'R&W',
};

// Export all reading styles as a single object for easy import
export const ReadingStyles = {
  components: {
    ReadingCard,
    ReadingPassageContainer,
    ReadingQuestionContainer,
    ReadingOptionContainer,
    ReadingBlankContainer,
    ReadingScoreContainer,
    ReadingFeedbackCard,
    ReadingDragDropZone,
    ReadingParagraphCard,
  },
  colors: readingColors,
  typography: readingTypography,
  spacing: readingSpacing,
  animations: readingAnimations,
  utils: {
    getReadingDifficultyColor,
    getReadingScoreColor,
    formatReadingTime,
    calculateReadingProgress,
  },
  icons: readingIcons,
};