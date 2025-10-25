import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Chip,
  Stack,
  useTheme,
  useMediaQuery
} from '@mui/material';

export interface ContentDisplayProps {
  title?: string;
  content: string | React.ReactNode;
  category?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  tags?: string[];
  speaker?: string;
  duration?: string;
  wordCount?: number;
  showMetadata?: boolean;
  backgroundColor?: string;
  padding?: number | string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  fontSize?: string | object;
  lineHeight?: number;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({
  title,
  content,
  category,
  difficulty,
  tags = [],
  speaker,
  duration,
  wordCount,
  showMetadata = true,
  backgroundColor = 'grey.50',
  padding = { xs: 2, sm: 3 },
  textAlign = 'justify',
  fontSize = { xs: '14px', sm: '15px', md: '16px' },
  lineHeight = 1.8
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getDifficultyColor = (diff?: string) => {
    switch (diff) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'error';
      default: return 'default';
    }
  };

  return (
    <Paper sx={{ 
      p: padding, 
      mb: 3, 
      bgcolor: backgroundColor,
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'grey.200'
    }}>
      {/* Title */}
      {title && (
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 2, 
            fontWeight: 'bold',
            fontSize: { xs: '16px', sm: '18px', md: '20px' }
          }}
        >
          {title}
        </Typography>
      )}

      {/* Metadata */}
      {showMetadata && (category || difficulty || speaker || duration || wordCount || tags.length > 0) && (
        <Box sx={{ mb: 2 }}>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={1} 
            flexWrap="wrap"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
          >
            {category && (
              <Chip
                label={category}
                size="small"
                variant="outlined"
                color="primary"
              />
            )}
            
            {difficulty && (
              <Chip
                label={difficulty}
                size="small"
                color={getDifficultyColor(difficulty)}
              />
            )}
            
            {speaker && (
              <Chip
                label={`Speaker: ${speaker}`}
                size="small"
                variant="outlined"
                color="info"
              />
            )}
            
            {duration && (
              <Chip
                label={`Duration: ${duration}`}
                size="small"
                variant="outlined"
                color="default"
              />
            )}
            
            {wordCount && (
              <Chip
                label={`${wordCount} words`}
                size="small"
                variant="outlined"
                color="default"
              />
            )}
            
            {tags.slice(0, isMobile ? 2 : 4).map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                variant="outlined"
                color="secondary"
              />
            ))}
            
            {tags.length > (isMobile ? 2 : 4) && (
              <Chip
                label={`+${tags.length - (isMobile ? 2 : 4)} more`}
                size="small"
                variant="outlined"
                color="secondary"
              />
            )}
          </Stack>
        </Box>
      )}

      {/* Content */}
      <Box sx={{ position: 'relative' }}>
        {typeof content === 'string' ? (
          <Typography 
            variant="body1" 
            sx={{ 
              lineHeight,
              fontSize,
              textAlign,
              wordBreak: 'break-word',
              '& p': { mb: 1 },
              '& p:last-child': { mb: 0 }
            }}
          >
            {content}
          </Typography>
        ) : (
          <Box sx={{ 
            fontSize,
            lineHeight,
            textAlign,
            '& > *': { mb: 1 },
            '& > *:last-child': { mb: 0 }
          }}>
            {content}
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default ContentDisplay;