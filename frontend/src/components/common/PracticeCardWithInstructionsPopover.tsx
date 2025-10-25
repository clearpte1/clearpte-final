import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import InstructionsPopover, { InstructionsPopoverProps } from './InstructionsPopover';

export interface PracticeCardWithInstructionsPopoverProps {
  icon: string;
  title: string;
  subtitle?: string;
  instructions?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  studyGuide?: boolean;
  children: React.ReactNode;
  maxWidth?: number | string;
  padding?: number | string;
  // Instructions popover props
  instructionsConfig?: Omit<InstructionsPopoverProps, 'title'> & {
    title?: string;
  };
}

const PracticeCardWithInstructionsPopover: React.FC<PracticeCardWithInstructionsPopoverProps> = ({
  icon,
  title,
  subtitle,
  instructions,
  difficulty,
  studyGuide = true,
  children,
  maxWidth = 1200,
  padding,
  instructionsConfig
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
    <Card sx={{ 
      maxWidth, 
      mx: 'auto', 
      mb: 3,
      borderRadius: 3,
      boxShadow: theme.shadows[3]
    }}>
      <CardContent sx={{ 
        p: padding || { xs: 2, sm: 3, md: 4 }
      }}>
        {/* Header Section */}
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          alignItems={{ xs: 'flex-start', sm: 'center' }} 
          spacing={2} 
          sx={{ mb: 3 }}
        >
          <Box
            sx={{
              width: { xs: 50, sm: 55, md: 60 },
              height: { xs: 50, sm: 55, md: 60 },
              bgcolor: '#2196f3',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: { xs: '14px', sm: '16px', md: '18px' },
              fontWeight: 'bold',
              flexShrink: 0,
              lineHeight: 1.2
            }}
          >
            {icon}
          </Box>
          
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              alignItems={{ xs: 'flex-start', sm: 'center' }} 
              spacing={2}
            >
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: '#333',
                  fontSize: { xs: '18px', sm: '20px', md: '24px' },
                  lineHeight: 1.3,
                  wordBreak: 'break-word'
                }}
              >
                {title}
              </Typography>
              
              {studyGuide && (
                <Chip label="Study Guide" color="primary" size="small" />
              )}
              
              {difficulty && (
                <Chip 
                  label={difficulty} 
                  color={getDifficultyColor(difficulty)}
                  size="small" 
                />
              )}
            </Stack>
            
            {subtitle && (
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#666', 
                  mt: 1,
                  fontSize: { xs: '12px', sm: '13px', md: '14px' },
                  lineHeight: 1.5,
                  wordBreak: 'break-word'
                }}
              >
                {subtitle}
              </Typography>
            )}
            
            {/* Instructions with Info Icon Popover */}
            {(instructions || instructionsConfig?.sections) && (
              <Stack 
                direction="row" 
                alignItems="center" 
                spacing={1}
                sx={{ mt: 1 }}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#666', 
                    fontSize: { xs: '12px', sm: '13px', md: '14px' },
                    lineHeight: 1.5,
                    wordBreak: 'break-word',
                    flexGrow: 1
                  }}
                >
                  {instructions}
                </Typography>
                
                {instructionsConfig?.sections && (
                  <InstructionsPopover
                    title={instructionsConfig.title || `${title} Instructions`}
                    sections={instructionsConfig.sections}
                    size={instructionsConfig.size}
                    color={instructionsConfig.color}
                    tooltipTitle={instructionsConfig.tooltipTitle}
                    placement={instructionsConfig.placement}
                  />
                )}
              </Stack>
            )}
          </Box>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Content */}
        {children}
      </CardContent>
    </Card>
  );
};

export default PracticeCardWithInstructionsPopover;