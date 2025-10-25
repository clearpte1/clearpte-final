import React from 'react';
import {
  Box,
  Typography,
  useTheme
} from '@mui/material';
import { useDroppable, useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { DragIndicator } from '@mui/icons-material';

export interface BlankPosition {
  id: string;
  position: number;
  correctAnswer: string;
  filledWord?: string;
  isCorrect?: boolean;
}

export interface WordBankWord {
  id: string;
  word: string;
  isUsed: boolean;
  correctPosition?: number;
}

interface DroppableBlankProps {
  blank: BlankPosition;
  minWidth?: string | number;
  minHeight?: string | number;
}

interface DraggableWordProps {
  word: string;
  id: string;
  isCorrect?: boolean;
  size?: 'small' | 'medium' | 'large';
}

interface DroppableWordBankProps {
  words: WordBankWord[];
  onRenderWord?: (word: WordBankWord) => React.ReactNode;
  emptyMessage?: string;
  minHeight?: string | number;
}

export const DroppableBlank: React.FC<DroppableBlankProps> = ({ 
  blank, 
  minWidth = '120px',
  minHeight = '32px'
}) => {
  const theme = useTheme();
  const { setNodeRef, isOver } = useDroppable({
    id: blank.id,
  });

  return (
    <Box
      ref={setNodeRef}
      component="span"
      sx={{
        display: 'inline-flex',
        minWidth,
        minHeight,
        mx: 0.5,
        px: 1,
        py: 0.5,
        border: `2px ${isOver ? 'solid' : 'dashed'} ${
          blank.isCorrect === true ? theme.palette.success.main :
          blank.isCorrect === false ? theme.palette.error.main :
          isOver ? theme.palette.primary.main : '#ccc'
        }`,
        borderRadius: 1,
        backgroundColor: isOver ? theme.palette.primary.light + '20' :
                       blank.isCorrect === true ? theme.palette.success.light + '20' :
                       blank.isCorrect === false ? theme.palette.error.light + '20' : '#fafafa',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        pointerEvents: 'auto',
      }}
    >
      {blank.filledWord ? (
        <DraggableWord word={blank.filledWord} id={`filled_${blank.id}`} isCorrect={blank.isCorrect} />
      ) : (
        <Typography variant="body2" color="textSecondary" sx={{ fontSize: '12px' }}>
          Drop here
        </Typography>
      )}
    </Box>
  );
};

export const DraggableWord: React.FC<DraggableWordProps> = ({ 
  word, 
  id, 
  isCorrect,
  size = 'small'
}) => {
  const theme = useTheme();
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
  });

  const getSizeStyles = () => {
    switch (size) {
      case 'large':
        return { px: 1.5, py: 0.75, fontSize: '16px' };
      case 'medium':
        return { px: 1.2, py: 0.6, fontSize: '14px' };
      default:
        return { px: 1, py: 0.5, fontSize: '12px' };
    }
  };

  const style = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    backgroundColor: isCorrect === true ? theme.palette.success.main :
                     isCorrect === false ? theme.palette.error.main :
                     isDragging ? theme.palette.primary.dark : theme.palette.primary.main,
    opacity: isDragging ? 0.7 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  return (
    <Box
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      sx={{
        ...getSizeStyles(),
        color: 'white',
        borderRadius: 1,
        fontWeight: 'medium',
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        pointerEvents: 'auto',
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'scale(1.05)',
        },
        ...style,
      }}
    >
      <DragIndicator sx={{ fontSize: '14px' }} />
      {word}
    </Box>
  );
};

export const DroppableWordBank: React.FC<DroppableWordBankProps> = ({
  words,
  onRenderWord,
  emptyMessage = "All words have been used",
  minHeight = '60px'
}) => {
  const theme = useTheme();
  const { setNodeRef, isOver } = useDroppable({
    id: 'wordBank',
  });

  const availableWords = words.filter(word => !word.isUsed);

  return (
    <Box
      ref={setNodeRef}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        minHeight,
        p: 2,
        border: `2px ${isOver ? 'solid' : 'dashed'} ${isOver ? theme.palette.primary.main : '#ccc'}`,
        borderRadius: 2,
        backgroundColor: isOver ? theme.palette.primary.light + '10' : '#fafafa',
        pointerEvents: 'auto',
        transition: 'all 0.2s ease',
      }}
    >
      {availableWords.length > 0 ? (
        availableWords.map((word) => (
          onRenderWord ? onRenderWord(word) : (
            <DraggableWord key={word.id} word={word.word} id={word.id} />
          )
        ))
      ) : (
        <Typography 
          variant="body2" 
          color="textSecondary" 
          sx={{ 
            fontStyle: 'italic',
            alignSelf: 'center',
            margin: 'auto'
          }}
        >
          {emptyMessage}
        </Typography>
      )}
    </Box>
  );
};