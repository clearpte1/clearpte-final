import React from 'react';
import { Stack, Typography, Chip, Box } from '@mui/material';

interface QuestionHeaderProps {
  questionNumber: number;
  studentName: string;
  testedCount: number;
}

const QuestionHeader: React.FC<QuestionHeaderProps> = ({ 
  questionNumber, 
  studentName, 
  testedCount 
}) => {
  return (
    <Box sx={{ mb: 2, width: '100%' }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent={{ xs: 'flex-start', sm: 'space-between' }}
        spacing={{ xs: 1, sm: 0 }}
      >
        <Typography
          variant="h6"
          sx={{
            color: '#FFFFFF',
            fontSize: { xs: '15px', sm: '16px', md: '17px' },
            fontWeight: 'bold',
            wordBreak: 'break-word'
          }}
        >
          #{questionNumber} {studentName}
        </Typography>
        <Chip
        onClick={() => { }}
          label={`Tested (${testedCount})`}
          color="success"
          size="small"
          sx={{
            alignSelf: { xs: 'flex-start', sm: 'center' },
            bgcolor: 'rgba(76, 175, 80, 0.2)',
            color: '#4caf50',
            fontWeight: 'bold'
          }}
        />
      </Stack>
    </Box>
  );
};

export default QuestionHeader;