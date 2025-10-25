import React from 'react';
import {
  Box,
  Typography,
  useTheme
} from '@mui/material';

export interface HighlightableWord {
  id: string;
  text?: string;
  word?: string; // Alternative prop name for word text
  isIncorrect?: boolean;
  isHighlighted?: boolean;
  isCorrectlyHighlighted?: boolean;
  isCorrect?: boolean; // For new interface
  isSubmitted?: boolean; // For new interface
  position?: number;
}

export interface HighlightableTextProps {
  text: string;
  // Legacy props (for backward compatibility)
  incorrectWords?: string[];
  highlightedWords?: Set<string>;
  showCorrectAnswers?: boolean;
  onWordClick?: (wordId: string, word?: string) => void;
  disabled?: boolean;
  fontSize?: string | object;
  lineHeight?: number;
  wordSpacing?: number;
  
  // New props (for enhanced functionality)
  highlightableWords?: HighlightableWord[];
  isSubmitted?: boolean;
  showResults?: boolean;
  selectedWords?: string[];
}

const HighlightableText: React.FC<HighlightableTextProps> = ({
  text,
  incorrectWords = [],
  highlightedWords = new Set(),
  showCorrectAnswers = false,
  onWordClick,
  disabled = false,
  fontSize = { xs: '16px', sm: '18px', md: '20px' },
  lineHeight = 1.8,
  wordSpacing = 4,
  // New props
  highlightableWords,
  isSubmitted = false,
  showResults = false,
  selectedWords = []
}) => {
  const theme = useTheme();

  // Determine which mode we're in based on provided props
  const isEnhancedMode = Boolean(highlightableWords && highlightableWords.length > 0);
  const actuallyShowResults = isEnhancedMode ? (isSubmitted && showResults) : showCorrectAnswers;
  const actuallyDisabled = isEnhancedMode ? isSubmitted : disabled;

  // Split text into words and create word objects
  const words = text.split(/(\s+)/).map((part, index) => {
    const cleanWord = part.trim().toLowerCase();
    const wordId = `word-${index}-${cleanWord}`;
    
    // Skip whitespace
    if (!part.trim()) {
      return {
        id: `space-${index}`,
        text: part,
        isSpace: true,
        position: index
      };
    }

    if (isEnhancedMode) {
      // Use new enhanced mode with highlightableWords
      const highlightableWord = highlightableWords!.find(hw => 
        (hw.word || hw.text || '').toLowerCase() === cleanWord || hw.id === wordId
      );
      
      if (highlightableWord) {
        const isHighlighted = selectedWords.includes(highlightableWord.id);
        return {
          id: highlightableWord.id,
          text: part,
          isIncorrect: true, // All highlightableWords are meant to be clickable
          isHighlighted,
          isCorrect: highlightableWord.isCorrect,
          isCorrectlyHighlighted: actuallyShowResults ? (highlightableWord.isCorrect && isHighlighted) : undefined,
          position: index,
          isSpace: false,
          enhancedWord: highlightableWord
        };
      } else {
        // Regular word, not in highlightableWords
        const isHighlighted = selectedWords.includes(wordId);
        return {
          id: wordId,
          text: part,
          isIncorrect: false,
          isHighlighted,
          isCorrect: false,
          isCorrectlyHighlighted: undefined,
          position: index,
          isSpace: false
        };
      }
    } else {
      // Use legacy mode
      const isIncorrect = incorrectWords.some(incorrect => 
        incorrect.toLowerCase() === cleanWord
      );
      const isHighlighted = highlightedWords.has(wordId);

      return {
        id: wordId,
        text: part,
        isIncorrect,
        isHighlighted,
        isCorrectlyHighlighted: showCorrectAnswers ? (isIncorrect && isHighlighted) : undefined,
        position: index,
        isSpace: false
      };
    }
  });

  const getWordStyles = (word: any) => {
    if (word.isSpace) return {};

    const baseStyles = {
      display: 'inline-block',
      margin: `0 ${wordSpacing}px`,
      padding: '2px 4px',
      borderRadius: '4px',
      cursor: actuallyDisabled ? 'default' : 'pointer',
      userSelect: 'none',
      transition: 'all 0.2s ease',
      fontSize: fontSize,
      lineHeight: lineHeight,
      fontWeight: 'normal',
      '&:hover': actuallyDisabled ? {} : {
        backgroundColor: theme.palette.primary.light + '20',
        transform: 'scale(1.02)',
      }
    };

    if (actuallyShowResults) {
      // Show results state
      if (isEnhancedMode && word.enhancedWord) {
        // Enhanced mode: use the correct/incorrect logic based on word.isCorrect
        if (word.isCorrect && word.isHighlighted) {
          // Correctly identified incorrect word
          return {
            ...baseStyles,
            backgroundColor: theme.palette.success.light,
            color: theme.palette.success.contrastText,
            border: `2px solid ${theme.palette.success.main}`,
            fontWeight: 'bold',
          };
        } else if (word.isCorrect && !word.isHighlighted) {
          // Missed incorrect word
          return {
            ...baseStyles,
            backgroundColor: theme.palette.error.light,
            color: theme.palette.error.contrastText,
            border: `2px solid ${theme.palette.error.main}`,
            fontWeight: 'bold',
            textDecoration: 'underline',
          };
        } else if (!word.isCorrect && word.isHighlighted) {
          // Incorrectly highlighted correct word
          return {
            ...baseStyles,
            backgroundColor: theme.palette.warning.light,
            color: theme.palette.warning.contrastText,
            border: `2px solid ${theme.palette.warning.main}`,
            fontWeight: 'bold',
          };
        } else {
          // Correct word, correctly not highlighted
          return {
            ...baseStyles,
            backgroundColor: 'transparent',
            color: theme.palette.text.primary,
          };
        }
      } else {
        // Legacy mode
        if (word.isIncorrect && word.isHighlighted) {
          // Correctly identified incorrect word
          return {
            ...baseStyles,
            backgroundColor: theme.palette.success.light,
            color: theme.palette.success.contrastText,
            border: `2px solid ${theme.palette.success.main}`,
            fontWeight: 'bold',
          };
        } else if (word.isIncorrect && !word.isHighlighted) {
          // Missed incorrect word
          return {
            ...baseStyles,
            backgroundColor: theme.palette.error.light,
            color: theme.palette.error.contrastText,
            border: `2px solid ${theme.palette.error.main}`,
            fontWeight: 'bold',
            textDecoration: 'underline',
          };
        } else if (!word.isIncorrect && word.isHighlighted) {
          // Incorrectly highlighted correct word
          return {
            ...baseStyles,
            backgroundColor: theme.palette.warning.light,
            color: theme.palette.warning.contrastText,
            border: `2px solid ${theme.palette.warning.main}`,
            fontWeight: 'bold',
          };
        } else {
          // Correct word, correctly not highlighted
          return {
            ...baseStyles,
            backgroundColor: 'transparent',
            color: theme.palette.text.primary,
          };
        }
      }
    } else {
      // Interactive state
      if (word.isHighlighted) {
        return {
          ...baseStyles,
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          fontWeight: 'bold',
          transform: 'scale(1.02)',
        };
      } else {
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          color: theme.palette.text.primary,
        };
      }
    }
  };

  const handleWordClick = (word: any) => {
    if (actuallyDisabled || word.isSpace || !onWordClick) return;
    
    if (isEnhancedMode) {
      // In enhanced mode, only allow clicking on highlightable words or any word if it's clickable
      if (word.enhancedWord || word.isIncorrect) {
        onWordClick(word.id, word.text);
      }
    } else {
      // Legacy mode: any word can be clicked
      onWordClick(word.id, word.text);
    }
  };

  return (
    <Box sx={{ 
      p: 3, 
      lineHeight: lineHeight,
      wordBreak: 'break-word',
      userSelect: 'none'
    }}>
      {words.map((word) => (
        <Typography
          key={word.id}
          component="span"
          onClick={() => handleWordClick(word)}
          sx={getWordStyles(word)}
        >
          {word.text}
        </Typography>
      ))}
    </Box>
  );
};

export default HighlightableText;