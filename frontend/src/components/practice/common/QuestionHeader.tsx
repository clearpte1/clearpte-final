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
    <Box sx={{ mb: 3, width: '100%' }}>
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        alignItems={{ xs: 'flex-start', sm: 'center' }} 
        justifyContent={{ xs: 'flex-start', sm: 'space-between' }}
        spacing={{ xs: 1, sm: 0 }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#333',
            fontSize: { xs: '16px', sm: '18px', md: '20px' },
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
            alignSelf: { xs: 'flex-start', sm: 'center' }
          }}
        />
      </Stack>
    </Box>
  );
};

export default QuestionHeader;