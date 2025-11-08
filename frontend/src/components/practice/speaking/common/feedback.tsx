import React from 'react';
import { Box } from '@mui/material';
import { ContentDisplay } from '../../../common';


interface FeedbackScores {
  Content: number;
  Fluency: number;
  Pronunciation: number;
  Overall: number;
}

interface FeedbackProps {
  feedback?: {
    scores?: FeedbackScores;
    corrections?: string[];   // bullet points
    feedback?: string[];      // bullet points
  };
  showFeedback?: boolean;
}

export const Feedback: React.FC<FeedbackProps> = ({ feedback, showFeedback = true }) => {
  if (!showFeedback || !feedback) return null;

  return (
    <ContentDisplay
      title="AI Feedback Results"
      content={
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ textAlign: 'center', p: 4, bgcolor: 'primary.light', borderRadius: 2 }}>
            <Box sx={{ fontSize: '48px', fontWeight: 'bold', color: 'primary.main' }}>
              {feedback.scores?.Overall}
            </Box>
            <Box sx={{ color: 'text.secondary' }}>Overall Score</Box>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 2 }}>
            <Box sx={{ p: 2, bgcolor: 'success.light', borderRadius: 1, textAlign: 'center' }}>
              <Box sx={{ fontWeight: 'medium' }}>Pronunciation</Box>
              <Box sx={{ fontSize: '24px', fontWeight: 'bold' }}>{feedback?.scores?.Pronunciation}</Box>
            </Box>
            <Box sx={{ p: 2, bgcolor: 'warning.light', borderRadius: 1, textAlign: 'center' }}>
              <Box sx={{ fontWeight: 'medium' }}>Fluency</Box>
              <Box sx={{ fontSize: '24px', fontWeight: 'bold' }}>{feedback?.scores?.Fluency}</Box>
            </Box>
            <Box sx={{ p: 2, bgcolor: 'secondary.light', borderRadius: 1, textAlign: 'center' }}>
              <Box sx={{ fontWeight: 'medium' }}>Content</Box>
              <Box sx={{ fontSize: '24px', fontWeight: 'bold' }}>{feedback.scores?.Content}</Box>
            </Box>
          </Box>

          <Box>
            <Box sx={{ fontWeight: 'medium', mb: 1, color: 'success.main' }}>Feedback:</Box>
            {feedback.feedback?.map((item: string, index: number) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 0.5 }}>
                <Box sx={{ color: 'success.main' }}>•</Box>
                <Box sx={{ fontSize: '14px' }}>{item}</Box>
              </Box>
            ))}
          </Box>

          <Box>
            <Box sx={{ fontWeight: 'medium', mb: 1, color: 'warning.main' }}>💡 Areas for Improvement:</Box>
            {feedback.corrections?.map((item: string, index: number) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 0.5 }}>
                <Box sx={{ color: 'warning.main' }}>•</Box>
                <Box sx={{ fontSize: '14px' }}>{item}</Box>
              </Box>
            ))}
          </Box>
        </Box>
      }
      showMetadata={false}
    />
  );
};

export default Feedback;