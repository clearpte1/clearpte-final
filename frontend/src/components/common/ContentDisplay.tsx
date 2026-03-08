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
  backgroundColor = '#1a1a1a',
  padding = { xs: 1.5, sm: 2 },
  textAlign = 'justify',
  fontSize = { xs: '13px', sm: '14px', md: '15px' },
  lineHeight = 1.6
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
      mb: 2,
      bgcolor: backgroundColor,
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'rgba(255,255,255,0.1)',
      boxShadow: '0 2px 12px rgba(0,0,0,0.5)'
    }}>
      {/* Title */}
      {title && (
        <Typography
          variant="h6"
          sx={{
            mb: 1.5,
            fontWeight: 'bold',
            fontSize: { xs: '15px', sm: '16px', md: '17px' },
            color: '#FFFFFF'
          }}
        >
          {title}
        </Typography>
      )}

      {/* Metadata */}
      {showMetadata && (category || difficulty || speaker || duration || wordCount || tags.length > 0) && (
        <Box sx={{ mb: 1.5 }}>
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
                sx={{
                  bgcolor: 'rgba(33, 150, 243, 0.1)',
                  borderColor: 'primary.main',
                  color: 'primary.main'
                }}
              />
            )}

            {difficulty && (
              <Chip
                label={difficulty}
                size="small"
                color={getDifficultyColor(difficulty)}
                sx={{
                  bgcolor: difficulty === 'Beginner' ? 'rgba(76, 175, 80, 0.1)' :
                           difficulty === 'Intermediate' ? 'rgba(255, 152, 0, 0.1)' :
                           'rgba(244, 67, 54, 0.1)'
                }}
              />
            )}

            {speaker && (
              <Chip
                label={`Speaker: ${speaker}`}
                size="small"
                variant="outlined"
                color="info"
                sx={{
                  bgcolor: 'rgba(3, 169, 244, 0.1)',
                  borderColor: 'info.main',
                  color: 'info.main'
                }}
              />
            )}

            {duration && (
              <Chip
                label={`Duration: ${duration}`}
                size="small"
                variant="outlined"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.05)',
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: '#B0B0B0'
                }}
              />
            )}

            {wordCount && (
              <Chip
                label={`${wordCount} words`}
                size="small"
                variant="outlined"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.05)',
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: '#B0B0B0'
                }}
              />
            )}

            {tags.slice(0, isMobile ? 2 : 4).map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                variant="outlined"
                color="secondary"
                sx={{
                  bgcolor: 'rgba(156, 39, 176, 0.1)',
                  borderColor: 'secondary.main',
                  color: 'secondary.main'
                }}
              />
            ))}

            {tags.length > (isMobile ? 2 : 4) && (
              <Chip
                label={`+${tags.length - (isMobile ? 2 : 4)} more`}
                size="small"
                variant="outlined"
                color="secondary"
                sx={{
                  bgcolor: 'rgba(156, 39, 176, 0.1)',
                  borderColor: 'secondary.main',
                  color: 'secondary.main'
                }}
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
              color: '#FFFFFF',
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
            color: '#FFFFFF',
            '& > *': { mb: 1, color: '#FFFFFF' },
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